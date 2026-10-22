# Determinants

## 1. Determinants: Definitions and Basic Tools

### 1.1 The permutation formula

Let $A=(a_{ij})\in F^{n\times n}$, where $F$ is a field such as $\mathbb R$ or $\mathbb C$.

**Definition.** The **determinant** of $A$ is

$$
\det A=\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)
\prod_{i=1}^n a_{i,\sigma(i)}.
$$

Here $S_n$ is the set of all permutations of $1,\ldots,n$, and

$$
\operatorname{sgn}(\sigma)=(-1)^{\tau(\sigma)},
$$

where $\tau(\sigma)$ is the number of inversions: pairs $i<j$ with $\sigma(i)>\sigma(j)$. An even permutation contributes a positive sign; an odd permutation contributes a negative sign.

There are $n!$ terms. Each term chooses exactly one entry from every row and exactly one from every column. Thus the determinant is a polynomial in the $n^2$ entries of the matrix, homogeneous of total degree $n$ and linear in each row separately.

The notation $|A|$ also means $\det A$. It does not mean the absolute value of a matrix. The ordinary absolute value of a determinant is written $|\det A|$.

The permutation formula defines the determinant precisely, but is rarely the best way to calculate it. Most calculations aim either to make the matrix triangular or to reduce the size of the determinant.

### 1.2 The properties used in calculations

The basic properties are as follows. Every row statement also has a column version.

| Operation or structure | Effect on the determinant |
|---|---|
| Transpose the matrix | $\det A^T=\det A$ |
| Interchange two rows | The determinant changes sign |
| Multiply one row by $c$ | The determinant is multiplied by $c$ |
| Split one row as $u+v$ | The determinant splits into the sum of the two corresponding determinants |
| Add a multiple of one row to another | The determinant is unchanged |
| Upper or lower triangular matrix | The determinant is the product of the diagonal entries |

The scaling and splitting rules together express **multilinearity**. For example, with all other rows fixed,

$$
\det(\ldots,cu+dv,\ldots)
=c\det(\ldots,u,\ldots)+d\det(\ldots,v,\ldots).
$$

The determinant vanishes if two rows are equal, or more generally if the rows are linearly dependent. The row-addition rule follows from multilinearity: the extra summand has two proportional rows and is zero.

**A distinction to keep straight.** Multilinearity is linearity in one row at a time. It does not imply $\det(A+B)=\det A+\det B$. Also, multiplying the whole $n\times n$ matrix by $c$ scales all $n$ rows, so

$$
\det(cA)=c^n\det A.
$$

The determinant can also be characterized through row-operation rules together with its value on triangular matrices. This gives an equivalent route to the permutation definition: reduce a matrix by elimination while tracking each operation's effect.

### 1.3 Cofactor expansion

For $A\in F^{n\times n}$, let $M_{ij}$ be the determinant obtained by deleting row $i$ and column $j$. The **cofactor** of $a_{ij}$ is

$$
C_{ij}=(-1)^{i+j}M_{ij}.
$$

**Theorem 1.1 (Cofactor expansion).** Expanding along any fixed row $i$ gives

$$
\boxed{\det A=\sum_{j=1}^n a_{ij}C_{ij}.}
$$

Similarly, expansion along column $j$ gives $\det A=\sum_i a_{ij}C_{ij}$.

A useful companion identity is

$$
\boxed{\sum_{k=1}^n a_{ik}C_{jk}=\delta_{ij}\det A,}
$$

where the **Kronecker delta** is

$$
\delta_{ij}=\begin{cases}1,&i=j,\\0,&i\ne j.\end{cases}
$$

For $i=j$, this is ordinary expansion along row $i$. For $i\ne j$, replace row $j$ by row $i$ and expand along the replaced row. Its cofactors are unchanged, but the new matrix has two equal rows, so its determinant is zero.

Define the **adjugate** by transposing the cofactor matrix:

$$
\operatorname{adj}(A)=(C_{ji}).
$$

The cofactor identities become

$$
A\operatorname{adj}(A)=\operatorname{adj}(A)A=(\det A)I_n.
$$

In particular, if $\det A\ne0$,

$$
A^{-1}=\frac{\operatorname{adj}(A)}{\det A}.
$$

We use $\operatorname{adj}(A)$ for the adjugate so that it is not confused with the conjugate transpose $A^*$.

### 1.4 Cramer's rule

**Theorem 1.2.** If $A\in F^{n\times n}$ and $D=\det A\ne0$, then $AX=b$ has the unique solution

$$
\boxed{x_j=\frac{D_j}{D},\qquad j=1,\ldots,n,}
$$

where $D_j$ is obtained by replacing column $j$ of $A$ by $b$:

$$
D_j=\det(A_1,\ldots,A_{j-1},b,A_{j+1},\ldots,A_n).
$$

**Proof.** Since $b=\sum_kx_kA_k$, multilinearity in the replaced column gives

$$
D_j=\sum_kx_k
\det(A_1,\ldots,A_{j-1},A_k,A_{j+1},\ldots,A_n).
$$

Every term with $k\ne j$ has a repeated column. Only $x_j\det A$ survives. Dividing by $D$ gives the formula. Existence and uniqueness also follow from $X=A^{-1}b$.

---

## 2. Computing Determinants as Polynomials

### 2.1 Coefficients, factors, and degree bounds

A determinant whose entries depend polynomially on parameters is itself a polynomial in those parameters. This allows two useful strategies:

- Determine its coefficients using symmetry, special values, and degree bounds.
- Find enough polynomial factors, then determine the remaining constant from a leading coefficient.

For a nonzero polynomial of degree $n$ over $\mathbb C$, its $n$ roots, counted with multiplicity, and its leading coefficient determine it:

$$
f(x)=a_n\prod_{i=1}^n(x-\lambda_i).
$$

The same idea applies to a determinant regarded as a polynomial in one of its entries or parameters.

### 2.2 One determinant, three methods

Consider

$$
D(x,y)=
\begin{vmatrix}
1+x&1&1&1\\
1&1-x&1&1\\
1&1&1+y&1\\
1&1&1&1-y
\end{vmatrix}.
$$

**Method 1: direct row reduction.** Replace $R_1$ by $R_1-R_2$ and $R_3$ by $R_3-R_4$, then factor $x$ and $y$ from those rows:

$$
D=xy\begin{vmatrix}
1&1&0&0\\
1&1-x&1&1\\
0&0&1&1\\
1&1&1&1-y
\end{vmatrix}.
$$

Now subtract $R_1+R_3$ from each of $R_2$ and $R_4$:

$$
D=xy\begin{vmatrix}
1&1&0&0\\
0&-x&0&0\\
0&0&1&1\\
0&0&0&-y
\end{vmatrix}=x^2y^2.
$$

No division by $x$ or $y$ is needed, so this calculation includes their zero values.

**Method 2: enlarge the determinant.** Add a first row and column so that expansion down the first column recovers $D$:

$$
D=\begin{vmatrix}
1&1&1&1&1\\
0&1+x&1&1&1\\
0&1&1-x&1&1\\
0&1&1&1+y&1\\
0&1&1&1&1-y
\end{vmatrix}.
$$

Subtract the first row from each subsequent row:

$$
D=\begin{vmatrix}
1&1&1&1&1\\
-1&x&0&0&0\\
-1&0&-x&0&0\\
-1&0&0&y&0\\
-1&0&0&0&-y
\end{vmatrix}.
$$

For nonzero $x,y$, eliminate the last four entries of the first row using the diagonal entries below them. Its first entry becomes

$$
1+\frac1x-\frac1x+\frac1y-\frac1y=1.
$$

The determinant is therefore $x(-x)y(-y)=x^2y^2$. Since both sides are polynomials, the identity extends to $x=0$ or $y=0$ as well.

**Method 3: determine the polynomial.** Each variable occurs in only two rows, so its degree in $D$ is at most $2$. Write

$$
D(x,y)=a_2(y)x^2+a_1(y)x+a_0(y).
$$

At $x=0$, the first two rows are equal, so $a_0(y)=0$. Simultaneously interchanging the first two rows and the first two columns replaces $x$ by $-x$ without changing the determinant. Thus $D(x,y)=D(-x,y)$ and $a_1(y)=0$.

The same argument for $y$ shows that $D(x,y)=c x^2y^2$. The coefficient of $x^2y^2$ comes from choosing $x,-x,y,-y$ on the main diagonal, giving $c=1$. Hence

$$
\boxed{D(x,y)=x^2y^2.}
$$

**Technique worth keeping.** A degree bound plus symmetry can replace a long expansion. Before calculating entries, ask which coefficients are forced to vanish.

### 2.3 Finding linear factors

Let

$$
D=\begin{vmatrix}
x&y&z&w\\
y&x&w&z\\
z&w&x&y\\
w&z&y&x
\end{vmatrix}.
$$

Adding the last three rows to the first makes every entry of the first row equal to $x+y+z+w$. Thus this linear polynomial divides $D$.

Other signed row combinations produce the factors

$$
x+y-z-w,\qquad x-y+z-w,\qquad x-y-z+w.
$$

For example, replacing the first row by $R_1+R_2-R_3-R_4$ produces

$$
(x+y-z-w)(1,1,-1,-1).
$$

Over $\mathbb R$ or $\mathbb C$, these four linear polynomials are pairwise nonproportional and therefore relatively prime. Their product divides $D$. Both the product and the determinant have total degree $4$, and the coefficient of $x^4$ is $1$ in each. Consequently,

$$
\boxed{
D=(x+y+z+w)(x+y-z-w)(x-y+z-w)(x-y-z+w).
}
$$

### 2.4 Representing a polynomial by a determinant

Define

$$
F_n(\lambda)=\det\begin{pmatrix}
\lambda&0&\cdots&0&a_n\\
-1&\lambda&\cdots&0&a_{n-1}\\
0&-1&\ddots&0&a_{n-2}\\
\vdots&\vdots&\ddots&\lambda&a_2\\
0&0&\cdots&-1&\lambda+a_1
\end{pmatrix}.
$$

The matrix has $\lambda$ on the first $n-1$ diagonal positions, $-1$ immediately below the diagonal, and the coefficients in its last column. The base case is $F_1(\lambda)=\lambda+a_1$.

Expanding along the first row gives

$$
F_n(\lambda)
=\lambda F_{n-1}(\lambda)
+(-1)^{1+n}a_n(-1)^{n-1}
=\lambda F_{n-1}(\lambda)+a_n.
$$

Here $F_{n-1}$ uses the coefficients $a_1,\ldots,a_{n-1}$. Repeated substitution yields

$$
\boxed{F_n(\lambda)=\lambda^n+a_1\lambda^{n-1}+\cdots+a_n.}
$$

This connects polynomial expressions with structured matrices: every monic polynomial can be realized by a determinant of this form.


## 3. Minors and Laplace Expansion

### 3.1 Minors, complementary minors, and signs

Let $A\in F^{n\times n}$ and choose increasing index sets

$$
I=\{i_1<\cdots<i_k\},\qquad
J=\{j_1<\cdots<j_k\}.
$$

Write $A[I,J]$ for the submatrix using those rows and columns, in their original order.

**Definition.** The **minor of order $k$** determined by $I,J$ is

$$
D(I,J)=\det A[I,J].
$$

Let $I^c,J^c$ denote the complementary index sets. The corresponding **complementary minor** is

$$
M(I,J)=\det A[I^c,J^c].
$$

The **signed complementary minor**, or generalized cofactor, is

$$
\widehat D(I,J)=(-1)^{\sum I+\sum J}M(I,J),
$$

where $\sum I=i_1+\cdots+i_k$, and similarly for $J$.

The original order of the selected indices matters. Reordering rows or columns changes the determinant's sign. When $k=1$, this definition reduces to the ordinary cofactor $C_{ij}$.

### 3.2 Laplace's theorem

**Theorem 3.1 (Laplace expansion).** Fix a set $I$ of $k$ rows. Then

$$
\boxed{
\det A=
\sum_{\substack{J\subseteq\{1,\ldots,n\}\\|J|=k}}
(-1)^{\sum I+\sum J}
\det A[I,J]\det A[I^c,J^c].
}
$$

There is an analogous expansion along any fixed set of $k$ columns. Ordinary cofactor expansion is the case $k=1$.

Laplace expansion is especially useful when a block pattern or many zeros make most selected minors vanish. Its purpose is to organize a determinant into products of smaller determinants.

### 3.3 Why every term appears with the correct sign

