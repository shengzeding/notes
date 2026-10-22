---
title: Interpolation
order: 1
---

# Interpolation


## 1. The Interpolation Problem

### 1.1 Definition and basic questions

Suppose $f:[a,b]\to\mathbb R$ is known only through the data

$$
(x_0,y_0),\ldots,(x_n,y_n),\qquad y_i=f(x_i).
$$

**Definition (Interpolation).** An **interpolating function** $p$ is a function chosen from a prescribed, easily computable class such that

$$
p(x_i)=f(x_i)=y_i,\qquad i=0,1,\ldots,n.
$$

The points $x_i$ are the **interpolation nodes**, $[a,b]$ is the **interpolation interval**, and these equalities are the **interpolation conditions**. The construction of $p$ is an **interpolation method**.

The principal questions are which function class to use, whether the interpolation problem has a solution, whether it is unique, how to construct it, how large the error $f-p$ is, and whether the approximations converge as the number of nodes increases.

Common classes include algebraic polynomials, piecewise polynomials, splines, trigonometric polynomials, and rational functions. This chapter focuses on polynomial, Hermite, piecewise low-degree, and cubic spline interpolation.

### 1.2 Interpolation in a finite-dimensional function space

Let $\Phi=\operatorname{span}\{\varphi_0,\ldots,\varphi_n\}$ be a function space with basis $\varphi_0,\ldots,\varphi_n$. Every candidate has the form

$$
p(x)=\sum_{j=0}^n a_j\varphi_j(x).
$$

The interpolation conditions produce a linear system

$$
A\boldsymbol a=\boldsymbol y,
\qquad
A=\begin{pmatrix}
\varphi_0(x_0)&\cdots&\varphi_n(x_0)\\
\vdots&&\vdots\\
\varphi_0(x_n)&\cdots&\varphi_n(x_n)
\end{pmatrix},
\qquad
\boldsymbol y=\begin{pmatrix}y_0\\\vdots\\y_n\end{pmatrix}.
$$

**Theorem 1.1 (Existence and uniqueness).** For a fixed basis and $n+1$ distinct nodes, every vector of interpolation data has a unique interpolant in $\Phi$ if and only if the interpolation matrix $A$ is nonsingular.

**Proof.** The interpolation problem is exactly the linear system $A\boldsymbol a=\boldsymbol y$. A nonsingular matrix has a unique solution for every right-hand side, and a singular matrix does not have this property.



## 2. Polynomial Interpolation

### 2.1 Existence and uniqueness

**Definition (Polynomial interpolation).** Given $n+1$ distinct nodes $x_0,\ldots,x_n$, seek a polynomial

$$
P_n(x)=c_0+c_1x+\cdots+c_nx^n,
\qquad \deg P_n\le n,
$$

satisfying $P_n(x_i)=y_i$ for all $i$. Its actual degree may be smaller than $n$.

**Theorem 2.1 (Polynomial interpolation).** There is exactly one polynomial of degree at most $n$ interpolating the given data at $n+1$ distinct nodes.

**Proof.** In the monomial basis $1,x,\ldots,x^n$, the interpolation matrix is the **Vandermonde matrix**

$$
V=\begin{pmatrix}
1&x_0&\cdots&x_0^n\\
1&x_1&\cdots&x_1^n\\
\vdots&\vdots&&\vdots\\
1&x_n&\cdots&x_n^n
\end{pmatrix}.
$$

Its determinant is

$$
\det V=\prod_{0\le i<j\le n}(x_j-x_i)\ne0,
$$

because the nodes are distinct. The linear system therefore has a unique solution.

**Remark.** Directly solving for the monomial coefficients is possible, but more convenient constructions that avoid repeatedly solving a Vandermonde system: the Lagrange and Newton forms.

### 2.2 Linear interpolation

For two nodes $(x_0,y_0)$ and $(x_1,y_1)$, the unique linear interpolant can be written in **point-slope form**:

$$
L_1(x)=y_0+\frac{y_1-y_0}{x_1-x_0}(x-x_0).
$$

Equivalently, the **two-point form** is

$$
L_1(x)
=y_0\frac{x-x_1}{x_0-x_1}
+y_1\frac{x-x_0}{x_1-x_0}.
$$

Define

$$
\ell_0(x)=\frac{x-x_1}{x_0-x_1},
\qquad
\ell_1(x)=\frac{x-x_0}{x_1-x_0}.
$$

These polynomials have the cardinal properties

$$
\ell_0(x_0)=1,\quad \ell_0(x_1)=0,
\qquad
\ell_1(x_0)=0,\quad \ell_1(x_1)=1.
$$

Thus $L_1=y_0\ell_0+y_1\ell_1$. This is the starting point for the Lagrange construction.

### 2.3 Lagrange basis functions

**Definition (Lagrange basis).** The **Lagrange cardinal polynomial** $\ell_k$ is the polynomial of degree at most $n$ satisfying

$$
\ell_k(x_i)=\delta_{ik}=
\begin{cases}
1,&i=k,\\
0,&i\ne k.
\end{cases}
$$

Its explicit construction is

$$
\boxed{
\ell_k(x)=\prod_{\substack{0\le i\le n\\i\ne k}}
\frac{x-x_i}{x_k-x_i},
\qquad k=0,\ldots,n.
}
$$

**Proof of the cardinal property.** When $x=x_i$ with $i\ne k$, the product contains the zero factor $x_i-x_i$. At $x=x_k$, every numerator equals its denominator, giving $\ell_k(x_k)=1$.

