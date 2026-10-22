---
title: Foundations of Complex Analysis
order: 10
---

# Foundations of Complex Analysis


## 1. Complex Numbers and Elementary Functions

### 1.1 Algebraic and polar forms

A complex number can be written as

$$
z=x+iy=r(\cos\theta+i\sin\theta)=re^{i\theta},
\qquad r=|z|=\sqrt{x^2+y^2}.
$$

The last equality uses **Euler's formula**:

$$
e^{i\theta}=\cos\theta+i\sin\theta.
$$

For $z\ne0$, an argument of $z$ is any angle $\theta$ representing its direction. Arguments are not unique:

$$
\arg z=\operatorname{Arg}z+2k\pi,\qquad k\in\mathbb Z,
$$

where we adopt the principal-value convention $\operatorname{Arg}z\in(-\pi,\pi]$.

**Remark.** Arguments add under multiplication, but principal arguments only add *modulo* $2\pi$. For instance, the sum of two principal arguments may have to be shifted by $2\pi$ to return to $(-\pi,\pi]$.

The polar form is especially useful for multiplication, division, and powers:

$$
(r_1e^{i\theta_1})(r_2e^{i\theta_2})=r_1r_2e^{i(\theta_1+\theta_2)},
\qquad (re^{i\theta})^n=r^ne^{in\theta}.
$$

The second identity is **De Moivre's formula**. For example,

$$
(1+i)^8=(\sqrt2\,e^{i\pi/4})^8=16.
$$

**Proposition 1 (Complex roots).** If $w=re^{i\theta}\ne0$, its $n$ distinct $n$th roots are

$$
z_k=r^{1/n}e^{i(\theta+2k\pi)/n},\qquad k=0,1,\ldots,n-1.
$$

They lie equally spaced on the circle $|z|=r^{1/n}$. Thus the solutions of $z^3=8$ are

$$
2,\qquad -1+i\sqrt3,\qquad -1-i\sqrt3.
$$

The conjugate of $z=x+iy$ is $\overline z=x-iy$. The identities

$$
z\overline z=|z|^2,\qquad
\operatorname{Re}z=\frac{z+\overline z}{2},\qquad
\operatorname{Im}z=\frac{z-\overline z}{2i}
$$

will be useful when studying differentiability and contour integrals.

### 1.2 Neighborhoods and domains

An open disk centered at $z_0$ is $\{z:|z-z_0|<r\}$. The corresponding **punctured disk** is $\{z:0<|z-z_0|<r\}$.

A **domain** is an open, connected subset of $\mathbb C$. A domain is **simply connected** if every closed curve in it can be continuously contracted to a point without leaving the domain. This distinction becomes important in Cauchy's theorem: a function may be analytic on a punctured plane, yet its integral around the missing point need not vanish.

### 1.3 Exponential, logarithmic, and power functions

For $z=x+iy$, define

$$
e^z=e^x(\cos y+i\sin y).
$$

Consequently,

$$
|e^z|=e^x,\qquad e^{z+2\pi i}=e^z.
$$

Unlike the real exponential, the complex exponential is periodic.

To solve $e^w=z\ne0$, write $z=re^{i\theta}$. All solutions are

$$
w=\ln r+i(\theta+2k\pi),\qquad k\in\mathbb Z.
$$

Thus the complex logarithm is **multivalued**:

$$
\log z=\ln|z|+i(\operatorname{Arg}z+2k\pi).
$$

Its principal value is $\operatorname{Log}z=\ln|z|+i\operatorname{Arg}z$; as an analytic branch it is normally used on the slit plane $\mathbb C\setminus(-\infty,0]$. In particular,

$$
\log(-1)=i(\pi+2k\pi),\qquad \operatorname{Log}(-1)=i\pi.
$$

Complex powers are defined through logarithms:

$$
z^\alpha=e^{\alpha\log z}.
$$

They may also be multivalued. A striking example is

$$
i^i=e^{-\pi/2-2k\pi},\qquad k\in\mathbb Z,
$$

so every possible value is a positive real number.

Finally, Euler's formula gives

$$
\cos z=\frac{e^{iz}+e^{-iz}}2,\qquad
\sin z=\frac{e^{iz}-e^{-iz}}{2i}.
$$