**Step 1: group the terms.** In a permutation term of $\det A$, the fixed rows $I$ use some set $J$ of $k$ columns. The other rows must use $J^c$. There are

$$
\binom nk k!(n-k)!=n!
$$

choices in total: choose $J$, choose a matching between $I$ and $J$, and choose a matching between their complements. Every permutation term belongs to exactly one such group.

**Step 2: check the leading-block case.** If $I=J=\{1,\ldots,k\}$, the chosen permutations do not cross between the two diagonal blocks. Their signs are the products of the signs within those blocks. Therefore their contribution is

$$
\det A[I,J]\det A[I^c,J^c].
$$

**Step 3: move the general case into that position.** Moving the selected rows to the first $k$ positions, preserving their relative order, requires

$$
\sum_{a=1}^k(i_a-a)
$$

adjacent row interchanges. Moving the selected columns likewise requires $\sum_a(j_a-a)$ interchanges. The combined sign is

$$
(-1)^{\sum I+\sum J-2(1+\cdots+k)}
=(-1)^{\sum I+\sum J}.
$$

This is exactly the sign in the generalized cofactor. Thus every grouped product has the same sign as its corresponding permutation term, proving the formula.

### 3.4 Block triangular determinants

A particularly important consequence is

$$
\boxed{
\det\begin{pmatrix}A&B\\0&D\end{pmatrix}
=\det A\det D,
}
$$

where $A,D$ are square, possibly of different sizes. The same holds for a block lower triangular matrix.

To see this, expand along the rows of the lower block. Any selected minor using a column from the zero block vanishes. Only the columns occupied by $D$ survive, with complementary minor $\det A$ and positive sign.

For a general block matrix, one cannot replace the determinant by a scalar-looking expression such as $\det(AD-BC)$ without additional hypotheses. Block multiplication is not commutative, and the products may not even have compatible sizes.


## 4. Products, Cauchy–Binet, and Volume

### 4.1 The determinant of a matrix product

**Theorem 4.1.** For square matrices $A,B$ of the same order,

$$
\boxed{\det(AB)=\det A\det B.}
$$

The entries of the product are

$$
(AB)_{ij}=\sum_{k=1}^n a_{ik}b_{kj}.
$$

Thus multiplying determinants is naturally connected with taking row-column products. The theorem is also the square special case of the Cauchy–Binet formula below.

In particular, if $A$ is invertible,

$$
\det(A^{-1})=(\det A)^{-1}.
$$

### 4.2 Circulant determinants

Consider the **circulant matrix**

$$
C=\begin{pmatrix}
a_1&a_2&\cdots&a_n\\
a_n&a_1&\cdots&a_{n-1}\\
\vdots&\vdots&\ddots&\vdots\\
a_2&a_3&\cdots&a_1
\end{pmatrix},
$$

whose successive rows are obtained by shifting one place to the right. Let

$$
f(x)=a_1+a_2x+\cdots+a_nx^{n-1},
$$

and let $\varepsilon_1,\ldots,\varepsilon_n$ be the distinct complex roots of $x^n=1$.

Form the Vandermonde matrix

$$
V=\begin{pmatrix}
1&1&\cdots&1\\
\varepsilon_1&\varepsilon_2&\cdots&\varepsilon_n\\
\vdots&\vdots&&\vdots\\
\varepsilon_1^{n-1}&\varepsilon_2^{n-1}&\cdots&\varepsilon_n^{n-1}
\end{pmatrix}.
$$

Its determinant is

$$
\det V=\prod_{i<j}(\varepsilon_j-\varepsilon_i)\ne0.
$$

For $v(\varepsilon)=(1,\varepsilon,\ldots,\varepsilon^{n-1})^T$, the cyclic arrangement and $\varepsilon^n=1$ give

$$
Cv(\varepsilon)=f(\varepsilon)v(\varepsilon).
$$

For example, the second component is

$$
a_n+a_1\varepsilon+\cdots+a_{n-1}\varepsilon^{n-1}
=\varepsilon f(\varepsilon).
$$

Collecting the columns yields

$$
CV=V\operatorname{diag}(f(\varepsilon_1),\ldots,f(\varepsilon_n)).
$$

Taking determinants and cancelling $\det V$ gives

$$
\boxed{\det C=\prod_{j=1}^n f(\varepsilon_j).}
$$

The values $f(\varepsilon_j)$ are also the eigenvalues of $C$. The determinant calculation has simultaneously found a basis of eigenvectors.

### 4.3 Rectangular factors: when the determinant must vanish

Suppose $A$ is $m\times n$ and $B$ is $n\times m$. Although neither factor need be square, $AB$ is square of order $m$.

If $m>n$, then

$$
\operatorname{rank}(AB)\le n<m,
$$

so $\det(AB)=0$.

There is also a determinant-only explanation. Append $m-n$ zero columns to $A$ and $m-n$ zero rows to $B$, producing square matrices $\widetilde A,\widetilde B$ with

$$
\widetilde A\widetilde B=AB.
$$

Both enlarged determinants vanish, and the product rule gives the same conclusion.

When $m\le n$, the determinant need not vanish. It is described by products of matching minors.

### 4.4 The Cauchy–Binet formula

**Theorem 4.2 (Cauchy–Binet).** For $A\in F^{m\times n}$ and $B\in F^{n\times m}$ with $m\le n$,

$$
\boxed{
\det(AB)=
\sum_{\substack{J\subseteq\{1,\ldots,n\}\\|J|=m}}
\det A[:,J]\det B[J,:].
}
$$

The notation $:$ means all rows or all columns. The same increasing index set $J$ selects columns from $A$ and rows from $B$.

If $m=n$, there is just one summand, recovering $\det(AB)=\det A\det B$.

**Proof by evaluating one block determinant twice.** Introduce

$$
K=\begin{pmatrix}A&0\\-I_n&B\end{pmatrix},
$$

a square matrix of order $m+n$.

First, add $A$ times the lower block row to the upper block row:

$$
K\longrightarrow
\begin{pmatrix}0&AB\\-I_n&B\end{pmatrix}.
$$

This preserves the determinant. Move the last $m$ columns in front of the first $n$ columns; this uses $mn$ scalar column interchanges. The resulting matrix is block lower triangular, so

$$
\det K=(-1)^{mn+n}\det(AB).
$$

