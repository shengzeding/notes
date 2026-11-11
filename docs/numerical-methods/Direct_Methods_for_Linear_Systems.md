---
title: Direct Methods for Linear Systems
order: 4
---

# Direct Methods for Linear Systems

## 1. Gaussian Elimination

A **direct method** solves a linear system in finitely many arithmetic operations in exact arithmetic. Floating-point computations introduce rounding errors, so both the algorithm and the conditioning of the system affect the final accuracy.

Gaussian elimination is the basic construction behind LU factorization. It replaces the original equations by equivalent equations that can be solved in a fixed order.

### 1.1 Elimination and back substitution

For a nonsingular system $Ax=b$, Gaussian elimination transforms $A$ into an upper triangular matrix. At step $k$, use the pivot $a_{kk}^{(k)}\ne0$ and multipliers

$$
\boxed{\displaystyle m_{ik}=\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}},\qquad i=k+1,\ldots,n.}
$$

The updates are obtained by subtracting $m_{ik}$ times row $k$ from row $i$. This sets the entry below the pivot to zero while preserving the solution:

$$
\begin{aligned}
a_{ij}^{(k+1)}&=a_{ij}^{(k)}-m_{ik}a_{kj}^{(k)},
&&i,j=k+1,\ldots,n,\\
b_i^{(k+1)}&=b_i^{(k)}-m_{ik}b_k^{(k)},
&&i=k+1,\ldots,n.
\end{aligned}
$$

After elimination, solve $Ux=c$ by back substitution:

$$
\boxed{\displaystyle x_i=\frac{c_i-\sum_{j=i+1}^{n}u_{ij}x_j}{u_{ii}},
\qquad i=n,\ldots,1.}
$$

### 1.2 Conditions and cost

Let $\Delta_k=\det A_{1:k,1:k}$ and $\Delta_0=1$. Without pivoting,

$$
\Delta_k=\prod_{j=1}^{k}a_{jj}^{(j)},\qquad
 a_{kk}^{(k)}=\frac{\Delta_k}{\Delta_{k-1}}.
$$

Elimination without pivoting succeeds for nonsingular $A$ if all leading principal minors are nonzero. Nonsingularity alone does not guarantee nonzero intermediate pivots.

The leading cost is $2n^3/3$ arithmetic operations. Back substitution costs $O(n^2)$.

The cubic cost comes from updating the remaining coefficient matrix at each step:

$$
\sum_{k=1}^{n-1}(n-k)^2=\frac{n(n-1)(2n-1)}{6}.
$$

Each update uses a multiplication and a subtraction. Updating the right-hand side and solving the triangular system contribute only lower-order terms.

## 2. Pivoting

Small pivots can produce large multipliers and amplify rounding errors.

Large intermediate values can lead to loss of significant digits when nearly equal quantities are subtracted. Pivoting chooses the equation order during elimination to reduce this risk. A zero pivot may reflect an unsuitable ordering even when the matrix is nonsingular.

**Partial pivoting.** At step $k$, choose

$$
\boxed{\displaystyle p\in\operatorname*{arg\,max}_{i\ge k}|a_{ik}^{(k)}|.}
$$

Exchange rows $k$ and $p$, including the right-hand side. The unknown order is unchanged, and the multipliers satisfy $|m_{ik}|\le1$.

**Complete pivoting.** Choose the largest absolute entry in the remaining submatrix:

$$
(p,q)\in\operatorname*{arg\,max}_{i,j\ge k}|a_{ij}^{(k)}|.
$$

Exchange rows $k,p$ and columns $k,q$. Column exchanges change the unknown order and must be recorded.

Partial pivoting searches one column, while complete pivoting searches the entire remaining block. The latter requires more comparisons and data movement. Partial pivoting is the usual practical choice for a general dense system.

## 3. LU Factorization

<span id="lu-factorization"></span>

### 3.1 Existence and uniqueness

**Theorem.** If $A$ is nonsingular and all leading principal minors are nonzero, then

$$
\boxed{A=LU}
$$

uniquely, where $L$ is unit lower triangular and $U$ is upper triangular. The entries below the diagonal of $L$ are the elimination multipliers.

Elimination matrices give $E_{n-1}\cdots E_1A=U$, hence $L=E_1^{-1}\cdots E_{n-1}^{-1}$.

For uniqueness, suppose $L_1U_1=L_2U_2$. Then

$$
L_2^{-1}L_1=U_2U_1^{-1}.
$$

The left side is unit lower triangular, and the right side is upper triangular. Both must equal $I$, so the two factorizations coincide.

### 3.2 Doolittle and Crout recurrences

**Doolittle factorization** uses $l_{ii}=1$. For $r=1,\ldots,n$, compute row $r$ of $U$, then column $r$ of $L$.

