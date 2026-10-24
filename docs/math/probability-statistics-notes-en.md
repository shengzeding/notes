---
title: Probability and Statistical Estimation
order: 40
---

# Probability and Statistical Estimation


## 1. Random Vectors and Covariance

### 1.1 Mean, covariance, and directional variance

A **random vector** on a probability space $(\Omega,\mathcal F,\mathbb P)$ is a measurable map $X:\Omega\to\mathbb R^d$. We write

$$
X=(X_1,\ldots,X_d)^T
$$

as a column vector, and use $x$ for a particular value of $X$. All vectors in these notes are real, and $A^T$ denotes the transpose.

**Definition (Mean and covariance).** If $\mathbb E\|X\|^2<\infty$, the **mean vector** and **covariance matrix** are

$$
\mu_X=\mathbb E[X],\qquad
\Sigma_{XX}=\mathbb E[(X-\mu_X)(X-\mu_X)^T].
$$

The $(i,j)$ entry of the covariance matrix is

$$
(\Sigma_{XX})_{ij}
=\operatorname{Cov}(X_i,X_j)
=\mathbb E[X_iX_j]-\mathbb E[X_i]\mathbb E[X_j].
$$

The diagonal entries record the component variances; the off-diagonal entries record linear covariation between components. For $X\in\mathbb R^d$ and $Y\in\mathbb R^m$,

$$
\Sigma_{XY}
=\mathbb E[(X-\mu_X)(Y-\mu_Y)^T]
\in\mathbb R^{d\times m},
\qquad
\Sigma_{YX}=\Sigma_{XY}^T.
$$

**Theorem 1.1 (Directional variance).** The covariance matrix is symmetric positive semidefinite, written $\Sigma_{XX}\succeq0$. For every $a\in\mathbb R^d$,

$$
\boxed{a^T\Sigma_{XX}a=\operatorname{Var}(a^TX)\ge0.}
$$

**Proof.** Moving $a$ inside the expectation gives

$$
a^T\Sigma_{XX}a
=\mathbb E\!\left[(a^T(X-\mu_X))^2\right].
$$

The right-hand side is exactly the variance of the scalar projection $a^TX$.

For a nonzero $a$, equality holds precisely when

$$
a^T(X-\mu_X)=0\qquad\text{almost surely}.
$$

Thus $\Sigma_{XX}$ is positive definite, written $\Sigma_{XX}\succ0$, exactly when $X$ is not almost surely confined to an affine hyperplane. Here “almost surely” means outside an event of probability zero.

For two scalar variables with positive variances, the correlation coefficient is

$$
\rho_{XY}
=\frac{\operatorname{Cov}(X,Y)}
{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}.
$$

The Cauchy–Schwarz inequality gives $|\rho_{XY}|\le1$. Correlation removes physical units, but it measures only linear association.

### 1.2 Affine transformations and error propagation

**Theorem 1.2 (Affine transformations).** Let $Z=AX+b$, where $A$ and $b$ are deterministic. Then

$$
\boxed{\mu_Z=A\mu_X+b,\qquad
\Sigma_{ZZ}=A\Sigma_{XX}A^T.}
$$

**Proof.** Linearity gives $\mu_Z=A\mu_X+b$. Subtracting the mean,

$$
Z-\mu_Z=A(X-\mu_X),
$$

so

$$
\mathbb E[(Z-\mu_Z)(Z-\mu_Z)^T]
=A\mathbb E[(X-\mu_X)(X-\mu_X)^T]A^T.
$$

For a sum $Z=AX+BY$, the same expansion gives

$$
\begin{aligned}
\Sigma_{ZZ}
={}&A\Sigma_{XX}A^T+B\Sigma_{YY}B^T\\
&+A\Sigma_{XY}B^T+B\Sigma_{YX}A^T.
\end{aligned}
$$

The condition $\Sigma_{XY}=0$ makes the last two terms vanish. Independence is sufficient for this condition, but is not necessary.

**Example (Averaging two measurements).** Suppose $X_1$ and $X_2$ estimate the same quantity, each has variance $\sigma^2$, and their correlation coefficient is $\rho$. Then

$$
\operatorname{Var}\!\left(\frac{X_1+X_2}{2}\right)
=\frac{\sigma^2}{2}(1+\rho).
$$

Independent errors give variance $\sigma^2/2$. If the errors are perfectly positively correlated, averaging leaves the variance unchanged.

For a differentiable nonlinear map $g:\mathbb R^d\to\mathbb R^k$, take a first-order expansion around $\mu_X$:

$$
g(X)\approx g(\mu_X)+J_g(\mu_X)(X-\mu_X).
$$

This gives the local approximation

$$
\operatorname{Cov}(g(X))
\approx J_g(\mu_X)\Sigma_{XX}J_g(\mu_X)^T.
$$

This is first-order error propagation. Higher-order terms may matter when the nonlinearity is strong or the distribution is widely dispersed. In general, $\mathbb E[g(X)]\ne g(\mathbb E[X])$.


## 2. Gaussian Distributions and Conditioning

### 2.1 Definition and covariance geometry

**Definition.** A random vector $X$ is **Gaussian** if every linear combination $a^TX$ has a univariate normal distribution, allowing a degenerate distribution with zero variance. We write

$$
X\sim\mathcal N(\mu,\Sigma).
$$

Equivalently, it can be represented as

$$
X=\mu+LZ,\qquad
Z\sim\mathcal N(0,I_r),\qquad LL^T=\Sigma,
$$

where $I_r$ is the identity matrix, the components of $Z$ are independent, and $r$ may be chosen as $\operatorname{rank}\Sigma$.

When $\Sigma\succ0$, the density of $X$ on $\mathbb R^d$ is

$$
\boxed{
p_X(x)=\frac{1}{(2\pi)^{d/2}(\det\Sigma)^{1/2}}
\exp\!\left[-\frac12(x-\mu)^T\Sigma^{-1}(x-\mu)\right].
}
$$

The quadratic form

$$
d_\Sigma(x,\mu)^2=(x-\mu)^T\Sigma^{-1}(x-\mu)
$$

is the squared **Mahalanobis distance**. It measures displacement from the mean after accounting for the scale and correlation of the fluctuations.

By the spectral decomposition of a real symmetric matrix,

$$
\Sigma=Q\Lambda Q^T,\qquad
\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_d).
$$

In the coordinates $\xi=Q^T(x-\mu)$, a surface of constant density satisfies

$$
\sum_{j=1}^d\frac{\xi_j^2}{\lambda_j}=c.
$$

The eigenvectors are the principal axes, with semi-axis lengths $\sqrt{c\lambda_j}$ on this level surface.

**Singular covariance.** If $\Sigma$ has rank $r<d$, then $X=\mu+LZ$ is supported on $\mu+C(L)$, where $C(L)$ is the column space of $L$. The Gaussian distribution still exists, but it has no density with respect to $d$-dimensional volume. In particular, neither $\Sigma^{-1}$ nor the density formula above may be used without this qualification.

### 2.2 Linear transformations, whitening, and sampling

If $X\sim\mathcal N(\mu,\Sigma)$, then

$$
\boxed{AX+b\sim\mathcal N(A\mu+b,A\Sigma A^T).}
$$

**Proof.** For every $c$,

$$
c^T(AX+b)=(A^Tc)^TX+c^Tb
$$

is a univariate Gaussian variable. Thus $AX+b$ satisfies the definition, and its mean and covariance follow from §1.2.

Taking $A$ to select coordinates shows that every marginal distribution of a Gaussian vector is Gaussian.

**Whitening.** If $\Sigma\succ0$, define

$$
W=\Sigma^{-1/2}(X-\mu),
\qquad
\Sigma^{-1/2}=Q\Lambda^{-1/2}Q^T.
$$

Then $\operatorname{Cov}(W)=I_d$. If $X$ is Gaussian, the components of $W$ are also independent. For a general distribution, whitening guarantees only that they are uncorrelated.

**Generating correlated samples.** For $\Sigma\succ0$, a Cholesky factorization gives $\Sigma=LL^T$. If $Z$ has independent standard normal components, then

$$
X=\mu+LZ
$$

has the required mean and covariance. Thus whitening and Gaussian sampling use inverse changes of coordinates.

### 2.3 Uncorrelated Gaussian variables

Independence together with finite second moments implies zero covariance. The converse is generally false.

**Counterexample.** Let $U\sim\operatorname{Unif}[-1,1]$ and $V=U^2$. By symmetry,

$$
\operatorname{Cov}(U,V)
=\mathbb E[U^3]-\mathbb E[U]\mathbb E[U^2]=0.
$$

Yet knowing $U$ determines $V$ completely, so they are not independent.

**Theorem 2.1 (Independence of Gaussian blocks).** If $(X^T,Y^T)^T$ is jointly Gaussian, then

$$
\boxed{X\perp\!\!\!\perp Y
\quad\Longleftrightarrow\quad \Sigma_{XY}=0.}
$$

**Proof.** The joint characteristic function is

$$
\varphi_{X,Y}(s,t)
=\exp\!\left[
i(s^T\mu_X+t^T\mu_Y)
-\frac12\bigl(s^T\Sigma_{XX}s+2s^T\Sigma_{XY}t
+t^T\Sigma_{YY}t\bigr)
\right].
$$

When the cross-covariance is zero, this factors as $\varphi_X(s)\varphi_Y(t)$, proving independence. The argument also covers singular Gaussian distributions.

**Do not omit “jointly.”** Normal marginal distributions do not guarantee a joint Gaussian distribution. For example, let $X\sim\mathcal N(0,1)$, let an independent random sign $S$ take the values $\pm1$ with equal probabilities, and set $Y=SX$. Both $X$ and $Y$ are standard normal and they are uncorrelated, but $|Y|=|X|$, so they are not independent.

### 2.4 The conditional distribution

Suppose

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim\mathcal N\!\left(
\begin{pmatrix}\mu_X\\\mu_Y\end{pmatrix},
\begin{pmatrix}
\Sigma_{XX}&\Sigma_{XY}\\
\Sigma_{YX}&\Sigma_{YY}
\end{pmatrix}\right),
\qquad \Sigma_{YY}\succ0.
$$

**Derivation.** Seek an affine function of $Y$ whose residual is uncorrelated with $Y$. Set

