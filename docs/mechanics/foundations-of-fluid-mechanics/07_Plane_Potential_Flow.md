---
title: Plane Potential Flow
order: 7
---


# Incompressible Plane Potential Flow


## 1. Potential-Flow Framework

### 1.1 Assumptions and Bernoulli's equation

The basic model combines inviscid motion in the region of interest with

$$
\nabla\cdot\mathbf v=0,
\qquad \nabla\times\mathbf v=\mathbf0.
$$

For steady flow under gravity, irrotationality makes the Bernoulli constant common throughout a connected regular flow region:

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

The potential and stream function satisfy the Cauchy-Riemann equations. Harmonic-function methods, images, conformal mappings, and residue calculus are therefore useful tools.

**Method note.** Images enforce selected boundaries through symmetry. Conformal mapping transfers an analytic potential to another domain; the chain rule transforms velocity. For a map $z=z(\zeta)$,

$$
\frac{dW}{dz}=\frac{dW/d\zeta}{dz/d\zeta}.
$$

These observations explain the available methods; no specific airfoil mapping or residue-based force derivation is needed for the elementary solutions below.

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

The origin is singular. Circulation is $\Gamma$ around a counterclockwise loop enclosing it, even though local vorticity vanishes away from it.

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

### 5.1 Kutta-Joukowski lift theorem

**Theorem (Kutta-Joukowski).** For the steady two-dimensional ideal-flow model with a uniform far field, lift per unit span has magnitude

$$
\boxed{|F_L'|=\rho U|\Gamma|.}
$$

With positive counterclockwise $\Gamma$ and $\boldsymbol\Gamma=\Gamma\mathbf k$, the force on the body is

$$
\mathbf F'=\rho\mathbf U\times\boldsymbol\Gamma.
$$

For $\mathbf U=U\mathbf i$, this gives $F_y'=-\rho U\Gamma$. Clockwise-positive circulation instead gives the scalar upward-lift formula $F_y'=\rho U\Gamma_{\mathrm{cw}}$.

### 5.2 The Kutta condition and starting vortex

An airfoil can support a family of ideal-flow solutions with different circulations. The **Kutta condition** selects the circulation for which flow leaves a sharp trailing edge smoothly with finite velocity.

During startup, a starting vortex and bound circulation of opposite signs develop. This connects the circulation picture with Kelvin's theorem, while recognizing that viscous processes near the body participate in establishing the motion.

Airfoil shape changes the pressure distribution and lift coefficient. Finite-span wings involve additional three-dimensional effects, so a two-dimensional lift-per-span result is not a complete finite-wing model. These topics are qualitative here; no particular airfoil shape, finite-span correction, or numerical example is assumed.

### 5.3 Blade-cascade force components

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
