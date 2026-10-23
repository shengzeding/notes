---
title: Function Approximation and Least Squares
order: 2
---


# Function Approximation and Least Squares

## 1. The Approximation Problem

<span id="finite-dimensional-function-approximation"></span>

### 1.1 Function approximation and curve fitting

Suppose a function $f$ is known on $[a,b]$, but evaluating it directly is inconvenient. The **function approximation problem** is to choose a simpler function $p$ that is as close as possible to $f$ under a prescribed measure of error.

If only the observations $(x_i,y_i)$ are known, the **curve fitting problem** is to find a function whose values are close to the observations as a whole. Unlike interpolation, the fitted function need not pass through every data point.

Let $A=C[a,b]$ and choose a finite-dimensional approximation space

$$
\Phi_n=\operatorname{span}\{\varphi_0,\varphi_1,\ldots,\varphi_n\}\subset C[a,b],
$$

where the basis functions are linearly independent. Every candidate approximation has the form

$$
p(x)=\sum_{j=0}^{n}a_j\varphi_j(x).
$$

The problem consists of choosing the approximation class and the criterion used to measure the error. Typical approximation classes include algebraic polynomials, rational functions, and trigonometric polynomials.

### 1.2 Uniform and square approximation

**Definition (Uniform norm).** For $f\in C[a,b]$,

$$
\boxed{\displaystyle \|f\|_\infty=\max_{a\le x\le b}|f(x)|.}
$$

The **best uniform approximation** minimizes the maximum pointwise deviation:

$$
\min_{p\in\Phi_n}\|f-p\|_\infty.
$$

**Definition (Weighted square norm).** Given a weight function $\rho(x)\ge0$ on $[a,b]$,

$$
\boxed{\displaystyle \|f\|_{2,\rho}=\left(\int_a^b\rho(x)|f(x)|^2\,dx\right)^{1/2}.}
$$

The **best square approximation** minimizes the integrated squared error:

$$
\min_{p\in\Phi_n}\|f-p\|_{2,\rho}^{2}
=\min_{p\in\Phi_n}\int_a^b\rho(x)[f(x)-p(x)]^2\,dx.
$$

Uniform approximation controls the worst error, whereas square approximation controls the total squared error over the interval.

### 1.3 Weierstrass approximation theorem

**Theorem 1.1 (Weierstrass approximation theorem).** For every $f\in C[a,b]$ and every $\varepsilon>0$, there exists an algebraic polynomial $p$ such that

$$
\boxed{\displaystyle \max_{x\in[a,b]}|f(x)-p(x)|<\varepsilon.}
$$

Thus algebraic polynomials are dense in $C[a,b]$ under the uniform norm. The theorem guarantees arbitrarily accurate approximation as the degree increases; it does not say that a fixed low-degree polynomial can approximate every continuous function equally well.

**Bernstein polynomial construction.** For $f\in C[0,1]$, define

$$
\boxed{\displaystyle B_n(f;x)=\sum_{k=0}^{n}f\left(\frac{k}{n}\right)\binom{n}{k}x^k(1-x)^{n-k}.}
$$

The basis functions

$$
b_{n,k}(x)=\binom nk x^k(1-x)^{n-k}
$$

are nonnegative for $x\in[0,1]$ and satisfy

$$
\sum_{k=0}^{n}b_{n,k}(x)=(x+1-x)^n=1.
$$

Bernstein's construction gives

$$
\lim_{n\to\infty}\|B_n(f;\cdot)-f\|_\infty=0.
$$

For sufficiently smooth $f$, the derivatives of Bernstein polynomials also converge to the corresponding derivatives. If $f$ is convex on $[0,1]$, then $B_n(f;\cdot)$ is convex as well.


## 2. Best Uniform Polynomial Approximation

Let

$$
H_n=\{p:\deg p\le n\}
$$

be the space of algebraic polynomials of degree at most $n$.

### 2.1 Best approximation and minimum deviation

**Definition (Deviation).** For $p\in H_n$, define

$$
\Delta(f,p)=\|f-p\|_\infty
=\max_{x\in[a,b]}|f(x)-p(x)|.
$$

A polynomial $p_n^*\in H_n$ is a **best uniform approximation polynomial** if

$$
\boxed{\displaystyle \Delta(f,p_n^*)=\min_{p\in H_n}\Delta(f,p).}
$$

The value

$$
E_n(f)=\min_{p\in H_n}\|f-p\|_\infty
$$

is the **minimum deviation**. The degree of $p_n^*$ can be smaller than $n$.

**Theorem 2.1 (Existence).** Every $f\in C[a,b]$ has a best uniform approximation polynomial in $H_n$.

### 2.2 Positive and negative deviation points

Set

$$
e(x)=f(x)-p_n^*(x),\qquad \mu=\|e\|_\infty.
$$

**Definition (Deviation point).** A point $x_0\in[a,b]$ is a deviation point if

$$
|e(x_0)|=\mu.
$$

If $e(x_0)=\mu$, it is a **positive deviation point**; if $e(x_0)=-\mu$, it is a **negative deviation point**.

**Theorem 2.2 (Necessary condition).** If $p_n^*$ is a best uniform approximation and $\mu>0$, then $e$ attains both $+\mu$ and $-\mu$ on $[a,b]$.

Proof. If every point of maximum absolute deviation had the same sign, a sufficiently small constant shift of the polynomial in that direction would decrease the maximum error. This contradicts optimality.

### 2.3 Chebyshev alternation theorem

**Theorem 2.3 (Chebyshev alternation theorem).** A polynomial $p_n^*\in H_n$ is a best uniform approximation of $f\in C[a,b]$ if and only if there are at least $n+2$ ordered points

$$
a\le x_0<x_1<\cdots<x_{n+1}\le b
$$

such that

$$
\boxed{\displaystyle f(x_i)-p_n^*(x_i)=(-1)^i\sigma E_n(f),\quad
 i=0,\ldots,n+1,\quad \sigma\in\{-1,1\}.}
$$

These points form a **Chebyshev alternation set**. The error has the same absolute value and alternates in sign at successive points.

**Corollary (Uniqueness).** The best uniform approximation polynomial in $H_n$ is unique.

**Corollary (Interpolation interpretation).** If $f-p_n^*$ is not identically zero, the $n+1$ intervals between successive alternation points contain zeros of the error. At any $n+1$ distinct such zeros, $p_n^*$ agrees with $f$. Therefore $p_n^*$ can also be viewed as a Lagrange interpolation polynomial at suitably chosen nodes.

### 2.4 Best linear uniform approximation

Suppose $f\in C^2[a,b]$ and $f''(x)$ does not change sign and is nonzero on $(a,b)$. Seek

