# ARCOD website — arcod.in

One website replacing arcod.in, arcod.org and arcod.net, with an admin panel for photos, videos and events.

**Stack:** Next.js 15 (App Router, TypeScript) · Tailwind CSS v4 · Motion (animations) · Prisma 6 + **Neon Postgres** · **Firebase** Auth, Storage and App Hosting.

---

## How it fits together

| Piece | What it does |
|---|---|
| **Firebase App Hosting** | Runs the Next.js site and admin panel. Deploys automatically on every push to `main`. |
| **Neon (free)** | Database: events, media details (title, caption, album, schedule) and contact-form messages. |
| **Firebase Storage** | The actual photo and video files uploaded from the admin panel. |
| **Firebase Auth** | Admin login. Only users with the `admin` claim can open `/admin` or upload files. |
| **Razorpay** | The Donate button links to ARCOD’s existing Razorpay page (`lib/content.ts → org.razorpay`). |

**How scheduling works:** every photo, video and event has a `status` (Published or Draft) and a `publishAt` time. The public site shows an item only when it is Published **and** `publishAt` has passed. The homepage “Coming up” band shows only published events dated today or later. If there are none, the band hides itself.

**Why Neon stays free:** public pages are cached and refreshed at most every 5 minutes, or straight away when an admin saves. Most visits never touch the database. `/api/health` (for UptimeRobot) also never queries it, so Neon can sleep between visits.

---

## Project map

```
app/(site)/…           Public pages: home, about, programmes, events, gallery, contact, legal
app/admin/login        Admin sign-in
app/admin/(panel)/…    Admin: overview, media library, events, messages
app/admin/actions.ts   All admin create / update / delete actions (each checks admin login)
app/api/auth/session   Turns a Firebase login into a secure session cookie
app/api/health         Health check for UptimeRobot
lib/content.ts         Static text: programmes, board, milestones, awards, partners, reports
lib/data.ts            Public database queries (published + scheduled-time aware)
prisma/schema.prisma   Database tables
public/images, public/reports   Photos, logo and PDF reports
apphosting.yaml        App Hosting config (instances, env vars, secrets)
storage.rules          Who can upload and delete files
```

To change static text, such as a new board member or programme, edit `lib/content.ts` and push.

---

## 1. Run it locally (Windows / PowerShell)

```powershell
cd D:\GS\arcod-web
npm install
copy .env.example .env
# Fill in .env (see steps 2 and 3 for where each value comes from)
npx prisma migrate deploy      # creates the tables in Neon
npm run dev                    # open http://localhost:3000
```

To sign in to `/admin` locally, firebase-admin needs a service-account key:

1. Firebase console → Project settings → Service accounts → **Generate new private key**.
2. Save it as `service-account.json` in the project folder. It is already in `.gitignore`. **Never commit it.**
3. Add `GOOGLE_APPLICATION_CREDENTIALS="./service-account.json"` to `.env`.

---

## 2. Neon (database)

1. Go to neon.tech and create a project named **arcod**. Pick the **AWS Asia Pacific (Singapore)** region, the closest to India.
2. Go to **Dashboard → Connect** and copy two connection strings:
   - With **Connection pooling ON** → this is `DATABASE_URL`.
   - With **Connection pooling OFF** → this is `DIRECT_URL`.

---

## 3. Firebase (on ARCOD’s own Google account)

1. **Create the project:** console.firebase.google.com → **Create project** → name it `arcod-website`.
2. **Upgrade to Blaze:** click **Spark → Upgrade → Blaze** in the bottom-left corner and link a billing account. App Hosting and Storage both need Blaze.
3. **Set a budget alert:** console.cloud.google.com → **Billing → Budgets & alerts → Create budget** → ₹300 a month, with alerts at 50%, 90% and 100%.
4. **Add a web app:** Project settings → **Your apps → Web (</>)**. Copy `apiKey`, `authDomain`, `projectId`, `storageBucket` and `appId` into `.env` and `apphosting.yaml`. These values are public identifiers, not secrets.
5. **Turn on Auth:** Build → Authentication → **Get started → Email/Password → Enable**.
6. **Turn on Storage:** Build → Storage → **Get started**. Pick the **us-central1** region so it falls within the free tier.
7. **Deploy the upload rules:**
   ```powershell
   npm install -g firebase-tools
   firebase login
   firebase use --add            # choose arcod-website
   firebase deploy --only storage
   ```
