---
title: Preliminaries
order: 1
---
# Preliminaries

## 1. Limitations of Riemann Integration

This course centers on the integration theory developed by H. Lebesgue in the early twentieth century. Before Lebesgue, definite integration largely followed Riemann's approach.

For a bounded function $f$ on $[a,b]$, choose a partition

$$
P=\{a=x_0<x_1<\cdots<x_n=b\}
$$

and a sample point $t_i\in I_i=[x_{i-1},x_i]$ in each subinterval. The **Riemann sum** is

$$
S_{P,t}=\sum_{i=1}^n f(t_i)\Delta x_i,
\qquad \Delta x_i=x_i-x_{i-1}. \tag{1}
$$

If $S_{P,t}\to A\in\mathbb{R}$ as the mesh $\|P\|:=\max_i\Delta x_i\to0$, independently of the sample points, then $f$ is **Riemann integrable**, and

$$
\int_a^b f(x)\,dx=A.
$$

Darboux gave an equivalent criterion using **upper and lower sums**:

$$
U(f;P)=\sum_{i=1}^n\left(\sup_{x\in I_i}f(x)\right)\Delta x_i,
\qquad
L(f;P)=\sum_{i=1}^n\left(\inf_{x\in I_i}f(x)\right)\Delta x_i. \tag{2}
$$

Clearly $U(f;P)\ge L(f;P)$. Riemann integrability is equivalent to

$$
\inf_P U(f;P)=\sup_P L(f;P), \tag{3}
$$

or, equivalently,

$$
\inf_P\bigl[U(f;P)-L(f;P)\bigr]=0. \tag{4}
$$

Some familiar results are:

**a. Sufficient condition.** Every continuous function on $[a,b]$ is Riemann integrable.

**b. Fundamental Theorem of Calculus I.** If $f$ is continuous on $[a,b]$, then

$$
\frac{d}{dx}\int_a^x f(t)\,dt=f(x). \tag{5}
$$

**c. Fundamental Theorem of Calculus II.** If $f$ is differentiable and $f'$ is continuous on $[a,b]$, then

$$
\int_a^b f'(x)\,dx=f(b)-f(a). \tag{6}
$$

**d. Interchanging limits and integrals.** If continuous functions $f_k$ on $[a,b]$ converge uniformly to $f$, then

$$
\int_a^b f(x)\,dx
=\lim_{k\to\infty}\int_a^b f_k(x)\,dx. \tag{7}
$$

*Homework 1:* The same conclusion holds if each $f_k$ is merely Riemann integrable.

**e. Multiple and iterated integrals.** If $f$ is continuous on $D=[a,b]\times[c,d]$, then

$$
\iint_D f(x,y)\,dx\,dy
=\int_c^d\left(\int_a^b f(x,y)\,dx\right)dy
=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx. \tag{8}
$$

Each result raises further questions.

**Regarding a: How many discontinuities are allowed?** A bounded function with finitely many discontinuities is still Riemann integrable. With infinitely many, the situation is subtler. The **Dirichlet function**

$$
D(x)=
\begin{cases}
1,&x\in\mathbb{Q},\\
0,&x\notin\mathbb{Q}
\end{cases}
$$

is discontinuous everywhere on $[0,1]$ and is not Riemann integrable. In contrast, the **Riemann function**

$$
R(x)=
\begin{cases}
1,&x=0,\\
1/q,&x=p/q\in\mathbb{Q}\cap(0,1],\quad p/q\text{ in lowest terms},\\
0,&x\in[0,1]\setminus\mathbb{Q}
\end{cases}
$$

is discontinuous at every rational point yet is Riemann integrable on $[0,1]$. Intuitively, an integrable function cannot have "too many" discontinuities, but elementary calculus does not make this precise.[^1]

**Regarding c: Can continuity of $f'$ be replaced by integrability?** This is a more natural hypothesis, but the derivative of $f(x)=\sqrt{x}$ is unbounded near $0$ and is not properly Riemann integrable on $[0,1]$. Improper integration handles this through a limit, but leaves the framework incomplete.

Combining b and c also suggests a question: which continuous functions admit a representation

$$
f(x)=f(a)+\int_a^x g(t)\,dt?
$$

In the 1880s, A. Harnack proposed absolute continuity as the answer, but the Riemann framework could not establish this characterization.

**Regarding d: Can the convergence hypotheses be weakened?** Continuity and uniform convergence are restrictive, but simply dropping them fails. Enumerate $\mathbb{Q}\cap[0,1]=\{r_k\}_{k=1}^{\infty}$ and set

