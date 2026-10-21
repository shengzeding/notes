# Measurable Functions and Approximation

Measurable functions are stable under many operations and limits, and can be approximated by simple functions. Littlewood's principles explain how measurability and pointwise convergence relate to more familiar notions of regularity. Egorov's theorem gives uniform convergence outside a small exceptional set, and Lusin's theorem gives continuity after restricting to a large closed subset.

Throughout, $E\subseteq\mathbb{R}^n$ is measurable and functions may take values in $\overline{\mathbb{R}}=\mathbb{R}\cup\{-\infty,+\infty\}$ unless stated otherwise. Recall that $f:E\to\overline{\mathbb{R}}$ is measurable exactly when $\{f>a\}$ is measurable for every real $a$. The equivalent tests using $\{f\ge a\}$, $\{f<a\}$, or $\{f\le a\}$ were established in *Foundations of Lebesgue Measure*.

---

## 1. Measurability and Almost Everywhere Statements

### 1.1 Two more tests for measurability

**Theorem 1.1 (Open preimages).** Suppose $\{f=+\infty\}$ is measurable. Then $f$ is measurable if and only if $f^{-1}(G)$ is measurable for every open set $G\subseteq\mathbb{R}$.

**Proof idea.** If $f$ is measurable, inverse images of open intervals are measurable by the level-set tests. Every open subset of $\mathbb{R}$ is a countable union of open intervals, so its inverse image is measurable. Conversely,

$$
\{f>a\}=f^{-1}((a,\infty))\cup\{f=+\infty\}.
$$

The separate assumption on $+\infty$ matters because an open subset of $\mathbb{R}$ contains only finite values. For finite-valued functions, no extra assumption is needed.

**Theorem 1.2 (Dense thresholds suffice).** Let $D\subseteq\mathbb{R}$ be dense. If $\{f>\lambda\}$ is measurable for every $\lambda\in D$, then $f$ is measurable.

**Proof.** For any $a\in\mathbb{R}$, choose $\lambda_j\in D\cap(a,a+1/j)$. Then

$$
\{f>a\}=\bigcup_{j=1}^{\infty}\{f>\lambda_j\}.
$$

Thus only countably many thresholds are needed for each $a$. In particular, testing all rational thresholds is enough.

### 1.2 Almost everywhere

**Definition.** A property holds **almost everywhere** on $E$ if it holds outside a null subset of $E$. In particular,

$$
f=g\quad\text{a.e.}
$$

means that $f$ and $g$ agree outside a null set. The abbreviation “a.e.” stands for *almost everywhere*.

**Example.** The Dirichlet function $D=\chi_{\mathbb{Q}}$ is zero almost everywhere, but is discontinuous at every point. Being equal almost everywhere to a continuous function does not mean being continuous almost everywhere.

**Theorem 1.3 (Changing values on a null set).** If $f$ is measurable and $g=f$ almost everywhere on $E$, then $g$ is measurable. Moreover, for every $a\in\mathbb{R}$,

$$
m(\{f>a\})=m(\{g>a\}).
$$

**Proof.** Let $Z$ be a null set outside which $f=g$. Then

$$
\{f>a\}\triangle\{g>a\}\subseteq Z.
$$

Every subset of $Z$ is measurable and null. Hence the two level sets differ only by measurable null sets, so both are measurable and have the same measure.

The same reasoning allows us to extend or restrict a measurable function across a null set without losing measurability.

---

## 2. Operations and Limits

### 2.1 Continuous transformations

**Theorem 2.1 (Continuous composition).** Suppose $f$ is measurable and finite almost everywhere, and $\Phi:\mathbb{R}\to\mathbb{R}$ is continuous. Then $\Phi\circ f$, defined arbitrarily on the null set where $f$ is infinite, is measurable.

**Proof.** First modify $f$ on that null set to make it finite everywhere. For open $G\subseteq\mathbb{R}$,

$$
(\Phi\circ f)^{-1}(G)=f^{-1}(\Phi^{-1}(G)).
$$

The set $\Phi^{-1}(G)$ is open by continuity, and its inverse image under $f$ is measurable. Theorem 1.1 applies, and Theorem 1.3 handles any changes on the exceptional null set.

