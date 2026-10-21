---
title: Foundations of Lebesgue Measure
order: 2
---

# Foundations of Lebesgue Measure

We begin with the volume of rectangles and use countable coverings to assign an outer measure to every subset of $\mathbb{R}^n$. Restricting to measurable sets gives countable additivity. Approximation theorems then explain the structure of these sets, while nonmeasurable sets show why the restriction is necessary. The final section introduces measurable functions.

Throughout, $m_*$ denotes Lebesgue outer measure and $m$ denotes Lebesgue measure. Complements are taken in $\mathbb{R}^n$ unless a different ambient set is specified. The topological facts used below are collected in the separate Review notes.

---

## 1. Rectangles and Outer Measure

### 1.1 Volume and elementary decompositions

A **closed rectangle** in $\mathbb{R}^n$ is a set

$$
R=\prod_{i=1}^n[a_i,b_i],
\qquad |R|=\prod_{i=1}^n(b_i-a_i).
$$

Its sides are parallel to the coordinate axes. A **cube** is a rectangle with equal side lengths. Rectangles are **almost disjoint** if their interiors are pairwise disjoint; their boundaries may overlap.

**Lemma 1.1 (Finite volume calculations).** If $R$ is the union of finitely many almost disjoint rectangles $R_1,\ldots,R_N$, then

$$
|R|=\sum_{k=1}^N|R_k|.
$$

More generally, if $R\subseteq\bigcup_{k=1}^N R_k$, then

$$
|R|\le\sum_{k=1}^N|R_k|.
$$

**Proof idea.** Cut along all coordinate hyperplanes through the faces of the rectangles. The resulting common grid decomposes each rectangle into smaller cells. In a partition, every cell of positive volume is counted once; in a cover, every such cell of $R$ is counted at least once. Summing cell volumes proves both claims. Thus the product formula for volume is consistent with subdivision.

**Theorem 1.2 (Open sets in one dimension).** Every open subset of $\mathbb{R}$ is a union of at most countably many pairwise disjoint open intervals, possibly unbounded.

**Proof.** For each $x\in G$, take the maximal open interval $I_x\subseteq G$ containing $x$. Two such intervals are either equal or disjoint: overlapping intervals would have a larger interval as their union. The distinct intervals cover $G$, and each contains a different rational number, so there are at most countably many.

**Theorem 1.3 (Open sets in higher dimensions).** Every open subset of $\mathbb{R}^n$ is a union of at most countably many almost disjoint closed cubes.

**Proof idea.** Start with the unit grid. Keep cubes contained in $G$, discard cubes disjoint from $G$, and bisect the remaining cubes in every coordinate. Repeat this procedure. The selected cubes have disjoint interiors, and there are only countably many. Every $x\in G$ has a ball contained in $G$, so a sufficiently small grid cube containing $x$ is eventually selected or already lies in a selected cube.

### 1.2 Defining outer measure

**Definition (Outer measure).** For any $E\subseteq\mathbb{R}^n$, define

$$
m_*(E)=\inf\left\{
\sum_{k=1}^{\infty}|R_k|:
E\subseteq\bigcup_{k=1}^{\infty}R_k,
\quad R_k\text{ closed rectangles}
\right\}.
$$

Every set has an outer measure in $[0,\infty]$, and $m_*(\varnothing)=0$. We use countable covers; restricting to finite covers gives **Jordan outer content**. Using cubes instead of rectangles yields the same Lebesgue outer measure.

**Proposition 1.4 (Monotonicity).** If $E\subseteq F$, then

$$
m_*(E)\le m_*(F).
$$

**Proof.** Every cover of $F$ also covers $E$, so the infimum for $E$ is taken over a larger collection.

**Proposition 1.5 (Rectangles have the expected measure).** For a closed rectangle $R$,

$$
m_*(R)=|R|.
$$

The same volume formula holds for an open rectangle.

**Proof.** Since $R$ covers itself, $m_*(R)\le|R|$. For the reverse inequality, choose a countable cover with

$$
\sum_k|R_k|<m_*(R)+\varepsilon.
$$

Enlarge each $R_k$ to an open rectangle $S_k$ with $|S_k|\le|R_k|+\varepsilon 2^{-k}$. Compactness of $R$ gives a finite subcover. Applying Lemma 1.1 to the closures of those rectangles yields

$$
|R|\le\sum_k|S_k|<m_*(R)+2\varepsilon.
$$

Let $\varepsilon\downarrow0$. For an open rectangle, use monotonicity and closed rectangles inside it whose volumes approach its volume. Degenerate closed rectangles have volume and outer measure zero by the same covering argument.