$$
f_k(x)=
\begin{cases}
1,&x\in\{r_1,\ldots,r_k\},\\
0,&\text{otherwise}.
\end{cases}
$$

Every $f_k$ has integral zero, yet $f_k\to D$ pointwise, and $D$ is not Riemann integrable.

**Regarding e: Is integrability alone enough?** Can multiple and iterated integrals still be identified when $f(x,y)$ is integrable but not necessarily continuous?

**Regarding b: What is the higher-dimensional analogue?** Directly copying the one-dimensional derivative formula would put a vector increment in the denominator. A different formulation is needed.

These questions illustrate the obstacles to developing function theory within Riemann integration.

[^1]: **Lebesgue's criterion:** A bounded function on $[a,b]$ is Riemann integrable if and only if its set of discontinuities has measure zero. 

## 2. Lebesgue's Idea

Lebesgue's theory addresses these limitations by building integration on **measure**.

For $f\ge0$, the integral $\int_a^b f(x)\,dx$ represents the area under its graph. Riemann partitions the domain and approximates this area by narrow rectangles. The Dirichlet function exposes the difficulty: no matter how fine the partition, its oscillation on each subinterval remains uncontrolled.

Lebesgue instead partitions the **range**. Suppose $|f(x)|<M$, and choose

$$
P=\{-M=y_0<y_1<\cdots<y_n=M\}.
$$

Define

$$
E_i=\{x\in[a,b]:y_{i-1}\le f(x)<y_i\}.
$$

The sets $E_i$ partition $[a,b]$, and the oscillation of $f$ on each $E_i$ is at most $\|P\|=\max_i\Delta y_i$. Approximating $f$ by $y_{i-1}$ on $E_i$ suggests

$$
\sum_{i=1}^n y_{i-1}\,\operatorname{Length}(E_i) \tag{9}
$$

as an approximation to $\int_a^b f(x)\,dx$.

The new difficulty is defining the "length" of potentially complicated sets $E_i$. For the Dirichlet function, the region under the graph is a generalized rectangle with base $\mathbb{Q}\cap[a,b]$ and height $1$, suggesting

$$
\int_a^b D(x)\,dx
=\operatorname{Length}(\mathbb{Q}\cap[a,b])\cdot1.
$$

But what is the length of $\mathbb{Q}\cap[a,b]$?

We must determine which subsets of $\mathbb{R}$ have a well-defined length (**measurable sets**) and which functions have measurable sets of the form $\{x:a\le f(x)<b\}$. Thus measure theory must precede this theory of integration.

## 3. Topology of $\mathbb{R}^n$

Lebesgue measure concerns subsets of $\mathbb{R}^n$. We recall the relevant concepts and results.

1. **Point:** $x=(x_1,x_2,\ldots,x_n)\in\mathbb{R}^n$.

2. **Norm:** $|x|=\left(\sum_{i=1}^n x_i^2\right)^{1/2}$.

3. **Distance:** $d(x,y)=|x-y|$.

4. **Open ball:** $B_r(x)=\{y\in\mathbb{R}^n:|x-y|<r\}$, where $r>0$.

5. **Open set:** $G\subseteq\mathbb{R}^n$ is open if every $x\in G$ has a ball $B_r(x)\subseteq G$. The empty set is open.

6. **Closed set:** A set whose complement is open.

7. **Bounded set:** $A\subseteq\mathbb{R}^n$ is bounded if $A\subseteq B_r(0)$ for some $r>0$.

8. **Open cover:** A family of open sets $\{G_\alpha\}$ such that $A\subseteq\bigcup_\alpha G_\alpha$.

9. **Compact set:** A set for which every open cover has a finite subcover.

10. **Accumulation point (limit point):** $x\in\mathbb{R}^n$ is an accumulation point of $A$ if $B_r(x)\cap A$ is infinite for every $r>0$. Such a point need not belong to $A$.

11. **Isolated point:** A point of $A$ that is not an accumulation point of $A$.

12. **Closure:** $\overline{A}$ is the union of $A$ and all its accumulation points; it is the smallest closed set containing $A$.

13. **Perfect set:** A closed set $A$ for which every point of $A$ is an accumulation point of $A$.

14. **Interior point and interior:** A point $x\in A$ is interior if $B_r(x)\subseteq A$ for some $r>0$. All such points form the interior $A^\circ$. An open set equals its interior.

15. **Boundary:** $\partial A=\overline{A}\setminus A^\circ$.

16. **Distance between sets:** $d(A,B)=\inf\{|x-y|:x\in A,\ y\in B\}$.

