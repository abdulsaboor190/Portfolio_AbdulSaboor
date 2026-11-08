# Deployment — Vercel

The site deploys to **Vercel** from the `portfolio/` subdirectory of this
repo. No `vercel.json` is needed — the Next.js defaults (App Router, static
prerendering, `next build`) are exactly what this project uses, and there is
no database, no redirects, no custom headers, and no monorepo build-command
override required beyond setting the root directory (step 3).

---

## Deploy steps

### 1. Push the repo to GitHub

From `F:\Portfolio` (already done once — only needed again if you haven't
pushed the latest commits):

```bash
git add -A
git commit -m "chore: add deployment config and CI workflow"
git push
```

### 2. Import into Vercel

1. Go to https://vercel.com/new
2. Sign in with GitHub.
3. Find **Portfolio_AbdulSaboor** in the repo list → **Import**.
4. If it doesn't appear, click **Adjust GitHub App Permissions** and grant
   access to the repo, then retry.

### 3. Configure the project

On the import screen:

- **Framework Preset:** `Next.js` — should be auto-detected. Confirm it
  says Next.js; if it says "Other", pick Next.js manually.
- **Root Directory:** click **Edit** and set it to `portfolio`
  (the app lives in a subfolder, not the repo root).
- **Build Command / Output Directory / Install Command:** leave as
  auto-detected defaults (`next build`, `.next`).

### 4. Set environment variables

Still on the import screen, expand **Environment Variables** and add the
values from `portfolio/.env.example`. For now you can skip the ones that
aren't wired yet — but add these when ready:

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | SEO/sitemap (set to your `*.vercel.app` URL after first deploy) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Footer email link |
| `NEXT_PUBLIC_GITHUB_URL` | Footer GitHub link (defaults to your repo URL if unset) |
| `NEXT_PUBLIC_LINKEDIN_URL` | Footer LinkedIn link |
| `GITHUB_TOKEN` | GitHub activity tile (later phase) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Contact form (later phase) |

Check **Production** for each (add **Preview** too if you want them on
branch previews).

### 5. Deploy

Click **Deploy**. First build takes ~1–2 minutes. When it finishes you'll
get a URL like `https://portfolio-abc123.vercel.app` — that's your
production URL.

### 6. Enable preview deployments

Vercel does this automatically: every push to a non-`main` branch and every
PR gets its own preview URL. To confirm:

- **Project → Settings → Git** — "Preview Deployments" should be enabled
  for all branches (default).
- After your first PR is opened, Vercel comments the preview URL on the PR.

### 7. Add your domain (optional, later)

**Project → Settings → Domains** → add your custom domain when you have one.

---

## Deployment checklist

Run through this before calling it done:

- [ ] `npm run build` passes locally in `portfolio/` (CI will also enforce it)
- [ ] `git log -p | grep -i "key\|secret\|token"` shows no real secrets in
      history (only `.env.example` placeholders — verify with
      `git log --all --full-history -- "*.env*"`)
- [ ] The deployed URL loads on a real phone (not just desktop)
- [ ] Both light and dark themes work on the deployed site (system setting
      + toggle)
- [ ] A test branch pushed → Vercel preview deployment builds and loads
- [ ] CI workflow runs green on the PR (Actions tab on GitHub)

---

## What CI does

`.github/workflows/ci.yml` runs on every PR (and pushes to `main`):

```
cd portfolio
npm ci
npm run lint
npm run typecheck
npm run build
```

If any step fails, the PR shows a red X — fix before merging.