Second, apply Laplace expansion to the first $m$ rows of the original $K$. Only choices $J$ from the first $n$ columns can contribute, since the upper-right block is zero. The selected minor is $\det A[:,J]$. Its complementary determinant is

$$
\det\bigl(-I_n[:,J^c]\ \ B\bigr).
$$

Expanding this complementary determinant along its first $n-m$ columns leaves $\det B[J,:]$. Combining its sign with the first Laplace sign gives the same factor $(-1)^{mn+n}$ for every $J$. Therefore

$$
\det K=(-1)^{mn+n}
\sum_{|J|=m}\det A[:,J]\det B[J,:].
$$

Comparing the two evaluations proves the formula.

**The counting idea behind it.** The $m$ rows of the result must pass through $m$ distinct intermediate indices. Repeated intermediate indices give a determinant with repeated rows or columns and contribute zero.

### 4.5 Minors of a product

The same formula applies to a selected minor. Let $A\in F^{m\times n}$, $B\in F^{n\times p}$, and choose $r$ rows $I$ and $r$ columns $J$ of $AB$. Since

$$
(AB)[I,J]=A[I,:]B[:,J],
$$

Cauchy–Binet gives

$$
\boxed{
\det(AB)[I,J]
=\sum_{\substack{K\subseteq\{1,\ldots,n\}\\|K|=r}}
\det A[I,K]\det B[K,J]
}
$$

for $r\le n$. Here the determinant on the left means $\det((AB)[I,J])$.

If $r>n$, every such minor is zero because $\operatorname{rank}(AB)\le n$.

### 4.6 Principal minors of a Gram matrix

A **principal minor** uses the same row and column index set. Let $A\in\mathbb R^{m\times n}$ and select $r$ indices $J$ from its columns. Then

$$
(A^TA)[J,J]=A[:,J]^TA[:,J].
$$

For $r\le m$, Cauchy–Binet yields

$$
\boxed{
\det((A^TA)[J,J])
=\sum_{\substack{I\subseteq\{1,\ldots,m\}\\|I|=r}}
\bigl(\det A[I,J]\bigr)^2\ge0.
}
$$

For $r>m$, that principal minor is zero. Hence **every principal minor of a real Gram matrix is nonnegative**.

This is stronger information than merely knowing $\det(A^TA)\ge0$: it applies to every selected group of columns.

### 4.7 Lagrange's identity and the Cauchy–Schwarz inequality

For vectors $a=(a_1,\ldots,a_n)^T$ and $b=(b_1,\ldots,b_n)^T$, form

$$
M=\begin{pmatrix}
a_1&\cdots&a_n\\
b_1&\cdots&b_n
\end{pmatrix}.
$$

Its Gram product is

$$
MM^T=\begin{pmatrix}
\sum_i a_i^2&\sum_i a_i b_i\\
\sum_i a_i b_i&\sum_i b_i^2
\end{pmatrix}.
$$

Cauchy–Binet expresses its determinant as the sum of the squares of all $2\times2$ minors of $M$:

$$
\boxed{
\left(\sum_{i=1}^n a_i^2\right)
\left(\sum_{i=1}^n b_i^2\right)
-\left(\sum_{i=1}^n a_i b_i\right)^2
=\sum_{1\le i<j\le n}(a_i b_j-a_j b_i)^2.
}
$$

This is **Lagrange's identity**. For real entries, the right side is nonnegative, proving

$$
|a^Tb|\le\|a\|\,\|b\|.
$$

Equality holds exactly when all $2\times2$ minors vanish, equivalently when $a$ and $b$ are linearly dependent, including the case where one vector is zero.

### 4.8 The geometric meaning of a determinant

For a real square matrix $A=(v_1,\ldots,v_n)$, $\det A$ is the signed volume of the parallelepiped spanned by the columns. Its ordinary volume is $|\det A|$.

The identity matrix describes a unit cube, with volume $1$. Linearly dependent columns describe a degenerate parallelepiped, whose $n$-dimensional volume is zero. Adding a multiple of one column to another performs a shear: it changes the slant while preserving the relevant base and height, hence the volume.

This also explains the Jacobian determinant in change of variables. A differentiable map $x=\Phi(u)$ is locally approximated by its derivative matrix $D\Phi(u)$, so a small volume element is scaled by

$$
|\det D\Phi(u)|.
$$

The absolute value measures volume; the sign records orientation.


## 5. Block Elimination and Determinant Reduction

### 5.1 Elementary operations on block rows and columns

Partition a matrix into compatible blocks. There are three types of **block elementary operations**:

1. Interchange two block rows or two block columns.
2. Left-multiply a block row by an invertible matrix, or right-multiply a block column by an invertible matrix.
3. Add a matrix multiple of one block row to another, or a matrix multiple of one block column to another.

**The order of multiplication matters.** Row operations use multiplication on the left; column operations use multiplication on the right. For example,

$$
R_i\leftarrow R_i+MR_j,
\qquad
C_i\leftarrow C_i+C_jN,
$$

require $M,N$ to have the dimensions appropriate to the target row or column block. Matrix factors cannot be moved past each other as if they were scalars.

A **block elementary matrix** is obtained by applying such an operation to a partitioned identity matrix. Left or right multiplication by this matrix performs the corresponding row or column operation.

These are combinations of ordinary elementary operations. In particular, a type-3 block operation preserves the determinant. For example,

$$
\begin{pmatrix}I&0\\M&I\end{pmatrix}
\begin{pmatrix}A&B\\C&D\end{pmatrix}
=\begin{pmatrix}A&B\\MA+C&MB+D\end{pmatrix},
$$

and the multiplier has determinant $1$.

Multiplying a block row by an invertible matrix $S$ multiplies the determinant by $\det S$. Swapping two adjacent row blocks of sizes $p$ and $q$ changes the determinant by $(-1)^{pq}$, since it requires $pq$ ordinary row interchanges.

### 5.2 Inverting a block triangular matrix

Let $A$ and $D$ be invertible square matrices. Then

$$
\boxed{
\begin{pmatrix}A&B\\0&D\end{pmatrix}^{-1}
=\begin{pmatrix}
A^{-1}&-A^{-1}BD^{-1}\\
0&D^{-1}
\end{pmatrix}.
}
$$

**Derivation by augmented elimination.** Start with