**Theorem 1.** Arbitrary unions and finite intersections of open sets are open. Arbitrary intersections and finite unions of closed sets are closed.

*Proof omitted.*

**Theorem 2.** A set $A$ is closed if and only if it contains all its accumulation points.

**Proof.** If $A$ is closed and $x\notin A$, some ball about $x$ lies in $A^c$, so $x$ is not an accumulation point.

Conversely, suppose $A$ contains all its accumulation points. For $x\in A^c$, some ball $B_r(x)$ meets $A$ in only finitely many points. Shrinking $r$ excludes those points, so $B_r(x)\subseteq A^c$. Thus $A^c$ is open. $\square$

**Theorem 3 (Heine-Borel).** A set $A\subseteq\mathbb{R}^n$ is compact if and only if it is closed and bounded.

**Proof.** Suppose $A$ is compact. The cover $\{B_k(0)\}_{k=1}^{\infty}$ has a finite subcover, so $A$ is bounded. For $x\in A^c$, the open sets

$$
G_k=\{y\in\mathbb{R}^n:|y-x|>1/k\}
$$

cover $A$. A finite subcover, with largest index $K$, gives $B_{1/K}(x)\subseteq A^c$. Hence $A$ is closed.

Conversely, let $A$ be closed and bounded, and suppose an open cover $\mathcal{G}=\{G_\alpha\}_{\alpha\in\Lambda}$ has no finite subcover. Enclose $A$ in a closed cube $Q_0$ of side length $M$. Bisect each side, producing $2^n$ subcubes. At least one, $Q_1$, has $Q_1\cap A\ne\varnothing$ and cannot have its intersection with $A$ covered by finitely many members of $\mathcal{G}$. Repeating gives

$$
Q_0\supseteq Q_1\supseteq Q_2\supseteq\cdots,
\qquad \operatorname{side}(Q_k)=M/2^k,
$$

with the same property for every $Q_k$. The nested-cube theorem gives a point $x\in\bigcap_k Q_k$. Since each cube meets $A$ and their diameters tend to zero, $x\in\overline{A}=A$. Some $G_\alpha$ contains $x$; openness then implies $Q_k\subseteq G_\alpha$ for large $k$, a contradiction. $\square$

**Theorem 4.** A set $A\subseteq\mathbb{R}^n$ is compact if and only if every sequence in $A$ has a convergent subsequence whose limit belongs to $A$.

**Proof idea.** If $A$ is compact, it is bounded. Repeated bisection and the nested-cube theorem yield a convergent subsequence; closedness puts its limit in $A$.

Conversely, an unbounded set admits a sequence whose norms tend to infinity, hence no convergent subsequence. If $A$ were not closed, a sequence in $A$ could converge to an accumulation point outside $A$, contradicting the hypothesis. Thus $A$ is closed and bounded, hence compact. $\square$

**Theorem 5.** If $A,B\subseteq\mathbb{R}^n$, $A$ is compact, $B$ is closed, and $A\cap B=\varnothing$, then

$$
d(A,B)>0.
$$

*Proof omitted.*

**Theorem 6.** Every nonempty perfect subset of $\mathbb{R}$ is uncountable.

**Proof.** Suppose a nonempty perfect set is countable, and enumerate its distinct points as $A=\{a_k\}_{k=1}^{\infty}$. Set $k_1=1$ and choose a nondegenerate closed interval $I_1$ centered at $a_{k_1}$.

Let $a_{k_2}$ be the first point after $a_{k_1}$ in the enumeration that lies in $I_1^\circ$. It exists because $a_{k_1}$ is an accumulation point. Choose a closed interval $I_2\subset I_1^\circ$, centered at $a_{k_2}$, that excludes $a_{k_1}$. Then

$$
a_1,\ldots,a_{k_2-1}\notin I_2.
$$

Continue: choose the first later point $a_{k_{m+1}}\in I_m^\circ$ and a closed interval $I_{m+1}\subset I_m^\circ$, centered there, that excludes $a_{k_m}$. Thus

$$
a_1,\ldots,a_{k_m-1}\notin I_m\qquad(m\ge2).
$$

Let $G=\bigcap_{m=1}^{\infty}I_m$. Since $k_m\to\infty$, every point of $A$ is eventually excluded, so $G\cap A=\varnothing$.

However, the distinct centers $a_{k_m}$ lie in the bounded interval $I_1$ and have a convergent subsequence. Its limit lies in every closed interval $I_m$, hence in $G$; since $A$ is closed, it also lies in $A$. This contradiction proves the theorem. $\square$