$$
R=X-\mu_X-K(Y-\mu_Y),
\qquad
K=\Sigma_{XY}\Sigma_{YY}^{-1}.
$$

Then

$$
\operatorname{Cov}(R,Y)
=\Sigma_{XY}-K\Sigma_{YY}=0.
$$

Since $(R,Y)$ is still jointly Gaussian, §2.3 implies that $R$ and $Y$ are independent. Expanding the covariance gives

$$
\begin{aligned}
\operatorname{Cov}(R)
&=\Sigma_{XX}-K\Sigma_{YX}
-\Sigma_{XY}K^T+K\Sigma_{YY}K^T\\
&=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}.
\end{aligned}
$$

Since

$$
X=\mu_X+K(Y-\mu_Y)+R,
$$

conditioning fixes the first two terms and leaves the distribution of $R$ unchanged.

**Theorem 2.2 (Conditional Gaussian distribution).** Under the assumptions above,

$$
\boxed{
X\mid Y=y\sim
\mathcal N\!\left(
\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y),
\ \Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
\right).
}
$$

This formula specifies a version of the regular conditional distribution. Even when the event $\{Y=y\}$ has probability zero, a conditional density or regular conditional distribution can still be defined.

The conditional mean is affine in $y$. The conditional covariance is the **Schur complement** of $\Sigma_{YY}$ and does not depend on $y$. Since the subtracted matrix is positive semidefinite,

$$
0\preceq\operatorname{Cov}(X\mid Y=y)\preceq\Sigma_{XX}.
$$

Here $A\preceq B$ means $B-A\succeq0$. Thus conditioning decreases covariance in the positive semidefinite order. The pointwise conclusion uses Gaussianity; the general averaged statement follows from total covariance in §4.4.

If $\Sigma_{YY}$ is singular, one can first remove redundant observation directions. Alternatively, the corresponding formulas use the Moore–Penrose pseudoinverse on the affine support of $Y$. Outside that support, the original model does not uniquely determine a conditional distribution.

### 2.5 A signal observed in Gaussian noise

Suppose the signal and noise are independent, with

$$
X\sim\mathcal N(\mu,\tau^2),\qquad
\varepsilon\sim\mathcal N(0,\sigma^2),\qquad
Y=X+\varepsilon,
$$

where $\tau^2,\sigma^2>0$. We have

$$
\operatorname{Var}(Y)=\tau^2+\sigma^2,\qquad
\operatorname{Cov}(X,Y)=\tau^2.
$$

Substituting into the conditional Gaussian formula gives

$$
\boxed{
\mathbb E[X\mid Y=y]
=\mu+\frac{\tau^2}{\tau^2+\sigma^2}(y-\mu),
\qquad
\operatorname{Var}(X\mid Y=y)
=\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}.
}
$$

The conditional mean is a weighted average of the prior mean and the observation:

$$
\mathbb E[X\mid Y=y]
=\frac{\sigma^2}{\tau^2+\sigma^2}\mu
+\frac{\tau^2}{\tau^2+\sigma^2}y.
$$

Smaller observation noise puts more weight on the observation; a more concentrated prior puts more weight on the prior mean. The posterior precision satisfies

$$
\frac{1}{\operatorname{Var}(X\mid Y)}
=\frac1{\tau^2}+\frac1{\sigma^2}.
$$

For $\mu=0$, $\tau^2=4$, $\sigma^2=1$, and $y=3$, this becomes

$$
\boxed{X\mid Y=3\sim\mathcal N\!\left(\frac{12}{5},\frac45\right).}
$$

The observation shifts the mean from $0$ to $2.4$ and reduces the variance from $4$ to $0.8$.


## 3. Principal Components and Low-Rank Approximation

### 3.1 Directions of maximum variance

**Principal component analysis (PCA)** selects orthogonal directions that retain as much variance as possible.

Let $X$ be centered, with $\mathbb E[X]=0$ and covariance $\Sigma$. For a unit vector $u$, the variance of the projection $u^TX$ is

$$
\operatorname{Var}(u^TX)=u^T\Sigma u.
$$

Order the eigenvalues as $\lambda_1\ge\cdots\ge\lambda_d\ge0$ and substitute $u=Qa$:

$$
u^T\Sigma u=\sum_{j=1}^d\lambda_j a_j^2
\le\lambda_1\sum_{j=1}^d a_j^2=\lambda_1.
$$

Thus a unit eigenvector associated with the largest eigenvalue can serve as the first principal component direction. Successive orthogonality constraints give the remaining principal components.

### 3.2 Minimum square reconstruction

Let $U\in\mathbb R^{d\times k}$ satisfy $U^TU=I_k$. The [orthogonal projection](https://shengzeding.github.io/notes/math/linear-algebra/Elementary_Linear_Algebra.html#orthogonal-projection) onto $C(U)$ is $P=UU^T$. The reconstructed vector is $PX$, and the residual is $(I-P)X$.

**Theorem 3.1 (Minimum reconstruction error).** Among all $k$-dimensional subspaces, the span of eigenvectors associated with the $k$ largest eigenvalues minimizes $\mathbb E\|X-PX\|^2$.

**Proof.** Since $P^T=P=P^2$ and $\mathbb E[XX^T]=\Sigma$,

$$
\begin{aligned}
\mathbb E\|X-UU^TX\|^2
&=\mathbb E[X^T(I-UU^T)X]\\
&=\operatorname{tr}(\Sigma)-\operatorname{tr}(U^T\Sigma U).
\end{aligned}
$$

Writing $B=Q^TU$, we have $B^TB=I_k$ and

$$
\operatorname{tr}(U^T\Sigma U)
=\sum_{j=1}^d\lambda_j\|B_{j,:}\|^2.
$$

Each weight lies in $[0,1]$, and the weights sum to $k$. The maximum is $\sum_{j=1}^k\lambda_j$, attained by the first $k$ eigenvectors. Therefore

$$
\boxed{
\min_{U^TU=I_k}\mathbb E\|X-UU^TX\|^2
=\sum_{j=k+1}^d\lambda_j.
}
$$

This proves both the minimum error and the maximizing choice of subspace. Repeated eigenvalues may make the minimizing subspace nonunique.

No Gaussian assumption is needed. If $X$ is Gaussian, the principal component scores are also independent; otherwise they are only uncorrelated.

### 3.3 Sample covariance and singular values

For a centered data matrix $D\in\mathbb R^{n\times d}$ whose rows are transposed samples,

$$
S=\frac1{n-1}D^TD.
$$

If $D=U_D\Gamma V^T$ is a singular value decomposition, the corresponding right singular vectors are eigenvectors of $S$, with nonzero eigenvalues $\gamma_j^2/(n-1)$. This connects sample covariance, PCA, and the SVD.

**Scale and interpretation.** Changing the units of the variables changes covariance-based PCA. Standardizing the variables and using the correlation matrix changes the metric of the problem. A direction of large input variance need not contain the information most useful for prediction: PCA itself does not use a response variable.

### 3.4 A two-dimensional example

Consider a centered random vector in $\mathbb R^2$ with covariance

$$
\Sigma=\begin{pmatrix}5&4\\4&5\end{pmatrix}.
$$

The characteristic equation is

$$
\det(\lambda I-\Sigma)=(\lambda-5)^2-16
=(\lambda-9)(\lambda-1).
$$

An orthonormal eigenbasis is

$$
q_1=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix},
\qquad
q_2=\frac1{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix}.
$$

Keeping the first component gives

$$
\widehat X=q_1q_1^TX
=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}X.
$$

The retained variance is $9$, the mean squared reconstruction error is $1$, and the explained variance ratio is $9/(9+1)=0.9$. The discarded direction measures the difference between the two coordinates.


## 4. Conditional Expectation and Orthogonal Projection

### 4.1 Conditional means and observable information

Let $X$ be an integrable random variable and $Y$ an observation. A quantity determined by the observation has the form $g(Y)$.

When $(X,Y)$ has a joint density and $p_Y(y)>0$,

$$
p_{X\mid Y}(x\mid y)=\frac{p_{X,Y}(x,y)}{p_Y(y)},
\qquad
m(y)=\mathbb E[X\mid Y=y]
=\int x\,p_{X\mid Y}(x\mid y)\,dx.
$$

In the discrete case, replace the integral by a sum. Notice that $m(y)$ is a number or vector for a specified observation, whereas $m(Y)$ is a random variable.

To treat continuous, discrete, and mixed distributions uniformly, introduce $\sigma(Y)$: the $\sigma$-algebra of events that can be determined from $Y$. It represents the information in the observation.

**Definition.** For an integrable random variable $X$ and a sub-$\sigma$-algebra $\mathcal G$, the conditional expectation $\mathbb E[X\mid\mathcal G]$ is a random variable $M$ satisfying:

1. $M$ is integrable and $\mathcal G$-measurable, so it uses only information in $\mathcal G$.
2. For every $A\in\mathcal G$,

$$
\mathbb E[M\mathbf1_A]=\mathbb E[X\mathbf1_A].
$$

We write $\mathbb E[X\mid Y]=\mathbb E[X\mid\sigma(Y)]$. For real vector-valued observations, a $\sigma(Y)$-measurable random variable can be represented as a measurable function of $Y$.

Taking $A=\Omega$ gives $\mathbb E[M]=\mathbb E[X]$. Uniqueness is up to almost sure equality.

### 4.2 Projection in a space of random variables

Define the real Hilbert space

$$
L^2(\Omega,\mathcal F,\mathbb P)
=\{X:\mathbb E[X^2]<\infty\},
\qquad
\langle X,Z\rangle=\mathbb E[XZ],
$$

identifying random variables that agree almost surely. Its norm is

$$
\|X\|_2=\sqrt{\mathbb E[X^2]}.
$$

The $\mathcal G$-measurable elements form a closed linear subspace $L^2(\mathcal G)$. To see closedness, take an $L^2$ limit of $\mathcal G$-measurable variables and pass to an almost surely convergent subsequence; its limit has a $\mathcal G$-measurable representative.

The projection of $X$ onto this subspace is characterized by

$$
M\in L^2(\mathcal G),
\qquad
X-M\perp L^2(\mathcal G).
$$

**Theorem 4.1 (Conditional expectation as a projection).** If $X\in L^2$, then

$$
M=\mathbb E[X\mid\mathcal G]\in L^2(\mathcal G),
$$

and

