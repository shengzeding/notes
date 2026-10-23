---
title: Control Volumes, Bernoulli's Eqn., and Momentum
order: 4
---

# Control Volumes, Bernoulli's Equation, and Momentum


## 1. Reynolds Transport Theorem

### 1.1 From a material system to a control volume

A **system** consists of the same material particles. A **control volume** is a chosen region through whose boundary fluid may pass.

**Theorem (Reynolds transport theorem).** Let $N$ be an extensive property and $\eta$ its amount per unit volume. For a fixed control volume,

$$
\boxed{\frac{DN_{\mathrm{sys}}}{Dt}
=\frac{\partial}{\partial t}\int_{\mathrm{CV}}\eta\,d\mathcal V
+\int_{\mathrm{CS}}\eta(\mathbf v\cdot\mathbf n)\,dA.}
$$

The first term is accumulation inside the control volume; the second is net outward transport. In steady flow the accumulation term vanishes. Choosing a control volume with simple inlet and outlet profiles can greatly simplify the flux integrals.

### 1.2 Moving and deforming control volumes

If the boundary velocity is $\mathbf v_{\mathrm{CS}}$, its through-surface velocity is

$$
\mathbf v_r=\mathbf v-\mathbf v_{\mathrm{CS}}.
$$

The general form is

$$
\frac{DN_{\mathrm{sys}}}{Dt}
=\frac{d}{dt}\int_{\mathrm{CV}(t)}\eta\,d\mathcal V
+\int_{\mathrm{CS}(t)}\eta(\mathbf v_r\cdot\mathbf n)\,dA.
$$

The derivative now acts on an integral over a moving region. For momentum measured in the original inertial frame, the transported momentum remains $\rho\mathbf v$; only the crossing velocity becomes $\mathbf v_r$.

---

<span id="control-volume-mass-conservation"></span>

## 2. Integral Mass Conservation

Set $\eta=\rho$ and use conservation of system mass:

$$
\boxed{\frac{\partial}{\partial t}\int_{\mathrm{CV}}\rho\,d\mathcal V
+\int_{\mathrm{CS}}\rho(\mathbf v\cdot\mathbf n)\,dA=0.}
$$

Net mass outflow equals the rate of decrease of mass inside the control volume. For steady, one-dimensional sections,

$$
\sum_{\mathrm{in}}\dot m=\sum_{\mathrm{out}}\dot m,
\qquad
(\rho VA)_1=(\rho VA)_2
$$

for a single inlet and outlet. With the same constant density throughout,

$$
\boxed{\sum_{\mathrm{in}}Q=\sum_{\mathrm{out}}Q,
\qquad V_1A_1=V_2A_2.}
$$

For a moving control volume, use the moving-volume derivative and relative crossing velocity from Section 1.2.

---

## 3. Bernoulli's Equation and Hydraulic Head

<span id="streamline-bernoulli"></span>

### 3.1 Along a streamline

**Theorem (Steady Bernoulli equation).** In steady, inviscid, incompressible flow under gravity,

$$
\boxed{\frac{q^2}{2}+gz+\frac p\rho
=\text{constant along a streamline}.}
$$

The terms are kinetic, gravitational potential, and pressure energy per unit mass. Between two points on that streamline,

$$
\frac{q_1^2}{2}+gz_1+\frac{p_1}{\rho}
=\frac{q_2^2}{2}+gz_2+\frac{p_2}{\rho}.
$$

*Derivation.* Project Euler's equation along the streamline and integrate

$$
q\,dq+g\,dz+\frac{dp}{\rho}=0.
$$

For constant density, $\int dp/\rho=p/\rho$. $\square$

For a barotropic compressible fluid, retain $\int dp/\rho(p)$ in place of $p/\rho$. In irrotational flow under the same force assumptions, the Bernoulli constant can be common to the connected flow field.

**Important qualification.** Steadiness alone does not make Bernoulli valid across arbitrary streamlines, and a viscous flow with appreciable losses cannot be treated as lossless.

### 3.2 Total-flow form and section pressure

For approximately unidirectional, gradually varied sections, the mechanical-energy head is

$$
H=\alpha\frac{V^2}{2g}+z+\frac p{\rho g}.
$$

Here $\alpha$ accounts for the velocity profile. A nearly hydrostatic section has approximately constant piezometric head $z+p/(\rho g)$ across the section. In the lossless case without shaft work,

$$
\alpha_1\frac{V_1^2}{2}+gz_1+\frac{p_1}{\rho}
=\alpha_2\frac{V_2^2}{2}+gz_2+\frac{p_2}{\rho}.
$$

Curvature can invalidate a hydrostatic section approximation. If $n$ points **away from the center of curvature**, and gravity in that direction is neglected,

$$
\frac{\partial p}{\partial n}=\rho\frac{q^2}{R}.
$$

Pressure increases away from the curvature center. Choosing the inward normal reverses the sign.

### 3.3 Head losses and mechanical work

For local flow, $q^2/(2g)$, $z$, and $p/(\rho g)$ are velocity head, elevation head, and pressure head. For total flow, use $\alpha V^2/(2g)$.

The useful extended form is

$$
\boxed{H_1+h_p=H_2+h_t+h_L,}
$$

where $h_p$ is pump head added, $h_t$ is turbine head removed, and $h_L\ge0$ is loss in the flow direction. In a passive conduit, $H_1=H_2+h_L$. Pump and turbine terms are included here to make the bookkeeping explicit; the loss formulas are developed in [Internal Flow](08_Viscous_Internal_Flow.md).

### 3.4 Unsteady Bernoulli equation

For inviscid, incompressible flow, project the local acceleration on an instantaneous streamline. Then