**Proposition 1.6 (Countable subadditivity).** For arbitrary sets $E_k\subseteq\mathbb{R}^n$,

$$
m_*\left(\bigcup_{k=1}^{\infty}E_k\right)
\le\sum_{k=1}^{\infty}m_*(E_k).
$$

**Proof.** If the right side is infinite, there is nothing to prove. Otherwise, cover each $E_k$ by rectangles $R_{k,j}$ such that

$$
\sum_j|R_{k,j}|\le m_*(E_k)+\frac{\varepsilon}{2^k}.
$$

Together they cover the union, so

$$
m_*\left(\bigcup_kE_k\right)
\le\sum_{k,j}|R_{k,j}|
\le\sum_km_*(E_k)+\varepsilon.
$$

Let $\varepsilon\downarrow0$. The allocation $\varepsilon 2^{-k}$ lets us make countably many approximations while keeping the total error below $\varepsilon$.

**Examples.** A single point has outer measure zero because arbitrarily small rectangles cover it. Hence every countable set has outer measure zero by subadditivity. In contrast,

$$
m_*(\mathbb{R}^n)=\infty,
$$

since $\mathbb{R}^n$ contains rectangles of arbitrarily large volume.

### 1.3 The Cantor set

Begin with $C_0=[0,1]$. At each step, remove the open middle third of every remaining interval. Thus

$$
C_1=[0,1/3]\cup[2/3,1],
$$

$$
C_2=[0,1/9]\cup[2/9,1/3]\cup[2/3,7/9]\cup[8/9,1].
$$

The **Cantor set** is

$$
C=\bigcap_{k=0}^{\infty}C_k.
$$

**Theorem 1.7.** The Cantor set is compact, perfect, uncountable, and has outer measure zero.

**Proof.** It is closed and bounded. At step $k$, the set $C_k$ consists of $2^k$ intervals of length $3^{-k}$, so

$$
m_*(C)\le m_*(C_k)\le(2/3)^k\longrightarrow0.
$$

For $x\in C$, choose a component interval $[a_k,b_k]\subseteq C_k$ containing $x$. Its endpoints belong to $C$, and $b_k-a_k=3^{-k}\to0$. At least one endpoint differs from $x$, giving other points of $C$ arbitrarily close to $x$. Thus $C$ is perfect. It is nonempty, so the theorem on perfect subsets of $\mathbb{R}$ from the Review implies that it is uncountable.

Cardinality alone therefore does not determine measure: both countable sets and some uncountable sets have outer measure zero.

### 1.4 When outer measure is additive

Subadditivity is always available, but disjointness alone does not guarantee equality. Two useful positive results come first.

**Theorem 1.8 (Positive separation).** If $d(E_1,E_2)>0$, then

$$
m_*(E_1\cup E_2)=m_*(E_1)+m_*(E_2).
$$

**Proof idea.** Only the lower bound needs proof. If the union has finite outer measure, take a cover whose total volume is within $\varepsilon$ of it. Subdivide every rectangle until its diameter is smaller than $d(E_1,E_2)$; this does not change the total volume. No rectangle can meet both sets. The two groups of rectangles therefore give separate covers, and

$$
\sum_k|R_k|\ge m_*(E_1)+m_*(E_2).
$$

Let $\varepsilon\downarrow0$. If the union has infinite outer measure, subadditivity already forces the sum on the right to be infinite.

**Theorem 1.9 (Almost disjoint rectangles).** If the closed rectangles $R_k$ have pairwise disjoint interiors, then

$$
m_*\left(\bigcup_{k=1}^{\infty}R_k\right)=\sum_{k=1}^{\infty}|R_k|.
$$

**Proof.** Subadditivity gives the upper bound. For the lower bound, ignore zero-volume rectangles and shrink each remaining $R_k$ to a closed rectangle $\widetilde R_k\subset R_k^\circ$ with

$$
|\widetilde R_k|\ge|R_k|-\varepsilon 2^{-k}.
$$

Every finite collection of these compact rectangles is pairwise positively separated. Hence

$$
m_*\left(\bigcup_kR_k\right)
\ge\sum_{k=1}^N|\widetilde R_k|
\ge\sum_{k=1}^N|R_k|-\varepsilon.
$$

Let $N\to\infty$ and then $\varepsilon\downarrow0$.

---

## 2. Measurable Sets

### 2.1 Open approximation and equal-measure envelopes

**Theorem 2.1 (Open approximation).** For every $E\subseteq\mathbb{R}^n$ and $\varepsilon>0$, there is an open set $G\supseteq E$ such that

$$
m_*(G)\le m_*(E)+\varepsilon.
$$

Equivalently,

$$
m_*(E)=\inf_{G\supseteq E,\ G\text{ open}}m_*(G).
$$

