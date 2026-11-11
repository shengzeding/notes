---
title: Iterative Methods for Linear Systems
order: 5
---

# Iterative Methods for Linear Systems

## 1. Matrix Sequences and Spectral Radius

### 1.1 Matrix convergence

A sequence $A_k=(a_{ij}^{(k)})$ converges to $A=(a_{ij})$ if every entry converges. In finite dimensions,

$$
\boxed{A_k\to A\quad\Longleftrightarrow\quad\|A_k-A\|\to0}
$$

for any matrix norm.

For the maximum row-sum norm, this follows from

$$
\max_{i,j}|a_{ij}^{(k)}-a_{ij}|
\le\|A_k-A\|_\infty
\le n\max_{i,j}|a_{ij}^{(k)}-a_{ij}|.
$$

Equivalence of norms gives the same conclusion for every other norm on the fixed-dimensional matrix space.

Recall that $\rho(B)=\max_i|\lambda_i(B)|\le\|B\|$. For every $\varepsilon>0$, there exists an induced norm such that

$$
\rho(B)\le\|B\|_\varepsilon\le\rho(B)+\varepsilon.
$$

The norm may depend on both $B$ and $\varepsilon$.

A change of coordinates provides such norms: if $P$ is nonsingular, then $\|x\|_P=\|Px\|$ induces $\|B\|_P=\|PBP^{-1}\|$. A suitable scaling of the Jordan form makes its off-diagonal part arbitrarily small.

### 1.2 Powers of a matrix

**Theorem.** The following conditions are equivalent:

$$
\boxed{B^k\to0
\quad\Longleftrightarrow\quad\rho(B)<1
\quad\Longleftrightarrow\quad
\text{some induced norm satisfies }\|B\|<1.}
$$

If $\rho(B)<1$, choose $\varepsilon$ small enough that $\rho(B)+\varepsilon<1$. The adapted norm then gives $\|B^k\|\le\|B\|^k\to0$. Conversely, $B^k\to0$ forces every eigenvalue to satisfy $\lambda^k\to0$, hence $|\lambda|<1$.

**Gelfand's formula.** For any matrix norm,

$$
\boxed{\displaystyle\lim_{k\to\infty}\|B^k\|^{1/k}=\rho(B).}
$$

Thus the spectral radius determines the asymptotic decay of matrix powers, although early powers may grow.

## 2. Stationary Iteration

<span id="stationary-linear-iteration"></span>

### 2.1 Fixed-point form and convergence

Rewrite the nonsingular system $Ax=b$ equivalently as $x=Bx+g$, and construct

$$
\boxed{x^{(k+1)}=Bx^{(k)}+g.}
$$

The method is **stationary** because $B$ and $g$ are fixed. For the exact solution $x^*$, the error satisfies

$$
\boxed{e^{(k)}=x^*-x^{(k)}=B^ke^{(0)}.}
$$

Subtracting the iteration from $x^*=Bx^*+g$ gives $e^{(k+1)}=Be^{(k)}$. Repeating this identity yields the formula above, so convergence is determined by the powers of $B$ rather than by $g$.

**Theorem.** The iteration converges to $x^*$ for every initial guess if and only if $\rho(B)<1$.

Sufficiency follows from $B^k\to0$. For necessity, convergence from every initial guess means $B^ke\to0$ for every initial error $e$. Taking the coordinate vectors shows that every column of $B^k$ tends to zero.

Convergence from one special initial guess is weaker: its error may have no component in a nondecaying mode even if $\rho(B)\ge1$.

A sufficient test is $\|B\|<1$ in an induced norm. If a chosen norm gives $\|B\|\ge1$, the test is inconclusive.

### 2.2 Error estimates

If $q=\|B\|<1$, then

$$
\boxed{\begin{aligned}
\|e^{(k)}\|&\le q^k\|e^{(0)}\|,\\
\|e^{(k)}\|&\le\frac{q^k}{1-q}\|x^{(1)}-x^{(0)}\|,\\
\|e^{(k)}\|&\le\frac{q}{1-q}\|x^{(k)}-x^{(k-1)}\|,\qquad k\ge1.
\end{aligned}}
$$

