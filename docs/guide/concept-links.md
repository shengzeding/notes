---
title: Concept Links
order: 30
---

# Concept Links

Write references as part of the explanation, at the step where a result is used. Avoid adding a separate paragraph solely to announce a connection.

A concept has a stable ID independent of its display name, chapter title, or file. Its canonical explanation can remain inside a long note.

## Cite an existing concept

Use an ordinary Markdown link with a concept ID in its optional title:

```md
Applying the [residue theorem](../../math/Foundations_of_Complex_Analysis.md#residue-theorem "concept:residue-theorem"), we obtain ...
```

The visible phrase is your choice. On the website, the link stays black with a subtle dotted underline. Its target page automatically lists the citation under **Linked mentions**, grouped by concept. Ordinary links without the concept title still work, but do not enter the concept index.

The relative path above is for a note inside `mechanics/foundations-of-fluid-mechanics/`. Adjust it for the file you are editing.

## Give the passage a stable address

Put a named anchor immediately before the passage that cites the concept:

```html
<span id="lift-residue-proof"></span>
```

This is where the backlink returns. Keep the anchor unchanged when you rename a section. The anchor is a location, not necessarily a concept.

Register new concepts in `docs/.vitepress/knowledge.json` with an ID, label, optional aliases, and the location of their primary explanation. Multiple concepts may be explained in the same chapter.

## Mentions and mathematical relationships

A linked mention is generated automatically from a citation. A mathematical relationship is recorded separately after checking its meaning.

The pilot records:

- Kutta–Joukowski theorem → residue theorem: **this derivation uses**.
- Joukowski map → conformal mapping: **instance of**, away from its singular and critical points and on a suitable domain.

Each relationship includes an evidence location. Where useful, it also includes a qualification and an external source. Co-occurrence alone never creates a mathematical relationship, and a backlink does not reverse the direction of one.

## Validation and graph data

The normal site build checks concept IDs, explicit anchors, citation destinations, and supporting citations for recorded relationships. Fix reported errors before publishing.

Every build exports `knowledge-graph.json` at the site root, containing concepts, curated relationships, and generated mentions. This is the data foundation for a later graph view; no graph database is required.

Keep normal Markdown links so the notes remain readable outside this website. The custom concept title is used by this site; it is not an Obsidian plugin or a promise of Obsidian graph compatibility.

## Copyable templates

### A. Reference a concept that is already registered

Only edit the note where you want the reference. Place the anchor after the section heading and before the citing passage:

```md
### A force calculation

<span id="force-calculation"></span>

Applying the [residue theorem](../../math/Foundations_of_Complex_Analysis.md#residue-theorem "concept:residue-theorem"), we obtain ...

```

The path above is relative to a file inside `mechanics/foundations-of-fluid-mechanics/`.
Keep these three parts consistent:

| Part | Meaning |
| --- | --- |
| `residue theorem` | Visible words in the sentence; these can vary naturally. |
| `../../math/Foundations_of_Complex_Analysis.md#residue-theorem` | File and stable anchor containing the primary explanation. |
| `"concept:residue-theorem"` | The registered concept ID used for indexing. |

Choose a source anchor unique within your file. A new section needs its own source anchor. Do not manually add a reverse link: **Linked mentions** is generated at build time.

### B. Register a new concept

For example, suppose your explanation lives in `docs/math/linear-algebra/inner-products.md`.
Add an anchor immediately before the definition:

```md
<span id="orthogonal-projection"></span>

### Orthogonal projection

Let ...

```

Append an object to the existing `concepts` array in `docs/.vitepress/knowledge.json`:

```json
{
  "id": "orthogonal-projection",
  "label": "Orthogonal projection",
  "aliases": [
    "正交投影"
  ],
  "location": {
    "path": "math/linear-algebra/inner-products.md",
    "anchor": "orthogonal-projection"
  }
}
```

Replace the example path with a file that actually exists. Paths in the registry are relative to `docs/`, without that prefix. Add a comma between adjacent JSON objects; do not replace the entire file or leave a trailing comma.

The ID identifies the concept. The anchor identifies its explanation's position. They may share a name, but have different jobs. Keep the ID stable; update the location and citing Markdown links together when moving a file. The current implementation checks for broken targets; it does not automatically rewrite old paths.

You can now reference this concept using template A. One concept can have many mentions, even if its primary explanation remains in one long document.

### C. Record a checked mathematical relationship (optional)

Backlinks require no relationship entry. Add a relationship only when you have checked what it means.

For the existing pilot, the relationship object is:

```json
{
  "source": "kutta-joukowski-theorem",
  "target": "residue-theorem",
  "type": "derivation-uses",
  "evidence": {
    "path": "mechanics/foundations-of-fluid-mechanics/07_Plane_Potential_Flow.md",
    "anchor": "lift-residue-proof"
  },
  "note": "This derivation uses residue calculus; other proofs may use different methods."
}
```

This example is already registered; do not add it a second time. For a new relationship, append your own object to `relations`, with both endpoint IDs registered and an evidence passage containing the target concept link.

The source passage must fall under the registered source concept: put its definition anchor before the heading, then an optional evidence anchor inside that section. A later heading starts a new section scope. The build checks this correspondence.

Currently accepted relationship types are `derivation-uses`, `instance-of`, `equivalent-to`, and `generalizes`. Choose the direction deliberately. A reverse navigation link does not make a mathematical relationship symmetric.

## Future course and domain groups

The current version exports concepts, mentions, and checked relationships. It does not yet render a graph or store an explicit course/domain hierarchy.

A later graph can add domain and course groups independently of concept identity, for example:

- Mathematics → Complex Analysis → Residue theorem.
- Mechanics → Fluid Mechanics → Kutta–Joukowski theorem.

Keep membership separate from mathematical relationships. A residue theorem citation in fluid mechanics should not move the concept out of complex analysis or create a duplicate concept. A primary course can determine visual placement, while additional course memberships can support filtering.

This extension requires group metadata and a graph interface, not a rewrite of the notes or existing concept IDs.
