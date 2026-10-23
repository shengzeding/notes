---
title: Viscous Internal Flow
order: 8
---


# Incompressible Viscous Internal Flow


## 1. Entrance Flow and Fully Developed Motion

At a pipe entrance, no slip creates wall boundary layers that grow inward. Once they meet and the velocity profile stops changing with streamwise position, the flow is **fully developed**. Pressure can continue to fall even though the profile no longer changes.

Entrance length is not fixed by geometry alone. It depends on Reynolds number, inlet conditions, disturbances, and the chosen criterion for a developed profile, and is usually estimated from empirical correlations. Entrance-region loss may be represented as developed-flow friction plus an additional entrance loss. Fully developed formulas should not silently be applied to the entire entrance region.

---

## 2. Laminar Flow Between Parallel Plates

### 2.1 Plane Poiseuille flow

Assume steady, fully developed, incompressible Newtonian flow with $u=u(y)$ between stationary plates at $y=0$ and $y=b$. Neglect gravity or absorb a conservative streamwise contribution into modified pressure. The equations reduce to

$$
\frac{dp}{dx}=\mu\frac{d^2u}{dy^2},
\qquad \frac{\partial p}{\partial y}=0.
$$

**Proposition (Plane Poiseuille profile).** With $u(0)=u(b)=0$,

$$
\boxed{u(y)=\frac1{2\mu}\frac{dp}{dx}(y^2-by).}
$$

For flow in $+x$, $dp/dx<0$, so the velocity is positive between the plates. The maximum occurs at $y=b/2$:

$$
u_{\max}=-\frac{b^2}{8\mu}\frac{dp}{dx}.
$$

The shear stress is linear,

$$
\tau_{xy}=\mu\frac{du}{dy}
=\frac{dp}{dx}\left(y-\frac b2\right),
\qquad |\tau_w|=\frac b2\left|\frac{dp}{dx}\right|.
$$

Integration across the gap gives