The second bound is a priori; the third is a posteriori. They follow from $x^{(k+1)}-x^{(k)}=B(x^{(k)}-x^{(k-1)})$ and a geometric series.

In particular, write $d^{(k)}=x^{(k)}-x^{(k-1)}$. Then

$$
x^*-x^{(k)}=\sum_{j=k+1}^{\infty}d^{(j)},\qquad
\|d^{(k+\ell)}\|\le q^\ell\|d^{(k)}\|.
$$

Summing these bounds gives the a posteriori estimate. The factor $q/(1-q)$ becomes large when $q$ is close to one, so a small update can still correspond to a substantial error.

### 2.3 Asymptotic rate

For $0<\rho(B)<1$, define

$$
\boxed{R(B)=-\log\rho(B).}
$$

A smaller spectral radius gives a larger asymptotic convergence rate. For any $\delta>0$ with $\rho(B)+\delta<1$, there exists $K$ such that

$$
\|e^{(k)}\|\le(\rho(B)+\delta)^k\|e^{(0)}\|,\qquad k\ge K.
$$

To reduce the initial error by a factor $0<\tau<1$, the asymptotic estimate is

$$
k\ge\max\left\{K,
\left\lceil\frac{\log\tau}{\log(\rho(B)+\delta)}\right\rceil\right\}.
$$

If $\rho(B)=0$, then $B$ is nilpotent and convergence occurs in finitely many steps in exact arithmetic.

The rate is an asymptotic worst-case description. A particular initial error may decay faster, and the spectral radius alone does not describe transient growth or the cost of one iteration.

## 3. Matrix Splittings and Richardson Iteration

### 3.1 Matrix splitting

Write $A=M-N$ with $M$ nonsingular. Then

$$
\boxed{Mx^{(k+1)}=Nx^{(k)}+b,\qquad B=M^{-1}N.}
$$

With $r^{(k)}=b-Ax^{(k)}$, this is

$$
x^{(k+1)}=x^{(k)}+M^{-1}r^{(k)}.
$$

Choose $M$ so that solving with it is inexpensive and $\rho(M^{-1}N)<1$. Solve with $M$ directly rather than forming its inverse.

The extreme choice $M=A$ would solve the problem in one step but require the original solve itself. Useful splittings replace this with a diagonal or triangular system that is cheap enough to solve repeatedly.

### 3.2 Richardson iteration

The Richardson update is

$$
\boxed{x^{(k+1)}=x^{(k)}+\nu(b-Ax^{(k)}),\qquad B_\nu=I-\nu A.}
$$

For symmetric positive definite $A$, convergence for every initial guess is equivalent to

$$
\boxed{\displaystyle0<\nu<\frac{2}{\lambda_{\max}(A)}.}
$$

The basic method uses $\nu=1$, requiring $\lambda_{\max}(A)<2$.

Because $B_\nu=I-\nu A$, its eigenvalues are $1-\nu\lambda_i$. Positive definiteness gives $\lambda_i>0$, so requiring $|1-\nu\lambda_i|<1$ for every $i$ produces the stated parameter interval.

The optimal constant parameter balances the two extreme eigenvalues.

The largest amplification is

$$
\rho(B_\nu)=\max\{|1-\nu\lambda_{\min}|,
|1-\nu\lambda_{\max}|\}.
$$

At the optimum, $1-\nu\lambda_{\min}=-(1-\nu\lambda_{\max})$, giving

$$
\boxed{\displaystyle
\nu_{\mathrm{opt}}=\frac{2}{\lambda_{\max}+\lambda_{\min}},\qquad
\rho(B_{\nu_{\mathrm{opt}}})
=\frac{\lambda_{\max}-\lambda_{\min}}{\lambda_{\max}+\lambda_{\min}}
=\frac{\kappa_2(A)-1}{\kappa_2(A)+1}.}
$$

Large condition numbers therefore lead to slow convergence even with the optimal parameter.

## 4. Jacobi and Gauss–Seidel Methods

### 4.1 Splitting convention

Use

$$
\boxed{A=D-L-U,}
$$

where $D$ is the diagonal of $A$, and $-L,-U$ are its strict lower and upper triangular parts. Assume $a_{ii}\ne0$.

### 4.2 Jacobi iteration

