# Implementation Plan: Kiro WSL AWS Setup Guide

## Overview

Convert the monolithic SETUP_GUIDE.md into a multi-page Astro Starlight documentation site with property-based testing, formatting/linting validation, and GitHub Pages deployment. The implementation proceeds from project scaffolding through content conversion to testing and wiring.

## Tasks

- [x] 1. Set up Astro Starlight project structure and configuration
  - [x] 1.1 Create `package.json` with all dependencies and npm scripts
    - Declare `astro` and `@astrojs/starlight` as dependencies
    - Declare `vitest`, `fast-check`, `prettier`, `markdownlint-cli2`, `tsx`, and `gray-matter` as dev dependencies
    - Define scripts: `dev`, `build`, `preview`, `validate`, `format`, `lint`, `test`
    - _Requirements: 1.3, 6.4_

  - [x] 1.2 Create `astro.config.mjs` with Starlight integration and sidebar
    - Configure `site`, `base` path `/kiro-wsl-aws-setup-guide/`, and Starlight integration
    - Define sidebar array with Introduction link and 8 slug entries in sequential order
    - _Requirements: 1.1, 4.1, 4.2, 4.3, 4.4_

  - [x] 1.3 Create `tsconfig.json`, `.nvmrc`, and `.gitignore`
    - `tsconfig.json` extends `astro/tsconfigs/strict`
    - `.nvmrc` contains `22`
    - `.gitignore` excludes `node_modules/`, `dist/`, `.astro/`
    - _Requirements: 1.2, 1.4, 6.3_

  - [x] 1.4 Create `vitest.config.ts` at project root
    - Configure test file location pattern for `tests/properties/`
    - _Requirements: 6.4_

  - [x] 1.5 Create `.prettierrc` and `.markdownlint.json`
    - `.prettierrc` specifies print width, trailing commas, single quotes
    - `.markdownlint.json` disables MD033 (inline HTML) and MD013 (line length)
    - _Requirements: 6.1, 6.2_

  - [x] 1.6 Create `.vscode/extensions.json` recommending Astro extension
    - Recommend the `astro-build.astro-vscode` extension
    - _Requirements: 6.5_

- [x] 2. Copy image assets and create content pages
  - [x] 2.1 Copy all 18 PNG images from source to `public/images/`
    - Preserve original filenames
    - _Requirements: 3.1, 3.3_

  - [x] 2.2 Create `src/content/docs/index.mdx` introduction page
    - Add YAML frontmatter with `title` field
    - Write introduction content with links to each section page and brief descriptions
    - _Requirements: 2.10, 2.11_

  - [x] 2.3 Create `src/content/docs/windows-host-prerequisites.mdx`
    - Preserve all instructional content: BIOS virtualization, WSL2, Docker Desktop, Kiro IDE installation
    - Update image references to format `![alt text](/kiro-wsl-aws-setup-guide/images/filename.png)`
    - Add descriptive alt text to all images
    - _Requirements: 2.2, 2.11, 3.2, 3.4_

  - [x] 2.4 Create `src/content/docs/kiro-ide-extensions.mdx`
    - Preserve all instructional content covering recommended extensions configuration
    - Update image references with proper base path and alt text
    - _Requirements: 2.3, 2.11, 3.2, 3.4_

  - [x] 2.5 Create `src/content/docs/wsl2-linux-distribution-setup.mdx`
    - Preserve all instructional content covering Linux distribution configuration
    - Update image references with proper base path and alt text
    - _Requirements: 2.4, 2.11, 3.2, 3.4_

  - [x] 2.6 Create `src/content/docs/docker-desktop-wsl2-integration.mdx`
    - Preserve all instructional content covering Docker Desktop integration with WSL2
    - Update image references with proper base path and alt text
    - _Requirements: 2.5, 2.11, 3.2, 3.4_

  - [x] 2.7 Create `src/content/docs/workspace-setup.mdx`
    - Split corresponding section from source guide
    - Preserve all instructional content covering Git configuration, GitHub SSH keys, AWS SSO
    - Update image references with proper base path and alt text
    - _Requirements: 2.6, 2.11, 3.2, 3.4_

  - [x] 2.8 Create `src/content/docs/kiro-workspace-configuration.mdx`
    - Split corresponding section from source guide
    - Preserve all instructional content covering steering files, MCP configuration, workspace settings
    - Update image references with proper base path and alt text
    - _Requirements: 2.7, 2.11, 3.2, 3.4_

  - [x] 2.9 Create `src/content/docs/final-verification.mdx`
    - Split corresponding section from source guide
    - Preserve all instructional content covering environment verification steps
    - Update image references with proper base path and alt text
    - _Requirements: 2.8, 2.11, 3.2, 3.4_

  - [x] 2.10 Create `src/content/docs/next-steps-quick-reference.mdx`
    - Split corresponding section from source guide
    - Preserve all instructional content covering next steps and quick reference summary
    - Update image references with proper base path and alt text
    - _Requirements: 2.9, 2.11, 3.2, 3.4_

