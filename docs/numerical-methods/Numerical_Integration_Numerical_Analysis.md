---
title: Numerical Integration
order: 3
---

# Numerical Integration

## 1. The Numerical Integration Problem

### 1.1 Why numerical integration is necessary

For a continuous function $f$ on $[a,b]$, the Newton--Leibniz formula gives

$$
\int_a^b f(x)\,dx=F(b)-F(a),\qquad F'(x)=f(x).
$$

In practice, exact integration may be difficult or impossible to carry out directly:

- An elementary antiderivative may not exist. Examples include $e^{-x^2}$ and $\sin x/x$.
- The integrand may be available only through observations or a numerical procedure rather than an explicit formula.
- Even when an antiderivative can be expressed analytically, its evaluation may be too complicated for an efficient numerical computation.

The **numerical integration problem** is to approximate the definite integral from a finite number of values of the integrand. The goal is not simply to obtain a plausible area, but to construct a rule whose accuracy and error can be analyzed.

### 1.2 The integral mean-value theorem

**Theorem 1.1 (Integral mean-value theorem).** If $f\in C[a,b]$, then there exists $\xi\in[a,b]$ such that

$$
\boxed{\displaystyle \int_a^b f(x)\,dx=(b-a)f(\xi).}
$$

The difficulty is that $\xi$ is generally unknown. Replacing it by a prescribed point produces a practical approximation.

The elementary one-panel rules are:

**Left rectangle rule**

$$
\boxed{\displaystyle I\approx L=(b-a)f(a).}
$$

**Right rectangle rule**

$$
\boxed{\displaystyle I\approx R=(b-a)f(b).}
$$

**Midpoint rule**

$$
\boxed{\displaystyle I\approx M=(b-a)f\!\left(\frac{a+b}{2}\right).}
$$

**Trapezoidal rule**

$$
\boxed{\displaystyle I\approx T=\frac{b-a}{2}\,[f(a)+f(b)].}
$$

The rectangle rules replace the area by a rectangle. The trapezoidal rule replaces the graph between $a$ and $b$ by the straight line through $(a,f(a))$ and $(b,f(b))$.

### 1.3 Mechanical quadrature formulas

**Definition (Quadrature formula).** A numerical integration rule of the form

$$
\boxed{\displaystyle Q_n[f]=\sum_{k=0}^{n}A_k f(x_k)\approx\int_a^b f(x)\,dx}
$$

is a **mechanical quadrature formula**. Here $x_k$ are the **quadrature nodes** and $A_k$ are the **quadrature weights**. The formula depends on $n+1$ evaluations of $f$.

A good rule should approximate the integral accurately and integrate as large a class of functions exactly as possible.

**Definition (Degree of algebraic precision).** A quadrature formula has **degree of algebraic precision $m$** if

$$
Q_n[p]=\int_a^b p(x)\,dx\quad\text{for every }p\in\mathcal P_m,
$$

but the equality fails for at least one polynomial of degree $m+1$. Equivalently, it is exact on $1,x,\ldots,x^m$ but not on $x^{m+1}$.

**Example 1.1 (Constructing a three-node quadrature rule).** Determine $A_0,A_1,A_2$ in

$$
\int_{-1}^{1}f(x)\,dx\approx A_0f(-1)+A_1f(0)+A_2f(1)
$$

so that the degree of precision is as high as possible.

Exactness on $1,x,x^2$ requires

$$
\begin{aligned}
A_0+A_1+A_2&=2,\\
-A_0+A_2&=0,\\
A_0+A_2&=\frac23.
\end{aligned}
$$

Thus

$$
\boxed{\displaystyle A_0=A_2=\frac13,\qquad A_1=\frac43.}
$$

Because both the integral and the quadrature sum vanish for $x^3$ by symmetry, the rule is also exact on cubic polynomials. For $x^4$,

$$
\int_{-1}^{1}x^4\,dx=\frac25\ne\frac23=Q_2[x^4].
$$

Consequently its algebraic precision is **three**, one degree higher than the number of interpolation conditions alone would guarantee.

---

## 2. Interpolatory Quadrature

### 2.1 Integrating the Lagrange interpolant

Choose distinct nodes

$$
a\le x_0<x_1<\cdots<x_n\le b.
$$

Let $L_n$ be the Lagrange interpolating polynomial of $f$ at these nodes:

$$
L_n(x)=\sum_{k=0}^{n}f(x_k)\ell_k(x),\qquad
\ell_k(x)=\prod_{\substack{0\le j\le n\\j\ne k}}\frac{x-x_j}{x_k-x_j}.
$$

Approximating $f$ by $L_n$ and integrating gives

$$
\begin{aligned}
\int_a^b f(x)\,dx
&\approx\int_a^b L_n(x)\,dx\\
&=\sum_{k=0}^{n}f(x_k)\int_a^b\ell_k(x)\,dx.
\end{aligned}
$$

**Definition (Interpolatory quadrature).** The quadrature rule whose weights are

$$
\boxed{\displaystyle A_k=\int_a^b\ell_k(x)\,dx,\qquad k=0,1,\ldots,n,}
$$

is an **interpolatory quadrature formula**:

$$
\boxed{\displaystyle I_n[f]=\sum_{k=0}^{n}A_k f(x_k).}
$$