**Remark.** The order matters. Composing a Lebesgue measurable function on the outside with a continuous map on the inside need not preserve Lebesgue measurability: continuous preimages of arbitrary Lebesgue measurable sets need not be measurable.

**Proposition 2.2 (Useful transformations).** If $f$ is measurable, then

$$
|f|^p\quad(p>0),\qquad e^{cf},\qquad
f^+=\max\{0,f\},\qquad f^-=\max\{0,-f\}
$$

are measurable. Here $c\in\mathbb{R}$; for infinite values, use the natural extended limits of these scalar functions, with $e^{0f}\equiv1$.

**Proof idea.** For finite-valued functions, apply continuous composition. For extended-valued functions, separate the measurable sets where $f=+\infty$ or $f=-\infty$ and use the same argument on the finite-valued part.

The positive and negative parts satisfy

$$
f=f^+-f^-,\qquad |f|=f^++f^-.
$$

At each point at least one of $f^+$ and $f^-$ is zero, so this decomposition never requires subtracting two infinities.

### 2.2 Comparisons and arithmetic

**Lemma 2.3 (Comparing measurable functions).** If $f$ and $g$ are measurable, then $\{f>g\}$ is measurable.

**Proof.** A rational number separates any two distinct ordered values, including extended values. Thus

$$
\{f>g\}
=\bigcup_{r\in\mathbb{Q}}\bigl(\{f>r\}\cap\{g<r\}\bigr).
$$

This is a countable union of measurable sets.

**Proposition 2.4 (Arithmetic).** If $f,g$ are measurable and finite-valued, and $c\in\mathbb{R}$, then

$$
f+g,\qquad cf,\qquad fg
$$

are measurable. If $g\ne0$ almost everywhere, then $f/g$ is measurable after assigning arbitrary values on the null set $\{g=0\}$.

The same conclusions hold for functions finite almost everywhere after choosing finite values on their exceptional null sets. For general extended-valued functions, expressions such as $+\infty-\infty$ must first be excluded or explicitly defined.

**Proof.** For addition, $a-g$ is measurable and

$$
\{f+g>a\}=\{f>a-g\},
$$

so Lemma 2.3 applies. Scalar multiplication follows from the level-set tests, with the inequality reversed when $c<0$; $c=0$ gives a constant function. For products, use

$$
fg=\frac14\bigl((f+g)^2-(f-g)^2\bigr).
$$

For quotients, $1/g$ is measurable on $\{g\ne0\}$: the reciprocal is continuous separately on $(-\infty,0)$ and $(0,\infty)$. Multiply by $f$, then use null-set invariance.

### 2.3 Suprema, infima, and limits

**Theorem 2.5.** If $(f_k)$ is a sequence of measurable functions, then

$$
\sup_k f_k,\qquad \inf_k f_k,\qquad
\limsup_{k\to\infty}f_k,\qquad
\liminf_{k\to\infty}f_k
$$

are all measurable, possibly with infinite values.

**Proof.** Use the identities

$$
\left\{\sup_k f_k>a\right\}=\bigcup_{k=1}^{\infty}\{f_k>a\},
\qquad
\inf_k f_k=-\sup_k(-f_k),
$$

$$
\limsup_{k\to\infty}f_k=\inf_N\sup_{k\ge N}f_k,
\qquad
\liminf_{k\to\infty}f_k=-\limsup_{k\to\infty}(-f_k).
$$

Each expression involves only countable measurable operations.

**Corollary 2.6.** If $f_k\to f$ almost everywhere and every $f_k$ is measurable, then $f$ is measurable.

**Proof.** Outside a null set,

$$
f=\limsup_kf_k=\liminf_kf_k.
$$

The limit superior is measurable by Theorem 2.5, and modifying it on a null set preserves measurability.

---

## 3. Approximation by Simple Functions

### 3.1 Characteristic and simple functions

**Definition (Characteristic function).** For $A\subseteq\mathbb{R}^n$, define

$$
\chi_A(x)=
\begin{cases}
1,&x\in A,\\
0,&x\notin A.
\end{cases}
$$

The function $\chi_A$ is measurable if and only if $A$ is measurable.

**Definition (Simple function).** A function is **simple** if it takes only finitely many real values. If its distinct values are $a_1,\ldots,a_N$ and $A_j=\{f=a_j\}$, then