- [x] 3. Checkpoint - Verify content structure
  - Ensure all 9 MDX files exist with valid frontmatter, all images are in `public/images/`, and image references use the correct base path format. Ask the user if questions arise.

- [x] 4. Implement validation script and property-based tests
  - [x] 4.1 Create `scripts/validate-content.ts`
    - Run `prettier --check .` then `markdownlint-cli2 "src/**/*.mdx"` sequentially
    - Exit with non-zero code if either step fails
    - _Requirements: 5.3, 6.1, 6.2_

  - [x] 4.2 Write property test for frontmatter validity (`tests/properties/frontmatter.test.ts`)
    - **Property 1: Frontmatter validity**
    - Read all MDX files from `src/content/docs/`, use fast-check to sample from file list
    - Assert: frontmatter parses without error, has `title` key, `title` is non-empty string
    - Report file path and specific validation issue on failure
    - **Validates: Requirements 2.11, 8.1, 8.5**

  - [x] 4.3 Write property test for image reference resolution (`tests/properties/image-references.test.ts`)
    - **Property 2: Image reference resolution**
    - **Property 3: Image alt text completeness**
    - Extract all Markdown image references from MDX files using regex
    - Use fast-check to sample from collected references
    - Assert: path resolves to existing file in `public/` after removing base prefix
    - Assert: alt text is non-empty with at least one word character
    - **Validates: Requirements 3.2, 3.4, 8.2**

  - [x] 4.4 Write property test for sidebar consistency (`tests/properties/sidebar-consistency.test.ts`)
    - **Property 4: Sidebar-to-file consistency**
    - Parse `astro.config.mjs` to extract sidebar slug references
    - Use fast-check to sample from extracted slugs
    - Assert: corresponding MDX file exists at `src/content/docs/{slug}.mdx`
    - **Validates: Requirements 4.4, 8.3**

- [x] 5. Create README and finalize project
  - [x] 5.1 Update `README.md` with project documentation
    - State project name, one-sentence description, and technology stack
    - Include local development setup instructions (clone, install, Node.js version, dev server)
    - Include deployed site URL `https://jajera.github.io/kiro-wsl-aws-setup-guide/`
    - List all npm scripts with one-line descriptions
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 5.2 Install dependencies and verify build succeeds
    - Run `npm install` to generate `package-lock.json`
    - Run `npm run build` to confirm the site builds to `dist/`
    - _Requirements: 1.7, 5.3, 5.5_

- [x] 6. Final checkpoint - Ensure all tests pass
  - Run `npm run test` to confirm property-based tests pass. Run `npm run validate` to confirm formatting and linting pass. Run `npm run build` to confirm the full site builds. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- The deploy workflow (`.github/workflows/deploy.yml`) already exists and does not need modification
- Source content comes from the original SETUP_GUIDE.md
- Image references in MDX must use format: `![alt text](/kiro-wsl-aws-setup-guide/images/filename.png)`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.7", "2.8", "2.9", "2.10"] },
    { "id": 1, "tasks": ["4.1", "5.1"] },
    { "id": 2, "tasks": ["4.2", "4.3", "4.4"] },
    { "id": 3, "tasks": ["5.2"] }
  ]
}
```
