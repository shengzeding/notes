---
title: Polynomial Theory
order: 3
---

# Polynomial Theory

## 1. Polynomials: Formal Expressions and Their Arithmetic

### 1.1 Start with coefficients and a formal symbol

**Definition.** A nonzero polynomial in one indeterminate over $F$ is an expression

$$
f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0,
\qquad a_i\in F,\quad a_n\ne0.
$$

Here $n$ is a nonnegative integer, $a_ix^i$ is the term of degree $i$, and $a_i$ is its coefficient. The coefficient $a_n$ is the **leading coefficient**, and

$$
\deg f=n.
$$

The zero polynomial is also allowed, with degree $-\infty$. Every nonzero constant has degree zero. A nonzero polynomial is **monic** if its leading coefficient is $1$. The set of all such polynomials is denoted by $F[x]$.

Two polynomials are equal precisely when their coefficients agree at every power of $x$, including coefficients that are zero. The symbol $x$ is an indeterminate; substituting a number for it is a separate operation introduced later.

### 1.2 The algebra behind the coefficient set

The coefficient system determines which operations are available.

**Definition (Ring).** A ring $R$ is a nonempty set with addition and multiplication such that addition is associative and commutative, has an identity $0$ and additive inverses, multiplication is associative, and both distributive laws hold:

$$
a(b+c)=ab+ac,\qquad (a+b)c=ac+bc.
$$

A ring is **commutative** if multiplication is commutative. It is **unital** if it has a multiplicative identity $1$. A **field** is a commutative unital ring with $1\ne0$ in which every nonzero element has a multiplicative inverse.

Unless stated otherwise, $F$ is a subfield of $\mathbb C$, such as $\mathbb Q$, $\mathbb R$, or $\mathbb C$. We use **number field** in this broad sense. Such fields are infinite and have characteristic zero. Greatest common divisors are normalized to be monic.

Polynomials can be defined over rings as well as fields. However, division by an arbitrary nonzero leading coefficient is available in a field. This is exactly what polynomial long division will use.

### 1.3 Addition, scalar multiplication, and multiplication

Insert zero coefficients when necessary so that two polynomials can be written with the same upper index:

$$
f(x)=\sum_{i=0}^n a_ix^i,\qquad g(x)=\sum_{i=0}^n b_ix^i.
$$

Then

$$
f\pm g=\sum_{i=0}^n(a_i\pm b_i)x^i,
\qquad cf=\sum_{i=0}^n ca_ix^i.
$$

These operations make $F[x]$ a vector space over $F$: the vector-space rules follow coefficient by coefficient. In particular, $1,x,x^2,\ldots$ form a basis, with only finitely many nonzero coefficients in each vector.

For $f$ of degree $n$ and $g$ of degree $m$, multiplication is defined by distributing and collecting equal powers:

$$
fg=\sum_{k=0}^{m+n}c_kx^k,
\qquad c_k=\sum_{i+j=k}a_ib_j.
$$

For example,

$$
c_{m+n}=a_nb_m,
\qquad c_{m+n-1}=a_nb_{m-1}+a_{n-1}b_m.
$$

Multiplication is associative and commutative, distributes over addition, and is compatible with scalar multiplication:

$$
(cf)g=c(fg)=f(cg).
$$

Multiplication by a constant polynomial agrees with scalar multiplication. Thus $F[x]$ is both a vector space and a commutative unital ring.

### 1.4 Degree is the main bookkeeping tool

**Theorem 1.1 (Degree rules).** For $f,g\in F[x]$ and $c\in F\setminus\{0\}$,

$$
\deg(fg)=\deg f+\deg g,
\qquad \deg(cf)=\deg f,
$$

$$
\deg(f\pm g)\le\max\{\deg f,\deg g\}.
$$

The first rule includes the zero polynomial using $-\infty+d=-\infty$. For nonzero $f,g$, its proof is that $a_nb_m\ne0$, so the leading term of the product cannot disappear.

**When does the last inequality become strict?** For nonzero polynomials, their degrees must be equal and their leading coefficients must cancel: $a_n+b_n=0$ for a sum, or $a_n-b_n=0$ for a difference. If the degrees differ, the higher leading term survives.

**Corollary (Cancellation).** If $f\ne0$ and $fg=fh$, then $g=h$. Indeed,

$$
f(g-h)=0,
$$

and the product of two nonzero polynomials cannot be zero. This conclusion can fail for coefficients in a ring with zero divisors.

### 1.5 Why division needs a new idea

Even when $F$ is a field, $F[x]$ is not a field: for example, $1/x$ is not a polynomial. There are two ways forward.

One is to form **rational functions**. On

$$
F[x]\times\bigl(F[x]\setminus\{0\}\bigr),
$$

define

$$
(f,g)\sim(f_1,g_1)
\quad\Longleftrightarrow\quad fg_1=f_1g.
$$

The equivalence class of $(f,g)$ is written $f/g$; these classes form $F(x)$. This gives a precise meaning to fractions without depending on a particular numerator and denominator.

The other route is to stay in $F[x]$ and divide **with remainder**, just as for integers.


## 2. Divisibility and Division with Remainder

### 2.1 What divisibility means

**Definition.** We say that $g$ divides $f$, written $g\mid f$, if some $h\in F[x]$ satisfies

$$
f=gh.
$$

Then $g$ is a **factor** of $f$. If no such $h$ exists, write $g\nmid f$.

Every polynomial divides $0$, including $0$ itself. The zero polynomial divides no nonzero polynomial. Nonzero constants divide every polynomial, and they are the only polynomials that do so: a divisor of $1$ must have degree zero.

The basic rules are worth keeping together:

| Assumptions | Conclusion |
|---|---|
| $f\mid g$, $c\ne0$ a constant | $cf\mid g$ |
| Any $f$ | $f\mid f$ |
| $f\mid g$ and $g\mid h$ | $f\mid h$ |
| $f\mid g$ and $f\mid h$ | $f\mid ug+vh$ for every $u,v\in F[x]$ |
| $f\mid g$ and $g\mid f$ | $f=cg$ for some nonzero constant $c$ |

For the last row, if either polynomial is zero then both are zero. Otherwise, write $g=uf$ and $f=vg$ and use degrees to see that $u,v$ are constants. Polynomials differing by a nonzero constant factor are called **associates**.

### 2.2 The division theorem

**Theorem 2.1 (Division with remainder).** If $f,g\in F[x]$ and $g\ne0$, there are unique $q,r\in F[x]$ such that

$$
f=qg+r,\qquad \deg r<\deg g.
$$

The polynomial $q$ is the quotient and $r$ is the remainder. In particular,

$$
g\mid f\quad\Longleftrightarrow\quad r=0.
$$

**Existence: remove one leading term at a time.** If $\deg f<\deg g$, take $q=0$ and $r=f$. Otherwise, write the leading terms as $a_nx^n$ and $b_mx^m$, with $n\ge m$, and set

$$
f_1=f-\frac{a_n}{b_m}x^{n-m}g.
$$

The degree drops below $n$. Repeat the same operation, or apply induction on the degree. The process ends because nonnegative degrees cannot keep decreasing. This proof is the long-division algorithm itself.

**Example.** Divide as follows:

$$
3x^4-4x^3+5x-1
=(3x^2-x-4)(x^2-x+1)+(2x+3).
$$

Here the divisor is $x^2-x+1$, the quotient is $3x^2-x-4$, and the remainder has degree $1<2$.

### 2.3 Why the remainder is unique

Suppose

$$
f=qg+r=q_1g+r_1,
\qquad \deg r,\deg r_1<\deg g.
$$

Subtracting gives

$$
(q-q_1)g=r_1-r.
$$

If $q-q_1\ne0$, the left side has degree at least $\deg g$, whereas the right side has degree below $\deg g$. This is impossible. Hence $q=q_1$ and then $r=r_1$.

**Technique worth keeping: compare degrees after subtraction.** Many uniqueness arguments become simple once two proposed answers are subtracted and a nonzero multiple is forced to have impossibly small degree.


## 3. Greatest Common Divisors and Coprimality

### 3.1 Why the greatest common divisor is monic

**Definition.** A common divisor of $f,g$ is a polynomial dividing both. If $f,g$ are not both zero, their **greatest common divisor** is the monic common divisor of largest degree, denoted by

$$
d=(f,g)=\gcd(f,g).
$$

Multiplying a common divisor by a nonzero constant does not change what it divides. Requiring it to be monic removes this scalar ambiguity. Any nonzero polynomial can be made monic by dividing by its leading coefficient.

The Euclidean algorithm will prove that the monic gcd is unique and that every common divisor divides it. For $f\ne0$, $(f,0)$ is the monic associate of $f$. We leave $(0,0)$ outside this definition.

### 3.2 Euclid's algorithm: replace the pair, preserve the divisors

**Lemma.** If $f=qg+r$, the common divisors of $f,g$ are exactly the common divisors of $g,r$. Thus, whenever the gcd is defined,

