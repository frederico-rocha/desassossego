import { z } from 'npm:zod@3.23.8'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const BodySchema = z.object({
  submissionId: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(''),
  service: z.string().trim().max(200).optional().default(''),
  location: z.string().trim().max(120),
  schedule: z.string().trim().max(120),
  message: z.string().trim().max(2000).optional().default(''),
  lang: z.enum(['pt', 'en']).optional().default('pt'),
})

// Simple in-memory rate limiting (per email + per IP)
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

function rateLimited(key: string): boolean {
  const now = Date.now()
  const list = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (list.length >= MAX_HITS) {
    hits.set(key, list)
    return true
  }
  list.push(now)
  hits.set(key, list)
  return false
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { submissionId, name, email, phone, service, location, schedule, message, lang } =
    parsed.data

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(`email:${email.toLowerCase()}`) || rateLimited(`ip:${ip}`)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const eventId = submissionId ?? crypto.randomUUID()
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: 'Service unavailable.' }), {
      status: 503,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey)

  try {
    // Store every valid website request before attempting email delivery.
    const { error: storeError } = await supabase
      .from('contact_requests')
      .upsert({
        id: eventId,
        received_at: new Date().toISOString(),
        source: 'website',
        name,
        email,
        phone: phone || null,
        service: service || null,
        location,
        schedule,
        message: message || null,
        status: 'new',
        internal_notes: '',
        created_by: null,
      }, { onConflict: 'id', ignoreDuplicates: true })

    if (storeError) throw storeError

    // 1) Notify the clinic
    await sendTemplateEmail('booking-notification', email, {
      templateData: { name, email, phone, service, location, schedule, message },
      idempotencyKey: `booking-notification-${eventId}`,
      replyTo: email,
    })

    // 2) Confirmation to the requester
    await sendTemplateEmail('booking-confirmation', email, {
      templateData: { lang, name, service, location, schedule },
      idempotencyKey: `booking-confirmation-${eventId}`,
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to process booking request', {
      code: (error as { code?: string })?.code,
      message: (error as Error)?.message,
    })
    return new Response(
      JSON.stringify({ error: 'Failed to process request. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