$$
\left(\begin{array}{cc|cc}
A&B&I&0\\
0&D&0&I
\end{array}\right).
$$

Subtract $BD^{-1}$ times the second block row from the first:

$$
\left(\begin{array}{cc|cc}
A&0&I&-BD^{-1}\\
0&D&0&I
\end{array}\right).
$$

Now left-multiply the first block row by $A^{-1}$ and the second by $D^{-1}$. The left side becomes the identity, and the right side is the displayed inverse.

**Consequence.** The inverse of an invertible upper triangular matrix is upper triangular. This follows inductively by writing

$$
T=\begin{pmatrix}t_{11}&\alpha^T\\0&T_{n-1}\end{pmatrix}
$$

and using

$$
T^{-1}=\begin{pmatrix}
t_{11}^{-1}&-t_{11}^{-1}\alpha^TT_{n-1}^{-1}\\
0&T_{n-1}^{-1}
\end{pmatrix}.
$$

Invertibility gives $t_{11}\ne0$ and invertibility of $T_{n-1}$, to which the induction hypothesis applies.

### 5.3 Schur complements and the first reduction formulas

Consider

$$
M=\begin{pmatrix}A&B\\C&D\end{pmatrix},
$$

with $A$ of size $m\times m$ and $D$ of size $n\times n$.

If $A$ is invertible, eliminate the lower-left block:

$$
\begin{pmatrix}I_m&0\\-CA^{-1}&I_n\end{pmatrix}M
=\begin{pmatrix}A&B\\0&D-CA^{-1}B\end{pmatrix}.
$$

The multiplier has determinant $1$, so

$$
\boxed{\det M=\det A\det(D-CA^{-1}B).}
$$

The matrix $D-CA^{-1}B$ is the **Schur complement of $A$** in $M$.

Alternatively, if $D$ is invertible, eliminate the upper-right block:

$$
\begin{pmatrix}I_m&-BD^{-1}\\0&I_n\end{pmatrix}M
=\begin{pmatrix}A-BD^{-1}C&0\\C&D\end{pmatrix}.
$$

Therefore

$$
\boxed{\det M=\det D\det(A-BD^{-1}C).}
$$

Here $A-BD^{-1}C$ is the Schur complement of $D$.

Only the block being inverted must be invertible. The other diagonal block may be singular. These formulas reduce a determinant of order $m+n$ to determinants of orders $m$ and $n$.

### 5.4 Comparing the two reductions

If both $A$ and $D$ are invertible, the two expressions for $\det M$ give

$$
\boxed{
\det A\det(D-CA^{-1}B)
=\det D\det(A-BD^{-1}C).
}
$$

This identity can exchange a large determinant for a small one. A useful form is the **matrix determinant lemma**:

$$
\boxed{
\det(M+UV)
=\det M\det(I_k+VM^{-1}U),
}
$$

where $M\in F^{n\times n}$ is invertible, $U\in F^{n\times k}$, and $V\in F^{k\times n}$. Apply the two Schur-complement formulas to

$$
\begin{pmatrix}M&U\\-V&I_k\end{pmatrix}.
$$

The correction $UV$ has rank at most $k$, so the remaining determinant has order only $k$.

### 5.5 A rank-two determinant calculation

Let

$$
G=\begin{pmatrix}
a_1^2&a_1a_2+1&\cdots&a_1a_n+1\\
a_2a_1+1&a_2^2&\cdots&a_2a_n+1\\
\vdots&\vdots&\ddots&\vdots\\
a_na_1+1&a_na_2+1&\cdots&a_n^2
\end{pmatrix}.
$$

Write $a=(a_1,\ldots,a_n)^T$ and $\mathbf1=(1,\ldots,1)^T$. Then

$$
G=-I_n+aa^T+\mathbf1\mathbf1^T
=-I_n+UV,
$$

where

$$
U=\begin{pmatrix}a_1&1\\\vdots&\vdots\\a_n&1\end{pmatrix},
\qquad V=U^T.
$$

The determinant lemma gives

$$
\det G=(-1)^n\det(I_2-VU).
$$

Set $s=\sum_i a_i$ and $q=\sum_i a_i^2$. Since

$$
VU=\begin{pmatrix}q&s\\s&n\end{pmatrix},
$$

we obtain

$$
\boxed{
\det G=(-1)^n\left[(1-n)\left(1-\sum_{i=1}^n a_i^2\right)
-\left(\sum_{i=1}^n a_i\right)^2\right].
}
$$

The original determinant may be large, but its departure from $-I_n$ uses only two directions.

### 5.6 A rank-one exercise

For

$$
H=\begin{pmatrix}
1+a_1^2&a_1a_2&\cdots&a_1a_n\\
a_2a_1&1+a_2^2&\cdots&a_2a_n\\
\vdots&\vdots&\ddots&\vdots\\
a_na_1&a_na_2&\cdots&1+a_n^2
\end{pmatrix}=I_n+aa^T,
$$

the same method reduces the calculation to a $1\times1$ determinant:

$$
\boxed{\det H=1+a^Ta=1+a_1^2+\cdots+a_n^2.}
$$

### 5.7 Comparing AB and BA

**Theorem 5.1.** If $A\in F^{m\times n}$ and $B\in F^{n\times m}$, then

$$
\boxed{t^n\det(tI_m-AB)=t^m\det(tI_n-BA).}
$$

**Proof without dividing by $t$.** Start with

$$
K(t)=\begin{pmatrix}tI_m&A\\tB&tI_n\end{pmatrix}.
$$

The block column operation $C_1\leftarrow C_1-C_2B$ gives

$$
\begin{pmatrix}tI_m-AB&A\\0&tI_n\end{pmatrix},
$$

whose determinant is the left side. The block row operation $R_2\leftarrow R_2-BR_1$ instead gives

$$
\begin{pmatrix}tI_m&A\\0&tI_n-BA\end{pmatrix},
$$

whose determinant is the right side. Both operations preserve the determinant, proving the identity for every $t$, including $t=0$.

For $m\ge n$, cancellation as a polynomial identity gives

$$
\det(tI_m-AB)=t^{m-n}\det(tI_n-BA).
$$

Thus $AB$ and $BA$ have the same nonzero eigenvalues with the same algebraic multiplicities; the larger matrix has additional zero eigenvalues. Their zero-eigenvalue structure need not otherwise be identical.


