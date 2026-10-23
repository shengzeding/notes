# Linear Maps, Matrix Representations, and Invariant Subspaces

## 1. Maps, Composition, and Inverses

### 1.1 What a map specifies

**Definition.** Let $A$ and $B$ be nonempty sets. A **map**

$$
\varphi:A\longrightarrow B
$$

assigns to every $a\in A$ exactly one element $\varphi(a)\in B$. The set $A$ is the **domain**, and $B$ is the **codomain**. A map from a set to itself is also called a **transformation** of that set.

A map includes its domain, codomain, and assignment rule. Two maps are equal when all three agree. Thus, once their domains and codomains agree, proving equality means checking that they have the same value at every input. To prove that they are unequal, one input with different outputs is enough.

**Definition.** The **image** of $\varphi$ is

$$
\varphi(A)=\{\varphi(a):a\in A\}\subseteq B.
$$

For $b\in B$, its **fiber**, or inverse image, is

$$
\varphi^{-1}(\{b\})=\{a\in A:\varphi(a)=b\}.
$$

A fiber may be empty, contain one element, or contain many elements. More generally, for $S\subseteq B$,

$$
\varphi^{-1}(S)=\{a\in A:\varphi(a)\in S\}.
$$

**A distinction to keep straight.** The codomain is specified as part of the map; the image consists of the outputs actually attained. Also, inverse images are defined for every map. Writing $\varphi^{-1}(S)$ does not assert that an inverse function exists.

### 1.2 Composition and the identity map

Suppose $\varphi:A\to B$ and $\psi:B\to C$.

**Definition.** Their **composition** is the map

$$
\psi\varphi=\psi\circ\varphi:A\to C,
\qquad (\psi\varphi)(a)=\psi(\varphi(a)).
$$

The map on the right acts first. Composition is generally not commutative, even when both orders are defined. For example, on $\mathbb R$, let $f(x)=x+1$ and $g(x)=2x$. Then

$$
(gf)(x)=2x+2,\qquad (fg)(x)=2x+1.
$$

**Proposition 1.1 (Associativity).** For composable maps $\varphi,\psi,\theta$,

$$
(\theta\psi)\varphi=\theta(\psi\varphi).
$$

**Proof.** Both sides send $a$ to $\theta(\psi(\varphi(a)))$. This proves equality at every input.

The **identity map** of $A$ is

$$
\operatorname{Id}_A(a)=a\qquad(a\in A).
$$

For $\varphi:A\to B$, the unit laws are

$$
\operatorname{Id}_B\varphi=\varphi=\varphi\operatorname{Id}_A.
$$

### 1.3 Left inverses, right inverses, and invertibility

**Definition.** For $\varphi:A\to B$, a map $\psi:B\to A$ is a **left inverse** if

$$
\psi\varphi=\operatorname{Id}_A,
$$

and a **right inverse** if

$$
\varphi\psi=\operatorname{Id}_B.
$$

A map satisfying both identities is an **inverse**. In that case $\varphi$ is **invertible**, and its inverse is denoted by $\varphi^{-1}$.

**Proposition 1.2.** If a map has a left inverse and a right inverse, then they coincide. Consequently, an inverse is unique.

**Proof.** If $\ell\varphi=\operatorname{Id}_A$ and $\varphi r=\operatorname{Id}_B$, then

$$
\ell=\ell\operatorname{Id}_B
=\ell(\varphi r)
=(\ell\varphi)r
=\operatorname{Id}_A r=r.
$$

For invertible maps,

$$
(\varphi^{-1})^{-1}=\varphi,
\qquad
(\psi\varphi)^{-1}=\varphi^{-1}\psi^{-1}.
$$

The second formula reverses the order: undo the last operation first. Multiplying the proposed inverse by $\psi\varphi$ in either order gives the appropriate identity map.

### 1.4 Injectivity, surjectivity, and bijectivity

**Definition.** A map $\varphi:A\to B$ is:

- **Injective** if $\varphi(a_1)=\varphi(a_2)$ implies $a_1=a_2$.
- **Surjective** if $\varphi(A)=B$.
- **Bijective** if it is both injective and surjective.

Injectivity means that distinct inputs remain distinguishable. Surjectivity means that every element of the codomain is reached.

**Theorem 1.3.** For nonempty sets $A$ and $B$,

$$
\begin{aligned}
\varphi\text{ is injective}
&\iff \varphi\text{ has a left inverse},\\
\varphi\text{ is surjective}
&\iff \varphi\text{ has a right inverse},\\
\varphi\text{ is bijective}
&\iff \varphi\text{ is invertible}.
\end{aligned}
$$

**Proof of the first equivalence.** Suppose $\varphi$ is injective. Fix $a_0\in A$ and define

$$
\psi(b)=
\begin{cases}
a,&b=\varphi(a)\text{ for some }a\in A,\\
a_0,&b\notin\varphi(A).
\end{cases}
$$

Injectivity makes the first case unambiguous, and $\psi\varphi=\operatorname{Id}_A$. Conversely, if $\psi\varphi=\operatorname{Id}_A$ and $\varphi(a_1)=\varphi(a_2)$, apply $\psi$ to get $a_1=a_2$.

**Proof of the second equivalence.** If $\varphi$ is surjective, choose one preimage $a_b$ for each $b\in B$ and set $\psi(b)=a_b$. Then $\varphi\psi=\operatorname{Id}_B$. For arbitrary infinite sets, this selection uses the usual axiom of choice. Conversely, a right inverse gives $b=\varphi(\psi(b))$ for every $b$, so $\varphi$ is surjective.

The third equivalence follows from the first two and the fact that a left inverse and a right inverse must agree.

---

## 2. Cardinality and Restrictions

### 2.1 Comparing the sizes of sets

For finite sets, saying that $A$ has $n$ elements means that there is a bijection between $A$ and $\{1,\ldots,n\}$. The same idea extends comparisons of size to infinite sets.

**Definition.** Write

$$
|A|\leq |B|
$$

if there is an injection $A\to B$, and write $|A|=|B|$ if there is a bijection $A\to B$. Write $|A|<|B|$ if $|A|\leq|B|$ but $|A|\ne|B|$.

**Theorem 2.1 (Schröder–Bernstein).** If there are injections $f:A\to B$ and $g:B\to A$, then there is a bijection $A\to B$.

**Proof idea.** Follow the alternating chains formed by $f$ and $g$. On chains beginning in $A$, use $f$; on the remaining chains, use $g$ backwards. The following construction makes that choice precise.

Set

$$
A_0=A\setminus g(B),\qquad
A_{k+1}=g(f(A_k)),\qquad
C=\bigcup_{k=0}^{\infty}A_k.
$$

Define

$$
h(a)=
\begin{cases}
f(a),&a\in C,\\
g^{-1}(a),&a\notin C.
\end{cases}
$$

Here $g^{-1}(a)$ means the unique preimage of $a$ under the injective map $g$. This exists in the second case because $a\notin A_0$.

Each branch is injective. Their images are disjoint: if $a\in C$, $a'\notin C$, and $f(a)=g^{-1}(a')$, then $a'=g(f(a))\in C$, a contradiction. Thus $h$ is injective.

For surjectivity, take $b\in B$. If $g(b)\notin C$, then $h(g(b))=b$. If $g(b)\in C$, it cannot belong to $A_0$, so $g(b)=g(f(a))$ for some $a\in C$. Injectivity of $g$ gives $b=f(a)=h(a)$. Hence $h$ is bijective.

### 2.2 Function sets and power sets

The cardinality of the natural numbers is denoted by

$$
\aleph_0=|\mathbb N|.
$$

A set in bijection with $\mathbb N$ is **countably infinite**. The word **countable** is also commonly used to include finite sets.

Let $B^A$ denote the set of all maps $A\to B$. Its cardinality is written

$$
|B^A|=|B|^{|A|}.
$$

For finite sets, this is the ordinary multiplication principle: independently choose one of $|B|$ values for each of the $|A|$ inputs.

The **power set** $\mathcal P(A)$ is the set of all subsets of $A$. Every subset $S\subseteq A$ determines a characteristic function

$$
\mathbf 1_S(a)=
\begin{cases}1,&a\in S,\\0,&a\notin S.\end{cases}
$$

This gives a bijection $\mathcal P(A)\cong\{0,1\}^A$, so

$$
|\mathcal P(A)|=2^{|A|}.
$$

**Theorem 2.2 (Cantor).** Every set has strictly smaller cardinality than its power set:

