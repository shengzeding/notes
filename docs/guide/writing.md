---
title: Guide to Use
order: 10
description: Reading, searching, exploring connections, and adding notes.
---

# Guide to Use

This notebook brings together Mathematics, Numerical Methods, Mechanics, and Machine Learning. Browse a subject, follow a reference, or use search to find a particular idea.

## Browse and read

- **NOTES** opens the four subject collections. Use the left sidebar to move between folders and individual notes; expand a folder to see its chapters.
- **Hide sidebar / Show sidebar** gives the text more room. The sidebar preference is remembered in this browser.
- **On this page**, on the right, lists the current note's sections. Click a heading to jump there.
- **Focus** hides navigation for uninterrupted reading. Move the pointer to the top edge to reveal navigation temporarily, or use **Exit focus** or **Esc** to leave. Navigating to another page exits focus mode.
- **Search**, in the navigation bar, searches the site. Open it with **⌘K** on macOS or **Ctrl+K** on Windows/Linux. This also covers guide pages.
- **GRAPH** opens the knowledge graph; **GUIDE** returns to this page.

## Reading tools

These tools work with existing Markdown: no additional markup is needed. Select a word or passage to show **Pin**, **Copy for discussion**, and **Find in notes**.

### Pin a reference

Select a passage and choose **Pin**. For a displayed equation, hover or tap it and choose the pushpin icon (**Pin formula**). Keyboard users can focus an equation and press **Alt+P**.

The reference stays visible while the main text scrolls and while you follow links. Up to three references can be pinned; adding another replaces the oldest. Drag the panel by its heading to move it (or focus the heading and use the arrow keys). Collapse the panel using its chevron, or remove individual references with ×. Pins are temporary and clear on a page reload.

### Copy a formula

Hover or tap an inline or displayed formula and choose the overlapping-squares icon (**Copy LaTeX**). Hover over an icon to see its name; a check mark confirms a successful copy. This copies the formula source without dollar-sign delimiters, ready to paste into a math editor. The same action is available inside pinned references.

### Copy for discussion

Select a passage and choose **Copy for discussion**. The preview contains your selection, its section title, and a source link. Mathematical expressions retain their LaTeX.

Check **Include the whole current section** when the surrounding definitions or assumptions matter. Choose **Copy text**, then paste into your preferred conversation. This action copies text locally; it does not send a message.

### Find in notes

Select a term and choose **Find in notes** to search the note collection. Results include a short excerpt and link to the matching section. Edit the query to try a different phrase.

When the term exactly matches a registered concept name or alias, its other registered names are searched too. The extra names are shown above the results. These are text matches, not newly inferred graph relationships. Writing guides are excluded from this search; the main navigation search still covers the full site.


## Explore the knowledge graph

Open the [knowledge graph](../graph.md) to explore registered concepts and their connections.

| What you see | Meaning |
| --- | --- |
| Large nodes | Courses |
| Smaller nodes | Concepts; size grows with the number of distinct concepts citing them |
| Light, straight connections | A concept belongs to a course |
| Curved connections | A checked relationship between concepts |
| Gray-blue / teal-green | Mathematics / Numerical Methods |
| Brown / purple | Mechanics / Machine Learning |

Node size reflects references in these notes, not the importance of a topic. Simply using a word in a note does not create a graph node.

### Find and compare

Search by a concept's name or registered alias. Choose a domain to narrow the view, or select several courses using the course checkboxes to compare them together. With no courses checked, all courses in the selected domain appear. Changing domains clears the course selection.

Hover over a node to highlight its immediate connections. Select it to open details, follow the link to its note, or inspect relationship evidence and qualifications. **Focus connections** shows that node and its direct neighbors, including neighbors outside the previous filter. **Show all** returns to the complete graph.

### Adjust the view

Drag a node to reposition it; drag empty space to pan. Scroll or use **+ / −** to zoom. **Fit** brings the visible graph into view without resetting node positions; **Reset** clears filters and rebuilds the layout.

If names are hard to read, zoom in or use **Display → Text size**. **Show all labels** reveals labels hidden to reduce overlap, but may make a dense graph crowded. **Repel strength** and **Link distance** adjust spacing. **Full window** expands the graph; **Esc** exits.

The graph remembers its filters, positions, and zoom when you follow a note and return within the same tab.

## Follow and add concept links

A concept reference is an ordinary link woven into the note's explanation. Registered references also generate **Linked mentions** on the destination page, so you can find passages that use the concept.

Mentions and graph relationships are different: a citation creates a backlink, while a meaningful mathematical relationship is recorded separately with evidence. A concept can belong to more than one course without becoming several nodes.

See [Concept Links](./concept-links.md) for stable anchors, copyable registration templates, course membership, and relationship validation.

## Add and organize notes

The content of this site lives in plain Markdown files. Category lists, the sidebar, and the search index are generated automatically when the site builds.

### Choose a folder

| Topic | Folder |
| --- | --- |
| Mathematics | `docs/math/` |
| Numerical Methods | `docs/numerical-methods/` |
| Mechanics | `docs/mechanics/` |
| Machine learning | `docs/machine-learning/` |
| Images and attachments | `docs/public/images/` |

For example, save a note as `docs/math/linear-algebra.md`. Use lowercase names with hyphens for files. The text itself can be in any language.

### Start with a Markdown file

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

### Topics and chapters

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

### Chapter order

Set a numeric `order` in each page's metadata. For a folder, set it in that folder's `index.md`:

```yaml
---
title: Integration
order: 20
---
```

Smaller numbers come first among siblings, including folders and individual documents. Use 10, 20, 30 to leave room for additions. Entries without `order` appear last; ties are sorted by title. Use numbers without quotation marks. Changing order does not require renaming files or changing links.

Paper notes belong under their subject. Link between related topics instead of duplicating notes.

### Preview locally

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

### Publish

Commit and push your changes to the `main` branch on GitHub. The deployment workflow builds the site and publishes it to GitHub Pages. Saving a file locally does not publish it.

For quick changes, use **Edit on GitHub** at the bottom of a page. To add a note online, open the appropriate folder in the repository and choose **Add file → Create new file**.

### Images and links

Save images in `docs/public/images/`. Use standard Markdown links:

```md
![Description of the figure](/images/example.png)

[Another note](../math/linear-algebra.md)
```

These paths are examples. Add the corresponding files before linking to them. The build checks internal page links for missing targets.

### Editing with Obsidian

You can open the `docs/` folder as an Obsidian vault. Use standard links such as `[Title](path.md)` so the same files work on the website. Obsidian-specific plugins and queries are not automatically rendered on this site.

### Public and private notes

This repository is public. Keep private drafts and unpublished research in a separate private location, and copy in only the content you want to share. Hiding a file from the navigation does not make it private.

### Formatting

See the [Markdown reference](./formatting.md) for equations, code blocks, tables, and callouts.