The weights depend only on the nodes and the integration interval, not on $f$.

### 2.2 Interpolation and algebraic precision

**Theorem 2.1 (Characterization of interpolatory quadrature).** A quadrature rule at $n+1$ distinct fixed nodes has algebraic precision at least $n$ if and only if its weights satisfy

$$
A_k=\int_a^b\ell_k(x)\,dx.
$$

Proof. Suppose the rule is exact for all polynomials of degree at most $n$. Apply it to $\ell_j$, which is itself a polynomial of degree $n$. Since $\ell_j(x_k)=\delta_{jk}$,

$$
\int_a^b\ell_j(x)\,dx
=\sum_{k=0}^{n}A_k\ell_j(x_k)=A_j.
$$

Conversely, if the weights are integrals of the Lagrange basis, any $p\in\mathcal P_n$ equals its own interpolant:

$$
p(x)=\sum_{k=0}^{n}p(x_k)\ell_k(x).
$$

Integrating both sides gives exactness of the rule on $\mathcal P_n$.

### 2.3 Quadrature remainder

Write

$$
\omega_{n+1}(x)=\prod_{k=0}^{n}(x-x_k),\qquad
r_n(x)=f(x)-L_n(x).
$$

The quadrature error, or **remainder**, is

$$
\boxed{\displaystyle E_n[f]=I-I_n[f]
=\int_a^b[f(x)-L_n(x)]\,dx
=\int_a^b r_n(x)\,dx.}
$$

For sufficiently smooth $f$, the interpolation remainder gives, pointwise,

$$
r_n(x)=\frac{f^{(n+1)}(\xi_x)}{(n+1)!}\omega_{n+1}(x),
$$

where $\xi_x$ depends on $x$. Hence

$$
E_n[f]=\int_a^b\frac{f^{(n+1)}(\xi_x)}{(n+1)!}\omega_{n+1}(x)\,dx.
$$

In particular, with $M_{n+1}=\max_{[a,b]}|f^{(n+1)}|$,

$$
\boxed{\displaystyle |E_n[f]|\le
\frac{M_{n+1}}{(n+1)!}\int_a^b|\omega_{n+1}(x)|\,dx.}
$$

A sharper formula may be available when the relevant remainder kernel does not change sign.

---

## 3. Newton--Cotes Quadrature

### 3.1 Equally spaced quadrature nodes

Newton--Cotes formulas are interpolatory quadrature rules based on equally spaced nodes. Divide $[a,b]$ into $n$ subintervals:

$$
\boxed{\displaystyle h=\frac{b-a}{n},\qquad x_k=a+kh,\quad k=0,\ldots,n.}
$$

Set $x=a+th$ with $0\le t\le n$. The Lagrange basis becomes

$$
\ell_k(a+th)=\prod_{\substack{0\le j\le n\\j\ne k}}
\frac{t-j}{k-j}.
$$

Thus the weights satisfy

$$
\begin{aligned}
A_k
&=h\int_0^n\prod_{\substack{0\le j\le n\\j\ne k}}\frac{t-j}{k-j}\,dt\\
&=h\frac{(-1)^{n-k}}{k!(n-k)!}
\int_0^n\prod_{\substack{0\le j\le n\\j\ne k}}(t-j)\,dt.
\end{aligned}
$$

Define the normalized **Cotes coefficients** by $C_k^{(n)}=A_k/(b-a)$. Since $h=(b-a)/n$,

$$
\boxed{\displaystyle C_k^{(n)}=\frac{(-1)^{n-k}}{n\,k!(n-k)!}
\int_0^n\prod_{\substack{0\le j\le n\\j\ne k}}(t-j)\,dt.}
$$

The Newton--Cotes formula is therefore

$$
\boxed{\displaystyle I_n[f]=(b-a)\sum_{k=0}^{n}C_k^{(n)}f(x_k).}
$$

### 3.2 The trapezoidal rule ($n=1$)

With the two endpoints as nodes,

$$
C_0^{(1)}=C_1^{(1)}=\frac12.
$$

Consequently,

$$
\boxed{\displaystyle T[f]=\frac{b-a}{2}[f(a)+f(b)].}
$$

The trapezoidal rule is exact for constants and linear functions. Its degree of precision is one.

### 3.3 Simpson's rule ($n=2$)

With nodes $a,(a+b)/2,b$,

$$
C_0^{(2)}=C_2^{(2)}=\frac16,
\qquad C_1^{(2)}=\frac46.
$$

This gives **Simpson's rule**:

$$
\boxed{\displaystyle S[f]=\frac{b-a}{6}
\left[f(a)+4f\!\left(\frac{a+b}{2}\right)+f(b)\right].}
$$

It integrates every cubic polynomial exactly, even though it is constructed by integrating a quadratic interpolant. Its algebraic precision is three.

### 3.4 A five-node Cotes rule ($n=4$)

For $n=4$ the coefficients are

$$
\left(C_0^{(4)},C_1^{(4)},C_2^{(4)},C_3^{(4)},C_4^{(4)}\right)
=\frac1{90}(7,32,12,32,7).
$$

Therefore

$$
\boxed{\displaystyle I_4[f]=\frac{b-a}{90}
\bigl[7f(x_0)+32f(x_1)+12f(x_2)+32f(x_3)+7f(x_4)\bigr].}
$$