**Proof idea.** For finite outer measure, take a rectangle cover with total volume below $m_*(E)+\varepsilon/2$. Enlarge its $k$th rectangle to an open rectangle with added volume at most $\varepsilon 2^{-k-1}$. Their union is the required $G$. If $m_*(E)=\infty$, take $G=\mathbb{R}^n$.

**Definition.** A **$G_\delta$ set** is a countable intersection of open sets. An **$F_\sigma$ set** is a countable union of closed sets. Taking complements exchanges these two classes.

**Corollary 2.2 (Equal-measure envelope).** Every $E\subseteq\mathbb{R}^n$ is contained in a $G_\delta$ set $H$ satisfying

$$
m_*(H)=m_*(E).
$$

**Proof.** Choose open sets $G_k\supseteq E$ with $m_*(G_k)\le m_*(E)+1/k$, and set $H=\bigcap_kG_k$. Monotonicity gives the result. When $m_*(E)=\infty$, one may simply take $H=\mathbb{R}^n$.

### 2.2 Why measurability concerns the excess set

Open approximation controls the number $m_*(G)$, but it does not yet control $m_*(G\setminus E)$: we cannot subtract outer measures as if additivity were already known. This distinction motivates the definition.

**Definition (Lebesgue measurability).** A set $E\subseteq\mathbb{R}^n$ is **Lebesgue measurable** if, for every $\varepsilon>0$, there is an open set $G\supseteq E$ such that

$$
m_*(G\setminus E)\le\varepsilon.
$$

For such sets, define their **Lebesgue measure** by

$$
m(E)=m_*(E).
$$

A **null set** is a set of outer measure zero. We will see that every null set is measurable, including every subset of a null set.

### 2.3 Which sets are measurable?

**Proposition 2.3.** Open sets and null sets are measurable.

**Proof.** For an open set, choose $G=E$. For a null set, Theorem 2.1 supplies an open $G\supseteq E$ with $m_*(G)\le\varepsilon$, and then $m_*(G\setminus E)\le\varepsilon$.

**Theorem 2.4 (Countable unions).** A countable union of measurable sets is measurable.

**Proof.** Let $E=\bigcup_kE_k$. Choose open $G_k\supseteq E_k$ with $m_*(G_k\setminus E_k)\le\varepsilon 2^{-k}$. Then $G=\bigcup_kG_k$ is open, contains $E$, and

$$
G\setminus E\subseteq\bigcup_k(G_k\setminus E_k),
\qquad m_*(G\setminus E)\le\varepsilon.
$$

**Theorem 2.5 (Closed sets).** Every closed set is measurable.

**Proof.** First let $K$ be compact. Choose open $G\supseteq K$ with $m_*(G)\le m_*(K)+\varepsilon$. Decompose the open set $G\setminus K$ into almost disjoint closed cubes $Q_k$. For

$$
S_N=\bigcup_{k=1}^NQ_k,
$$

compactness and disjointness give $d(S_N,K)>0$. Therefore

$$
m_*(K)+\sum_{k=1}^N|Q_k|
=m_*(K\cup S_N)\le m_*(G)\le m_*(K)+\varepsilon.
$$

Since $m_*(K)<\infty$, we can cancel it. Letting $N\to\infty$ gives $m_*(G\setminus K)=\sum_k|Q_k|\le\varepsilon$, so $K$ is measurable.

Every closed $F$ is a countable union of compact sets $F\cap[-k,k]^n$, hence is measurable by Theorem 2.4.

**Theorem 2.6 (Complements, intersections, and differences).** Measurable sets are closed under complements, countable intersections, and set differences.

**Proof.** For measurable $E$, choose open $G_k\supseteq E$ with $m_*(G_k\setminus E)\le1/k$. Set

$$
F=\bigcup_kG_k^c\subseteq E^c,
\qquad Z=E^c\setminus F.
$$

The set $F$ is measurable, and $Z\subseteq G_k\setminus E$ for every $k$, so $m_*(Z)=0$. Hence $E^c=F\cup Z$ is measurable. Now use

$$
\bigcap_kE_k=\left(\bigcup_kE_k^c\right)^c,
\qquad A\setminus B=A\cap B^c.
$$

### 2.4 Sigma-algebras and Borel sets

**Definition (Sigma-algebra).** A nonempty family $\mathcal{S}$ of subsets of $\mathbb{R}^n$ is a **$\sigma$-algebra** if it is closed under complements and countable unions. It then contains $\varnothing$ and $\mathbb{R}^n$, and is also closed under countable intersections.

The measurable sets form a $\sigma$-algebra, denoted $\mathcal{M}$. Intersections of $\sigma$-algebras are again $\sigma$-algebras, so any family of sets generates a smallest $\sigma$-algebra containing it.