$$
(f,g)=(g,r).
$$

This follows from $r=f-qg$ and $f=qg+r$. The lemma does not require $\deg r<\deg g$; that inequality is needed to make the algorithm terminate.

Repeated division gives

$$
\begin{aligned}
f&=q_1g+r_1,\\
g&=q_2r_1+r_2,\\
r_1&=q_3r_2+r_3,\\
&\ \vdots\\
r_{s-1}&=q_{s+1}r_s+r_{s+1},\\
r_s&=q_{s+2}r_{s+1},
\end{aligned}
$$

with strictly decreasing degrees of nonzero remainders. The gcd is the **last nonzero remainder, normalized to be monic**.

**A useful field distinction.** If $F\subseteq K$ and $f,g\in F[x]$, their monic gcd is the same whether computed in $F[x]$ or $K[x]$. The divisions already take place in $F[x]$. Individual irreducible factors can change after enlarging the field; the gcd of two fixed polynomials does not.

### 3.3 Bézout's identity and a worked example

**Theorem 3.1 (Bézout's identity).** If $f,g$ are not both zero, some $u,v\in F[x]$ satisfy

$$
(f,g)=uf+vg.
$$

Back-substitute through the Euclidean algorithm: every remainder is a polynomial linear combination of the two original polynomials. Consequently, every common divisor of $f,g$ divides $(f,g)$.

**Example.** Let

$$
f=x^4-x^3-x^2+2x-1,
\qquad g=x^3-2x+1.
$$

The divisions can be written as

$$
f=(x-1)g+(x^2-x),
$$

$$
g=(x+1)(x^2-x)+(-x+1),
\qquad x^2-x=-x(-x+1).
$$

The last nonzero remainder is $-x+1$, so the monic gcd is $x-1$. Back-substitution gives

$$
x-1=(x+1)f-x^2g.
$$

**What to remember.** Euclid computes the gcd; back-substitution explains why the gcd is a linear combination. These are two parts of the same calculation.

### 3.4 A second proof: choose a combination of least degree

Consider all nonzero polynomial combinations

$$
I^*=\{uf+vg:u,v\in F[x],\ uf+vg\ne0\}.
$$

Choose a monic element $h_0$ of least degree. Divide $f$ by $h_0$:

$$
f=qh_0+r,\qquad \deg r<\deg h_0.
$$

Because $h_0$ is a combination of $f,g$, so is $r=f-qh_0$. Minimality forces $r=0$. Similarly, $h_0\mid g$. Every common divisor of $f,g$ divides $h_0$, so $h_0$ is their gcd.

This proof extends directly to any finite family $f_1,\ldots,f_k$ that is not identically zero: its monic gcd is a combination

$$
(f_1,\ldots,f_k)=u_1f_1+\cdots+u_kf_k,
$$

and divides every $f_i$, while every common divisor divides it. Grouping the entries does not change the answer:

$$
(f_1,f_2,\ldots,f_k)
=((f_1,f_2),f_3,\ldots,f_k)
=(f_1,(f_2,\ldots,f_k)),
$$

with zero subfamilies handled by omitting their zero entries before computing a gcd.

### 3.5 Coprimality turns divisibility into cancellation

**Definition.** The polynomials $f,g$ are **coprime** if $(f,g)=1$.

**Theorem 3.2.** Coprimality is equivalent to the existence of $u,v\in F[x]$ such that

$$
uf+vg=1.
$$

The useful consequences all come from multiplying a Bézout identity by the right polynomial.

**Coprime divisors combine.** If $f_1\mid g$, $f_2\mid g$, and $(f_1,f_2)=1$, then $f_1f_2\mid g$. Indeed, multiply $uf_1+vf_2=1$ by $g$:

$$
g=guf_1+gvf_2.
$$

Each term on the right is divisible by $f_1f_2$.

**Euclid's lemma.** If $(f,g)=1$ and $f\mid gh$, then $f\mid h$. Multiply $uf+vg=1$ by $h$:

$$
h=huf+vgh.
$$

Both terms are divisible by $f$.

**Removing the gcd leaves coprime factors.** If $d=(f,g)$, $f=df_1$, and $g=dg_1$, then $(f_1,g_1)=1$. Divide $uf+vg=d$ by the nonzero polynomial $d$ to obtain $uf_1+vg_1=1$.

**A common monic factor pulls out.** For monic $h$,

$$
(hf,hg)=h(f,g).
$$

The right side is a monic common divisor, and the identity $huf+hvg=h(f,g)$ shows that every common divisor divides it.

**Coprimality survives products.** If $(f_1,g)=(f_2,g)=1$, then $(f_1f_2,g)=1$. Multiply two Bézout identities:

$$
\begin{aligned}
1&=(u_1f_1+v_1g)(u_2f_2+v_2g)\\
&=u_1u_2f_1f_2+
(u_1v_2f_1+u_2v_1f_2+v_1v_2g)g.
\end{aligned}
$$

**Check the normalization:** the formula $(hf,hg)=h(f,g)$ assumes $h$ is monic. Otherwise normalize the right side as well.


## 4. Irreducible Factors, Derivatives, and Repeated Factors

### 4.1 Factorization depends on the field

**Definition.** A nonconstant polynomial $f\in F[x]$ is **reducible over $F$** if

$$
f=gh,\qquad 0<\deg g,\deg h<\deg f.
$$

Otherwise it is **irreducible over $F$**. Nonzero constants are units, and are kept outside the irreducible factors in a factorization.

The coefficient field must always be specified:

| Polynomial | Over $\mathbb Q$ | Over $\mathbb R$ | Over $\mathbb C$ |
|---|---|---|---|
| $x^2-2$ | Irreducible | $(x-\sqrt2)(x+\sqrt2)$ | Same linear factors |
| $x^2+1$ | Irreducible | Irreducible | $(x-i)(x+i)$ |

A degree-one polynomial is always irreducible. The condition on degrees excludes the trivial decomposition $f=c^{-1}(cf)$.

### 4.2 Irreducible polynomials behave like primes

**Theorem 4.1.** If $p$ is irreducible in $F[x]$ and $p\mid fg$, then

$$
p\mid f\quad\text{or}\quad p\mid g.
$$

If $p\nmid f$, the only possible monic gcd of $p,f$ is $1$. Euclid's lemma then gives $p\mid g$. Repeating this argument shows that

$$
p\mid f_1f_2\cdots f_s
\quad\Longrightarrow\quad p\mid f_i\text{ for some }i.
$$

An element with this divisibility property, subject to being nonzero and not a unit, is called **prime**. Conversely, a prime polynomial cannot have a factorization into two lower-degree nonconstant factors. Thus irreducible and prime coincide in $F[x]$.

### 4.3 Unique factorization

**Theorem 4.2 (Unique factorization).** Every nonzero polynomial has a factorization

$$
f=a_n p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_s^{\alpha_s},
$$

where $a_n$ is the leading coefficient, the $p_i$ are distinct monic irreducible polynomials, and $\alpha_i\ge1$. The factors and exponents are unique up to rearrangement. For a constant polynomial, the product is empty.

**Proof idea to keep.** Existence follows by splitting a reducible polynomial and inducting on degree. For uniqueness, an irreducible factor on one side divides a factor on the other side by Theorem 4.1. The two monic irreducibles must agree. Cancel them and continue.

Different $p_i$ are coprime. The exponent $\alpha_i$ is the multiplicity of the factor $p_i$; when $\alpha_i>1$, it is a **repeated factor**. A nonzero polynomial with no repeated irreducible factor is **square-free**.

### 4.4 Formal derivatives

**Definition.** The formal derivative of $f=\sum_{j=0}^n a_jx^j$ is

$$
f'=\sum_{j=1}^n ja_jx^{j-1}.
$$

This is an algebraic definition. Over $\mathbb R$ or $\mathbb C$, it agrees with the usual derivative. Direct calculation gives

$$
(f+g)'=f'+g',\qquad (cf)'=cf',
$$

$$
(fg)'=f'g+fg',\qquad (f^m)'=mf^{m-1}f'\quad(m\ge1).
$$

Over a number field, a nonconstant polynomial has a nonzero derivative of strictly smaller degree. Consequently, an irreducible nonconstant $p$ satisfies $(p,p')=1$.

### 4.5 Detect repeated factors without factoring

**Theorem 4.3 (Derivative test).** For nonzero $f$ over a number field,

$$
f\text{ is square-free}\quad\Longleftrightarrow\quad(f,f')=1.
$$

If $f=p^mg$ with $m>1$, then

$$
f'=mp^{m-1}p'g+p^mg',
$$

so $p^{m-1}$ divides both $f$ and $f'$. Conversely, if an irreducible factor $p$ occurs only once, write $f=pg$ with $p\nmid g$. Then

$$
f'=p'g+pg'.
$$

Neither $p'$ nor $g$ is divisible by $p$, so $p\nmid f'$. If all factors occur only once, $f,f'$ have no nonconstant common divisor.

**Theorem 4.4 (Removing repetitions).** If $d=(f,f')$, then $f/d$ is square-free and has exactly the same distinct irreducible factors as $f$.

To see the multiplicities precisely, write $f=a_n\prod_i p_i^{\alpha_i}$. The correct derivative expansion is

$$
f'=a_n\sum_{i=1}^s
\alpha_i p_i^{\alpha_i-1}p_i'
\prod_{j\ne i}p_j^{\alpha_j}.
$$

For each $i$, the multiplicity of $p_i$ in $f'$ is exactly $\alpha_i-1$: after dividing by that power and reducing modulo $p_i$, the surviving term is nonzero. Hence

$$
d=\prod_{i=1}^s p_i^{\alpha_i-1},
\qquad \frac{f}{d}=a_n\prod_{i=1}^s p_i.
$$

**The practical payoff.** Euclid's algorithm applied to $f,f'$ detects and removes repetitions without first finding the irreducible factorization. The number-field hypothesis matters: the characteristic-zero reasoning about $p'$ and the integers $\alpha_i$ cannot simply be reused over arbitrary fields of positive characteristic.


## 5. Polynomial Functions, Roots, and Multiplicity

### 5.1 Evaluation connects formal algebra to equations

For $f(x)=\sum_{i=0}^n a_ix^i$ and $c\in F$, define

$$
f(c)=\sum_{i=0}^n a_ic^i.
$$

This is the value of $f$ at $c$. A number $c$ is a **root** or **zero** of $f$ if $f(c)=0$.

**Theorem 5.1 (Remainder and factor theorems).** For every $c\in F$,

$$
f(x)=(x-c)q(x)+f(c)
$$

for some $q\in F[x]$. In particular,

$$
f(c)=0\quad\Longleftrightarrow\quad x-c\mid f(x).
$$

Divide $f$ by $x-c$. The remainder is a constant because its degree is below $1$; evaluation at $c$ identifies that constant as $f(c)$.

<span id="polynomial-root-bound"></span>

### 5.2 A degree bound controls the number of roots

**Theorem 5.2.** A nonzero polynomial of degree $n$ over a field has at most $n$ distinct roots in that field.

If $c_1,\ldots,c_r$ are distinct roots, the factors $x-c_i$ are pairwise coprime. Therefore

$$
\prod_{i=1}^r(x-c_i)\mid f(x),
$$

which implies $r\le n$.

**Corollary (Identity test).** If $\deg f,\deg g\le n$ and

$$
f(c_i)=g(c_i)\quad\text{at }n+1\text{ distinct points},
$$

then $f=g$. Apply the root bound to $f-g$.

Over an infinite field, two polynomials defining the same function are therefore the same formal polynomial. There are enough distinct points to apply the identity test at any finite degree.

### 5.3 Two examples that separate fields, rings, and functions

**Example over a ring with zero divisors.** In $\mathbb Z_6[x]$,

$$
f(x)=x^2-5x
$$

has the four distinct roots $0,2,3,5$ modulo $6$, despite having degree $2$. For instance, $2(2-5)=-6\equiv0$. The coefficient ring is not a field, so the degree and divisibility argument used above breaks down.

**Example over a finite field.** In $\mathbb F_2[x]$, the polynomials $x^3$ and $x$ are distinct, but they define the same function on $\mathbb F_2=\{0,1\}$.

**Keep the distinction:** the root bound and the $n+1$-point identity theorem remain valid over finite fields. What can fail is the identification of all formal polynomials with their functions, because the field may have too few evaluation points.

<span id="root-multiplicity"></span>

### 5.4 Repeated roots and derivatives

**Definition.** A root $c$ of a nonzero polynomial $f$ has **multiplicity $k$** if

$$
(x-c)^k\mid f,
\qquad (x-c)^{k+1}\nmid f.
$$

Equivalently, $f=(x-c)^kg$ with $g(c)\ne0$. A nonzero degree-$n$ polynomial has at most $n$ roots when a root of multiplicity $k$ is counted $k$ times. This follows by combining the corresponding powers of distinct linear factors and comparing degrees.

**Theorem 5.3 (Multiplicity test).** Over a number field, $c$ has multiplicity exactly $k$ if and only if

$$
f(c)=f'(c)=\cdots=f^{(k-1)}(c)=0,
\qquad f^{(k)}(c)\ne0.
$$

**Proof mechanism.** For $f=(x-c)^kg$ with $g(c)\ne0$, every derivative of order below $k$ still contains a factor $x-c$. At order $k$,

$$
f^{(k)}(c)=k!g(c)\ne0.
$$

Conversely, take the actual multiplicity of $c$ and use this calculation to identify it. Characteristic zero ensures that $k!$ is nonzero.


## 6. Complex Roots and the Fundamental Theorem of Algebra

### 6.1 The complex-number facts used in the proof

A complex number can be written as

$$
z=a+bi=re^{i\theta}=r\cos\theta+ir\sin\theta,
$$

with modulus $r=|z|=\sqrt{a^2+b^2}$ and conjugate

$$
\overline z=a-bi=re^{-i\theta}.
$$

The needed rules are

$$
|z+w|\le|z|+|w|,\qquad |zw|=|z||w|,
$$

$$
\overline{z\pm w}=\overline z\pm\overline w,
\quad \overline{zw}=\overline z\,\overline w,
\quad \overline{z/w}=\overline z/\overline w\quad(w\ne0).
$$

Polar form also shows directly that every nonzero complex number has a $k$th root: if $w=re^{i\theta}$, take $r^{1/k}e^{i\theta/k}$. This elementary fact will be used in the proof; it does not require the fundamental theorem of algebra in advance.

### 6.2 Every nonconstant complex polynomial has a root

**Theorem 6.1 (Fundamental theorem of algebra).** Every nonconstant polynomial in $\mathbb C[x]$ has a complex root.

We prove this by minimizing the modulus of the polynomial. There are two separate tasks: show that a minimum exists, then show that it must be zero.

**First, the leading term controls behavior far away.** Let

$$
f(z)=a_nz^n+a_{n-1}z^{n-1}+\cdots+a_0,
\qquad n\ge1,\quad a_n\ne0.
$$

For $z\ne0$,

$$
\begin{aligned}
|f(z)|
&=|z|^n\left|a_n+\frac{a_{n-1}}z+\cdots+\frac{a_0}{z^n}\right|\\
&\ge |z|^n\left(|a_n|-
\frac{|a_{n-1}|}{|z|}-\cdots-\frac{|a_0|}{|z|^n}\right).
\end{aligned}
$$

The bracket tends to $|a_n|>0$, so $|f(z)|\to\infty$ as $|z|\to\infty$.

Writing $z=x+iy$ gives $f(z)=u(x,y)+iv(x,y)$ for real polynomials $u,v$, and hence

$$
|f(z)|=\sqrt{u(x,y)^2+v(x,y)^2}
$$

is continuous. Choose a sufficiently large closed disk outside which $|f(z)|>|f(0)|$. On the disk, continuity and compactness give a minimum. It is also a global minimum; call its location $z_0$.

**Second, a nonzero minimum can be decreased.** Suppose $f(z_0)\ne0$. Expanding in powers of $h$ gives

$$
f(z_0+h)=b_0+b_1h+\cdots+b_nh^n,
\qquad b_0=f(z_0),\quad b_n=a_n\ne0.
$$

Let $k\ge1$ be the first index with $b_k\ne0$, and set $c_j=b_j/f(z_0)$. Then

$$
\frac{f(z_0+h)}{f(z_0)}
=1+c_kh^k+c_{k+1}h^{k+1}+\cdots+c_nh^n.
$$

Choose $d\in\mathbb C$ such that $d^k=-1/c_k$, and put $h=dt$ for a small positive real $t$. This makes the first nonconstant term point directly toward a decrease:

$$
\frac{f(z_0+dt)}{f(z_0)}
=1-t^k+t^{k+1}
\left(c_{k+1}d^{k+1}+c_{k+2}d^{k+2}t+\cdots+c_nd^nt^{n-k-1}\right).
$$

The parenthetical expression is interpreted as zero if $k=n$. Put $M=\sum_{j=k+1}^n|c_jd^j|$. Choose $0<t<1$ and $tM<1/2$. Then

$$
\left|\frac{f(z_0+dt)}{f(z_0)}\right|
\le1-t^k+t^{k+1}M
<1-\frac12t^k<1.
$$

Thus $|f(z_0+dt)|<|f(z_0)|$, contradicting minimality. Therefore $f(z_0)=0$.

**Idea to remember.** The leading term gives control at infinity. Near a hypothetical nonzero minimum, the first nonzero term in the translated expansion supplies a direction in which the modulus decreases.

### 6.3 The factorization consequences

Repeatedly apply the factor theorem after finding one root. A degree-$n$ complex polynomial factors as

$$
f(x)=a_n\prod_{i=1}^n(x-x_i),
$$

where roots are repeated according to multiplicity. Consequently:

- A degree-$n$ polynomial over $\mathbb C$ has exactly $n$ roots counted with multiplicity.
- The nonconstant irreducible polynomials over $\mathbb C$ are exactly the linear polynomials.
- Every nonconstant complex polynomial splits completely into linear factors, with its leading coefficient kept outside the product.

### 6.4 Vieta's formulas: coefficients are symmetric expressions in roots

**Theorem 6.2 (Vieta).** If

$$
f(x)=x^n+a_{n-1}x^{n-1}+\cdots+a_0
=\prod_{i=1}^n(x-x_i),
$$

then, for $1\le k\le n$,

$$
\sum_{1\le i_1<i_2<\cdots<i_k\le n}
x_{i_1}x_{i_2}\cdots x_{i_k}
=(-1)^ka_{n-k}.
$$

In particular,

$$
x_1+\cdots+x_n=-a_{n-1},
\qquad x_1\cdots x_n=(-1)^na_0.
$$

Expand the product and compare coefficients: a term of degree $n-k$ comes from choosing $-x_i$ from exactly $k$ factors. Each unordered set of indices is counted once. For a nonmonic polynomial, divide every coefficient by its leading coefficient before using these formulas.


## 7. Solving Cubic and Quartic Equations

### 7.1 Remove the quadratic term from a cubic

Multiplying an equation by a nonzero constant does not change its roots. Begin with

$$
x^3+ax^2+bx+c=0.
$$

The substitution $x=y-a/3$ gives the **depressed cubic**

$$
y^3+py+q=0,
\qquad p=b-\frac{a^2}{3},
\qquad q=\frac{2a^3}{27}-\frac{ab}{3}+c.
$$

Two special cases are immediate. If $q=0$, the roots are

$$
0,\quad \sqrt{-p},\quad-\sqrt{-p}.
$$

If $p=0$, choose any cube root $\rho$ of $-q$. The roots are

$$
\rho,\quad\omega\rho,\quad\omega^2\rho,
\qquad \omega=-\frac12+\frac{\sqrt3}{2}i,
$$

where $\omega^3=1$ and $1+\omega+\omega^2=0$. If $p=q=0$, all three roots are zero, counted with multiplicity.

### 7.2 Cardan's formula: turn a cubic into a quadratic in two cubes

For $pq\ne0$, set $y=u+v$. Then

$$
y^3=u^3+v^3+3uvy.
$$

It is enough to arrange

$$
uv=-\frac p3,\qquad u^3+v^3=-q.
$$

The numbers $U=u^3$ and $V=v^3$ therefore satisfy

$$
U+V=-q,\qquad UV=-\frac{p^3}{27}.
$$

By Vieta, they are the roots of

$$
T^2+qT-\frac{p^3}{27}=0.
$$

Define

$$
D_C=\frac{q^2}{4}+\frac{p^3}{27}.
$$

Then

$$
u^3=-\frac q2+\sqrt{D_C},
\qquad v^3=-\frac q2-\sqrt{D_C}.
$$

Choose the cube roots so that $uv=-p/3$. The three roots are

$$
\begin{aligned}
y_1&=u+v,\\
y_2&=\omega u+\omega^2v,\\
y_3&=\omega^2u+\omega v.
\end{aligned}
$$

Equivalently, the first line is the familiar radical expression

$$
y_1=
\sqrt[3]{-\frac q2+\sqrt{D_C}}
+\sqrt[3]{-\frac q2-\sqrt{D_C}},
$$

with the same compatibility condition on the two cube roots. Finally, $x_i=y_i-a/3$.

**Do not choose the cube roots independently.** Cubing $uv=-p/3$ loses a cube-root-of-unity factor. A reliable procedure is to choose a cube root $u$ of the first nonzero radicand and then set $v=-p/(3u)$. Its cube is automatically the other radicand. The three paired choices above give the three roots, including multiplicities.

Keep $D_C$ distinct from the polynomial discriminant introduced later:

$$
\Delta(y^3+py+q)=-4p^3-27q^2=-108D_C.
$$

### 7.3 Ferrari's method: make both sides squares

After dividing by the leading coefficient and shifting the variable to remove the cubic term, a quartic becomes

$$
x^4+ax^2+bx+c=0.
$$

For a monic quartic with cubic coefficient $A$, the shift is $X=x-A/4$. Introduce a parameter $u$ and rearrange:

$$
\left(x^2+\frac u2\right)^2
=(u-a)x^2-bx+\frac{u^2}{4}-c.
$$

The left side is already a square. Make the right side a square by requiring

$$
b^2-4(u-a)\left(\frac{u^2}{4}-c\right)=0.
$$

This is the **resolvent cubic**. Equivalently,

$$
u^3-au^2-4cu+4ac-b^2=0.
$$

Solve this cubic by Cardan's method. If $u\ne a$, choose $s$ with $s^2=u-a$ and put $t=-b/(2s)$. The resolvent ensures that $t^2=u^2/4-c$, so

$$
\left(x^2+\frac u2\right)^2=(sx+t)^2.
$$

The quartic reduces to two quadratics:

$$
x^2+\frac u2-sx-t=0,
\qquad x^2+\frac u2+sx+t=0.
$$

**Degenerate case.** If a chosen resolvent root is $u=a$, then the resolvent forces $b=0$. The quartic is biquadratic: solve

$$
X^2+aX+c=0,\qquad X=x^2,
$$

and take square roots. Equivalently, the right side of the square identity is a constant square over $\mathbb C$. This avoids division by $s=0$.

Different resolvent roots lead to the same quartic roots, grouped into quadratic factors in different ways. The useful object is the method of completing squares; writing out every nested radical obscures that structure.

### 7.4 What changes in degree five

There is no general formula by radicals for polynomial equations of degree **five or higher**. This does not say that every individual equation of such a degree is unsolvable by radicals; many special equations are solvable. Galois theory gives the criterion for an individual polynomial.

## 8. Real Polynomials: Factorization, Bounds, and Root Counts

### 8.1 Nonreal roots come in conjugate pairs

**Theorem 8.1.** If $f\in\mathbb R[x]$ and $f(z)=0$, then $f(\overline z)=0$ as well.

The coefficients are real, so

$$
f(\overline z)=\overline{f(z)}.
$$

Conjugate roots have the same multiplicity, by conjugating a factorization or using the derivative multiplicity test. If $z=a+bi$ with $b\ne0$, their paired factor is

$$
(x-z)(x-\overline z)
=x^2-2ax+a^2+b^2,
$$

whose discriminant is $-4b^2<0$.

**Corollary.** The nonconstant irreducible polynomials over $\mathbb R$ are the linear polynomials and the quadratics

$$
ax^2+bx+c,\qquad a\ne0,\quad b^2-4ac<0.
$$

Every nonzero real polynomial is therefore a nonzero constant times a product of real linear factors and irreducible real quadratic factors. This follows by pairing the nonreal roots in its complex factorization.

### 8.2 A coefficient bound for positive roots

**Theorem 8.2.** Let

$$
f(x)=a_nx^n+\cdots+a_0,\qquad a_n>0.
$$

Suppose, reading downward from the leading term, the first negative coefficient is $a_{n-k}$:

$$
a_{n-1},\ldots,a_{n-k+1}\ge0,
\qquad a_{n-k}<0.
$$

Let $b$ be the largest absolute value among all negative coefficients. Then every positive root $c$ satisfies

$$
c\le1+\left(\frac b{a_n}\right)^{1/k}.
$$

If all coefficients are nonnegative, there is no positive root: every term is nonnegative for $x>0$, and the leading term is positive. If $a_n<0$, first replace $f$ by $-f$. Dividing by the leading coefficient can also make the polynomial monic.

**Proof: show that the polynomial is positive beyond the bound.** Take

$$
d>1+\left(\frac b{a_n}\right)^{1/k}.
$$

Then $d>1$ and $a_n(d-1)^k>b$. Dropping nonnegative terms and bounding the remaining coefficients from below by $-b$ gives

$$
\begin{aligned}
f(d)
&\ge a_nd^n-b(d^{n-k}+\cdots+d+1)\\
&=a_nd^n-b\frac{d^{n-k+1}-1}{d-1}\\
&=\frac{a_nd^n(d-1)-bd^{n-k+1}+b}{d-1}\\
&\ge\frac{d^{n-k+1}}{d-1}
\left(a_n(d-1)^k-b\right)>0.
\end{aligned}
$$

The last estimate uses $d^{k-1}\ge(d-1)^{k-1}$. Thus $d$ cannot be a root.

Apply the same procedure to $f(-x)$, changing its overall sign if necessary, to bound the absolute values of negative roots. Together these calculations put all real roots in a finite interval.

### 8.3 Build a Sturm sequence using negative remainders

A root bound tells us where to look. To isolate individual roots, we need to know how many lie in each interval. Once a single real root is isolated, numerical methods such as bisection or Newton iteration can approximate it; Sturm's theorem supplies the count, rather than an explicit root formula.

Assume first that $f\in\mathbb R[x]$ is nonconstant and square-free. Set

$$
g_0=f,\qquad g_1=f'.
$$

Continue Euclid's algorithm with **negative remainders**:

$$
g_{j-1}=q_jg_j-g_{j+1},
\qquad \deg g_{j+1}<\deg g_j.
$$

Since $(f,f')=1$, the final nonzero term $g_s$ is a constant. The sequence

$$
g_0,g_1,\ldots,g_s
$$

is the **Sturm sequence** of $f$. If $f$ is linear, $g_1$ is already the final constant.

**Definition (Sign variation).** At a real number $c$, evaluate the sequence, remove every zero entry, and count the changes of sign between successive remaining entries. Denote the count by $V(c)$.

The minus sign in the recurrence is essential. Replacing it with ordinary positive remainders would not give the sign behavior needed for Sturm's theorem.

### 8.4 A worked Sturm-sequence example

Take

$$
f(x)=x^5-3x+1.
$$

Its Sturm sequence is

$$
g_0=x^5-3x+1,\qquad
g_1=5x^4-3,\qquad
g_2=\frac{12}{5}x-1,
$$

$$
g_3=3-5\left(\frac5{12}\right)^4
=\frac{59083}{20736}>0.
$$

The first remainder follows from

$$
g_0=\frac x5g_1-g_2.
$$

For the second division, the remainder of $g_1$ modulo $g_2$ is $g_1(5/12)$; its negative is $g_3$.

| Evaluation point | Values in sequence order | Signs | Variation |
|---|---|---|---|
| $0$ | $1,-3,-1,59083/20736$ | $+,-,-,+$ | $V(0)=2$ |
| $1$ | $-1,2,7/5,59083/20736$ | $-,+,+,+$ | $V(1)=1$ |

Neither endpoint is a root. Sturm's theorem below therefore gives exactly one root in $(0,1)$.

### 8.5 Why sign variations count roots

Three facts control what happens when the evaluation point moves:

1. Consecutive $g_j,g_{j+1}$ are coprime, so they have no common root. This follows by preserving the gcd through the recurrence.
2. If $g_j(c)=0$ for $1\le j<s$, then

$$
g_{j-1}(c)=-g_{j+1}(c)\ne0.
$$

3. If $f(c)=0$, then $f'(c)\ne0$. Just to the left of $c$, $f$ and $f'$ have opposite signs; just to the right, they have the same sign.

For the third fact, continuity keeps the sign of $f'$ fixed near $c$. If $f'>0$, $f$ increases through zero; if $f'<0$, it decreases through zero. Both cases give the claimed relation.

**Theorem 8.3 (Sturm).** Let $f\in\mathbb R[x]$ be nonconstant and square-free. If $a<b$ and $f(a)f(b)\ne0$, then the number of roots of $f$ in $(a,b)$ is

$$
V(a)-V(b).
$$

**Proof mechanism worth knowing.** Away from the zeros of the sequence polynomials, all signs are locally constant. We only need to understand what happens at a zero.

At a zero of an interior term $g_j$, its neighbors have opposite nonzero signs. The three-term block therefore contributes exactly one sign change, whatever sign the middle entry has:

| First neighbor | Middle entry | Last neighbor | Contribution |
|---|---|---|---|
| $+$ | $+$, $-$, or $0$ | $-$ | $1$ |
| $-$ | $+$, $-$, or $0$ | $+$ | $1$ |

Zeros are omitted when counting. The middle entry may change sign or may keep its sign; neither possibility changes the contribution. If several nonadjacent interior terms vanish at the same point, their affected adjacent pairs are distinct, so the same argument applies to all of them. Thus passing an interior zero causes no net change in $V$.

At a root of $g_0=f$, the first two entries instead behave as follows:

| Position near $c$ | Sign relation between $f$ and $f'$ | Contribution of the first pair |
|---|---|---|
| $x<c$ | Opposite signs | $1$ |
| $x=c$ | $f(c)=0$ is omitted | $0$ |
| $x>c$ | Same sign | $0$ |

So $V$ drops by exactly one when a root of $f$ is crossed from left to right. Summing the drops between $a$ and $b$ proves the theorem.

### 8.6 How to use the theorem when roots repeat

For an arbitrary nonconstant real polynomial, first replace it by

$$
\widetilde f=\frac{f}{(f,f')}.
$$

This has the same distinct roots and no repeated factors. Sturm's theorem applied to $\widetilde f$ counts **distinct** real roots of $f$; it does not restore their multiplicities.

Choose nonroot endpoints strictly outside the bounds from Section 8.2 to count all real roots. Then subdivide intervals to locate individual roots. The method uses only polynomial division and sign evaluation, so it is suitable for exact computation and programming.

**Check before applying the formula:** remove repeated factors, use negative remainders, omit zeros in the evaluated sequence, and ensure that the interval endpoints are not roots of the polynomial being counted.


## 9. Rational and Integer Coefficients

### 9.1 Clear denominators before looking for rational roots

For a polynomial with rational coefficients, multiply by a common denominator and then divide by the gcd of the integer coefficients. These nonzero constant scalings do not change its roots.

**Theorem 9.1 (Rational root test).** If

$$
f(x)=a_nx^n+\cdots+a_0\in\mathbb Z[x],\qquad a_n\ne0,
$$

and $q/p$ is a rational root written in lowest terms, with $p>0$, then

$$
p\mid a_n,\qquad q\mid a_0.
$$

For a nonzero root, substitute $q/p$ and multiply by $p^n$:

$$
a_nq^n+a_{n-1}q^{n-1}p+\cdots+a_1qp^{n-1}+a_0p^n=0.
$$

All terms except the first are divisible by $p$, so $p\mid a_nq^n$. Since $(p,q)=1$, $p\mid a_n$. Similarly, all terms except the last are divisible by $q$, so $q\mid a_0$. A zero root is handled directly by $a_0=0$; factor out powers of $x$ before listing nonzero candidates.

In particular, every rational root of a monic integer polynomial is an integer dividing its constant term.

### 9.2 Two worked examples

**Example 1.** For

$$
f(x)=2x^3+x^2-3x+1,
$$

the only candidates are $\pm1,\pm1/2$. Their values are

$$
f(1)=1,\quad f(-1)=3,\quad
f(1/2)=0,\quad f(-1/2)=\frac52.
$$

Thus $1/2$ is the only rational root. The completed factorization is

$$
f(x)=(2x-1)(x^2+x-1),
$$

and the other roots are $(-1\pm\sqrt5)/2$.

**Example 2.** Find all rational roots of

$$
f(x)=x^5-x^4-\frac52x^3+2x^2-\frac12x-3
$$

Clearing denominators gives

$$
f_1(x)=2x^5-2x^4-5x^3+4x^2-x-6.
$$

The possible rational roots are

$$
\pm6,\ \pm3,\ \pm2,\ \pm1,\ \pm\frac32,\ \pm\frac12.
$$

Testing this finite list gives exactly $-1$ and $2$. For a check,

$$
f_1(x)=(x+1)(x-2)(2x^3-x+3).
$$

The cubic factor has no rational roots: any such root would belong to the same candidate list, and none is a further zero. Thus the complete list of rational roots of the original polynomial is $-1,2$.

**What the test does and does not do.** It produces candidates, not guaranteed roots. It also requires finding divisors of the leading and constant coefficients, so integer factorization and candidate testing can be the main computational work. Absence of rational roots proves irreducibility for degrees two and three, but not for higher degrees.

### 9.3 Primitive polynomials and Gauss's lemma

**Definition.** A nonzero polynomial in $\mathbb Z[x]$ is **primitive** if the positive gcd of its coefficients is $1$.

Primitive does not mean irreducible: it is a condition on the common integer factors of the coefficients. Primitivity alone does not uniquely specify a polynomial associated with an algebraic root; irreducibility and a sign normalization are also needed.

**Theorem 9.2 (Gauss's lemma).** The product of two primitive integer polynomials is primitive.

**Proof: find a coefficient with only one surviving contribution modulo a prime.** Write

$$
f=\sum_i a_ix^i,\qquad g=\sum_j b_jx^j,
\qquad fg=\sum_k c_kx^k.
$$

If $fg$ were not primitive, a prime $p$ would divide every $c_k$. Since $f,g$ are primitive, choose the smallest indices $i,j$ such that

$$
p\nmid a_i,\qquad p\nmid b_j.
$$

In the coefficient

$$
c_{i+j}=\sum_{r+s=i+j}a_rb_s,
$$

every term except $a_ib_j$ is divisible by $p$: if $r<i$, then $p\mid a_r$; if $r>i$, then $s<j$ and $p\mid b_s$. Hence

$$
c_{i+j}\equiv a_ib_j\not\equiv0\pmod p,
$$

a contradiction.

### 9.4 Rational factorization can be made integral

**Theorem 9.3.** If an integer polynomial factors over $\mathbb Q$ into two positive-degree polynomials of lower degree, then it also factors into two integer polynomials of those degrees.

Suppose $f=gh$ with $g,h\in\mathbb Q[x]$. Clear denominators and remove the gcds of coefficients to write

$$
g=ag_1,\qquad h=bh_1,
$$

where $a,b\in\mathbb Q\setminus\{0\}$ and $g_1,h_1\in\mathbb Z[x]$ are primitive. Gauss's lemma says that $g_1h_1$ is primitive. Since

$$
f=ab\,g_1h_1
$$

has integer coefficients, $ab$ must be an integer. Indeed, a nontrivial denominator of $ab$ in lowest terms would have to divide every coefficient of $g_1h_1$. Absorb the integer $ab$ into one factor.

The converse is immediate. Therefore reducibility into positive-degree factors over $\mathbb Q$ is equivalent to such factorization over $\mathbb Z$ for an integer polynomial. For a primitive polynomial, this agrees with the usual ring-theoretic irreducibility distinction; for a nonprimitive polynomial, constant nonunit factors in $\mathbb Z$ must be treated separately.

### 9.5 Eisenstein's criterion

**Theorem 9.4 (Eisenstein).** Let $f=a_nx^n+\cdots+a_0\in\mathbb Z[x]$, with $n\ge1$. If some prime $p$ satisfies

$$
p\mid a_0,a_1,\ldots,a_{n-1},
\qquad p\nmid a_n,
\qquad p^2\nmid a_0,
$$

then $f$ is irreducible over $\mathbb Q$.

**Proof idea.** If $f$ were reducible, Theorem 9.3 would give

$$
f=(b_rx^r+\cdots+b_0)(c_sx^s+\cdots+c_0),
\qquad r,s>0,\quad r+s=n.
$$

Since $a_0=b_0c_0$ is divisible by $p$ but not $p^2$, exactly one of $b_0,c_0$ is divisible by $p$. Assume $p\mid b_0$ and $p\nmid c_0$. Also $p\nmid b_r$, because $p\nmid a_n=b_rc_s$.

Let $k$ be the smallest index with $p\nmid b_k$. Then $1\le k\le r<n$, and

$$
a_k=b_kc_0+b_{k-1}c_1+\cdots+b_0c_k
\equiv b_kc_0\not\equiv0\pmod p,
$$

where missing coefficients are interpreted as zero. This contradicts $p\mid a_k$.

**Example 1.** For every integer $n\ge1$,

$$
x^n-2
$$

is irreducible over $\mathbb Q$, by Eisenstein with $p=2$.

**Example 2.** For a prime $p$,

$$
f(x)=x^{p-1}+x^{p-2}+\cdots+x+1
$$

is irreducible over $\mathbb Q$. Eisenstein does not apply directly, but use $x=y+1$:

$$
\begin{aligned}
g(y)=f(y+1)
&=\frac{(y+1)^p-1}{y}\\
&=y^{p-1}+\binom p1y^{p-2}+\cdots+\binom p{p-2}y+\binom p{p-1}.
\end{aligned}
$$

Every coefficient except the leading one is divisible by $p$, and the constant coefficient is $p$, not divisible by $p^2$. Thus $g$ is irreducible. The substitution is invertible: a factorization of $f(x)$ would give one of $g(y)$ by $x=y+1$, and conversely by $y=x-1$. Degrees are preserved, so $f$ is irreducible as well.

**Technique worth keeping: shift before applying a criterion.** A change of variable can reveal divisibility in coefficients that was hidden in the original expression. Eisenstein is a sufficient test; failure to find a suitable prime does not imply reducibility.


## 10. Multivariable and Symmetric Polynomials

### 10.1 Monomials and total degree

Let $x_1,\ldots,x_n$ be independent indeterminates. A **monomial term** is

$$
ax_1^{k_1}x_2^{k_2}\cdots x_n^{k_n},
\qquad a\in F,\quad k_i\in\mathbb Z_{\ge0}.
$$

For $a\ne0$, its total degree is $k_1+\cdots+k_n$. Two terms are **like terms** when their exponent tuples agree, regardless of their coefficients. Like terms combine by adding coefficients. Equal total degree alone does not make terms alike: for example, $x_1^2$ and $x_1x_2$ are different monomials.

An $n$-variable polynomial is a finite sum

$$
f(x_1,\ldots,x_n)
=\sum_{j_1,\ldots,j_n}a_{j_1\cdots j_n}
x_1^{j_1}\cdots x_n^{j_n},
$$

with like terms collected. Its total degree is the largest total degree of a nonzero term. The ring of these polynomials is $F[x_1,\ldots,x_n]$.

Two polynomials are equal precisely when the coefficients of every monomial agree. Addition combines like terms, and multiplication uses

$$
(ax_1^{k_1}\cdots x_n^{k_n})
(bx_1^{\ell_1}\cdots x_n^{\ell_n})
=abx_1^{k_1+\ell_1}\cdots x_n^{k_n+\ell_n},
$$

followed by distribution and collection.

### 10.2 Lexicographic order gives a leading term

Total degree alone cannot order all monomials. Fix the variable order $x_1>x_2>\cdots>x_n$. In **descending lexicographic order**, compare exponent tuples from left to right; at the first position where they differ, the larger exponent comes first.

For example, $x_1x_2^2$ comes before $x_1x_2x_3^5\cdots x_n^7$, even though the latter may have much larger total degree. The first differing exponent is that of $x_2$.

**Example.** Reorder

$$
x_1^2x_2+x_1^2x_3+x_1^3x_2x_3+3x_1x_2x_3-4x_2^2x_3^8.
$$

The result is

$$
x_1^3x_2x_3+x_1^2x_2+x_1^2x_3+3x_1x_2x_3-4x_2^2x_3^8.
$$

Once the variable order is fixed, this representation is unique. The first term is the **leading term**.

For nonzero polynomials,

$$
\operatorname{LT}(fg)=\operatorname{LT}(f)\operatorname{LT}(g).
$$

Lexicographic order is compatible with multiplying monomials, so no other product of terms can cancel this largest term. Hence the product of two nonzero multivariable polynomials over a field is nonzero, and multiplication has cancellation.

### 10.3 Polynomial functions in several variables

**Theorem 10.1.** Over an infinite field, a nonzero polynomial $f\in F[x_1,\ldots,x_n]$ has some point $(c_1,\ldots,c_n)\in F^n$ at which it is nonzero.

**Proof by induction on the number of variables.** For $n=1$, use the finite bound on roots. For larger $n$, regard $f$ as a polynomial in $x_n$:

$$
f=a_k(x_1,\ldots,x_{n-1})x_n^k+\cdots+a_0(x_1,\ldots,x_{n-1}),
\qquad a_k\ne0.
$$

By induction, choose $c_1,\ldots,c_{n-1}$ with $a_k(c_1,\ldots,c_{n-1})\ne0$. The resulting polynomial in $x_n$ is nonzero, so some $c_n\in F$ is not a root.

**Corollary.** Over an infinite field,

$$
f=g\quad\Longleftrightarrow\quad
f(c_1,\ldots,c_n)=g(c_1,\ldots,c_n)
\text{ for every }(c_1,\ldots,c_n)\in F^n.
$$

Apply the theorem to $f-g$.

**A distinction to keep straight.** In one variable, agreement at infinitely many points forces equality. In several variables, it does not. The distinct polynomials $x^2y$ and $xy$ agree whenever $y=0$, and also when $x=0$ or $x=1$, giving infinitely many points.

Over $\mathbb R$ or $\mathbb C$, agreement on a nonempty open region does force equality. An open region contains a product of small intervals or disks; fixing all but one variable and repeatedly applying the one-variable identity theorem proves the claim. The size and arrangement of the agreement set matter, not just its infinitude.

### 10.4 Symmetry means invariance under permuting variables

**Definition.** A polynomial $f(x_1,\ldots,x_n)$ is **symmetric** if exchanging any two variables leaves it unchanged. Equivalently, for every permutation $\pi$,

$$
f(x_1,\ldots,x_n)=f(x_{\pi(1)},\ldots,x_{\pi(n)}).
$$

The equivalence holds because permutations are compositions of exchanges. Examples include the sums of products appearing in Vieta's formulas and the power sums

$$
p_k=x_1^k+\cdots+x_n^k.
$$

Sums and products of symmetric polynomials are symmetric. More generally, any polynomial expression in symmetric polynomials is symmetric.

**Definition (Elementary symmetric polynomials).** For $1\le k\le n$, let

$$
\sigma_k=\sum_{1\le i_1<\cdots<i_k\le n}x_{i_1}\cdots x_{i_k}.
$$

In particular,

$$
\sigma_1=x_1+\cdots+x_n,
\qquad \sigma_2=\sum_{i<j}x_ix_j,
\qquad \sigma_n=x_1x_2\cdots x_n.
$$

Their total degrees are $1,2,\ldots,n$, respectively, and their leading monomials in lexicographic order are $x_1$, $x_1x_2$, ..., $x_1\cdots x_n$.

### 10.5 Every symmetric polynomial is built from the elementary ones

**Theorem 10.2 (Fundamental theorem of symmetric polynomials).** For every symmetric polynomial $f\in F[x_1,\ldots,x_n]$, there is a unique polynomial $G\in F[y_1,\ldots,y_n]$ such that

$$
f(x_1,\ldots,x_n)=G(\sigma_1,\ldots,\sigma_n).
$$

This is the link to Vieta: a symmetric polynomial expression in the roots of a monic polynomial can be written as a polynomial expression in its coefficients, without solving for the individual roots.

**Existence: cancel the leading term while preserving symmetry.** Suppose the leading term of a nonzero symmetric $f$ is

$$
ax_1^{k_1}x_2^{k_2}\cdots x_n^{k_n}.
$$

Then necessarily

$$
k_1\ge k_2\ge\cdots\ge k_n.
$$

Otherwise an adjacent pair with $k_s<k_{s+1}$ could be exchanged. Symmetry would produce a term earlier in lexicographic order, contradicting the choice of leading term.

Now form

$$
H=a\sigma_1^{k_1-k_2}
\sigma_2^{k_2-k_3}\cdots
\sigma_{n-1}^{k_{n-1}-k_n}\sigma_n^{k_n}.
$$

Its leading term is

$$
ax_1^{k_1-k_2}(x_1x_2)^{k_2-k_3}\cdots
(x_1\cdots x_{n-1})^{k_{n-1}-k_n}(x_1\cdots x_n)^{k_n}
=ax_1^{k_1}\cdots x_n^{k_n}.
$$

Thus $f-H$ is symmetric and has a strictly smaller leading monomial. Repeat.

**Why the process terminates.** The total degree of $H$ is

$$
(k_1-k_2)+2(k_2-k_3)+\cdots+(n-1)(k_{n-1}-k_n)+nk_n
=k_1+\cdots+k_n.
$$

So no subtraction creates terms of total degree above the original $\deg f$. There are only finitely many monomials with that bounded total degree, and the leading monomial decreases at each step. Eventually the remainder is zero.

**Uniqueness: distinct monomials in the $\sigma_i$ have distinct leading monomials.** Under substitution,

$$
y_1^{\ell_1}\cdots y_n^{\ell_n}
\longmapsto\sigma_1^{\ell_1}\cdots\sigma_n^{\ell_n},
$$

whose leading monomial is

$$
x_1^{\ell_1+\cdots+\ell_n}
x_2^{\ell_2+\cdots+\ell_n}\cdots x_n^{\ell_n}.
$$

The exponent tuple on the right determines $(\ell_1,\ldots,\ell_n)$ by successive differences. Therefore distinct monomials in the $y_i$ give distinct leading monomials. If a nonzero polynomial $\Phi(y_1,\ldots,y_n)$ vanished after substitution, the largest of these leading monomials could not cancel, a contradiction. Apply this to $\Phi=G_1-G_2$ to obtain uniqueness.

### 10.6 The worked symmetric-polynomial example

Write

$$
f=x_1^2x_2+x_1^2x_3+x_1x_2^2+x_1x_3^2+x_2^2x_3+x_2x_3^2
$$

in terms of $\sigma_1,\sigma_2,\sigma_3$. Its leading exponent tuple is $(2,1,0)$, so the first subtraction uses $\sigma_1\sigma_2$:

$$
\begin{aligned}
\sigma_1\sigma_2
&=(x_1+x_2+x_3)(x_1x_2+x_1x_3+x_2x_3)\\
&=f+3x_1x_2x_3.
\end{aligned}
$$

The remainder is $-3\sigma_3$, giving

$$
f=\sigma_1\sigma_2-3\sigma_3.
$$

**The useful idea is constructive.** The theorem does not merely assert that an expression exists; canceling leading terms gives an algorithm for finding it.


## 11. Common Roots as a Determinant Condition

### 11.1 A bounded-degree relation detects a common factor

Let $f,g\in F[x]$ be nonzero polynomials of positive degrees $n,m$.

**Lemma 11.1.** The gcd $(f,g)$ is nonconstant if and only if there are nonzero polynomials $u,v$ such that

$$
fu=gv,\qquad \deg u<m,\quad\deg v<n.
$$

If $d=(f,g)$ has positive degree, take $u=g/d$ and $v=f/d$. Conversely, if $(f,g)=1$ and $fu=gv$, then $f\mid gv$ implies $f\mid v$. This contradicts $v\ne0$ and $\deg v<\deg f$.

**Why the degree restrictions matter.** The identity $fg=gf$ is always available. Requiring the multiplier degrees to be smaller than the opposite polynomial degrees makes the existence of such a relation meaningful.

### 11.2 Undetermined coefficients turn the relation into linear algebra

Write

$$
\begin{aligned}
f(x)&=a_nx^n+\cdots+a_0,\\
g(x)&=b_mx^m+\cdots+b_0,\\
u(x)&=t_{m-1}x^{m-1}+\cdots+t_0,\\
v(x)&=t_{m+n-1}x^{n-1}+\cdots+t_m.
\end{aligned}
$$

Equating coefficients in $fu-gv=0$ yields $m+n$ homogeneous linear equations in $m+n$ unknowns. The highest- and lowest-degree equations are

$$
a_nt_{m-1}-b_mt_{m+n-1}=0,
\qquad a_0t_0-b_0t_m=0.
$$

In general, the coefficient of $x^k$ gives

$$
\sum_{i=0}^n a_i u_{k-i}
-\sum_{j=0}^m b_j v_{k-j}=0,
\qquad 0\le k\le n+m-1,
$$

where $u_r=t_r$ for $0\le r<m$, $v_r=t_{m+r}$ for $0\le r<n$, and coefficients outside these ranges are zero.

A nonzero solution vector gives nonzero $u,v$: if one were zero, $fu=gv$ and cancellation would force the other to be zero. Thus Lemma 11.1 applies exactly when this square system is singular.

<span id="resultant"></span>

### 11.3 The Sylvester matrix and the resultant

**Definition.** Use columns corresponding to $x^{n+m-1},x^{n+m-2},\ldots,1$. The **Sylvester matrix** $S(f,g)$ has, in order, the coefficient rows of

$$
x^{m-1}f,x^{m-2}f,\ldots,f,
\qquad x^{n-1}g,x^{n-2}g,\ldots,g.
$$

There are $m$ shifted copies of the coefficients of $f$, followed by $n$ shifted copies of those of $g$, in an $(m+n)\times(m+n)$ matrix:

$$
S(f,g)=
\begin{pmatrix}
a_n&a_{n-1}&\cdots&a_0&0&\cdots&0\\
0&a_n&a_{n-1}&\cdots&a_0&\cdots&0\\
\vdots&&\ddots&&&\ddots&\vdots\\
0&\cdots&0&a_n&a_{n-1}&\cdots&a_0\\
b_m&b_{m-1}&\cdots&b_0&0&\cdots&0\\
0&b_m&b_{m-1}&\cdots&b_0&\cdots&0\\
\vdots&&\ddots&&&\ddots&\vdots\\
0&\cdots&0&b_m&b_{m-1}&\cdots&b_0
\end{pmatrix}.
$$

The displayed array indicates the shifting pattern; the coefficient-row definition specifies its dimensions exactly for every $m,n$.

The **resultant** is defined as the [determinant](Determinants.md#determinant "concept:determinant") of the Sylvester matrix:

$$
R(f,g)=\det S(f,g).
$$

In the system for $fu-gv=0$, the $g$ coefficients have minus signs. After arranging the unknowns in descending powers and transposing, the system matrix is the displayed matrix with its last $n$ rows negated. Negating rows and transposing do not change whether its determinant is zero.

**Theorem 11.2.** For nonzero positive-degree polynomials,

$$
(f,g)=1\quad\Longleftrightarrow\quad R(f,g)\ne0.
$$

For number-field coefficients, equivalently,

$$
f,g\text{ have a common complex root}
\quad\Longleftrightarrow\quad R(f,g)=0.
$$

Indeed, their gcd remains unchanged when the coefficient field is enlarged to $\mathbb C$, and a nonconstant complex gcd has a root. Thus the resultant detects common roots by a polynomial expression in the coefficients, without explicitly finding those roots.

### 11.4 Express the resultant through the roots

**Theorem 11.3.** Suppose

$$
f(x)=a_n\prod_{i=1}^n(x-x_i),
\qquad g(x)=b_m\prod_{j=1}^m(x-y_j),
$$

with roots repeated according to multiplicity. Then

$$
R(f,g)=a_n^m b_m^n
\prod_{i=1}^n\prod_{j=1}^m(x_i-y_j).
$$

**Proof structure.** First write $f=a_nf_1$ and $g=b_mg_1$ with $f_1,g_1$ monic. Factoring constants from the $m$ rows of $f$ and $n$ rows of $g$ gives

$$
R(f,g)=a_n^m b_m^nR(f_1,g_1).
$$

It remains to prove the formula in the monic case. By Vieta, the coefficients of $f$ are elementary symmetric polynomials in the $x_i$, and similarly for $g$ and the $y_j$. Therefore the determinant is a polynomial in the roots, symmetric within each group.

If $x_i=y_j$, the two polynomials have a common root, so the resultant vanishes. Treating the roots as independent variables and applying the factor theorem to $x_i$ shows that $x_i-y_j$ divides this root polynomial. The distinct linear factors are prime: quotienting the polynomial ring by $x_i-y_j$ simply substitutes $x_i=y_j$ and leaves a polynomial ring with no zero divisors. Hence their product divides the resultant:

$$
R(f,g)=H(x_1,\ldots,x_n;y_1,\ldots,y_m)
\prod_{i,j}(x_i-y_j).
$$

Each coefficient of a monic $f$ has degree at most one in any fixed root $x_i$. A determinant term contains $m$ entries from the $f$ rows, so the resultant has degree at most $m$ in each $x_i$. Similarly, its degree in each $y_j$ is at most $n$. The displayed product already has exactly these degrees, so $H$ is constant.

To identify the constant, set $g(x)=x^m$, so all $y_j=0$. Expanding the Sylvester determinant along the rows from $g$ gives

$$
R(f,x^m)=(-1)^{nm}a_0^m
=\left(\prod_{i=1}^n x_i\right)^m.
$$

This matches $\prod_{i,j}(x_i-y_j)$, so $H=1$. Restoring the leading coefficients proves the formula.

### 11.5 A useful evaluation form

Since $g(x_i)=b_m\prod_j(x_i-y_j)$, the root formula becomes

$$
R(f,g)=a_n^m\prod_{i=1}^n g(x_i).
$$

This form is especially useful with $g=f'$. It also shows, by reversing all the differences, that

$$
R(g,f)=(-1)^{nm}R(f,g).
$$

The determinant convention matters for the sign. The order of the rows in Section 11.3 is the convention used throughout these notes.


## 12. Discriminants and Elimination

### 12.1 The discriminant detects a collision of roots

For a real quadratic $ax^2+bx+c$, the familiar quantity $b^2-4ac$ distinguishes two distinct real roots, a repeated real root, and a nonreal conjugate pair according to whether it is positive, zero, or negative. For complex coefficients, only its vanishing is relevant to repeated roots; there is no ordering of complex numbers to supply the same sign classification.

For higher degrees, repeated roots are detected by a common factor of $f$ and $f'$, and hence by their resultant.

**Definition (Discriminant).** For

$$
f(x)=a_nx^n+\cdots+a_0,\qquad n\ge2,\quad a_n\ne0,
$$

over a number field, define

$$
\Delta(f)=(-1)^{n(n-1)/2}\frac{R(f,f')}{a_n}.
$$

**Theorem 12.1.** The polynomial $f$ has a repeated complex root if and only if

$$
\Delta(f)=0.
$$

This combines the derivative test with the resultant criterion. The sign and leading-coefficient factor normalize the expression so that it agrees with the usual quadratic discriminant and the root product below.

**A distinction to keep straight:** $f,f'$ must have a nonconstant common factor. That common factor need not itself be repeated. For example, $f=(x-c)^2$ and $f'=2(x-c)$ have the simple common factor $x-c$.

### 12.2 Recover the quadratic and cubic formulas

**Quadratic.** For $f=ax^2+bx+c$,

$$
R(f,f')=
\begin{vmatrix}
a&b&c\\
2a&b&0\\
0&2a&b
\end{vmatrix}
=-ab^2+4a^2c.
$$

Since $(-1)^{2(1)/2}=-1$,

$$
\Delta(f)=-\frac1aR(f,f')=b^2-4ac.
$$

**Depressed cubic.** For $f=x^3+px+q$,

$$
R(f,f')=
\begin{vmatrix}
1&0&p&q&0\\
0&1&0&p&q\\
3&0&p&0&0\\
0&3&0&p&0\\
0&0&3&0&p
\end{vmatrix}
=4p^3+27q^2.
$$

Thus

$$
\Delta(x^3+px+q)=-4p^3-27q^2.
$$

In the notation of Cardan's formula,

$$
\Delta(f)=-108D_C,
\qquad D_C=\frac{q^2}{4}+\frac{p^3}{27}.
$$

The two quantities vanish together, but they have different signs and normalizations.

### 12.3 The discriminant as a product of squared root differences

**Theorem 12.2.** If the roots of $f$ are $x_1,\ldots,x_n$, counted with multiplicity, then

$$
\Delta(f)=a_n^{2n-2}
\prod_{1\le i<j\le n}(x_i-x_j)^2.
$$

**Derivation.** Since $\deg f'=n-1$ in characteristic zero, Section 11.5 gives

$$
R(f,f')=a_n^{n-1}\prod_{i=1}^n f'(x_i).
$$

Differentiate $f(x)=a_n\prod_{j=1}^n(x-x_j)$:

$$
f'(x)=a_n\sum_{k=1}^n\prod_{j\ne k}(x-x_j).
$$

On substituting $x=x_i$, all summands except the one omitting the $i$th factor vanish, so

$$
f'(x_i)=a_n\prod_{j\ne i}(x_i-x_j).
$$

This identity remains valid when some roots coincide; both sides then vanish as appropriate. Therefore

$$
R(f,f')=a_n^{2n-1}
\prod_{i=1}^n\prod_{j\ne i}(x_i-x_j).
$$

For each unordered pair $i<j$,

$$
(x_i-x_j)(x_j-x_i)=-(x_i-x_j)^2.
$$

There are $n(n-1)/2$ such pairs. Hence

$$
R(f,f')=(-1)^{n(n-1)/2}a_n^{2n-1}
\prod_{i<j}(x_i-x_j)^2,
$$

and the defining normalization yields the theorem.

**What to remember.** A repeated root is a collision $x_i=x_j$. The root formula makes the vanishing transparent; the resultant formula lets us test it using only coefficients. For a linear polynomial, the consistent extension is $\Delta(f)=1$, since there is no pair of roots to collide.

### 12.4 Eliminate one variable with a resultant

Apply the same idea to a system

$$
\begin{cases}
f(x,y)=0,\\
g(x,y)=0.
\end{cases}
$$

Regard both expressions as polynomials in $x$ with coefficients depending on $y$:

$$
\begin{aligned}
f(x,y)&=a_n(y)x^n+a_{n-1}(y)x^{n-1}+\cdots+a_0(y),\\
g(x,y)&=b_m(y)x^m+b_{m-1}(y)x^{m-1}+\cdots+b_0(y),
\end{aligned}
$$

where $a_n(y)$ and $b_m(y)$ are nonzero polynomials. The other coefficients may be zero. Form the Sylvester determinant with respect to $x$:

$$
H(y)=R_x(f,g).
$$

Because its entries are polynomials in $y$, $H$ is also a polynomial in $y$. Every common solution $(x_0,y_0)$ must satisfy $H(y_0)=0$.

The procedure is:

1. Compute $H(y)$.
2. If $H$ is nonzero, solve $H(y)=0$ to obtain finitely many candidate values $y_k$; if $H$ is a nonzero constant, there are no common solutions.
3. For each candidate, substitute $y=y_k$ into both original equations and solve for common values of $x$.
4. Check the pairs in both original equations, including values where leading coefficients vanish.

If $a_n(y_k)b_m(y_k)\ne0$, the degrees in $x$ are unchanged, so $H(y_k)=0$ guarantees a common **complex** root of the specialized polynomials. If real solutions are required, the recovered $x$ and $y$ must additionally be real.

**A detail that matters: degree can drop after substitution.** If a leading coefficient vanishes, a zero of the resultant can be an extra candidate rather than a solution. As a small illustration, take

$$
f(x,y)=yx+1,\qquad g(x,y)=yx+2.
$$

Their resultant in $x$ is $H(y)=y$, but at $y=0$ the equations become $1=0$ and $2=0$. Thus the candidate is rejected by substitution.

**Also check whether $H$ is identically zero.** In that case it does not provide a finite candidate list. For example, $f=x-y$ and $g=(x-y)(x+1)$ have the entire line $x=y$ in common. A finite candidate list is guaranteed only when the resultant polynomial is nonzero.

For more variables, one may repeat elimination. For more equations, one may begin with a pair and then impose the remaining equations. Each stage can introduce exceptional cases, so back-substitution remains necessary. Elimination is a useful approach rather than a promise of an easy complete solution: even the remaining one-variable equation may be difficult to solve explicitly.


