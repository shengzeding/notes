---
title: Plane Potential Flow
order: 7
---


# Incompressible Plane Potential Flow


## 1. Potential-Flow Framework

<span id="potential-flow-model"></span>

### 1.1 Assumptions and Bernoulli's equation

The basic model combines inviscid motion in the region of interest with

$$
\nabla\cdot\mathbf v=0,
\qquad \nabla\times\mathbf v=\mathbf0.
$$

<span id="field-wide-bernoulli"></span>

For steady flow under gravity, irrotationality strengthens the [streamline Bernoulli equation](04_Control_Volumes_and_Bernoulli.md#streamline-bernoulli "concept:streamline-bernoulli") by making its constant common throughout a connected regular flow region:

$$
\frac{|\mathbf v|^2}{2}+gz+\int\frac{dp}{\rho}=C.
$$

For constant density, the pressure term is $p/\rho$. In this energy expression, $z$ denotes elevation; in the complex-variable formulas below, $z=x+iy$ instead denotes complex position.

**Theorem (Kelvin's circulation theorem).** For a material closed curve in a smooth inviscid barotropic flow subject to conservative body forces,

$$
\boxed{\frac{D\Gamma}{Dt}=0.}
$$

The statement concerns a loop moving with the fluid. Viscous generation of vorticity at a solid boundary lies outside its assumptions.

### 1.2 Velocity potential and stream function

Irrotational plane flow has a local **velocity potential** $\Phi$ satisfying

$$
u=\frac{\partial\Phi}{\partial x},
\qquad v=\frac{\partial\Phi}{\partial y}.
$$

Incompressible plane flow has a local **stream function** $\Psi$ satisfying

$$
u=\frac{\partial\Psi}{\partial y},
\qquad v=-\frac{\partial\Psi}{\partial x}.
$$

Thus $\Psi=\mathrm{constant}$ describes streamlines, while $\Phi=\mathrm{constant}$ describes equipotentials. Where velocity is nonzero, these curves meet orthogonally.

The signed discharge per unit depth between streamlines is

$$
Q'_{AB}=\Psi_B-\Psi_A,
$$

with the cross-section orientation chosen consistently. Its magnitude is the absolute stream-function difference.

**Global qualification.** A single-valued potential is guaranteed on a simply connected irrotational domain. A vortex in a punctured plane is irrotational away from the origin but has a multivalued angle potential.

<span id="complex-potential"></span>

### 1.3 Laplace's equation and complex potential

Incompressibility of $\nabla\Phi$ and irrotationality of the stream-function velocity give

$$
\boxed{\nabla^2\Phi=0,\qquad\nabla^2\Psi=0.}
$$

These equations are linear. Elementary solutions can therefore be superposed and their parameters chosen to satisfy boundary conditions. Pressure is subsequently obtained from Bernoulli and does not obey the same linear superposition rule.

In polar coordinates,

$$
u_r=\frac{\partial\Phi}{\partial r}
=\frac1r\frac{\partial\Psi}{\partial\theta},
\qquad
u_\theta=\frac1r\frac{\partial\Phi}{\partial\theta}
=-\frac{\partial\Psi}{\partial r}.
$$

Define the **complex potential**

$$
\boxed{W(z)=\Phi+i\Psi,\qquad \frac{dW}{dz}=u-iv.}
$$

The potential and stream function are [harmonic conjugates](../../math/Foundations_of_Complex_Analysis.md#harmonic-conjugate "concept:harmonic-conjugate") and satisfy the Cauchy-Riemann equations. Harmonic-function methods, images, conformal mappings, and residue calculus are therefore useful tools.

<span id="mapped-potential-flow"></span>

**Method note.** Images enforce selected boundaries through symmetry. A [conformal mapping](../../math/Foundations_of_Complex_Analysis.md#conformal-mapping "concept:conformal-mapping") transfers an analytic potential to another domain; the chain rule transforms velocity. For a map $z=z(\zeta)$,

$$
\frac{dW}{dz}=\frac{dW/d\zeta}{dz/d\zeta}.
$$

Section 5 applies the chain rule to the Joukowski map and uses the Kutta condition to select the circulation of a flat plate or airfoil.

---

## 2. Elementary Solutions

### 2.1 Uniform flow

For speed $U$ at angle $\alpha$,

$$
u=U\cos\alpha,\qquad v=U\sin\alpha,
$$

$$
\Phi=U(x\cos\alpha+y\sin\alpha),
\qquad
\Psi=U(y\cos\alpha-x\sin\alpha).
$$

For flow along $+x$,

$$
\Phi=Ux=Ur\cos\theta,
\qquad \Psi=Uy=Ur\sin\theta,
\qquad W=Uz.
$$

### 2.2 Point source and sink

For two-dimensional source strength $Q$ per unit depth at the origin,

$$
\boxed{u_r=\frac{Q}{2\pi r},\qquad u_\theta=0,}
$$

$$
\Phi=\frac{Q}{2\pi}\ln r,
\qquad \Psi=\frac{Q}{2\pi}\theta,
\qquad W=\frac{Q}{2\pi}\log z.
$$

Positive $Q$ is a source and negative $Q$ a sink. The flux around a circle is $2\pi r u_r=Q$.

<span id="point-vortex-circulation"></span>

### 2.3 Point vortex

For positive counterclockwise circulation $\Gamma$,

$$
\boxed{u_r=0,\qquad u_\theta=\frac{\Gamma}{2\pi r},}
$$

$$
\Phi=\frac{\Gamma}{2\pi}\theta,
\qquad \Psi=-\frac{\Gamma}{2\pi}\ln r,
\qquad W=-\frac{i\Gamma}{2\pi}\log z.
$$

The origin is singular. Circulation is $\Gamma$ around a counterclockwise loop enclosing it, even though local vorticity vanishes away from it. This qualifies the usual [Stokes-theorem](02_Flow_Kinematics.md#stokes-theorem "concept:stokes-theorem") argument because a spanning surface crossing the excluded origin is not contained in the fluid domain.

### 2.4 Doublet

For the chosen doublet orientation and moment $M$,

$$
\Phi=\frac{M\cos\theta}{2\pi r},
\qquad \Psi=-\frac{M\sin\theta}{2\pi r},
\qquad W=\frac{M}{2\pi z}.
$$

Differentiating gives

$$
\boxed{u_r=-\frac{M\cos\theta}{2\pi r^2},
\qquad u_\theta=-\frac{M\sin\theta}{2\pi r^2}.}
$$

The velocity decays as $r^{-2}$, faster than that of a source or vortex.

---

## 3. Example: The Rankine Half-Body

Superpose uniform flow in $+x$ and a source of strength $Q>0$:

$$
\Psi=Ur\sin\theta+\frac{Q}{2\pi}\theta,
\qquad
\Phi=Ur\cos\theta+\frac{Q}{2\pi}\ln r.
$$

On the negative $x$ axis, the uniform flow and source velocity oppose each other. Setting their magnitudes equal gives the stagnation distance

$$
\boxed{b=\frac{Q}{2\pi U},\qquad x_s=-b.}
$$

The streamline passing through this point forms the half-body boundary. On its upper branch, $\theta=\pi$ at stagnation, so $\Psi=Q/2$. Thus the boundary may be found from

$$
Ur\sin\theta+\frac{Q}{2\pi}\theta=\frac Q2.
$$

This illustrates the basic construction: build a velocity field first, then identify a streamline that can serve as an impermeable body surface.

---

## 4. Flow Around a Circular Cylinder

### 4.1 Uniform flow plus a doublet

Choose $M=2\pi Ua^2$. For a cylinder of radius $a$,

$$
\boxed{\Phi=U\left(1+\frac{a^2}{r^2}\right)r\cos\theta,
\qquad
\Psi=U\left(1-\frac{a^2}{r^2}\right)r\sin\theta.}
$$

The velocity is

$$
u_r=U\left(1-\frac{a^2}{r^2}\right)\cos\theta,
\qquad
u_\theta=-U\left(1+\frac{a^2}{r^2}\right)\sin\theta.
$$

At $r=a$,

$$
u_r=0,\qquad u_\theta=-2U\sin\theta.
$$

The cylinder is therefore a streamline and satisfies no penetration. An inviscid solution does not impose no slip.

### 4.2 Pressure distribution and d'Alembert's paradox

Ignoring elevation differences, Bernoulli relative to the far field yields

$$
\boxed{C_p=\frac{p_s-p_\infty}{\tfrac12\rho U^2}
=1-4\sin^2\theta.}
$$

Integrating pressure gives zero drag and zero lift. The zero-drag prediction for ideal flow is **d'Alembert's paradox**: real bluff bodies experience drag associated with viscous effects and separation, neither of which is represented by this solution.

### 4.3 Adding counterclockwise circulation

Using the circulation convention stated at the start,

$$
\Phi=U\left(r+\frac{a^2}{r}\right)\cos\theta
+\frac{\Gamma}{2\pi}\theta,
$$

$$
\Psi=U\left(r-\frac{a^2}{r}\right)\sin\theta
-\frac{\Gamma}{2\pi}\ln r.
$$

On the cylinder,

$$
u_\theta=-2U\sin\theta+\frac{\Gamma}{2\pi a},
\qquad
\sin\theta_{\mathrm{cr}}=\frac{\Gamma}{4\pi aU}.
$$

There are two surface stagnation points when $|\Gamma|<4\pi aU$, one merged point at equality, and none on the surface when $|\Gamma|>4\pi aU$.

The pressure coefficient is

$$
C_p=1-\left(-2\sin\theta+\frac{\Gamma}{2\pi aU}\right)^2.
$$

Pressure integration gives

$$
\boxed{F_x'=0,\qquad F_y'=-\rho U\Gamma.}
$$

### 4.4 The equivalent clockwise-positive convention

It is also common to define a clockwise-positive quantity $\Gamma_{\mathrm{cw}}=-\Gamma$. The same physical solution then reads

$$
\Psi=U\left(1-\frac{a^2}{r^2}\right)r\sin\theta
+\frac{\Gamma_{\mathrm{cw}}}{2\pi}\ln r,
$$

$$
\Phi=U\left(1+\frac{a^2}{r^2}\right)r\cos\theta
-\frac{\Gamma_{\mathrm{cw}}}{2\pi}\theta,
$$

$$
u_\theta(a)=-2U\sin\theta-\frac{\Gamma_{\mathrm{cw}}}{2\pi a},
\qquad
\sin\theta_{\mathrm{cr}}=-\frac{\Gamma_{\mathrm{cw}}}{4\pi aU},
$$

$$
F_x'=0,\qquad F_y'=\rho U\Gamma_{\mathrm{cw}}.
$$

**Important qualification.** These formulas are equivalent only after changing the definition of circulation. The signs of the vortex potential, stagnation relation, and lift must be changed together.

---

## 5. Lift, Airfoils, and Cascades

<span id="kutta-joukowski-theorem"></span>

### 5.1 Kutta-Joukowski lift theorem

**Theorem (Kutta-Joukowski).** For the steady two-dimensional ideal-flow model with a uniform far field, lift per unit span has magnitude

$$
\boxed{|F_L'|=\rho U|\Gamma|.}
$$

With positive counterclockwise $\Gamma$ and $\boldsymbol\Gamma=\Gamma\mathbf k$, the force on the body is

$$
\boxed{\mathbf F'=\rho\mathbf U\times\boldsymbol\Gamma.}
$$

For $\mathbf U=U\mathbf i$, this gives

$$
F_x'=0,\qquad F_y'=-\rho U\Gamma.
$$

Thus counterclockwise circulation produces downward force in this convention, while clockwise circulation produces upward force. The theorem determines force once the circulation is known; the inviscid field equations alone still admit a family of circulation values around an airfoil.


<span id="lift-residue-proof"></span>

For a smooth impermeable body with no net source flux and uniform flow $U$ along $+x$, write $q(z)=dW/dz$. Bernoulli's equation and the tangency of velocity to the body give Blasius' force formula,

$$
F_x'-iF_y'=\frac{i\rho}{2}\oint_C q(z)^2\,dz,
$$

where $C$ encircles the body counterclockwise. In the regular exterior flow, the contour may be deformed to a sufficiently large circle. There,

$$
q(z)=U-\frac{i\Gamma}{2\pi z}+O(z^{-2}),
\qquad
q(z)^2=U^2-\frac{iU\Gamma}{\pi z}+O(z^{-2}).
$$

Applying the [residue theorem](../../math/Foundations_of_Complex_Analysis.md#residue-theorem "concept:residue-theorem") at infinity, or integrating the Laurent series term by term, only the $z^{-1}$ coefficient contributes:

$$
\oint_C q(z)^2\,dz
=2\pi i\left(-\frac{iU\Gamma}{\pi}\right)=2U\Gamma.
$$

Thus $F_x'-iF_y'=i\rho U\Gamma$, recovering $F_x'=0$ and $F_y'=-\rho U\Gamma$ with the stated circulation convention.

<span id="joukowski-map"></span>

### 5.2 The Joukowski map

Let $\zeta$ denote the circle plane and $z$ the physical plane. The Joukowski map is

$$
\boxed{z(\zeta)=\zeta+\frac{a^2}{\zeta}.}
$$

On the circle $|\zeta|=a$, write $\zeta=ae^{i\theta}$. Then

$$
z=ae^{i\theta}+ae^{-i\theta}
=2a\cos\theta.
$$

The image is the real segment $-2a\le z\le2a$. The upper and lower semicircles map to the two faces of a flat plate with chord

$$
\boxed{c=4a.}
$$

The complex potential $W(\zeta)$ describes the flow, whereas $z(\zeta)$ changes the geometry. Their similar algebraic forms in the zero-incidence cylinder solution do not make them the same object.

Away from its critical points, the Joukowski map is a [conformal mapping](../../math/Foundations_of_Complex_Analysis.md#conformal-mapping "concept:conformal-mapping"). On the chosen exterior domain, its inverse transfers the circle-plane potential to the physical plane. The mapped complex velocity follows from the chain rule:

$$
\boxed{\frac{dW}{dz}
=\frac{dW/d\zeta}{dz/d\zeta}},
\qquad
\frac{dz}{d\zeta}=1-\frac{a^2}{\zeta^2}.
$$

The mapping derivative vanishes at $\zeta=\pm a$, which correspond to the two plate edges. A finite mapped velocity at either point requires the numerator to vanish to at least the same order. If both derivatives have simple zeros at $\zeta_t$,

$$
\lim_{\zeta\to\zeta_t}\frac{dW}{dz}
=
\frac{d^2W/d\zeta^2}{d^2z/d\zeta^2}\bigg|_{\zeta=\zeta_t}.
$$

This limit, rather than the denominator alone, decides whether the physical velocity is finite.

### 5.3 Inclined flat plate and the Kutta condition

Keep the plate on the real axis and let the far-field velocity make angle $-\alpha$ with it. The cylinder-plane potential with positive counterclockwise circulation is

$$
\boxed{
W(\zeta)
=
U\left(
e^{-i\alpha}\zeta
+e^{i\alpha}\frac{a^2}{\zeta}
\right)
-\frac{i\Gamma}{2\pi}\log\zeta.
}
$$

The first two terms give uniform flow plus a doublet; the logarithmic term gives the point vortex. Differentiation yields

$$
\frac{dW}{d\zeta}
=
U\left(
e^{-i\alpha}
-e^{i\alpha}\frac{a^2}{\zeta^2}
\right)
-\frac{i\Gamma}{2\pi\zeta}.
$$

Take the right endpoint $\zeta=a$ to be the trailing edge. Since $dz/d\zeta=0$ there, finite trailing-edge velocity requires

$$
\boxed{\left.\frac{dW}{d\zeta}\right|_{\zeta=a}=0.}
$$

Substitution gives

$$
0
=
U\left(e^{-i\alpha}-e^{i\alpha}\right)
-\frac{i\Gamma}{2\pi a}
=
-i\left(
2U\sin\alpha+\frac{\Gamma}{2\pi a}
\right).
$$

Therefore the Kutta condition selects

$$
\boxed{\Gamma=-4\pi aU\sin\alpha.}
$$

For positive $\alpha$, the selected circulation is clockwise, $\Gamma<0$, and the lift is upward. With a clockwise-positive circulation $\Gamma_{\mathrm{cw}}=-\Gamma$, the same result is $\Gamma_{\mathrm{cw}}=4\pi aU\sin\alpha$.

The Kutta condition removes the trailing-edge singularity. The ideal zero-thickness plate still has a leading-edge velocity singularity at nonzero incidence. A rounded leading edge and viscous boundary layer regularize that region in a real flow.

### 5.4 Lift coefficient of the flat plate

Insert the Kutta circulation into the force theorem:

$$
F_y'
=-\rho U\Gamma
=4\pi\rho aU^2\sin\alpha.
$$

Since $c=4a$,

$$
\boxed{F_y'=\pi\rho U^2c\sin\alpha.}
$$

Define the two-dimensional lift coefficient using chord as reference length:

$$
C_L=\frac{F_y'}{\tfrac12\rho U^2c}.
$$

The Joukowski flat-plate model gives

$$
\boxed{C_L=2\pi\sin\alpha.}
$$

At small incidence, with $\alpha$ measured in radians,

$$
\boxed{C_L\approx2\pi\alpha,
\qquad
\frac{dC_L}{d\alpha}\approx2\pi\ \mathrm{rad}^{-1}.}
$$

This result assumes steady, incompressible, two-dimensional, attached ideal flow. It does not describe stall or finite-span induced effects.

### 5.5 From a circle to an airfoil

A centered circle passing through both critical points $\zeta=\pm a$ maps to the zero-thickness plate. More general Joukowski airfoils follow from

$$
z=\zeta+\frac{b^2}{\zeta},
$$

using an offset circle in the $\zeta$ plane. A sharp trailing edge is obtained by choosing the circle to pass through the critical point $\zeta=b$, where $dz/d\zeta=0$.

A horizontal offset changes the thickness distribution. A vertical offset introduces camber. The circle need not pass through the other critical point, so the mapped leading edge can be rounded while the trailing edge remains sharp.

The flow is constructed around the offset circle, augmented by a vortex, and mapped into the airfoil plane. The Kutta condition again requires

$$
\left.\frac{dW}{d\zeta}\right|_{\zeta=b}=0,
$$

which fixes the circulation. Camber changes the circulation selected at a given incidence and shifts the zero-lift angle. For a thin cambered airfoil at small incidence, the lift relation takes the form

$$
C_L\approx2\pi(\alpha-\alpha_{L=0}).
$$

### 5.6 Circulation selection and startup

An inviscid airfoil admits many mathematical solutions distinguished by circulation. The Kutta condition selects the member whose velocity remains finite and whose flow leaves a sharp trailing edge smoothly.

During startup, viscous effects near the body generate a starting vortex. The bound circulation around the airfoil has the opposite sign, consistent with Kelvin's theorem when the complete material loop and the vorticity shed into the wake are included. Once the starting process has passed, the outer flow can be modeled by the steady potential solution with the selected circulation.

The construction determines the two-dimensional outer flow and its lift. Boundary-layer development, separation, stall, and finite-wing effects require additional models.

### 5.7 Blade-cascade force components

For an in-plane reference velocity $\mathbf V=(V_x,V_y)$ and positive counterclockwise circulation,

$$
\boxed{F_x'=\rho V_y\Gamma,
\qquad F_y'=-\rho V_x\Gamma.}
$$

Consequently,

$$
|\mathbf F'|=\rho V|\Gamma|.
$$

This is the same vector cross-product rule. State the circulation convention and whether the desired force is on the fluid or on the blade before using the component equations.
