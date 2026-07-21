# Lucio Villena — Portfolio

A single-page personal portfolio. Computer Engineering @ UCF — real-time
computer-vision systems, LLM fine-tuning pipelines, and full-stack products.

Built with the Next.js App Router and a hand-rolled retro-wave canvas hero. The
UI was implemented from a Claude Design source into a dark "modernist"
oxblood/red theme.

## Tech stack

- **[Next.js 16](https://nextjs.org)** — App Router, authored in JSX (`src/app/page.jsx`, not TypeScript pages)
- **[React 19](https://react.dev)**
- **[Tailwind CSS v4](https://tailwindcss.com)** — via `@tailwindcss/postcss`, with custom theme tokens (`bg-ink`, `text-paper`)
- **[Framer Motion](https://www.framer.com/motion/)** — scroll-reveal animations (`src/components/Reveal.jsx`)
- **[lucide-react](https://lucide.dev)** — nav icons
- **[Resend](https://resend.com)** — powers the `/api/contact` email route
- **`next/font`** — self-hosted [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- **Custom `<canvas>` animation** — the retro-wave hero backdrop (perspective grid, geometric sun, starfield) is hand-written, no animation library

## Getting started

Requires **Node.js 18.18+** (Next.js 16).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

The contact form (`src/components/ContactForm.jsx`) POSTs to the route handler
at `src/app/api/contact/route.ts`, which sends mail through Resend. Create a
`.env.local` in the project root:

```bash
# Required — the contact form returns a 500 until both are set
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=you@example.com          # where contact messages are delivered

# Optional — sender address (falls back to Resend's shared test address)
CONTACT_FROM="Portfolio Contact <onboarding@resend.dev>"
```

Resend requires a verified sender domain in production; until one is set up,
messages send from the shared `onboarding@resend.dev` address.

## Project structure

```
src/
├── app/
│   ├── layout.jsx              # root layout: fonts, metadata, <Navbar>
│   ├── page.jsx                # composes the single page
│   ├── globals.css             # Tailwind + theme tokens
│   └── api/contact/route.ts    # POST /api/contact — Resend email handler
├── components/
│   ├── Navbar.jsx              # fixed top nav
│   ├── HeroSection.jsx         # retro-wave canvas backdrop
│   ├── AboutSection.jsx
│   ├── ProjectsSection.jsx     # #work — featured project + cards
│   ├── TechnologiesSection.jsx # #skills — interactive panel
│   ├── EducationSection.jsx
│   ├── ContactSection.jsx      # wraps ContactForm
│   ├── ContactForm.jsx         # client form → /api/contact
│   ├── Footer.jsx
│   └── Reveal.jsx              # Framer Motion scroll-reveal wrapper
└── lib/
    ├── constants.js            # RESUME_URL
    └── utils.js                # cn() — clsx + tailwind-merge
```

## Adding the résumé

Every "résumé" button links to `RESUME_URL` in `src/lib/constants.js`
(`/Resume_LucioVillena_Orl_V4.pdf`). Drop the matching PDF into `public/` or the
download will 404.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server on port 3000    |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Deploy

Deploys cleanly to [Vercel](https://vercel.com/new). Remember to add the same
environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL`, and optionally
`CONTACT_FROM`) in the project's settings so the contact form works in
production.

## Credits

- UI implemented from a Claude Design source
- Icons by [Lucide](https://lucide.dev)
