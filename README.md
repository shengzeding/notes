# Shengze Ding — Notes

A Markdown notebook built with VitePress and published through GitHub Pages.

- Site: https://shengzeding.github.io/notes/
- Personal homepage: https://shengzeding.github.io/
- Content: `docs/`
- Site configuration: `docs/.vitepress/config.ts`
- Styling: `docs/.vitepress/theme/style.css`
- Writing instructions: `docs/guide/writing.md`

The design follows the personal homepage: Raleway, a white background, black and gray text, blue links, and thin separators. The site interface and starter documentation are in English.

## Local development

Use Node.js 22+ and pnpm 10.20.0. With Corepack installed:

```sh
corepack enable
pnpm install
pnpm dev
```

Build with `pnpm build`; preview with `pnpm preview`.

## Add notes

Create `.md` files in `docs/math/`, `docs/mechanics/`, or `docs/machine-learning/`. Give each file a `# Heading` and optional `title` / `description` frontmatter. The sidebar, category lists, and search index update at build time.

Files and subfolders can coexist. A folder’s `index.md` defines its title and introduction; numeric `order` metadata controls sibling ordering for both folders and files. The sidebar and topic lists preserve the hierarchy.

To add another top-level category, update `collections` in `docs/.vitepress/catalog.ts`, add its category index, and add a corresponding section to `docs/index.md`.

Numerical methods live under `docs/math/numerical-methods/`. Topic folders contain no research notes yet. The only starter content is a writing guide and an explicitly labeled formatting example.

## Deployment

In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Push to `main` to run `.github/workflows/deploy.yml`.

The workflow installs dependencies from `pnpm-lock.yaml`, builds the site, and deploys to GitHub Pages. If Pages has not been enabled, enable it and rerun the workflow.

The base path is `/notes/`. If the repository name or domain changes, update the base path, favicon URL, sitemap hostname, and GitHub edit links.

## Maintenance

- Edit files with VS Code, Obsidian, or GitHub's web editor.
- Use standard Markdown links. Obsidian-specific features are not necessarily supported.
- Place images in `docs/public/images/`.
- Mathematics is rendered at build time; no external equation-rendering CDN is required.
- Full-text search runs in the browser, with English word and Chinese character indexing.
- This is a public repository. Keep private material elsewhere.
- No open content license is imposed by this setup. Add an appropriate license if you want to grant reuse rights.
