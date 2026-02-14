# Smart Nagar Seva (Vite + React + TypeScript)

A modern frontend template for civic/municipal service portals built with Vite, React, TypeScript, Tailwind CSS and a component system inspired by shadcn/ui and Radix UI primitives.

This repository provides a starter UI for complaint/report submission, staff dashboards, and modular UI components.

--

## Key Features

- Clean component-driven UI (Radix primitives + custom UI wrappers)
- TypeScript-first React app with Vite for fast dev and build
- Tailwind CSS with utility-first styling and animations
- Ready-made UI building blocks in `src/components/ui`
- Pages for public index, login, and a staff dashboard

## Tech Stack

- Framework: React 18 (TypeScript)
- Build: Vite
- Styling: Tailwind CSS
- UI primitives: Radix UI packages, shadcn-style components
- State & Data: `react-query` available in dependencies
- Forms: `react-hook-form` + `zod` for validation

## Quick Start

Prerequisites:

- Node.js (recommended LTS)
- A package manager (npm, pnpm, or yarn)

Install dependencies:

```bash
npm install
# or
pnpm install
```

Run the dev server:

```bash
npm run dev
```

Open the app at http://localhost:5173 (Vite default).

Build for production:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

Lint the code:

```bash
npm run lint
```

## Project Structure

Top-level files and folders of interest:

- `src/` — application source code
  - `App.tsx` — main app shell and routes
  - `main.tsx` — entrypoint that mounts the React app
  - `index.css` / `App.css` — global styles (Tailwind entry)
  - `components/` — domain components and a `ui/` subfolder with atomic UI building blocks
  - `pages/` — page-level route components: `Index`, `Login`, `NotFound`
  - `contexts/` — `LanguageContext` for localization context
  - `hooks/` — custom hooks like `use-mobile` and `use-toast`
  - `lib/` — small utilities

The `src/components/ui` folder contains many small wrapper components (accordion, dialog, input, button, toast, etc.) that centralize styling and behavior.

## Components & Pages

- `ComplaintForm.tsx` — sample form for submitting complaints (uses `react-hook-form` patterns)
- `Header.tsx`, `LocationSelector.tsx`, `DepartmentCard.tsx` — common UI building blocks
- `StaffDashboard.tsx` — sample/stub dashboard for staff-facing view

If you extend the app, add new reusable pieces into `src/components/ui` so other pages can reuse them.

## Configuration

- Tailwind config: `tailwind.config.ts`
- Vite config: `vite.config.ts`
- TypeScript configs: `tsconfig.json`, `tsconfig.app.json`

## Recommendations & Next Steps

- Add routing and protected routes using `react-router-dom` (already included as dependency).
- Integrate API calls using `@tanstack/react-query` and a backend endpoint.
- Add i18n support in `LanguageContext` for multi-language capability.
- Wire up authentication flows in `pages/Login.tsx` and protect staff routes.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork and create a feature branch
2. Run and test locally
3. Open a PR with a description of changes

Please follow existing code style and TypeScript types.

## License

This project currently includes a `LICENSE` file in the repository root — refer to that for license details.

## Credits

- Built with Vite, React, Tailwind CSS, Radix UI and various utility libraries.

--

If you'd like, I can also:

- Add a short development checklist to this README
- Generate a minimal `CONTRIBUTING.md` or `DEVELOPMENT.md`
- Add example env and API mocking instructions

Tell me which of these you'd like next.