<span id="jacobi-iteration"></span>

Choose $M=D$:

$$
Dx^{(k+1)}=(L+U)x^{(k)}+b,\qquad
\boxed{B_J=D^{-1}(L+U).}
$$

Componentwise,

$$
\boxed{\displaystyle x_i^{(k+1)}=
\frac{b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}}{a_{ii}}.}
$$

All components use the old iterate, so their updates can be computed independently.

The old vector must remain available until all new components have been calculated. Updating it in place would change the method. Diagonal division is the only solve required in a Jacobi sweep.

### 4.3 Gauss–Seidel iteration

<span id="gauss-seidel-iteration"></span>

Choose $M=D-L$:

$$
(D-L)x^{(k+1)}=Ux^{(k)}+b,\qquad
\boxed{B_G=(D-L)^{-1}U.}
$$

Componentwise,

$$
\boxed{\displaystyle x_i^{(k+1)}=
\frac{b_i-\sum_{j<i}a_{ij}x_j^{(k+1)}-\sum_{j>i}a_{ij}x_j^{(k)}}{a_{ii}}.}
$$

New values are used immediately. A sweep is a forward triangular solve and depends on the variable ordering. Neither Jacobi nor Gauss–Seidel is universally faster or more likely to converge.

The current vector can be overwritten sequentially because components with smaller indices have already been updated. For dense matrices, either method costs $O(n^2)$ per sweep; with appropriate sparse storage, the cost is proportional to the number of stored nonzero entries.

### 4.4 Stein–Rosenberg theorem

If $a_{ii}>0$ and $a_{ij}\le0$ for $i\ne j$, exactly one case holds:

$$
\begin{aligned}
&0\le\rho(B_G)<\rho(B_J)<1,\\
&1<\rho(B_J)<\rho(B_G),\\
&\rho(B_J)=\rho(B_G)=0,\\
&\rho(B_J)=\rho(B_G)=1.
\end{aligned}
$$

Under these sign conditions, both methods converge together. In the convergent case with nonzero spectral radius, Gauss–Seidel has the smaller spectral radius.

This comparison depends on the sign assumptions. For a general matrix, either method can converge while the other fails the spectral-radius test.

## 5. Structural Convergence Conditions

### 5.1 Diagonal dominance and irreducibility

A matrix is **strictly diagonally dominant by rows** if

$$
\boxed{\displaystyle|a_{ii}|>\sum_{j\ne i}|a_{ij}|\quad\text{for every }i.}
$$

Weak diagonal dominance replaces $>$ by $\ge$. The irreducible results below also require at least one strict row.

A matrix is **reducible** if some simultaneous row and column permutation gives

$$
P^TAP=\begin{pmatrix}A_{11}&A_{12}\\0&A_{22}\end{pmatrix},
$$

with both diagonal blocks nonempty. Otherwise it is **irreducible**.

Equivalently, form a directed graph with an edge $i\to j$ whenever $i\ne j$ and $a_{ij}\ne0$. Irreducibility means that every vertex is reachable from every other vertex. This allows a strict inequality in one row to influence the whole system.

**Theorem.** If $A$ is strictly diagonally dominant, or is irreducible and weakly diagonally dominant with at least one strict row, then $A$ is nonsingular and both Jacobi and Gauss–Seidel converge.

To see nonsingularity under strict dominance, suppose $Az=0$ and choose $p$ with $|z_p|=\|z\|_\infty>0$. Then

$$
|a_{pp}||z_p|\le\sum_{j\ne p}|a_{pj}||z_j|
\le\sum_{j\ne p}|a_{pj}||z_p|,
$$

contradicting strict dominance. In the irreducible weak case, equality propagates along nonzero entries until it reaches a strict row.

For strict dominance, the Jacobi result follows from

$$
\|B_J\|_\infty=\max_i\frac{\sum_{j\ne i}|a_{ij}|}{|a_{ii}|}<1.
$$

### 5.2 Symmetric matrices

**Theorem.** If $A=A^T$ and $a_{ii}>0$, then:

- Gauss–Seidel converges if and only if $A$ is positive definite.
- Jacobi converges if and only if both $A$ and $2D-A$ are positive definite.