**Theorem 2.2 (Lagrange interpolation formula).** The interpolating polynomial is

$$
\boxed{
L_n(x)=\sum_{k=0}^ny_k\ell_k(x)
=\sum_{k=0}^ny_k
\prod_{\substack{0\le i\le n\\i\ne k}}
\frac{x-x_i}{x_k-x_i}.
}
$$

**Proof.** At any node $x_i$,

$$
L_n(x_i)=\sum_{k=0}^ny_k\delta_{ik}=y_i.
$$

The formula has degree at most $n$, so uniqueness follows from Theorem 2.1.

**Corollary (Polynomial reproduction).** For $0\le j\le n$,

$$
\sum_{k=0}^n x_k^j\ell_k(x)=x^j.
$$

In particular, the Lagrange basis is a **partition of unity**:

$$
\sum_{k=0}^n\ell_k(x)=1.
$$

These identities follow by interpolating $f(x)=x^j$, whose degree is already at most $n$.

### 2.4 Linear and quadratic special cases

For $n=1$,

$$
L_1(x)=y_0\frac{x-x_1}{x_0-x_1}
+y_1\frac{x-x_0}{x_1-x_0}.
$$

For $n=2$,

$$
\begin{aligned}
L_2(x)={}&y_0\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}\\
&+y_1\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}\\
&+y_2\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}.
\end{aligned}
$$

Even with three nodes, the interpolant need not have degree two: if the data points are collinear, $L_2$ is a line.



## 3. Interpolation Remainders and Error Estimates

### 3.1 The Lagrange remainder

Write

$$
\omega_{n+1}(x)=\prod_{i=0}^n(x-x_i),
\qquad R_n(x)=f(x)-L_n(x).
$$

**Theorem 3.1 (Interpolation remainder).** Suppose $f$ has $n$ continuous derivatives on $[a,b]$ and an $(n+1)$st derivative on $(a,b)$. If all nodes and the evaluation point $x$ lie in $[a,b]$, then for some $\xi$ between the smallest and largest of these points,

$$
\boxed{
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}
\prod_{i=0}^n(x-x_i).
}
$$

At the nodes the formula holds with $R_n(x_i)=0$.

**Proof.** For a point $x$ different from the nodes, set

$$
K=\frac{f(x)-L_n(x)}{\omega_{n+1}(x)},
\qquad
\phi(t)=f(t)-L_n(t)-K\omega_{n+1}(t).
$$

The function $\phi$ vanishes at the $n+1$ nodes and also at $t=x$, giving $n+2$ distinct zeros. Repeated use of **Rolle's theorem** gives a point $\xi$ where $\phi^{(n+1)}(\xi)=0$. Since $L_n^{(n+1)}=0$ and $\omega_{n+1}^{(n+1)}=(n+1)!$,

$$
0=\phi^{(n+1)}(\xi)
=f^{(n+1)}(\xi)-K(n+1)!.
$$

Substituting the resulting value of $K$ yields the formula.

### 3.2 Uniform derivative bounds

If

$$
M_{n+1}=\max_{a\le t\le b}|f^{(n+1)}(t)|<\infty,
$$

then

$$
\boxed{
|f(x)-L_n(x)|\le
\frac{M_{n+1}}{(n+1)!}
\left|\prod_{i=0}^n(x-x_i)\right|.
}
$$

**Corollary (Linear interpolation at endpoints).** For linear interpolation at $a,b$ and $f\in C^2[a,b]$,

$$
|f(x)-L_1(x)|\le
\frac{M_2}{2}|(x-a)(x-b)|
\le\frac{(b-a)^2}{8}M_2,
\qquad x\in[a,b],
$$

where $M_2=\max_{[a,b]}|f''|$.

**Proof.** The remainder is $f''(\xi)(x-a)(x-b)/2$. On $[a,b]$, the maximum of $|(x-a)(x-b)|$ is $(b-a)^2/4$.

**Remark.** The remainder is zero whenever $f$ is a polynomial of degree at most $n$. This explains the reproduction identities in Section 2.



## 4. Divided Differences and Newton Interpolation

### 4.1 Motivation

The Lagrange formula is explicit, but introducing an additional interpolation node changes every Lagrange basis polynomial. **Newton interpolation** uses a nested product basis so that an extra node adds one new term without changing the previous terms.

### 4.2 Divided differences

**Definition (Divided differences).** For distinct nodes,

$$
f[x_i]=f(x_i),
\qquad
f[x_0,x_1]=\frac{f(x_1)-f(x_0)}{x_1-x_0},
$$

and, recursively,

$$
\boxed{
f[x_0,\ldots,x_k]
=\frac{f[x_1,\ldots,x_k]-f[x_0,\ldots,x_{k-1}]}{x_k-x_0}.
}
$$

The quantity $f[x_0,\ldots,x_k]$ is the **$k$th-order divided difference**. For example,

$$
f[x_0,x_1,x_2]
=\frac{f[x_1,x_2]-f[x_0,x_1]}{x_2-x_0}.
$$

**Proposition 4.1 (Explicit representation).** A divided difference is a linear combination of the function values:

$$
\boxed{
f[x_0,\ldots,x_k]
=\sum_{i=0}^k\frac{f(x_i)}{\displaystyle\prod_{\substack{0\le j\le k\\j\ne i}}(x_i-x_j)}.
}
$$