This is the five-point closed Newton--Cotes (Boole/Cotes) formula. Its degree of precision is five.

### 3.5 Symmetry, exactness, and the even-degree gain

Because the nodes are symmetric about the midpoint,

$$
\boxed{\displaystyle C_k^{(n)}=C_{n-k}^{(n)}.}
$$

The rule integrates constants exactly, so its normalized coefficients also satisfy

$$
\boxed{\displaystyle \sum_{k=0}^{n}C_k^{(n)}=1.}
$$

Every Newton--Cotes rule with $n+1$ nodes is interpolatory and therefore has degree of precision at least $n$.

**Theorem 3.1 (Extra degree for even $n$).** If $n$ is even, the closed Newton--Cotes rule has degree of precision at least $n+1$.

Proof. It is enough to verify exactness for $x^{n+1}$, since all lower-degree polynomials are already integrated exactly. The interpolation remainder for this polynomial is exactly

$$
x^{n+1}-L_n(x)=\omega_{n+1}(x).
$$

Let $m=(a+b)/2$. When $n$ is even, the equally spaced node set contains $m$, and the remaining nodes occur in symmetric pairs. Therefore

$$
\omega_{n+1}(m+u)=-\omega_{n+1}(m-u),
$$

so $\omega_{n+1}$ is odd about $m$. It follows that

$$
\int_a^b\omega_{n+1}(x)\,dx=0.
$$

Hence the rule is exact for $x^{n+1}$ as well.

### 3.6 Error of the trapezoidal rule

Let $f\in C^2[a,b]$. The interpolation remainder at the endpoints is

$$
f(x)-L_1(x)=\frac{f''(\xi_x)}{2}(x-a)(x-b).
$$

Because $(x-a)(x-b)\le0$ throughout $[a,b]$, the integral mean-value theorem yields some $\eta\in(a,b)$ such that

$$
\begin{aligned}
E_T[f]
&=\frac{f''(\eta)}2\int_a^b(x-a)(x-b)\,dx\\
&=-\frac{(b-a)^3}{12}f''(\eta).
\end{aligned}
$$

Thus

$$
\boxed{\displaystyle I-T[f]=-
\frac{(b-a)^3}{12}f''(\eta),\qquad\eta\in(a,b).}
$$

For a convex function ($f''\ge0$), the trapezoidal rule overestimates the integral.

### 3.7 Error of Simpson's rule

The ordinary quadratic interpolation remainder is not sufficiently structured to reveal the fourth-derivative error. Instead, introduce the cubic Hermite interpolant $H_3$ satisfying

$$
H_3(a)=f(a),\quad H_3(m)=f(m),\quad H_3(b)=f(b),
\quad H_3'(m)=f'(m),\qquad m=\frac{a+b}{2}.
$$

Simpson's rule integrates $H_3$ exactly because it is exact on cubic polynomials. The Hermite remainder is

$$
f(x)-H_3(x)=\frac{f^{(4)}(\xi_x)}{4!}
(x-a)(x-m)^2(x-b).
$$

The product has a constant nonpositive sign on $[a,b]$. For $f\in C^4[a,b]$, integration and the weighted mean-value theorem yield

$$
\begin{aligned}
E_S[f]
&=\frac{f^{(4)}(\eta)}{24}
\int_a^b(x-a)(x-m)^2(x-b)\,dx\\
&=-\frac{(b-a)^5}{2880}f^{(4)}(\eta).
\end{aligned}
$$

Equivalently,

$$
\boxed{\displaystyle I-S[f]=-
\frac{b-a}{180}\left(\frac{b-a}{2}\right)^4f^{(4)}(\eta),
\qquad\eta\in(a,b).}
$$

In particular, Simpson's rule is exact for all cubic polynomials because their fourth derivative vanishes.

### 3.8 Stability and the limits of high-order Newton--Cotes rules

Suppose the computed function values are perturbed to $\widetilde f_k=f(x_k)+\delta_k$. Then

$$
\bigl|Q_n[f]-Q_n[\widetilde f]\bigr|
\le\left(\sum_{k=0}^n|A_k|\right)\max_k|\delta_k|.
$$

**Definition (Stability with respect to data perturbations).** A quadrature formula is stable if sufficiently small perturbations of its input values produce correspondingly small perturbations of its output.

**Proposition 3.2 (Positive weights).** If all $A_k>0$, then

$$
\sum_{k=0}^n|A_k|=\sum_{k=0}^nA_k=b-a,
$$

and hence

$$
\boxed{\displaystyle \bigl|Q_n[f]-Q_n[\widetilde f]\bigr|
\le(b-a)\max_k|\delta_k|.}
$$

Proof. The equality $\sum A_k=b-a$ follows by applying the quadrature rule to the constant function $1$.

For high-degree Newton--Cotes rules, some coefficients become negative and their absolute values may become large. Cancellation can magnify errors in the function values. Consequently, simply increasing the degree of an equally spaced global interpolation rule is not a reliable route to greater accuracy. A better approach is often to apply low-degree quadrature on many short subintervals.

---

## 4. Composite Quadrature Rules

### 4.1 Composite trapezoidal rule

Partition $[a,b]$ into $n$ equally spaced subintervals:

$$
x_k=a+kh,\qquad h=\frac{b-a}{n}.
$$

