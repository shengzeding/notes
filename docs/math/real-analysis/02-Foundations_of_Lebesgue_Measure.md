# Foundations of Lebesgue Measure

The main problem is to extend length and volume to complicated sets while keeping the rule that disjoint pieces add up. The construction develops in five steps:

**Cover sets by rectangles → define outer measure → identify measurable sets → obtain reliable rules for measure → measure the level sets of functions.**

The examples matter as much as the definitions. The Cantor set separates size from cardinality; the Vitali set explains why measurability is necessary.

Throughout, $m_*$ denotes Lebesgue outer measure, and $m$ denotes its restriction to measurable sets. The topology used here is covered in the separate Review notes.

---

## 1. Outer Measure: Measuring by Covers

### 1.1 Start with something whose volume we know

For an axis-parallel closed rectangle,

$$
R=\prod_{i=1}^n[a_i,b_i],
\qquad |R|=\prod_{i=1}^n(b_i-a_i).
$$

Equal side lengths give a **cube**. Rectangles are **almost disjoint** when their interiors are pairwise disjoint; their boundaries may overlap.

Two elementary facts make rectangles useful: subdividing a rectangle preserves total volume, and any finite rectangle cover of $R$ has total volume at least $|R|$. Both follow by cutting along all the faces to form a common grid. We need these facts to ensure that the later definition agrees with ordinary volume.

**Definition (Outer measure).** For any $E\subseteq\mathbb{R}^n$,

$$
m_*(E)=\inf\left\{
\sum_{k=1}^{\infty}|R_k|:
E\subseteq\bigcup_{k=1}^{\infty}R_k,
\quad R_k\text{ closed rectangles}
\right\}.
$$

Read this as: cover $E$ from outside, add the covering volumes, and make that total as small as possible. An optimal cover need not exist; the infimum is enough. Every set has an outer measure in $[0,\infty]$.

**Why countable covers matter.** Each point can be covered at arbitrarily small cost, and countably many such costs can have an arbitrarily small sum. Finite covers alone give Jordan outer content. For example, finitely many closed intervals covering $\mathbb{Q}\cap[0,1]$ must cover its closure $[0,1]$, whereas countable covers give this rational set outer measure zero. Cubes and rectangles give the same Lebesgue outer measure.

### 1.2 The rules available immediately

For arbitrary sets, we have

$$
E\subseteq F\quad\Longrightarrow\quad m_*(E)\le m_*(F)
\qquad\text{(monotonicity)},
$$

$$
m_*\left(\bigcup_kE_k\right)\le\sum_km_*(E_k)
\qquad\text{(countable subadditivity)}.
$$

Monotonicity follows because a cover of $F$ also covers $E$. For subadditivity, combine covers of the individual sets.

**Technique worth keeping: distribute the error.** If the sum on the right is finite, cover each $E_k$ at cost at most

$$
m_*(E_k)+\varepsilon 2^{-k}.
$$

The combined cover costs at most $\sum_km_*(E_k)+\varepsilon$. Let $\varepsilon\downarrow0$. Assigning an error of $\varepsilon$ to every set would fail: countably many errors would not remain small.

Useful values are

$$
m_*(\varnothing)=0,\qquad m_*(\{x\})=0,\qquad
m_*(R)=|R|,\qquad m_*(\mathbb{R}^n)=\infty.
$$

Open rectangles also have their usual volume. The only substantial step for closed rectangles is the lower bound: slightly enlarge a countable cover to an open cover, use compactness to extract a finite subcover, and apply the elementary volume inequality.

**Do not assume additivity yet.** Even if $E\cap F=\varnothing$, equality in subadditivity can fail. In particular, subtracting outer measures is generally invalid.

### 1.3 The Cantor set: uncountable can still mean zero measure

Starting from $C_0=[0,1]$, repeatedly remove the open middle third of each remaining interval. At stage $k$, there are $2^k$ closed intervals of length $3^{-k}$. Define

$$
C=\bigcap_{k=0}^{\infty}C_k.
$$

The estimate to remember is

$$
m_*(C)\le2^k3^{-k}=(2/3)^k\longrightarrow0.
$$

The set is compact and perfect. To see the second point, take the stage-$k$ interval containing $x\in C$: its endpoints remain in $C$ and approach $x$, with at least one distinct from $x$. The Review theorem on nonempty perfect sets then gives uncountability.

Thus every countable set is null, but a null set need not be countable. Conversely, positive outer measure forces uncountability.

### 1.4 Geometry that will make the next step work

Keep these facts as tools:

