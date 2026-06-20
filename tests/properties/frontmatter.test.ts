import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import matter from "gray-matter";
import * as fs from "fs";
import * as path from "path";

/**
 * Feature: kiro-wsl-aws-setup-guide, Property 1: Frontmatter validity
 *
 * Validates: Requirements 2.11, 8.1, 8.5
 *
 * For any MDX file in the src/content/docs/ directory (including subdirectories),
 * parsing its YAML frontmatter SHALL succeed and yield an object containing a
 * `title` field whose value is a non-empty string.
 */

const CONTENT_DIR = path.resolve(__dirname, "../../src/content/docs");

function getMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

describe("Feature: kiro-wsl-aws-setup-guide, Property 1: Frontmatter validity", () => {
  const mdxFiles = getMdxFiles(CONTENT_DIR);

  it("should find at least one MDX file to test", () => {
    expect(mdxFiles.length).toBeGreaterThan(0);
  });

  it("all MDX files have valid frontmatter with a non-empty title", () => {
    /**
     * Validates: Requirements 2.11, 8.1, 8.5
     */
    fc.assert(
      fc.property(fc.constantFrom(...mdxFiles), (filePath) => {
        const fileName = path.relative(CONTENT_DIR, filePath);
        const content = fs.readFileSync(filePath, "utf-8");

        // Assert: frontmatter parses without error
        let parsed: matter.GrayMatterFile<string>;
        try {
          parsed = matter(content);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          throw new Error(`Frontmatter parse error in ${fileName}: ${message}`);
        }

        // Assert: parsed object has a `title` key
        if (!("title" in parsed.data)) {
          throw new Error(`Missing 'title' field in frontmatter of ${fileName}`);
        }

        // Assert: `title` value is a non-empty string
        const title = parsed.data.title;
        if (typeof title !== "string") {
          throw new Error(`'title' field in ${fileName} is not a string (got ${typeof title})`);
        }
        if (title.trim().length === 0) {
          throw new Error(`'title' field in ${fileName} is an empty string`);
        }
      }),
      { numRuns: 100 },
    );
  });
});