Apply the trapezoidal rule separately on every $[x_k,x_{k+1}]$ and add the results:

$$
\begin{aligned}
T_n[f]
&=\frac h2\sum_{k=0}^{n-1}\bigl[f(x_k)+f(x_{k+1})\bigr]\\
&=\frac h2\left[f(a)+2\sum_{k=1}^{n-1}f(x_k)+f(b)\right].
\end{aligned}
$$

Therefore

$$
\boxed{\displaystyle T_n[f]=h\left[
\frac{f(a)+f(b)}2+\sum_{k=1}^{n-1}f(x_k)\right].}
$$

**Theorem 4.1 (Composite trapezoidal remainder).** If $f\in C^2[a,b]$, there exists $\eta\in(a,b)$ such that

$$
\boxed{\displaystyle I-T_n[f]=-
\frac{b-a}{12}h^2f''(\eta).}
$$

Proof. The error on the $k$th subinterval is

$$
E_k=-\frac{h^3}{12}f''(\eta_k),\qquad \eta_k\in(x_k,x_{k+1}).
$$

Adding the errors gives

$$
I-T_n[f]=-\frac{h^3}{12}\sum_{k=0}^{n-1}f''(\eta_k).
$$

Continuity of $f''$ ensures that its average at these points equals $f''(\eta)$ for some $\eta\in(a,b)$. Using $nh=b-a$ proves the formula.

As $h\to0$, the error is $O(h^2)$. For every continuous $f$, $T_n[f]$ converges to the Riemann integral as the partition is refined; twice differentiability is needed for the displayed error formula, not for convergence itself.

### 4.2 Composite Simpson's rule

Let

$$
m_k=x_{k+\frac12}=\frac{x_k+x_{k+1}}2.
$$

Apply Simpson's rule on each $[x_k,x_{k+1}]$:

$$
\int_{x_k}^{x_{k+1}}f(x)\,dx
\approx\frac h6[f(x_k)+4f(m_k)+f(x_{k+1})].
$$

Summing gives

$$
\boxed{\displaystyle S_n[f]=\frac h6\left[
f(a)+4\sum_{k=0}^{n-1}f(m_k)
+2\sum_{k=1}^{n-1}f(x_k)+f(b)\right].}
$$

**Theorem 4.2 (Composite Simpson remainder).** If $f\in C^4[a,b]$, then for some $\eta\in(a,b)$,

$$
\boxed{\displaystyle I-S_n[f]=-
\frac{b-a}{180}\left(\frac h2\right)^4f^{(4)}(\eta)
=-\frac{b-a}{2880}h^4f^{(4)}(\eta).}
$$

Thus composite Simpson quadrature has error $O(h^4)$ and is convergent and stable.

**Remark (Counting subintervals).** Here $n$ counts the Simpson panels $[x_k,x_{k+1}]$, each of which has a midpoint. If the full interval is instead divided into $N=2n$ equal *half-panels* of width $\Delta x=h/2$, the error is written

$$
I-S_n[f]= -\frac{b-a}{180}(\Delta x)^4 f^{(4)}(\eta).
$$

The two formulas are identical; the step-size convention is different.

### 4.3 Example: integrating $\sin x/x$

**Example 4.1.** Approximate

$$
I=\int_0^1\frac{\sin x}{x}\,dx
$$

by composite trapezoidal and composite Simpson quadrature with $h=1/8$.

At $x=0$, define $f(0)=\lim_{x\to0}\sin x/x=1$. The remaining values are

| $x_k$ | $f(x_k)$ |
| --- | ---: |
| $0$ | $1.00000000$ |
| $0.125$ | $0.99739784$ |
| $0.250$ | $0.98961584$ |
| $0.375$ | $0.97672675$ |
| $0.500$ | $0.95885108$ |
| $0.625$ | $0.93615563$ |
| $0.750$ | $0.90885168$ |
| $0.875$ | $0.87719257$ |
| $1.000$ | $0.84147098$ |

The composite trapezoidal approximation is

$$
\begin{aligned}
T_8
&=\frac18\left[\frac{f(0)+f(1)}2+\sum_{k=1}^7f(k/8)\right]\\
&\approx\boxed{0.945690864}.
\end{aligned}
$$

For composite Simpson's rule, group each pair of consecutive $1/8$ intervals into a panel of width $1/4$. The resulting approximation is

$$
S_4=\frac1{24}\left[f(0)+4f(1/8)+2f(1/4)+\cdots+4f(7/8)+f(1)\right]
\approx\boxed{0.946083311}.
$$

The integral is the sine integral $\operatorname{Si}(1)\approx0.946083070$. In this computation, Simpson quadrature is considerably more accurate with the same sampled data.

### 4.4 Example: choosing the number of panels from error bounds

**Example 4.2.** Determine how many subintervals or panels guarantee

$$
\left|I-Q[f]\right|\le\frac12\times10^{-5}
$$

when computing

$$
I=\int_0^1e^x\,dx.
$$

Because $f''(x)=f^{(4)}(x)=e^x$, both derivatives are bounded in absolute value by $e$ on $[0,1]$.

For composite trapezoidal quadrature with $h=1/n$,

$$
|I-T_n|\le\frac{e}{12n^2}.
$$

Therefore it suffices to require