- Every open subset of $\mathbb{R}$ is a countable union of disjoint open intervals, possibly unbounded. Its maximal component intervals are disjoint, and each contains a different rational number.
- Every open subset of $\mathbb{R}^n$ is a countable union of almost disjoint closed cubes. Repeatedly subdivide a grid and keep cubes lying inside the open set.
- If $d(E,F)>0$, then $m_*(E\cup F)=m_*(E)+m_*(F)$.
- For countably many almost disjoint closed rectangles $R_k$,

$$
m_*\left(\bigcup_kR_k\right)=\sum_k|R_k|.
$$

**The useful idea is separation.** When two sets have positive distance, sufficiently small covering rectangles cannot meet both, so their covering costs separate. For almost disjoint rectangles, shrink them slightly; every finite family then has positive separation. Let the shrinking error tend to zero.

These facts let us turn open sets into manageable pieces and later recover additivity for measurable sets.

---

## 2. Measurability: Controlling What the Cover Adds

### 2.1 The distinction that motivates the definition

Every set $E$ admits open supersets with almost the same outer measure:

$$
E\subseteq G,\qquad m_*(G)\le m_*(E)+\varepsilon.
$$

This comes from taking a nearly optimal rectangle cover and enlarging each rectangle slightly. Equivalently,

$$
m_*(E)=\inf_{G\supseteq E,\ G\text{ open}}m_*(G).
$$

The tempting next step is to write $m_*(G\setminus E)=m_*(G)-m_*(E)$. **We have not earned that subtraction rule.** Close measure values do not yet tell us that the excess set is small.

**Definition (Lebesgue measurability).** A set $E$ is measurable if, for every $\varepsilon>0$, some open $G\supseteq E$ satisfies

$$
m_*(G\setminus E)\le\varepsilon.
$$

For measurable $E$, write $m(E)=m_*(E)$.

The definition controls the actual excess set. This is the extra condition that eventually gives countable additivity.

### 2.2 Sets we can use without checking the definition again

Open sets are measurable by choosing $G=E$. Sets of outer measure zero, called **null sets**, are measurable by open approximation. Monotonicity then shows that **every subset of a null set is measurable and null**.

Closed sets are measurable as well. Measurable sets remain measurable under complements, countable unions, countable intersections, and differences.

For revision, remember one proof pattern: choose open approximations to $E_k$ with errors $\varepsilon 2^{-k}$ and use

$$
\left(\bigcup_kG_k\right)\setminus\left(\bigcup_kE_k\right)
\subseteq\bigcup_k(G_k\setminus E_k).
$$

This proves closure under countable unions. The other closure arguments need not all be memorized. One logical detail matters: in this approach, closed-set measurability is established using compactness and positive separation before closure under complements is available.

### 2.3 Borel sets and null-set modifications

**Definition.** A **$\sigma$-algebra** is a nonempty family of subsets closed under complements and countable unions. It automatically contains the empty set and the whole space, and is closed under countable intersections. The measurable sets form a $\sigma$-algebra $\mathcal{M}$.

The **Borel $\sigma$-algebra** $\mathcal{B}$ is the smallest $\sigma$-algebra containing all open sets. In particular,

$$
\mathcal{B}\subseteq\mathcal{M}.
$$

Two useful Borel classes are **$G_\delta$ sets**, countable intersections of open sets, and **$F_\sigma$ sets**, countable unions of closed sets. Complements exchange these classes.

**Theorem 2.1 (Approximation up to a null set).** The following are equivalent:

- $E$ is measurable.
- There is a $G_\delta$ set $H\supseteq E$ with $m_*(H\setminus E)=0$.
- There is an $F_\sigma$ set $S\subseteq E$ with $m_*(E\setminus S)=0$.

**Idea to remember.** Choose open $G_k\supseteq E$ whose excess has outer measure at most $1/k$, and intersect them. The excess of $H=\bigcap_kG_k$ is at most $1/k$ for every $k$, hence is zero. Take complements for the inner version.

This says that a measurable set differs from a Borel set only by a null set. Accordingly, $\mathcal{M}$ is generated by the open sets together with all null sets. Later we will see why $\mathcal{B}\ne\mathcal{M}$.

**A distinction to keep straight.** Every set, even a nonmeasurable one, has a $G_\delta$ envelope $H\supseteq E$ with $m(H)=m_*(E)$: intersect open approximations to the measure value. Only for measurable sets can we require the excess $H\setminus E$ to be null.

---

## 3. Working with Measure: Rules, Conditions, and Useful Approximations

### 3.1 Additivity is the main payoff