**Definition (Borel sets).** The **Borel $\sigma$-algebra** $\mathcal{B}$ is the smallest $\sigma$-algebra containing every open set. Its members are **Borel sets**. Open sets, closed sets, $G_\delta$ sets, and $F_\sigma$ sets are all Borel.

**Corollary 2.7.** Every Borel set is Lebesgue measurable:

$$
\mathcal{B}\subseteq\mathcal{M}.
$$

**Proof.** The family $\mathcal{M}$ is a $\sigma$-algebra containing all open sets, so it contains the smallest such $\sigma$-algebra.

The inclusion is strict. We will construct a measurable non-Borel set in Section 4.

---

## 3. Properties and Characterizations of Lebesgue Measure

### 3.1 Countable additivity

We first need an inner approximation result that follows directly by taking complements in the definition of measurability.

**Lemma 3.1 (Closed approximation).** A set $E$ is measurable if and only if, for every $\varepsilon>0$, there is a closed set $F\subseteq E$ such that

$$
m_*(E\setminus F)\le\varepsilon.
$$

**Proof.** Apply open approximation in the definition to $E^c$ and take complements. The same argument in reverse proves the converse.

**Theorem 3.2 (Countable additivity).** If $E_k$ are pairwise disjoint measurable sets, then

$$
m\left(\bigcup_{k=1}^{\infty}E_k\right)=\sum_{k=1}^{\infty}m(E_k).
$$

**Proof.** Subadditivity gives one direction. First suppose each $E_k$ is bounded. By Lemma 3.1, choose closed, hence compact, sets $F_k\subseteq E_k$ such that

$$
m(E_k\setminus F_k)\le\varepsilon 2^{-k}.
$$

Subadditivity implies $m(F_k)\ge m(E_k)-\varepsilon 2^{-k}$. The nonempty $F_k$ are pairwise disjoint compact sets, so every finite collection is positively separated. Thus, for $E=\bigcup_kE_k$,

$$
m(E)\ge m\left(\bigcup_{k=1}^NF_k\right)
=\sum_{k=1}^Nm(F_k)
\ge\sum_{k=1}^Nm(E_k)-\varepsilon.
$$

Let $N\to\infty$ and $\varepsilon\downarrow0$.

For unbounded $E_k$, partition each into bounded measurable pieces

$$
E_{k,j}=E_k\cap\bigl(B_j(0)\setminus B_{j-1}(0)\bigr),
\qquad j\ge1,\quad B_0(0)=\varnothing.
$$

The bounded case applies to the pairwise disjoint family $\{E_{k,j}\}_{k,j}$ and to each row. Regrouping the nonnegative sums gives

$$
m(E)=\sum_{k,j}m(E_{k,j})=\sum_km(E_k).
$$

**Corollary 3.3 (Subtraction).** If $B\subseteq A$ are measurable and $m(B)<\infty$, then

$$
m(A\setminus B)=m(A)-m(B).
$$

This follows from the disjoint decomposition $A=B\cup(A\setminus B)$. The finiteness assumption avoids the undefined expression $\infty-\infty$.

**Remark (Translation invariance).** For $h\in\mathbb{R}^n$,

$$
m_*(E+h)=m_*(E).
$$

Indeed, translating any rectangle cover preserves its total volume, and translating back gives the reverse inequality. Translating open approximations also shows that $E+h$ is measurable whenever $E$ is, with $m(E+h)=m(E)$. This fact will be used in the Vitali construction.

### 3.2 Continuity along monotone sequences

Write $E_k\uparrow E$ when $E_k\subseteq E_{k+1}$ and $E=\bigcup_kE_k$. Similarly, $E_k\downarrow E$ means $E_k\supseteq E_{k+1}$ and $E=\bigcap_kE_k$.

**Theorem 3.4 (Continuity from below).** If measurable sets satisfy $E_k\uparrow E$, then

$$
m(E)=\lim_{k\to\infty}m(E_k).
$$

**Proof.** Write the union as disjoint increments:

$$
E=E_1\cup(E_2\setminus E_1)\cup(E_3\setminus E_2)\cup\cdots.
$$

Countable additivity identifies its measure with the limit of the finite partial sums, which are $m(E_k)$.

**Theorem 3.5 (Continuity from above).** If measurable sets satisfy $E_k\downarrow E$ and $m(E_j)<\infty$ for some $j$, then

$$
m(E)=\lim_{k\to\infty}m(E_k).
$$

**Proof idea.** Discard finitely many terms so that $m(E_1)<\infty$. The sets $E_1\setminus E_k$ increase to $E_1\setminus E$. Continuity from below and subtraction give