$$
n\ge\sqrt{\frac{e}{12(0.5\times10^{-5})}}\approx212.85.
$$

The guaranteed choice is **$n=213$ trapezoidal subintervals**.

For composite Simpson quadrature, with $n$ panels of width $h=1/n$,

$$
|I-S_n|\le\frac{e}{2880n^4}.
$$

Hence it suffices to have

$$
n\ge\left(\frac{e}{2880(0.5\times10^{-5})}\right)^{1/4}\approx3.71.
$$

The guaranteed choice is **$n=4$ Simpson panels**, using nine function values including endpoints and midpoints.

These counts come from upper error bounds; fewer panels may already satisfy the desired tolerance for this particular integrand.

---

## 5. Romberg Integration and Richardson Extrapolation

### 5.1 Reusing the composite trapezoidal nodes

A refined trapezoidal grid reuses the old nodes and adds only the old subinterval midpoints. If $h=(b-a)/n$,

$$
\boxed{\displaystyle T_{2n}=\frac12T_n+
\frac h2\sum_{k=0}^{n-1}f\!\left(x_k+\frac h2\right).}
$$

This recurrence avoids recomputing values at nodes that have already been evaluated.

### 5.2 The leading error term

The composite trapezoidal error satisfies

$$
I-T(h)=-\frac{h^2}{12}[f'(b)-f'(a)]+O(h^4)
$$

under sufficient smoothness. More generally, for a smooth integrand there is an even-power error expansion

$$
\boxed{\displaystyle T(h)=I+\alpha_1h^2+\alpha_2h^4+\alpha_3h^6+\cdots.}
$$

The coefficients $\alpha_j$ do not depend on $h$.

After halving the step size,

$$
T(h/2)=I+\frac{\alpha_1h^2}{4}+\frac{\alpha_2h^4}{16}+\cdots.
$$

Multiply this equation by $4$ and subtract $T(h)$. The $h^2$ term disappears:

$$
\boxed{\displaystyle S(h)=\frac{4T(h/2)-T(h)}3=I+O(h^4).}
$$

This is the first Richardson extrapolation. The same combination also reproduces composite Simpson quadrature on the refined grid:

$$
S_n=\frac{4T_{2n}-T_n}{3}.
$$

### 5.3 Eliminating higher-order errors

If

$$
S(h)=I+\beta_1h^4+\beta_2h^6+\cdots,
$$

then

$$
\boxed{\displaystyle C(h)=\frac{16S(h/2)-S(h)}{15}=I+O(h^6).}
$$

A further step gives

$$
\boxed{\displaystyle R(h)=\frac{64C(h/2)-C(h)}{63}=I+O(h^8).}
$$

The sequence removes the leading error term at each level:

$$
T(h):O(h^2),\quad S(h):O(h^4),\quad C(h):O(h^6),\quad R(h):O(h^8).
$$

### 5.4 Romberg's recursive table

Let

$$
R_{j,0}=T_{2^j},\qquad h_j=\frac{b-a}{2^j},\qquad j=0,1,2,\ldots.
$$

Define the Romberg table by

$$
\boxed{\displaystyle R_{j,k}=
\frac{4^kR_{j,k-1}-R_{j-1,k-1}}{4^k-1},
\qquad1\le k\le j.}
$$

The first few rows have the triangular structure

| Refinement level | $O(h^2)$ | $O(h^4)$ | $O(h^6)$ | $O(h^8)$ |
| --- | --- | --- | --- | --- |
| $j=0$ | $R_{0,0}$ | | | |
| $j=1$ | $R_{1,0}$ | $R_{1,1}$ | | |
| $j=2$ | $R_{2,0}$ | $R_{2,1}$ | $R_{2,2}$ | |
| $j=3$ | $R_{3,0}$ | $R_{3,1}$ | $R_{3,2}$ | $R_{3,3}$ |

Here each entry combines two entries from the previous column. The diagonal $R_{j,j}$ gives increasingly high-order approximations when $f$ is sufficiently smooth. Since the first column uses nested trapezoidal grids, Romberg integration gains accuracy while reusing previously calculated function values.

---

## 6. Gaussian Quadrature

### 6.1 Choosing the nodes as well as the weights

In Newton--Cotes quadrature, the nodes are fixed in advance and only the weights are determined. Greater algebraic precision is possible if the nodes themselves are unknowns.

Consider a weighted integral

$$
I_\rho[f]=\int_a^b\rho(x)f(x)\,dx,
\qquad\rho(x)>0\ \text{on the interior of }[a,b],
$$

and an $(n+1)$-node quadrature rule

$$
Q_n[f]=\sum_{k=0}^{n}A_k f(x_k).
$$

There are $2n+2$ unknown node and weight parameters. An appropriately chosen rule can integrate every polynomial through degree $2n+1$ exactly.

**Definition (Gaussian quadrature).** An $(n+1)$-node quadrature rule with algebraic precision $2n+1$ is a **Gaussian quadrature formula**. Its nodes are **Gaussian nodes**.

This degree is maximal: if

$$
\omega_{n+1}(x)=\prod_{k=0}^{n}(x-x_k),
$$

then $\omega_{n+1}^2$ has degree $2n+2$ and

$$
Q_n[\omega_{n+1}^2]=0,
\quad\text{whereas}\quad
\int_a^b\rho(x)\omega_{n+1}(x)^2\,dx>0.
$$