The hyperbolic functions satisfy

$$
\cosh z=\frac{e^z+e^{-z}}2,\qquad
\sinh z=\frac{e^z-e^{-z}}2,
$$

and $\cos(iz)=\cosh z$, $\sin(iz)=i\sinh z$.

---

## 2. Limits, Differentiability, and Analyticity

### 2.1 Limits and continuity

Let $f(z)=u(x,y)+iv(x,y)$. Then $f$ is continuous at $z_0=x_0+iy_0$ precisely when **both** $u$ and $v$ are continuous at $(x_0,y_0)$.

A key difference from one-variable real analysis is that $z\to z_0$ allows infinitely many approach paths. To disprove a limit, it suffices to find two paths giving different answers.

**Example 1 (Path dependence).** Define $f(z)=\overline z/z$ for $z\ne0$ and $f(0)=0$. Along the real axis, $f(x)=1$; along the imaginary axis, $f(iy)=-1$. Hence $\lim_{z\to0}f(z)$ does not exist and $f$ is not continuous at $0$.

Checking lines alone is not enough to *prove* a limit exists. Consider, for $(x,y)\ne(0,0)$,

$$
f(x+iy)=\frac{x^2y}{x^4+y^2},\qquad f(0)=0.
$$

Along every line $y=kx$, the limit is $0$; along the parabola $y=x^2$, the value is $1/2$. Thus the limit still fails to exist. For a positive limit proof, one usually needs an estimate, a squeeze argument, or another path-independent method.

### 2.2 The complex derivative and the Cauchy–Riemann equations

A function is **complex differentiable at $z_0$** if the limit

$$
f'(z_0)=\lim_{h\to0}\frac{f(z_0+h)-f(z_0)}{h}
$$

exists independently of the direction of the complex increment $h$.

Write $f=u+iv$. Moving horizontally gives $dz=dx$ and therefore

$$
f'(z)=u_x+iv_x.
$$

Moving vertically gives $dz=i\,dy$, **not** $dy$, and therefore

$$
f'(z)=\frac1i\frac{\partial f}{\partial y}=v_y-iu_y.
$$

If the complex derivative exists, the two expressions agree. Equating real and imaginary parts yields the **Cauchy–Riemann (C–R) equations**:

$$
\boxed{u_x=v_y,\qquad u_y=-v_x.}
$$

Equivalently, whenever $f$ is complex differentiable,

$$
\frac{\partial f}{\partial x}=-i\frac{\partial f}{\partial y}.
$$

**Important qualification.** C–R equations at a *single point* are necessary, but alone are not sufficient for complex differentiability. A useful sufficient condition is that $u$ and $v$ have continuous first partial derivatives near the point and satisfy C–R there. More precisely, real differentiability of $(u,v)$ at the point together with C–R at that point is sufficient.

**Example 2.** For $f(z)=z^2=(x^2-y^2)+i(2xy)$, both C–R equations hold everywhere and $f'(z)=2z$.

For $f(z)=\overline z=x-iy$, we have $u_x=1$ but $v_y=-1$, so $f$ is nowhere complex differentiable—even though it is continuous everywhere.

### 2.3 Differentiable at a point versus analytic near a point

**Definition.** The function $f$ is **analytic (holomorphic) at $z_0$** if it is complex differentiable at every point of some open neighborhood of $z_0$. It is analytic on a domain if this holds throughout the domain.

Thus

$$
\text{analytic near }z_0\;\Longrightarrow\;\text{differentiable at }z_0\;\Longrightarrow\;\text{continuous at }z_0,
$$

but the converses do not generally hold.

**Example 3 (A single differentiable point).** Set $f(z)=|z|^2=z\overline z$. At the origin,

$$
f'(0)=\lim_{h\to0}\frac{|h|^2}{h}=\lim_{h\to0}\overline h=0.
$$

At every nonzero point, however, the C–R equations fail. Hence $f$ is differentiable at $0$ but **not analytic** there.

Analyticity is *not defined* as the existence of a second derivative. Instead, one of the remarkable theorems of complex analysis states that analyticity on an open set automatically implies the existence of derivatives of **all orders**, as well as a local convergent Taylor series.

### 2.4 Harmonic and conjugate harmonic functions