$$
\boxed{|A|<2^{|A|}.}
$$

**Proof.** The map $a\mapsto\{a\}$ is injective. To show that no map $f:A\to\mathcal P(A)$ is surjective, form the diagonal set

$$
D=\{a\in A:a\notin f(a)\}.
$$

If $D=f(d)$ for some $d$, then $d\in D$ if and only if $d\notin D$, a contradiction. Thus $D$ is missing from the image of $f$.

### 2.3 The cardinality of the continuum

The cardinality of $\mathbb R$ is called the **continuum** and is denoted by $\mathfrak c$.

**Theorem 2.3.**

$$
\mathfrak c=2^{\aleph_0}.
$$

**Proof idea.** Construct injections in both directions and apply Schröder–Bernstein. The map

$$
x\longmapsto\{q\in\mathbb Q:q<x\}
$$

injects $\mathbb R$ into $\mathcal P(\mathbb Q)$ because distinct real numbers are separated by a rational number. Since $\mathbb Q$ is countably infinite, this gives $|\mathbb R|\leq 2^{\aleph_0}$.

Conversely, a subset $S\subseteq\{1,2,\ldots\}$ determines

$$
x_S=\sum_{k=1}^{\infty}\frac{2\mathbf 1_S(k)}{3^k}\in[0,1].
$$

This map is injective. If two subsets first differ at position $k$, the difference of their $k$th terms has magnitude $2/3^k$, while the entire later tail has magnitude at most $1/3^k$. Thus their real numbers differ. Hence $2^{\aleph_0}\leq|\mathbb R|$.

**Notation reminder.** In standard set theory, $\aleph_1$ denotes the least uncountable cardinal. The assertion $\mathfrak c=\aleph_1$ is the continuum hypothesis; it is not needed for the identity $\mathfrak c=2^{\aleph_0}$.

### 2.4 Restriction of a map

If $A_1\subseteq A$ and $\varphi:A\to B$, its **restriction** to $A_1$ is

$$
\varphi|_{A_1}:A_1\to B,\qquad
\varphi|_{A_1}(a)=\varphi(a).
$$

The rule is unchanged; only the domain is reduced. Later, when a subspace $U$ satisfies $T(U)\subseteq U$, we also regard $T|_U$ as a map $U\to U$ by restricting the codomain to $U$.

---

## 3. Linear Maps and Their Values on a Basis

### 3.1 Definition and geometric examples

Let $V$ and $W$ be vector spaces over the same field $F$, usually $\mathbb R$ or $\mathbb C$.

**Definition.** A map $T:V\to W$ is **linear** if

$$
T(cu+v)=cT(u)+T(v)
\qquad(u,v\in V,\ c\in F).
$$

Equivalently, it preserves addition and scalar multiplication separately. A linear map $V\to V$ is a **linear transformation**, or **endomorphism**, of $V$.

Several familiar geometric operations are linear:

- Dilation or contraction: $v\mapsto 2v$ or $v\mapsto\tfrac12v$.
- Projection onto the $xy$-plane: $(x,y,z)\mapsto(x,y,0)$.
- Reflection across a plane through the origin. For example, reflection across the $xy$-plane is $(x,y,z)\mapsto(x,y,-z)$.
- Counterclockwise rotation through $\pi/2$ in the plane: $(x,y)\mapsto(-y,x)$.

The requirement that the reflecting plane pass through the origin matters. Every linear map sends zero to zero, so a nonzero translation is not linear.

For any $c\in F$, the map $cI:v\mapsto cv$ is a **scalar transformation**. The cases $c=1$ and $c=0$ give the identity and zero transformations. More generally, the zero map $V\to W$ sends every vector to the zero vector of $W$.

### 3.2 Matrix, differentiation, and integration maps

**Example 1 (Matrix multiplication).** Every matrix $A\in F^{m\times n}$ defines a linear map

$$
T_A:F^n\to F^m,\qquad T_A(x)=Ax.
$$

Later, choosing bases will show that every linear map between finite-dimensional vector spaces has this form in coordinates.

**Example 2 (Differentiation).** Differentiation is linear because

$$
(cf+g)'=cf'+g'.
$$

For example,

$$
D:C^1(I)\to C(I),\qquad Df=f'
$$

is a linear map. It is also an endomorphism of the polynomial space $F[x]$, or of the real polynomial space of degree at most $n$.

**A distinction to keep straight.** The domain and codomain must be chosen so that differentiation actually defines a map between them. A differentiable function need not have a differentiable derivative, so the space of all differentiable functions is not automatically preserved by differentiation.

**Example 3 (Integration).** On $C([a,b],\mathbb R)$, define

$$
(Jf)(x)=\int_a^x f(t)\,dt.
$$

Then $J$ is a linear transformation of $C([a,b],\mathbb R)$; its outputs are in fact continuously differentiable. Fixing both endpoints instead gives the linear map

$$
L:C([a,b],\mathbb R)\to\mathbb R,
\qquad L(f)=\int_a^b f(t)\,dt.
$$

A linear map into the scalar field is called a **linear functional**.

### 3.3 The canonical map to a quotient space

Let $U$ be a subspace of $V$.

**Definition.** The **canonical quotient map** is

$$
\pi:V\to V/U,\qquad \pi(v)=v+U.
$$

It is surjective and linear. Indeed,

$$
\begin{aligned}
\pi(cu+v)
&=(cu+v)+U\\
&=c(u+U)+(v+U)\\
&=c\pi(u)+\pi(v).
\end{aligned}
$$

Its kernel is $U$: exactly the vectors in $U$ represent the zero coset.

### 3.4 What linearity preserves

**Proposition 3.1.** If $T:V\to W$ is linear, then

$$
T(0)=0,\qquad T(-v)=-T(v),
$$

and, for every finite linear combination,

$$
\boxed{T\left(\sum_{i=1}^r c_i v_i\right)
=\sum_{i=1}^r c_iT(v_i).}
$$

**Proof.** From $T(0)=T(0+0)=T(0)+T(0)$, subtract $T(0)$. Then use scalar multiplication by $-1$. The formula for a finite sum follows by repeatedly applying the defining identity.

Using the formal row of vectors $(v_1,\ldots,v_r)$ and a coordinate column $x=(c_1,\ldots,c_r)^T$, the last identity becomes

$$
T\big((v_1,\ldots,v_r)x\big)
=(Tv_1,\ldots,Tv_r)x.
$$

**Corollary.** A linearly dependent list is mapped to a linearly dependent list.

Indeed, a nontrivial relation $\sum_i c_i v_i=0$ gives the same nontrivial relation $\sum_i c_iTv_i=0$ among the images.

**A distinction to keep straight.** An independent list need not remain independent: the zero map sends every vector to zero. However, an injective linear map does preserve independence, because $\sum_i c_iTv_i=0$ then implies $\sum_i c_i v_i=0$.

### 3.5 A linear map is determined by its values on a basis

**Theorem 3.2.** Let $(\alpha_1,\ldots,\alpha_n)$ be a basis of $V$, and choose arbitrary vectors $w_1,\ldots,w_n\in W$. There is a unique linear map $T:V\to W$ such that

$$
T\alpha_i=w_i\qquad(1\leq i\leq n).
$$

The chosen images may repeat or be linearly dependent.

**Proof.** Every $v\in V$ has a unique expression $v=\sum_i x_i\alpha_i$. Define

$$
T(v)=\sum_{i=1}^n x_iw_i.
$$

Unique coordinates make this well-defined. Addition and scalar multiplication of coordinates show that it is linear. Conversely, any linear map with the prescribed basis images must satisfy exactly this formula, proving uniqueness.

This is the basic method for constructing a linear map: prescribe its action on a basis, then extend linearly. It also shows that two linear maps agreeing on a basis agree everywhere.

### 3.6 Isomorphisms and automorphisms

**Definition.** A bijective linear map $T:V\to W$ is a **linear isomorphism**. We write $V\cong W$ when one exists. An isomorphism $V\to V$ is an **automorphism**.

**Theorem 3.3.** If $(\alpha_1,\ldots,\alpha_n)$ is a basis of $V$, then $T$ is an isomorphism if and only if

$$
(T\alpha_1,\ldots,T\alpha_n)
$$

is a basis of $W$.

**Proof.** If $T$ is bijective, injectivity preserves independence and surjectivity makes the images span $W$. Conversely, if the images form a basis, every vector of $W$ has a preimage by expanding in that basis. Also, $T(\sum_i x_i\alpha_i)=0$ forces every $x_i=0$, so $T$ is injective.