Equating entries in $A=LU$ gives

$$
a_{rj}=\sum_{k<r}l_{rk}u_{kj}+u_{rj},\qquad
a_{ir}=\sum_{k<r}l_{ik}u_{kr}+l_{ir}u_{rr}.
$$

Solving these identities for the new entries gives

$$
\boxed{\begin{aligned}
u_{rj}&=a_{rj}-\sum_{k=1}^{r-1}l_{rk}u_{kj},
&&j=r,\ldots,n,\\
l_{ir}&=\frac{a_{ir}-\sum_{k=1}^{r-1}l_{ik}u_{kr}}{u_{rr}},
&&i=r+1,\ldots,n.
\end{aligned}}
$$

**Crout factorization** uses $u_{ii}=1$. Compute column $r$ of $L$, then row $r$ of $U$:

$$
\boxed{\begin{aligned}
l_{ir}&=a_{ir}-\sum_{k=1}^{r-1}l_{ik}u_{kr},
&&i=r,\ldots,n,\\
u_{rj}&=\frac{a_{rj}-\sum_{k=1}^{r-1}l_{rk}u_{kj}}{l_{rr}},
&&j=r+1,\ldots,n.
\end{aligned}}
$$

Empty sums are zero. These unpivoted recurrences require nonzero pivots.

### 3.3 Solving and storage

For Doolittle factors, solve $Ly=b$ and $Ux=y$:

$$
\begin{aligned}
y_i&=b_i-\sum_{j<i}l_{ij}y_j,\qquad i=1,\ldots,n,\\
x_i&=\frac{y_i-\sum_{j>i}u_{ij}x_j}{u_{ii}},\qquad i=n,\ldots,1.
\end{aligned}
$$

Store $U$ on and above the diagonal of one array and the strict lower part of $L$ below it. The unit diagonal of $L$ is implicit.

Factorization costs $O(n^3)$; each additional right-hand side costs $O(n^2)$.

When several systems share the same coefficient matrix, compute the factors once and reuse them. The triangular solves require no further elimination of the coefficient matrix.

### 3.4 Pivoted LU

Every nonsingular matrix admits a partial-pivoting factorization

$$
\boxed{PA=LU,\qquad |l_{ij}|\le1.}
$$

Solve $Ly=Pb$, then $Ux=y$. When exchanging rows during factorization, also exchange the already computed entries of $L$.

At stage $r$, the candidate pivot in row $i$ is the updated value

$$
s_i=a_{ir}-\sum_{k<r}l_{ik}u_{kr},\qquad i=r,\ldots,n.
$$

Select the largest $|s_i|$. Comparing the original column entries without accounting for earlier elimination would select the wrong candidate values.

Complete pivoting gives $PAQ=LU$. Solve $Ly=Pb$ and $Uz=y$, then recover $x=Qz$.

## 4. Symmetric Factorizations

### 4.1 Cholesky factorization

<span id="cholesky-factorization"></span>

**Theorem.** If $A=A^T$ is positive definite, then

$$
\boxed{A=LL^T}
$$

uniquely, with $L$ lower triangular and $l_{ii}>0$.

Positive definiteness means $x^TAx>0$ for every nonzero $x$. Symmetry allows one triangular factor to determine the other, reducing both storage and arithmetic.

For $i\ge j$, matching entries in $A=LL^T$ gives

$$
a_{ij}=\sum_{k<j}l_{ik}l_{jk}+l_{ij}l_{jj}.
$$

Taking $i=j$ gives the diagonal square root; taking $i>j$ gives the remaining column entries.

For $j=1,\ldots,n$,

$$
\boxed{\begin{aligned}
l_{jj}&=\sqrt{a_{jj}-\sum_{k<j}l_{jk}^2},\\
l_{ij}&=\frac{a_{ij}-\sum_{k<j}l_{ik}l_{jk}}{l_{jj}},
\qquad i=j+1,\ldots,n.
\end{aligned}}
$$

Positive definiteness guarantees positive square-root arguments in exact arithmetic. The leading cost is $n^3/3$ operations.

Solve $Ly=b$ and $L^Tx=y$:

$$
\begin{aligned}
y_i&=\frac{b_i-\sum_{k<i}l_{ik}y_k}{l_{ii}},\\
x_i&=\frac{y_i-\sum_{k>i}l_{ki}x_k}{l_{ii}}.
\end{aligned}
$$

The first recurrence runs forward, the second backward.

### 4.2 Square-root-free factorization

**Theorem.** A symmetric matrix with nonzero leading principal minors has a unique factorization

$$
\boxed{A=LDL^T,}
$$

where $L$ is unit lower triangular and $D=\operatorname{diag}(d_1,\ldots,d_n)$ is nonsingular.

The recurrences are

