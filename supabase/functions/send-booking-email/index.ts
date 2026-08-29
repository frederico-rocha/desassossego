import { z } from 'npm:zod@3.23.8'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

const BodySchema = z.object({
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

  const { name, email, phone, service, location, schedule, message, lang } =
    parsed.data

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(`email:${email.toLowerCase()}`) || rateLimited(`ip:${ip}`)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const eventId = crypto.randomUUID()

  try {
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
    console.error('Failed to send booking emails', {
      code: (error as any)?.code,
      message: (error as Error)?.message,
    })
    return new Response(
      JSON.stringify({ error: 'Failed to send email. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