**Proof idea.** Apply the Lagrange formula to the $k+1$ nodes and compare the coefficient of $x^k$, or use induction on the recursion.

**Corollary (Symmetry).** A divided difference is unchanged by permuting its nodes:

$$
f[x_0,\ldots,x_k]
=f[x_{i_0},\ldots,x_{i_k}]
$$

for every permutation $(i_0,\ldots,i_k)$ of $(0,\ldots,k)$. This is clear from the explicit sum.

**Proposition 4.2 (Linearity).** For scalars $c,d$,

$$
(cf+dg)[x_0,\ldots,x_k]
=c\,f[x_0,\ldots,x_k]+d\,g[x_0,\ldots,x_k].
$$

**Theorem 4.3 (Relation to derivatives).** If $f$ has a $k$th derivative on the interval spanned by $x_0,\ldots,x_k$, with the usual continuity assumptions for Rolle's theorem, then some $\xi$ in that interval satisfies

$$
\boxed{f[x_0,\ldots,x_k]=\frac{f^{(k)}(\xi)}{k!}.}
$$

**Proof idea.** Let $P_k$ interpolate $f$ at these nodes. Its leading coefficient is $f[x_0,\ldots,x_k]$. Repeated Rolle arguments applied to $f-P_k$ show that $f^{(k)}(\xi)-P_k^{(k)}(\xi)=0$. Because $P_k^{(k)}=k!f[x_0,\ldots,x_k]$, the formula follows.

### 4.3 The divided-difference table

The table is triangular. Each entry is calculated from two entries in the preceding column:

| Node | Value | First difference quotient | Second difference quotient | $\cdots$ |
|---|---|---|---|---|
| $x_0$ | $f[x_0]$ | $f[x_0,x_1]$ | $f[x_0,x_1,x_2]$ | $\cdots$ |
| $x_1$ | $f[x_1]$ | $f[x_1,x_2]$ | $f[x_1,x_2,x_3]$ | |
| $x_2$ | $f[x_2]$ | $f[x_2,x_3]$ | $\cdots$ | |
| $\vdots$ | $\vdots$ | $\vdots$ | | |
| $x_n$ | $f[x_n]$ | | | |

The coefficients needed for Newton interpolation are

$$
f[x_0],\quad f[x_0,x_1],\quad
f[x_0,x_1,x_2],\quad\ldots,\quad f[x_0,\ldots,x_n].
$$

Only this leading diagonal (displayed across the first row of the schematic table) is used in the Newton polynomial.

### 4.4 Newton's interpolation formula

Repeated application of the divided-difference identity gives

$$
\begin{aligned}
f(x)={}&f[x_0]+f[x_0,x_1](x-x_0)\\
&+f[x_0,x_1,x_2](x-x_0)(x-x_1)+\cdots\\
&+f[x_0,\ldots,x_n]\prod_{j=0}^{n-1}(x-x_j)\\
&+f[x_0,\ldots,x_n,x]\prod_{j=0}^n(x-x_j).
\end{aligned}
$$

**Theorem 4.4 (Newton interpolation).** The polynomial part is

$$
\boxed{
N_n(x)=f[x_0]+
\sum_{k=1}^n f[x_0,\ldots,x_k]
\prod_{j=0}^{k-1}(x-x_j).
}
$$

Its remainder is exactly

$$
R_n(x)=f[x_0,\ldots,x_n,x]\prod_{j=0}^n(x-x_j).
$$

If $f$ has $n+1$ derivatives, Theorem 4.3 gives the Lagrange remainder from Section 3.

**Proof of interpolation.** At $x=x_i$, all terms involving the factors $(x-x_0)\cdots(x-x_i)$ vanish. The divided-difference identities make the remaining terms equal $f(x_i)$.

**Corollary.** The Newton and Lagrange formulas describe the **same polynomial**:

$$
N_n(x)=L_n(x).
$$

They satisfy the same $n+1$ interpolation conditions and both have degree at most $n$, so uniqueness applies.

**Incremental update.** When a new node $x_{n+1}$ is added,

$$
N_{n+1}(x)=N_n(x)
+f[x_0,\ldots,x_{n+1}]\prod_{j=0}^n(x-x_j).
$$

This update rule avoids recomputing the existing coefficients when a new node is added.

### 4.5 Example: Newton interpolation for $\ln(0.54)$

Using the tabulated values at $x_0=0.5$ and $x_1=0.6$,

$$
f[x_0,x_1]=\frac{-0.5108-(-0.6931)}{0.6-0.5}=1.8230.
$$

Hence

$$
N_1(x)=-0.6931+1.8230(x-0.5),
\qquad N_1(0.54)=-0.6202.
$$

For quadratic interpolation, include the value $f(0.7)\approx-0.3567$. The additional divided differences are

$$
f[0.6,0.7]=1.5410,
\qquad f[0.5,0.6,0.7]=-1.4100.
$$

Thus

$$
N_2(x)=-0.6931+1.8230(x-0.5)
-1.4100(x-0.5)(x-0.6),
$$

and

$$
N_2(0.54)=-0.6931+1.8230(0.04)
-1.4100(0.04)(-0.06)\approx-0.6168.
$$



## 5. Finite Differences and Equally Spaced Newton Interpolation

### 5.1 Forward differences

Suppose the nodes are equally spaced:

$$
x_i=x_0+ih,\qquad h>0,\qquad f_i=f(x_i).
$$

