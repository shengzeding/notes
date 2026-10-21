---
title: Differential Conservation Laws
order: 3
---


# Differential Conservation Laws


## 1. Conservation of Mass

### 1.1 Eulerian and material forms

**Proposition (Continuity equation).** Local mass conservation is

$$
\boxed{\frac{\partial\rho}{\partial t}+\nabla\cdot(\rho\mathbf v)=0.}
$$

Expanding the divergence gives the equivalent material form,

$$
\boxed{\frac{D\rho}{Dt}+\rho\nabla\cdot\mathbf v=0,}
\qquad
\nabla\cdot\mathbf v=-\frac1\rho\frac{D\rho}{Dt}.
$$

Thus a material element expands when its density decreases. This agrees with differentiating its constant mass $\rho\mathcal V$.

### 1.2 Incompressibility

For incompressible motion, $D\rho/Dt=0$, hence

$$
\boxed{\nabla\cdot\mathbf v=0.}
$$

A globally constant density satisfies this condition, but incompressibility alone does not require all particles to have the same density.

---

## 2. Forces and Stress

### 2.1 Body forces and surface forces

A body force acts throughout the volume:

$$
d\mathbf F_b=\rho\mathbf f\,d\mathcal V.
$$

For gravity, $\mathbf f=-g\mathbf k$. Contact forces instead act across surfaces. The traction on a plane with normal $\mathbf n$ is

$$
\mathbf t(\mathbf n)=\boldsymbol\sigma\mathbf n,
\qquad
\boldsymbol\sigma=-p\mathbf I+\boldsymbol\tau.
$$

Here $-p\mathbf I$ is the isotropic pressure contribution and $\boldsymbol\tau$ is the viscous stress. In a static fluid, viscous shear vanishes and the stress is purely $-p\mathbf I$.

### 2.2 The general momentum equation

Newton's second law gives

$$
\boxed{\rho\frac{D\mathbf v}{Dt}
=\rho\mathbf f+\nabla\cdot\boldsymbol\sigma
=\rho\mathbf f-\nabla p+\nabla\cdot\boldsymbol\tau.}
$$

This equation is a balance law, not yet a complete fluid model. A constitutive relation is needed to connect stress with deformation rate.

---

## 3. Newtonian Stress and the Navier-Stokes Equations

### 3.1 The constitutive relation

For an isotropic Newtonian fluid,

$$
\boldsymbol\tau=2\mu\mathbf D+\lambda_v(\nabla\cdot\mathbf v)\mathbf I,
\qquad
\mathbf D=\frac12\left[\nabla\mathbf v+(\nabla\mathbf v)^{\mathsf T}\right].
$$

The symbol $\lambda_v$ is a second viscosity coefficient, not the Darcy friction factor. Under **Stokes' hypothesis**, $\lambda_v=-2\mu/3$, representative components are

$$
\begin{aligned}
\sigma_{xx}&=-p+2\mu\frac{\partial u}{\partial x}
-\frac23\mu\nabla\cdot\mathbf v,\\
\tau_{xy}&=\mu\left(\frac{\partial v}{\partial x}+\frac{\partial u}{\partial y}\right),\\
\tau_{xz}&=\mu\left(\frac{\partial w}{\partial x}+\frac{\partial u}{\partial z}\right),\\
\tau_{yz}&=\mu\left(\frac{\partial w}{\partial y}+\frac{\partial v}{\partial z}\right).
\end{aligned}
$$

The other normal components follow by cyclic interchange. Stokes' hypothesis is an additional assumption for compressible motion; its divergence term vanishes in incompressible flow.

### 3.2 Constant-property incompressible flow

For homogeneous incompressible flow with constant $\rho$ and $\mu$,

$$
\boxed{\rho\left[\frac{\partial\mathbf v}{\partial t}
+(\mathbf v\cdot\nabla)\mathbf v\right]
=\rho\mathbf f-\nabla p+\mu\nabla^2\mathbf v,}
$$