$$
m(E_1)-m(E)=\lim_k\bigl(m(E_1)-m(E_k)\bigr).
$$

Cancel the finite number $m(E_1)$.

**Example (Why finiteness matters).** In $\mathbb{R}$, the sets $E_k=(k,\infty)$ decrease to $\varnothing$, but every $E_k$ has infinite measure.

**Theorem 3.6 (Outer measure is continuous from below).** Even without measurability, $E_k\uparrow E$ implies

$$
m_*(E)=\lim_{k\to\infty}m_*(E_k).
$$

**Proof.** Choose $G_\delta$ envelopes $H_k\supseteq E_k$ with $m(H_k)=m_*(E_k)$. The $H_k$ need not increase, so define

$$
V_k=\bigcap_{j\ge k}H_j.
$$

Then $V_k\uparrow V$ and $E_k\subseteq V_k\subseteq H_k$, giving $m(V_k)=m_*(E_k)$. Also $E\subseteq V$. Therefore

$$
\lim_km_*(E_k)=m(V)\ge m_*(E).
$$

Monotonicity gives the reverse inequality. This argument uses the special measurable envelopes available for Lebesgue outer measure. A corresponding result from above fails, even for subsets of $[0,1]$; see Section 4.5.

### 3.3 Approximating measurable sets by simpler sets

Measurability can be described through open or closed approximation. For finite measure, compact sets and finite unions of rectangles also suffice.

**Theorem 3.7 (Compact approximation).** Suppose $m_*(E)<\infty$. Then $E$ is measurable if and only if, for every $\varepsilon>0$, there is a compact set $K\subseteq E$ with

$$
m_*(E\setminus K)\le\varepsilon.
$$

**Proof.** Compact approximation implies closed approximation. Conversely, choose closed $F\subseteq E$ with $m(E\setminus F)\le\varepsilon/2$. The compact sets

$$
F_k=F\cap\overline{B_k(0)}
$$

increase to $F$, so $m(F_k)\to m(F)<\infty$. For sufficiently large $k$, $m(F\setminus F_k)\le\varepsilon/2$. Then $K=F_k$ satisfies the claim.

**Definition (Symmetric difference).** The set

$$
A\triangle B=(A\setminus B)\cup(B\setminus A)
$$

consists of the points belonging to exactly one of $A$ and $B$.

**Theorem 3.8 (Finite rectangle approximation).** Suppose $m_*(E)<\infty$. Then $E$ is measurable if and only if, for every $\varepsilon>0$, there is a finite union of closed rectangles $F$ such that

$$
m_*(E\triangle F)\le\varepsilon.
$$

**Proof idea.** If $E$ is measurable, choose open $G\supseteq E$ with $m(G\setminus E)<\varepsilon/2$ and $m(G)<\infty$. Decompose $G$ into almost disjoint closed cubes. A sufficiently large finite union $F$ of these cubes satisfies $m(G\setminus F)<\varepsilon/2$, and

$$
E\triangle F\subseteq(G\setminus E)\cup(G\setminus F).
$$

Conversely, choose $F_j$ with $m_*(E\triangle F_j)\le2^{-j}$, and set

$$
F_\infty=\bigcup_{N=1}^{\infty}\bigcap_{j\ge N}F_j.
$$

This set is measurable. A point in $E\triangle F_\infty$ must belong to $E\triangle F_j$ for infinitely many $j$, so for every $N$,

$$
E\triangle F_\infty\subseteq\bigcup_{j\ge N}(E\triangle F_j).
$$

The right side has outer measure at most $\sum_{j\ge N}2^{-j}\to0$. Thus $E$ differs from a measurable set by a null set and is measurable.

**Theorem 3.9 (Borel approximation up to a null set).** For $E\subseteq\mathbb{R}^n$, the following are equivalent:

1. $E$ is measurable.
2. There is a $G_\delta$ set $H\supseteq E$ with $m_*(H\setminus E)=0$.
3. There is an $F_\sigma$ set $S\subseteq E$ with $m_*(E\setminus S)=0$.

**Proof.** For measurable $E$, choose open $G_k\supseteq E$ with $m_*(G_k\setminus E)\le1/k$. Their intersection $H$ satisfies

$$
m_*(H\setminus E)\le1/k\quad\text{for every }k,
$$

so the excess is null. Taking complements gives the $F_\sigma$ formulation. Conversely, both formulations express $E$ as a Borel set modified by a null set, hence as a measurable set.

**Consequence.** The Lebesgue $\sigma$-algebra $\mathcal{M}$ is the smallest $\sigma$-algebra containing all open sets and all null sets. Equivalently, it is generated by the closed sets together with the null sets.

