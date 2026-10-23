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

Every build exports `knowledge-graph.json` at the site root, containing concepts, curated relationships, and generated mentions. This also supplies the interactive graph; no graph database is required.

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

Currently accepted relationship types are `derivation-uses`, `instance-of`, `equivalent-to`, `generalizes`, `model-complements`, `defined-as`, `qualifies`, `strengthens`, `equivalent-form`, `organizes`, `shares-encoding-form-with`, and `differs-in-connectivity`. Use the most specific relation supported by the evidence: for example, `defined-as` for an exact definition, `qualifies` for a condition that limits a theorem's direct use, and `model-complements` when two models cover different parts of the same physical problem. Choose the direction deliberately. A reverse navigation link does not make a mathematical relationship symmetric.

## Courses, domains, and the graph

The [knowledge graph](../graph.md) displays courses as large nodes and concepts as small nodes. Dashed lines connect a concept to its courses; solid arrows show checked mathematical relationships. Domain colors and a compact course-based layout keep related subjects near each other. The layout grows with the data and adapts to the available screen shape.

Concept size grows slowly with the number of distinct registered concepts citing it, capped at 70% of the course-node radius. Repeated citations from one concept count once; course connections, self-citations, and passages without a registered source concept do not count. The count appears on hover and in the selected concept's details. Size reflects coverage in these notes, not mathematical importance.

Course connections remain straight and dashed. Concept relationships use gentle curves; multiple or reverse relationships between a pair use separate curves. Connections stay faint until a node is selected. Every visible node keeps its complete name, wrapped over multiple lines where needed; names are never hidden to resolve crowding. Labels are included in the layout spacing.

**Find a concept or course** searches names and aliases and takes you to the matching node. Domain and course filters show a smaller, rearranged graph; **Show all** or **Reset** restores the full graph. Cross-scope connections are visible again in the full graph. A concept with several course memberships remains a single node.

Drag nodes to arrange them, drag the background to pan, and scroll, pinch, or use the zoom buttons. **Fit** brings the current scope into view without undoing node positions; **Reset** restores the initial layout and clears filters. **Full window** gives the graph the whole window; Escape exits it.

Select a node to open the closable details panel. **Focus connections** shows the selected node and its immediate neighbors, including connections outside the current course or domain. Keyboard users can Tab to a node and press Enter, search and press Enter, or Tab through search results. The focused graph also accepts + / − to zoom and Home to fit.

The graph currently includes only registered concepts. Mentioning a word in a note does not automatically create a node or a mathematical relationship.

### Register a domain and a course

Domains and courses live in the same `knowledge.json` file. Add objects to their respective arrays; these examples already exist:

```json
{
  "id": "mathematics",
  "label": "Mathematics",
  "color": "#527c73"
}
```

A course has its own ID, a domain, and a note or index page:

```json
{
  "id": "complex-analysis",
  "label": "Complex Analysis",
  "domain": "mathematics",
  "path": "math/Foundations_of_Complex_Analysis.md"
}
```

A course normally corresponds to a collection or an actual course-level note, not to every Markdown document. Documents inside `math/linear-algebra/`, for example, belong to the `linear-algebra` course even when a document has a narrower title such as *Polynomial Theory*. The concept's `location.path` records that exact source document, so a separate course node is unnecessary. Add a new course only when it should appear as a peer of the existing course nodes.

In a concept entry, add its main domain and one or more course IDs:

```json
{
  "domain": "mathematics",
  "courses": [
    "complex-analysis"
  ]
}
```

These are additional fields in the existing concept object, alongside its ID, label, aliases, and location. They do not replace that object.

A concept may connect to multiple registered courses while remaining one node. Its main domain determines its color and grouping tendency. Add another course only when it reflects the content you are organizing; citing the concept from a different course does not automatically change its membership.

Course membership and mathematical relationships remain separate. For example, the residue theorem belongs to complex analysis, while the lift derivation uses it through a cross-domain relation.

The build checks domain colors, unique course IDs, course pages, and concept memberships. Existing concepts without memberships remain visible as unassigned nodes. Every build includes the new metadata in the exported `knowledge-graph.json`.