In particular, two finite-dimensional vector spaces over $F$ are isomorphic if and only if they have the same dimension.

The inverse of a linear isomorphism is linear. If $y_1=Tv_1$ and $y_2=Tv_2$, then

$$
T^{-1}(cy_1+y_2)
=T^{-1}\big(T(cv_1+v_2)\big)
=cT^{-1}y_1+T^{-1}y_2.
$$

---

## 4. Operations on Linear Maps

### 4.1 The vector space of linear maps

**Definition.** The set of all linear maps $V\to W$ is denoted by

$$
\operatorname{Hom}_F(V,W),
$$

or simply $\operatorname{Hom}(V,W)$ when the field is understood. Here “Hom” abbreviates “homomorphism”: a map preserving the relevant algebraic structure.

For $S,T\in\operatorname{Hom}(V,W)$ and $c\in F$, define

$$
(S+T)(v)=S(v)+T(v),\qquad
(cT)(v)=cT(v).
$$

These are again linear maps. For instance,

$$
\begin{aligned}
(S+T)(au+bv)
&=aS(u)+bS(v)+aT(u)+bT(v)\\
&=a(S+T)(u)+b(S+T)(v).
\end{aligned}
$$

The vector-space axioms hold pointwise because they hold in $W$. Thus $\operatorname{Hom}(V,W)$ is itself a vector space, whose zero vector is the zero map and whose additive inverse of $T$ is $-T$.

Suppose $\dim V=n$, $\dim W=m$, with bases $(\alpha_j)$ and $(\beta_i)$. Define $E_{ij}:V\to W$ by

$$
E_{ij}(\alpha_k)=\delta_{jk}\beta_i.
$$

If $T\alpha_j=\sum_i a_{ij}\beta_i$, then

$$
T=\sum_{i=1}^m\sum_{j=1}^n a_{ij}E_{ij}.
$$

The coefficients are unique, so the $mn$ maps $E_{ij}$ form a basis. Consequently,

$$
\boxed{\dim\operatorname{Hom}(V,W)=mn.}
$$

### 4.2 Composition as multiplication

If $T:V\to U$ and $S:U\to W$ are linear, then $ST:V\to W$ is linear:

$$
ST(au+bv)=S(aTu+bTv)=aSTu+bSTv.
$$

For compatible domains and codomains, composition satisfies

$$
\begin{aligned}
R(ST)&=(RS)T,\\
R(S+T)&=RS+RT,\\
(S+T)R&=SR+TR,\\
c(ST)&=(cS)T=S(cT).
\end{aligned}
$$

Composition need not commute. For example, on $\mathbb R^2$, let $P(x,y)=(x,0)$ and $R(x,y)=(-y,x)$. Then

$$
PR(x,y)=(-y,0),\qquad RP(x,y)=(0,x).
$$

The space of endomorphisms is denoted by

$$
\operatorname{End}(V)=\operatorname{Hom}(V,V).
$$

With addition and composition, it is a ring with identity $I$. Its invertible elements are exactly the automorphisms of $V$.

### 4.3 The algebra of endomorphisms

**Definition.** An **associative algebra over $F$** is a vector space equipped with an associative multiplication that distributes over addition and satisfies

$$
c(ab)=(ca)b=a(cb).
$$

An algebra with a multiplicative identity is called **unital**. Its dimension means its dimension as a vector space.

The operations above make $\operatorname{End}(V)$ a unital $F$-algebra, called the **endomorphism algebra**. If $\dim V=n$, its dimension is $n^2$.

Other examples are the polynomial algebra $F[x]$ and the matrix algebra $F^{n\times n}$. Choosing a basis identifies $\operatorname{End}(V)$ with the matrix algebra, preserving both vector-space operations and multiplication.

### 4.4 Projections and idempotent transformations

Suppose

$$
V=U\oplus W.
$$

Every $v\in V$ has a unique decomposition $v=u+w$, with $u\in U$ and $w\in W$.

**Definition.** The **projection onto $U$ along $W$** is

$$
P_U(v)=u.
$$

It is linear because the $U$-component of $av_1+bv_2$ is $au_1+bu_2$. Also,

$$
P_U^2=P_U,\qquad
\operatorname{im}P_U=U,\qquad
\ker P_U=W.
$$

A transformation $P$ satisfying $P^2=P$ is called **idempotent**. Every projection is idempotent, and every idempotent transformation is a projection; the converse will follow from its kernel–image decomposition.

For the complementary projection $P_W$,

$$
P_U+P_W=I,\qquad
P_UP_W=P_WP_U=0.
$$

Thus $P_W=I-P_U$. Moreover,

$$
U=\ker(P_U-I),\qquad W=\ker P_U.
$$

These are the eigenspaces for $1$ and $0$ when nonzero. No inner product is required: the projection may be oblique rather than perpendicular.

Two transformations $S,T$ are sometimes called **mutually orthogonal** when $ST=TS=0$.

**A distinction to keep straight.** This algebraic use of “orthogonal” is different from an **orthogonal transformation**, which preserves an inner product and has an orthogonal matrix in an orthonormal basis.

### 4.5 Nilpotent transformations

**Definition.** A transformation $N$ is **nilpotent** if $N^k=0$ for some positive integer $k$. The least such $k$ is its **nilpotency index**.

For example, differentiation on

$$
\mathcal P_{n-1}(\mathbb R)
=\{p\in\mathbb R[x]:\deg p\leq n-1\}\cup\{0\}
$$

has nilpotency index $n$: differentiating $n$ times annihilates every polynomial in the space, while

$$
D^{n-1}(x^{n-1})=(n-1)!\ne0.
$$

Nilpotent transformations and their matrices are central to the study of similarity and canonical forms.

---

## 5. Kernel, Image, and Dimension

### 5.1 The kernel and the structure of fibers

**Definition.** The **kernel** of $T:V\to W$ is

$$
\ker T=\{v\in V:Tv=0\}.
$$

It is a subspace of $V$: it contains zero, and $T(au+bv)=0$ whenever $Tu=Tv=0$.

**Theorem 5.1.** Every nonempty fiber of a linear map is a coset of its kernel. More precisely, for $v\in V$,

$$
\boxed{T^{-1}(\{Tv\})=v+\ker T.}
$$

**Proof.** A vector $u$ has the same image as $v$ precisely when

$$
Tu=Tv
\iff T(u-v)=0
\iff u-v\in\ker T.
$$

Thus solving $Tx=b$, once one particular solution $x_0$ is known, amounts to adding an arbitrary element of $\ker T$:

$$
\{x:Tx=b\}=x_0+\ker T.
$$

In particular,

$$
\boxed{T\text{ is injective}\iff\ker T=\{0\}.}
$$

The kernel measures exactly which differences between inputs are lost under the map.

### 5.2 The image and the first isomorphism theorem

**Definition.** The **image** of $T$ is

$$
\operatorname{im}T=T(V)=\{Tv:v\in V\}.
$$

It is a subspace of $W$, since $aTu+bTv=T(au+bv)$. Also,

$$
T\text{ is surjective}\iff\operatorname{im}T=W.
$$

**Theorem 5.2 (First isomorphism theorem).** There is a natural linear isomorphism

$$
\boxed{V/\ker T\cong\operatorname{im}T,}
$$

given by

$$
\overline T(v+\ker T)=Tv.
$$

**Proof.** If $v+\ker T=u+\ker T$, then $v-u\in\ker T$, so $Tv=Tu$. Hence the map is well-defined. It is linear by the quotient operations and is surjective by the definition of the image. Finally,

$$
\overline T(v+\ker T)=0
\implies v\in\ker T
\implies v+\ker T=\ker T,
$$

so its kernel is zero and it is injective.

The quotient identifies exactly the inputs having the same output. After those identifications, the induced map to the image is an isomorphism.

### 5.3 Rank–nullity and an adapted basis

**Definition.** The **rank** and **nullity** of a linear map are

$$
\operatorname{rank}T=\dim\operatorname{im}T,
\qquad
\operatorname{nullity}T=\dim\ker T.
$$

**Theorem 5.3 (Rank–nullity).** If $\dim V=n<\infty$, then

$$
\boxed{\dim\ker T+\dim\operatorname{im}T=n.}
$$

The codomain need not be finite-dimensional. The image is finite-dimensional because it is spanned by the images of any finite basis of $V$.

**Proof using a basis.** Choose a basis $(\alpha_1,\ldots,\alpha_k)$ of $\ker T$ and extend it to a basis