$$
\boxed{\frac{q_1^2}{2}+gz_1+\frac{p_1}{\rho}
=\frac{q_2^2}{2}+gz_2+\frac{p_2}{\rho}
+\int_1^2\frac{\partial\mathbf v}{\partial t}\cdot d\mathbf r.}
$$

Writing the projected local acceleration as $\partial q/\partial t$ gives the common scalar notation $\int_1^2(\partial q/\partial t)\,ds$. This is a local-acceleration contribution, not the complete material derivative.

In a one-dimensional total-flow model, the corresponding head contribution is

$$
\frac1g\int_1^2\frac{\partial V}{\partial t}\,ds,
$$

with section kinetic-energy terms using $\alpha V^2/(2g)$ where appropriate.

---

## 4. Measurement and Discharge Examples

### 4.1 Pitot measurement

**Example 1 (Stagnation pressure).** At equal elevation, bringing a flow to rest without appreciable loss gives

$$
p_0=p+\frac12\rho q^2.
$$

A differential manometer containing a denser fluid of density $\rho_m$ gives

$$
p_0-p=(\rho_m-\rho)g\Delta h.
$$

Real probes require a calibration coefficient determined from experiment and installation details. The ideal Bernoulli relation gives the dependence on pressure difference; the calibrated coefficient supplies the device-specific correction. The stagnation and static readings must refer to compatible locations and elevations.

### 4.2 Torricelli outflow and a small orifice

**Example 2 (Large reservoir).** Let a small orifice lie at depth $h$ below a large free surface, with both free surface and emerging jet at the same external pressure. Neglecting free-surface velocity and loss,

$$
\boxed{q=\sqrt{2gh}.}
$$

For a real orifice, contraction and viscous effects are represented by an empirical discharge coefficient. Its value depends on the opening geometry, Reynolds number, and installation, so it must come from an appropriate correlation or calibration rather than the ideal derivation alone.

### 4.3 Triangular weir

**Example 3 (Integrating a nonuniform outflow).** Let the notch angle be $\alpha$ and the free-surface height above its vertex be $h$. At height $s$ above the vertex, the strip width is $2s\tan(\alpha/2)$ and the ideal speed is $\sqrt{2g(h-s)}$. Therefore

$$
\begin{aligned}
Q&=2\tan\left(\frac\alpha2\right)\sqrt{2g}
\int_0^h s\sqrt{h-s}\,ds\\
&=\boxed{\frac8{15}\sqrt{2g}\tan\left(\frac\alpha2\right)h^{5/2}.}
\end{aligned}
$$

Viscous and contraction effects change the coefficient. Practical weir discharge therefore uses an empirical coefficient tied to the notch geometry and measurement convention; the ideal derivation mainly establishes the $h^{5/2}$ scaling.

### 4.4 Venturi meter

**Example 4 (Continuity plus pressure difference).** For upstream area $A_1$ and smaller throat area $A_2$,

$$
V_2=\frac{A_1}{A_2}V_1.
$$

Assume $\alpha_1\approx\alpha_2\approx1$. An ideal differential manometer gives the piezometric pressure difference

$$
p_1-p_2+\rho g(z_1-z_2)
=(\rho_m-\rho)g\Delta h.
$$

Combining continuity with Bernoulli determines the ideal dependence of flow rate on the measured pressure difference and area ratio. Actual Venturi meters use an empirical discharge coefficient to incorporate losses and installation effects. Elevation cancels through the manometer relation, explaining why the resulting relation is independent of pipe inclination under the stated assumptions.

---

## 5. Integral Momentum and Fluid Forces

### 5.1 Vector momentum balance

For a fixed control volume,

$$
\boxed{\sum\mathbf F
=\frac{\partial}{\partial t}\int_{\mathrm{CV}}\rho\mathbf v\,d\mathcal V
+\int_{\mathrm{CS}}\rho\mathbf v(\mathbf v\cdot\mathbf n)\,dA.}
$$

The external forces include pressure, gravity, and wall or device forces **on the fluid**. For steady one-dimensional sections,

$$
\boxed{\sum\mathbf F
=\sum_{\mathrm{out}}\beta\dot m\mathbf V
-\sum_{\mathrm{in}}\beta\dot m\mathbf V.}
$$

For one inlet and one outlet, equal mass flow rates, and $\beta\approx1$,

$$
\sum\mathbf F=\dot m(\mathbf V_2-\mathbf V_1).
$$

### 5.2 A reusable calculation method

1. Choose a control volume with simple sections and draw its outward normals.
2. Apply continuity to determine mass flow and velocities.
3. Use an appropriate energy equation to determine any unknown pressures.
4. Draw all forces acting on the enclosed fluid. Use gauge pressures only when atmospheric contributions cancel consistently.
5. Apply momentum balance separately in each coordinate direction.
6. Reverse the device-on-fluid force to obtain the fluid-on-device force.

This method applies to contracting or bent nozzles, fixed vanes, developing pipe flow, and moving devices. In developing flow, a change in profile can change $\beta$ even when the mean speed is unchanged.

**Illustration (Fixed vane).** If an atmospheric jet of speed $V$ is turned through angle $\theta$ without changing its speed, with gravity neglected,

$$
\mathbf F_{\mathrm{vane\ on\ fluid}}
=\rho QV\big[(\cos\theta-1)\mathbf i+\sin\theta\,\mathbf j\big].
$$

The fluid force on the vane is its negative. This symbolic example makes the direction bookkeeping explicit.

### 5.3 A uniformly moving control volume

In the original inertial frame, use $\rho\mathbf v(\mathbf v_r\cdot\mathbf n)$ for momentum flux. Alternatively, a frame translating at constant velocity is also inertial, so the full balance may be written consistently in velocities measured in that frame. An accelerating frame requires inertial-force terms; replacing every velocity by a relative velocity without checking the frame is insufficient.