For Jacobi, $B_J$ is similar to $I-D^{-1/2}AD^{-1/2}$. Its eigenvalues lie in $(-1,1)$ precisely when

$$
0<\lambda_i(D^{-1/2}AD^{-1/2})<2.
$$

Thus positive definiteness alone is sufficient for Gauss–Seidel, but not for Jacobi.

The lower eigenvalue bound is equivalent to positive definiteness of $A$. The upper bound is equivalent to positive definiteness of

$$
2I-D^{-1/2}AD^{-1/2}=D^{-1/2}(2D-A)D^{-1/2}.
$$

This explains why Jacobi needs the additional condition on $2D-A$.

## 6. Successive Overrelaxation

<span id="sor-iteration"></span>

### 6.1 SOR update

SOR relaxes each sequential component update:

$$
\boxed{\displaystyle
x_i^{(k+1)}=(1-\omega)x_i^{(k)}+
\frac{\omega}{a_{ii}}
\left(b_i-\sum_{j<i}a_{ij}x_j^{(k+1)}
-\sum_{j>i}a_{ij}x_j^{(k)}\right).}
$$

Here $0<\omega<1$ is underrelaxation, $\omega=1$ is Gauss–Seidel, and $\omega>1$ is overrelaxation.

The matrix form is

$$
(D-\omega L)x^{(k+1)}=[(1-\omega)D+\omega U]x^{(k)}+\omega b,
$$

with iteration matrix

$$
\boxed{B_\omega=(D-\omega L)^{-1}[(1-\omega)D+\omega U].}
$$

Each sweep uses already relaxed components and requires a forward triangular solve.

SOR applies relaxation at each component update. It is generally different from completing an unrelaxed Gauss–Seidel sweep and then averaging the resulting vector with the old one.

### 6.2 Convergence conditions

Since

$$
\det B_\omega=(1-\omega)^n,
$$

$\rho(B_\omega)<1$ implies $|1-\omega|<1$. Hence

$$
\boxed{0<\omega<2}
$$

is necessary for convergence in general.

Indeed, convergence requires every eigenvalue of $B_\omega$ to have magnitude less than one. Their product is $(1-\omega)^n$, so $|1-\omega|<1$ is necessary, but does not control the individual eigenvalues for a general matrix.

**Theorem.** If $A$ is symmetric positive definite, SOR converges if and only if $0<\omega<2$.

The sufficient condition can be interpreted through the quadratic energy

$$
\Phi(x)=\frac12x^TAx-b^Tx.
$$

A component correction $t=\omega r_i/a_{ii}$ changes it by

$$
\Phi(x+te_i)-\Phi(x)
=-\frac{\omega(2-\omega)}{2a_{ii}}r_i^2.
$$

Here $r_i$ is the residual component using the latest values in the sweep. For $0<\omega<2$, every nonzero correction decreases the energy. Positive definiteness makes the energy strictly convex and gives convergence to its unique minimizer, the solution of $Ax=b$.

**Theorem.** If $A$ is strictly diagonally dominant, or irreducibly weakly diagonally dominant with at least one strict row, SOR converges for $0<\omega\le1$.

Outside these assumptions, test $\rho(B_\omega)<1$. Relaxation does not automatically make a divergent method converge.

### 6.3 Characteristic determinant

$$
\boxed{\displaystyle
\det(\lambda I-B_\omega)
=\frac{\det[(\lambda-1+\omega)D-\omega\lambda L-\omega U]}{\det D}.}
$$

This identity can be used to study how $\omega$ affects the eigenvalues. The optimal parameter depends on the matrix.

## 7. Stopping Criteria

If a known contraction bound satisfies $\|B\|\le q<1$, then

$$
\frac{q}{1-q}\|x^{(k)}-x^{(k-1)}\|\le\varepsilon
$$

guarantees absolute error at most $\varepsilon$. Without such a bound, a small change between iterates alone is insufficient.

For $b\ne0$, the residual $r^{(k)}=b-Ax^{(k)}$ satisfies

$$
\boxed{\displaystyle
\frac{\|x^*-x^{(k)}\|}{\|x^*\|}
\le\kappa(A)\frac{\|r^{(k)}\|}{\|b\|}.}
$$

A residual-based accuracy check must therefore account for conditioning.