$$
(\alpha_1,\ldots,\alpha_k,\alpha_{k+1},\ldots,\alpha_n)
$$

of $V$. We claim that

$$
(T\alpha_{k+1},\ldots,T\alpha_n)
$$

is a basis of $\operatorname{im}T$.

It spans because applying $T$ to an expansion of any vector eliminates the first $k$ terms. For independence, if

$$
\sum_{i=k+1}^n c_iT\alpha_i=0,
$$

then $\sum_{i=k+1}^n c_i\alpha_i\in\ker T$, so it is also a linear combination of $\alpha_1,\ldots,\alpha_k$. Independence of the full basis forces every $c_i=0$. Thus the image has dimension $n-k$.

The corresponding cosets

$$
\alpha_{k+1}+\ker T,\ldots,\alpha_n+\ker T
$$

form a basis of $V/\ker T$, matching the isomorphism theorem.

### 5.4 When injectivity and surjectivity are equivalent

**Corollary.** If $\dim V=\dim W=n<\infty$, then for a linear map $T:V\to W$,

$$
T\text{ injective}
\iff T\text{ surjective}
\iff T\text{ an isomorphism}.
$$

Indeed,

$$
\ker T=\{0\}
\iff\operatorname{rank}T=n
\iff\operatorname{im}T=W.
$$

This resembles the fact that an injective self-map of a finite set is automatically surjective, but here the finite quantity is the dimension.

**The finite-dimensional hypothesis matters.** On $F[x]$, the map

$$
M_x(p)=xp
$$

is injective but not surjective, since $1$ is not in its image. Conversely, the backward shift

$$
B(a_0+a_1x+\cdots+a_nx^n)
=a_1+a_2x+\cdots+a_nx^{n-1}
$$

is surjective but not injective: all constants lie in its kernel. These examples work over any field.

### 5.5 Rank–nullity does not automatically give a direct sum

For an endomorphism $T:V\to V$, both its kernel and image are subspaces of $V$. Even in finite dimensions, the dimension formula does **not** by itself imply

$$
V=\ker T\oplus\operatorname{im}T.
$$

The missing issue is their intersection.

**Example.** Let $D$ be differentiation on $\mathcal P_n(\mathbb R)$ with $n\geq1$. Then

$$
\ker D=\operatorname{span}\{1\},\qquad
\operatorname{im}D=\mathcal P_{n-1}(\mathbb R).
$$

The constant polynomial $1$ belongs to both subspaces. Their dimensions add to $n+1$, but their intersection is nonzero, and their sum is only $\mathcal P_{n-1}(\mathbb R)$.

**Proposition 5.4.** If $V$ is finite-dimensional and

$$
\ker T\cap\operatorname{im}T=\{0\},
$$

then

$$
V=\ker T\oplus\operatorname{im}T.
$$

**Proof.** The dimension formula for the sum gives

$$
\dim(\ker T+\operatorname{im}T)
=\dim\ker T+\dim\operatorname{im}T=\dim V.
$$

The zero intersection makes the sum direct.

In this case, $T|_{\ker T}=0$, while

$$
T|_{\operatorname{im}T}:\operatorname{im}T\to\operatorname{im}T
$$

is injective and hence bijective. Thus the transformation separates into a zero part and an invertible part. More generally, decomposing a space into invariant direct summands lets us study a transformation one summand at a time.

### 5.6 Idempotents give a kernel–image decomposition

**Theorem 5.5.** If $P^2=P$, then

$$
\boxed{V=\ker P\oplus\operatorname{im}P.}
$$

This holds even when $V$ is infinite-dimensional.

**Proof.** For every $v\in V$,

$$
v=(v-Pv)+Pv.
$$

The first term lies in $\ker P$ because $P(v-Pv)=Pv-P^2v=0$; the second lies in $\operatorname{im}P$. Thus their sum is all of $V$.

If $u\in\ker P\cap\operatorname{im}P$, write $u=Pw$. Then

$$
u=Pw=P^2w=Pu=0.
$$

So the sum is direct.

Moreover, $P$ acts as the identity on its image, since $P(Pv)=Pv$. Therefore $P$ is exactly the projection onto $\operatorname{im}P$ along $\ker P$.

### 5.7 Complementary images and a rank criterion for idempotence

For every endomorphism $T$,

$$
\ker T\subseteq\operatorname{im}(I-T),
$$

because $Tv=0$ implies $v=(I-T)v$.

If $T^2=T$, then $T(I-T)=0$, which gives the reverse inclusion. Hence

$$
\ker T=\operatorname{im}(I-T),
\qquad
V=\operatorname{im}(I-T)\oplus\operatorname{im}T.
$$

**Theorem 5.6.** On an $n$-dimensional vector space,

$$
\boxed{T^2=T
\iff\operatorname{rank}T+\operatorname{rank}(I-T)=n.}
$$

**Proof.** If $T$ is idempotent, the direct sum just obtained gives the rank identity. Conversely, the assumed rank identity and rank–nullity yield

$$
\dim\operatorname{im}(I-T)
=n-\operatorname{rank}T
=\dim\ker T.
$$

Since $\ker T\subseteq\operatorname{im}(I-T)$ and the two finite dimensions agree, the subspaces are equal. Therefore $T(I-T)=0$, which is $T^2=T$.

---

## 6. Matrices of Linear Maps

### 6.1 From abstract vectors to coordinates

The language of linear maps applies to arbitrary vector spaces, including infinite-dimensional ones. In finite dimensions, choosing bases converts the abstract map into ordinary matrix multiplication.

Let

$$
\alpha=(\alpha_1,\ldots,\alpha_n),\qquad
\beta=(\beta_1,\ldots,\beta_m)
$$

be ordered bases of $V$ and $W$. For a linear map $T:V\to W$, write

$$
T\alpha_j=\sum_{i=1}^m a_{ij}\beta_i.
$$

**Definition.** The matrix of $T$ in these bases is

$$
[T]_{\beta\leftarrow\alpha}=A=(a_{ij})\in F^{m\times n}.
$$

Its $j$th column is the coordinate column of $T\alpha_j$ in the codomain basis:

$$
\boxed{A=\begin{pmatrix}[T\alpha_1]_\beta&\cdots&[T\alpha_n]_\beta\end{pmatrix}.}
$$

In formal basis-row notation,

$$
T(\alpha_1,\ldots,\alpha_n)
=(\beta_1,\ldots,\beta_m)A.
$$

For an endomorphism, we normally use the same basis for domain and codomain and write $[T]_\alpha$.

**The columns rule is essential.** The image of the $j$th basis vector goes into column $j$, not row $j$. There are $n$ columns because the domain has dimension $n$, and $m$ rows because the codomain has dimension $m$.

### 6.2 The coordinate identity

If $v=\sum_j x_j\alpha_j$, then

$$
Tv=\sum_j x_jT\alpha_j
=\sum_i\left(\sum_j a_{ij}x_j\right)\beta_i.
$$

Thus

$$
\boxed{[Tv]_\beta=A[v]_\alpha.}
$$

The map determines the matrix uniquely once bases are fixed. Conversely, every $m\times n$ matrix defines a unique linear map by prescribing the images of the domain basis.

### 6.3 Example: the differentiation matrix

Let $D$ act on $\mathcal P_3(\mathbb R)$, with ordered basis $(1,x,x^2,x^3)$. Since

$$
D(1)=0,\quad D(x)=1,\quad D(x^2)=2x,\quad D(x^3)=3x^2,
$$

its matrix is

$$
[D]=
\begin{pmatrix}
0&1&0&0\\
0&0&2&0\\
0&0&0&3\\
0&0&0&0
\end{pmatrix}.
$$

For $p=a_0+a_1x+a_2x^2+a_3x^3$, multiplication gives

$$
[D]\begin{pmatrix}a_0\\a_1\\a_2\\a_3\end{pmatrix}
=\begin{pmatrix}a_1\\2a_2\\3a_3\\0\end{pmatrix},
$$

exactly the coefficients of $p'$. This matrix has rank $3$, nullity $1$, and nilpotency index $4$.

### 6.4 Operations, rank, and kernel in coordinates

Fix bases throughout. If $S,T:V\to W$ have matrices $B,A$, respectively, then

$$
[S+T]=B+A,\qquad[cT]=cA.
$$

If $R:W\to Z$ has matrix $C$ in a basis of $Z$ and the same intermediate basis of $W$, then

$$
[RT]=CA.
$$

This follows from $[RTv]=C[Tv]=CA[v]$. The order agrees with composition: apply $A$ first, then $C$.

