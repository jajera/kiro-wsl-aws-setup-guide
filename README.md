# Kiro WSL AWS Setup Guide

[![Deploy to GitHub Pages](https://github.com/jajera/kiro-wsl-aws-setup-guide/actions/workflows/deploy.yml/badge.svg)](https://github.com/jajera/kiro-wsl-aws-setup-guide/actions/workflows/deploy.yml)

Astro Starlight documentation site for the WSL2 + Docker Desktop + Kiro IDE + AWS SSO setup guide.

## Technology Stack

- [Astro](https://astro.build/) — Static site framework
- [Starlight](https://starlight.astro.build/) — Documentation theme for Astro
- [MDX](https://mdxjs.com/) — Markdown with JSX support for content pages
- [Vitest](https://vitest.dev/) + [fast-check](https://fast-check.dev/) — Property-based testing
- [Prettier](https://prettier.io/) — Code formatter
- [Markdownlint](https://github.com/DavidAnson/markdownlint) — Markdown/MDX linter
- [GitHub Pages](https://pages.github.com/) — Hosting and deployment

## Deployed Site

**https://jajera.github.io/kiro-wsl-aws-setup-guide/**

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) version 22 (see `.nvmrc`)

### Setup

```bash
# Clone the repository
git clone https://github.com/jajera/kiro-wsl-aws-setup-guide.git
cd kiro-wsl-aws-setup-guide

# Use the correct Node.js version (if using nvm)
nvm use

# Install dependencies
npm install

# Start the development server
npm run dev
```

## npm Scripts

| Script     | Command                               | Description                      |
| ---------- | ------------------------------------- | -------------------------------- |
| `dev`      | `astro dev`                           | Local development server         |
| `build`    | `astro build`                         | Production build to `dist/`      |
| `preview`  | `astro preview`                       | Preview production build locally |
| `validate` | `npx tsx scripts/validate-content.ts` | Run formatting and lint checks   |
| `format`   | `prettier --write .`                  | Auto-format all files            |
| `lint`     | `markdownlint-cli2 "src/**/*.mdx"`    | Lint MDX content files           |
| `test`     | `vitest --run`                        | Run property-based tests         |
