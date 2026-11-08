# Architecture
- Prebundle React and root Radix providers together in Vite to prevent mixed React chunks after dependency discovery in an open preview.
- Advertising scripts are loaded only by the shared consent module; keep Google Ads and Tag Manager behind the same permission to avoid duplicate or unconsented measurement.
- Keep consent history with the notice version and support withdrawal in footer settings; never send clinical form data to advertising tools.
- Report website booking-request conversions through the shared consent module only after successful submission, without form values; failures and WhatsApp clicks are not completed requests.