Consequently,

$$
\operatorname{Hom}(V,W)\cong F^{m\times n}
$$

as vector spaces. For endomorphisms in one fixed basis, this is also an algebra isomorphism.

The coordinates of the image are the column space of $A$, and the coordinates of the kernel are the solutions of $Ax=0$. Hence

$$
\boxed{\operatorname{rank}T=\operatorname{rank}A,
\qquad\dim\ker T=n-\operatorname{rank}A.}
$$

A linear isomorphism between finite-dimensional spaces therefore corresponds to an invertible square matrix, and its inverse has matrix $A^{-1}$ in the reversed bases.

---

## 7. Matrix Equations and Vectorization

### 7.1 A matrix equation is a linear equation in a matrix space

Consider

$$
A_1XB_1+\cdots+A_sXB_s=C,
$$

where

$$
A_i\in F^{m\times n},\qquad
B_i\in F^{p\times q},\qquad
X\in F^{n\times p},\qquad
C\in F^{m\times q}.
$$

For fixed $A$ and $B$, the rule

$$
\mathcal T:F^{n\times p}\to F^{m\times q},
\qquad\mathcal T(X)=AXB
$$

is linear. Thus the equation becomes an ordinary system of linear equations after choosing bases for the two matrix spaces.

Let $E_{ij}$ denote a matrix unit, with $1$ in position $(i,j)$ and $0$ elsewhere. Choose the domain basis in **column order**:

$$
E_{11},E_{21},\ldots,E_{n1},
E_{12},\ldots,E_{n2},\ldots,
E_{1p},\ldots,E_{np}.
$$

The coordinates of $X$ in this basis are obtained by stacking its columns.

**Definition.** The **column vectorization** of $X$ is

$$
\operatorname{vec}(X)
=(x_{11},x_{21},\ldots,x_{n1},x_{12},\ldots,x_{n2},\ldots,x_{1p},\ldots,x_{np})^T.
$$

The notation $\operatorname{cs}(X)$ is also used. Row vectorization, sometimes written $\operatorname{rvec}(X)$ or $\operatorname{rs}(X)$, stacks rows instead and can be represented by $\operatorname{vec}(X^T)$.

**Keep the ordering fixed.** Column and row vectorization contain the same entries in different orders. The coefficient matrix of the resulting system depends on which convention is used.

### 7.2 The Kronecker product

**Definition.** For $A=(a_{ij})\in F^{m\times n}$ and $B\in F^{p\times q}$, their **Kronecker product** is the $mp\times nq$ matrix

$$
\boxed{
A\otimes B=
\begin{pmatrix}
a_{11}B&a_{12}B&\cdots&a_{1n}B\\
a_{21}B&a_{22}B&\cdots&a_{2n}B\\
\vdots&\vdots&\ddots&\vdots\\
a_{m1}B&a_{m2}B&\cdots&a_{mn}B
\end{pmatrix}.}
$$

Each entry of $A$ is replaced by that scalar times the whole matrix $B$. In paired-index notation,

$$
(A\otimes B)_{(i-1)p+k,\,(j-1)q+\ell}
=a_{ij}b_{k\ell}.
$$

This product is also called the matrix tensor product.

### 7.3 The matrix of the map $X\mapsto AXB$

**Theorem 7.1.** With column vectorization,

$$
\boxed{\operatorname{vec}(AXB)
=(B^T\otimes A)\operatorname{vec}(X).}
$$

Here $B^T\otimes A$ has size $mq\times np$, matching the dimensions of the output and input matrix spaces.

**Proof by basis images.** For the domain matrix unit $E_{ij}$,

$$
(AE_{ij}B)_{k\ell}=a_{ki}b_{j\ell}.
$$

Thus the coefficient linking input entry $x_{ij}$ to output entry $(AXB)_{k\ell}$ is $a_{ki}b_{j\ell}$. In column order, its row and column numbers are

$$
(\ell-1)m+k,\qquad (j-1)n+i.
$$

The corresponding entry of $B^T\otimes A$ is $b_{j\ell}a_{ki}$, exactly the same coefficient. Therefore $B^T\otimes A$ is the matrix of $\mathcal T$.

Equivalently, write $X=(x_1,\ldots,x_p)$ in columns. The $\ell$th column of $AXB$ is $\sum_j b_{j\ell}Ax_j$. Stacking these output columns gives the same block matrix.

### 7.4 Reducing a general matrix equation

Set

$$
x=\operatorname{vec}(X),\qquad
c=\operatorname{vec}(C),\qquad
G=\sum_{i=1}^s B_i^T\otimes A_i.
$$

Then

$$
\boxed{\sum_{i=1}^s A_iXB_i=C\iff Gx=c.}
$$

Because vectorization is a bijection, no solutions are lost or introduced. Thus the matrix equation is solvable if and only if

$$
\operatorname{rank}\begin{pmatrix}G&c\end{pmatrix}
=\operatorname{rank}G.
$$

When it is solvable, the solution vectors form $x_0+\ker G$. Reshaping them into $n\times p$ matrices gives all matrix solutions. The number of free scalar parameters is $np-\operatorname{rank}G$.

### 7.5 Worked example

Solve

$$
A_1XB_1+A_2XB_2=C,
$$

where

$$
A_1=\begin{pmatrix}1&1\\0&1\end{pmatrix},\qquad
A_2=\begin{pmatrix}2&1\\0&2\end{pmatrix},
$$

$$
B_1=\begin{pmatrix}1&1&0\\0&1&1\\0&0&1\end{pmatrix},\qquad
B_2=\begin{pmatrix}2&1&0\\0&2&1\\0&0&2\end{pmatrix},\qquad
C=\begin{pmatrix}1&2&3\\3&2&1\end{pmatrix}.
$$

The unknown $X$ has size $2\times3$. Write

$$
x=\operatorname{vec}(X)
=(x_{11},x_{21},x_{12},x_{22},x_{13},x_{23})^T.
$$

The coefficient matrix and right-hand side are

$$
G=B_1^T\otimes A_1+B_2^T\otimes A_2
=
\begin{pmatrix}
5&3&0&0&0&0\\
0&5&0&0&0&0\\
3&2&5&3&0&0\\
0&3&0&5&0&0\\
0&0&3&2&5&3\\
0&0&0&3&0&5
\end{pmatrix},
\qquad
c=\begin{pmatrix}1\\3\\2\\2\\3\\1\end{pmatrix}.
$$

The matrix is block lower triangular, with three identical diagonal blocks $\begin{pmatrix}5&3\\0&5\end{pmatrix}$. Its determinant is $25^3=5^6\ne0$, so the solution is unique over $\mathbb R$ or $\mathbb C$.

Solve one pair of entries at a time. The first two equations give

$$
5x_{21}=3,\qquad 5x_{11}+3x_{21}=1,
$$

hence $x_{21}=3/5$ and $x_{11}=-4/25$. The next two equations are

$$
3x_{21}+5x_{22}=2,
\qquad
3x_{11}+2x_{21}+5x_{12}+3x_{22}=2,
$$

which give $x_{22}=1/25$ and $x_{12}=29/125$. Finally,

$$
3x_{22}+5x_{23}=1,
\qquad
3x_{12}+2x_{22}+5x_{13}+3x_{23}=3,
$$

so $x_{23}=22/125$ and $x_{13}=212/625$.

Therefore

$$
\boxed{
X=\begin{pmatrix}
-\dfrac4{25}&\dfrac{29}{125}&\dfrac{212}{625}\\[4pt]
\dfrac35&\dfrac1{25}&\dfrac{22}{125}
\end{pmatrix}.}
$$

Notice how the entries are restored to the matrix: consecutive pairs in $\operatorname{vec}(X)$ become columns of $X$.

---

## 8. Kronecker Products and Tensor Product Spaces

### 8.1 Order matters

The Kronecker product is generally not commutative. Let

$$
a=\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix},\qquad
b=\begin{pmatrix}y_1\\y_2\end{pmatrix},\qquad
c=b^T=\begin{pmatrix}y_1&y_2\end{pmatrix}.
$$

Then

$$
a\otimes b=
\begin{pmatrix}x_1y_1\\x_1y_2\\x_2y_1\\x_2y_2\\x_3y_1\\x_3y_2\end{pmatrix},
\qquad
b\otimes a=
\begin{pmatrix}y_1x_1\\y_1x_2\\y_1x_3\\y_2x_1\\y_2x_2\\y_2x_3\end{pmatrix}.
$$

