# 🚀 Quick Deploy Commands

## Deploy to Vercel

```bash
cd /home/skaps/dekord/website
git add .
git commit -m "Deploy with database integration"
git push
```

That's it! Vercel auto-deploys on push.

---

## Check Your Site

**Production URL:** https://dekord-testing.vercel.app

**Test these after deployment:**
- Home: https://dekord-testing.vercel.app
- Catalog: https://dekord-testing.vercel.app/catalog
- Auth: https://dekord-testing.vercel.app/auth
- Test DB: https://dekord-testing.vercel.app/test-db

---

## Vercel Dashboard

- **Project:** https://vercel.com/dashboard
- **Deployments:** See build status & logs
- **Settings:** Environment variables

---

## Environment Variables (Copy from .env.local)

```bash
# View your current env vars
cat /home/skaps/dekord/website/.env.local
```

Add these to Vercel:
1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Redeploy Without Code Changes

If you just changed env variables:

1. Go to Vercel Dashboard
2. Click on your project
3. Go to Deployments tab
4. Click "..." on latest deployment
5. Click "Redeploy"

---

## Check Build Logs

If deployment fails:

1. Vercel Dashboard → Your Project
2. Click on the failed deployment
3. Click "View Function Logs" or "Build Logs"
4. Find the error
5. Fix and redeploy

---

## Local Development

```bash
cd /home/skaps/dekord/website
pnpm dev
```

Visit: http://localhost:3000

---

## Quick Fixes

**Build fails:**
- Check environment variables in Vercel
- Make sure all required vars are set

**OAuth doesn't work:**
- Update Google Console with JavaScript Origins
- Update Supabase with Site URL and Redirect URLs
- Wait 10 minutes for propagation

**Database connection fails:**
- Verify env vars in Vercel
- Check Supabase is accessible
- Run SQL scripts if tables missing

---

## Files You Created

Configuration docs:
- `DEPLOY-TO-VERCEL.md` - Full deployment guide
- `OAUTH-URLS-REFERENCE.md` - OAuth URLs quick reference
- `QUICK-DEPLOY.md` - This file

---

Ready to deploy? Run the commands at the top! 🚀
