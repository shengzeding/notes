---
title: Boundary Layers
order: 9
---


# Boundary Layers, External Drag, and Free Jets



## 1. The Boundary-Layer Approximation

### 1.1 Why a thin viscous region appears

At large Reynolds number, an attached external flow can have a thin region near the wall in which viscosity remains important. The outer region is often approximately inviscid. In separated flows and wakes, important viscous and turbulent effects are not confined to a thin attached wall layer.

Balancing streamwise inertia with transverse viscous diffusion gives

$$
\rho U\frac Ul\sim\mu\frac U{\delta^2},
\qquad
\boxed{\frac\delta l\sim\frac1{\sqrt{\mathrm{Re}_l}}.}
$$

For a laminar flat-plate layer,

$$
\delta(x)\sim\sqrt{\frac{\mu x}{\rho U}}
=\sqrt{\frac{\nu x}{U}}.
$$

A quoted transition scale is $\mathrm{Re}_{x,\mathrm{cr}}\approx3.2\times10^5$; an order-of-magnitude estimate around $5\times10^5$ is also common. Transition depends on disturbances, roughness, and pressure gradient, so these values are approximate.

### 1.2 Thickness measures

The nominal thickness $\delta$ often satisfies $u(\delta)\approx0.99U$.

**Definition (Displacement thickness).**

$$
\boxed{\delta^*=\int_0^\infty\left(1-\frac uU\right)dy.}
$$

It measures the equivalent displacement associated with the mass-flow deficit. The **momentum thickness** is

$$
\boxed{\theta=\int_0^\infty\frac uU
\left(1-\frac uU\right)dy.}
$$

For a nontrivial attached profile with $0\le u/U\le1$, $\theta<\delta^*$. This inequality should not be generalized without checking profiles with reverse flow or overshoot.

### 1.3 Example: a sine profile

Suppose

$$
\frac uU=\sin\left(\frac{\pi y}{2\delta}\right)
\quad(0\le y\le\delta),
\qquad u=U\quad(y>\delta).
$$

With $\eta=y/\delta$,

$$
\begin{aligned}
\frac{\delta^*}\delta
&=\int_0^1\left[1-\sin\left(\frac{\pi\eta}{2}\right)\right]d\eta
=1-\frac2\pi,\\
\frac\theta\delta
&=\int_0^1\left[\sin\left(\frac{\pi\eta}{2}\right)
-\sin^2\left(\frac{\pi\eta}{2}\right)\right]d\eta
=\frac2\pi-\frac12.
\end{aligned}
$$

Therefore

$$
\boxed{\delta^*\approx0.3634\delta,
\qquad \theta\approx0.1366\delta.}
$$

---

## 2. Prandtl's Boundary-Layer Equations

### 2.1 Governing equations

For steady, two-dimensional, incompressible laminar flow with constant properties and negligible relevant body-force terms,

$$
\boxed{\frac{\partial u}{\partial x}+\frac{\partial v}{\partial y}=0,}
$$

$$
\boxed{\rho\left(u\frac{\partial u}{\partial x}
+v\frac{\partial u}{\partial y}\right)
=-\frac{\partial p}{\partial x}
+\mu\frac{\partial^2u}{\partial y^2},
\qquad \frac{\partial p}{\partial y}=0.}
$$

The last relation is a leading-order approximation: pressure is nearly constant across the thin layer and is imposed by the outer flow. The inviscid outer momentum equation gives

$$
\boxed{\frac{dp}{dx}=-\rho U\frac{dU}{dx}.}
$$

For a stationary impermeable plate, $u=v=0$ at $y=0$ and $u\to U(x)$ outside the layer. A turbulent mean-flow version requires Reynolds-stress transport in addition to molecular viscosity.

### 2.2 What the approximation retains

The layer is thin, so transverse velocity gradients dominate streamwise viscous gradients. The transverse velocity is small relative to $u$, but the convective term $v\,\partial u/\partial y$ remains of the same order as $u\,\partial u/\partial x$. Dropping $v$ from continuity or inertia would therefore destroy the leading-order balance.

---

## 3. Blasius' Laminar Flat-Plate Solution

### 3.1 Similarity transformation

For constant outer speed $U$ and zero pressure gradient, introduce

$$
\eta=y\sqrt{\frac U{\nu x}},
\qquad \psi=\sqrt{\nu Ux}\,f(\eta),
$$

with $u=\partial\psi/\partial y$ and $v=-\partial\psi/\partial x$. Then