The entries are reordered and the vectors are generally different. For the row vector $c$, however, this particular example gives

$$
a\otimes c=c\otimes a
=\begin{pmatrix}
x_1y_1&x_1y_2\\
x_2y_1&x_2y_2\\
x_3y_1&x_3y_2
\end{pmatrix}=ac.
$$

Special equalities do not create a general commutative law.

If $A=\operatorname{diag}(a_1,\ldots,a_m)$ and $B=\operatorname{diag}(b_1,\ldots,b_n)$, then

$$
A\otimes B
=\operatorname{diag}(a_1b_1,\ldots,a_1b_n,a_2b_1,\ldots,a_mb_n).
$$

In particular,

$$
I_m\otimes I_n=I_{mn}.
$$

The Kronecker product of two upper triangular matrices is upper triangular, with the same paired ordering of diagonal entries. The analogous statement holds for lower triangular matrices.

### 8.2 Block structure and associativity

If $A$ is partitioned into blocks $A_{ij}$, then

$$
\begin{pmatrix}
A_{11}&\cdots&A_{1s}\\
\vdots&\ddots&\vdots\\
A_{r1}&\cdots&A_{rs}
\end{pmatrix}\otimes B
=
\begin{pmatrix}
A_{11}\otimes B&\cdots&A_{1s}\otimes B\\
\vdots&\ddots&\vdots\\
A_{r1}\otimes B&\cdots&A_{rs}\otimes B
\end{pmatrix}.
$$

This follows directly by grouping the scalar blocks $a_{ij}B$.

**A distinction to keep straight.** One cannot generally partition the right factor $B$ and then rearrange the result as the block matrix $(A\otimes B_{ij})$. That changes the ordering of rows or columns. For example, with $A=I_2$ and $B=(u\ v)$,

$$
A\otimes B=
\begin{pmatrix}u&v&0&0\\0&0&u&v\end{pmatrix},
$$

whereas

$$
\begin{pmatrix}A\otimes u&A\otimes v\end{pmatrix}
=\begin{pmatrix}u&0&v&0\\0&u&0&v\end{pmatrix}.
$$

**Proposition 8.1 (Associativity).**

$$
(A\otimes B)\otimes C=A\otimes(B\otimes C).
$$

**Proof.** Apply the block rule to $A\otimes B=(a_{ij}B)$. The $(i,j)$ block after taking the product with $C$ is

$$
(a_{ij}B)\otimes C=a_{ij}(B\otimes C),
$$

which is exactly the corresponding block of $A\otimes(B\otimes C)$. We may therefore write $A\otimes B\otimes C$ without parentheses.

### 8.3 Bilinearity and the mixed-product rule

From the definition,

$$
\begin{aligned}
(A_1+A_2)\otimes B&=A_1\otimes B+A_2\otimes B,\\
A\otimes(B_1+B_2)&=A\otimes B_1+A\otimes B_2,\\
(cA)\otimes B&=c(A\otimes B)=A\otimes(cB).
\end{aligned}
$$

The interaction with matrix multiplication is particularly useful.

**Theorem 8.2 (Mixed-product rule).** Whenever $AC$ and $BD$ are defined,

$$
\boxed{(A\otimes B)(C\otimes D)=(AC)\otimes(BD).}
$$

**Proof.** Regard the product as a block product. Its $(i,j)$ block is

$$
\sum_k(a_{ik}B)(c_{kj}D)
=\left(\sum_k a_{ik}c_{kj}\right)BD
=(AC)_{ij}BD,
$$

which is the $(i,j)$ block of $(AC)\otimes(BD)$.

The factor order within $AC$ and $BD$ must be preserved. There is no assumption that the matrices commute.

### 8.4 Inverse, transpose, and rank

If $A$ and $B$ are invertible, the mixed-product rule gives

$$
(A\otimes B)(A^{-1}\otimes B^{-1})
=I\otimes I=I.
$$

The reverse product is also the identity, so

$$
\boxed{(A\otimes B)^{-1}=A^{-1}\otimes B^{-1}.}
$$

Unlike the inverse of an ordinary product, this formula does not reverse the factors.

The entry formula also gives

$$
\boxed{(A\otimes B)^T=A^T\otimes B^T.}
$$

**Theorem 8.3.** For arbitrary rectangular matrices,

$$
\boxed{\operatorname{rank}(A\otimes B)
=\operatorname{rank}A\,\operatorname{rank}B.}
$$

**Proof.** Let $r=\operatorname{rank}A$ and $s=\operatorname{rank}B$. Choose invertible matrices $P,Q,M,N$ giving rank normal forms

$$
PAQ=\begin{pmatrix}I_r&0\\0&0\end{pmatrix},
\qquad
MBN=\begin{pmatrix}I_s&0\\0&0\end{pmatrix},
$$

with suitable rectangular block sizes. Then

$$
(P\otimes M)(A\otimes B)(Q\otimes N)
=(PAQ)\otimes(MBN).
$$

The factors on the left and right are invertible. The matrix on the right has exactly $rs$ independent nonzero coordinate columns, so its rank is $rs$. Multiplication by invertible matrices preserves rank.

For square matrices of positive sizes, this also shows

$$
A\otimes B\text{ invertible}
\iff A\text{ and }B\text{ both invertible}.
$$

### 8.5 Determinant, eigenvalues, and trace

**Theorem 8.4.** If $A$ is $m\times m$ and $B$ is $n\times n$, then

$$
\boxed{\det(A\otimes B)=(\det A)^n(\det B)^m.}
$$

**Proof.** Work over a field in which both characteristic polynomials split; for real matrices, we may work over $\mathbb C$. Choose similarities making $A$ and $B$ upper triangular:

$$
P^{-1}AP=U,\qquad Q^{-1}BQ=V.
$$

By the mixed-product rule,

$$
(P\otimes Q)^{-1}(A\otimes B)(P\otimes Q)=U\otimes V.
$$

The latter is upper triangular with diagonal entries $u_{ii}v_{jj}$ for all $i,j$. Therefore

$$
\det(A\otimes B)
=\prod_{i=1}^m\prod_{j=1}^n u_{ii}v_{jj}
=\left(\prod_i u_{ii}\right)^n
 \left(\prod_j v_{jj}\right)^m.
$$

This is the claimed formula. Extending the field does not change the determinants, so the identity also holds over the original field.

The same triangularization argument proves that, over $\mathbb C$ or a splitting field, the eigenvalues of $A\otimes B$ are

$$
\lambda_i\mu_j\qquad(1\leq i\leq m,\ 1\leq j\leq n),
$$

counted with algebraic multiplicity, where $(\lambda_i)$ and $(\mu_j)$ are the eigenvalues of $A$ and $B$. Diagonalizability is not required.

If $Au=\lambda u$ and $Bv=\mu v$ for nonzero vectors $u,v$, then the corresponding eigenvector identity is

$$
(A\otimes B)(u\otimes v)
=(Au)\otimes(Bv)
=\lambda\mu(u\otimes v).
$$

Finally, summing the diagonal entries gives

$$
\boxed{\operatorname{tr}(A\otimes B)
=\operatorname{tr}(A)\operatorname{tr}(B).}
$$

### 8.6 Tensor product spaces

For the coordinate spaces $V=F^m$ and $W=F^n$, the vector Kronecker products $v\otimes w$ lie in $F^{mn}$. Define their tensor product space by taking finite sums:

$$
V\otimes W
=\left\{\sum_{i=1}^k v_i\otimes w_i:
 v_i\in V,\ w_i\in W,\ k\geq1\right\}.
$$

This is a vector space. If $(e_i)$ and $(f_j)$ are the standard bases, the $mn$ vectors $e_i\otimes f_j$ are exactly the standard coordinate basis of $F^{mn}$. Thus this concrete realization is $F^{mn}$.

More generally, if $(\alpha_1,\ldots,\alpha_m)$ and $(\beta_1,\ldots,\beta_n)$ are bases, then

$$
\alpha_1\otimes\beta_1,\ldots,\alpha_1\otimes\beta_n,
\alpha_2\otimes\beta_1,\ldots,
\alpha_m\otimes\beta_n
$$

is a basis of $V\otimes W$, and

$$
\boxed{\dim(V\otimes W)=(\dim V)(\dim W).}
$$

One way to verify independence is to let $P,Q$ be the basis matrices of $(\alpha_i)$ and $(\beta_j)$. The displayed vectors are the columns of $P\otimes Q$, which is invertible. The same description extends to abstract finite-dimensional vector spaces by constructing formal tensors subject to bilinearity.

