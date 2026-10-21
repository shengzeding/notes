---
title: Adding a note
order: 10
description: Create a Markdown file, preview it, and publish.
---

# Adding a note

The content of this site lives in plain Markdown files. Category lists, the sidebar, and the search index are generated automatically when the site builds.

## Choose a folder

| Topic | Folder |
| --- | --- |
| Mathematics | `docs/math/` |
| Numerical methods and scientific computing | `docs/math/numerical-methods/` |
| Mechanics | `docs/mechanics/` |
| Machine learning | `docs/machine-learning/` |
| Images and attachments | `docs/public/images/` |

For example, save a note as `docs/math/linear-algebra.md`. Use lowercase names with hyphens for files. The text itself can be in any language.

## Start with a Markdown file

Copy this template into a new file. The section between the two `---` lines contains page metadata.

```md
---
title: Linear algebra notes
order: 20
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

The `title` metadata is used in category lists and the sidebar, falling back to the first `# Heading` when omitted. Second- and third-level headings appear in the page outline.

New Markdown files are picked up on the next build. If a newly added page is missing from the sidebar during local development, restart the development server.

## Topics and chapters

A single-file topic and a topic split into chapters can sit next to each other:

```text
docs/math/
├── index.md
├── complex-analysis.md
└── real-analysis/
    ├── index.md
    ├── measure.md
    └── integration.md
```

These are organizational examples, not existing notes. Start with one file if that is enough; split it into chapters when sections become useful to read and edit independently.

Use a folder's `index.md` for its introduction, title, and order. Add a chapter list to it with:

```html
<CollectionNotes collection="math/real-analysis" />
```

The sidebar preserves the folder hierarchy. A folder with `index.md` is clickable; a folder without it still groups its chapters. Files and folders can appear together at every level.

## Chapter order

Set a numeric `order` in each page's metadata. For a folder, set it in that folder's `index.md`:

```yaml
---
title: Integration
order: 20
---
```

Smaller numbers come first among siblings, including folders and individual documents. Use 10, 20, 30 to leave room for additions. Entries without `order` appear last; ties are sorted by title. Use numbers without quotation marks. Changing order does not require renaming files or changing links.

Paper notes belong under their subject. Link between related topics instead of duplicating notes.

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