$$
\boxed{\mathbb E[(X-M)Z]=0
\qquad\text{for every }Z\in L^2(\mathcal G).}
$$

**Proof.** Conditional Jensen's inequality gives

$$
M^2\le\mathbb E[X^2\mid\mathcal G],
\qquad
\mathbb E[M^2]\le\mathbb E[X^2].
$$

For $A\in\mathcal G$, the defining identity gives

$$
\mathbb E[(X-M)\mathbf1_A]=0.
$$

By linearity, the same holds for every $\mathcal G$-measurable simple function. If simple functions $Z_n$ converge to $Z$ in $L^2$, then

$$
\left|\mathbb E[(X-M)(Z-Z_n)]\right|
\le\|X-M\|_2\|Z-Z_n\|_2\longrightarrow0.
$$

Hence the identity holds for all $Z\in L^2(\mathcal G)$.

Conversely, if $M\in L^2(\mathcal G)$ satisfies this orthogonality condition, taking $Z=\mathbf1_A$ recovers the definition of conditional expectation. Thus conditional expectation is precisely the orthogonal projection of $X$ onto the observable subspace.

**Orthogonality and independence.** The residual is orthogonal to every square-integrable observable function. Independence of the residual and observation is stronger and generally fails outside the Gaussian case.

### 4.3 The minimum-square-error identity

**Definition.** Given an observation $Y$, the minimum mean squared error estimation problem is

$$
\operatorname{mmse}(X\mid Y)
=\inf_g\mathbb E[(X-g(Y))^2],
$$

where $g(Y)$ ranges over square-integrable measurable estimators.

Let $m(Y)=\mathbb E[X\mid Y]$. For any $g(Y)$,

$$
X-g(Y)=[X-m(Y)]+[m(Y)-g(Y)].
$$

The second term belongs to $L^2(\sigma(Y))$ and is orthogonal to the first. Consequently,

$$
\boxed{
\mathbb E[(X-g(Y))^2]
=\mathbb E[(X-m(Y))^2]
+\mathbb E[(m(Y)-g(Y))^2].
}
$$

**Theorem 4.2 (Minimum mean squared error).** Conditional expectation is the almost surely unique optimal estimator under squared loss:

$$
\boxed{
\widehat X_{\mathrm{MMSE}}=\mathbb E[X\mid Y],
\qquad
\operatorname{mmse}(X\mid Y)
=\mathbb E[\operatorname{Var}(X\mid Y)].
}
$$

Equality holds exactly when $g(Y)=m(Y)$ almost surely. For a vector $X$, replace the square by the squared Euclidean norm and apply orthogonality componentwise to obtain

$$
\widehat X_{\mathrm{MMSE}}=\mathbb E[X\mid Y],
\qquad
\operatorname{mmse}(X\mid Y)
=\mathbb E[\operatorname{tr}\operatorname{Cov}(X\mid Y)].
$$

**Remark.** The conclusion depends on squared loss. Under absolute loss, a conditional median is optimal; under $0$–$1$ classification loss, choose a class with maximum posterior probability.

### 4.4 Iterated expectation and variance decomposition

Three basic properties of conditional expectation are

$$
\mathbb E[\mathbb E[X\mid\mathcal G]]=\mathbb E[X],
$$

$$
\mathbb E[ZX\mid\mathcal G]
=Z\,\mathbb E[X\mid\mathcal G],
$$

and, when $\mathcal H\subseteq\mathcal G$,

$$
\boxed{
\mathbb E[\mathbb E[X\mid\mathcal G]\mid\mathcal H]
=\mathbb E[X\mid\mathcal H].
}
$$

The second identity requires $Z$ to be $\mathcal G$-measurable and the relevant products to be integrable; bounded $Z$ is a sufficient example. The third identity is the **tower property**: conditioning first on more information and then on less information gives the same result as conditioning directly on the smaller information set.

Substituting

$$
X-\mathbb E[X]
=[X-\mathbb E[X\mid Y]]
+[\mathbb E[X\mid Y]-\mathbb E[X]]
$$

into the Pythagorean identity gives the **law of total variance**:

$$
\boxed{
\operatorname{Var}(X)
=\mathbb E[\operatorname{Var}(X\mid Y)]
+\operatorname{Var}(\mathbb E[X\mid Y]).
}
$$

Its vector form is

$$
\Sigma_{XX}
=\mathbb E[\operatorname{Cov}(X\mid Y)]
+\operatorname{Cov}(\mathbb E[X\mid Y]).
$$

The two terms are the mean residual covariance and the covariance of the projected component.

For nested information $\mathcal H\subseteq\mathcal G$, write $m_{\mathcal H}=\mathbb E[X\mid\mathcal H]$ and $m_{\mathcal G}=\mathbb E[X\mid\mathcal G]$. Similarly,

$$
\boxed{
\mathbb E[(X-m_{\mathcal H})^2]
=\mathbb E[(X-m_{\mathcal G})^2]
+\mathbb E[(m_{\mathcal G}-m_{\mathcal H})^2].
}
$$

More information therefore cannot increase the optimal **average** mean squared error. For general distributions, this does not say that the conditional variance decreases for every particular observation.


## 5. Linear Estimation and State Estimation

### 5.1 Affine estimates and normal equations

Let $X\in\mathbb R^d$ and $Y\in\mathbb R^m$ have finite second moments. Restrict the estimate to the affine form

$$
\widehat X=AY+b.
$$

Minimizing $\mathbb E\|X-AY-b\|^2$ is the **linear minimum mean squared error problem**. The term LMMSE here includes the offset $b$.

Optimizing first over $b$ gives $b=\mu_X-A\mu_Y$, so it remains to work with the centered variables

$$
\widetilde X=X-\mu_X,\qquad
\widetilde Y=Y-\mu_Y.
$$

Expanding the objective gives

$$
J(A)=\operatorname{tr}\Sigma_{XX}
-2\operatorname{tr}(A\Sigma_{YX})
+\operatorname{tr}(A\Sigma_{YY}A^T).
$$

Differentiation yields

$$
\nabla_AJ=2(A\Sigma_{YY}-\Sigma_{XY}).
$$

Equivalently, the residual is orthogonal to every observation component:

$$
\mathbb E[(\widetilde X-A\widetilde Y)\widetilde Y^T]=0.
$$

This gives the population normal equations

$$
A\Sigma_{YY}=\Sigma_{XY}.
$$

**Theorem 5.1 (Affine least-squares estimate).** If $\Sigma_{YY}\succ0$, the unique optimal affine estimate is

$$
\boxed{
\widehat X_{\mathrm L}
=\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(Y-\mu_Y).
}
$$

The error covariance is

$$
\boxed{
P_{\mathrm L}
=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}.
}
$$

**Proof of optimality.** Let $A_*=\Sigma_{XY}\Sigma_{YY}^{-1}$. Completing the quadratic expression gives

$$
J(A)=J(A_*)+
\operatorname{tr}\!\left((A-A_*)\Sigma_{YY}(A-A_*)^T\right).
$$

The second term is nonnegative and vanishes only for $A=A_*$. The error covariance follows by expanding $\operatorname{Cov}(\widetilde X-A_*\widetilde Y)$.

LMMSE equals MMSE precisely when the conditional mean is affine. Joint Gaussianity is sufficient, but the affine least-squares formula itself requires only second moments.

The distinction lies in the projection spaces:

$$
\operatorname{span}\{1,Y_1,\ldots,Y_m\}
\subseteq L^2(\sigma(Y)).
$$

LMMSE projects onto the finite-dimensional space on the left, while MMSE projects onto the entire observable space on the right.

**Example (Linear estimation can miss nonlinear information).** Let $Y\sim\mathcal N(0,1)$ and $X=Y^2$. Then

$$
\mathbb E[X]=1,\qquad \operatorname{Cov}(X,Y)=0.
$$

The best affine estimator is the constant $1$, with mean squared error

$$
\mathbb E[(Y^2-1)^2]=3-2+1=2.
$$

But $\mathbb E[X\mid Y]=Y^2$, so the MMSE is zero. Zero correlation rules out an improvement from affine prediction; it does not imply that the observation contains no information.

### 5.2 Approximation by a finite family of features

Choose square-integrable feature functions $\phi_1,\ldots,\phi_p$ and write

$$
\phi(Y)=(\phi_1(Y),\ldots,\phi_p(Y))^T,\qquad
g_\beta(Y)=\phi(Y)^T\beta.
$$

Assume the features are square-integrable. Minimizing the population risk

$$
\mathcal R(\beta)=\mathbb E[(X-\phi(Y)^T\beta)^2]
$$

gives, for each $k$,

$$
\frac{\partial\mathcal R}{\partial\beta_k}
=-2\mathbb E\!\left[\phi_k(Y)
\left(X-\sum_{j=1}^p\beta_j\phi_j(Y)\right)\right]=0.
$$

Thus the coefficients satisfy

$$
\boxed{
G\beta=c,\qquad
G=\mathbb E[\phi(Y)\phi(Y)^T],\qquad
c=\mathbb E[\phi(Y)X].
}
$$

The matrix $G$ is the **Gram matrix** of the features. For any coefficient vector $a$,

$$
a^TGa=\mathbb E[(a^T\phi(Y))^2].
$$

If the features are linearly independent in $L^2$, this is positive for $a\ne0$. Hence $G$ is positive definite and the coefficients are unique.

When the input has density $p_Y$,

$$
\langle f,g\rangle
=\mathbb E[f(Y)g(Y)]
=\int f(y)g(y)p_Y(y)\,dy.
$$