**A distinction to keep straight.** A single vector of the form $v\otimes w$ is a **pure tensor**. A general tensor is a sum of pure tensors and need not itself be pure. For example, in $F^2\otimes F^2$,

$$
e_1\otimes f_1+e_2\otimes f_2
$$

is not pure: its coefficient matrix is $I_2$, whereas a nonzero pure tensor has a coefficient matrix of rank one.

### 8.7 Tensor products of linear transformations

Let $S:V\to V$ and $T:W\to W$ be linear transformations. Define $S\otimes T$ on tensor basis vectors by

$$
(S\otimes T)(\alpha_i\otimes\beta_j)
=S\alpha_i\otimes T\beta_j,
$$

and extend linearly. Bilinearity then gives, for arbitrary $v,w$,

$$
\boxed{(S\otimes T)(v\otimes w)=Sv\otimes Tw.}
$$

If $A=[S]_\alpha$ and $B=[T]_\beta$, then

$$
S\alpha_i\otimes T\beta_j
=\sum_{k,\ell}a_{ki}b_{\ell j}\,
\alpha_k\otimes\beta_\ell.
$$

These are exactly the coefficients of $A\otimes B$ in the ordered tensor basis. Hence

$$
[S\otimes T]_{\alpha\otimes\beta}=A\otimes B.
$$

The Kronecker product is therefore the coordinate form of a natural operation on linear transformations.

---

## 9. Changing Bases

### 9.1 The change-of-basis matrix and coordinate direction

Fix an endomorphism $T:V\to V$. Let $\alpha=(\alpha_1,\ldots,\alpha_n)$ be the old basis and $\beta=(\beta_1,\ldots,\beta_n)$ the new basis. Define $P$ by

$$
\beta=\alpha P.
$$

Thus the columns of $P$ are the new basis vectors written in old coordinates. Since both lists are bases, $P$ is invertible.

For any $v\in V$,

$$
v=\beta[v]_\beta=\alpha P[v]_\beta=\alpha[v]_\alpha,
$$

so

$$
\boxed{[v]_\alpha=P[v]_\beta,
\qquad [v]_\beta=P^{-1}[v]_\alpha.}
$$

**Keep the direction clear.** Although $P$ is built by expressing the new basis in the old basis, it sends **new coordinates to old coordinates**.

### 9.2 Similar matrices represent the same transformation

Let $A=[T]_\alpha$ and $B=[T]_\beta$.

**Theorem 9.1 (Change of basis).**

$$
\boxed{B=P^{-1}AP.}
$$

**Proof using basis rows.** Since $\beta=\alpha P$,

$$
T\beta=T(\alpha P)=(T\alpha)P=\alpha AP
=\beta P^{-1}AP.
$$

The matrix in the new basis is therefore $P^{-1}AP$.

The coordinate interpretation explains the three factors: start with new coordinates, use $P$ to convert to old coordinates, apply $A$, then use $P^{-1}$ to return to new coordinates.

**Definition.** Square matrices $A$ and $B$ are **similar** if $B=P^{-1}AP$ for some invertible $P$.

Thus similarity describes one linear transformation in different bases. The transformation itself has not changed. A suitable basis may reveal a much simpler matrix, such as a diagonal or block diagonal matrix. Rank, characteristic polynomial, eigenvalues, determinant, and trace are unchanged by similarity.

### 9.3 Independent changes in domain and codomain

For a general map $T:V\to W$, the domain and codomain bases can be changed independently. Suppose

$$
\alpha'=\alpha P,\qquad\beta'=\beta Q,
\qquad A=[T]_{\beta\leftarrow\alpha}.
$$

Then

$$
\boxed{[T]_{\beta'\leftarrow\alpha'}=Q^{-1}AP.}
$$

Indeed, $[v]_\alpha=P[v]_{\alpha'}$ and $[Tv]_{\beta'}=Q^{-1}[Tv]_\beta$.

Independent changes lead to **matrix equivalence**. Every rank-$r$ matrix can be reduced this way to

$$
\begin{pmatrix}I_r&0\\0&0\end{pmatrix}.
$$

For an endomorphism represented in one common basis, the domain and codomain changes must be the same, so the allowed operation is similarity. This is why classifying endomorphisms is more restrictive than classifying arbitrary maps between independently based spaces.

---

## 10. Invariant Subspaces and Commuting Transformations

### 10.1 Definition and basic examples

**Definition.** A subspace $U\subseteq V$ is **invariant under $T$**, or **$T$-invariant**, if

$$
T(U)\subseteq U.
$$

Invariance means that applying $T$ to a vector of $U$ keeps it inside $U$. It does not require $T(U)=U$.

For an invariant subspace, the restriction

$$
T|_U:U\to U
$$

is itself a linear transformation. The spaces $\{0\}$ and $V$ are always invariant and are called the trivial invariant subspaces.

Two other immediate examples are $\ker T$ and $\operatorname{im}T$:

$$
Tv=0\implies T(Tv)=0,
\qquad
v=Tw\implies Tv=T(Tw)\in\operatorname{im}T.
$$

For every scalar $\lambda$, the eigenspace

$$
E_\lambda(T)=\ker(T-\lambda I)
$$

is invariant, because $Tv=\lambda v$ keeps $v$ within that eigenspace. Every one-dimensional subspace spanned by an eigenvector is invariant.

To check that a subspace is invariant, it is enough to check the images of a spanning set. Linearity then handles every vector in the subspace.

### 10.2 Invariant subspaces and block upper triangular matrices

**Theorem 10.1.** Let $U$ be a $T$-invariant subspace of dimension $r$. Choose a basis $(\alpha_1,\ldots,\alpha_r)$ of $U$ and extend it to a basis of $V$. In this basis,

$$
\boxed{[T]=\begin{pmatrix}A_{11}&A_{12}\\0&A_{22}\end{pmatrix},}
$$

where $A_{11}$ is the matrix of $T|_U$.

**Proof.** For $j\leq r$, invariance gives $T\alpha_j\in U$. Thus the last $n-r$ coordinates of these images are zero. These are exactly the entries of the lower-left block.

Conversely, a matrix with this block form makes the span of the first $r$ basis vectors invariant.

The remaining basis vectors span a complementary subspace, but that complement need not be invariant: $A_{12}$ records the components sent from the complement into $U$. The complement is invariant precisely when $A_{12}=0$.

There is also an induced map on the quotient,

$$
\widetilde T:V/U\to V/U,\qquad
\widetilde T(v+U)=Tv+U.
$$

It is well-defined because $U$ is invariant. In the quotient basis given by the last $n-r$ basis vectors modulo $U$, its matrix is $A_{22}$.

As a useful special case, if $[T]$ is upper triangular, then each initial span

$$
\operatorname{span}(\alpha_1,\ldots,\alpha_k)
\qquad(1\leq k\leq n)
$$

is invariant. For a block upper triangular matrix, the initial groups of basis blocks likewise span invariant subspaces. Thus triangular form corresponds to a nested chain of invariant subspaces.

### 10.3 Invariant direct sums and block diagonal matrices

**Theorem 10.2.** Suppose

$$
V=U_1\oplus\cdots\oplus U_k,
$$

and every $U_i$ is $T$-invariant. Concatenate a basis of each $U_i$ to obtain a basis of $V$. Then

$$
\boxed{[T]=\operatorname{diag}(A_1,\ldots,A_k),}
$$

where $A_i$ is the matrix of $T|_{U_i}$ and has size $\dim U_i$.

**Proof.** Every basis vector from $U_i$ is mapped to a linear combination of basis vectors from the same $U_i$. Therefore all off-diagonal blocks are zero.

Conversely, a block diagonal matrix gives a direct sum of invariant coordinate subspaces. On a vector $v=u_1+\cdots+u_k$, the transformation acts componentwise:

$$
Tv=T|_{U_1}(u_1)+\cdots+T|_{U_k}(u_k).
$$

In particular,

$$
\boxed{T\text{ is diagonalizable over }F
\iff V\text{ is a direct sum of one-dimensional invariant subspaces}.}
$$

A nonzero generator of each such one-dimensional subspace is an eigenvector. Equivalently, a diagonalizable transformation has a basis of eigenvectors, and $V$ is the direct sum of its distinct eigenspaces.

### 10.4 Worked example: finding an invariant subspace and its restriction

Suppose $V$ has basis $(\alpha_1,\alpha_2,\alpha_3)$ and $T$ has matrix