A twice continuously differentiable real function $u(x,y)$ is **harmonic** on a domain if it satisfies Laplace's equation:

$$
\Delta u=u_{xx}+u_{yy}=0.
$$

**Theorem 1.** If $f=u+iv$ is analytic on a domain, then both $u$ and $v$ are harmonic.

*Proof sketch.* Differentiate the C–R equations and use equality of mixed partial derivatives:

$$
u_{xx}+u_{yy}=v_{yx}-v_{xy}=0.
$$

The same calculation works for $v$. $\square$

A function $v$ is a **harmonic conjugate** of $u$ when $u+iv$ is analytic. The word *conjugate* here does not mean ordinary complex conjugation; it describes the C–R relationship

$$
v_x=-u_y,\qquad v_y=u_x.
$$

Geometrically, $\nabla v=(-u_y,u_x)$ is a $90^\circ$ rotation of $\nabla u$. Where these gradients are nonzero, the level curves of $u$ and $v$ meet orthogonally.

Why does harmonicity matter if we already have C–R? Because the two equations prescribing $v_x$ and $v_y$ must be **compatible**. Their mixed derivatives require

$$
v_{xy}=-u_{yy}=v_{yx}=u_{xx},
$$

which is exactly $u_{xx}+u_{yy}=0$. Harmonicity is therefore an integrability condition, not a redundant decoration.

**Example 4 (Finding a harmonic conjugate).** Let $u=x^2-y^2$. Then

$$
v_x=2y,\qquad v_y=2x.
$$

Integrating gives $v=2xy+C$, so

$$
f(z)=z^2+iC,\qquad C\in\mathbb R.
$$

By contrast, $u=x^2+y^2$ is not harmonic ($\Delta u=4$), so it cannot be the real part of an analytic function on an open set.

**Global qualification.** A harmonic function has a harmonic conjugate locally. On a simply connected domain, one can choose a single-valued harmonic conjugate throughout the domain, unique up to an additive real constant. On $\mathbb C\setminus\{0\}$, for example, $u(z)=\ln|z|$ is harmonic but its local conjugate is $\arg z$, which cannot be chosen continuously and single-valuedly on the entire punctured plane.

---

<span id="conformal-mapping"></span>

## 3. Conformal Mappings

Complex differentiability has a geometric consequence. Near a point where the derivative is nonzero, an analytic function behaves like a rotation followed by a uniform scaling. This leads to **conformal mappings**: maps that preserve angles between intersecting curves, including their orientation.

### 3.1 Why a nonzero complex derivative preserves angles

Let $w=f(z)$ be analytic near $z_0$. By the definition of the derivative,

$$
f(z_0+h)=f(z_0)+f'(z_0)h+o(|h|)\qquad(h\to0).
$$

If $f'(z_0)\ne0$, write $f'(z_0)=\rho e^{i\phi}$, where $\rho>0$. To first order, the displacement $h$ is transformed into

$$
f'(z_0)h=\rho e^{i\phi}h.
$$

Multiplication by this complex number scales **every** direction by $\rho=|f'(z_0)|$ and rotates it by the **same** angle $\phi=\arg f'(z_0)$. Consequently, the difference between any two tangent directions is unchanged.

**Proposition (Local conformality criterion).** A holomorphic function $f$ is conformal at $z_0$ if $f'(z_0)\ne0$. Equivalently, it is locally one-to-one with a holomorphic inverse near that point. If $f'(z_0)=0$, the point is called a *critical point*, and this conformality criterion fails.

*Remark.* Analyticity alone does not imply conformality at **every** point. Also, local conformality does not imply global injectivity: a map may preserve angles near each point while sending distinct distant points to the same image.

### 3.2 Basic examples

**Squaring.** For $f(z)=z^2$, we have $f'(z)=2z$. The map is conformal wherever $z\ne0$, but not at $0$. In polar coordinates,

$$
z=re^{i\theta}\quad\Longrightarrow\quad w=z^2=r^2e^{2i\theta}.
$$

Thus angles measured from the positive real axis are doubled. There is no contradiction with local angle preservation away from $0$: a local angle *between two curves meeting at a nonzero point* is preserved, even though their positions relative to the origin change. As a global example, $z^2$ maps the open first quadrant $0<\arg z<\pi/2$ conformally and bijectively onto the upper half-plane $\operatorname{Im}w>0$.

