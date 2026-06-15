# Requirements Document

## Introduction

This document defines the requirements for creating an Astro Starlight documentation site that hosts a comprehensive setup guide for configuring a WSL2 + Docker Desktop + Kiro IDE + AWS SSO development environment. The site converts an existing monolithic Markdown guide into a structured, navigable, multi-page documentation site deployed to GitHub Pages at `https://jajera.github.io/kiro-wsl-aws-setup-guide/`.

The project follows the same structure and tooling patterns as the reference repository `jajera/ecs-express-mode-walkthrough`.

## Glossary

- **Site**: The Astro Starlight documentation site built from this repository
- **Builder**: The Astro build system that compiles source content into static HTML
- **Content_Directory**: The `src/content/docs/` directory containing MDX documentation pages
- **Navigation**: The Starlight sidebar configuration that organizes pages into sections
- **Deployment_Pipeline**: The GitHub Actions workflow that builds and deploys the Site to GitHub Pages
- **Validator**: The combined linting and formatting checks (Markdownlint, Prettier) that enforce content quality
- **Test_Runner**: Vitest configured to execute property-based tests against site content and configuration
- **Source_Guide**: The original SETUP_GUIDE.md file containing 1595 lines across 8 major sections
- **Image_Assets**: The 18 PNG screenshot files from `docs/images/` used within the guide content

## Requirements

### Requirement 1: Astro Starlight Project Structure

**User Story:** As a developer, I want the repository to follow standard Astro Starlight project conventions, so that contributors can navigate and maintain the project using familiar patterns.

#### Acceptance Criteria

1. THE Site SHALL have an `astro.config.mjs` configuration file at the repository root that configures the Starlight integration with a site title, sidebar navigation array, and the `base` path set to `/kiro-wsl-aws-setup-guide/`
2. THE Site SHALL have a `tsconfig.json` file at the repository root that extends the Astro strict TypeScript configuration (`astro/tsconfigs/strict`)
3. THE Site SHALL have a `package.json` file at the repository root that declares `astro` and `@astrojs/starlight` as dependencies and includes scripts for `dev`, `build`, `preview`, `validate`, `format`, `lint`, and `test`
4. THE Site SHALL have an `.nvmrc` file at the repository root containing the major version number `22`
5. THE Site SHALL have a `src/content/docs/` directory structure containing MDX documentation pages
6. THE Site SHALL have a `public/` directory for static assets including images
7. WHEN `npm run build` is executed at the repository root, THE Builder SHALL complete successfully and produce output in the `dist/` directory

### Requirement 2: Content Conversion from Source Guide

**User Story:** As a reader, I want the setup guide split into logical multi-page sections, so that I can navigate directly to the topic I need without scrolling through a single long document.

#### Acceptance Criteria

1. THE Content_Directory SHALL contain at least 9 MDX pages (8 content pages corresponding to the Source_Guide major sections plus 1 index page)
2. WHEN the Source_Guide section "Windows Host Prerequisites" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content (commands, configuration steps, and explanations) covering BIOS virtualization, WSL2 installation, Docker Desktop installation, and Kiro IDE installation
3. WHEN the Source_Guide section "Kiro IDE Extensions" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content covering recommended extensions configuration
4. WHEN the Source_Guide section "WSL2 Linux Distribution Setup" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content covering Linux distribution configuration
5. WHEN the Source_Guide section "Docker Desktop WSL2 Integration" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content covering Docker Desktop integration with WSL2
6. WHEN the Source_Guide section "Workspace Setup" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content covering Git configuration, GitHub SSH keys, and AWS SSO setup
7. WHEN the Source_Guide section "Kiro Workspace Configuration" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content covering steering files, MCP configuration, and workspace settings
8. WHEN the Source_Guide section "Final Verification" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content covering environment verification steps
9. WHEN the Source_Guide section "Next Steps + Quick Reference" is converted, THE Content_Directory SHALL contain a page that preserves all instructional content covering next steps and a quick reference summary
10. THE Content_Directory SHALL contain an index page that introduces the guide and provides links to each section page with a brief description
11. WHEN an MDX page is created, THE page SHALL include YAML frontmatter with a `title` field matching the topic of the corresponding Source_Guide section

### Requirement 3: Image Asset Integration

**User Story:** As a reader, I want screenshots displayed inline within the documentation pages, so that I can visually follow setup instructions.

#### Acceptance Criteria

1. THE Site SHALL store all Image_Assets in the `public/images/` directory
2. WHEN an MDX page references a screenshot, THE Site SHALL render the image using a path that combines the configured base path `/kiro-wsl-aws-setup-guide/` with the image filename from the `images/` directory
3. THE Site SHALL include all 18 PNG screenshot files from the original Source_Guide, preserving the original filenames from the `docs/images/` source directory
4. WHEN an MDX page renders a screenshot, THE Site SHALL include an alt attribute with descriptive text that conveys the content or purpose of the screenshot

