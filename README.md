# CYBERSHIELD X

**Intelligent Security Operations & Threat Monitoring Platform**

CYBERSHIELD X is an MCA major-project and portfolio foundation that demonstrates the frontend architecture of a professional Security Operations Center (SOC). It combines simulated security telemetry, alert triage, incident response, analytics, governance, and administration in one responsive command center.

> **Security disclaimer:** Every event, identity, address, alert, threat indicator, and incident in this repository is fictional demo data. This project contains no offensive capability, real infrastructure targeting, credentials, or secrets.

## Problem statement

Security teams need a unified view of high-volume events, prioritized detections, active investigations, and system health. Many academic implementations reduce this domain to CRUD screens. CYBERSHIELD X instead establishes a realistic, API-ready interface and maintainable application architecture suitable for later connection to defensive backend services.

## Objectives

- Present a polished, responsive SOC workflow.
- Separate UI, state, services, and simulated data.
- Support alert triage and incident investigation interactions.
- Prepare clean boundaries for REST, JWT, RBAC, MongoDB, and Socket.IO.
- Provide accessible loading, empty, error, and success patterns.

## Features

- Premium demo authentication and profile-ready session context
- Persistent responsive navigation and real-time system header
- SOC dashboard with KPIs, event charts, severity distribution, alert queue, and incident overview
- Simulated live event monitor with a Socket.IO-ready service adapter
- Searchable security logs and event details
- Interactive alert and incident management drawers
- Simulated threat intelligence and geographic event visualization
- Multi-panel security analytics and reporting workspace
- Audit trail, user roles, detection rules, and settings
- Unique metadata for every route

## Technology stack

- React 19 + TypeScript
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS v4
- Lucide React
- Recharts
- Motion for React
- TanStack Query (ready for server-backed data)

Future backend: Node.js, Express, MongoDB, JWT, Socket.IO, optional FastAPI, Redis, and Docker.

## Architecture

```text
src/
├── components/     reusable shell, charts, tables, badges, drawers, and states
├── context/        authentication/profile and application state
├── data/           fictional security records
├── hooks/          simulated live-event lifecycle
├── pages/          feature screens
├── routes/         URL routing and page metadata
├── services/       API-ready client and domain adapters
├── utils/          formatting helpers
└── styles.css      semantic design tokens and global interface system
```

The service layer currently resolves demo records asynchronously. Replace those implementations with `apiRequest()` calls without rewriting page components. The live adapter exposes a future connection boundary for Socket.IO.

## Local installation

Requirements: Node.js 20+ and Bun (recommended) or npm.

```bash
git clone <repository-url>
cd <repository-directory>
cp .env.example .env.local
bun install
bun run dev
```

Open `http://localhost:3000` or the address shown by Vite. To use npm instead:

```bash
npm install
npm run dev
```

On the login screen, enter any valid-looking email and any non-empty password, or choose **Use demo environment** and authenticate. This creates only a browser-session demo state.

Production preview:

```bash
bun run build
bun run preview
```

## Environment variables

Copy `.env.example` to `.env.local`. Never commit real secrets.

- `VITE_API_BASE_URL` — future REST API base URL
- `VITE_SOCKET_URL` — future Socket.IO endpoint
- `VITE_DEMO_MODE` — demo-data mode flag

## Screenshots

Add repository screenshots here after deployment:

- Dashboard overview
- Live monitor
- Incident investigation
- Mobile navigation

## Future scope

1. Node.js + Express backend
2. MongoDB persistence
3. JWT authentication, profile storage, and RBAC
4. Defensive detection engine
5. Persistent incident management
6. Socket.IO live monitoring
7. Server-generated analytics and reports
8. Python/FastAPI analytics service
9. Redis caching
10. Docker packaging
11. Automated testing, CI/CD, and deployment

See [`roadmap.md`](./roadmap.md) for the tracked phases.

## Safe use

CYBERSHIELD X is for education, defensive monitoring demonstrations, and portfolio review. Do not replace its sample records with personal information or connect it to infrastructure without authorization and appropriate security review.