Consequently no quadrature rule with these $n+1$ distinct nodes can have precision $2n+2$.

### 6.2 Orthogonal polynomials characterize Gaussian nodes

Use the weighted inner product

$$
\langle f,g\rangle_\rho=\int_a^b\rho(x)f(x)g(x)\,dx.
$$

**Theorem 6.1 (Gaussian-node characterization).** Let the quadrature weights be the interpolatory weights associated with the nodes $x_0,\ldots,x_n$. The resulting formula has degree of precision $2n+1$ if and only if

$$
\boxed{\displaystyle \int_a^b\rho(x)p(x)\omega_{n+1}(x)\,dx=0
\quad\text{for every }p\in\mathcal P_n.}
$$

Thus $\omega_{n+1}$ must be the monic orthogonal polynomial of degree $n+1$ with respect to $\rho$.

Proof (necessity). Suppose the formula is exact through degree $2n+1$. Since $p\omega_{n+1}\in\mathcal P_{2n+1}$ for $p\in\mathcal P_n$,

$$
\int_a^b\rho(x)p(x)\omega_{n+1}(x)\,dx
=\sum_{k=0}^{n}A_kp(x_k)\omega_{n+1}(x_k)=0.
$$

Proof (sufficiency). Divide an arbitrary polynomial $f\in\mathcal P_{2n+1}$ by $\omega_{n+1}$:

$$
f(x)=p(x)\omega_{n+1}(x)+q(x),
\qquad p,q\in\mathcal P_n.
$$

Orthogonality makes the first term integrate to zero, and the quadrature values of that term vanish at all nodes. The interpolatory rule integrates $q$ exactly. Therefore

$$
\int_a^b\rho(x)f(x)\,dx
=\int_a^b\rho(x)q(x)\,dx
=\sum_{k=0}^{n}A_kq(x_k)
=\sum_{k=0}^{n}A_kf(x_k).
$$

This proves precision $2n+1$.

### 6.3 Constructing the Gaussian formula

The construction has two steps:

1. Construct the degree-$(n+1)$ orthogonal polynomial for the weight $\rho$, then find its $n+1$ zeros in $(a,b)$.
2. Use these zeros as interpolation nodes and compute the weights

   $$
   \boxed{\displaystyle A_k=\int_a^b\rho(x)\ell_k(x)\,dx.}
   $$

All Gaussian nodes are distinct and lie in the interior of the interval for a positive weight function.

**Theorem 6.2 (Positive Gaussian weights).** Every weight $A_j$ in Gaussian quadrature is strictly positive.

Proof. Since $\ell_j^2$ has degree $2n$, Gaussian exactness gives

$$
\int_a^b\rho(x)\ell_j(x)^2\,dx
=\sum_{k=0}^{n}A_k\ell_j(x_k)^2=A_j.
$$

The integral is positive, so $A_j>0$. This also ensures stability with respect to errors in the sampled function values.

### 6.4 Gaussian quadrature remainder

Let $H_{2n+1}$ be the Hermite polynomial matching $f$ and $f'$ at each Gaussian node:

$$
H_{2n+1}(x_i)=f(x_i),\qquad
H_{2n+1}'(x_i)=f'(x_i),\quad i=0,\ldots,n.
$$

Its interpolation remainder is

$$
f(x)-H_{2n+1}(x)=
\frac{f^{(2n+2)}(\xi_x)}{(2n+2)!}\omega_{n+1}(x)^2.
$$

Because Gaussian quadrature is exact for $H_{2n+1}$ and because the squared node polynomial is nonnegative, a weighted mean-value argument gives the error identity

$$
\boxed{\displaystyle E_n[f]=I_\rho[f]-Q_n[f]
=\frac{f^{(2n+2)}(\eta)}{(2n+2)!}
\int_a^b\rho(x)\omega_{n+1}(x)^2\,dx,\quad\eta\in(a,b).}
$$

The first derivative not automatically canceled is of order $2n+2$. This explains why Gaussian quadrature can be extremely accurate for smooth integrands using relatively few nodes.

### 6.5 Example: a two-node weighted Gaussian rule

**Example 6.1.** Construct a two-node Gaussian quadrature formula for

$$
\int_0^1\sqrt{x}\,f(x)\,dx
\approx A_0f(x_0)+A_1f(x_1).
$$

The weight is $\rho(x)=\sqrt{x}$. Its moments are

$$
\mu_j=\int_0^1x^{j+1/2}\,dx=\frac{2}{2j+3}.
$$

Seek the monic quadratic $p_2(x)=x^2+cx+d$ that is orthogonal to $1$ and $x$:

$$
\mu_2+c\mu_1+d\mu_0=0,
\qquad \mu_3+c\mu_2+d\mu_1=0.
$$

Substitution yields

$$
\boxed{\displaystyle p_2(x)=x^2-\frac{10}{9}x+\frac5{21}.}
$$

Its two zeros are the Gaussian nodes:

$$
\boxed{\displaystyle x_0=\frac59-\frac{2\sqrt{70}}{63}\approx0.28994920,\qquad
x_1=\frac59+\frac{2\sqrt{70}}{63}\approx0.82116191.}
$$

Exactness for $1$ and $x$ gives