**Theorem 3.1 (Countable additivity).** For pairwise disjoint measurable sets $E_k$,

$$
m\left(\bigcup_kE_k\right)=\sum_km(E_k).
$$

**Proof mechanism worth knowing.** First work with bounded sets. Approximate each $E_k$ from inside by a compact $K_k$, losing at most $\varepsilon 2^{-k}$ in measure. A finite collection of disjoint compact sets has positive separation, so the outer-measure additivity from Section 1 applies. Take larger finite collections and let the error vanish. For unbounded sets, first split them into bounded measurable pieces.

This is a recurring strategy: replace difficult sets by compact pieces, use geometry on those pieces, and control what was discarded.

Two practical rules now follow:

$$
B\subseteq A,\quad A,B\text{ measurable},\quad m(B)<\infty
\quad\Longrightarrow\quad
m(A\setminus B)=m(A)-m(B),
$$

$$
m(E+h)=m(E)\qquad(E\text{ measurable}).
$$

**Check before subtracting:** the smaller set must have finite measure; otherwise $\infty-\infty$ may appear. Translation invariance also holds for outer measure, because translating rectangle covers preserves their volumes.

### 3.2 Passing to a monotone limit

The notation $E_k\uparrow E$ means an increasing sequence with union $E$; $E_k\downarrow E$ means a decreasing sequence with intersection $E$.

| Situation | Conclusion | Condition to check |
|---|---|---|
| Measurable $E_k\uparrow E$ | $m(E_k)\to m(E)$ | No finiteness assumption |
| Measurable $E_k\downarrow E$ | $m(E_k)\to m(E)$ | Some $m(E_j)<\infty$ |
| Arbitrary $E_k\uparrow E$ | $m_*(E_k)\to m_*(E)$ | Valid for Lebesgue outer measure |
| Arbitrary $E_k\downarrow E$ | May fail, even inside $[0,1]$ | Boundedness cannot replace measurability |

For the increasing measurable case, use disjoint increments:

$$
E=E_1\cup(E_2\setminus E_1)\cup(E_3\setminus E_2)\cup\cdots.
$$

For the decreasing case, apply the increasing result to $E_1\setminus E_k$ and subtract from $m(E_1)$. This explains exactly where finiteness enters. Without it, $(k,\infty)\downarrow\varnothing$ is a counterexample.

**A useful envelope trick.** For arbitrary increasing $E_k$, choose measurable envelopes $H_k\supseteq E_k$ with $m(H_k)=m_*(E_k)$. They need not increase. Replace them by

$$
V_k=\bigcap_{j\ge k}H_j.
$$

Now $V_k\uparrow V$ and $E_k\subseteq V_k\subseteq H_k$, so $m(V_k)=m_*(E_k)$. Continuity for measurable sets and monotonicity give the desired outer-measure limit. The trick is to make the approximating sets monotone as well.

### 3.3 Choose the approximation that fits the problem

Each row below is an equivalent test for measurability. In every row, the approximation must exist for **every** $\varepsilon>0$.

| Approximation | Required error bound | Extra hypothesis |
|---|---|---|
| Open $G\supseteq E$ | $m_*(G\setminus E)\le\varepsilon$ | None |
| Closed $F\subseteq E$ | $m_*(E\setminus F)\le\varepsilon$ | None |
| Compact $K\subseteq E$ | $m_*(E\setminus K)\le\varepsilon$ | $m_*(E)<\infty$ |
| Finite union of closed rectangles $F$ | $m_*(E\triangle F)\le\varepsilon$ | $m_*(E)<\infty$ |

Here

$$
E\triangle F=(E\setminus F)\cup(F\setminus E)
$$

is the **symmetric difference**: it counts both the missing part and the extra part.

Use open supersets when you need a cover, compact subsets when you need finite subcovers or positive separation, and finite rectangle unions when you want a geometric model of the set. Closed approximation follows from open approximation by taking complements. Compact approximation adds a truncation step: intersect the closed approximation with a sufficiently large closed ball.

**A detail that matters.** Rectangle approximation does not say $F\subseteq E$ or $E\subseteq F$. The error is measured on both sides. Also, compact approximation with small *total* error needs finite measure; a compact set cannot leave only a small remainder of an infinite-measure set.

### 3.4 Carathéodory: measurability as a splitting rule