## 6. Rank Inequalities and Their Applications

### 6.1 The rank of a product

Write $r(A)$ for $\operatorname{rank}A$.

**Theorem 6.1.** For compatible matrices,

$$
\boxed{r(AB)\le\min\{r(A),r(B)\}.}
$$

**Proof by elimination.** Choose an invertible $P$ such that

$$
PA=\begin{pmatrix}H\\0\end{pmatrix},
$$

where $H$ consists of the $r(A)$ nonzero rows of the reduced form. Then

$$
r(AB)=r(PAB)
=r\begin{pmatrix}HB\\0\end{pmatrix}
\le r(A),
$$

because $HB$ has only $r(A)$ rows. Applying this result to $B^TA^T$ gives

$$
r(AB)=r(B^TA^T)\le r(B^T)=r(B).
$$

Geometrically, every column of $AB$ lies in the column space of $A$, so multiplication cannot create new output directions beyond those already available in $A$.

### 6.2 Sums and concatenation

For matrices $A,B$ of the same size,

$$
\boxed{
r(A+B)\le r(A\ B)
\le r\begin{pmatrix}A&0\\0&B\end{pmatrix}.
}
$$

The factorizations

$$
A+B=(A\ B)\begin{pmatrix}I\\I\end{pmatrix},
$$

$$
(A\ B)=(I\ I)\begin{pmatrix}A&0\\0&B\end{pmatrix}
$$

reduce both inequalities to the product-rank bound.

The columns of $(A\ B)$ span $C(A)+C(B)$. Thus concatenation records all directions supplied by either matrix, while addition pairs their columns and may introduce cancellation.

### 6.3 Block diagonal and block triangular rank

**Theorem 6.2.** For $A\in F^{m\times n}$ and $B\in F^{p\times q}$,

$$
\boxed{r\begin{pmatrix}A&0\\0&B\end{pmatrix}=r(A)+r(B).}
$$

The two groups of columns occupy separate coordinate blocks, so their contributions to rank add. Equivalently, reduce $A$ and $B$ independently to their rank normal forms and collect the two identity blocks.

Together with the previous inequalities, this proves

$$
\boxed{r(A+B)\le r(A)+r(B).}
$$

**Theorem 6.3.** For any compatible lower-left block $C$,

$$
\boxed{r\begin{pmatrix}A&0\\C&B\end{pmatrix}\ge r(A)+r(B).}
$$

**Proof using rank normal forms.** Choose invertible matrices such that

$$
PAQ=\begin{pmatrix}I_r&0\\0&0\end{pmatrix},
\qquad
MBN=\begin{pmatrix}I_s&0\\0&0\end{pmatrix},
$$

where $r=r(A)$ and $s=r(B)$. Applying the corresponding block diagonal multipliers gives a matrix of the form

$$
\begin{pmatrix}
I_r&0&0&0\\
0&0&0&0\\
C_{11}&C_{12}&I_s&0\\
C_{21}&C_{22}&0&0
\end{pmatrix}.
$$

Use the first identity block to eliminate $C_{11},C_{21}$, and the second to eliminate $C_{12}$ by column operations. The remaining blocks include $I_r$, $I_s$, and possibly an additional block $C_{22}$. The rank is therefore at least $r+s$.

The lower-left block can add independent directions, but it cannot destroy the contributions forced by the two diagonal blocks. The zero upper-right block is essential to this argument.

### 6.4 Sylvester's rank inequality

**Theorem 6.4.** If $A\in F^{m\times n}$ and $B\in F^{n\times p}$, then

$$
\boxed{r(AB)\ge r(A)+r(B)-n.}
$$

**Proof by block elimination.** The block-rank bound gives

$$
r(A)+r(B)\le
r\begin{pmatrix}A&0\\-I_n&B\end{pmatrix}.
$$

Add $A$ times the second block row to the first, then add the first block column times $B$ to the second:

$$
\begin{pmatrix}A&0\\-I_n&B\end{pmatrix}
\longrightarrow
\begin{pmatrix}0&AB\\-I_n&B\end{pmatrix}
\longrightarrow
\begin{pmatrix}0&AB\\-I_n&0\end{pmatrix}.
$$

These invertible operations preserve rank. After a block-column permutation, the last matrix is block diagonal, so its rank is $n+r(AB)$. Rearranging proves the claim.

Combining upper and lower bounds,

$$
\boxed{
\max\{0,r(A)+r(B)-n\}\le r(AB)
\le\min\{r(A),r(B)\}.
}
$$

The number subtracted is the inner dimension $n$, the dimension of the space through which the product factors.

### 6.5 Rank of the adjugate

**Theorem 6.5.** For a square matrix $A$ of order $n\ge2$,

$$
\boxed{
r(\operatorname{adj}(A))=
\begin{cases}
n,&r(A)=n,\\
1,&r(A)=n-1,\\
0,&r(A)<n-1.
\end{cases}
}
$$

**Case 1: $r(A)=n$.** Then $A$ is invertible and

$$
\operatorname{adj}(A)=(\det A)A^{-1}
$$

is invertible, so its rank is $n$.

**Case 2: $r(A)<n-1$.** Every minor of order $n-1$ vanishes. These minors, with signs, are the entries of the adjugate, hence $\operatorname{adj}(A)=0$.

**Case 3: $r(A)=n-1$.** At least one minor of order $n-1$ is nonzero, so $r(\operatorname{adj}(A))\ge1$. On the other hand,

$$
A\operatorname{adj}(A)=(\det A)I_n=0.
$$

Sylvester's inequality gives

$$
0\ge r(A)+r(\operatorname{adj}(A))-n
=r(\operatorname{adj}(A))-1.
$$

Thus its rank is at most $1$, and consequently equals $1$.

For a $1\times1$ matrix, the adjugate is $[1]$ under the empty-determinant convention, so it always has rank $1$.

### 6.6 An idempotent matrix and its complement

**Example.** If $A\in F^{n\times n}$ satisfies $A^2=A$, prove

$$
\boxed{r(A)+r(I_n-A)=n.}
$$

Subadditivity gives one direction:

$$
n=r(I_n)=r(A+(I_n-A))\le r(A)+r(I_n-A).
$$

For the other direction, use $A(I_n-A)=0$ and Sylvester's inequality:

$$
0=r(A(I_n-A))\ge r(A)+r(I_n-A)-n.
$$

The two bounds give equality.

This is the dimension statement behind the direct sum

$$
F^n=C(A)\oplus C(I_n-A).
$$

Idempotence is sufficient for this decomposition; the two summands need not be orthogonal.


## 7. Generalized Inverses

### 7.1 The equation that replaces invertibility

If $A$ is square and invertible, a system $AX=b$ has the unique solution $X=A^{-1}b$. For rectangular or singular matrices, we would still like a matrix that produces a solution whenever the right-hand side is compatible.

**Definition.** For $A\in F^{m\times n}$, a matrix $G\in F^{n\times m}$ is a **generalized inverse**, or **inner inverse**, if

$$
\boxed{AGA=A.}
$$

Such a matrix is often denoted by $A^{-}$ and is also called a **$\{1\}$-inverse** or **minus inverse**. The superscript minus does not assert ordinary invertibility.

The equation says that, after $A$ has mapped a vector into its image, applying $G$ and then $A$ returns the same image vector.

**A distinction to keep straight.** Only the condition $AGA=A$ is imposed here. A general $A^{-}$ need not be unique, need not give orthogonal projections, and need not produce a least-squares or minimum-norm solution for an arbitrary right-hand side. The Moore–Penrose inverse imposes additional conditions and is a more specific object.

### 7.2 The compatibility theorem

**Theorem 7.1.** Fix any generalized inverse $G$ of $A$. Then

$$
\boxed{AX=b\text{ is solvable}\quad\Longleftrightarrow\quad AGb=b.}
$$

**Proof.** If $A\alpha=b$, then

$$
AGb=AGA\alpha=A\alpha=b.
$$

Conversely, if $AGb=b$, then $X=Gb$ is a solution.

Thus every generalized inverse gives a compatibility test and one solution to each consistent system.

There is also a projection interpretation:

$$
(AG)^2=AGAG=AG,
\qquad
(GA)^2=GAGA=GA.
$$

The map $AG$ is a projection onto $C(A)$, because its image is contained in $C(A)$ and it fixes every vector $Ax$. This projection is not necessarily orthogonal.

### 7.3 Existence and the complete block description

**Theorem 7.2.** Every matrix has a generalized inverse.

More precisely, let $r=r(A)$ and choose invertible $P\in F^{m\times m}$ and $Q\in F^{n\times n}$ such that

$$
PAQ=J,
\qquad
J=\begin{pmatrix}I_r&0\\0&0\end{pmatrix}\in F^{m\times n}.
$$

Then all generalized inverses of $A$ are

$$
\boxed{
G=Q\begin{pmatrix}I_r&X\\Y&Z\end{pmatrix}P,
}
$$

where

$$
X\in F^{r\times(m-r)},\qquad
Y\in F^{(n-r)\times r},\qquad
Z\in F^{(n-r)\times(m-r)}
$$

are arbitrary.

**Proof.** Since $A=P^{-1}JQ^{-1}$, put $H=Q^{-1}GP^{-1}$. The equation $AGA=A$ becomes

$$
JHJ=J.
$$

Partition the $n\times m$ matrix $H$ as

$$
H=\begin{pmatrix}W&X\\Y&Z\end{pmatrix}.
$$

Multiplication by $J$ on both sides retains only the upper-left block:

$$
JHJ=\begin{pmatrix}W&0\\0&0\end{pmatrix}.
$$

Hence $W=I_r$, and no restrictions are placed on $X,Y,Z$. Choosing all three free blocks to be zero proves existence.

**Keep the normal-form convention fixed.** If instead one writes $A=PJQ$, the corresponding formula is

$$
G=Q^{-1}\begin{pmatrix}I_r&X\\Y&Z\end{pmatrix}P^{-1}.
$$

The placement of inverses changes because the definitions of $P,Q$ have changed.

For positive matrix dimensions, the generalized inverse is unique exactly when $A$ is square and invertible. In that case the free blocks are absent and $G=A^{-1}$. Otherwise the block description contains free entries.

### 7.4 Describing every solution using one fixed generalized inverse

Suppose $AX=b$ is consistent, and fix a generalized inverse $G$. Then all solutions are

$$
\boxed{X=Gb+(I_n-GA)z,\qquad z\in F^n.}
$$

Indeed,

$$
A(I_n-GA)=A-AGA=0,
$$

so the displayed vectors are solutions. Conversely, for any solution $X$,

$$
X=GAX+(I_n-GA)X=Gb+(I_n-GA)X.
$$

Thus taking $z=X$ recovers it. The image of $I_n-GA$ is exactly $N(A)$: it maps into the null space and fixes every null vector.

This formula works for both homogeneous and nonhomogeneous systems.

### 7.5 Describing every nonhomogeneous solution by varying the inverse

**Theorem 7.3.** Suppose $b\ne0$ and $AX=b$ is consistent. Then every solution can be written as

$$
X=Gb
$$

for a suitable generalized inverse $G$ of $A$.

**Proof using the normal form.** Use $PAQ=J$ and write

$$
Pb=\begin{pmatrix}b_1\\b_2\end{pmatrix},
\qquad
Q^{-1}\gamma=\begin{pmatrix}\gamma_1\\\gamma_2\end{pmatrix}
$$

for a given solution $A\gamma=b$. The equation becomes

$$
J\begin{pmatrix}\gamma_1\\\gamma_2\end{pmatrix}
=\begin{pmatrix}b_1\\b_2\end{pmatrix},
$$

so $\gamma_1=b_1$ and $b_2=0$. Since $b\ne0$ and $P$ is invertible, $b_1\ne0$.

Choose a nonzero coordinate $(b_1)_i=c$. Let $Y$ have $i$th column $c^{-1}\gamma_2$ and all other columns zero. Then $Yb_1=\gamma_2$. The matrix

$$
G=Q\begin{pmatrix}I_r&0\\Y&0\end{pmatrix}P
$$

is a generalized inverse, and

$$
Gb=Q\begin{pmatrix}b_1\\Yb_1\end{pmatrix}
=Q\begin{pmatrix}\gamma_1\\\gamma_2\end{pmatrix}=\gamma.
$$