$$
\boxed{Q'=-\frac{b^3}{12\mu}\frac{dp}{dx},
\qquad V=\frac{Q'}b=-\frac{b^2}{12\mu}\frac{dp}{dx}
=\frac23u_{\max}.}
$$

The ratio $2/3$ is specific to plane Poiseuille flow; a circular pipe has ratio $1/2$.

### 2.2 Plane Couette-Poiseuille flow

If the upper plate moves with speed $U$ and the lower plate remains at rest, use $u(0)=0$, $u(b)=U$:

$$
\boxed{u(y)=\frac Ub y
+\frac1{2\mu}\frac{dp}{dx}(y^2-by).}
$$

This is the superposition of plate-driven Couette flow and pressure-driven Poiseuille flow. A favorable pressure gradient reinforces the plate motion; a sufficiently adverse gradient can cause reverse flow near the stationary wall.

**Example (Reverse-flow threshold).** For $U>0$,

$$
u'(0)=\frac Ub-\frac b{2\mu}\frac{dp}{dx}.
$$

Thus near-wall reverse flow appears when $dp/dx>2\mu U/b^2$. With $dp/dx=0$, the profile is the linear Couette solution $u=Uy/b$.

---

## 3. Laminar Flow in a Circular Pipe

### 3.1 Stress and velocity profile

Let a fully developed flow be driven through a horizontal circular pipe by

$$
G=-\frac{dp}{dx}=\frac{\Delta p}{l}>0.
$$

A force balance on a cylindrical core gives the resisting-shear magnitude

$$
\tau(r)=\frac G2r,
\qquad \tau_w=\frac G2R.
$$

Using $\tau=-\mu\,du/dr$ and no slip at $r=R$ yields

$$
\boxed{u(r)=\frac G{4\mu}(R^2-r^2).}
$$

Hence

$$
u_{\max}=\frac{GR^2}{4\mu},
\qquad V=\frac12u_{\max}=\frac{GR^2}{8\mu}.
$$

### 3.2 Hagen-Poiseuille law and head loss

Integrating with $dA=2\pi r\,dr$ gives

$$
\boxed{Q=\frac{\pi GR^4}{8\mu}
=\frac{\pi R^4}{8\mu}\frac{\Delta p}{l}.}
$$

The assumptions are steady, laminar, fully developed flow of an incompressible Newtonian fluid in a straight circular pipe with no slip. For the horizontal case,

$$
\boxed{h_f=\frac{\Delta p}{\rho g}
=\frac{32\mu l}{\rho gd^2}V.}
$$

In an inclined pipe, the driving pressure difference must include elevation effects; the friction loss is the drop in piezometric head for constant mean speed.

---

## 4. Turbulent Pipe Flow

### 4.1 Reynolds averaging and turbulent stress

Write instantaneous velocity as mean plus fluctuation:

$$
u=\overline u+u',\qquad v=\overline v+v',
\qquad \overline{u'}=\overline{v'}=0.
$$

Averaging the momentum equation introduces **Reynolds stresses**, including $-\rho\overline{u'v'}$. These represent momentum transport by fluctuations.

For a local coordinate $y$ measured from the wall into the fluid, the shear component associated with the streamwise mean gradient is

$$
\tau_{xy}^{\mathrm{total}}
=\underbrace{\mu\frac{d\overline u}{dy}}_{\tau_l}
\underbrace{-\rho\overline{u'v'}}_{\tau_t}.
$$

**Sign qualification.** If a radius $r$ increasing toward the wall is used instead, the positive resisting-shear magnitude is

$$
\tau_{\mathrm{resist}}=-\mu\frac{d\overline u}{dr}
+\rho\overline{u'v_r'}.
$$

The signs of both the derivative and the fluctuation component must follow the chosen coordinate. A formula combining a radial derivative convention with wall-distance fluctuations is ambiguous.

### 4.2 Mixing length and the logarithmic law

The near-wall structure is commonly divided into a viscous sublayer, a transition or buffer region, and a turbulent core. In the mixing-length approximation,

$$
\tau_t=\rho l_m^2
\left|\frac{d\overline u}{dy}\right|
\frac{d\overline u}{dy}.
$$

For a positive wall-normal gradient this reduces to the squared-gradient form

$$
\tau_t=\rho l_m^2\left(\frac{d\overline u}{dy}\right)^2,
\qquad l_m=\kappa y.
$$

Define friction velocity and wall coordinate by

$$
u_* =\sqrt{\frac{\tau_w}{\rho}},
\qquad y^+=\frac{yu_*}{\nu}.
$$

In the overlap region, experiments support a logarithmic mean-velocity profile expressed in wall units. Its constants and range of validity are empirical, and the relation does not extend to the wall. Power-law profiles are another convenient empirical approximation for section averages, but they should not be differentiated at the wall to calculate wall stress.

---

## 5. Pipe Losses and Friction Factors

<span id="internal-flow-regimes"></span>

### 5.1 Darcy-Weisbach equation

For a developed-flow pipe segment,

$$
\boxed{h_f=\lambda\frac ld\frac{V^2}{2g},
\qquad \lambda=F\left(\mathrm{Re},\frac\varepsilon d\right).}
$$

Here $\varepsilon$ is equivalent roughness and $\mathrm{Re}=Vd/\nu$. The Darcy friction factor is four times the Fanning factor.

For circular laminar flow, the friction factor follows directly from the Hagen-Poiseuille solution and varies inversely with Reynolds number. Transition occupies a range rather than a universal threshold.

### 5.2 Turbulent correlations

In turbulent flow, $\lambda$ must be obtained from an empirical correlation or chart. It depends on Reynolds number and relative roughness, with distinct smooth-pipe, transitional-roughness, and fully rough behavior. Some correlations are implicit because the friction factor appears on both sides.

The correlation must match the Darcy or Fanning convention, the roughness definition, and the applicable flow regime. A turbulent smooth-to-rough correlation does not describe laminar-to-turbulent transition.

### 5.3 Using a friction correlation

A pipe-flow calculation couples velocity, Reynolds number, friction factor, and head loss. If flow rate or diameter is unknown, these quantities generally require a consistent solution of the energy balance together with an appropriate empirical friction relation. The result should be checked against that relation's stated regime and assumptions.

---

## 6. Minor Losses, Networks, and Non-Circular Ducts

### 6.1 Local losses and their velocity references

Entrances, exits, expansions, contractions, bends, branches, valves, separation, and profile redistribution cause local losses represented by

$$
\boxed{h_m=K\frac{V_{\mathrm{ref}}^2}{2g}.}
$$

The coefficient and reference velocity form a pair. Values for entrances, exits, expansions, contractions, bends, branches, and valves depend on geometry and operating conditions. They must be taken from an appropriate empirical source that states the velocity reference and coefficient convention.

### 6.2 Piping systems

Add losses using the velocity appropriate to each segment or fitting:

$$
\boxed{h_L=\sum_i\lambda_i\frac{l_i}{d_i}\frac{V_i^2}{2g}
+\sum_jK_j\frac{V_{\mathrm{ref},j}^2}{2g}.}
$$

Combine this with continuity and the extended Bernoulli equation. Series sections have the same volume flow for steady incompressible motion; a network also requires flow conservation at each junction and consistent head differences along alternative paths.

### 6.3 Hydraulic radius and hydraulic diameter

For cross-sectional area $A$ and wetted perimeter $P_w$, define

$$
\boxed{r_h=\frac A{P_w},\qquad d_h=4r_h.}
$$

The hydraulic-diameter approximation uses

$$
\mathrm{Re}_{d_h}=\frac{Vd_h}{\nu},
\qquad
h_f=\lambda\frac l{d_h}\frac{V^2}{2g},
\qquad \frac\varepsilon{d_h}.
$$

A Reynolds-number threshold borrowed from circular pipes is only a rough guide for non-circular ducts. Geometry matters, especially for very slender sections and laminar flow. Circular-pipe friction relations do not become exact for an arbitrary duct merely by replacing $d$ with $d_h$.

---

## 7. Uniform Open-Channel Flow

### 7.1 Uniform-flow resistance

An open channel has a free surface at atmospheric pressure. For a shallow-slope, gradually varied flow, pressure is approximately hydrostatic. Steady uniform flow has constant section geometry and mean speed, so

$$
Q=VA=\mathrm{constant},
\qquad z_1-z_2=h_f.
$$

Mean speed is related to energy slope and hydraulic radius through empirical resistance laws such as the Chezy or Manning relation. Their coefficients encode roughness and must be selected for the channel and unit convention; they are not determined by the conservation laws alone. The free surface is not part of the wetted perimeter.

### 7.2 Specific energy and critical flow

For a rectangular channel, let $h$ be depth and $q=Vh$ the discharge per unit width. Taking the kinetic-energy correction as unity,

$$
\boxed{E=h+\frac{V^2}{2g}
=h+\frac{q^2}{2gh^2}.}
$$

The depth-based Froude number is

$$
\mathrm{Fr}^2=\frac{V^2}{gh}.
$$

Subcritical or tranquil flow has $\mathrm{Fr}<1$; supercritical or rapid flow has $\mathrm{Fr}>1$; critical flow has $\mathrm{Fr}=1$.

**Derivation (Critical depth).** At fixed $q$,

$$
\frac{dE}{dh}=1-\frac{q^2}{gh^3}=1-\mathrm{Fr}^2.
$$

Thus minimum specific energy occurs at

$$
h_c=\left(\frac{q^2}{g}\right)^{1/3},
\qquad E_{\min}=\frac32h_c.
$$

This is a direct consequence of the specific-energy relation and clarifies the meaning of critical flow.