**Definition (Forward difference).** The first forward difference is

$$
\Delta f_i=f_{i+1}-f_i.
$$

Higher differences are defined recursively:

$$
\Delta^0f_i=f_i,
\qquad
\Delta^k f_i=\Delta^{k-1}f_{i+1}-\Delta^{k-1}f_i.
$$

In particular,

$$
\Delta^2f_i=f_{i+2}-2f_{i+1}+f_i.
$$

### 5.2 Identity and shift operators

Define the **identity operator** $I$ and **shift operator** $E$ on a sequence by

$$
If_i=f_i,\qquad Ef_i=f_{i+1}.
$$

Then

$$
\Delta=E-I,
\qquad E=I+\Delta.
$$

The binomial theorem gives

$$
\boxed{
\Delta^n f_i
=\sum_{k=0}^n(-1)^{n-k}\binom nk f_{i+k}.
}
$$

Conversely,

$$
\boxed{
f_{i+n}=E^nf_i=(I+\Delta)^nf_i
=\sum_{k=0}^n\binom nk\Delta^k f_i.
}
$$

### 5.3 Differences and divided differences

For equally spaced nodes,

$$
f[x_i,x_{i+1}]=\frac{\Delta f_i}{h},
\qquad
f[x_i,x_{i+1},x_{i+2}]=\frac{\Delta^2f_i}{2!h^2}.
$$

**Proposition 5.1.** More generally,

$$
\boxed{
f[x_i,x_{i+1},\ldots,x_{i+k}]
=\frac{\Delta^k f_i}{k!h^k}.
}
$$

**Proof.** Apply induction using the divided-difference recursion. The denominator in the $k$th step is $x_{i+k}-x_i=kh$, and the numerator is a first difference of the preceding divided differences.

**Corollary (Relation to derivatives).** Under the smoothness assumptions of Theorem 4.3, there exists $\xi\in(x_i,x_{i+k})$ such that

$$
\boxed{\Delta^k f_i=h^k f^{(k)}(\xi).}
$$

### 5.4 The forward-difference table

The differences are arranged in a triangular table:

| Node | $f_i$ | $\Delta f_i$ | $\Delta^2 f_i$ | $\Delta^3f_i$ | $\cdots$ |
|---|---|---|---|---|---|
| $x_0$ | $f_0$ | $\Delta f_0$ | $\Delta^2f_0$ | $\Delta^3f_0$ | $\cdots$ |
| $x_1$ | $f_1$ | $\Delta f_1$ | $\Delta^2f_1$ | $\cdots$ | |
| $x_2$ | $f_2$ | $\Delta f_2$ | $\cdots$ | | |
| $\vdots$ | $\vdots$ | $\vdots$ | | | |
| $x_n$ | $f_n$ | | | | |

The forward Newton interpolant uses only the **first entry from each difference column**:

$$
f_0,\quad\Delta f_0,\quad\Delta^2f_0,\ldots,\Delta^nf_0.
$$

### 5.5 Newton's forward interpolation formula

Set

$$
t=\frac{x-x_0}{h},\qquad x=x_0+th.
$$

Substituting Proposition 5.1 into the Newton formula gives

$$
\boxed{
N_n(x_0+th)
=f_0+t\Delta f_0
+\frac{t(t-1)}{2!}\Delta^2f_0
+\cdots
+\frac{t(t-1)\cdots(t-n+1)}{n!}\Delta^nf_0.
}
$$

Equivalently,

$$
N_n(x_0+th)=\sum_{k=0}^n\binom tk\Delta^kf_0,
\qquad
\binom tk=\frac{t(t-1)\cdots(t-k+1)}{k!}.
$$

For sufficiently smooth $f$, the remainder is

$$
\boxed{
R_n(x_0+th)
=\frac{h^{n+1}}{(n+1)!}
\left[\prod_{j=0}^n(t-j)\right]
f^{(n+1)}(\xi),
}
$$

where $\xi$ lies in the interval spanned by the nodes and $x$.

### 5.6 Example: fourth-degree forward interpolation of $\cos x$

Consider $f(x)=\cos x$ on the equally spaced nodes $0,0.1,0.2,0.3,0.4,0.5$, with $h=0.1$. For a degree-four interpolant, take the first five nodes:

| $x_i$ | $f_i$ | $\Delta f_i$ | $\Delta^2f_i$ | $\Delta^3f_i$ | $\Delta^4f_i$ |
|---:|---:|---:|---:|---:|---:|
| $0.0$ | $1.00000$ | $-0.00500$ | $-0.00993$ | $0.00013$ | $0.00012$ |
| $0.1$ | $0.99500$ | $-0.01493$ | $-0.00980$ | $0.00025$ | |
| $0.2$ | $0.98007$ | $-0.02473$ | $-0.00955$ | | |
| $0.3$ | $0.95534$ | $-0.03428$ | | | |
| $0.4$ | $0.92106$ | | | | |

*The tabulated values and differences are displayed to five decimal places; rounding affects the final digits of higher differences. The signs of the higher differences follow directly from the recursive forward-difference definition.*

At $x=0.048$,

$$
t=\frac{0.048-0}{0.1}=0.48.
$$

Substituting into the forward interpolation formula gives:

$$
\boxed{N_4(0.048)\approx0.99884.}
$$

The remainder estimate for interpolation of the unrounded function values is

$$
|R_4(0.048)|\le
\frac{h^5M_5}{5!}
|t(t-1)(t-2)(t-3)(t-4)|,
$$

