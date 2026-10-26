# CYBERSHIELD X foundation

## Build scope
- Create a complete responsive SOC application shell with desktop sidebar, mobile drawer, live status header, simulation labeling, profile menu, and logout.
- Add a polished demo login experience and profile-ready auth context. Authentication stays local and simulated; no real credentials or backend are introduced.
- Implement working routes for Dashboard, Live Monitor, Security Logs, Alerts, Incidents, Threat Intelligence, Attack Map, Analytics, Reports, Audit Logs, Users, Detection Rules, and Settings.
- Populate every surface with fictional reserved-network data and working frontend interactions: search, filters, status updates, details drawers, tabs, pagination, settings controls, and placeholder exports.
- Add reusable charts, tables, badges, filters, status indicators, loading/empty/error states, page transitions, and live-event simulation.
- Add API-ready service modules, demo-data modules, hooks, contexts, utilities, environment template, project documentation, and future roadmap.

## Visual direction
- Professional near-black SOC command center with charcoal surfaces, restrained red accents, thin borders, grid texture, compact typography, and subtle motion.
- Dense but legible information hierarchy; limited severity colors; no hacker imagery, excessive neon, or game styling.
- Responsive desktop, tablet, and mobile behavior with horizontally scrollable data tables where needed.

## Technical details
- Use the existing React 19, TanStack Router/Start, Vite, TypeScript, Tailwind CSS v4, Lucide, and Recharts stack.
- Use CSS transitions for restrained motion rather than adding an unnecessary animation dependency.
- Keep backend contracts centralized and leave Socket.IO behind a mock-compatible adapter for future replacement.
- Give every content route unique metadata and verify the preview on desktop and mobile.

## Deliverables
- Runnable frontend source with all routes connected.
- `README.md`, `.env.example`, `.gitignore`, and `roadmap.md`.
- No real attack data, secrets, credentials, offensive capabilities, or production authentication.