$$
u=Uf'(\eta),
\qquad
v=\frac12\sqrt{\frac{\nu U}{x}}\,[\eta f'(\eta)-f(\eta)].
$$

Substitution reduces the field equations to

$$
\boxed{2f'''+ff''=0,}
$$

$$
f(0)=0,\qquad f'(0)=0,\qquad f'(\infty)=1.
$$

The first two conditions impose impermeability and no slip; the last matches the outer flow.

### 3.2 Thickness and skin friction

Numerical solution gives $f''(0)\approx0.3321$. The resulting practical formulas are

$$
\boxed{\frac\delta x\approx\frac{5.0}{\sqrt{\mathrm{Re}_x}},}
$$

$$
\tau_w=0.332U\sqrt{\frac{\rho\mu U}{x}},
\qquad
\boxed{C_f(x)=\frac{\tau_w}{\tfrac12\rho U^2}
=\frac{0.664}{\sqrt{\mathrm{Re}_x}}.}
$$

The mean friction-drag coefficient over a plate of length $l$ is

$$
\boxed{C_{Df}=\frac1l\int_0^l C_f(x)\,dx
=\frac{1.328}{\sqrt{\mathrm{Re}_l}}.}
$$

For width $b$, the one-side drag is $F_{Df}=\tfrac12\rho U^2(bl)C_{Df}$. If both sides are equally wetted, account for both sides consistently in force and reference area.

---

## 4. The Karman Momentum-Integral Method

### 4.1 Momentum deficit and drag

For a zero-pressure-gradient flat plate with constant $U$, drag per unit width accumulated from the leading edge to $x$ is

$$
\boxed{D'(0,x)=\rho U^2\theta(x).}
$$

This form assumes negligible initial momentum thickness. Differentiation gives

$$
\boxed{\tau_w=\rho U^2\frac{d\theta}{dx},
\qquad C_f=2\frac{d\theta}{dx}.}
$$

For a varying outer speed,

$$
\boxed{\tau_w=\rho\frac{d(U^2\theta)}{dx}
+\rho\delta^*U\frac{dU}{dx}.}
$$

The integral method replaces the full pointwise problem with a momentum balance plus a plausible velocity-profile shape.

### 4.2 General trial-profile calculation

Let $u/U=g(\eta)$, where $\eta=y/\delta$, and let $g(0)=0$, $g(1)=1$. Define

$$
A_g=\int_0^1g(1-g)\,d\eta,
\qquad B_g=g'(0).
$$

These constants are sometimes denoted $\alpha,\beta$; the notation $A_g,B_g$ avoids confusion with section energy and momentum correction factors.

Then

$$
\theta=A_g\delta,
\qquad \tau_w=\mu U\frac{B_g}{\delta}.
$$

Substitute into the zero-pressure-gradient momentum equation and integrate with $\delta(0)=0$:

$$
\boxed{\frac\delta x
=\sqrt{\frac{2B_g}{A_g}}\frac1{\sqrt{\mathrm{Re}_x}},}
$$

$$
\boxed{C_f=\frac{\sqrt{2A_gB_g}}{\sqrt{\mathrm{Re}_x}},
\qquad C_{Df}=\frac{\sqrt{8A_gB_g}}{\sqrt{\mathrm{Re}_l}}.}
$$

**Example (Reusing the sine profile).** Here $A_g=2/\pi-1/2$ and $B_g=\pi/2$, giving

$$
\frac\delta x\approx\frac{4.795}{\sqrt{\mathrm{Re}_x}},
\qquad C_f\approx\frac{0.6551}{\sqrt{\mathrm{Re}_x}},
\qquad C_{Df}\approx\frac{1.310}{\sqrt{\mathrm{Re}_l}}.
$$

These values are close to the Blasius results without solving the differential equation numerically.

---

## 5. Turbulent Flat-Plate Correlations

For a smooth plate with an approximately fully turbulent, zero-pressure-gradient boundary layer, useful empirical relations are

$$
\boxed{\frac\delta x=\frac{0.382}{\mathrm{Re}_x^{1/5}},
\qquad C_f=\frac{0.0593}{\mathrm{Re}_x^{1/5}},
\qquad C_{Df}=\frac{0.074}{\mathrm{Re}_l^{1/5}}.}
$$

Another smooth-plate mean-drag correlation is

$$
C_{Df}=\frac{0.455}{(\log_{10}\mathrm{Re}_l)^{2.58}},
\qquad \mathrm{Re}_l<10^9,
$$

within its turbulent applicability range. For a fully rough turbulent plate,

$$
\boxed{C_{Df}=
\left[1.89-1.62\log_{10}\left(\frac\varepsilon l\right)\right]^{-2.5}.}
$$

**Important qualification.** These are empirical models, not universal laws. A plate with a substantial laminar starting region needs treatment of transition; simply applying a fully turbulent mean correlation from the leading edge changes the predicted total drag. Surface roughness and pressure gradient also affect applicability.

---

## 6. Pressure Gradient, Separation, and Drag

### 6.1 Favorable and adverse pressure gradients

A favorable gradient, $dp/dx<0$, accelerates the outer flow. An adverse gradient, $dp/dx>0$, decelerates it. Near-wall fluid has relatively little momentum and may stop and reverse under an adverse gradient.

In the classical steady two-dimensional boundary-layer setting, separation onset is associated with

$$
\boxed{\left.\frac{\partial u}{\partial y}\right|_w=0
\quad\Longleftrightarrow\quad\tau_w=0.}
$$

Viscosity creates the low-momentum wall layer; an adverse pressure gradient drives the classical separation mechanism; reversed near-wall flow develops downstream. A zero-shear point alone is not a universal separation test for arbitrary unsteady or three-dimensional flow.

### 6.2 Skin-friction and pressure drag

Total drag is decomposed as

$$
F_D=F_{Df}+F_{Dp},
\qquad
\boxed{F_D=\frac12\rho U^2C_DA.}
$$

Here $F_{Df}$ is skin-friction drag and $F_{Dp}$ is pressure or form drag. State the reference area $A$: wetted planform area is commonly used for plate friction, while projected frontal area is often used for bluff-body drag.

Separation changes the pressure distribution and can create substantial form drag. Streamlining delays separation and reduces wake size, thereby reducing pressure drag.

### 6.3 Cylinders, spheres, and vortex shedding

For a circular cylinder, drag coefficient and wake structure depend strongly on Reynolds number. Transition of the boundary layer can shift separation and produce a **drag crisis**. Alternating vortex shedding forms a Karman vortex street.

A representative range quoted for clear periodic cylinder shedding is

$$
60\lesssim\mathrm{Re}\lesssim5000.
$$

This is an approximate illustrative range, not an assertion that all shedding ceases outside it. The frequency is described by

$$
\boxed{\mathrm{St}=\frac{fD}{U},}
$$

where $f$ is ordinary shedding frequency. If angular frequency is used instead, $\omega D/U=2\pi\mathrm{St}$.

A sphere also exhibits a drag crisis, with a representative scale near $\mathrm{Re}\approx3\times10^5$. The precise behavior depends on surface condition and incoming disturbances; no universal numerical drag curve is implied here.

---

## 7. Free Turbulent Jets

### 7.1 Thin-shear-layer structure and similarity

A plane free turbulent jet is another thin-shear-layer problem. Its transverse scale is small relative to its streamwise scale, transverse velocity gradients dominate longitudinal gradients, and the transverse pressure gradient is negligible to leading order.

In the established main region, the jet spreads approximately linearly, streamwise momentum flux is conserved, and suitably normalized velocity profiles become self-similar. A representative outer-boundary fit is

$$
y_{\mathrm{edge}}\approx\pm0.22x.
$$

Equivalently, the positive half-width is $b\approx0.22x$. This empirical edge width need not coincide with a half-maximum width or another profile-based definition.

### 7.2 Eddy-viscosity profile and momentum conservation

A similarity profile is

$$
\eta=\sigma_j\frac yx,\qquad \sigma_j\approx7.67,
$$

$$
\boxed{\frac{u}{u_m}=1-\tanh^2\eta
=\operatorname{sech}^2\eta.}
$$

The coefficient $\sigma_j$ is a jet-spreading parameter, not surface tension. The centerline speed is $u_m$.

For a uniform inlet speed $u_0$ over area $A_0$, the mean-profile momentum model is

$$
\boxed{\rho u_0^2A_0=\int_A\rho u^2\,dA.}
$$

For the idealized plane jet, interpret this per unit span and integrate across $y$. The model neglects corrections such as streamwise fluctuation momentum and nonuniform pressure contributions.

**Derivation (Centerline decay).** For the stated profile,

$$
J=\rho\int_{-\infty}^{\infty}u^2dy
=\rho u_m^2\frac{x}{\sigma_j}
\int_{-\infty}^{\infty}\operatorname{sech}^4\eta\,d\eta
=\frac{4\rho u_m^2x}{3\sigma_j}.
$$

Constant $J$ therefore gives $u_m\propto x^{-1/2}$ while the width grows as $x$. The similarity profile and conserved momentum determine this decay once the spreading parameter is supplied; momentum conservation alone does not independently determine the spreading constant.
