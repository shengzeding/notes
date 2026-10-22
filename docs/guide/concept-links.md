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