$$
\boxed{\nabla\cdot\mathbf v=0.}
$$

The terms express inertia balanced by body force, pressure force, and viscous force. Three momentum equations and continuity determine the four fields $u,v,w,p$, subject to compatible boundary and initial conditions.

Neglecting viscous stress gives the **Euler equation**,

$$
\rho\frac{D\mathbf v}{Dt}=\rho\mathbf f-\nabla p.
$$

### 3.3 Boundary and initial conditions

| Boundary or setting | Typical condition |
|---|---|
| Viscous impermeable solid | $\mathbf v=\mathbf v_{\mathrm{wall}}$ |
| Inviscid impermeable solid | $\mathbf n\cdot\mathbf v=\mathbf n\cdot\mathbf v_{\mathrm{wall}}$ |
| External far field | $\mathbf v\to\mathbf v_\infty$, $p\to p_\infty$ |
| Inlet or outlet | Compatible prescribed velocity or pressure data |
| Idealized free surface | Atmospheric normal pressure and negligible tangential shear |
| Unsteady flow | Compatible initial velocity and any independently evolving material fields |

**Important qualification.** The simplified free-surface condition $p=p_a$ neglects capillary pressure and relevant viscous normal-stress corrections. A moving free surface also requires a kinematic condition. In incompressible flow, pressure enforces continuity and is not generally an arbitrary independent initial field.

---

## 4. Example: A Gravity-Driven Viscous Film

### 4.1 Geometry and reduced equations

Consider a steady, fully developed film of thickness $h$ flowing down a plane inclined at angle $\theta$ to the horizontal. Let $x$ point downslope and $y$ outward from the wall. Assume an incompressible Newtonian fluid, constant properties, negligible gas shear, and a flat free surface at atmospheric pressure.

With $\mathbf v=(u(y),0,0)$ and gauge pressure $p_g=p-p_a$,

$$
\frac{dp_g}{dy}=-\rho g\cos\theta,
\qquad
\mu\frac{d^2u}{dy^2}=-\rho g\sin\theta.
$$

The boundary conditions are

$$
u(0)=0,\qquad u'(h)=0,\qquad p_g(h)=0.
$$

### 4.2 Pressure, velocity, shear, and discharge

Integrating gives

$$
\boxed{p_g(y)=\rho g(h-y)\cos\theta,}
$$

$$
\boxed{u(y)=\frac{g\sin\theta}{\nu}
\left(hy-\frac{y^2}{2}\right),}
$$

$$
\tau_{xy}(y)=\mu\frac{du}{dy}
=\rho g(h-y)\sin\theta.
$$

The discharge per unit width is

$$
\boxed{Q'=\int_0^h u(y)\,dy
=\frac{g\sin\theta}{3\nu}h^3.}
$$

Pressure and shear are linear in $y$, velocity is quadratic, and discharge scales with $h^3$. Checking $u(0)=0$ and $u'(h)=0$ is a quick way to catch integration-sign errors.

---

## 5. Pressure as a Field

### 5.1 Static pressure

At rest in a homogeneous fluid under gravity,

$$
\frac{\partial p}{\partial x}=0,
\qquad \frac{\partial p}{\partial y}=0,
\qquad \frac{\partial p}{\partial z}=-\rho g.
$$

Hence $p=-\rho gz+C$, or $p=p_0+\rho gh$ at depth $h$ below a free surface of pressure $p_0$. The full treatment of manometers, equilibrium, and pressure forces appears in [Fluid Equilibrium](06_Fluid_Equilibrium.md).

### 5.2 Pressure in moving flow

In motion, acceleration and viscous stress modify the pressure distribution. A useful nondimensional measure is

$$
\boxed{C_p=\frac{p-p_0}{\tfrac12\rho q_0^2},}
$$

where $p_0,q_0$ are specified reference values, often the free-stream pressure and speed. This is a definition; determining $p$ still requires the governing equations and boundary conditions.