$$
f=\sum_{j=1}^N a_j\chi_{A_j}.
$$

This is its **canonical form**: the nonempty sets $A_j$ are pairwise disjoint and partition the domain. The representation is unique up to ordering. Such a function is measurable exactly when every $A_j$ is measurable.

Here “simple” means finite-valued with finite range; measurability is a separate condition. No finite-measure assumption is imposed on its level sets.

The approximation below follows Lebesgue's original idea: partition the range into small intervals and replace each value by a nearby endpoint.

### 3.2 Nonnegative functions

**Theorem 3.1 (Monotone simple approximation).** For every function $f:E\to[0,+\infty]$, there are nonnegative simple functions $s_k$ such that

$$
0\le s_k\le s_{k+1},\qquad s_k(x)\longrightarrow f(x)
\quad\text{for every }x\in E.
$$

If $f$ is measurable, the $s_k$ can all be chosen measurable.

**Proof.** Truncate at height $k$ and round down to the nearest multiple of $2^{-k}$:

$$
s_k(x)=
\begin{cases}
\dfrac{j}{2^k},
&\dfrac{j}{2^k}\le f(x)<\dfrac{j+1}{2^k},
\quad j=0,\ldots,k2^k-1,\\[4pt]
k,&f(x)\ge k.
\end{cases}
$$

Each $s_k$ takes only finitely many values. Passing from $k$ to $k+1$ refines the dyadic grid and raises the truncation level, so $s_k\le s_{k+1}\le f$.

If $f(x)<\infty$, then whenever $k>f(x)$,

$$
0\le f(x)-s_k(x)<2^{-k}.
$$

If $f(x)=+\infty$, then $s_k(x)=k\to+\infty$. Thus $s_k\uparrow f$ pointwise.

Finally,

$$
s_k=
\sum_{j=0}^{k2^k-1}\frac{j}{2^k}
\chi_{\{j2^{-k}\le f<(j+1)2^{-k}\}}
+k\chi_{\{f\ge k\}}.
$$

When $f$ is measurable, every set in this expression is measurable, so $s_k$ is measurable.

**Remark (Bounded support).** Let $Q_k=[-k/2,k/2]^n$. Replacing $s_k$ by $s_k\chi_{Q_k}$ makes it zero outside $Q_k$, while preserving monotonicity and pointwise convergence on $E$. Every fixed point eventually lies in all the $Q_k$.

### 3.3 Functions of either sign

**Theorem 3.2 (General simple approximation).** Every measurable $f:E\to\overline{\mathbb{R}}$ is a pointwise limit of measurable simple functions.

**Proof.** Apply Theorem 3.1 to the nonnegative measurable functions $f^+$ and $f^-$, obtaining

$$
u_k\uparrow f^+,\qquad v_k\uparrow f^-.
$$

Choose the approximations from the displayed construction, so they are zero wherever the function being approximated is zero. Then

$$
\varphi_k=u_k-v_k\longrightarrow f
$$

at every point, including points where $f=\pm\infty$. Each $\varphi_k$ is measurable and has finite range. Unlike the nonnegative approximation, this sequence need not be monotone.

Together with Corollary 2.6, this gives a useful characterization: measurable functions are exactly the pointwise limits of measurable simple functions.

---

## 4. Littlewood's Principles: Egorov and Lusin

### 4.1 Three forms of approximation

Littlewood's three principles can be paraphrased as follows, with the appropriate hypotheses:

1. A measurable set is nearly a finite union of intervals or rectangles.
2. A measurable function is nearly continuous.
3. A pointwise convergent sequence of measurable functions is nearly uniformly convergent.

Here “nearly” is made precise through small measure errors. The first principle is the rectangle approximation theorem proved earlier; the second is formalized by Lusin's theorem; the third is formalized by Egorov's theorem. We prove Egorov first, then use it to establish Lusin.

**Theorem 4.1 (First principle: approximation of sets).** Suppose $m_*(E)<\infty$. Then $E$ is measurable if and only if, for every $\varepsilon>0$, there are finitely many closed rectangles $R_1,\ldots,R_N$ such that

$$
m_*\left(E\triangle\bigcup_{j=1}^N R_j\right)<\varepsilon.
$$