$$
\boxed{\begin{aligned}
d_j&=a_{jj}-\sum_{k<j}l_{jk}^2d_k,\\
l_{ij}&=\frac{a_{ij}-\sum_{k<j}l_{ik}d_kl_{jk}}{d_j},
\qquad i=j+1,\ldots,n.
\end{aligned}}
$$

If $A$ is positive definite, all $d_j>0$. To solve $Ax=b$, use $Ly=b$ followed by $DL^Tx=y$. Because the diagonal of $L$ is one, the forward solve uses no diagonal divisions. The backward solve incorporates the divisions by $d_i$:

$$
\begin{aligned}
y_i&=b_i-\sum_{k<i}l_{ik}y_k,\qquad i=1,\ldots,n,\\
x_i&=\frac{y_i}{d_i}-\sum_{k>i}l_{ki}x_k,\qquad i=n,\ldots,1.
\end{aligned}
$$

## 5. Tridiagonal Systems

### 5.1 The Thomas algorithm

For

$$
a_ix_{i-1}+b_ix_i+c_ix_{i+1}=f_i,
$$

omit the nonexistent boundary terms. Use a bidiagonal Crout factorization: $L$ has diagonal $\alpha_i$ and subdiagonal $a_i$, while $U$ has unit diagonal and superdiagonal $\beta_i$.

$$
\boxed{\begin{aligned}
\alpha_1&=b_1,\\
\beta_i&=c_i/\alpha_i,\qquad i=1,\ldots,n-1,\\
\alpha_{i+1}&=b_{i+1}-a_{i+1}\beta_i.
\end{aligned}}
$$

Forward substitution:

$$
y_1=f_1/\alpha_1,\qquad
 y_i=\frac{f_i-a_iy_{i-1}}{\alpha_i},\quad i=2,\ldots,n.
$$

Back substitution:

$$
\boxed{x_n=y_n,\qquad x_i=y_i-\beta_ix_{i+1},\quad i=n-1,\ldots,1.}
$$

Both time and storage costs are $O(n)$.

Only the main diagonal and its two neighbors are needed. Elimination preserves this structure, so each new pivot and each substitution step uses only the preceding or following component.

### 5.2 Sufficient conditions

A sufficient set of diagonal-dominance conditions is

$$
\begin{aligned}
|b_1|&>|c_1|>0,\\
|b_i|&\ge|a_i|+|c_i|,\quad a_ic_i\ne0,
\qquad i=2,\ldots,n-1,\\
|b_n|&>|a_n|>0.
\end{aligned}
$$

These imply $|\alpha_i|>|c_i|$ and $|\beta_i|<1$ for $i<n$, and $\alpha_n\ne0$, so the algorithm has no zero pivots.

The key induction step is

$$
|\alpha_i|\ge|b_i|-|a_i||\beta_{i-1}|
>|b_i|-|a_i|\ge|c_i|.
$$

The final strict inequality in the assumptions gives $|\alpha_n|>0$. These are sufficient conditions; the algorithm can also succeed outside this class.

## 6. Vector Norms

<span id="vector-norms"></span>

### 6.1 Definition and common norms

A vector norm satisfies

$$
\begin{aligned}
\|x\|&\ge0,\qquad \|x\|=0\iff x=0,\\
\|\alpha x\|&=|\alpha|\|x\|,\\
\|x+y\|&\le\|x\|+\|y\|.
\end{aligned}
$$

The standard norms are

$$
\boxed{\displaystyle
\|x\|_p=\left(\sum_i|x_i|^p\right)^{1/p},\quad 1\le p<\infty,
\qquad \|x\|_\infty=\max_i|x_i|.}
$$

The counting function $\|x\|_0=\#\{i:x_i\ne0\}$ is not a norm because homogeneity fails. For $0<p<1$ in dimensions at least two, the $p$ expression fails the triangle inequality.

### 6.2 Equivalence and convergence

Every norm on a finite-dimensional space is continuous. Any two norms satisfy

$$
c_1\|x\|_s\le\|x\|_t\le c_2\|x\|_s
$$

for some constants $c_1,c_2>0$. Consequently,

$$
\boxed{x^{(k)}\to x^*\quad\Longleftrightarrow\quad
\|x^{(k)}-x^*\|\to0}
$$

in any norm. Useful inequalities include

$$
\|x\|_\infty\le\|x\|_2\le\|x\|_1\le\sqrt n\,\|x\|_2,
\qquad \|x\|_2\le\sqrt n\,\|x\|_\infty.
$$

## 7. Matrix Norms and Spectral Radius

<span id="matrix-norms"></span>

### 7.1 Matrix and operator norms

A matrix norm satisfies the norm axioms and submultiplicativity:

$$
\|AB\|\le\|A\|\|B\|.
$$