With weight $p_Y$, this is the inner product of [best square approximation](https://shengzeding.github.io/notes/numerical-methods/Function_Approximation_Numerical_Analysis.html#best-square-approximation). The same normal equations therefore describe a finite-dimensional projection in function space.

When population expectations are unknown, replacing them by sample averages gives

$$
\frac1n\sum_{i=1}^n\phi(y_i)\phi(y_i)^T\beta
=\frac1n\sum_{i=1}^n\phi(y_i)x_i,
$$

which is sample least squares. This separates two sources of error: approximation error from an insufficient feature space, and statistical error from estimating the projection coefficients with finitely many observations.

### 5.3 A Gaussian observation update

Suppose the prior state distribution and observation model are

$$
X\sim\mathcal N(m^-,P^-),\qquad
Y=HX+V,\qquad
V\sim\mathcal N(0,R),
$$

where $V$ is independent of $X$ and $R\succ0$. By §1.2,

$$
\operatorname{Cov}(X,Y)=P^-H^T,\qquad
S=\operatorname{Cov}(Y)=HP^-H^T+R.
$$

Substitution into the conditional Gaussian formula gives

$$
\boxed{
K=P^-H^TS^{-1},\qquad
m^+=m^-+K(y-Hm^-),
}
$$

$$
\boxed{P^+=P^--P^-H^TS^{-1}HP^-.}
$$

The **innovation** $y-Hm^-$ is the difference between the observed value and the prior prediction. The **gain matrix** $K$ determines how that discrepancy updates the state components.

The updated estimation error can also be written directly as

$$
X-m^+=(I-KH)(X-m^-)-KV.
$$

Independence gives the **Joseph form**

$$
\boxed{
P^+=(I-KH)P^-(I-KH)^T+KRK^T.
}
$$

For the optimal gain, the two covariance expressions agree in exact arithmetic. The Joseph form expresses the covariance as a sum of positive semidefinite terms and is often preferable in finite-precision computation.

If $P^-\succ0$, multiplying the prior density by the likelihood and completing the square in $x$ also gives

$$
\boxed{
(P^+)^{-1}=(P^-)^{-1}+H^TR^{-1}H,
}
$$

$$
m^+
=P^+\bigl((P^-)^{-1}m^-+H^TR^{-1}y\bigr).
$$

Thus the observation adds precision information. The corresponding posterior mean minimizes

$$
(x-m^-)^T(P^-)^{-1}(x-m^-)
+(y-Hx)^TR^{-1}(y-Hx),
$$

so Gaussian updating is also a weighted least-squares problem with a prior penalty.

### 5.4 The Kalman recursion

Consider the discrete-time state-space model

$$
X_t=F_tX_{t-1}+B_tu_t+W_t,\qquad
Y_t=H_tX_t+V_t.
$$

Assume a Gaussian initial state and known deterministic inputs $u_t$. Let the process noise be $W_t\sim\mathcal N(0,Q_t)$ and the observation noise be $V_t\sim\mathcal N(0,R_t)$. The initial state and all noise variables across both types and all times are mutually independent, with $R_t\succ0$.

Write

$$
m_{t|s}=\mathbb E[X_t\mid Y_1,\ldots,Y_s],
\qquad
P_{t|s}=\operatorname{Cov}(X_t\mid Y_1,\ldots,Y_s).
$$

**Prediction.** Propagate the mean and covariance from the previous conditional distribution:

$$
\boxed{
\begin{aligned}
m_{t|t-1}&=F_tm_{t-1|t-1}+B_tu_t,\\
P_{t|t-1}&=F_tP_{t-1|t-1}F_t^T+Q_t.
\end{aligned}
}
$$

**Update.** Apply §5.3 to the new observation:

$$
\begin{aligned}
S_t&=H_tP_{t|t-1}H_t^T+R_t,\\
K_t&=P_{t|t-1}H_t^TS_t^{-1},\\
m_{t|t}&=m_{t|t-1}+K_t(y_t-H_tm_{t|t-1}),\\
P_{t|t}&=P_{t|t-1}-K_tS_tK_t^T.
\end{aligned}
$$

Start from the initial mean $m_{0|0}=m_0$ and covariance $P_{0|0}=P_0$. At each step, the current mean and covariance are sufficient to represent the complete posterior distribution in this linear Gaussian model.

**Example (A scalar random walk).** Suppose $X_t=X_{t-1}+W_t$ and $Y_t=X_t+V_t$. If the previous posterior variance is $1$, the process noise variance is $1/4$, and the observation noise variance is $1$, then

$$
P_{t|t-1}=\frac54,\qquad
K_t=\frac{5/4}{5/4+1}=\frac59,\qquad
P_{t|t}=\frac59.
$$

If the predicted mean is $2$ and the new observation is $3$, the updated mean is $2+5/9=23/9$.

**Scope of the result.** Without Gaussianity, the Kalman recursion still gives the best affine estimate based on the observation history under the corresponding zero-mean, uncorrelated-noise, and known-second-moment assumptions. It need not equal the true conditional mean. Nonlinear models require further approximations; linearizing at the mean introduces the errors discussed in §1.2.


## 6. Likelihood and Point Estimation

### 6.1 Parameters, estimators, and estimates

Let $X_1,\ldots,X_n$ be observations from a family

$$
\{p_\theta:\theta\in\Theta\}
$$

where $\theta$ is an unknown parameter. The statistical problem is to estimate $\theta$ from the observations.

In the frequentist formulation, $\theta$ is fixed but unknown, while the data are random. An **estimator**

$$
\widehat\theta=T(X_1,\ldots,X_n)
$$

is a random variable. Substituting the observed data produces a particular **estimate** $\widehat\theta_{\mathrm{obs}}$. The reliability of the estimator is described by its distribution under repeated sampling.

In the Bayesian formulation, a prior distribution is assigned to the parameter and a posterior distribution expresses uncertainty after observing the data. The two formulations can use the same likelihood, but the objects assigned probabilities and the interpretations of intervals differ.

### 6.2 Likelihood and its maximization

Let $X_1,\ldots,X_n$ be independent and identically distributed with density or mass function $p_\theta$. Given data $x_1,\ldots,x_n$, define

$$
L(\theta;x_1,\ldots,x_n)=\prod_{i=1}^n p_\theta(x_i),
\qquad
\ell(\theta)=\sum_{i=1}^n\log p_\theta(x_i).
$$

The data are held fixed, and the expression is viewed as a function of the parameter. A likelihood is not itself a probability density over parameters and need not integrate to one with respect to $\theta$.

**Definition.** A maximum likelihood estimator (MLE) is

$$
\boxed{
\widehat\theta_{\mathrm{MLE}}\in\operatorname*{arg\,max}_{\theta\in\Theta}
\ell(\theta).
}
$$

Taking logarithms preserves the maximizers and turns a product into a sum. A stationary point found by differentiation is only a candidate: boundaries, parameter constraints, attainment of the maximum, and uniqueness must also be checked.

**Example (A Bernoulli parameter).** If $X_i\sim\operatorname{Bernoulli}(p)$,

$$
\ell(p)=\left(\sum_i x_i\right)\log p+
\left(n-\sum_i x_i\right)\log(1-p).
$$

When $0<\sum_i x_i<n$,

$$
\ell'(p)=\frac{\sum_i x_i}{p}
-\frac{n-\sum_i x_i}{1-p}=0
\quad\Longrightarrow\quad
\widehat p=\overline X.
$$

If all observations are zero or all are one, the maximum over $[0,1]$ occurs at the corresponding boundary.

### 6.3 Estimating a Gaussian mean and variance

Suppose $X_i\overset{\mathrm{iid}}{\sim}\mathcal N(\mu,\sigma^2)$ with $\sigma^2>0$. Then

$$
\ell(\mu,\sigma^2)
=-\frac n2\log(2\pi)-\frac n2\log\sigma^2
-\frac1{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2.
$$

Using the sum-of-squares decomposition

$$
\sum_{i=1}^n(x_i-\mu)^2
=\sum_{i=1}^n(x_i-\overline x)^2+n(\overline x-\mu)^2,
$$

shows that, for every fixed variance, the optimal mean is $\widehat\mu=\overline x$. Differentiating next with respect to $v=\sigma^2$ gives

$$
-\frac n{2v}
+\frac1{2v^2}\sum_{i=1}^n(x_i-\overline x)^2=0.
$$

When the residual sum of squares is positive,

$$
\boxed{
\widehat\mu_{\mathrm{MLE}}=\overline X,\qquad
\widehat{\sigma^2}_{\mathrm{MLE}}
=\frac1n\sum_{i=1}^n(X_i-\overline X)^2.
}
$$

If all observations coincide, the likelihood is unbounded as $\sigma^2\downarrow0$, so there is no maximum with $\sigma^2>0$. For a nondegenerate normal sample with $n\ge2$, this exceptional event has probability zero.

Taking expectations in the identity

$$
\sum_{i=1}^n(X_i-\overline X)^2
=\sum_{i=1}^n(X_i-\mu)^2-n(\overline X-\mu)^2
$$

gives

$$
\mathbb E\!\left[\sum_{i=1}^n(X_i-\overline X)^2\right]
=n\sigma^2-\sigma^2=(n-1)\sigma^2.
$$

Thus the MLE of the variance is biased downward, whereas

$$
\boxed{
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2
}
$$

is unbiased. This unbiasedness requires only independent, identically distributed observations with finite variance, not normality.

### 6.4 Bias and mean squared error

For a scalar parameter, define

$$
\operatorname{Bias}_\theta(\widehat\theta)
=\mathbb E_\theta[\widehat\theta]-\theta.
$$

Decompose the error into a centered random part and a constant part:

$$
\widehat\theta-\theta
=[\widehat\theta-\mathbb E_\theta\widehat\theta]
+[\mathbb E_\theta\widehat\theta-\theta].
$$

The cross term has expectation zero, so

$$
\boxed{
\mathbb E_\theta[(\widehat\theta-\theta)^2]
=\operatorname{Var}_\theta(\widehat\theta)
+\operatorname{Bias}_\theta(\widehat\theta)^2.
}
$$

For vector parameters under squared Euclidean loss, the corresponding identity is

$$
\mathbb E_\theta\|\widehat\theta-\theta\|^2
=\operatorname{tr}\operatorname{Cov}_\theta(\widehat\theta)
+\|\mathbb E_\theta\widehat\theta-\theta\|^2.
$$

Unbiasedness removes only one term. An estimator with a small bias but substantially lower variance can have a smaller total mean squared error.

**Example (Shrinkage toward zero).** Suppose $\overline X$ has mean $\theta$ and variance $\sigma^2/n$. Consider $\widehat\theta_a=a\overline X$, with $0\le a\le1$. Its risk is

$$
\operatorname{MSE}(\widehat\theta_a)
=a^2\frac{\sigma^2}{n}+(1-a)^2\theta^2.
$$

When $\theta$ is near zero, suitable shrinkage can reduce risk. When $\theta$ is large, the bias penalty can be substantial. The effect of regularization must be assessed in relation to the parameter scale or prior information.

### 6.5 Consistency and asymptotic normality

**Definition (Consistency).** An estimator $\widehat\theta_n$ is consistent for $\theta$ if, for every $\varepsilon>0$,

$$
\mathbb P_\theta(|\widehat\theta_n-\theta|>\varepsilon)\longrightarrow0,
$$

We write $\widehat\theta_n\xrightarrow{P}\theta$ for this convergence in probability.

If $\operatorname{MSE}(\widehat\theta_n)\to0$, Markov's inequality gives

$$
\mathbb P_\theta(|\widehat\theta_n-\theta|>\varepsilon)
\le\frac{\operatorname{MSE}(\widehat\theta_n)}{\varepsilon^2}\to0.
$$

Thus convergence in mean square implies consistency in probability.

Unbiasedness is an averaging property at each fixed sample size; consistency is a convergence property as the sample size tends to infinity. Using only the first observation, $\widehat\mu_n=X_1$, can give an unbiased estimator that is not consistent. The variance MLE in §6.3, with denominator $n$, is biased but consistent under finite second moments.

For independent, identically distributed scalar observations with finite nonzero variance, the central limit theorem gives

$$
\boxed{
\sqrt n(\overline X-\mu)\xrightarrow{d}\mathcal N(0,\sigma^2).
}
$$

Here $\xrightarrow{d}$ denotes convergence in distribution. The normalization $\sqrt n$ identifies the sampling error scale.

**Delta method.** If

$$
\sqrt n(\widehat\theta_n-\theta)\xrightarrow{d}\mathcal N(0,V),
$$

and $g$ is differentiable at $\theta$, a first-order Taylor expansion gives

$$
\sqrt n\bigl(g(\widehat\theta_n)-g(\theta)\bigr)
\xrightarrow{d}\mathcal N(0,J_g(\theta)VJ_g(\theta)^T).
$$

This has the same matrix structure as first-order covariance propagation in §1.2. If the first derivative vanishes, the limiting distribution may be degenerate and higher-order terms must be examined.

### 6.6 Fisher information

For one observation, define the score and Fisher information matrix by

$$
s_\theta(X)=\nabla_\theta\log p_\theta(X),\qquad
\mathcal I(\theta)=\mathbb E_\theta[s_\theta(X)s_\theta(X)^T].
$$

Under regularity conditions that justify interchanging differentiation and integration,

$$
\mathbb E_\theta[s_\theta(X)]=0,\qquad
\mathcal I(\theta)
=-\mathbb E_\theta[\nabla_\theta^2\log p_\theta(X)].
$$

Information adds across independent observations. For $n$ identically distributed observations, the total information is $n\mathcal I(\theta)$.

For a scalar parameter and a regular unbiased estimator $T$,

$$
1=\frac{d}{d\theta}\mathbb E_\theta[T]
=\mathbb E_\theta[(T-\theta)s_n],
$$

where $s_n$ is the total score. The Cauchy–Schwarz inequality yields the **Cramér–Rao lower bound**

$$
\boxed{\operatorname{Var}_\theta(T)\ge\frac1{n\mathcal I(\theta)}.}
$$

This bounds the variance of regular unbiased estimators; it does not rule out a smaller MSE for a biased estimator.

Suppose the true parameter $\theta_0$ lies in the interior of the parameter space, the model is identifiable and sufficiently smooth, the information matrix is nonsingular, and the chosen MLE is consistent and satisfies the required local expansion conditions. Then

$$
\sqrt n(\widehat\theta_{\mathrm{MLE}}-\theta_0)
\xrightarrow{d}\mathcal N(0,\mathcal I(\theta_0)^{-1}).
$$

The key step is a Taylor expansion of the score equation:

$$
0=\nabla\ell_n(\widehat\theta)
\approx\nabla\ell_n(\theta_0)
+\nabla^2\ell_n(\theta_0)(\widehat\theta-\theta_0).
$$

Rearranging gives

$$
\sqrt n(\widehat\theta-\theta_0)
\approx
\left[-\frac1n\nabla^2\ell_n(\theta_0)\right]^{-1}
\frac1{\sqrt n}\nabla\ell_n(\theta_0).
$$

The matrix in brackets converges in probability to $\mathcal I(\theta_0)$, while the normalized score converges in distribution to $\mathcal N(0,\mathcal I(\theta_0))$. Their product has limiting covariance $\mathcal I(\theta_0)^{-1}$.

**Qualification.** Consistency, the local expansion, and the score and Hessian limits require regularity assumptions. Boundary parameters, nonidentifiability, or parameter-dependent support may invalidate them.


## 7. Linear Regression and Statistical Inference

### 7.1 Least squares under a linear model

With $n$ responses and $p$ coefficients, consider the model

$$
y=A\beta+\varepsilon,\qquad
A\in\mathbb R^{n\times p},\quad \operatorname{rank}A=p.
$$

For a fixed design, or conditionally on the design matrix, assume

$$
\mathbb E[\varepsilon\mid A]=0,\qquad
\operatorname{Cov}(\varepsilon\mid A)=\sigma^2I_n.
$$

The **ordinary least-squares estimator** minimizes

$$
J(\beta)=\|y-A\beta\|^2.
$$

Since

$$
\nabla_\beta J=-2A^T(y-A\beta),
$$

the normal equations are

$$
A^TA\widehat\beta=A^Ty,
\qquad
\boxed{\widehat\beta=(A^TA)^{-1}A^Ty.}
$$

Let

$$
H_A=A(A^TA)^{-1}A^T,
$$

Then $\widehat y=H_Ay$ is the [orthogonal projection](https://shengzeding.github.io/notes/math/linear-algebra/Elementary_Linear_Algebra.html#orthogonal-projection) of $y$ onto $C(A)$, and the residual $r=(I-H_A)y$ satisfies $A^Tr=0$. Full column rank makes the coefficients unique because $c^TA^TAc=\|Ac\|^2>0$ for $c\ne0$.

**Theorem 7.1 (Mean and covariance of least squares).** Under the stated conditional mean and covariance assumptions, $\widehat\beta$ is conditionally unbiased and has covariance $\sigma^2(A^TA)^{-1}$.

**Proof.** Substituting $y=A\beta+\varepsilon$,

$$
\widehat\beta-\beta=(A^TA)^{-1}A^T\varepsilon,
$$

we obtain

$$
\boxed{
\mathbb E[\widehat\beta\mid A]=\beta,\qquad
\operatorname{Cov}(\widehat\beta\mid A)
=\sigma^2(A^TA)^{-1}.
}
$$

These mean and covariance formulas do not require Gaussian noise. If, in addition, $\varepsilon\mid A\sim\mathcal N(0,\sigma^2I_n)$, then

$$
\widehat\beta\mid A
\sim\mathcal N\!\left(\beta,\sigma^2(A^TA)^{-1}\right).
$$

**Numerical computation.** The inverse formula is useful for analysis. In computation, least squares is usually solved with QR or SVD rather than by explicitly forming an inverse. Forming $A^TA$ squares the condition number in the Euclidean norm: $\kappa_2(A^TA)=\kappa_2(A)^2$.

### 7.2 Gaussian likelihood and weighted least squares

Under the Gaussian error model,

$$
\ell(\beta,\sigma^2\mid A)
=-\frac n2\log(2\pi\sigma^2)
-\frac1{2\sigma^2}\|y-A\beta\|^2.
$$

For fixed $\sigma^2$, maximizing the likelihood is equivalent to minimizing the residual sum of squares. Ordinary least squares is therefore also the MLE of $\beta$.

If the error covariance is a known positive definite matrix $\Omega$, so that

$$
\varepsilon\mid A\sim\mathcal N(0,\Omega),
$$

the appropriate objective is

$$
(y-A\beta)^T\Omega^{-1}(y-A\beta).
$$

The generalized least-squares solution is

$$
\boxed{
\widehat\beta_{\mathrm{GLS}}
=(A^T\Omega^{-1}A)^{-1}A^T\Omega^{-1}y.
}
$$

Factor $\Omega=LL^T$ and set $\widetilde y=L^{-1}y$ and $\widetilde A=L^{-1}A$. The problem becomes ordinary least squares after whitening. The weighting thus represents noise precision. Correlated errors require the full covariance structure, not merely separate weights for individual observations.

### 7.3 Residual variance and degrees of freedom

Assume $n>p$. Since $(I-H_A)A\beta=0$,

$$
\operatorname{RSS}=\|y-A\widehat\beta\|^2
=\varepsilon^T(I-H_A)\varepsilon.
$$

The matrix $I-H_A$ is an orthogonal projection of rank $n-p$, so

$$
\mathbb E[\operatorname{RSS}\mid A]
=\sigma^2\operatorname{tr}(I-H_A)
=(n-p)\sigma^2.
$$

An unbiased estimator of the noise variance is

$$
\boxed{s^2=\frac{\operatorname{RSS}}{n-p}.}
$$

Under Gaussian errors, choose an orthonormal basis for the residual subspace. In this basis, the residual has $n-p$ independent $\mathcal N(0,\sigma^2)$ coordinates. Hence

$$
\frac{\operatorname{RSS}}{\sigma^2}\sim\chi^2_{n-p}.
$$

Moreover,

$$
\operatorname{Cov}(H_A\varepsilon,(I-H_A)\varepsilon\mid A)
=\sigma^2H_A(I-H_A)=0.
$$

Joint Gaussianity gives independence of the fitted and residual components, and therefore of $\widehat\beta$ and $\operatorname{RSS}$.

### 7.4 Confidence intervals for coefficients

Dividing a standardized Gaussian coefficient error by the independent residual standard deviation gives

$$
\frac{\widehat\beta_j-\beta_j}
{s\sqrt{[(A^TA)^{-1}]_{jj}}}\sim t_{n-p}.
$$

Thus an exact $1-\alpha$ confidence interval is

$$
\widehat\beta_j
\ \pm\ t_{n-p,\,1-\alpha/2}\,
s\sqrt{[(A^TA)^{-1}]_{jj}},
$$

where $t_{\nu,q}$ is the $q$ quantile of Student's $t$ distribution with $\nu$ degrees of freedom.

A frequentist confidence level of $95\%$ means that, under repeated sampling, intervals constructed by the same procedure cover the true parameter about $95\%$ of the time. After the data are fixed, this is not directly a statement that the fixed parameter has probability $95\%$ of lying in the realized interval.

### 7.5 Estimating a mean and predicting an observation

For a new design vector $a_0\in\mathbb R^p$, the variance of the estimator of the conditional mean $a_0^T\beta$ is

$$
\sigma^2a_0^T(A^TA)^{-1}a_0.
$$

If a new observation is $Y_0=a_0^T\beta+\varepsilon_0$, where $\varepsilon_0$ is independent of the training noise and has the same $\mathcal N(0,\sigma^2)$ distribution, the prediction error variance is

$$
\boxed{
\operatorname{Var}(Y_0-a_0^T\widehat\beta\mid A,a_0)
=\sigma^2\bigl[1+a_0^T(A^TA)^{-1}a_0\bigr].
}
$$

The corresponding prediction interval is

$$
a_0^T\widehat\beta
\ \pm\ t_{n-p,\,1-\alpha/2}\,
s\sqrt{1+a_0^T(A^TA)^{-1}a_0}.
$$

The extra $1$ comes from the new observation's own noise. Uncertainty about the conditional mean and uncertainty about the next observation require different intervals.

### 7.6 A worked straight-line fit

Fit a straight line to

$$
x=(-1,0,1)^T,\qquad y=(0,1,3)^T.
$$

With intercept $\beta_0$ and slope $\beta_1$, the design matrix is

$$
A=\begin{pmatrix}1&-1\\1&0\\1&1\end{pmatrix},
\qquad
A^TA=\begin{pmatrix}3&0\\0&2\end{pmatrix},
\qquad
A^Ty=\begin{pmatrix}4\\3\end{pmatrix}.
$$

Therefore

$$
\widehat\beta=\begin{pmatrix}4/3\\3/2\end{pmatrix},
\qquad
\widehat y=\begin{pmatrix}-1/6\\4/3\\17/6\end{pmatrix},
\qquad
r=\begin{pmatrix}1/6\\-1/3\\1/6\end{pmatrix}.
$$

Both residual orthogonality conditions can be checked directly:

$$
\sum_{i=1}^3r_i=0,\qquad
\sum_{i=1}^3x_ir_i=0.
$$

The residual sum of squares is $1/6$. Since $n-p=1$,

$$
s^2=\frac16,\qquad
s^2(A^TA)^{-1}
=\begin{pmatrix}1/18&0\\0&1/12\end{pmatrix}.
$$

At $x_0=0$, take $a_0=(1,0)^T$. The estimated standard error of the fitted mean is $\sqrt{1/18}$, while the estimated prediction standard error is

$$
\sqrt{\frac16\left(1+\frac13\right)}
=\sqrt{\frac29}.
$$

The prediction error includes the noise of a new observation. There is only one residual degree of freedom, so exact $t$ intervals for this small sample are wide.


## 8. Regularization and Prediction Error

### 8.1 Ridge regression and singular directions

If the columns of $A$ are nearly linearly dependent, $(A^TA)^{-1}$ is large in some directions, making the coefficients sensitive to noise. **Ridge regression** adds a quadratic penalty:

$$
\widehat\beta_\lambda
=\operatorname*{arg\,min}_\beta
\{\|y-A\beta\|^2+\lambda\|\beta\|^2\},
\qquad \lambda>0.
$$

Differentiation gives

$$
\boxed{
\widehat\beta_\lambda=(A^TA+\lambda I_p)^{-1}A^Ty.
}
$$

A positive $\lambda$ guarantees a unique solution even if $A$ is rank-deficient. If $A=U\Gamma V^T$ is a thin SVD with nonzero singular values $\gamma_1,\ldots,\gamma_r$, then

$$
\widehat\beta_\lambda
=\sum_{j=1}^r
\frac{\gamma_j}{\gamma_j^2+\lambda}
v_j u_j^Ty.
$$

The fitted vector is

$$
A\widehat\beta_\lambda
=\sum_{j=1}^r
\frac{\gamma_j^2}{\gamma_j^2+\lambda}\,u_ju_j^Ty.
$$

Ordinary least squares keeps each nonzero singular direction with factor $1$ in the fitted vector. Ridge regression replaces this by a factor in $(0,1)$, with stronger shrinkage for smaller singular values.

The same right singular vectors are the sample principal directions when the columns of $A$ are centered. PCA chooses a smaller subspace; ridge regression continuously shrinks the coefficients along these directions.

Write $M_\lambda=(A^TA+\lambda I_p)^{-1}$. Under the correctly specified linear model,

$$
\operatorname{Bias}(\widehat\beta_\lambda\mid A)
=-\lambda M_\lambda\beta,
$$

$$
\operatorname{Cov}(\widehat\beta_\lambda\mid A)
=\sigma^2M_\lambda A^TA M_\lambda.
$$

Ridge regression reduces variance by introducing bias. Whether the total MSE decreases depends on the signal and the choice of $\lambda$.

### 8.2 A Gaussian prior for the coefficients

Suppose

$$
\beta\sim\mathcal N(0,\tau^2I_p),\qquad
y\mid\beta,A\sim\mathcal N(A\beta,\sigma^2I_n).
$$

Then the negative log posterior, up to an additive constant, is

$$
\frac1{2\sigma^2}\|y-A\beta\|^2
+\frac1{2\tau^2}\|\beta\|^2.
$$

Set

$$
Q=\frac{A^TA}{\sigma^2}+\frac{I_p}{\tau^2},
\qquad h=\frac{A^Ty}{\sigma^2},
\qquad m=Q^{-1}h.
$$

The terms depending on $\beta$ satisfy

$$
\frac12\beta^TQ\beta-\beta^Th
=\frac12(\beta-m)^TQ(\beta-m)-\frac12m^TQm.
$$

Thus the posterior is $\mathcal N(m,Q^{-1})$. Its mean and mode equal the ridge solution, with

$$
\boxed{
\lambda=\frac{\sigma^2}{\tau^2},\qquad
V_{\mathrm{post}}
=\left(\frac{A^TA}{\sigma^2}+\frac{I_p}{\tau^2}\right)^{-1}.
}
$$

This posterior covariance and the frequentist sampling covariance above describe different objects. If the objective is instead written as $\|y-A\beta\|^2/n+\lambda\|\beta\|^2$, the same prior corresponds to $\lambda=\sigma^2/(n\tau^2)$. These conventions must not be mixed.

In practice, features are often put on comparable scales and the intercept is excluded from the penalty; the formulas above penalize every coefficient. When selecting $\lambda$ by cross-validation, preprocessing such as standardization should also be fitted within each training fold to avoid leaking validation information.

### 8.3 Prediction risk and consistency

Let the true regression function satisfy

$$
m(x)=\mathbb E[Y\mid X=x],\qquad
Y=m(X)+\varepsilon,\qquad
\mathbb E[\varepsilon\mid X]=0.
$$

A random training set $\mathcal D$ produces a predictor $\widehat m_{\mathcal D}$. For a new test observation independent of the training set, at a fixed input $x$,

$$
\boxed{
\begin{aligned}
&\mathbb E_{\mathcal D,\varepsilon}
\bigl[(Y-\widehat m_{\mathcal D}(x))^2\mid X=x\bigr]\\
&=\operatorname{Var}(\varepsilon\mid X=x)
+\bigl(\mathbb E_{\mathcal D}\widehat m_{\mathcal D}(x)-m(x)\bigr)^2
+\operatorname{Var}_{\mathcal D}(\widehat m_{\mathcal D}(x)).
\end{aligned}
}
$$

The terms are irreducible noise, squared prediction bias, and prediction variance caused by variation in the training set. To derive the identity, first separate the new observation noise and then apply the bias–variance decomposition from §6.4 to the predictor.

Adding parameters within nested model classes cannot increase the training residual sum of squares. Test error can nevertheless increase because of greater variance. A model that nearly interpolates its training data can still have unstable coefficients or poor extrapolation.

For a linear model, if a sequence of designs satisfies

$$
\frac1nA^TA\longrightarrow Q\succ0,\qquad
\frac1nA^T\varepsilon\xrightarrow{P}0,
$$

then

$$
\widehat\beta-\beta
=\left(\frac1nA^TA\right)^{-1}
\frac1nA^T\varepsilon\xrightarrow{P}0.
$$

These are direct conditions for consistency of least squares. If the conditional mean of the noise is nonzero, or if the design cannot identify a parameter direction, increasing the amount of data need not resolve the problem.


## 9. Monte Carlo Integration and Sampling Error

### 9.1 Integrals as expectations

Suppose the target is

$$
I=\mathbb E_p[f(X)]=\int f(x)p(x)\,dx.
$$

Generate independent, identically distributed samples $X_1,\ldots,X_N\sim p$ and define

$$
\boxed{\widehat I_N=\frac1N\sum_{i=1}^N f(X_i).}
$$

**Theorem 9.1 (Consistency of Monte Carlo integration).** If $\mathbb E_p|f(X)|<\infty$, then $\widehat I_N\to I$ almost surely.

**Proof.** Apply the strong law of large numbers to the independent, identically distributed variables $f(X_i)$.

General integrals can be treated in the same way. If a bounded region $D$ has volume $|D|$ and $U\sim\operatorname{Unif}(D)$, then

$$
\int_D h(x)\,dx=|D|\,\mathbb E[h(U)].
$$

For a nonuniform density $q$ that covers the region where the integrand is nonzero,

$$
\int_D h(x)\,dx
=\mathbb E_q\!\left[\frac{h(X)}{q(X)}\right].
$$

Choosing the sampling distribution also determines the variance structure of the estimator.

### 9.2 Variance and standard error

**Theorem 9.2 (Mean and variance).** If $\sigma_f^2=\operatorname{Var}_p(f(X))<\infty$, then

$$
\boxed{
\mathbb E[\widehat I_N]=I,\qquad
\operatorname{Var}(\widehat I_N)=\frac{\sigma_f^2}{N}.
}
$$

**Proof.** Each summand has mean $I$, and independence removes the covariance terms:

$$
\operatorname{Var}(\widehat I_N)
=\frac1{N^2}\sum_{i=1}^N\operatorname{Var}(f(X_i))
=\frac{\sigma_f^2}{N}.
$$

Since the estimator is unbiased, its root mean squared error is

$$
\operatorname{RMSE}(\widehat I_N)
=\frac{\sigma_f}{\sqrt N}.
$$

Halving the typical error usually requires four times as many samples. The exponent does not explicitly depend on dimension, but $\sigma_f$, sampling cost, and the probability of important regions can still change dramatically with dimension. This rate does not remove all difficulties of high-dimensional integration.

For $N\ge2$, use

$$
s_f^2=\frac1{N-1}\sum_{i=1}^N(f(X_i)-\widehat I_N)^2
$$

to estimate $\sigma_f^2$. The **estimated standard error** is

$$
\boxed{\widehat{\operatorname{SE}}(\widehat I_N)=\frac{s_f}{\sqrt N}.}
$$

The sample standard deviation $s_f$ describes the spread of individual function values; $s_f/\sqrt N$ describes the sampling fluctuation of their average. They are different quantities.

When $0<\sigma_f^2<\infty$, the central limit theorem and consistency of the sample variance give

$$
\frac{\widehat I_N-I}{s_f/\sqrt N}\xrightarrow{d}\mathcal N(0,1).
$$

An approximate large-sample $1-\alpha$ confidence interval is therefore

$$
\boxed{
\widehat I_N\pm z_{1-\alpha/2}\frac{s_f}{\sqrt N}.
}
$$

Here $z_q$ is the standard normal quantile; for a $95\%$ interval, it is approximately $1.96$. This is not a deterministic error bound. If $f(X)$ itself is normally distributed, replacing the normal quantile by the $t_{N-1}$ quantile gives an exact finite-sample interval.

### 9.3 Sample size and rare events

To target an approximate interval half-width no greater than $\varepsilon$, an independent pilot experiment can estimate the standard deviation $s_{\mathrm{pilot}}$. The main sample size can then be planned as

$$
N\approx
\left\lceil
\frac{z_{1-\alpha/2}^2s_{\mathrm{pilot}}^2}{\varepsilon^2}
\right\rceil.
$$

This is a plan based on an estimated variance and an asymptotic approximation, not a strict guarantee. Repeatedly checking the interval and stopping as soon as it is sufficiently narrow can change the coverage of a fixed-sample procedure. Rigorous sequential guarantees require an appropriate sequential inference method.

When the finite variance is known, Chebyshev's inequality gives the nonasymptotic bound

$$
\mathbb P(|\widehat I_N-I|\ge\varepsilon)
\le\frac{\sigma_f^2}{N\varepsilon^2},
$$

It is usually more conservative than the normal approximation. Replacing the true variance by a sample variance does not automatically preserve the same rigorous bound.

**Example (A rare event).** To estimate $p_A=\mathbb P(X\in A)$, take $f=\mathbf1_A$. Then

$$
\operatorname{Var}(\widehat p_A)=\frac{p_A(1-p_A)}{N},
\qquad
\frac{\operatorname{SE}(\widehat p_A)}{p_A}
=\sqrt{\frac{1-p_A}{Np_A}}.
$$

For small $p_A$, relative precision is controlled by the expected number of hits, $Np_A$. If no sample hits the event, plugging in the sample variance gives zero standard error, but this does not mean that the event probability has been determined exactly.

With a preassigned sample size $N$ and independent Bernoulli trials, zero hits gives the exact one-sided $1-\alpha$ upper confidence bound

$$
p_A\le 1-\alpha^{1/N}
\approx\frac{-\log\alpha}{N}.
$$

For $95\%$ confidence, this is approximately $3/N$. It follows from the zero-hit probability $(1-p_A)^N$ and does not use a normal approximation.

If $f(X)$ is integrable but has infinite variance, the law of large numbers can still give convergence of the sample mean. The finite-variance CLT, standard-error interpretation, and $N^{-1/2}$ precision statements above no longer apply directly.

### 9.4 The effect of correlated samples

When the values $F_i=f(X_i)$ are not independent, the general variance formula is

$$
\operatorname{Var}\!\left(\frac1N\sum_{i=1}^NF_i\right)
=\frac1{N^2}\sum_{i=1}^N\sum_{j=1}^N
\operatorname{Cov}(F_i,F_j).
$$

For a stationary sequence with finite nonzero variance $\sigma_f^2$ and lag correlations $\rho_k$, the exact expression is

$$
\boxed{
\operatorname{Var}(\widehat I_N)
=\frac{\sigma_f^2}{N}
\left[1+2\sum_{k=1}^{N-1}
\left(1-\frac{k}{N}\right)\rho_k\right].
}
$$

If the correlations are absolutely summable and the sequence also satisfies suitable mixing or ergodicity conditions that ensure a CLT, a common approximation is

$$
\tau_{\mathrm{int}}=1+2\sum_{k=1}^{\infty}\rho_k,\qquad
N_{\mathrm{eff}}\approx\frac{N}{\tau_{\mathrm{int}}},
$$

$$
\operatorname{SE}(\widehat I_N)
\approx\sqrt{\frac{\sigma_f^2\tau_{\mathrm{int}}}{N}}.
$$

Positive correlation usually lowers the effective sample size; negative correlation can make it exceed the number of samples. This effective sample size depends on the particular function $f$ and is not the same definition as the weight diagnostic in §10.3.

Standard errors for MCMC output should use methods appropriate for correlated sequences, such as batch means or spectral variance estimation. Starting away from the target distribution can introduce additional bias. A correlation correction alone does not establish convergence.


## 10. Importance Sampling

### 10.1 A change of sampling density

Keep the target $I=\int f(x)p(x)\,dx$, but sample from a proposal density $q$. Require $q(x)>0$ wherever $f(x)p(x)\ne0$, up to null sets, and assume that the required density ratio can be evaluated.

Define the weight

$$
w(x)=\frac{p(x)}{q(x)}.
$$

Then

$$
I=\int f(x)w(x)q(x)\,dx
=\mathbb E_q[f(X)w(X)].
$$

For $X_i\overset{\mathrm{iid}}{\sim}q$,

$$
\boxed{
\widehat I_{\mathrm{IS}}
=\frac1N\sum_{i=1}^N f(X_i)w(X_i).
}
$$

The estimator is unbiased when the target is absolutely integrable and the support condition holds. Under the additional second-moment condition,

$$
\boxed{
\operatorname{Var}(\widehat I_{\mathrm{IS}})
=\frac1N\left[
\int\frac{f(x)^2p(x)^2}{q(x)}\,dx-I^2
\right].
}
$$

Estimate the standard error from the sample variance of the **weighted function values** $Z_i=f(X_i)w(X_i)$, not from the unweighted values $f(X_i)$.

Importance sampling does not automatically reduce variance. If $q$ is too small in a tail region that contributes substantially to the integral, a few samples can receive enormous weights; the variance may even become infinite.

### 10.2 The variance-minimizing density

Suppose $0<C=\int|f(x)|p(x)\,dx<\infty$. By Cauchy–Schwarz,

$$
C^2
=\left(\int\frac{|f|p}{\sqrt q}\sqrt q\,dx\right)^2
\le\int\frac{f^2p^2}{q}\,dx.
$$

Equality is attained for

$$
\boxed{q^*(x)=\frac{|f(x)|p(x)}{C}.}
$$

The minimum variance is $(C^2-I^2)/N$, which is zero when $f$ has a fixed sign.

For example, if $f\ge0$ and $I>0$, then $q^*=fp/I$ makes every weighted function value equal to $I$. This optimal density usually involves an unknown integral or is difficult to sample from directly. Its main practical role is to guide proposal design toward regions with large contributions to the integral.

### 10.3 Unknown normalizing constants

Suppose the target density is known only in unnormalized form,

$$
p(x)=\frac{\widetilde p(x)}{Z},
$$

where $Z$ is unknown. The ordinary weight $p/q$ cannot be evaluated directly. Define

$$
\widetilde w_i=\frac{\widetilde p(X_i)}{q(X_i)},\qquad
\overline w_i=\frac{\widetilde w_i}{\sum_j\widetilde w_j},
$$

and form the ratio estimator

$$
\boxed{
\widehat I_{\mathrm{SN}}
=\frac{\sum_i\widetilde w_i f(X_i)}
{\sum_i\widetilde w_i}
=\sum_i\overline w_i f(X_i).
}
$$

Here $q>0$ must cover the region where $p>0$. If the numerator has a finite first absolute moment and $0<\mathbb E_q[\widetilde w]=Z<\infty$, the numerator and denominator sample averages converge by the law of large numbers, giving consistency. The finite-sample denominator must be nonzero; the ratio estimator is generally biased.

If the numerator and denominator satisfy a joint CLT, the delta method gives

$$
\sqrt N(\widehat I_{\mathrm{SN}}-I)
\xrightarrow{d}\mathcal N\!\left(
0,\frac{\mathbb E_q[\widetilde w^2(f-I)^2]}{Z^2}
\right).
$$

A corresponding asymptotic standard-error estimate is

$$
\boxed{
\widehat{\operatorname{SE}}(\widehat I_{\mathrm{SN}})
\approx
\sqrt{\sum_{i=1}^N\overline w_i^2
\bigl(f(X_i)-\widehat I_{\mathrm{SN}}\bigr)^2}.
}
$$

A common weight diagnostic is

$$
N_{\mathrm{eff},w}
=\frac{(\sum_i\widetilde w_i)^2}{\sum_i\widetilde w_i^2}
=\frac1{\sum_i\overline w_i^2}.
$$

This lies in $[1,N]$ and measures the concentration of the observed weights. It ignores the particular integrand and cannot detect important regions that were missed entirely. It is therefore not a universal guarantee of precision.


## 11. Variance Reduction

### 11.1 Control variates and least squares

Suppose the target is $I=\mathbb E[F]$, and a correlated random variable $H$ has known mean $\mu_H$. Define

$$
Z_c=F-c(H-\mu_H).
$$

Since $\mathbb E[H-\mu_H]=0$, we have $\mathbb E[Z_c]=I$ for every fixed $c$. Moreover,

$$
\operatorname{Var}(Z_c)
=\operatorname{Var}(F)-2c\operatorname{Cov}(F,H)
+c^2\operatorname{Var}(H).
$$

If $\operatorname{Var}(H)>0$, differentiation with respect to $c$ gives

$$
\boxed{
c^*=\frac{\operatorname{Cov}(F,H)}{\operatorname{Var}(H)},
\qquad
\operatorname{Var}(Z_{c^*})
=\operatorname{Var}(F)(1-\rho_{FH}^2).
}
$$

This projects $F-\mathbb E[F]$ onto the direction $H-\mu_H$ and applies Monte Carlo only to the residual. For a vector of control variates $H$, the optimal coefficient is

$$
c^*=\Sigma_{HH}^{-1}\operatorname{Cov}(H,F),
$$

provided $\Sigma_{HH}\succ0$. These are the same normal equations as for LMMSE in §5.1.

**Example (A polynomial integrand).** Let $U\sim\operatorname{Unif}[0,1]$. To estimate $\mathbb E[U^2]=1/3$, choose $H=U$ with $\mu_H=1/2$. Since

$$
\operatorname{Var}(U^2)=\frac15-\frac19=\frac4{45},
\quad
\operatorname{Cov}(U^2,U)=\frac14-\frac16=\frac1{12},
\quad
\operatorname{Var}(U)=\frac1{12},
$$

the optimal coefficient is $c^*=1$, and the variance after applying the control is

$$
\frac4{45}-\frac{(1/12)^2}{1/12}=\frac1{180}.
$$

For the same number of independent samples, the variance is reduced to $1/16$ of its original value, and the standard error to $1/4$.

If $c^*$ is unknown, estimate it in an independent pilot experiment and hold the coefficient fixed during the main experiment. Conditional on the pilot experiment, the main estimator remains unbiased. If the same samples are used both to fit the coefficient and to compute the corrected mean, finite-sample unbiasedness is not generally guaranteed.

### 11.2 Antithetic pairs

If $U\sim\operatorname{Unif}[0,1]$, then $1-U$ has the same distribution. Define the paired estimate

$$
Z=\frac{f(U)+f(1-U)}2.
$$

It preserves the target expectation, and

$$
\operatorname{Var}(Z)
=\frac12\operatorname{Var}(f(U))
+\frac12\operatorname{Cov}(f(U),f(1-U)).
$$

Using $N$ independent pairs gives $\widehat I_{\mathrm A}=N^{-1}\sum_i Z_i$ and requires $2N$ function evaluations. Compared with $2N$ independent ordinary samples,

$$
\frac{\operatorname{Var}(\widehat I_{\mathrm A})}
{\operatorname{Var}(\widehat I_{2N})}
=1+\rho_{\mathrm{pair}}.
$$

Negative correlation is therefore needed for a variance improvement at the same evaluation budget. For a monotone scalar function $f$, the functions $f(U)$ and $f(1-U)$ have opposite monotonicity, so their covariance is nonpositive.

**Example.** If $f(u)=u$, every pair averages to $1/2$, giving zero estimator variance.

Error estimation should use the $N$ independent **pair averages** $Z_i$ as the sampling units. The $2N$ correlated function values within those pairs must not be treated as independent observations.

### 11.3 Conditioning before sampling

For square-integrable $F$, choose a variable $Y$ for which the conditional expectation is tractable, and let

$$
G(Y)=\mathbb E[F\mid Y].
$$

The laws of total expectation and total variance give

$$
\boxed{
\mathbb E[G(Y)]=\mathbb E[F],\qquad
\operatorname{Var}(G(Y))
=\operatorname{Var}(F)-\mathbb E[\operatorname{Var}(F\mid Y)].
}
$$

If $G$ can be computed exactly, replacing $F_i$ by $G(Y_i)$ cannot increase the variance per sample. Randomness that can be averaged out analytically is integrated away before sampling the remaining part.

**Example (Integrating out an indicator).** Let $U$ and $V$ be independent and uniformly distributed on $[0,1]$. The target is $\mathbb P(U+V>1)$. Direct simulation uses

$$
F=\mathbf1_{\{U+V>1\}},
\qquad
\operatorname{Var}(F)=\frac14.
$$

Conditioning on $U$ instead gives

$$
G(U)=\mathbb P(V>1-U\mid U)=U,
\qquad
\operatorname{Var}(G)=\frac1{12}.
$$

At the same sample size, the variance is reduced to one third of the original value, and there is no need to generate $V$.

The classical Rao–Blackwell theorem conditions a statistical estimator on a sufficient statistic. The argument here uses the same conditional-expectation and variance-decomposition principles. If $G$ must itself be approximated by an inner Monte Carlo calculation, the inner error and computational cost must also be included.

### 11.4 Stratification and allocation

Partition the sample space into disjoint strata $A_1,\ldots,A_K$. Write their probabilities and conditional means as

$$
w_k=\mathbb P(X\in A_k),\qquad
\mu_k=\mathbb E[f(X)\mid X\in A_k].
$$

Assume the stratum probabilities $w_k$ are known. By total expectation,

$$
I=\sum_{k=1}^K w_k\mu_k.
$$

Draw $N_k$ samples independently within each stratum, with independent sampling across strata, and compute each stratum mean $\widehat\mu_k$. Then

$$
\widehat I_{\mathrm{str}}=\sum_{k=1}^K w_k\widehat\mu_k,
\qquad
\operatorname{Var}(\widehat I_{\mathrm{str}})
=\sum_{k=1}^K\frac{w_k^2\sigma_k^2}{N_k},
$$

where $\sigma_k^2=\operatorname{Var}(f(X)\mid X\in A_k)$.

With equal cost per sample and a fixed total $\sum_kN_k=N$, a continuous relaxation of the allocation problem gives, by Lagrange multipliers,

$$
-\frac{w_k^2\sigma_k^2}{N_k^2}+\lambda=0,
\qquad
\boxed{N_k\propto w_k\sigma_k.}
$$

More samples are allocated to strata with greater probability mass and larger internal variation. Practical allocation must also handle integer sample sizes, zero-variance strata, and the cost of pilot estimates of $\sigma_k$.


## 12. Nonlinear Outputs and Stochastic Gradients

### 12.1 Propagation through a nonlinear map

Suppose an input or parameter has distribution $X\sim p$, and a model produces $Z=g(X)$. Samples

$$
X_i\sim p,\qquad Z_i=g(X_i)
$$

can estimate the output mean, variance, quantiles, or failure probabilities. This complements the linearized propagation in §1.2: Monte Carlo does not require $g$ to be nearly linear, but it does require feasible sampling and an adequate computational budget.

Output dispersion and Monte Carlo error in estimating the output mean are different quantities:

$$
\operatorname{SD}(Z)
\quad\text{and}\quad
\operatorname{SE}(\widehat{\mathbb E[Z]})
\approx\frac{\operatorname{SD}(Z)}{\sqrt N}.
$$

Increasing $N$ reduces the latter; it does not remove physical noise or posterior uncertainty from the model. Quantile estimation also requires a different standard-error calculation from mean estimation.

### 12.2 A squared Gaussian state

Consider the scalar observation model

$$
X\sim\mathcal N(0,4),\qquad
Y=X+\varepsilon,\qquad
\varepsilon\sim\mathcal N(0,1),\qquad y=3.
$$

The conditional distribution is

$$
X\mid Y=3\sim\mathcal N(m,v),
\qquad m=2.4,\quad v=0.8.
$$

Suppose the physical quantity of interest is $Z=X^2$. Substituting the state estimate gives only $m^2=5.76$, whereas the minimum mean squared error estimate of the output is

$$
\boxed{
\mathbb E[Z\mid Y=3]=\mathbb E[X^2\mid Y=3]
=m^2+v=6.56.
}
$$

The difference is the posterior variance $v$. Estimating a state and then applying a nonlinear function generally differs from estimating the nonlinear output directly.

Write $X=m+\sqrt v\,U$, where $U\sim\mathcal N(0,1)$. Using

$$
\mathbb E[U]=\mathbb E[U^3]=0,\qquad
\mathbb E[U^2]=1,\qquad
\mathbb E[U^4]=3,
$$

gives

$$
\boxed{
\operatorname{Var}(X^2\mid Y=3)
=4m^2v+2v^2=19.712.
}
$$

If $N=10\,000$ independent posterior samples are used to estimate the output mean, the theoretical standard error is approximately

$$
\sqrt{\frac{19.712}{10\,000}}\approx0.0444.
$$

This measures the sampling error in computing $6.56$. The output itself has posterior standard deviation approximately $\sqrt{19.712}\approx4.44$.

### 12.3 A control variate for the squared state

The posterior mean $\mathbb E[X\mid Y=3]=m$ is known, so $H=X$ can serve as a control variate. Gaussian moments give

$$
\operatorname{Cov}(X^2,X\mid Y=3)=2mv.
$$

Hence the optimal control coefficient is

$$
c^*=\frac{2mv}{v}=2m=4.8.
$$

The controlled function value is

$$
F_{\mathrm{CV}}=X^2-2m(X-m)
=(X-m)^2+m^2.
$$

Its expectation remains $m^2+v$, but its variance is only

$$
\operatorname{Var}(F_{\mathrm{CV}}\mid Y=3)=2v^2=1.28.
$$

With the same $10\,000$ independent samples, the theoretical standard error is approximately $0.0113$, and the variance reduction factor is $19.712/1.28=15.4$.

The control removes the term linear in the centered Gaussian variable. Only the fluctuation of its square remains.


### 12.5 Differentiating an expectation

In stochastic optimization, the objective is often written as

$$
J(\theta)=\mathbb E_\xi[\ell(\theta,\xi)].
$$

If the sampling distribution does not depend on $\theta$, and differentiation can be interchanged with expectation,

$$
\nabla J(\theta)=\mathbb E_\xi[\nabla_\theta\ell(\theta,\xi)].
$$

Thus the independent minibatch gradient

$$
\widehat g_B=\frac1B\sum_{i=1}^B\nabla_\theta\ell(\theta,\xi_i)
$$

is unbiased for the gradient at a fixed $\theta$, and its covariance scales as $1/B$. Control variates can reduce gradient noise. Optimization additionally involves step sizes, changing parameters, and dependence across iterations, so an integration-error formula at one step is not a convergence proof for the entire optimization procedure.

If the sampling density itself is $p_\theta$, an additional score term appears under the appropriate regularity conditions:

$$
\nabla_\theta\mathbb E_{p_\theta}[f_\theta(X)]
=\mathbb E_{p_\theta}\!\left[
\nabla_\theta f_\theta(X)
+f_\theta(X)\nabla_\theta\log p_\theta(X)
\right].
$$

The second term contains the score from §6.6 and accounts for the dependence of the sampling law on the parameter.