**Proof idea.** Approximate $E$ from outside by an open set of finite measure, decompose that open set into almost disjoint cubes, and retain finitely many cubes with a sufficiently small remainder. The converse follows by choosing approximations with summable symmetric-difference errors. The full argument appears in *Foundations of Lebesgue Measure*, Theorem 3.8.

### 4.2 Why the hypotheses matter

Pointwise convergence allows the time needed to reach a given accuracy to depend on $x$. Uniform convergence requires one time that works for every point in the domain under consideration. Egorov's theorem achieves this after removing a set of arbitrarily small measure.

**Example 1 (Infinite limits).** On $[0,1]$, let $f_k(x)=k$. The pointwise limit is $+\infty$, so the sequence has no finite-valued limit on any nonempty subset. This lies outside the usual real-valued uniform-convergence conclusion of Egorov's theorem. It does diverge uniformly to $+\infty$ in the separate sense that, for every real $M$, eventually $f_k(x)>M$ for all $x$.

**Example 2 (Infinite measure).** On $E=[0,\infty)$, set

$$
f_k=\chi_{[k,\infty)}.
$$

Then $f_k(x)\to0$ at each fixed $x$. If $A\subseteq E$ and $m(E\setminus A)<\infty$, however, $A$ must be unbounded. Hence $A\cap[k,\infty)\ne\varnothing$ for every $k$, and

$$
\sup_{x\in A}|f_k(x)|=1.
$$

Thus removing a set of arbitrarily small measure cannot produce uniform convergence. The relevant hypothesis is finite **measure** of $E$, not boundedness of $E$ itself.

### 4.3 Egorov's theorem

**Theorem 4.2 (Egorov).** Let $E\subseteq\mathbb{R}^n$ be measurable with $m(E)<\infty$. Suppose $(f_k)$ is a sequence of measurable functions such that

$$
f_k\to f\quad\text{a.e. on }E,
\qquad |f|<\infty\quad\text{a.e. on }E.
$$

For every $\varepsilon>0$, there is a closed set $A_\varepsilon\subseteq E$ such that

$$
m(E\setminus A_\varepsilon)<\varepsilon
$$

and $f_k\to f$ uniformly on $A_\varepsilon$.

**Proof.** Remove a measurable null set $Z$ containing the points where convergence fails or $f$ is infinite, and write $E_0=E\setminus Z$. On $E_0$, convergence holds everywhere and the limit is finite. The function $f$ is measurable by Corollary 2.6.

For integers $n,k\ge1$, define

$$
E_k^{(n)}=
\left\{x\in E_0:|f_j(x)-f(x)|<\frac1n
\text{ for every }j\ge k\right\}.
$$

These sets are measurable: each is a countable intersection of measurable comparison sets. For fixed $n$,

$$
E_k^{(n)}\uparrow E_0\qquad(k\to\infty).
$$

Indeed, pointwise convergence says that every point eventually stays within $1/n$ of its limit. Since $m(E_0)<\infty$, continuity of measure gives

$$
m(E_0\setminus E_k^{(n)})\longrightarrow0.
$$

Choose $k_n$ so that

$$
m(E_0\setminus E_{k_n}^{(n)})<\frac{\varepsilon}{2^{n+1}},
$$

and set

$$
S=\bigcap_{n=1}^{\infty}E_{k_n}^{(n)}.
$$

By subadditivity,

$$
m(E\setminus S)=m(E_0\setminus S)
\le\sum_{n=1}^{\infty}m(E_0\setminus E_{k_n}^{(n)})
<\frac{\varepsilon}{2}.
$$

Convergence is uniform on $S$. Given $\eta>0$, choose $n$ with $1/n<\eta$. Then for all $j\ge k_n$ and all $x\in S$,

$$
|f_j(x)-f(x)|<\frac1n<\eta.
$$

Finally, approximate the measurable set $S$ from inside by a closed set $A_\varepsilon\subseteq S$ with

$$
m(S\setminus A_\varepsilon)<\frac{\varepsilon}{2}.
$$

Uniform convergence persists on this smaller set, and

$$
m(E\setminus A_\varepsilon)
\le m(E\setminus S)+m(S\setminus A_\varepsilon)
<\varepsilon.
$$