**Important distinction.** Every set has an equal-measure $G_\delta$ envelope. Measurability requires an envelope whose *excess set is null*. Equality of the two measure values alone does not imply this.

### 3.4 Carathéodory's criterion

Approximation describes a measurable set by comparing it with simpler sets. The next criterion characterizes it by how it divides any test set.

**Theorem 3.10 (Carathéodory).** A set $E\subseteq\mathbb{R}^n$ is measurable if and only if, for every $A\subseteq\mathbb{R}^n$,

$$
m_*(A)=m_*(A\cap E)+m_*(A\setminus E).
$$

**Proof.** Suppose $E$ is measurable. Choose a measurable envelope $H\supseteq A$ with $m(H)=m_*(A)$. Additivity on $H$ gives

$$
m_*(A)=m(H)
=m(H\cap E)+m(H\setminus E)
\ge m_*(A\cap E)+m_*(A\setminus E).
$$

Subadditivity gives the opposite inequality.

Conversely, assume the displayed identity holds for every $A$. If $m_*(E)<\infty$, choose a $G_\delta$ envelope $H\supseteq E$ with $m(H)=m_*(E)$. Taking $A=H$ yields

$$
m_*(E)=m_*(E)+m_*(H\setminus E).
$$

The finite term can be cancelled, so $H\setminus E$ is null and $E$ is measurable.

For arbitrary $E$, let $E_k=E\cap B_k(0)$ and choose $G_\delta$ envelopes $H_k\supseteq E_k$ with $m(H_k)=m_*(E_k)<\infty$. Taking $A=H_k$ gives

$$
m_*(E_k)
=m_*(H_k\cap E)+m_*(H_k\setminus E)
\ge m_*(E_k)+m_*(H_k\setminus E).
$$

Thus each $H_k\setminus E$ is null. The measurable set $H=\bigcup_kH_k$ contains $E$, and $H\setminus E$ is null. Hence $E$ is measurable.

The criterion uses no explicit open or closed approximation in its statement, which makes it a natural starting point for more general measure spaces.

---

## 4. Nonmeasurable Sets and the Limits of Outer Measure

The remaining questions are whether every set is measurable, whether disjoint sets always have additive outer measures, whether every measurable set is Borel, and whether outer measure is continuous from above. All four answers are negative. The examples in this section take place in $\mathbb{R}$.

### 4.1 Vitali's construction

**Axiom of choice.** Given a family of pairwise disjoint nonempty sets, one may select exactly one point from each set. The following construction uses this principle.

**Theorem 4.1 (Vitali).** There is a nonmeasurable set $N\subseteq[0,1]$.

**Proof.** Define an equivalence relation on $[0,1]$ by

$$
x\sim y\quad\Longleftrightarrow\quad x-y\in\mathbb{Q}.
$$

Choose one representative from each equivalence class, and call the resulting set $N$. Enumerate the rationals in $[-1,1]$ without repetition as $\{r_k\}_{k=1}^{\infty}$. Then

$$
[0,1]\subseteq\bigcup_{k=1}^{\infty}(N+r_k)\subseteq[-1,2].
$$

The translates are pairwise disjoint. Indeed, if $x+r_k=y+r_\ell$ with $x,y\in N$, then $x-y\in\mathbb{Q}$, so $x=y$ by the choice of representatives, and hence $r_k=r_\ell$.

If $N$ were measurable, translation invariance and countable additivity would give

$$
1\le\sum_{k=1}^{\infty}m(N+r_k)
=\sum_{k=1}^{\infty}m(N)\le3.
$$

If $m(N)=0$, the sum is zero; if $m(N)>0$, it is infinite. Both alternatives are impossible.

**Corollary 4.2.** Every such Vitali set has $m_*(N)>0$, since all sets of outer measure zero are measurable. The construction does not specify a unique set or a fixed numerical value of its outer measure.

### 4.2 Positive outer measure contains nonmeasurable subsets

**Lemma 4.3 (Steinhaus).** If $E\subseteq\mathbb{R}$ is measurable and $m(E)>0$, then the difference set

$$
E-E=\{x-y:x,y\in E\}
$$

contains an open interval about $0$.

**Proof.** By restricting to a bounded part of positive measure, assume $0<m(E)<\infty$. Choose open $G\supseteq E$ with

$$
m(G)\le\frac32m(E).
$$

Write $G$ as a disjoint union of open intervals $I_k$. Since

$$
\sum_k|I_k|\le\frac32\sum_km(E\cap I_k),
$$

some interval $I$ satisfies $m(E\cap I)\ge\frac23|I|$. Put $F=E\cap I$.

If $F$ and $F+h$ were disjoint, then