### Requirement 4: Sidebar Navigation Configuration

**User Story:** As a reader, I want a sidebar that organizes pages by topic area, so that I can quickly find and navigate between sections.

#### Acceptance Criteria

1. THE Navigation SHALL group pages into sections corresponding to the Source_Guide's major topic areas as defined in Requirement 2 (Windows Host Prerequisites, Kiro IDE Extensions, WSL2 Linux Distribution Setup, Docker Desktop WSL2 Integration, Workspace Setup, Kiro Workspace Configuration, Final Verification, and Next Steps + Quick Reference)
2. THE Navigation SHALL display section labels that match the topic area names of the Source_Guide sections they contain
3. THE Navigation SHALL present pages in the sequential order matching the guide workflow (prerequisites first, verification last), such that the index page appears before all section pages and no section appears before its prerequisite sections
4. THE Navigation SHALL include a sidebar entry for every MDX page in the Content_Directory, and every sidebar entry SHALL reference an existing page in the Content_Directory

### Requirement 5: GitHub Pages Deployment

**User Story:** As a maintainer, I want the site automatically deployed to GitHub Pages on push to main, so that documentation updates are published without manual steps.

#### Acceptance Criteria

1. WHEN a push occurs to the main branch, THE Deployment_Pipeline SHALL trigger a GitHub Actions workflow that builds the Site and deploys to GitHub Pages
2. THE Deployment_Pipeline SHALL use the Node.js version specified in `.nvmrc` via the `actions/setup-node` action with `node-version-file`
3. THE Deployment_Pipeline SHALL run `npm run validate` before executing `npm run build`
4. THE Deployment_Pipeline SHALL upload the `dist/` build output as a Pages artifact using `actions/upload-pages-artifact`
5. IF the validate or build step exits with a non-zero code, THEN THE Deployment_Pipeline SHALL fail the workflow run and not proceed to the deploy job
6. THE Deployment_Pipeline SHALL use concurrency settings that prevent parallel deployments to the same GitHub Pages environment

### Requirement 6: Development Tooling Configuration

**User Story:** As a contributor, I want consistent formatting and linting enforced across the project, so that content quality remains high and reviews focus on substance.

#### Acceptance Criteria

1. THE Validator SHALL include a `.prettierrc` file at the repository root that specifies formatting rules (at minimum: print width, trailing commas, and single quotes preference)
2. THE Validator SHALL include a `.markdownlint.json` file at the repository root that disables rules incompatible with MDX syntax (at minimum: `MD033` for inline HTML and `MD013` for line length)
3. THE Site SHALL include a `.gitignore` file that excludes at least `node_modules/`, `dist/`, and `.astro/` directories from version control
4. THE Test_Runner SHALL be configured with a `vitest.config.ts` file at the repository root that specifies the test file location pattern
5. THE Site SHALL include a `.vscode/extensions.json` file that recommends the Astro extension for VS Code contributors

### Requirement 7: README Documentation

**User Story:** As a new contributor, I want a README that explains the project purpose and how to run it locally, so that I can get started quickly.

#### Acceptance Criteria

1. THE Site SHALL have a `README.md` file at the repository root that states the project name, a one-sentence description of what the site provides (Astro Starlight documentation site for the WSL2 + Docker Desktop + Kiro IDE + AWS SSO setup guide), and the technology stack used
2. THE Site SHALL have a `README.md` file that includes local development setup instructions covering: cloning the repository, installing dependencies with npm, confirming the required Node.js version from `.nvmrc`, and starting the dev server
3. THE Site SHALL have a `README.md` file that includes the deployed site URL `https://jajera.github.io/kiro-wsl-aws-setup-guide/`
4. THE Site SHALL have a `README.md` file that lists each npm script defined in `package.json` (`dev`, `build`, `preview`, `validate`, `format`, `lint`, `test`) with a one-line description of its purpose

### Requirement 8: Property-Based Testing

**User Story:** As a maintainer, I want automated tests that verify content structure and configuration correctness, so that regressions are caught before deployment.

#### Acceptance Criteria

1. THE Test_Runner SHALL verify that all MDX files in the Content_Directory contain YAML frontmatter with a non-empty `title` string field
2. THE Test_Runner SHALL verify that all Markdown image syntax references (`![alt](path)`) in MDX files resolve to existing files in the `public/` directory
3. THE Test_Runner SHALL verify that the Starlight sidebar configuration in `astro.config.mjs` references only page slugs that correspond to existing MDX files in the Content_Directory
4. WHEN the test suite is executed, THE Test_Runner SHALL exit with a non-zero exit code if any verification check fails
5. IF an MDX file contains frontmatter that cannot be parsed as valid YAML or is missing the `title` field, THEN THE Test_Runner SHALL report the file path and the specific validation failure