**Proof insight.** For any choice of the times $k_n$, convergence is uniform on $\bigcap_nE_{k_n}^{(n)}$. The difficult part is choosing those times so that this intersection retains almost all of $E$. Pointwise convergence supplies the increasing sets, finite measure makes the excluded parts tend to zero, and the summable bounds $\varepsilon 2^{-n-1}$ control the total loss.

One can view $1/n$ as an accuracy checkpoint: wait until all but a small set of points stay within that tolerance for every later index, then discard the exceptions. Repeating this with smaller tolerances yields uniform convergence while keeping the total discarded measure below $\varepsilon$.


### 4.4 Lusin's theorem

Egorov turns pointwise convergence into uniform convergence on most of the domain. Combined with simple approximation, it also lets us recover continuity on most of the domain.

**Theorem 4.3 (Lusin).** Let $E\subseteq\mathbb{R}^n$ be measurable with $m(E)<\infty$, and let $f:E\to\mathbb{R}$ be measurable and finite-valued. For every $\varepsilon>0$, there is a closed set $F\subseteq E$ such that

$$
m(E\setminus F)<\varepsilon,
\qquad f|_F\text{ is continuous}.
$$

**Meaning of the conclusion.** Continuity of $f|_F$ uses the relative topology on $F$: if $x_j\in F$ and $x_j\to x\in F$, then $f(x_j)\to f(x)$. It does not assert that the original function $f:E\to\mathbb{R}$ is continuous at every point of $F$ when approached through all of $E$.

**Proof.** First suppose $f$ is a measurable simple function, with canonical form

$$
f=\sum_{j=1}^N a_j\chi_{E_j}.
$$

Choose closed sets $F_j\subseteq E_j$ with

$$
m(E_j\setminus F_j)<\frac{\varepsilon}{N},
$$

and set $F=\bigcup_{j=1}^N F_j$. This finite union is closed. The $F_j$ are pairwise disjoint, and each is both closed and open relative to $F$, since its complement in $F$ is a finite union of closed sets. The function $f$ is constant on each $F_j$, so $f|_F$ is continuous. Moreover,

$$
m(E\setminus F)
\le\sum_{j=1}^N m(E_j\setminus F_j)<\varepsilon.
$$

Now let $f$ be an arbitrary finite-valued measurable function. By Theorem 3.2, choose measurable simple functions $s_k\to f$ pointwise on $E$. Apply the simple-function case to each $s_k$: there is a closed set $A_k\subseteq E$ such that $s_k|_{A_k}$ is continuous and

$$
m(E\setminus A_k)<\frac{\varepsilon}{2^{k+1}}.
$$

By Egorov's theorem, there is also a closed set $A_0\subseteq E$ such that

$$
m(E\setminus A_0)<\frac{\varepsilon}{2}
$$

and $s_k\to f$ uniformly on $A_0$. Define

$$
F=A_0\cap\bigcap_{k=1}^{\infty}A_k.
$$

The set $F$ is closed. Each $s_k|_F$ is continuous, and the convergence to $f|_F$ is uniform. Hence $f|_F$ is continuous. Finally,

$$
m(E\setminus F)
\le m(E\setminus A_0)+\sum_{k=1}^{\infty}m(E\setminus A_k)
<\frac{\varepsilon}{2}+\frac{\varepsilon}{2}
=\varepsilon.
$$

**Proof insight.** Simple functions become continuous after trimming each of their finitely many level sets to a closed subset. For a general measurable function, make all simple approximations continuous on one common large closed set, then use Egorov to make their convergence uniform there. The uniform limit theorem supplies continuity of the limit.

**Example (Returning to the Dirichlet function).** On $[0,1]$, the function $D=\chi_{\mathbb{Q}}$ is discontinuous everywhere. Nevertheless, for every $\varepsilon>0$, closed approximation gives a closed set $F\subseteq[0,1]\setminus\mathbb{Q}$ with $m([0,1]\setminus F)<\varepsilon$. On $F$, the restriction $D|_F$ is identically zero and therefore continuous. This illustrates exactly the relative continuity asserted by Lusin's theorem.

**Remark (Stronger versions).** The finite-measure assumption can be removed, and the closed-set approximation property can also be used to characterize measurability. The finite-measure version above is the one proved here.