where $M_5=\max_{0\le u\le0.4}|f^{(5)}(u)|$. For $f=\cos x$, $f^{(5)}(u)=-\sin u$, which gives the bound

$$
\boxed{|R_4(0.048)|\le1.09212\times10^{-7}.}
$$

This is the **interpolation remainder bound for exact nodal data**; rounding the tabulated values can introduce an additional error, which is not included in that bound.

### 5.7 Backward and central differences

Two related operators are backward and central differences.

**Definition (Backward difference).**

$$
\nabla f_i=f_i-f_{i-1},
\qquad
\nabla^kf_i=\nabla^{k-1}f_i-\nabla^{k-1}f_{i-1}.
$$

**Definition (Central difference).** For a function on a uniform grid,

$$
\delta f(x_i)=f\left(x_i+\frac h2\right)
-f\left(x_i-\frac h2\right),
$$

with higher central differences defined by repeated application of $\delta$. These are supplementary constructions; the chapter's main equally spaced formula is the **forward** Newton formula.



## 6. Hermite Interpolation

### 6.1 Matching both function values and derivatives

Ordinary interpolation requires $p(x_i)=f(x_i)$. **Hermite interpolation** also matches specified derivatives, possibly of higher order. A common case is that both values and first derivatives are known.

**Example (Vehicle data).** Measurements of a car traveling along a straight road are given by

| Time (s) | $0$ | $3$ | $5$ | $8$ | $13$ |
|---:|---:|---:|---:|---:|---:|
| Distance (ft) | $0$ | $225$ | $385$ | $623$ | $993$ |
| Speed (ft/s) | $75$ | $77$ | $80$ | $74$ | $72$ |

**Exercise.** Use Hermite interpolation to estimate the position and speed at $10$ seconds, investigate whether the speed exceeds $55$ miles per hour, and estimate the maximum speed.

### 6.2 General first-derivative Hermite interpolation

Suppose $x_0,\ldots,x_n$ are distinct, and we are given

$$
f(x_i)=y_i,\qquad f'(x_i)=m_i,
\qquad i=0,\ldots,n.
$$

There are $2n+2$ conditions. Seek $H_{2n+1}$ of degree at most $2n+1$ satisfying

$$
H_{2n+1}(x_i)=y_i,
\qquad H_{2n+1}'(x_i)=m_i.
$$

Use the Lagrange basis $\ell_j$ defined in Section 2. Set