$$
\frac43|I|\le2m(F)
=m(F\cup(F+h))
\le m(I\cup(I+h))\le|I|+|h|.
$$

This is impossible when $|h|<|I|/3$. Thus $F\cap(F+h)\ne\varnothing$ for every such $h$. A point in this intersection gives $h=x-y$ with $x,y\in F\subseteq E$, proving the claim.

**Lemma 4.4.** Every measurable subset of a Vitali set $N$ has measure zero. The same is true for every translate $N+r$.

**Proof.** If measurable $F\subseteq N$ had positive measure, Steinhaus's lemma would put a nonzero rational number in $F-F$. Two distinct points of $N$ would then belong to the same rational equivalence class, a contradiction. Translate back to obtain the second assertion.

**Theorem 4.5.** Every $E\subseteq\mathbb{R}$ with $m_*(E)>0$ contains a nonmeasurable subset.

**Proof.** By countable subadditivity, some $E\cap[k,k+1]$ has positive outer measure. After translation, assume $m_*(E\cap[0,1])>0$. Using a Vitali set $N$,

$$
E\cap[0,1]\subseteq\bigcup_{j=1}^{\infty}\bigl(E\cap(N+r_j)\bigr).
$$

If every set on the right were measurable, Lemma 4.4 would make each null. Their union, and hence $E\cap[0,1]$, would have outer measure zero. Therefore at least one intersection is nonmeasurable.

### 4.3 Failure of additivity

The disjoint translates of $N$ already show failure of countable additivity:

$$
m_*\left(\bigcup_k(N+r_k)\right)\le3,
\qquad
\sum_km_*(N+r_k)=\infty.
$$

Even two disjoint sets can fail to have additive outer measures.

**Proposition 4.6.** For a Vitali set $N\subseteq[0,1]$,

$$
m_*([0,1]\setminus N)=1,
$$

and consequently

$$
1=m([0,1])<m_*(N)+m_*([0,1]\setminus N).
$$

**Proof.** If $m_*([0,1]\setminus N)<1$, open approximation gives an open $G\supseteq[0,1]\setminus N$ with $m(G)<1$. Then $[0,1]\setminus G$ is a closed subset of $N$ and

$$
m([0,1]\setminus G)
=1-m([0,1]\cap G)\ge1-m(G)>0,
$$

contradicting Lemma 4.4. Monotonicity gives the opposite bound $m_*([0,1]\setminus N)\le1$.

### 4.4 A measurable set that is not Borel

The idea is to find a homeomorphism that sends a set of positive measure onto the Cantor set. A nonmeasurable subset of the former then becomes a null set. That null set cannot be Borel, because continuous preimages of Borel sets are Borel.

**Example (The Cantor-Lebesgue function).** Recall the sets $C_k$ in the Cantor construction. Write

$$
D_k=[0,1]\setminus C_k=\bigcup_{j=1}^{2^k-1}I_j^k,
$$

where the open intervals are ordered from left to right. Define a continuous function $f_k$ by

$$
f_k(0)=0,\qquad f_k(1)=1,\qquad
f_k(x)=j2^{-k}\quad(x\in I_j^k),
$$

and make $f_k$ linear on every component interval of $C_k$.

Each $f_k$ is nondecreasing, and $f_{k+1}=f_k$ on $D_k$. Moreover,

$$
\sup_{x\in[0,1]}|f_{k+1}(x)-f_k(x)|\le2^{-k}.
$$

The summable bound makes $(f_k)$ uniformly Cauchy. Its limit

$$
f=\lim_{k\to\infty}f_k
$$

is the **Cantor-Lebesgue function**, also called the *devil's staircase*. It is continuous and nondecreasing, with $f(0)=0$, $f(1)=1$, and is constant on every component interval of $[0,1]\setminus C$.

**Theorem 4.7.** There are Lebesgue measurable sets that are not Borel sets.

**Proof.** The Cantor-Lebesgue function itself is not injective. Instead, set

$$
h(x)=x+f(x).
$$

This is a strictly increasing continuous bijection from $[0,1]$ onto $[0,2]$, with continuous inverse $g=h^{-1}$. On every complementary interval of $C$, the map $h$ is a translation. The images of these intervals remain disjoint, so

$$
m\bigl(h([0,1]\setminus C)\bigr)=m([0,1]\setminus C)=1.
$$

The set $h(C)$ is compact and

$$
m(h(C))=2-1=1.
$$

By Theorem 4.5, choose a nonmeasurable subset $N_0\subseteq h(C)$. Its image $g(N_0)$ lies in $C$, so it is null and therefore measurable. If $g(N_0)$ were Borel, its preimage under the continuous map $g$ would be Borel:

$$
g^{-1}\bigl(g(N_0)\bigr)=N_0.
$$

This contradicts the choice of $N_0$. Hence $\mathcal{B}\subsetneq\mathcal{M}$.

### 4.5 Failure of continuity from above for outer measure

**Proposition 4.8.** There are sets $E_k\subseteq[0,1]$ with $E_k\downarrow\varnothing$ but

$$
\lim_{k\to\infty}m_*(E_k)>0.
$$

**Proof.** Keep the disjoint translates $N_j=N+r_j$ from Vitali's construction, and define

$$
E_k=[0,1]\setminus\bigcup_{j=1}^kN_j.
$$

Since all the translates together cover $[0,1]$, the sets $E_k$ decrease to the empty set.

As $\delta\downarrow0$, the sets $N\cap[\delta,1-\delta]$ increase to $N\cap(0,1)$. Removing the two endpoints does not change outer measure, so continuity from below gives some $0<\delta<1/2$ with

$$
m_*\bigl(N\cap[\delta,1-\delta]\bigr)>\frac12m_*(N)>0.
$$

For every $k$, choose $j>k$ with $|r_j|<\delta$. Disjointness of the translates gives

$$
\bigl(N\cap[\delta,1-\delta]\bigr)+r_j
\subseteq N_j\cap[0,1]\subseteq E_k.
$$

By translation invariance,

$$
m_*(E_k)\ge m_*\bigl(N\cap[\delta,1-\delta]\bigr)>\frac12m_*(N).
$$

Thus the decreasing sequence of outer measures stays bounded away from zero, although the intersection is empty.

---

## 5. From Measurable Sets to Measurable Functions

Lebesgue integration groups points according to function values. To measure a group such as $f^{-1}([a,b))$, we need a condition on $f$ ensuring that these inverse images are measurable.

### 5.1 Definition and basic examples

Let $E\subseteq\mathbb{R}^n$ be measurable, and consider

$$
f:E\longrightarrow\overline{\mathbb{R}}
=\mathbb{R}\cup\{-\infty,+\infty\}.
$$

Such a function is **extended real-valued**. It is **finite-valued** if all its values lie in $\mathbb{R}$. From now on, function domains are assumed measurable unless stated otherwise.

**Definition (Measurable function).** The function $f$ is **Lebesgue measurable** if, for every $a\in\mathbb{R}$, the superlevel set

$$
\{f>a\}:=\{x\in E:f(x)>a\}
$$

is measurable.

**Example (Continuous functions).** Every continuous real-valued function on a measurable domain $E$ is measurable. Indeed, $\{f>a\}$ is relatively open in $E$, so it has the form $E\cap G$ for some open $G\subseteq\mathbb{R}^n$.

**Definition (Borel measurable function).** On a Borel domain $E$, a function is **Borel measurable** if all its superlevel sets are Borel sets. Borel measurable functions are Lebesgue measurable, but need not be continuous.

### 5.2 Equivalent level-set tests

**Theorem 5.1.** For $f:E\to\overline{\mathbb{R}}$, the following conditions are equivalent, each required for every $a\in\mathbb{R}$:

1. $\{f>a\}$ is measurable.
2. $\{f\le a\}$ is measurable.
3. $\{f<a\}$ is measurable.
4. $\{f\ge a\}$ is measurable.

**Proof.** Complements here are relative to $E$. Use

$$
\{f\le a\}=E\setminus\{f>a\},
$$

$$
\{f<a\}=\bigcup_{k=1}^{\infty}\{f\le a-1/k\},
$$

$$
\{f\ge a\}=E\setminus\{f<a\},
$$

$$
\{f>a\}=\bigcup_{k=1}^{\infty}\{f\ge a+1/k\}.
$$

Closure under complements and countable unions proves the equivalences.

**Corollary 5.2.** The function $f$ is measurable if and only if $-f$ is measurable.

**Corollary 5.3.** If $f$ is measurable, then all of the following sets are measurable, for real $a<b$:

$$
\{f>-\infty\},\quad \{f<+\infty\},\quad
\{f=+\infty\},\quad \{f=-\infty\},\quad
\{a<f<b\},\quad \{f=a\}.
$$

**Proof idea.** Express each set using countable unions, intersections, and complements of level sets. For example,

$$
\{f=+\infty\}=\bigcap_{k=1}^{\infty}\{f>k\},
\qquad
\{f=a\}=\{f\le a\}\cap\{f\ge a\}.
$$

In particular,

$$
f^{-1}([a,b))=\{f\ge a\}\cap\{f<b\}
$$

is measurable. These are precisely the sets needed when partitioning the range to construct the Lebesgue integral.