**Exponential.** Since $(e^z)'=e^z\ne0$, the exponential is conformal at every point. Nevertheless, $e^{z+2\pi i}=e^z$, so it is not one-to-one on all of $\mathbb C$. It becomes one-to-one after restricting, for example, to the strip $-\pi<\operatorname{Im}z<\pi$.

**Logarithm.** On any domain with a holomorphic branch of $\log z$, the derivative is $1/z\ne0$. Writing $z=re^{i\theta}$ within that branch,

$$
w=\log z=\ln r+i\theta.
$$

Hence circular arcs $|z|=r$ map to portions of vertical lines $\operatorname{Re}w=\ln r$, while rays of constant argument map to portions of horizontal lines $\operatorname{Im}w=\theta$. The branch restriction is essential because the logarithm is multivalued on the punctured plane.

### 3.3 Möbius transformations and a standard domain map

A **Möbius transformation** has the form

$$
w=T(z)=\frac{az+b}{cz+d},\qquad ad-bc\ne0.
$$

Where its denominator is nonzero,

$$
T'(z)=\frac{ad-bc}{(cz+d)^2}\ne0.
$$

It is therefore conformal wherever it is finite. Möbius transformations take generalized circles (circles or straight lines, viewed on the Riemann sphere) to generalized circles. With appropriate domains, they are useful for turning difficult boundaries into simpler ones.

**Example (Upper half-plane to unit disk).** Consider

$$
\boxed{w=\frac{z-i}{z+i}.}
$$

For $z=x+iy$ with $y>0$,

$$
|z-i|^2=x^2+(y-1)^2
< x^2+(y+1)^2=|z+i|^2.
$$

Thus $|w|<1$: the upper half-plane maps into the unit disk. The map is bijective onto that disk, with inverse

$$
z=i\frac{1+w}{1-w},
$$

and $z=i$ maps to $w=0$. On the real axis, $|w|=1$, so the boundary line maps onto the unit circle (with its point at infinity understood on the Riemann sphere).

**Connection to harmonic conjugates.** If $f=u+iv$ is analytic and $f'\ne0$, the C–R equations imply that $\nabla u$ and $\nabla v$ are perpendicular and have equal lengths. Thus the level curves of $u$ and $v$ meet orthogonally—another geometric expression of conformality.

---

## 4. Contour Integrals and Cauchy's Theorems

### 4.1 Definition and direct computation

Let a contour $C$ be parametrized by $z=z(t)$ for $a\le t\le b$. Define

$$
\int_C f(z)\,dz=\int_a^b f(z(t))z'(t)\,dt.
$$

Equivalently, if $f=u+iv$ and $dz=dx+i\,dy$,

$$
\int_C f\,dz=\int_C(u\,dx-v\,dy)+i\int_C(v\,dx+u\,dy).
$$

**Example 5.** For the straight segment from $0$ to $1+i$, let $z(t)=(1+i)t$, $0\le t\le1$. Then

$$
\int_C\overline z\,dz
=\int_0^1(1-i)t(1+i)\,dt=1.
$$

The integrand $\overline z$ is not analytic, so path independence is not available in general.

**Estimation lemma ($ML$ inequality).** If $|f(z)|\le M$ on a contour of length $L$, then

$$
\left|\int_Cf(z)\,dz\right|\le ML.
$$

This is particularly useful when showing that an additional arc contributes nothing as its radius tends to infinity.

### 4.2 Cauchy's theorem and path independence