**Theorem 3.2 (Carathéodory's criterion).** A set $E$ is measurable if and only if, for every $A\subseteq\mathbb{R}^n$,

$$
m_*(A)=m_*(A\cap E)+m_*(A\setminus E).
$$

Read this as: cutting any test set along $E$ preserves its total outer measure. The test set $A$ need not be measurable. Subadditivity always gives the $\le$ direction, so the work is to establish $\ge$.

**Proof idea to keep.** If $E$ is measurable, put $A$ inside a measurable envelope of the same outer measure and split that envelope. Conversely, when $m_*(E)<\infty$, test the identity on an equal-measure envelope $H\supseteq E$:

$$
m_*(E)=m_*(E)+m_*(H\setminus E).
$$

Cancellation forces the excess to be null. The infinite case is handled using envelopes of bounded pieces, so no $\infty-\infty$ is taken.

This criterion is useful when a set is naturally described as a cut rather than by an open approximation. It also provides an entry point to general measure theory, since its statement does not require a topology.

---

## 4. Counterexamples: Why the Conditions Matter

All constructions in this section take place in $\mathbb{R}$.

### 4.1 Vitali's set: the proof worth remembering

**Theorem 4.1 (Vitali).** There exists a nonmeasurable set $N\subseteq[0,1]$.

The construction uses the **axiom of choice** to select one representative from every equivalence class of

$$
x\sim y\quad\Longleftrightarrow\quad x-y\in\mathbb{Q}.
$$

Call the set of representatives $N$, and enumerate $\mathbb{Q}\cap[-1,1]$ without repetition as $\{r_k\}$.

Two features drive the proof. First,

$$
[0,1]\subseteq\bigcup_k(N+r_k)\subseteq[-1,2].
$$

Every $x\in[0,1]$ differs from its chosen representative by one of these rationals. Second, the translates are pairwise disjoint: if $x+r_k=y+r_\ell$ for $x,y\in N$, then $x-y\in\mathbb{Q}$, forcing $x=y$ and $k=\ell$.

If $N$ were measurable, countable additivity and translation invariance would imply

$$
1\le\sum_km(N+r_k)=\sum_km(N)\le3.
$$

The sum is either zero or infinite. Neither is possible.

**What makes this proof work:** countably many disjoint copies of equal measure cover an interval while staying inside a bounded interval. Both additivity and translation invariance are essential. Since every null set is measurable, we also know $m_*(N)>0$.

### 4.2 Steinhaus: positive measure forces nearby differences

**Lemma 4.2 (Steinhaus).** If $E\subseteq\mathbb{R}$ is measurable with $m(E)>0$, then

$$
E-E=\{x-y:x,y\in E\}
$$

contains an open interval about $0$. Equivalently, $E\cap(E+h)\ne\varnothing$ for every sufficiently small $h$.

**The geometric idea.** After restricting to a finite-measure part, open approximation gives an interval $I$ on which $F=E\cap I$ occupies at least two thirds of the length. If $F$ and $F+h$ were disjoint, then

$$
\frac43|I|\le2m(F)\le m(I\cup(I+h))\le|I|+|h|,
$$

which is impossible for $|h|<|I|/3$. Two sufficiently full copies cannot fit disjointly into such a short interval.

This has two consequences worth retaining:

- Every measurable subset of a Vitali set, or of its translate, is null. Otherwise Steinhaus gives a nonzero rational difference between two representatives.
- Every subset of $\mathbb{R}$ with positive outer measure contains a nonmeasurable subset. Restrict to a unit interval and intersect with the countably many Vitali translates covering it. If all intersections were measurable, all would be null, contradicting positive outer measure.

**Keep the distinction:** a Vitali set has positive outer measure, yet it contains no measurable subset of positive measure.

### 4.3 Disjointness alone does not give additivity

For a Vitali set $N\subseteq[0,1]$,

$$
m_*([0,1]\setminus N)=1,
$$

so

$$
m_*([0,1])=1<m_*(N)+m_*([0,1]\setminus N).
$$

To remember why the complement has outer measure $1$: an open cover of it with measure less than $1$ would leave a closed positive-measure subset inside $N$, contradicting the preceding consequence of Steinhaus.

This is a concrete warning against subtracting outer measures. The countably many disjoint translates also give a stronger failure: their union has outer measure at most $3$, while the sum of their outer measures is infinite.

### 4.4 A null set need not be Borel

The **Cantor-Lebesgue function** $f:[0,1]\to[0,1]$ is continuous and nondecreasing, takes the values $0$ and $1$ at the endpoints, and is constant on each removed middle-third interval.

Its construction mirrors the Cantor set: at stage $k$, assign the values $j2^{-k}$ to the $2^k-1$ gaps in left-to-right order and interpolate linearly on the remaining intervals. The successive functions differ uniformly by at most $2^{-k}$, so they converge uniformly to $f$.

For the non-Borel example, the useful modification is

$$
h(x)=x+f(x).
$$

This is a homeomorphism from $[0,1]$ to $[0,2]$. On every complementary interval of the Cantor set $C$, it is a translation. Hence those image intervals still have total length $1$, leaving

$$
m(h(C))=2-1=1.
$$

Choose a nonmeasurable $N_0\subseteq h(C)$ and put $g=h^{-1}$. Then $g(N_0)\subseteq C$ is null and measurable. If it were Borel, its preimage under the continuous map $g$ would also be Borel:

$$
g^{-1}(g(N_0))=N_0,
$$

a contradiction. Thus $\mathcal{B}\subsetneq\mathcal{M}$.

**What to remember.** Continuous preimages preserve Borel sets. They need not preserve Lebesgue measurable sets: the null set $g(N_0)$ above has a nonmeasurable preimage. The construction depends on this distinction, and on adding $x$ to make the Cantor function invertible.

### 4.5 Outer measure can fail to be continuous from above

Use the same disjoint translates $N_j=N+r_j$ and set

$$
E_k=[0,1]\setminus\bigcup_{j=1}^kN_j.
$$

Then $E_k\downarrow\varnothing$, but their outer measures stay bounded away from zero.

**Construction idea.** Choose $\delta>0$ so the interior portion $N\cap[\delta,1-\delta]$ retains more than half of $m_*(N)$. This follows from continuity from below and the fact that endpoints are null. After any finite number of translates has been removed, an unused rational $r_j$ with $|r_j|<\delta$ remains. Its translate of that interior portion lies inside $E_k$. Consequently,

$$
m_*(E_k)\ge m_*\bigl(N\cap[\delta,1-\delta]\bigr)>\tfrac12m_*(N)>0.
$$

The details are less important than the mechanism: every finite stage retains a shifted copy of a fixed positive-outer-measure piece, although the eventual intersection is empty.

---

## 5. Measurable Functions: Turning Values into Sets

### 5.1 The link to integration

Lebesgue integration partitions the range of a function. Before integrating, we therefore need to measure sets such as

$$
f^{-1}([a,b))=\{x:a\le f(x)<b\}.
$$

Let $E\subseteq\mathbb{R}^n$ be measurable and $f:E\to\overline{\mathbb{R}}$, where $\overline{\mathbb{R}}=\mathbb{R}\cup\{-\infty,+\infty\}$. Such functions are **extended real-valued**; they are **finite-valued** when neither infinity occurs.

**Definition.** The function $f$ is measurable if $\{f>a\}$ is measurable for every real $a$. Here all level sets are subsets of the domain $E$.

The working habit is to turn a claim about a function into a claim about its level sets, then use the closure properties of measurable sets.

### 5.2 Use whichever level-set test is easiest

**Theorem 5.1.** Measurability can equivalently be tested using any one of

$$
\{f>a\},\qquad\{f\ge a\},\qquad\{f<a\},\qquad\{f\le a\},
$$

provided the chosen test holds for every $a\in\mathbb{R}$.

There is no need to memorize four separate arguments. Keep the two operations:

$$
\{f\le a\}=E\setminus\{f>a\},
\qquad
\{f<a\}=\bigcup_{k=1}^{\infty}\{f\le a-1/k\}.
$$

Complements reverse inequalities; countable unions or intersections change strict inequalities to non-strict ones. The same reasoning shows that $f$ is measurable if and only if $-f$ is.

**Small but important detail:** complements are relative to $E$. Also, if $f$ is continuous on $E$, its superlevel sets are relatively open, of the form $E\cap G$ with $G$ open in $\mathbb{R}^n$. This proves measurability even when $E$ itself is not open.

On a Borel domain, requiring the level sets to be Borel defines **Borel measurability**. It implies Lebesgue measurability but does not imply continuity.

### 5.3 Useful sets obtained for free

Once $f$ is measurable, its equality sets, interval preimages, and sets where it takes infinite values are measurable. For example,

$$
\{f=a\}=\{f\le a\}\cap\{f\ge a\},
\qquad
\{f=+\infty\}=\bigcap_{k=1}^{\infty}\{f>k\},
$$

$$
f^{-1}([a,b))=\{f\ge a\}\cap\{f<b\}.
$$

Likewise, $\{f=-\infty\}$, $\{f>-\infty\}$, $\{f<+\infty\}$, and $\{a<f<b\}$ are measurable. In exercises, write these set identities explicitly; they often contain the entire argument. The interval preimages provide the pieces needed for the next step: constructing the Lebesgue integral.