$$
A_0+A_1=\frac23,\qquad A_0x_0+A_1x_1=\frac25.
$$

Solving,

$$
\boxed{\displaystyle A_0=\frac13-\frac{\sqrt{70}}{150}\approx0.27755600,\qquad
A_1=\frac13+\frac{\sqrt{70}}{150}\approx0.38911067.}
$$

Therefore the quadrature rule is

$$
\boxed{\displaystyle \int_0^1\sqrt{x}\,f(x)\,dx\approx
0.27755600\,f(0.28994920)+0.38911067\,f(0.82116191).}
$$

By construction, it is exact for every polynomial $f$ of degree at most three.

---

## 7. Classical Gaussian Quadrature Formulas

### 7.1 Gauss--Legendre quadrature

On $[-1,1]$ with weight $\rho(x)=1$, the relevant orthogonal polynomials are the **Legendre polynomials**. An $(n+1)$-node Gauss--Legendre formula uses the zeros of $P_{n+1}$:

$$
\boxed{\displaystyle \int_{-1}^1 f(x)\,dx\approx
\sum_{k=0}^{n}A_k f(x_k),\qquad P_{n+1}(x_k)=0.}
$$

Its degree of precision is $2n+1$. A convenient weight formula is

$$
\boxed{\displaystyle A_k=\frac{2}{(1-x_k^2)[P_{n+1}'(x_k)]^2}.}
$$

The first few rules are:

| Number of nodes | Nodes | Corresponding weights | Precision |
| --- | --- | --- | --- |
| $1$ | $0$ | $2$ | $1$ |
| $2$ | $\pm1/\sqrt3$ | $1,1$ | $3$ |
| $3$ | $0,\ \pm\sqrt{3/5}$ | $8/9,\ 5/9,\ 5/9$ | $5$ |

For the monic Legendre polynomial $\widetilde P_{n+1}$, the Gaussian remainder becomes

$$
\boxed{\displaystyle E_n[f]=
\frac{2^{2n+3}[(n+1)!]^4}{(2n+3)[(2n+2)!]^3}
f^{(2n+2)}(\eta),\quad\eta\in(-1,1).}
$$

**Example 7.1 (Two-node Gauss--Legendre versus Simpson).** Both the two-node Gaussian rule and Simpson's rule have degree of precision three on $[-1,1]$. Their nodes and errors are different.

Two-node Gauss--Legendre:

$$
Q_G[f]=f\!\left(-\frac1{\sqrt3}\right)+f\!\left(\frac1{\sqrt3}\right),
\qquad I-Q_G[f]=\frac1{135}f^{(4)}(\eta).
$$

Simpson:

$$
Q_S[f]=\frac13[f(-1)+4f(0)+f(1)],
\qquad I-Q_S[f]=-\frac1{90}f^{(4)}(\zeta).
$$

For comparable bounds on $|f^{(4)}|$, the Gaussian rule has the smaller fourth-derivative error coefficient and uses only two evaluations rather than three.

### 7.2 Gauss--Chebyshev quadrature

On $[-1,1]$ with weight

$$
\rho(x)=\frac1{\sqrt{1-x^2}},
$$

the orthogonal polynomials are the **Chebyshev polynomials of the first kind**,

$$
T_{n+1}(x)=\cos((n+1)\arccos x).
$$

Their zeros are

$$
\boxed{\displaystyle x_k=\cos\left(\frac{(2k+1)\pi}{2n+2}\right),\qquad k=0,\ldots,n.}
$$

The Gaussian weights are all equal:

$$
\boxed{\displaystyle A_k=\frac\pi{n+1}.}
$$

Therefore

$$
\boxed{\displaystyle \int_{-1}^1\frac{f(x)}{\sqrt{1-x^2}}\,dx
\approx\frac\pi{n+1}\sum_{k=0}^{n}
 f\!\left(\cos\frac{(2k+1)\pi}{2n+2}\right).}
$$

**Example 7.2 (Five-node Gauss--Chebyshev rule).** For

$$
I=\int_{-1}^1\frac{e^x}{\sqrt{1-x^2}}\,dx,
$$

five nodes correspond to $n=4$, so

$$
\begin{aligned}
I&\approx\frac\pi5\sum_{k=0}^{4}
\exp\left(\cos\frac{(2k+1)\pi}{10}\right)\\
&\approx\boxed{3.977463259}.
\end{aligned}
$$

### 7.3 Transforming a finite interval to $[-1,1]$

For an integral on $[a,b]$, use

$$
\boxed{\displaystyle x=\frac{b-a}{2}t+\frac{a+b}{2},\qquad -1\le t\le1.}
$$

Then

$$
\int_a^b f(x)\,dx=
\frac{b-a}{2}\int_{-1}^1
f\!\left(\frac{b-a}{2}t+\frac{a+b}{2}\right)dt.
$$

A Gauss--Legendre rule therefore becomes

$$
\boxed{\displaystyle \int_a^b f(x)\,dx\approx
\frac{b-a}{2}\sum_{k=0}^{n}A_k
f\!\left(\frac{b-a}{2}t_k+\frac{a+b}{2}\right),}
$$

where $t_k$ and $A_k$ are the standard nodes and weights on $[-1,1]$.

### 7.4 Gaussian quadrature on infinite intervals

On an infinite interval, the weight function controls the decay of the integrand and determines the appropriate orthogonal polynomial family.

**Gauss--Laguerre quadrature.** For the weight $e^{-x}$ on $[0,\infty)$,

$$
\boxed{\displaystyle \int_0^{\infty}e^{-x}f(x)\,dx
\approx\sum_{k=0}^{n}A_k f(x_k),}
$$

where the $x_k$ are the zeros of the degree-$(n+1)$ Laguerre polynomial. With the standard convention $L_N(0)=1$ and $N=n+1$, the weights may be written

$$
A_k=\frac{x_k}{(N+1)^2[L_{N+1}(x_k)]^2}
=\frac{1}{x_k[L_N'(x_k)]^2}.
$$

**Gauss--Hermite quadrature.** For the weight $e^{-x^2}$ on $(-\infty,\infty)$,

$$
\boxed{\displaystyle \int_{-\infty}^{\infty}e^{-x^2}f(x)\,dx
\approx\sum_{k=0}^{n}A_k f(x_k),}
$$

where $x_k$ are the zeros of the degree-$(n+1)$ Hermite polynomial. For the physicists' convention

$$
H_N(x)=(-1)^Ne^{x^2}\frac{d^N}{dx^N}e^{-x^2},
\qquad N=n+1,
$$

the weights are

$$
\boxed{\displaystyle A_k=\frac{2^{N+1}N!\sqrt\pi}{[H_N'(x_k)]^2}.}
$$

**Remark (Polynomial normalization).** The explicit Laguerre and Hermite weight formulas depend on how the corresponding orthogonal polynomials are normalized. A polynomial that vanishes at a quadrature node cannot itself appear unmodified in the denominator of its weight formula; the derivative or an adjacent-degree polynomial must be used.

---

## 8. Numerical Multiple Integration

### 8.1 Iterated quadrature

For a rectangular integration region, a double integral can be evaluated as successive one-dimensional integrals:

$$
I=\int_a^b\int_c^d f(x,y)\,dy\,dx.
$$

One may first approximate the inner integral for several fixed values of $x$, and then apply another quadrature formula in the $x$ direction. This produces a tensor-product quadrature rule.

If the one-dimensional rules have nodes $x_i,y_j$ and weights $A_i,B_j$, respectively, then

$$
\boxed{\displaystyle I\approx\sum_i\sum_j A_iB_j f(x_i,y_j).}
$$

### 8.2 Example: Simpson quadrature for a double integral

**Example 8.1.** Approximate

$$
I=\int_{1.4}^{2}\int_{1.0}^{1.5}\ln(x+2y)\,dy\,dx.
$$

First apply Simpson's rule in $y$ for fixed $x$. Since the interval has width $0.5$ and midpoint $1.25$,

$$
\begin{aligned}
F(x)&=\int_1^{1.5}\ln(x+2y)\,dy\\
&\approx\frac{0.5}{6}\left[
\ln(x+2)+4\ln(x+2.5)+\ln(x+3)\right].
\end{aligned}
$$

Next subdivide $[1.4,2]$ into four equally spaced intervals, with step $\Delta x=0.15$ and nodes

$$
x_0=1.4,\quad x_1=1.55,\quad x_2=1.7,
\quad x_3=1.85,\quad x_4=2.
$$

Apply composite Simpson quadrature in $x$:

$$
\begin{aligned}
I&\approx\frac{0.15}{3}
\left[F(x_0)+4F(x_1)+2F(x_2)+4F(x_3)+F(x_4)\right]\\
&\approx\boxed{0.429552439}.
\end{aligned}
$$

The same computation can be written directly as a tensor-product sum with the corresponding Simpson weights in each variable.

---

## 9. Comparison of the Quadrature Methods

| Method | Nodes or construction | Algebraic precision | Typical error for smooth $f$ |
| --- | --- | --- | --- |
| Left/right rectangle | One endpoint | $0$ | $O(h)$ in composite form |
| Midpoint | Midpoint | $1$ | $O(h^2)$ in composite form |
| Trapezoidal | Two endpoints | $1$ | $O(h^2)$ in composite form |
| Simpson | Endpoints and midpoint | $3$ | $O(h^4)$ in composite form |
| Five-point Cotes | Five equally spaced nodes | $5$ | Higher single-panel order |
| Romberg | Nested trapezoidal grids and extrapolation | Increasing at each extrapolation level | $O(h^{2k+2})$ after $k$ extrapolations |
| $(n+1)$-point Gaussian | Zeros of a degree-$(n+1)$ orthogonal polynomial | $2n+1$ | Governed by $f^{(2n+2)}$ |

The main constructions fit together naturally:

1. **Interpolation** produces quadrature weights by integrating Lagrange basis polynomials.
2. **Newton--Cotes quadrature** fixes equally spaced nodes; its low-order formulas are simple, but high-degree global formulas can lose stability.
3. **Composite quadrature** improves accuracy by applying stable low-degree rules on smaller panels.
4. **Richardson extrapolation** cancels leading error terms and leads to Romberg integration.
5. **Gaussian quadrature** improves algebraic precision by choosing nodes through orthogonal polynomials rather than prescribing their positions.

The most important distinction is between improving a rule by **reducing the step size**, by **canceling known error terms**, or by **optimizing the locations of the evaluation nodes**.