$$
A=\begin{pmatrix}
3&1&-1\\
2&2&-1\\
2&2&0
\end{pmatrix}.
$$

Consider

$$
U=\operatorname{span}\{\alpha_3,\alpha_1+\alpha_2+2\alpha_3\}.
$$

Set

$$
u_1=\alpha_3,\qquad
u_2=\alpha_1+\alpha_2+2\alpha_3.
$$

These vectors are independent. Compute their images in the original coordinates:

$$
A\begin{pmatrix}0\\0\\1\end{pmatrix}
=\begin{pmatrix}-1\\-1\\0\end{pmatrix},
\qquad
A\begin{pmatrix}1\\1\\2\end{pmatrix}
=\begin{pmatrix}2\\2\\4\end{pmatrix}.
$$

Hence

$$
Tu_1=-\alpha_1-\alpha_2=2u_1-u_2,
\qquad
Tu_2=2u_2.
$$

Both images lie in $U$, proving invariance. Reading off their coefficients in $(u_1,u_2)$ gives

$$
\boxed{[T|_U]_{(u_1,u_2)}
=\begin{pmatrix}2&0\\-1&2\end{pmatrix}.}
$$

To see the full block structure, extend this basis by $u_3=\alpha_1$. The change-of-basis matrix is

$$
P=\begin{pmatrix}
0&1&1\\
0&1&0\\
1&2&0
\end{pmatrix}.
$$

Since $Tu_3=-2u_1+2u_2+u_3$,

$$
P^{-1}AP
=\begin{pmatrix}
2&0&-2\\
-1&2&2\\
0&0&1
\end{pmatrix}.
$$

The lower-left zero block expresses invariance of $U$. The nonzero upper-right block shows that the chosen complement $\operatorname{span}\{u_3\}$ is not invariant.

### 10.5 Commuting transformations preserve each other's structure

**Theorem 10.3.** If $S,T\in\operatorname{End}(V)$ satisfy $ST=TS$, then

$$
\ker S,\qquad\operatorname{im}S,\qquad E_\lambda(S)
$$

are all $T$-invariant.

**Proof for the kernel.** If $Sv=0$, then

$$
S(Tv)=T(Sv)=0,
$$

so $Tv\in\ker S$.

**Proof for the image.** If $v=Sw$, then

$$
Tv=TSw=STw\in\operatorname{im}S.
$$

**Proof for eigenspaces.** If $Sv=\lambda v$, then

$$
S(Tv)=T(Sv)=T(\lambda v)=\lambda Tv.
$$

Thus $Tv\in E_\lambda(S)$. The same statements hold with $S$ and $T$ interchanged.

This observation allows a commuting transformation to be studied separately on the eigenspaces of another transformation, whenever those eigenspaces together span $V$.

### 10.6 Simultaneous diagonalization

**Definition.** Transformations are **simultaneously diagonalizable** if there is one basis in which all of their matrices are diagonal.

If two transformations are simultaneously diagonalizable, they commute, since diagonal matrices commute. For the converse, diagonalizability of the individual transformations is essential.

**Theorem 10.4.** Two diagonalizable transformations $S,T$ on a finite-dimensional vector space over $F$ are simultaneously diagonalizable if and only if they commute.

**Proof of sufficiency.** Since $S$ is diagonalizable,

$$
V=\bigoplus_\lambda E_\lambda(S).
$$

Commutation makes each $E_\lambda(S)$ invariant under $T$. We need an eigenbasis for the restriction of $T$ to each of these subspaces.

To justify this step, let $\mu_1,\ldots,\mu_r$ be the distinct eigenvalues of the diagonalizable map $T$. Define its spectral projections by

$$
Q_j=\prod_{\ell\ne j}
\frac{T-\mu_\ell I}{\mu_j-\mu_\ell}.
$$

On a $\mu_i$-eigenvector, $Q_j$ acts as $1$ when $i=j$ and as $0$ otherwise. Hence

$$
I=\sum_j Q_j,\qquad
\operatorname{im}Q_j=E_{\mu_j}(T).
$$

Any $T$-invariant subspace $U$ is preserved by every polynomial in $T$, so $Q_j(U)\subseteq U$. Thus

$$
U=\bigoplus_j\bigl(U\cap E_{\mu_j}(T)\bigr),
$$

which proves that $T|_U$ is diagonalizable. Apply this to $U=E_\lambda(S)$. Choose a $T$-eigenbasis inside each such space. Every chosen vector is also an $S$-eigenvector, and their union is the desired common eigenbasis.

**Why commutation alone is insufficient.** The identity commutes with

$$
N=\begin{pmatrix}0&1\\0&0\end{pmatrix},
$$

but $N$ is not diagonalizable. Therefore these two matrices cannot be simultaneously diagonalized. Likewise, being over $\mathbb C$ does not by itself imply a direct-sum decomposition into ordinary eigenspaces.

**Corollary (Commuting real symmetric matrices).** A finite family of pairwise commuting real symmetric matrices can be simultaneously diagonalized by one orthogonal matrix. That is, there is an orthogonal $Q$ for which every $Q^TA_iQ$ is diagonal.

**Proof idea.** Diagonalize one matrix by the spectral theorem. Its mutually orthogonal eigenspaces are invariant under every other matrix by commutation. Each restricted matrix remains symmetric on those spaces, so the spectral theorem applies again within each eigenspace. Repeating this process produces a common orthonormal eigenbasis. Previously diagonalized matrices remain scalar on each subspace being refined.

---

## 11. A Compact Revision Guide

| Concept | Statement to remember | Condition or interpretation |
|---|---|---|
| Left and right inverses | Injective $\iff$ left inverse; surjective $\iff$ right inverse | Nonempty sets; arbitrary selections of preimages use choice |
| Invertibility | Bijective $\iff$ invertible | A two-sided inverse is unique |
| Basis prescription | Arbitrary images of a basis define a unique linear map | The prescribed images need not be independent |
| Isomorphism | A basis is sent to a basis | Both independence and spanning are preserved |
| Space of maps | $\dim\operatorname{Hom}(V,W)=(\dim V)(\dim W)$ | Finite-dimensional spaces |
| Fibers | $T^{-1}(\{Tv\})=v+\ker T$ | A nonempty fiber is a coset, usually not a subspace |
| First isomorphism theorem | $V/\ker T\cong\operatorname{im}T$ | Collapse exactly the differences killed by $T$ |
| Rank–nullity | $\dim\ker T+\operatorname{rank}T=\dim V$ | Finite-dimensional domain |
| Injective versus surjective | Injective $\iff$ surjective | Equal finite dimensions |
| Kernel–image direct sum | $V=\ker T\oplus\operatorname{im}T$ | Requires zero intersection in finite dimensions |
| Idempotence | $P^2=P$ means projection onto $\operatorname{im}P$ along $\ker P$ | The direct-sum conclusion holds in any dimension |
| Rank criterion | $T^2=T\iff\operatorname{rank}T+\operatorname{rank}(I-T)=n$ | Endomorphism of an $n$-dimensional space |
| Matrix representation | $[Tv]_\beta=[T]_{\beta\leftarrow\alpha}[v]_\alpha$ | Columns are images of domain basis vectors |
| Vectorization | $\operatorname{vec}(AXB)=(B^T\otimes A)\operatorname{vec}(X)$ | Columns are stacked, and the right factor is transposed |
| Mixed-product rule | $(A\otimes B)(C\otimes D)=(AC)\otimes(BD)$ | Both ordinary products must be defined |
| Kronecker rank | $\operatorname{rank}(A\otimes B)=\operatorname{rank}A\operatorname{rank}B$ | Rectangular matrices are allowed |
| Kronecker determinant | $\det(A_m\otimes B_n)=(\det A)^n(\det B)^m$ | Square factors; note the exponents |
| Change of basis | $B=P^{-1}AP$ when $\beta=\alpha P$ | $P$ converts new coordinates to old coordinates |
| Invariant subspace | $T(U)\subseteq U$ | A basis beginning with a basis of $U$ gives block upper triangular form |
| Invariant direct sum | $V=\bigoplus_iU_i$ gives $[T]=\operatorname{diag}(A_i)$ | Every summand must be invariant |
| Commutation | $ST=TS$ makes each $S$-eigenspace $T$-invariant | Eigenspaces span the whole space only if $S$ is diagonalizable |
| Simultaneous diagonalization | Commuting diagonalizable maps share an eigenbasis | Commuting real symmetric matrices share an orthonormal eigenbasis |
