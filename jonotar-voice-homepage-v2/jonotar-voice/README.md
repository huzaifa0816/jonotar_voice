# সাধারণ মানুষের কথা

A Bangla public-opinion polling MVP built with Next.js, TypeScript, Tailwind CSS and Supabase.

## Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Create `.env.local` from `.env.example`.
5. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Install dependencies:
   `npm install`
7. Start:
   `npm run dev`

## Create the first poll

Run in Supabase SQL Editor:

```sql
insert into polls (question, description)
values (
  'সরকারের বর্তমান কার্যক্রম নিয়ে আপনার মতামত কী?',
  'আপনার নিজের মতামত থেকে একটি উত্তর নির্বাচন করুন।'
)
returning id;
```

Copy the returned poll id, then:

```sql
insert into poll_options (poll_id, option_text, sort_order)
values
('PASTE_POLL_ID', 'সন্তুষ্ট', 1),
('PASTE_POLL_ID', 'আংশিক সন্তুষ্ট', 2),
('PASTE_POLL_ID', 'অসন্তুষ্ট', 3),
('PASTE_POLL_ID', 'সিদ্ধান্ত নেই', 4);
```

## Important

This is an MVP. Before public launch, add stronger anti-bot/duplicate-vote controls, rate limiting, abuse monitoring, admin moderation, audit logs, privacy controls, and a published polling methodology.

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client or commit `.env.local` to GitHub.