$$
\alpha_j(x)
=\left[1-2(x-x_j)\ell_j'(x_j)\right]\ell_j(x)^2,
\qquad
\beta_j(x)=(x-x_j)\ell_j(x)^2.
$$

Because

$$
\ell_j'(x_j)=\sum_{\substack{0\le k\le n\\k\ne j}}
\frac{1}{x_j-x_k},
$$

one may also write

$$
\alpha_j(x)=
\left[1+2\sum_{k\ne j}\frac{x_j-x}{x_j-x_k}\right]\ell_j(x)^2.
$$

The basis functions satisfy

$$
\begin{array}{ll}
\alpha_j(x_i)=\delta_{ij},&\alpha_j'(x_i)=0,\\
\beta_j(x_i)=0,&\beta_j'(x_i)=\delta_{ij}.
\end{array}
$$

**Theorem 6.1 (Hermite formula).** The interpolation polynomial is

$$
\boxed{
H_{2n+1}(x)
=\sum_{j=0}^ny_j\alpha_j(x)
+\sum_{j=0}^nm_j\beta_j(x).
}
$$

**Proof.** The four cardinal identities show directly that the polynomial reproduces the specified function values and first derivatives at every node. Each basis function has degree at most $2n+1$.

**Theorem 6.2 (Uniqueness).** There is at most one polynomial of degree at most $2n+1$ meeting these $2n+2$ Hermite conditions.

**Proof.** If $H$ and $\widetilde H$ meet the same conditions, then $Q=H-\widetilde H$ satisfies

$$
Q(x_i)=Q'(x_i)=0,\qquad i=0,\ldots,n.
$$

Each node is a root of multiplicity at least two, so

$$
Q(x)=c\prod_{i=0}^n(x-x_i)^2.
$$

Unless $c=0$, the right-hand side has degree $2n+2$, whereas $\deg Q\le2n+1$. Hence $Q=0$.

### 6.3 Hermite remainder

**Theorem 6.3 (Hermite interpolation remainder).** If $f$ is sufficiently smooth, with its $(2n+2)$nd derivative existing on the interval, then for some $\xi$ in the interval spanned by the nodes and $x$,

$$
\boxed{
f(x)-H_{2n+1}(x)
=\frac{f^{(2n+2)}(\xi)}{(2n+2)!}
\prod_{i=0}^n(x-x_i)^2.
}
$$

**Proof idea.** Subtract from $f-H_{2n+1}$ a multiple of the squared nodal product chosen to vanish at the evaluation point. The result has a double zero at every node and an additional zero at $x$. Repeated Rolle arguments give the required derivative identity.

### 6.4 Cubic Hermite interpolation at two nodes

For nodes $x_0,x_1$, values $y_0,y_1$, and derivatives $m_0,m_1$, put $h=x_1-x_0$ and $t=(x-x_0)/h$. The cubic Hermite interpolant is

$$
\boxed{
H_3(x)=y_0(2t^3-3t^2+1)
+y_1(-2t^3+3t^2)
+h m_0(t^3-2t^2+t)
+h m_1(t^3-t^2).
}
$$

This is the special case $n=1$ of Theorem 6.1. It reproduces $y_0,y_1$ and $m_0,m_1$ at the two endpoints.

**Additional exercise.** Another Hermite setup prescribes $p(x_i)=y_i$ for $i=0,1,2$ and a single derivative condition $p'(x_1)=m_1$. Construct the interpolating polynomial. These four conditions determine a polynomial of degree at most three when the nodes are distinct.



## 7. Piecewise Low-Degree Interpolation

### 7.1 Why use piecewise polynomials?

A higher-degree global interpolating polynomial is **not automatically more accurate**. **Runge's phenomenon** can be illustrated by

$$
f(x)=\frac{1}{1+x^2},\qquad -5\le x\le5,
$$

and equally spaced nodes

$$
x_i=-5+\frac{10i}{n},\qquad i=0,\ldots,n.
$$

As the degree increases, the global interpolating polynomials can show progressively larger oscillations near the endpoints and fail to converge uniformly to $f$. Piecewise low-degree interpolation avoids fitting one high-degree polynomial over the entire interval.

### 7.2 Piecewise linear interpolation

Let

$$
a=x_0<x_1<\cdots<x_n=b,
\quad h_k=x_{k+1}-x_k,
\quad h=\max_{0\le k<n}h_k.
$$

**Definition (Piecewise linear interpolant).** The function $I_h$ is the continuous function on $[a,b]$ satisfying $I_h(x_k)=f_k$ and being linear on each $[x_k,x_{k+1}]$. Explicitly, on this interval,

$$
\boxed{
I_h(x)
=f_k\frac{x_{k+1}-x}{h_k}
+f_{k+1}\frac{x-x_k}{h_k}.
}
$$

The local basis functions are nonnegative and sum to one. Thus $I_h$ is continuous, even though its first derivative may jump at the interior nodes.

### 7.3 Modulus of continuity and the error estimate

**Definition (Modulus of continuity).** For a continuous function $f$ on $[a,b]$, define

$$
\omega_f(h)=\sup\bigl\{|f(u)-f(v)|:
 u,v\in[a,b],\ |u-v|\le h\bigr\}.
$$

Because continuous functions on a compact interval are uniformly continuous,

$$
\lim_{h\downarrow0}\omega_f(h)=0.
$$

**Theorem 7.1 (Piecewise linear error).** If $f\in C[a,b]$, then

$$
\boxed{\|f-I_h\|_\infty\le\omega_f(h).}
$$

Consequently $I_h\to f$ uniformly as $h\to0$.

**Proof.** Fix $x\in[x_k,x_{k+1}]$, and write

$$
\theta=\frac{x_{k+1}-x}{h_k},
\qquad 1-\theta=\frac{x-x_k}{h_k}.
$$

Both weights belong to $[0,1]$, and

$$
\begin{aligned}
|f(x)-I_h(x)|
&=|\theta(f(x)-f_k)+(1-\theta)(f(x)-f_{k+1})|\\
&\le\theta\omega_f(h)+(1-\theta)\omega_f(h)\\
&=\omega_f(h).
\end{aligned}
$$

### 7.4 Piecewise cubic Hermite interpolation

Suppose the data include values $f_k$ and prescribed derivatives $m_k$ at all mesh nodes.

**Definition (Piecewise cubic Hermite interpolant).** A function $I_h$ is a piecewise cubic Hermite interpolant when

$$
I_h\in C^1[a,b],\qquad
I_h(x_k)=f_k,\quad I_h'(x_k)=m_k,
$$

and its restriction to each $[x_k,x_{k+1}]$ is a polynomial of degree at most three.

On one interval, with $h_k=x_{k+1}-x_k$ and $t=(x-x_k)/h_k$, the local formula is

$$
\begin{aligned}
I_h(x)={}&f_k(2t^3-3t^2+1)
+f_{k+1}(-2t^3+3t^2)\\
&+h_km_k(t^3-2t^2+t)
+h_km_{k+1}(t^3-t^2).
\end{aligned}
$$

Equivalently, writing $\alpha_k,\alpha_{k+1},\beta_k,\beta_{k+1}$ for the four local cubic Hermite basis functions,

$$
I_h(x)=f_k\alpha_k(x)+f_{k+1}\alpha_{k+1}(x)
+m_k\beta_k(x)+m_{k+1}\beta_{k+1}(x).
$$

The basis functions satisfy the bounds

$$
0\le\alpha_k,\alpha_{k+1}\le1,
\qquad
\alpha_k+\alpha_{k+1}=1,
$$

and

$$
|\beta_k(x)|,\ |\beta_{k+1}(x)|\le\frac4{27}h_k.
$$

**Theorem 7.2 (Piecewise Hermite error).** For continuous $f$ and nodal derivatives bounded by $M=\max_k|m_k|$,

$$
\boxed{
|f(x)-I_h(x)|
\le\omega_f(h)+\frac8{27}hM,
\qquad x\in[a,b].
}
$$

**Proof idea.** Add and subtract $\bigl(\alpha_k+\alpha_{k+1}\bigr)f(x)=f(x)$. Bound the two function-value terms by $\omega_f(h)$ and the two derivative terms by $4hM/27$ each.

When the derivative data remain uniformly bounded as the mesh is refined, the estimate implies uniform convergence.



## 8. Cubic Spline Interpolation

### 8.1 Definition and degrees of freedom

**Definition (Cubic spline).** A function $S$ is a **cubic spline** with knots

$$
a=x_0<x_1<\cdots<x_n=b
$$

if $S\in C^2[a,b]$ and $S$ is a polynomial of degree at most three on each subinterval $[x_i,x_{i+1}]$.

It is an **interpolating cubic spline** for the data $y_i=f(x_i)$ if

$$
S(x_i)=y_i,\qquad i=0,\ldots,n.
$$

There are $n$ cubic polynomial pieces, hence $4n$ coefficients. The interpolation and interior smoothness constraints contribute

- $2n$ endpoint-value conditions, counting both endpoints of every piece;
- $n-1$ continuity conditions for $S'$ at the interior knots;
- $n-1$ continuity conditions for $S''$ at the interior knots.

Together these are $4n-2$ conditions. **Two additional boundary conditions** are required to determine a unique spline.

### 8.2 Three types of boundary conditions

Three standard types of boundary conditions are:

**Type I (Prescribed first derivatives, or clamped boundary conditions).** Given endpoint derivatives,

$$
\boxed{S'(x_0)=f'(x_0),\qquad S'(x_n)=f'(x_n).}
$$

**Type II (Prescribed second derivatives).** Given endpoint second derivatives,

$$
\boxed{S''(x_0)=f''(x_0),\qquad S''(x_n)=f''(x_n).}
$$

The choice $S''(x_0)=S''(x_n)=0$ is the special **natural spline** condition; Type II allows general prescribed second derivatives.

**Type III (Periodic boundary conditions).** When the data describe a function with period $b-a$, impose matching values and derivatives at the endpoints:

$$
\boxed{S^{(k)}(x_0^+)=S^{(k)}(x_n^-),\qquad k=0,1,2.}
$$

For a genuinely periodic data set, $y_0=y_n$ is part of the compatibility conditions.

### 8.3 The three-angle / first-derivative construction

The **three-angle method** (*三转角法*) constructs the spline in terms of its first derivatives at the knots. Introduce the unknown knot slopes

$$
m_i=S'(x_i),\qquad i=0,\ldots,n.
$$

On each $[x_i,x_{i+1}]$, the spline piece is the cubic Hermite interpolant of

$$
S(x_i)=y_i,\quad S(x_{i+1})=y_{i+1},
\quad S'(x_i)=m_i,\quad S'(x_{i+1})=m_{i+1}.
$$

Using $h_i=x_{i+1}-x_i$ and $t=(x-x_i)/h_i$,

$$
\begin{aligned}
S(x)={}&y_i(2t^3-3t^2+1)
+y_{i+1}(-2t^3+3t^2)\\
&+h_im_i(t^3-2t^2+t)
+h_im_{i+1}(t^3-t^2),
\qquad x\in[x_i,x_{i+1}].
\end{aligned}
$$

The values and first derivatives are automatically continuous at the knots. The unknown $m_i$ must be chosen to make the **second** derivatives continuous.

### 8.4 Continuity of the second derivative

Differentiating the Hermite formula twice gives, from the right of $x_i$,

$$
S''(x_i^+)
=-\frac6{h_i^2}y_i+\frac6{h_i^2}y_{i+1}
-\frac4{h_i}m_i-\frac2{h_i}m_{i+1},
$$

and, from the left,

$$
S''(x_i^-)
=\frac6{h_{i-1}^2}y_{i-1}
-\frac6{h_{i-1}^2}y_i
+\frac2{h_{i-1}}m_{i-1}
+\frac4{h_{i-1}}m_i.
$$

At every interior knot $i=1,\ldots,n-1$, require $S''(x_i^-)=S''(x_i^+)$. Rearranging gives

$$
\begin{aligned}
&\frac2{h_{i-1}}m_{i-1}
+\left(\frac4{h_{i-1}}+\frac4{h_i}\right)m_i
+\frac2{h_i}m_{i+1}\\
&\hspace{12mm}=
\frac6{h_i^2}(y_{i+1}-y_i)
+\frac6{h_{i-1}^2}(y_i-y_{i-1}).
\end{aligned}
$$

Define

$$
\lambda_i=\frac{h_i}{h_{i-1}+h_i},
\qquad
\mu_i=\frac{h_{i-1}}{h_{i-1}+h_i},
\qquad \lambda_i+\mu_i=1,
$$

and denote the first divided differences by

$$
f[x_i,x_{i+1}]=\frac{y_{i+1}-y_i}{h_i}.
$$

The interior equations reduce to

$$
\boxed{
\lambda_i m_{i-1}+2m_i+\mu_i m_{i+1}=g_i,
\quad i=1,\ldots,n-1,
}
$$

where

$$
\boxed{
g_i=3\mu_i f[x_i,x_{i+1}]
+3\lambda_i f[x_{i-1},x_i].
}
$$

### 8.5 The tridiagonal linear system

For Type I boundary conditions, $m_0$ and $m_n$ are known. The interior unknowns $\boldsymbol m=(m_1,\ldots,m_{n-1})^T$ satisfy

$$
\underbrace{\begin{pmatrix}
2&\mu_1&0&\cdots&0\\
\lambda_2&2&\mu_2&\ddots&\vdots\\
0&\ddots&\ddots&\ddots&0\\
\vdots&\ddots&\lambda_{n-2}&2&\mu_{n-2}\\
0&\cdots&0&\lambda_{n-1}&2
\end{pmatrix}}_{A}
\begin{pmatrix}m_1\\m_2\\\vdots\\m_{n-2}\\m_{n-1}\end{pmatrix}
=
\begin{pmatrix}
g_1-\lambda_1m_0\\g_2\\\vdots\\g_{n-2}\\g_{n-1}-\mu_{n-1}m_n
\end{pmatrix}.
$$

The schematic matrix is understood with its natural smaller dimensions when $n$ is small.

Because $\lambda_i,\mu_i>0$ and $\lambda_i+\mu_i=1$, the diagonal entry $2$ strictly exceeds the sum of the absolute values of the off-diagonal entries in every row. Thus $A$ is **strictly diagonally dominant**, and the linear system has a unique solution.

Type II and Type III boundary conditions lead to different endpoint equations, but the same continuity equations at the interior knots.

### 8.6 Infinity norms and a matrix estimate

The convergence proof uses three norms.

For a vector $\boldsymbol v\in\mathbb R^m$,

$$
\|\boldsymbol v\|_\infty=\max_{1\le i\le m}|v_i|.
$$

For a matrix $A$, the induced infinity norm is

$$
\|A\|_\infty=\sup_{\boldsymbol v\ne0}
\frac{\|A\boldsymbol v\|_\infty}{\|\boldsymbol v\|_\infty}.
$$

For $f$ on $[a,b]$,

$$
\|f\|_\infty=\sup_{a\le x\le b}|f(x)|.
$$

**Lemma 8.1 (Strict diagonal dominance).** If $A=(a_{ij})$ is strictly diagonally dominant by rows, then $A$ is invertible and

$$
\boxed{
\|A^{-1}\|_\infty\le
\left[\min_i\left(|a_{ii}|-\sum_{j\ne i}|a_{ij}|\right)\right]^{-1}.
}
$$

**Proof.** Let $A\boldsymbol v=\boldsymbol w$ and choose an index $i$ for which $|v_i|=\|\boldsymbol v\|_\infty$. Then

$$
|w_i|\ge|a_{ii}||v_i|-
\sum_{j\ne i}|a_{ij}||v_j|
\ge\left(|a_{ii}|-\sum_{j\ne i}|a_{ij}|\right)
\|\boldsymbol v\|_\infty.
$$

Take the minimum row margin, divide, and then take the supremum over nonzero $\boldsymbol w$. The positive margin also implies invertibility.

For the spline matrix $A$, the row margin is at least $1$, so

$$
\boxed{\|A^{-1}\|_\infty\le1.}
$$

### 8.7 Uniform convergence of clamped cubic splines

**Theorem 8.2 (Uniform convergence).** Suppose $f\in C[a,b]$, and $S$ is the Type I cubic spline interpolant on the mesh

$$
a=x_0<x_1<\cdots<x_n=b.
$$

Let

$$
h=\max_i h_i,
\qquad \delta=\min_i h_i,
\qquad h_i=x_{i+1}-x_i.
$$

Assume the meshes are **shape regular** in the sense that

$$
\frac h\delta\le C<\infty
$$

with a constant independent of mesh refinement. If the prescribed endpoint slopes remain bounded as the mesh is refined with $h\to0$, the resulting cubic splines converge uniformly to $f$ on $[a,b]$.

**Proof outline.** On $[x_i,x_{i+1}]$, use the nonnegative Hermite value basis and the derivative-basis bounds from Section 7:

$$
|f(x)-S(x)|
\le\omega_f(h)+\frac4{27}h_i(|m_i|+|m_{i+1}|)
\le\omega_f(h)+\frac8{27}h\max_k|m_k|.
$$

Let $M_{\partial}=\max\{|m_0|,|m_n|\}$ denote the largest of the two prescribed endpoint slopes. The interior spline system is $A\boldsymbol m_{\mathrm{int}}=\boldsymbol g^*$, where $\boldsymbol g^*$ is obtained by moving the known endpoint terms onto the right-hand side. The inverse-matrix estimate gives

$$
\|\boldsymbol m_{\mathrm{int}}\|_\infty
\le\|A^{-1}\|_\infty\|\boldsymbol g^*\|_\infty
\le\|\boldsymbol g^*\|_\infty.
$$

The divided differences satisfy

$$
|f[x_i,x_{i+1}]|
=\frac{|f(x_{i+1})-f(x_i)|}{h_i}
\le\frac{\omega_f(h)}{\delta}.
$$

Since $\lambda_i+\mu_i=1$, the interior unadjusted right-hand side obeys

$$
\|\boldsymbol g\|_\infty
\le\frac3\delta\omega_f(h).
$$

The endpoint adjustments contribute at most $M_{\partial}$, and hence

$$
\max_{0\le k\le n}|m_k|
\le\frac3\delta\omega_f(h)+M_{\partial}.
$$

Substitution into the local interpolation estimate gives

$$
\boxed{
\|f-S\|_\infty
\le\left(1+\frac{8h}{9\delta}\right)\omega_f(h)
+\frac8{27}hM_{\partial}.
}
$$

The endpoint-slope term accounts explicitly for the **clamped boundary conditions**. It tends to zero when the prescribed endpoint slopes remain bounded, because $h\to0$. If $h/\delta$ stays bounded, the factor in parentheses is bounded; uniform continuity gives $\omega_f(h)\to0$, proving $\|f-S\|_\infty\to0$.



