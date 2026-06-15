import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Feature: kiro-wsl-aws-setup-guide, Property 4: Sidebar-to-file consistency
 *
 * For any slug referenced in the Starlight sidebar configuration in
 * astro.config.mjs, there SHALL exist a corresponding MDX file at
 * src/content/docs/{slug}.mdx.
 *
 * Validates: Requirements 4.4, 8.3
 */

const projectRoot = path.resolve(import.meta.dirname, '..', '..');
const configPath = path.join(projectRoot, 'astro.config.mjs');
const docsDir = path.join(projectRoot, 'src', 'content', 'docs');

function extractSlugsFromConfig(): string[] {
  const configContent = fs.readFileSync(configPath, 'utf-8');
  const slugRegex = /\{\s*slug:\s*['"]([^'"]+)['"]\s*\}/g;
  const slugs: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = slugRegex.exec(configContent)) !== null) {
    slugs.push(match[1]);
  }

  return slugs;
}

describe('Feature: kiro-wsl-aws-setup-guide, Property 4: Sidebar-to-file consistency', () => {
  const slugs = extractSlugsFromConfig();

  it('should have at least one slug in the sidebar config', () => {
    expect(slugs.length).toBeGreaterThan(0);
  });

  it('every sidebar slug has a corresponding MDX file', () => {
    /**
     * Validates: Requirements 4.4, 8.3
     */
    fc.assert(
      fc.property(fc.constantFrom(...slugs), (slug) => {
        const mdxPath = path.join(docsDir, `${slug}.mdx`);
        const exists = fs.existsSync(mdxPath);
        expect(exists, `Expected MDX file to exist at src/content/docs/${slug}.mdx`).toBe(true);
      }),
      { numRuns: 100 },
    );
  });
});