**Why $b\ne0$ is necessary.** Every matrix sends zero to zero, so $G0=0$ for every generalized inverse. Varying $G$ cannot produce a nonzero solution of $AX=0$. For homogeneous systems, use $X=(I_n-GA)z$ instead.

### 7.6 Generating all generalized inverses from one

**Theorem 7.4.** Fix a generalized inverse $G_0$ of $A$. Then every generalized inverse is obtained from

$$
\boxed{
G=G_0+V-G_0AVAG_0,
\qquad V\in F^{n\times m}\text{ arbitrary}.
}
$$

**Proof that the formula works.** Using $AG_0A=A$,

$$
\begin{aligned}
AGA
&=AG_0A+AVA-AG_0AVAG_0A\\
&=A+AVA-AVA\\
&=A.
\end{aligned}
$$

**Proof that it gives every inverse.** If $G$ is any generalized inverse, take $V=G-G_0$. Then

$$
AVA=AGA-AG_0A=0,
$$

and therefore

$$
G_0AVAG_0=G_0(AVA)G_0=0.
$$

The displayed formula reduces to $G=G_0+(G-G_0)$.

This parameterization avoids computing a new pair of normal-form matrices for each generalized inverse. Different choices of $V$ can produce the same $G$.

### 7.7 A complete rank-two example

Consider

$$
A_-=\begin{pmatrix}
0&2&-4\\
-1&-4&5\\
3&1&7\\
0&5&-10
\end{pmatrix}.
$$

To find all generalized inverses, track row operations with a $4\times4$ identity matrix and column operations with a $3\times3$ identity matrix. The bookkeeping array is

$$
\begin{pmatrix}A_-&I_4\\I_3&0\end{pmatrix}.
$$

Operations on the first four rows record their multiplier in the upper-right block; operations on the first three columns record their multiplier in the lower-left block.

**Step 1: simplify the rows.** Scale rows $1,2,4$ by $1/2,-1,1/5$, respectively, and replace row $3$ by $R_3-3R_2$ using the newly scaled row $2$. This gives

$$
\left(\begin{array}{ccc|cccc}
0&1&-2&1/2&0&0&0\\
1&4&-5&0&-1&0&0\\
0&-11&22&0&3&1&0\\
0&1&-2&0&0&0&1/5
\end{array}\right).
$$

Now perform

$$
R_2\leftarrow R_2-4R_1,\qquad
R_3\leftarrow R_3+11R_1,\qquad
R_4\leftarrow R_4-R_1.
$$

The result is

$$
\left(\begin{array}{ccc|cccc}
0&1&-2&1/2&0&0&0\\
1&0&3&-2&-1&0&0\\
0&0&0&11/2&3&1&0\\
0&0&0&-1/2&0&0&1/5
\end{array}\right).
$$

**Step 2: clear the third column.** Apply

$$
C_3\leftarrow C_3-3C_1+2C_2
$$

to the first three columns. The corresponding right multiplier is

$$
Q=\begin{pmatrix}1&0&-3\\0&1&2\\0&0&1\end{pmatrix}.
$$

Finally interchange the first two rows, multiply row $3$ by $2$, and multiply row $4$ by $-10$. The accumulated row multiplier is

$$
P=\begin{pmatrix}
-2&-1&0&0\\
1/2&0&0&0\\
11&6&2&0\\
5&0&0&-2
\end{pmatrix}.
$$

Direct multiplication confirms

$$
PA_-Q=\begin{pmatrix}
1&0&0\\0&1&0\\0&0&0\\0&0&0
\end{pmatrix}=J.
$$

Thus $r(A_-)=2$. The complete family of generalized inverses is

$$
\boxed{
G=Q
\begin{pmatrix}
1&0&x_{11}&x_{12}\\
0&1&x_{21}&x_{22}\\
y_1&y_2&z_1&z_2
\end{pmatrix}P,
}
$$

with eight arbitrary scalar parameters. In block notation, $X$ is $2\times2$, $Y$ is $1\times2$, and $Z$ is $1\times2$.

Setting all free parameters to zero gives the simple choice

$$
\boxed{
G_0=\begin{pmatrix}
-2&-1&0&0\\
1/2&0&0&0\\
0&0&0&0
\end{pmatrix}.
}
$$

Indeed,

$$
G_0A_-=\begin{pmatrix}1&0&3\\0&1&-2\\0&0&0\end{pmatrix},
$$

and the column relation

$$
(A_-)_3=3(A_-)_1-2(A_-)_2
$$

shows that $A_-G_0A_-=A_-$.

For a right-hand side $b=(b_1,b_2,b_3,b_4)^T$, compatibility is equivalent to the last two entries of $Pb$ being zero:

$$
11b_1+6b_2+2b_3=0,
\qquad
5b_1-2b_4=0.
$$

When these hold, all solutions are

$$
X=\begin{pmatrix}-2b_1-b_2\\b_1/2\\0\end{pmatrix}
+t\begin{pmatrix}-3\\2\\1\end{pmatrix},
\qquad t\in F.
$$

### 7.8 A sign-sensitive variant with full column rank

Replacing the upper-right entry $-4$ by $+4$ gives a different matrix:

$$
A_+=\begin{pmatrix}
0&2&4\\
-1&-4&5\\
3&1&7\\
0&5&-10
\end{pmatrix}.
$$

Its first three rows form the square matrix

$$
T=\begin{pmatrix}0&2&4\\-1&-4&5\\3&1&7\end{pmatrix},
\qquad \det T=88\ne0.
$$

Over $\mathbb R$ or $\mathbb C$, $A_+$ therefore has rank $3$, not $2$. A generalized inverse is obtained by inverting those first three rows and ignoring the fourth:

$$
\boxed{
G_+=\left(T^{-1}\ \ 0\right)
=\begin{pmatrix}
-3/8&-5/44&13/44&0\\
1/4&-3/22&-1/22&0\\
1/8&3/44&1/44&0
\end{pmatrix}.
}
$$

It satisfies $G_+A_+=I_3$, hence $A_+G_+A_+=A_+$. In fact, for a full-column-rank matrix every generalized inverse is a left inverse. All of them can be written as

$$
G=G_++V-G_+A_+VA_+G_+
=G_++V(I_4-A_+G_+).
$$

The two sign choices must not share the same rank-normal-form calculation. A single changed entry can alter the rank, null space, and number of free parameters in a generalized inverse.


