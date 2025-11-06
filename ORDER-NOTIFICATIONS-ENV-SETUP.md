# Order Notification System - Environment Setup

## Required Environment Variables

Add these to `/website/.env.local`:

```bash
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxx

# Twilio WhatsApp Service
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886

# Site URL (for confirmation links)
NEXT_PUBLIC_SITE_URL=https://dekord.online
```

## Getting API Keys

### Resend (Email)
1. Go to: https://resend.com
2. Sign up and verify domain
3. Add sender: `team@dekord.online`
4. Copy API key

### Twilio (WhatsApp)
1. Go to: https://console.twilio.com
2. Create account (free trial: $15 credit)
3. Enable WhatsApp Sandbox
4. Copy: Account SID, Auth Token, WhatsApp Number

## Database Setup

Run in Supabase SQL Editor:

```sql
-- Add confirmation fields
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS customer_confirmed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS confirmation_query TEXT;

-- Create notification logs
CREATE TABLE IF NOT EXISTS notification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('placed', 'processing', 'shipped', 'delivered')),
  channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
  recipient TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
  message_id TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notification_logs_order_id ON notification_logs(order_id);
```

## Testing WhatsApp (Trial)

1. Open WhatsApp on phone
2. Send `join <sandbox-keyword>` to Twilio number
3. Receive confirmation
4. Test notifications

## Production Checklist

- [ ] Add env vars to Vercel
- [ ] Verify domain in Resend
- [ ] Upgrade Twilio from trial
- [ ] Update NEXT_PUBLIC_SITE_URL
- [ ] Test all notification types