The Frobenius norm is

$$
\|A\|_F=\left(\sum_{i,j}|a_{ij}|^2\right)^{1/2}.
$$

Given a vector norm, the induced operator norm is

$$
\boxed{\displaystyle \|A\|=\max_{x\ne0}\frac{\|Ax\|}{\|x\|}.}
$$

It satisfies $\|Ax\|\le\|A\|\|x\|$ and $\|I\|=1$. For real matrices,

$$
\boxed{\begin{aligned}
\|A\|_1&=\max_j\sum_i|a_{ij}|,\\
\|A\|_\infty&=\max_i\sum_j|a_{ij}|,\\
\|A\|_2&=\sqrt{\lambda_{\max}(A^TA)}.
\end{aligned}}
$$

For complex matrices, replace $A^T$ by $A^*$.

The $1$-norm is the maximum absolute column sum, and the $\infty$-norm is the maximum absolute row sum. The $2$-norm is the largest singular value. The Frobenius norm measures all entries together and generally differs from the induced $2$-norm.

Submultiplicativity of the Frobenius norm follows by applying Cauchy–Schwarz to each entry of $AB$:

$$
\|AB\|_F^2
\le\sum_{i,j}\left(\sum_k|a_{ik}|^2\right)
\left(\sum_k|b_{kj}|^2\right)
=\|A\|_F^2\|B\|_F^2.
$$

### 7.2 Spectral radius and inverse bound

The spectral radius is

$$
\boxed{\rho(A)=\max_i|\lambda_i(A)|\le\|A\|.}
$$

For real symmetric $A$, $\|A\|_2=\rho(A)$.

This follows from orthogonal diagonalization: the singular values are the absolute eigenvalues. For a general matrix, the spectral radius and the $2$-norm need not coincide.

If $\|B\|<1$ in an induced norm, then $I\pm B$ are nonsingular and

$$
\boxed{\displaystyle \|(I\pm B)^{-1}\|\le\frac{1}{1-\|B\|}.}
$$

## 8. Conditioning and Error Estimates

### 8.1 Condition number

<span id="matrix-condition-number"></span>

For nonsingular $A$, define

$$
\boxed{\kappa(A)=\|A\|\|A^{-1}\|\ge1.}
$$

In particular,

$$
\kappa_2(A)=\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}.
$$

For symmetric positive definite $A$, this is $\lambda_{\max}(A)/\lambda_{\min}(A)$.

A large condition number means that small relative data changes can cause large relative solution changes. Pivoting improves the numerical elimination process but does not remove this sensitivity. Scaling or preconditioning can improve the conditioning of the transformed system.

### 8.2 Perturbation bounds

Suppose $Ax=b\ne0$ and

$$
(A+\delta A)(x+\delta x)=b+\delta b.
$$

Let $\varepsilon_A=\|\delta A\|/\|A\|$ and $\varepsilon_b=\|\delta b\|/\|b\|$. If $\kappa(A)\varepsilon_A<1$, then

$$
\boxed{\displaystyle
\frac{\|\delta x\|}{\|x\|}
\le\frac{\kappa(A)}{1-\kappa(A)\varepsilon_A}
(\varepsilon_A+\varepsilon_b).}
$$

For perturbations in $b$ alone, this reduces to

$$
\frac{\|\delta x\|}{\|x\|}\le\kappa(A)\frac{\|\delta b\|}{\|b\|}.
$$

Small determinants or small pivots alone are not reliable tests for ill-conditioning. Condition estimation avoids explicitly forming $A^{-1}$.

The perturbation bound follows from

$$
(I+A^{-1}\delta A)\delta x=A^{-1}(\delta b-\delta A\,x).
$$

The condition $\kappa(A)\varepsilon_A<1$ makes the perturbed coefficient matrix invertible and permits the inverse bound from Section 7. For coefficient perturbations alone, set $\varepsilon_b=0$.

### 8.3 Residual and a posteriori error

<span id="residual-error-bound"></span>

For an approximate solution $\widehat x$, define $r=b-A\widehat x$. Since $x-\widehat x=A^{-1}r$,

$$
\boxed{\displaystyle
\frac{1}{\kappa(A)}\frac{\|r\|}{\|b\|}
\le\frac{\|x-\widehat x\|}{\|x\|}
\le\kappa(A)\frac{\|r\|}{\|b\|}.}
$$

A small residual guarantees a small relative solution error only when conditioning is accounted for. If $K\ge\kappa(A)$ is a reliable upper bound, $\|r\|/\|b\|\le\tau/K$ guarantees relative error at most $\tau$.

The residual measures how well the equations are satisfied; the forward error measures distance from the exact solution. Multiplication by $A^{-1}$ connects the two and can greatly amplify the residual when $A$ is ill-conditioned.