**Theorem 2 (Cauchy's integral theorem).** If $f$ is analytic on a simply connected domain $D$, then for every closed contour $C\subset D$,

$$
\boxed{\oint_C f(z)\,dz=0.}
$$

More generally, the same conclusion holds for contours that can be contracted to a point within the region where $f$ is analytic.

In such a simply connected domain, integrals of $f$ are path independent. We can define an antiderivative $F$ with $F'=f$, and then

$$
\int_{z_1}^{z_2}f(z)\,dz=F(z_2)-F(z_1).
$$

For instance, $\int_0^{1+i}z^2\,dz=(1+i)^3/3=(-2+2i)/3$ along any path in $\mathbb C$.

**A common confusion.** The fact that a contour integral is zero does **not** mean that Cauchy's theorem is applicable. Both $1/z$ and $1/z^2$ are singular at $0$, so neither is analytic throughout the disk $|z|<1$. Nevertheless,

$$
\oint_{|z|=1}\frac{dz}{z}=2\pi i,
\qquad
\oint_{|z|=1}\frac{dz}{z^2}=0.
$$

The second integral vanishes because $1/z^2$ has the primitive $-1/z$ on the punctured plane (or by the higher-order Cauchy formula), **not** because the singularity disappears.

In general, if $C$ goes once counterclockwise around $z_0$,

$$
\oint_C(z-z_0)^n\,dz=
\begin{cases}
2\pi i,&n=-1,\\
0,&n\in\mathbb Z,\ n\ne-1.
\end{cases}
$$

This identity anticipates the residue theorem.

### 4.3 Cauchy's integral formula

**Theorem 3 (Cauchy's integral formula).** Let $C$ be a positively oriented simple closed contour, and let $f$ be analytic on an open neighborhood of $C$ and its interior. For $z_0$ inside $C$,

$$
\boxed{f(z_0)=\frac1{2\pi i}\oint_C\frac{f(z)}{z-z_0}\,dz.}
$$

An integral around an entire curve is therefore determined by the value of an analytic function at one interior point.

**Example 6.** On $|z|=2$ (counterclockwise),

$$
\oint\frac{e^z}{z-i}\,dz=2\pi i e^i.
$$

Cauchy's formula also gives derivatives of every order:

$$
\boxed{\oint_C\frac{f(z)}{(z-z_0)^{n+1}}\,dz
=\frac{2\pi i}{n!}f^{(n)}(z_0).}
$$

**Example 7.** Since the denominator $(z-1)^3$ corresponds to $n=2$,

$$
\oint_{|z|=2}\frac{e^z}{(z-1)^3}\,dz
=\frac{2\pi i}{2!}e=\pi i e.
$$

**Corollaries.** Cauchy's formula yields the derivative estimate $|f^{(n)}(z_0)|\le n!M/R^n$ when $|f|\le M$ on the radius-$R$ circle. Two important consequences are:

- **Liouville's theorem.** Every bounded entire function (analytic on all of $\mathbb C$) is constant.
- **Maximum modulus principle.** A nonconstant analytic function cannot attain an interior local maximum of $|f|$. On a bounded domain, if it extends continuously to the closure, its maximum modulus occurs on the boundary.

---

## 5. Power Series, Taylor Series, Laurent Series, and Singularities

### 5.1 Complex series and convergence disks

A complex series $\sum a_n$ converges if its partial sums converge in $\mathbb C$. Absolute convergence of $\sum|a_n|$ implies convergence of $\sum a_n$.

The basic geometric series is

$$
\sum_{n=0}^{\infty}z^n=\frac1{1-z},\qquad |z|<1.
$$

For a power series $\sum_{n=0}^{\infty}a_n(z-z_0)^n$, there is a convergence radius $R\in[0,\infty]$: it converges absolutely for $|z-z_0|<R$ and diverges for $|z-z_0|>R$. Behavior on the boundary $|z-z_0|=R$ must be checked separately.

The general formula is

$$
\boxed{\frac1R=\limsup_{n\to\infty}|a_n|^{1/n}.}
$$

When the relevant limit exists, the ratio test gives $R=\lim_{n\to\infty}|a_n/a_{n+1}|$. For example, $\sum_{n=1}^{\infty}z^n/n$ has radius $R=1$.

### 5.2 Taylor series

**Theorem 4 (Taylor expansion).** If $f$ is analytic in a disk centered at $z_0$, then near $z_0$,

$$
\boxed{f(z)=\sum_{n=0}^{\infty}\frac{f^{(n)}(z_0)}{n!}(z-z_0)^n.}
$$

Useful expansions about the origin include

$$
\begin{aligned}
e^z&=\sum_{n=0}^{\infty}\frac{z^n}{n!},\\
\sin z&=\sum_{n=0}^{\infty}\frac{(-1)^nz^{2n+1}}{(2n+1)!},\\
\cos z&=\sum_{n=0}^{\infty}\frac{(-1)^nz^{2n}}{(2n)!},\\
\frac1{1-z}&=\sum_{n=0}^{\infty}z^n,\quad |z|<1,\\
\log(1+z)&=\sum_{n=1}^{\infty}\frac{(-1)^{n+1}z^n}{n},\quad |z|<1.
\end{aligned}
$$

For the analytic germ at the center, the Taylor radius is determined by the distance to the nearest singularity of its analytic continuation. For example, $1/(1+z^2)$ has singularities at $\pm i$, so its Taylor series about $0$ has radius $1$:

$$
\frac1{1+z^2}=1-z^2+z^4-\cdots,\qquad |z|<1.
$$

### 5.3 Laurent series and the role of the region

A **Laurent series** allows negative powers:

$$
\boxed{f(z)=\sum_{n=-\infty}^{\infty}a_n(z-z_0)^n.}
$$

It represents an analytic function on an **annulus** $r<|z-z_0|<R$, and its coefficients are unique *for that annulus*. The negative-power terms form its **principal part**.

Why can the same function have different expansions centered at the same point? Because a geometric-series identity changes form when its ratio crosses the unit circle:

$$
\frac1{1-z}=
\begin{cases}
1+z+z^2+\cdots,&|z|<1,\\[2mm]
-\dfrac1z-\dfrac1{z^2}-\dfrac1{z^3}-\cdots,&|z|>1.
\end{cases}
$$

Both are correct; they simply converge on different regions. At $z=2$, for example, the second series sums to $-1$, whereas the first diverges.

**Example 8 (One function, two Laurent series).** Consider

$$
f(z)=\frac1{z(z-1)}=-\frac1z+\frac1{z-1}.
$$

On the inner annulus $0<|z|<1$,

$$
\boxed{f(z)=-\frac1z-1-z-z^2-\cdots.}
$$

On the outer annulus $|z|>1$,

$$
\boxed{f(z)=\frac1{z^2}+\frac1{z^3}+\frac1{z^4}+\cdots.}
$$

The coefficient of $z^{-1}$ is $-1$ in the inner annulus and $0$ in the outer annulus. Correspondingly, the circle $|z|=1/2$ encloses one pole and has integral $-2\pi i$, whereas $|z|=2$ encloses both poles, whose contributions cancel, and has integral $0$.

**Remark.** A Laurent expansion on an outer annulus cannot, by itself, classify the singularity at its center: that annulus does not reach the center. Classification requires a punctured *neighborhood* $0<|z-z_0|<R$.

### 5.4 Isolated singularities

A point $z_0$ is an **isolated singularity** of $f$ if $f$ is analytic on some punctured disk $0<|z-z_0|<r$ but is not analytic at $z_0$ as originally defined. A removable singularity can, of course, be filled in by analytic extension.

The principal part of the Laurent series classifies it:

| Type | Principal part | Example at $z=0$ |
|---|---|---|
| Removable singularity | No negative powers | $\sin z/z$ |
| Pole of order $m$ | Finitely many negative powers, lowest exponent $-m$ | $1/z^m$ |
| Essential singularity | Infinitely many negative powers | $e^{1/z}$ |

Indeed,

$$
\frac{\sin z}{z}=1-\frac{z^2}{3!}+\cdots
$$

extends analytically by setting its value at $0$ equal to $1$, while

$$
e^{1/z}=1+\frac1z+\frac1{2!z^2}+\cdots
$$

has an essential singularity. A singularity need not be isolated: the poles of $1/\sin(1/z)$ at $z=1/(n\pi)$ accumulate at $0$.

---

## 6. Residues and Their Applications

### 6.1 Definition and residue theorem

Suppose $z_0$ is an isolated singularity and

$$
f(z)=\sum_{n=-\infty}^{\infty}a_n(z-z_0)^n
$$

in a punctured neighborhood. The **residue** of $f$ at $z_0$ is

$$
\boxed{\operatorname{Res}(f,z_0)=a_{-1}.}
$$

The reason for selecting precisely this coefficient is the identity from Chapter 4: for an integer $n\ne-1$, the integral of $(z-z_0)^n$ around a positively oriented circle vanishes, whereas the $n=-1$ term contributes $2\pi i$.

<span id="residue-theorem"></span>

**Theorem 5 (Residue theorem).** Suppose $f$ is analytic on and inside a positively oriented simple closed contour $C$, except for finitely many isolated singularities $z_1,\ldots,z_N$ in the interior. Then

$$
\boxed{\oint_C f(z)\,dz=2\pi i\sum_{k=1}^{N}\operatorname{Res}(f,z_k).}
$$

The practical procedure is to locate the singularities, keep only those inside $C$, calculate their residues, and sum. A clockwise contour changes the sign.

### 6.2 Calculating residues

**Simple pole.** If $z_0$ is a simple pole,

$$
\boxed{\operatorname{Res}(f,z_0)=\lim_{z\to z_0}(z-z_0)f(z).}
$$

In particular, if $f=P/Q$ with $P,Q$ analytic near $z_0$, $Q(z_0)=0$, $Q'(z_0)\ne0$, and $P(z_0)\ne0$, then

$$
\boxed{\operatorname{Res}(f,z_0)=\frac{P(z_0)}{Q'(z_0)}.}
$$

For example,

$$
\operatorname{Res}\!\left(\frac{e^z}{z^2+1},i\right)=\frac{e^i}{2i}.
$$

**Pole of order $m$.** If $z_0$ is an $m$th-order pole,

$$
\boxed{\operatorname{Res}(f,z_0)=\frac1{(m-1)!}
\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}
\bigl[(z-z_0)^mf(z)\bigr].}
$$

Thus $\operatorname{Res}(e^z/(z-1)^3,1)=e/2$. A third-order pole requires a **second** derivative, not a third derivative.

**Direct Laurent expansion.** For essential singularities or convenient series,

$$
\operatorname{Res}(e^{1/z},0)=1,
\qquad
\operatorname{Res}(1/z^2,0)=0.
$$

A zero residue does not imply the absence of a singularity.

**Example 9 (Several poles).** Let

$$
f(z)=\frac{z+1}{z(z-1)}.
$$

The poles $0$ and $1$ both lie inside $|z|=2$. Their residues are

$$
\operatorname{Res}(f,0)=-1,\qquad
\operatorname{Res}(f,1)=2.
$$

Hence

$$
\oint_{|z|=2}f(z)\,dz=2\pi i(-1+2)=2\pi i.
$$

### 6.3 Evaluating real integrals

Residue calculus also applies to real integrals after a suitable complex change of variables or contour closure.

**(a) Trigonometric integrals.** For a rational expression in $\sin\theta$ and $\cos\theta$, let $z=e^{i\theta}$. Then

$$
\cos\theta=\frac{z+z^{-1}}2,\qquad
\sin\theta=\frac{z-z^{-1}}{2i},\qquad
d\theta=\frac{dz}{iz}.
$$

The real integral over $0\le\theta\le2\pi$ becomes a contour integral around $|z|=1$. For example,

$$
\int_0^{2\pi}\frac{d\theta}{2+\cos\theta}
=\oint_{|z|=1}\frac{2\,dz}{i(z^2+4z+1)}.
$$

The poles are $-2\pm\sqrt3$, and only $-2+\sqrt3$ lies inside the unit circle. Its residue for the transformed integrand is $1/(i\sqrt3)$, giving

$$
\boxed{\int_0^{2\pi}\frac{d\theta}{2+\cos\theta}=\frac{2\pi}{\sqrt3}.}
$$

**(b) Improper rational integrals.** To compute an integral on $(-\infty,\infty)$, extend its rational integrand to the complex plane and close the real segment with a large semicircle. One must justify that the arc integral tends to zero; a sufficiently fast-decaying rational function makes this possible.

For example, $1/(z^2+1)$ has a single pole in the upper half-plane, at $z=i$, with residue $1/(2i)$. Thus

$$
\boxed{\int_{-\infty}^{\infty}\frac{dx}{x^2+1}=2\pi i\frac1{2i}=\pi.}
$$

**(c) Oscillatory integrals.** The identity $e^{iax}=\cos(ax)+i\sin(ax)$ allows us to recover sine or cosine integrals by taking imaginary or real parts. For $a>0$, an upper-half-plane contour is often convenient because $e^{iaz}$ decays there. As before, decay on the closing arc must be justified. Poles on the real axis require special treatment (typically indented contours or principal values); one cannot apply the ordinary residue theorem across a pole lying on the contour.

