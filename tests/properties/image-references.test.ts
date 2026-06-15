import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

const CONTENT_DIR = path.resolve(__dirname, '../../src/content/docs');
const PUBLIC_DIR = path.resolve(__dirname, '../../public');
const BASE_PREFIX = '/kiro-wsl-aws-setup-guide/';

interface ImageReference {
  altText: string;
  imagePath: string;
  sourceFile: string;
}

function getMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function collectImageReferences(): ImageReference[] {
  const mdxFiles = getMdxFiles(CONTENT_DIR);

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const references: ImageReference[] = [];

  for (const file of mdxFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    let match: RegExpExecArray | null;
    while ((match = imageRegex.exec(content)) !== null) {
      references.push({
        altText: match[1],
        imagePath: match[2],
        sourceFile: path.relative(CONTENT_DIR, file),
      });
    }
  }

  return references;
}

describe('Feature: kiro-wsl-aws-setup-guide, Property 2: Image reference resolution', () => {
  const references = collectImageReferences();

  it('all image paths resolve to existing files in public/ after removing base prefix', () => {
    /**
     * Validates: Requirements 3.2, 8.2
     *
     * For any Markdown image reference found in any MDX file,
     * removing the base path prefix `/kiro-wsl-aws-setup-guide/` from the path
     * SHALL yield a relative path that resolves to an existing file in `public/`.
     */
    expect(references.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...references), (ref) => {
        const relativePath = ref.imagePath.startsWith(BASE_PREFIX)
          ? ref.imagePath.slice(BASE_PREFIX.length)
          : ref.imagePath;

        const resolvedPath = path.join(PUBLIC_DIR, relativePath);
        expect(
          fs.existsSync(resolvedPath),
          `Image "${ref.imagePath}" in ${ref.sourceFile} does not resolve to existing file at ${resolvedPath}`,
        ).toBe(true);
      }),
      { numRuns: 100 },
    );
  });
});

describe('Open Graph image asset', () => {
  it('og-image.png exists in public/ for social preview cards', () => {
    const ogPath = path.join(PUBLIC_DIR, 'og-image.png');
    expect(fs.existsSync(ogPath), `Expected OG image at ${ogPath}`).toBe(true);
  });
});

describe('Feature: kiro-wsl-aws-setup-guide, Property 3: Image alt text completeness', () => {
  const references = collectImageReferences();

  it('all image references have non-empty alt text with at least one word character', () => {
    /**
     * Validates: Requirements 3.4
     *
     * For any Markdown image reference found in any MDX file,
     * the alt text portion SHALL be a non-empty string containing
     * at least one word character.
     */
    expect(references.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...references), (ref) => {
        expect(
          ref.altText.length,
          `Image "${ref.imagePath}" in ${ref.sourceFile} has empty alt text`,
        ).toBeGreaterThan(0);

        expect(
          /\w/.test(ref.altText),
          `Image "${ref.imagePath}" in ${ref.sourceFile} has alt text without word characters: "${ref.altText}"`,
        ).toBe(true);
      }),
      { numRuns: 100 },
    );
  });
});
