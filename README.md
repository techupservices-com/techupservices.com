# TechUpServices.com

Marketing website for TechUpServices built with Next.js, TypeScript, and Tailwind CSS. The site highlights the agency's service offerings and includes a contact form backed by a server-side email endpoint.

## Highlights

- Responsive landing page with hero, about, services, and contact sections
- Service showcase for AI automation, social media, websites, apps, WhatsApp automation, digital marketing, and consulting
- Contact form that posts to `src/app/api/contact/route.ts`
- Email notifications and customer confirmations using Nodemailer
- Animated UI built with Framer Motion

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Nodemailer

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Environment Variables

Create a `.env.local` file in the project root with:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

If `SMTP_USER` or `SMTP_PASS` is missing, the contact API simulates a successful submission in development so the frontend can still be tested.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/app/                 App Router pages and API routes
src/app/api/contact/    Contact form backend endpoint
src/components/         Reusable UI sections and components
src/data/services.ts    Service catalog content
public/images/          Service and site imagery
```

## Deployment

The app is ready for deployment on platforms that support Next.js, including Vercel.