$$
p_1^*(x)=a_0+a_1x.
$$

By the alternation theorem, the error has three alternation points. Since

$$
e'(x)=f'(x)-a_1,\qquad e''(x)=f''(x),
$$

the interior extremum is unique. The three points are $a,\xi,b$, with

$$
e(a)=e(b)=-e(\xi)
$$

(up to reversing all the signs). From $e(a)=e(b)$,

$$
\boxed{\displaystyle a_1=\frac{f(b)-f(a)}{b-a}.}
$$

The interior point is determined by

$$
\boxed{\displaystyle f'(\xi)=a_1.}
$$

Finally, the equal-amplitude condition gives

$$
\boxed{\displaystyle a_0=\frac{f(a)+f(\xi)}{2}-\frac{a+\xi}{2}a_1.}
$$

The minimum deviation is

$$
E_1(f)=\left|f(a)-a_0-a_1a\right|
=\frac12\left|f(a)-f(\xi)-a_1(a-\xi)\right|.
$$

This construction uses the endpoints and the unique interior stationary point of the error.


## 3. Best Square Approximation

### 3.1 Weight functions and inner products

**Definition (Weight function).** A nonnegative function $\rho$ on $(a,b)$ is a weight function if the relevant weighted moments exist and, for every nonnegative continuous $g$,

$$
\int_a^b\rho(x)g(x)\,dx=0\quad\Longrightarrow\quad g\equiv0.
$$

For the polynomial constructions below, it is enough that all required moments exist and the associated inner product is positive definite.

**Definition (Weighted inner product).** For real-valued functions $f,g$,

$$
\boxed{\displaystyle (f,g)_\rho=\int_a^b\rho(x)f(x)g(x)\,dx.}
$$

It is symmetric, linear in each argument, and positive definite. The induced norm is

$$
\|f\|_{2,\rho}=\sqrt{(f,f)_\rho}.
$$

The inner product makes it possible to define orthogonality and angles:

$$
(f,g)_\rho=0\ \Longleftrightarrow\ f\perp g,
\qquad
\cos\theta=\frac{(f,g)_\rho}{\|f\|_{2,\rho}\|g\|_{2,\rho}}
$$

for nonzero $f,g$. The corresponding distance is $\|f-g\|_{2,\rho}$.

The familiar inner-product identities remain valid:

$$
\begin{aligned}
|(f,g)_\rho|&\le\|f\|_{2,\rho}\|g\|_{2,\rho} &&\text{(Cauchy--Schwarz)},\\
\|f+g\|_{2,\rho}&\le\|f\|_{2,\rho}+\|g\|_{2,\rho} &&\text{(triangle inequality)},\\
\|f+g\|_{2,\rho}^{2}+\|f-g\|_{2,\rho}^{2}&=2\|f\|_{2,\rho}^{2}+2\|g\|_{2,\rho}^{2} &&\text{(parallelogram identity)}.
\end{aligned}
$$

### 3.2 Best approximation in a finite-dimensional space

Let

$$
\Phi_n=\operatorname{span}\{\varphi_0,\ldots,\varphi_n\},
\qquad
S(x)=\sum_{j=0}^na_j\varphi_j(x).
$$

<span id="best-square-approximation"></span>

**Definition (Best square approximation).** A function $S^*\in\Phi_n$ is the best square approximation of $f$ if

$$
\boxed{\displaystyle \|f-S^*\|_{2,\rho}^{2}
=\min_{S\in\Phi_n}\int_a^b\rho(x)[f(x)-S(x)]^2\,dx.}
$$

Define the objective

$$
I(a_0,\ldots,a_n)=\left\|f-\sum_{j=0}^na_j\varphi_j\right\|_{2,\rho}^{2}.
$$

Differentiating with respect to each coefficient gives

$$
\frac{\partial I}{\partial a_k}
=2\left(\sum_{j=0}^na_j\varphi_j-f,\varphi_k\right)_\rho=0,
\qquad k=0,\ldots,n.
$$

**Theorem 3.1 (Normal equations).** The coefficients of the best square approximation satisfy

$$
\boxed{\displaystyle \sum_{j=0}^{n}(\varphi_k,\varphi_j)_\rho a_j
=(f,\varphi_k)_\rho,\qquad k=0,\ldots,n.}
$$

In matrix form,

$$
\boxed{\displaystyle Ga=d,\qquad
G_{kj}=(\varphi_k,\varphi_j)_\rho,\qquad
 d_k=(f,\varphi_k)_\rho.}
$$

The matrix $G$ is the **Gram matrix**, whose determinant is also called the Gram determinant.

Replacing the integral inner product by a positively weighted finite-sample inner product gives [discrete least squares](#discrete-least-squares "concept:discrete-least-squares") with the same orthogonality and normal-equation structure.

**Theorem 3.2 (Existence and uniqueness).** If $\varphi_0,\ldots,\varphi_n$ are linearly independent, $G$ is positive definite and the normal equations have a unique solution.

Proof. For a nonzero coefficient vector $c$,

$$
c^TGc=\left\|\sum_{j=0}^nc_j\varphi_j\right\|_{2,\rho}^{2}>0.
$$

Therefore $G$ is nonsingular. In particular, its determinant is nonzero.

### 3.3 Orthogonality and the minimum-square-error identity

The normal equations are equivalent to

$$
\boxed{\displaystyle (f-S^*,\varphi_k)_\rho=0,
\qquad k=0,\ldots,n,}
$$

or, more generally,

$$
(f-S^*,S)_\rho=0\qquad\text{for every }S\in\Phi_n.
$$

Thus the residual $f-S^*$ is orthogonal to the approximation space: $S^*$ is the orthogonal projection of $f$ onto $\Phi_n$.

**Proof of optimality.** For any $S\in\Phi_n$,

$$
\begin{aligned}
\|f-S\|_{2,\rho}^{2}
&=\|(f-S^*)+(S^*-S)\|_{2,\rho}^{2}\\
&=\|f-S^*\|_{2,\rho}^{2}+\|S^*-S\|_{2,\rho}^{2},
\end{aligned}
$$

because $(f-S^*,S^*-S)_\rho=0$. Hence

$$
\boxed{\displaystyle \|f-S\|_{2,\rho}^{2}\ge\|f-S^*\|_{2,\rho}^{2},}
$$

with equality only when $S=S^*$.

**Square error.** Writing $S^*=\sum_{k=0}^na_k^*\varphi_k$ gives

$$
\boxed{\displaystyle
\delta_n^2=\|f-S^*\|_{2,\rho}^{2}
=\|f\|_{2,\rho}^{2}-(S^*,f)_\rho
=\|f\|_{2,\rho}^{2}-\sum_{k=0}^na_k^*(f,\varphi_k)_\rho.}
$$

### 3.4 Polynomial approximation and the Hilbert matrix

For $\rho(x)=1$, $[a,b]=[0,1]$, and $\varphi_k(x)=x^k$, the normal equations become

$$
\sum_{j=0}^n\left(\int_0^1x^{k+j}\,dx\right)a_j
=\int_0^1x^kf(x)\,dx.
$$

Since

$$
\int_0^1x^{k+j}\,dx=\frac1{k+j+1},
$$

the system is

$$
\boxed{\displaystyle Ha=d,\qquad H_{kj}=\frac1{k+j+1},\quad k,j=0,\ldots,n.}
$$

Here $H$ is the **Hilbert matrix**. Its condition number grows rapidly with the matrix size, so solving these normal equations in the monomial basis can be numerically unstable. A basis of orthogonal polynomials gives a much better-structured Gram matrix.

### 3.5 Example: best linear square approximation of $\sqrt{1+x^2}$

Find $S_1^*(x)=a_0+a_1x$ approximating

$$
f(x)=\sqrt{1+x^2},\qquad x\in[0,1],\qquad\rho(x)=1.
$$

The right-hand side of the normal equations is

$$
\begin{aligned}
d_0&=\int_0^1\sqrt{1+x^2}\,dx
=\frac{\sqrt2+\ln(1+\sqrt2)}2\approx1.1478,\\
d_1&=\int_0^1x\sqrt{1+x^2}\,dx
=\frac{2\sqrt2-1}{3}\approx0.6095.
\end{aligned}
$$

The normal equations are

$$
\begin{pmatrix}1&1/2\\1/2&1/3\end{pmatrix}
\begin{pmatrix}a_0\\a_1\end{pmatrix}
=\begin{pmatrix}d_0\\d_1\end{pmatrix}.
$$

Solving with the unrounded integral values gives

$$
\boxed{\displaystyle S_1^*(x)\approx0.93432+0.42695x.}
$$

The integrated squared error is

$$
\begin{aligned}
\delta_1^2
&=\int_0^1(1+x^2)\,dx-a_0d_0-a_1d_1\\
&\approx7.13\times10^{-4},
\end{aligned}
$$

whereas the maximum absolute error is about $0.066$. Because $\delta_1^2$ is the difference of two nearly equal quantities, using values rounded to only three decimal places can noticeably distort the result (for example, giving an apparent value near $0.0026$). These are different error measures and need not be minimized by the same polynomial.

### 3.6 Example: best linear square approximation of $\sin x$

On $[0,\pi/2]$ with unit weight, seek $S_1^*(x)=ax+b$. The normal equations are

$$
\begin{cases}
\displaystyle \frac{\pi^3}{24}a+\frac{\pi^2}{8}b=\int_0^{\pi/2}x\sin x\,dx=1,\\[6pt]
\displaystyle \frac{\pi^2}{8}a+\frac{\pi}{2}b=\int_0^{\pi/2}\sin x\,dx=1.
\end{cases}
$$

They give

$$
\boxed{\displaystyle S_1^*(x)\approx0.6644x+0.1148.}
$$

## 4. Orthogonal Polynomials

### 4.1 Orthogonal functions and orthogonal polynomial sequences

**Definition (Orthogonal functions).** Two functions $f$ and $g$ are orthogonal on $[a,b]$ with weight $\rho$ if

$$
(f,g)_\rho=\int_a^b\rho(x)f(x)g(x)\,dx=0.
$$

A family $\{\varphi_0,\varphi_1,\ldots\}$ is an **orthogonal family** if

$$
(\varphi_j,\varphi_k)_\rho=0\quad(j\ne k).
$$

If, in addition, $(\varphi_k,\varphi_k)_\rho=1$, it is an **orthonormal family**.

An example of an orthogonal function family on a suitable trigonometric interval is

$$
1,\ \cos x,\ \sin x,\ \cos2x,\ \sin2x,\ldots.
$$

**Definition (Orthogonal polynomials).** An orthogonal polynomial sequence $\{p_n\}_{n\ge0}$ satisfies

$$
\deg p_n=n,\qquad (p_n,p_m)_\rho=0\quad(n\ne m).
$$

A sequence is **monic** if the leading coefficient of every $p_n$ is one.

<span id="orthogonal-polynomial-construction"></span>

### 4.2 Gram--Schmidt orthogonalization

Starting from the monomial basis $1,x,x^2,\ldots$, apply the [Gram--Schmidt process](../math/linear-algebra/Elementary_Linear_Algebra.md#gram-schmidt-process "concept:gram-schmidt-process") with the weighted function inner product and define

$$
\boxed{\begin{aligned}
p_0(x)&=1,\\
p_n(x)&=x^n-\sum_{j=0}^{n-1}\frac{(x^n,p_j)_\rho}{(p_j,p_j)_\rho}\,p_j(x),\qquad n\ge1.
\end{aligned}}
$$

Each $p_n$ is monic of degree $n$ and orthogonal to all preceding polynomials.

**Example (Unit weight on $[-1,1]$).** For $(f,g)=\int_{-1}^1fg\,dx$,

$$
\begin{aligned}
p_0(x)&=1,\\
p_1(x)&=x-\frac{(x,1)}{(1,1)}=x,\\
p_2(x)&=x^2-\frac{(x^2,1)}{(1,1)}-\frac{(x^2,x)}{(x,x)}x=x^2-\frac13,\\
p_3(x)&=x^3-\frac35x.
\end{aligned}
$$

Thus the first monic orthogonal polynomials are

$$
\boxed{\displaystyle 1,\quad x,\quad x^2-\frac13,\quad x^3-\frac35,\ldots.}
$$

### 4.3 General properties

For an orthogonal polynomial sequence $\{p_n\}$:

1. The polynomials $p_0,\ldots,p_n$ are linearly independent and form a basis of $H_n$.
2. Every $q\in H_n$ has a unique expansion $q=\sum_{k=0}^nc_kp_k$.
3. A degree-$n$ orthogonal polynomial is orthogonal to every polynomial of degree less than $n$:

   $$
   (p_n,q)_\rho=0\qquad(\deg q<n).
   $$

4. The polynomials admit a three-term recurrence.
5. If the weight is positive on the interval, a degree-$n$ orthogonal polynomial has exactly $n$ distinct real zeros in $(a,b)$.

**Theorem 4.1 (Three-term recurrence).** For a monic orthogonal polynomial sequence, set $p_{-1}(x)=0$ and $p_0(x)=1$. Then

$$
\boxed{\displaystyle p_{n+1}(x)=(x-\alpha_n)p_n(x)-\beta_np_{n-1}(x),}
$$

where

$$
\boxed{\displaystyle
\alpha_n=\frac{(xp_n,p_n)_\rho}{(p_n,p_n)_\rho},\qquad
\beta_n=\frac{(p_n,p_n)_\rho}{(p_{n-1},p_{n-1})_\rho}>0\quad(n\ge1).}
$$

Proof idea. Expand $xp_n$ in $p_0,\ldots,p_{n+1}$. By orthogonality and symmetry of the inner product,

$$
(xp_n,p_k)_\rho=(p_n,xp_k)_\rho=0\qquad(k\le n-2).
$$

Only the components along $p_{n+1},p_n,p_{n-1}$ remain. Comparing leading coefficients gives the coefficient one in front of $p_{n+1}$. Inner products with $p_n$ and $p_{n-1}$ give $\alpha_n$ and $\beta_n$.

**Theorem 4.2 (Zeros).** Each $p_n$ has $n$ distinct zeros in $(a,b)$.

Proof idea. Suppose $p_n$ changes sign at only $r<n$ distinct points in the interval. Multiplying the corresponding linear factors gives a polynomial $q$ of degree $r$ such that $p_nq$ has a constant sign on $[a,b]$ and is not identically zero. Its weighted integral is nonzero, contradicting $(p_n,q)_\rho=0$.

### 4.4 Legendre polynomials

The **Legendre polynomials** $P_n$ are orthogonal on $[-1,1]$ with weight $\rho(x)=1$.

**Definition (Rodrigues formula).**

$$
\boxed{\displaystyle P_n(x)=\frac1{2^nn!}\frac{d^n}{dx^n}(x^2-1)^n,\qquad n=0,1,\ldots.}
$$

The first polynomials are

$$
\begin{aligned}
P_0(x)&=1,\\
P_1(x)&=x,\\
P_2(x)&=\frac12(3x^2-1),\\
P_3(x)&=\frac12(5x^3-3x),\\
P_4(x)&=\frac18(35x^4-30x^2+3),\\
P_5(x)&=\frac18(63x^5-70x^3+15x),\\
P_6(x)&=\frac1{16}(231x^6-315x^4+105x^2-5).
\end{aligned}
$$

The leading coefficient is

$$
\kappa_n=\frac{(2n)!}{2^n(n!)^2}.
$$

Hence the corresponding **monic Legendre polynomial** is

$$
\boxed{\displaystyle \widetilde P_n(x)=\frac{P_n(x)}{\kappa_n}
=\frac{n!}{(2n)!}\frac{d^n}{dx^n}(x^2-1)^n.}
$$

**Theorem 4.3 (Legendre orthogonality).**

$$
\boxed{\displaystyle \int_{-1}^1P_n(x)P_m(x)\,dx
=\begin{cases}
0,&m\ne n,\\[2pt]
\dfrac2{2n+1},&m=n.
\end{cases}}
$$

Proof. Let $\phi(x)=(x^2-1)^n$ and let $Q$ be a polynomial of degree at most $n$. Integrating Rodrigues' formula by parts $n$ times gives

$$
\int_{-1}^{1}P_n(x)Q(x)\,dx
=\frac{(-1)^n}{2^nn!}\int_{-1}^{1}(x^2-1)^nQ^{(n)}(x)\,dx.
$$

All boundary terms vanish because $\phi$ and its first $n-1$ derivatives vanish at $\pm1$. If $\deg Q<n$, then $Q^{(n)}=0$ and the integral is zero. Choosing $Q=P_n$ and using $P_n^{(n)}=(2n)!/(2^nn!)$ yields the stated squared norm.

**Parity.**

$$
\boxed{\displaystyle P_n(-x)=(-1)^nP_n(x).}
$$

In particular, $P_{2k}$ is even and $P_{2k+1}$ is odd.

**Three-term recurrence.**

$$
\boxed{\displaystyle (n+1)P_{n+1}(x)=(2n+1)xP_n(x)-nP_{n-1}(x),\quad n\ge1.}
$$

The recurrence, together with $P_0=1$ and $P_1=x$, constructs the entire sequence without taking high-order derivatives. Every $P_n$ has $n$ distinct zeros in $(-1,1)$.

### 4.5 Chebyshev polynomials of the first kind

The **Chebyshev polynomials** $T_n$ are orthogonal on $[-1,1]$ with weight

$$
\rho(x)=\frac1{\sqrt{1-x^2}}.
$$

**Definition.** For $x\in[-1,1]$, write $x=\cos\theta$. Define

$$
\boxed{\displaystyle T_n(x)=\cos(n\arccos x)=\cos(n\theta).}
$$

From $\cos((n+1)\theta)=2\cos\theta\cos(n\theta)-\cos((n-1)\theta)$,

$$
\boxed{\displaystyle T_{n+1}(x)=2xT_n(x)-T_{n-1}(x),\qquad T_0=1,\quad T_1=x.}
$$

For example,

$$
\begin{aligned}
T_2(x)&=2x^2-1,\\
T_3(x)&=4x^3-3x,\\
T_4(x)&=8x^4-8x^2+1,\\
T_5(x)&=16x^5-20x^3+5x,\\
T_6(x)&=32x^6-48x^4+18x^2-1.
\end{aligned}
$$

**Orthogonality.** Substituting $x=\cos\theta$ gives

$$
\begin{aligned}
\int_{-1}^1\frac{T_m(x)T_n(x)}{\sqrt{1-x^2}}\,dx
&=\int_0^\pi\cos(m\theta)\cos(n\theta)\,d\theta\\
&=\begin{cases}
0,&m\ne n,\\[2pt]
\pi,&m=n=0,\\[2pt]
\dfrac\pi2,&m=n\ge1.
\end{cases}
\end{aligned}
$$

**Parity and leading coefficient.**

$$
T_n(-x)=(-1)^nT_n(x),
\qquad [x^n]T_n(x)=2^{n-1}\quad(n\ge1).
$$

**Zeros.** The $n$ distinct zeros of $T_n$ are

$$
\boxed{\displaystyle x_k=\cos\frac{(2k-1)\pi}{2n},\qquad k=1,\ldots,n.}
$$

**Extrema.** The $n+1$ extrema occur at

$$
\boxed{\displaystyle \xi_k=\cos\frac{k\pi}{n},\qquad k=0,\ldots,n,}
$$

and satisfy

$$
T_n(\xi_k)=(-1)^k,\qquad
\max_{x\in[-1,1]}|T_n(x)|=1.
$$

These equal-amplitude alternating extrema connect Chebyshev polynomials to best uniform approximation.

### 4.6 Chebyshev polynomials and the minimum-zero-deviation problem

For $n\ge1$, the monic Chebyshev polynomial is

$$
\widetilde T_n(x)=2^{1-n}T_n(x).
$$

**Theorem 4.4 (Minimum-zero-deviation polynomial).** Among all monic polynomials of degree $n$,

$$
\boxed{\displaystyle \min_{q(x)=x^n+\cdots}\max_{x\in[-1,1]}|q(x)|
=\max_{x\in[-1,1]}|\widetilde T_n(x)|
=\frac1{2^{n-1}}.}
$$

The minimizer is $\widetilde T_n$.

Proof. The polynomial $\widetilde T_n$ has $n+1$ ordered extrema whose values alternate between $\pm2^{1-n}$. If another monic degree-$n$ polynomial $q$ had strictly smaller maximum absolute value, the difference $q-\widetilde T_n$ would alternate in sign at these $n+1$ points. It would then have at least $n$ distinct zeros. But the leading terms cancel, so $\deg(q-\widetilde T_n)\le n-1$, a contradiction. The alternation theorem also gives uniqueness.

**Corollary.** The best uniform approximation of $x^n$ by polynomials of degree at most $n-1$ is

$$
\boxed{\displaystyle p_{n-1}^*(x)=x^n-\widetilde T_n(x),}
$$

with minimum deviation $2^{1-n}$.

### 4.7 Monic Legendre polynomials minimize square error

**Theorem 4.5.** Among all monic degree-$n$ polynomials on $[-1,1]$, the monic Legendre polynomial $\widetilde P_n$ has the smallest square norm with unit weight:

$$
\boxed{\displaystyle \|\widetilde P_n\|_2^2
=\min_{q(x)=x^n+\cdots}\int_{-1}^1q(x)^2\,dx.}
$$

Proof. Every monic degree-$n$ polynomial can be written as

$$
q(x)=\widetilde P_n(x)+\sum_{k=0}^{n-1}c_k\widetilde P_k(x).
$$

Orthogonality gives

$$
\|q\|_2^2=\|\widetilde P_n\|_2^2
+\sum_{k=0}^{n-1}c_k^2\|\widetilde P_k\|_2^2
\ge\|\widetilde P_n\|_2^2.
$$

Equality holds only when every $c_k=0$.

The distinction is important: the **monic Chebyshev polynomial minimizes the maximum norm**, while the **monic Legendre polynomial minimizes the square norm** on $[-1,1]$ with their respective criteria.


## 5. Chebyshev Nodes and Interpolation Error

### 5.1 Choosing interpolation nodes

For $n+1$ distinct interpolation nodes $x_0,\ldots,x_n\in[-1,1]$, write

$$
\omega_{n+1}(x)=\prod_{k=0}^{n}(x-x_k).
$$

If $f\in C^{n+1}[-1,1]$ and $L_n$ is its degree-$n$ interpolation polynomial, the interpolation remainder is

$$
f(x)-L_n(x)=\frac{f^{(n+1)}(\xi_x)}{(n+1)!}\omega_{n+1}(x).
$$

Consequently, with $M_{n+1}=\max_{[-1,1]}|f^{(n+1)}|$,

$$
\boxed{\displaystyle \|f-L_n\|_\infty
\le\frac{M_{n+1}}{(n+1)!}\|\omega_{n+1}\|_\infty.}
$$

The derivative bound depends on $f$. Node selection controls the second factor, $\|\omega_{n+1}\|_\infty$.

Because $\omega_{n+1}$ is monic of degree $n+1$, the minimum-zero-deviation theorem implies that the smallest possible value of its uniform norm is attained when

$$
\omega_{n+1}(x)=\widetilde T_{n+1}(x)=2^{-n}T_{n+1}(x).
$$

Thus the optimal nodes for this interpolation-error bound are the zeros of $T_{n+1}$.

### 5.2 Chebyshev zeros and extrema

**Definition (Chebyshev interpolation nodes).** The $n+1$ roots of $T_{n+1}$ are

$$
\boxed{\displaystyle x_k=\cos\frac{(2k+1)\pi}{2(n+1)},\qquad k=0,1,\ldots,n.}
$$

They cluster toward the two endpoints of the interval.

The extrema of $T_n$ form a related set of $n+1$ nodes:

$$
\xi_k=\cos\frac{k\pi}{n},\qquad k=0,\ldots,n.
$$

The first set contains the **zeros** of $T_{n+1}$; the second contains the **extrema** of $T_n$. They are not the same node set.

**Theorem 5.1 (Error bound for Chebyshev-zero interpolation).** If the interpolation nodes are the zeros of $T_{n+1}$, then

$$
\boxed{\displaystyle \|f-L_n\|_\infty
\le\frac{\|f^{(n+1)}\|_\infty}{2^n(n+1)!}.}
$$

Proof. The nodal polynomial is $\omega_{n+1}(x)=2^{-n}T_{n+1}(x)$, and $\|T_{n+1}\|_\infty=1$. Substitute this into the interpolation remainder bound.

This is the smallest bound obtainable from the same derivative estimate by varying $n+1$ nodes in $[-1,1]$. In particular, whenever the right-hand side tends to zero as $n\to\infty$, the interpolants converge uniformly to $f$.

### 5.3 Transformation to an arbitrary finite interval

Map $t\in[-1,1]$ to $x\in[a,b]$ by

$$
\boxed{\displaystyle x=\frac{b-a}{2}t+\frac{a+b}{2},\qquad
t=\frac{2x-a-b}{b-a}.}
$$

The corresponding Chebyshev interpolation nodes on $[a,b]$ are

$$
\boxed{\displaystyle x_k=\frac{a+b}{2}+\frac{b-a}{2}
\cos\frac{(2k+1)\pi}{2(n+1)},\qquad k=0,\ldots,n.}
$$

Since

$$
\omega_{n+1}(x)=\left(\frac{b-a}{2}\right)^{n+1}\prod_{k=0}^n(t-t_k),
$$

we obtain

$$
\max_{x\in[a,b]}|\omega_{n+1}(x)|
=\frac{(b-a)^{n+1}}{2^{2n+1}}.
$$

**Corollary.** For Chebyshev-zero interpolation on $[a,b]$,

$$
\boxed{\displaystyle \|f-L_n\|_{\infty,[a,b]}
\le\frac{(b-a)^{n+1}}{2^{2n+1}(n+1)!}
\max_{x\in[a,b]}|f^{(n+1)}(x)|.}
$$

### 5.4 Example: fourth-degree interpolation of $e^x$

Approximate $f(x)=e^x$ on $[0,1]$ with a degree-four Lagrange interpolant. Here $n=4$, so the nodes are

$$
x_k=\frac12\left(1+\cos\frac{(2k+1)\pi}{10}\right),\qquad k=0,\ldots,4.
$$

Numerically, in descending order,

$$
(x_0,x_1,x_2,x_3,x_4)\approx(0.97553,0.79389,0.50000,0.20611,0.02447).
$$

Construct $L_4$ from the five values $e^{x_k}$ using either the Lagrange formula or Newton divided differences.

Because $f^{(5)}(x)=e^x$ and $\|f^{(5)}\|_{\infty,[0,1]}=e$, the error satisfies

$$
\boxed{\displaystyle \|e^x-L_4(x)\|_{\infty,[0,1]}
\le\frac{e}{2^9\,5!}<4.5\times10^{-5}.}
$$

### 5.5 Example: the Runge phenomenon

Consider

$$
f(x)=\frac1{1+x^2},\qquad x\in[-5,5].
$$

High-degree interpolation at equally spaced nodes can produce large endpoint oscillations. For a degree-ten interpolant, choose instead the eleven Chebyshev-zero nodes

$$
\boxed{\displaystyle x_k=5\cos\frac{(2k+1)\pi}{22},\qquad k=0,\ldots,10.}
$$

These points are more concentrated near $-5$ and $5$. The degree-ten interpolant constructed from them avoids the pronounced endpoint oscillations seen in the corresponding equally spaced interpolation example. This is a practical reason to prefer Chebyshev-type nodes in high-degree polynomial interpolation.


## 6. Orthogonal Expansion and Best Square Approximation

### 6.1 Approximation in an orthogonal basis

Suppose $\varphi_0,\ldots,\varphi_n$ are mutually orthogonal with respect to $(\cdot,\cdot)_\rho$. The normal equations simplify to

$$
(\varphi_k,\varphi_k)_\rho a_k^*=(f,\varphi_k)_\rho.
$$

Therefore,

$$
\boxed{\displaystyle a_k^*=\frac{(f,\varphi_k)_\rho}{(\varphi_k,\varphi_k)_\rho},\qquad
S_n^*(x)=\sum_{k=0}^n\frac{(f,\varphi_k)_\rho}{(\varphi_k,\varphi_k)_\rho}\,\varphi_k(x).}
$$

The Gram matrix is diagonal instead of dense. Each coefficient can be computed independently.

**Square-error formula.** By orthogonality,

$$
\boxed{\displaystyle \|f-S_n^*\|_{2,\rho}^{2}
=\|f\|_{2,\rho}^{2}
-\sum_{k=0}^n\frac{(f,\varphi_k)_\rho^2}{(\varphi_k,\varphi_k)_\rho}.}
$$

**Theorem 6.1 (Bessel inequality).** For every finite orthogonal family,

$$
\boxed{\displaystyle
\sum_{k=0}^n\frac{(f,\varphi_k)_\rho^2}{(\varphi_k,\varphi_k)_\rho}
\le\|f\|_{2,\rho}^2.}
$$

Proof. The left-hand side equals $\|S_n^*\|_{2,\rho}^2$. The orthogonal decomposition $f=S_n^*+(f-S_n^*)$ gives

$$
\|f\|_{2,\rho}^2=\|S_n^*\|_{2,\rho}^2+\|f-S_n^*\|_{2,\rho}^2.
$$

### 6.2 Convergence of best square polynomial approximations

**Theorem 6.2 (Square-mean convergence).** Let $f\in C[a,b]$, and assume the weight is integrable and defines the weighted square norm. If $S_n^*$ is the best approximation of $f$ among polynomials of degree at most $n$, then

$$
\boxed{\displaystyle \lim_{n\to\infty}\|f-S_n^*\|_{2,\rho}=0.}
$$

Proof. By the Weierstrass theorem, for any $\varepsilon>0$ there is a polynomial $q$ such that $\|f-q\|_\infty<\varepsilon$. For $n\ge\deg q$, optimality gives

$$
\begin{aligned}
\|f-S_n^*\|_{2,\rho}
&\le\|f-q\|_{2,\rho}\\
&\le\varepsilon\left(\int_a^b\rho(x)\,dx\right)^{1/2}.
\end{aligned}
$$

Since $\varepsilon$ is arbitrary, the error tends to zero.

### 6.3 Legendre expansion on $[-1,1]$

With unit weight and Legendre polynomials,

$$
S_n^*(x)=\sum_{k=0}^na_k^*P_k(x),
$$

where

$$
\boxed{\displaystyle a_k^*=\frac{(f,P_k)}{(P_k,P_k)}
=\frac{2k+1}{2}\int_{-1}^1f(x)P_k(x)\,dx.}
$$

The corresponding squared error is

$$
\boxed{\displaystyle \|f-S_n^*\|_2^2
=\int_{-1}^1f(x)^2\,dx-\sum_{k=0}^n\frac{2}{2k+1}(a_k^*)^2.}
$$

**Example: cubic best square approximation of $e^x$.** Let $f(x)=e^x$ on $[-1,1]$ and seek a cubic polynomial. Compute the first four inner products:

$$
\begin{aligned}
(f,P_0)&=e-\frac1e,\\
(f,P_1)&=\frac2e,\\
(f,P_2)&=e-\frac7e,\\
(f,P_3)&=\frac{37}{e}-5e.
\end{aligned}
$$

Using $a_k^*=(2k+1)(f,P_k)/2$ gives approximately

$$
\begin{aligned}
a_0^*&\approx1.1752,&a_1^*&\approx1.1036,\\
a_2^*&\approx0.3578,&a_3^*&\approx0.07046.
\end{aligned}
$$

Thus

$$
\begin{aligned}
S_3^*(x)
&=a_0^*P_0(x)+a_1^*P_1(x)+a_2^*P_2(x)+a_3^*P_3(x)\\
&\approx\boxed{\displaystyle 0.9963+0.9979x+0.5367x^2+0.1761x^3.}
\end{aligned}
$$

The example gives approximately

$$
\|e^x-S_3^*\|_2\le0.0084,
\qquad
\|e^x-S_3^*\|_\infty\le0.0112.
$$

For an arbitrary finite interval $[a,b]$, transform it to $[-1,1]$ by

$$
t=\frac{2x-a-b}{b-a},\qquad F(t)=f\left(\frac{b-a}{2}t+\frac{a+b}{2}\right),
$$

construct the Legendre approximation $S_n^*(t)$ of $F$, and then substitute $t=(2x-a-b)/(b-a)$.

### 6.4 Generalized Fourier series

Let $\{\varphi_k\}_{k\ge0}$ be an orthogonal family and set

$$
c_k=\frac{(f,\varphi_k)_\rho}{(\varphi_k,\varphi_k)_\rho}.
$$

The formal expansion

$$
\boxed{\displaystyle f(x)\sim\sum_{k=0}^{\infty}c_k\varphi_k(x)}
$$

is called the **generalized Fourier series** of $f$ relative to the orthogonal family. Its degree-$n$ partial sum is the best square approximation in $\operatorname{span}\{\varphi_0,\ldots,\varphi_n\}$.

### 6.5 Chebyshev series

For Chebyshev polynomials of the first kind, write

$$
\boxed{\displaystyle f(x)\sim\frac{c_0}{2}+\sum_{k=1}^{\infty}c_kT_k(x),}
$$

where

$$
\boxed{\displaystyle c_k=\frac2\pi\int_{-1}^1
\frac{f(x)T_k(x)}{\sqrt{1-x^2}}\,dx
=\frac2\pi\int_0^\pi f(\cos\theta)\cos(k\theta)\,d\theta,\quad k\ge0.}
$$

The finite partial sum is

$$
C_n(x)=\frac{c_0}{2}+\sum_{k=1}^nc_kT_k(x).
$$

The coefficient of $T_0$ is written as $c_0/2$ because $\|T_0\|_{2,\rho}^{2}=\pi$, whereas $\|T_k\|_{2,\rho}^{2}=\pi/2$ for $k\ge1$.

Under sufficient smoothness—for example, when $f$ has a piecewise-continuous second derivative on $[-1,1]$—the Chebyshev series converges uniformly to $f$:

$$
\lim_{n\to\infty}\max_{x\in[-1,1]}|f(x)-C_n(x)|=0.
$$


## 7. Least-Squares Curve Fitting

### 7.1 Why fitting differs from interpolation

Suppose we have $m+1$ observations

$$
(x_0,y_0),\ (x_1,y_1),\ldots,(x_m,y_m).
$$

Interpolation imposes the exact conditions

$$
p(x_i)=y_i\qquad(i=0,\ldots,m).
$$

These conditions may be unsuitable when the observations contain measurement errors, or when the number of data points is much larger than the number of parameters needed to represent the underlying trend.

For example, a falling object's displacement is modeled by

$$
s(t)=v_0t+\frac12gt^2.
$$

Even if its displacement is measured at many time instants, the model has only two unknown parameters. Fitting a high-degree interpolating polynomial through all measured positions is not the same as estimating $v_0$ and $g$, and it may introduce oscillations unrelated to the physical model.

**Definition (Curve fitting).** Given an approximation class $\Phi$, seek $S\in\Phi$ such that the residual vector

$$
r(S)=\bigl(y_0-S(x_0),\ldots,y_m-S(x_m)\bigr)
$$

has minimal norm.

Three natural criteria are

$$
\begin{aligned}
&\min_{S\in\Phi}\max_i|y_i-S(x_i)|, &&\text{maximum-error fitting},\\
&\min_{S\in\Phi}\sum_i|y_i-S(x_i)|, &&\text{absolute-error fitting},\\
&\min_{S\in\Phi}\sum_i[y_i-S(x_i)]^2, &&\text{least squares}.
\end{aligned}
$$

Least squares is convenient because the objective is differentiable and leads to linear normal equations when the model is linear in its parameters. The method became important in astronomy and geodesy; Legendre published the least-squares method in 1805, and Gauss connected it to the theory of observational errors.

### 7.2 Discrete weighted inner product

Choose nonnegative observation weights $\omega_i$ and define

$$
\boxed{\displaystyle (u,v)_d=\sum_{i=0}^m\omega_i u(x_i)v(x_i),\qquad
\|u\|_d^2=\sum_{i=0}^m\omega_i u(x_i)^2.}
$$

Positive weights give greater importance to the corresponding observations. If all $\omega_i=1$, the problem is ordinary unweighted least squares.

Let

$$
\Phi_n=\operatorname{span}\{\varphi_0,\ldots,\varphi_n\},
\qquad S(x)=\sum_{j=0}^na_j\varphi_j(x).
$$

The discrete least-squares problem is

$$
\boxed{\displaystyle
\min_{a_0,\ldots,a_n}I(a_0,\ldots,a_n),\qquad
I=\sum_{i=0}^m\omega_i\left[y_i-\sum_{j=0}^na_j\varphi_j(x_i)\right]^2.}
$$

In the usual overdetermined setting, $m+1>n+1$; exact interpolation of every observation is neither required nor generally possible.

<span id="discrete-least-squares"></span>

### 7.3 Normal equations for discrete least squares

Differentiating the objective with respect to $a_k$ gives

$$
\frac{\partial I}{\partial a_k}
=-2\sum_{i=0}^m\omega_i\left[y_i-\sum_{j=0}^na_j\varphi_j(x_i)\right]\varphi_k(x_i)=0.
$$

Rearranging,

$$
\boxed{\displaystyle
\sum_{j=0}^n\left[\sum_{i=0}^m\omega_i\varphi_k(x_i)\varphi_j(x_i)\right]a_j
=\sum_{i=0}^m\omega_i y_i\varphi_k(x_i),\quad k=0,\ldots,n.}
$$

These are the **discrete normal equations**:

$$
\boxed{\displaystyle Ga=d,\qquad
G_{kj}=(\varphi_k,\varphi_j)_d,\qquad
 d_k=(f,\varphi_k)_d,\quad f(x_i)=y_i.}
$$

For a design matrix $A$ with $A_{ij}=\varphi_j(x_i)$ and diagonal weight matrix $W=\operatorname{diag}(\omega_0,\ldots,\omega_m)$, they can equivalently be written as

$$
\boxed{\displaystyle A^TWA\,a=A^TWy.}
$$

**Orthogonality of the residual.** The fitted residual satisfies

$$
(f-S^*,\varphi_k)_d=0\qquad(k=0,\ldots,n).
$$

The discrete least-squares solution is therefore an [orthogonal projection](../math/linear-algebra/Elementary_Linear_Algebra.md#orthogonal-projection "concept:orthogonal-projection") under the discrete weighted inner product, just as in continuous best square approximation.

<span id="polynomial-least-squares-uniqueness"></span>

### 7.4 Uniqueness and the Haar condition

The normal equations have a unique solution if their Gram matrix is nonsingular, equivalently if the design-matrix columns are linearly independent on the data nodes with positive weights.

Equivalently, the sampling map from coefficient vectors to values on the positive-weight nodes has trivial kernel. In finite dimensions, the [rank–nullity theorem](../math/linear-algebra/Linear_Maps.md#rank-nullity "concept:rank-nullity") turns this injectivity condition into the full-column-rank criterion.

**Definition (Haar condition).** A family $\varphi_0,\ldots,\varphi_n$ satisfies the Haar condition on the observation nodes if every nonzero linear combination

$$
q(x)=\sum_{j=0}^nc_j\varphi_j(x)
$$

has at most $n$ distinct zeros among the nodes.

**Theorem 7.1 (Uniqueness under the Haar condition).** With at least $n+1$ distinct nodes carrying positive weights, the Haar condition guarantees that $G$ is positive definite and the least-squares fit is unique.

Proof. If $c\ne0$, the Haar condition guarantees at least one sampled point where $q(x_i)\ne0$. Consequently,

$$
c^TGc=\sum_{i=0}^m\omega_i q(x_i)^2>0.
$$

For the polynomial basis $1,x,\ldots,x^n$, the Haar condition is automatic on distinct nodes by the [polynomial root bound](../math/linear-algebra/polynomial-theory.md#polynomial-root-bound "concept:polynomial-root-bound"): a nonzero polynomial of degree at most $n$ cannot have more than $n$ distinct zeros.

### 7.5 Linear least-squares fitting

Choose the linear model

$$
S_1(x)=a+bx.
$$

For unweighted data, minimize

$$
I(a,b)=\sum_{i=1}^N[y_i-a-bx_i]^2.
$$

The normal equations are

$$
\boxed{\begin{aligned}
Na+b\sum_{i=1}^Nx_i&=\sum_{i=1}^Ny_i,\\
a\sum_{i=1}^Nx_i+b\sum_{i=1}^Nx_i^2&=\sum_{i=1}^Nx_iy_i.
\end{aligned}}
$$

**Example 1 (Eight observations).** Consider

| $x_i$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| $y_i$ | $1.4$ | $1.3$ | $1.4$ | $1.1$ | $1.3$ | $1.8$ | $1.6$ | $2.3$ |

The sums are

$$
\sum x_i=28,\qquad \sum x_i^2=140,\qquad
\sum y_i=12.2,\qquad\sum x_iy_i=47.3.
$$

Hence

$$
\begin{cases}8a+28b=12.2,\\28a+140b=47.3.\end{cases}
$$

Solving,

$$
\boxed{\displaystyle S_1(x)\approx1.142+0.110x.}
$$

**Example 2 (Repeated observation nodes).** Fit a line to

$$
\begin{aligned}
x&=(1,1,2,3,3,3,4,5),\\
y&=(4,4,4.5,6,6,6,8,8.5).
\end{aligned}
$$

Repeated observations at the same $x$ are retained as separate observations, or equivalently represented by weights. Here

$$
\sum1=8,\quad\sum x_i=22,\quad\sum x_i^2=74,
\quad\sum y_i=47,\quad\sum x_iy_i=145.5.
$$

The normal equations are

$$
\begin{cases}8a+22b=47,\\22a+74b=145.5.\end{cases}
$$

Solving these equations gives

$$
\boxed{\displaystyle S_1(x)\approx2.5648+1.2037x.}
$$

Substitution into both normal equations verifies the coefficients. The rounded pair $a=2.77$, $b=1.13$ does not satisfy the stated equations and therefore is not the solution for these observations.

For example, in MATLAB an unweighted polynomial fit can be obtained using

```matlab
x = [1 1 2 3 3 3 4 5];
y = [4 4 4.5 6 6 6 8 8.5];
p = polyfit(x, y, 1);
y_fit = polyval(p, x);
```

The coefficient vector `p` is ordered from the highest power to the constant term.

### 7.6 Linearization of a nonlinear fitting model

Consider an exponential model

$$
\boxed{\displaystyle S(x)=ae^{bx},\qquad a>0.}
$$

Taking logarithms gives

$$
\ln S(x)=\ln a+bx=A+bx,\qquad A=\ln a.
$$

Thus the nonlinear-looking model becomes linear in the transformed observations

$$
Y_i=\ln y_i,\qquad Y_i\approx A+bx_i.
$$

After fitting $A$ and $b$ by linear least squares, recover

$$
\boxed{\displaystyle a=e^A.}
$$

**Example.** The observations are

| $x_i$ | $1.00$ | $1.25$ | $1.50$ | $1.75$ | $2.00$ |
|---|---:|---:|---:|---:|---:|
| $y_i$ | $5.10$ | $5.79$ | $6.53$ | $7.45$ | $8.46$ |

Using the transformed values $Y_i=\ln y_i$, fit $Y=A+bx$, then reconstruct $S(x)=e^Ae^{bx}$.

```matlab
x = [1.00 1.25 1.50 1.75 2.00];
y = [5.10 5.79 6.53 7.45 8.46];
Y = log(y);
p = polyfit(x, Y, 1);
b = p(1);
a = exp(p(2));
y_fit = a * exp(b .* x);
plot(x, y, 'r*', x, y_fit, 'b');
```

The logarithmic transformation minimizes squared errors in the **logarithms** of the observations, not squared errors in the original $y_i$ values. It is therefore a convenient linearized fitting criterion rather than an identical reformulation of the original nonlinear least-squares objective.

### 7.7 Least squares with discrete orthogonal polynomials

If $P_0,\ldots,P_n$ are orthogonal at the observation nodes with respect to the discrete inner product,

$$
(P_j,P_k)_d=\sum_{i=0}^m\omega_iP_j(x_i)P_k(x_i)
=\begin{cases}0,&j\ne k,\\h_k,&j=k,\end{cases}
$$

then the fitted polynomial

$$
S_n^*(x)=\sum_{k=0}^na_k^*P_k(x)
$$

has coefficients

$$
\boxed{\displaystyle a_k^*=\frac{(f,P_k)_d}{(P_k,P_k)_d}
=\frac{\sum_{i=0}^m\omega_i y_iP_k(x_i)}{\sum_{i=0}^m\omega_iP_k(x_i)^2}.}
$$

The minimum weighted squared residual is

$$
\boxed{\displaystyle \|f-S_n^*\|_d^2
=\|f\|_d^2-\sum_{k=0}^n(a_k^*)^2h_k.}
$$

**Constructing the discrete orthogonal basis.** Start with $P_{-1}=0$, $P_0=1$ and use

$$
\boxed{\displaystyle P_{k+1}(x)=(x-\alpha_k)P_k(x)-\beta_kP_{k-1}(x),}
$$

where

$$
\alpha_k=\frac{(xP_k,P_k)_d}{(P_k,P_k)_d},\qquad
\beta_k=\frac{(P_k,P_k)_d}{(P_{k-1},P_{k-1})_d}\quad(k\ge1).
$$

Because the recurrence produces monic orthogonal polynomials, the fitted curve can be constructed incrementally by adding $a_k^*P_k(x)$ at each degree. The squared-error formula also