8. **Create the admin users:**
   1. Go to Authentication → Users → **Add user** and enter, for example, `admin@arcod.in` with a strong password.
   2. Make the account an admin. This uses the service-account key from step 1:
      ```powershell
      $env:GOOGLE_APPLICATION_CREDENTIALS=".\service-account.json"
      npm run set-admin -- admin@arcod.in
      ```
   3. To remove access later: `npm run set-admin -- admin@arcod.in --revoke`.

---

## 4. Deploy on Firebase App Hosting

1. Push this project to GitHub, for example `GraySolutions-org/arcod-web`.
2. Store the database secrets in Cloud Secret Manager, never in code:
   ```powershell
   firebase apphosting:secrets:set DATABASE_URL     # paste the pooled Neon URL
   firebase apphosting:secrets:set DIRECT_URL       # paste the direct Neon URL
   ```
   Answer **Yes** when it asks to grant the backend access.
3. In the Firebase console go to **Build → App Hosting → Get started**, connect the GitHub repo and choose branch `main`.
4. From then on, every push to `main` deploys automatically. Each build runs `prisma migrate deploy`, so database changes go live with the code.
5. **If admin login fails in production with “Sign-in failed”:**
   1. Go to Google Cloud console → **IAM**.
   2. Find the App Hosting service account. It looks like `firebase-app-hosting-compute@arcod-website.iam.gserviceaccount.com`.
   3. Add the roles **Firebase Authentication Admin** and **Storage Admin**. The second one is needed for deleting files.

`apphosting.yaml` caps the site at **2 instances** so a traffic spike can’t run up the bill, and scales to **0** when idle.

---

## 5. Connect arcod.in

1. Go to App Hosting → your backend → **Settings → Domains → Add custom domain**. Add `arcod.in`, then add `www.arcod.in` and set it to redirect to `arcod.in`.
2. At the domain registrar, delete the old **A, AAAA and CNAME records for `@` and `www`**, then add the records Firebase shows you. **Don’t touch any MX (email) records.**
3. Wait for DNS to update (usually under an hour, up to 48 hours). Firebase issues the SSL certificate automatically.
4. Set up **arcod.org** and **arcod.net** with domain forwarding (301 redirect) to `https://arcod.in`.
5. Old page addresses are redirected in `next.config.ts → redirects()`. Add any other old URLs you find there.
6. Add the site to Google Search Console and submit `https://arcod.in/sitemap.xml`.

---

## 6. UptimeRobot

Create these monitors at 5-minute intervals, using an account in ARCOD’s name:

- **Keyword** monitor on `https://arcod.in`, checking that the page contains `ARCOD`.
- **HTTP(S)** monitor on `https://arcod.in/api/health`. This endpoint doesn’t wake the database.

Send the alerts to ARCOD’s office email and the developer’s email.

---

## Using the admin panel (for ARCOD staff)

Go to **arcod.in/admin** and sign in.

- **Media library**
  - Choose Photo(s), Video file or YouTube link. You can pick many photos at once.
  - Large photos are shrunk automatically before upload.
  - Add an album and a caption.
  - Leave **Publish on** blank to publish now, or pick a date and time to schedule it.
  - Use **Feature** to put a photo on the homepage strip, **Hide** to take it off the site and **Delete** to remove it, including the file.
- **Events**
  - Click **New event** and fill in the title, date, time, venue, short summary, full description, cover photo and an optional registration link.
  - Published events dated today or later appear on the homepage automatically, and each event gets its own shareable page.
- **Messages**
  - Messages from the website contact form arrive here. Mark them handled once you’ve replied.

---

## Before launch: please confirm with ARCOD

Each of these is marked `[confirm]` in the code:

- **Impact figures** (`lib/content.ts`): the Impact Snapshot gives both 12,500+ and 10,000+ farmers.
- **Sujay** is listed as a Governing Body member, but he isn’t in the annual report’s board list.
- **"Annual Report 2025"** is assumed to be the 2024–25 report.
- **Partner names** shown as `[confirm partner]`.
- **Donation amounts** and the impact text next to them (`components/site/DonateBox.tsx`).
- **Privacy, Terms and Refund pages**: ARCOD’s auditor or adviser should review them. Razorpay requires these pages.
