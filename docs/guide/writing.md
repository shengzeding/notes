---
title: Adding a note
description: Create a Markdown file, preview it, and publish.
---

# Adding a note

The content of this site lives in plain Markdown files. Category lists, the sidebar, and the search index are generated automatically when the site builds.

## Choose a folder

| Topic | Folder |
| --- | --- |
| Mathematics and numerical methods | `docs/math/` |
| Scientific machine learning | `docs/scientific-ml/` |
| Paper notes | `docs/papers/` |
| Images and attachments | `docs/public/images/` |

For example, save a note as `docs/math/linear-algebra.md`. Use lowercase names with hyphens for files. The text itself can be in any language.

## Start with a Markdown file

Copy this template into a new file. The section between the two `---` lines contains page metadata.

```md
---
title: Linear algebra notes
description: From vector spaces to linear maps.
---

# Linear algebra notes

The question this note aims to answer.

## Background

State the problem and why it matters.

## Derivation

Define the notation, state the assumptions, and work through the steps.

## Open questions

- Which assumptions are essential?
- What should I check next?

## References

- [Source title](https://example.com)
```

The first `# Heading` is used in category lists and the sidebar. Second- and third-level headings appear in the page outline.

New Markdown files are picked up on the next build. If a newly added page is missing from the sidebar during local development, restart the development server.

## Preview locally

Install Node.js 22 or later and pnpm 10.20.0. On a Node installation with Corepack available:

```sh
corepack enable
pnpm install
pnpm dev
```

Open the local address shown in the terminal. Check the production build before publishing:

```sh
pnpm build
```

## Publish

Commit and push your changes to the `main` branch on GitHub. The deployment workflow builds the site and publishes it to GitHub Pages. Saving a file locally does not publish it.

For quick changes, use **Edit on GitHub** at the bottom of a page. To add a note online, open the appropriate folder in the repository and choose **Add file → Create new file**.

## Images and links

Save images in `docs/public/images/`. Use standard Markdown links:

```md
![Description of the figure](/images/example.png)

[Another note](../math/linear-algebra.md)
```

These paths are examples. Add the corresponding files before linking to them. The build checks internal page links for missing targets.

## Editing with Obsidian

You can open the `docs/` folder as an Obsidian vault. Use standard links such as `[Title](path.md)` so the same files work on the website. Obsidian-specific plugins and queries are not automatically rendered on this site.

## Public and private notes

This repository is public. Keep private drafts and unpublished research in a separate private location, and copy in only the content you want to share. Hiding a file from the navigation does not make it private.

## Formatting

See the [Markdown reference](./formatting.md) for equations, code blocks, tables, and callouts.
