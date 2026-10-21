---
title: Fluid Equilibrium
order: 6
---


# Fluid Equilibrium, Pressure Forces, and Buoyancy


## 1. Equilibrium and Pressure Surfaces

### 1.1 Euler's equilibrium equation

For a fluid at rest in an inertial frame, the momentum equation reduces to

$$
\boxed{\nabla p=\rho\mathbf f.}
$$

Equivalently,

$$
\frac{\partial p}{\partial x}=\rho f_x,
\quad \frac{\partial p}{\partial y}=\rho f_y,
\quad \frac{\partial p}{\partial z}=\rho f_z,
$$

$$
dp=\rho\mathbf f\cdot d\mathbf r
=\rho(f_x\,dx+f_y\,dy+f_z\,dz).
$$

**Proposition (Isobaric surfaces).** A tangent displacement along $p=\mathrm{constant}$ satisfies $\mathbf f\cdot d\mathbf r=0$. Thus the body-force direction is normal to an isobaric surface wherever the force is nonzero.

Under ordinary gravity, isobars are horizontal. In relative equilibrium under rigid-body rotation, they are paraboloids.

### 1.2 Conservative forces and compatibility

For constant density, equilibrium implies $\nabla\times\mathbf f=\mathbf0$. Locally, and globally on a suitable simply connected domain, one may write

$$
\mathbf f=-\nabla\Pi,
\qquad \frac p\rho+\Pi=C.
$$

Gravity has $\Pi=gz$. For a barotropic fluid, define

$$
P(p)=\int^p\frac{d\widetilde p}{\rho(\widetilde p)}.
$$

Then $\nabla P=\mathbf f$, so equilibrium under a conservative body force gives $P+\Pi=C$. Isobaric and equipotential surfaces coincide; when density varies nontrivially with pressure, constant-density surfaces follow the same family.

**Important qualification (Baroclinicity).** Taking the curl of $\nabla p/\rho=\mathbf f$ under a conservative force gives

$$
\nabla\rho\times\nabla p=\mathbf0.
$$

A genuinely baroclinic configuration, with nonparallel pressure and density gradients, cannot be static under gravity alone. However, an equation of state depending on both pressure and temperature does not by itself prevent hydrostatic equilibrium: a vertically stratified atmosphere can satisfy the compatibility condition.

---

## 2. Hydrostatics and Pressure Measurement

### 2.1 Hydrostatic head and Pascal's principle

With $\mathbf f=-g\mathbf k$,

$$
\frac{dp}{dz}=-\rho g,
\qquad
\boxed{\frac p\rho+gz=C,
\qquad z+\frac p{\rho g}=C_h.}
$$

At depth $h$ below a free surface of pressure $p_0$,

$$
\boxed{p=p_0+\rho gh.}
$$

Between two points in the same connected stationary homogeneous liquid,

$$
z_1+\frac{p_1}{\rho g}=z_2+\frac{p_2}{\rho g}.
$$

**Pascal's principle.** An imposed pressure increment is transmitted through a connected static fluid. For the homogeneous model at unchanged geometry, adding a constant to pressure leaves the hydrostatic gradient unchanged.

### 2.2 Absolute, gauge, and vacuum pressure

Let $p_a$ be atmospheric pressure. Then

$$
p_{\mathrm{abs}}=p_a+p_g,
\qquad
p_{\mathrm{vac}}=p_a-p_{\mathrm{abs}}
\quad(p_{\mathrm{abs}}<p_a).
$$

Useful approximate equivalents are

$$
1\,\mathrm{atm}\approx101.3\,\mathrm{kPa}
\approx10.33\,\mathrm{mH_2O}
=760\,\mathrm{mmHg}
$$

under the corresponding reference conditions. A simple piezometer gives $p_g=\rho gh$ and $h=p_g/(\rho g)$.

### 2.3 Manometer calculation method

Move from one measurement point to the other through the connected static columns. In each homogeneous liquid, use $p+\rho gz=\mathrm{constant}$: pressure increases on moving downward and decreases on moving upward. Match pressures at interfaces when capillary jumps are negligible.

**Example (Two-fluid differential manometer).** For equal-elevation taps in a fluid of density $\rho$, connected through a denser manometer fluid $\rho_m$, a level difference $\Delta h$ gives

$$
p_1-p_2=(\rho_m-\rho)g\Delta h,
$$

with $\Delta h$ signed according to the column orientation. Writing the pressure walk explicitly is more reliable than memorizing a sign.

---

## 3. Relative Equilibrium

### 3.1 Uniform horizontal acceleration

A liquid at rest relative to a container accelerating with $a\mathbf i$ experiences effective body force

$$
\mathbf f'=\mathbf f-a\mathbf i=-a\mathbf i-g\mathbf k.
$$

Thus

$$
dp=-\rho(a\,dx+g\,dz),
\qquad p=-\rho(ax+gz)+C.
$$

If the free surface intersects $x=0$ at $z_0$ with pressure $p_0$,

$$
\boxed{p=p_0+\rho g\left[(z_0-z)-\frac agx\right].}
$$

The free surface satisfies

$$
ax+gz_s=gz_0,
\qquad \boxed{\frac{dz_s}{dx}=-\frac ag.}
$$

It rises opposite the acceleration direction. Vertically below the local free surface, $p=p_0+\rho gh$ still holds. The intercept $z_0$ is determined by the liquid volume and container geometry.

### 3.2 Rigid-body rotation

For angular speed $\omega$ about the vertical axis, particles have centripetal acceleration and the rotating-frame effective force is

$$
\mathbf f'=\omega^2x\mathbf i+\omega^2y\mathbf j-g\mathbf k.
$$

With $r^2=x^2+y^2$,

$$
dp=\rho(\omega^2x\,dx+\omega^2y\,dy-g\,dz).
$$

Integration gives

$$
\boxed{p=p_0+\rho g\left[\frac{\omega^2r^2}{2g}+z_0-z\right],}
$$

$$
\boxed{z_s-z_0=\frac{\omega^2r^2}{2g}.}
$$

The free surface is a paraboloid. Its height rises radially outward, and $z_0$ again follows from volume conservation. Pressure at a fixed radius remains hydrostatic below the local free surface.

---

## 4. Hydrostatic Forces

### 4.1 Resultant force on a plane area

Let a plane area $A$ make angle $\theta$ with the horizontal free surface. Measure $y$ down the plane from the intersection of its extension with that surface; then $h=y\sin\theta$.

For net pressure $p_g=\rho gh$,

$$
\boxed{F=\int_A\rho gh\,dA
=\rho gh_cA=p_cA,}
$$

where $h_c$ is centroid depth and $p_c=\rho gh_c$. The resultant acts normal to the plane.

### 4.2 Center of pressure

Taking moments about the free-surface intersection line gives

$$
y_DF=\rho g\sin\theta\int_Ay^2\,dA.
$$

Let $I_x=\int_Ay^2dA$ and let $I_\xi$ be the second moment about the parallel centroidal axis. By the parallel-axis theorem,

$$
\boxed{y_D=\frac{I_x}{y_cA}
=y_c+\frac{I_\xi}{y_cA}
=y_c+\frac{r_\xi^2}{y_c},}
\qquad r_\xi^2=\frac{I_\xi}{A}.
$$

Hence the eccentricity below the centroid is

$$
e=y_D-y_c=\frac{r_\xi^2}{y_c}.
$$

For an area symmetric about its downslope centroidal line, the transverse eccentricity is zero.

**Example (Inclined rectangle).** A rectangle of downslope length $l$ has its top edge at vertical depth $h$. Since $I_\xi/A=l^2/12$ and $y_c=h/\sin\theta+l/2$,

$$
\boxed{e=\frac{l^2\sin\theta}{6(2h+l\sin\theta)}.}
$$

**Important qualification.** These center-of-pressure formulas assume pressure proportional to depth with no additional uniform net pressure. If a uniform pressure difference also acts, include its force at the centroid and combine moments. A horizontal plane has uniform pressure and its resultant passes through the centroid.

### 4.3 Curved surfaces

For a two-dimensional curved surface, resolve the resultant into horizontal and vertical components. Using unit width if needed,

$$
F_x=\rho gh_{xc}A_x,
$$

where $A_x$ is the vertical projection and $h_{xc}$ its centroid depth.

The vertical magnitude is the weight of the corresponding **pressure volume**:

$$
|F_v|=\rho g\mathcal V_p.
$$

It acts through that volume's centroid. When actual liquid lies above the surface, its weight gives a downward component; when the construction uses a virtual liquid volume above a surface loaded from below, the component is upward. Determine the direction from the fluid side and pressure normals.

Then

$$
F=\sqrt{F_x^2+F_v^2},
\qquad \tan\alpha=\frac{|F_v|}{|F_x|}.
$$

Locate the horizontal and vertical lines of action before assigning the resultant line of action.

---

## 5. Buoyancy and Stability

### 5.1 Archimedes' principle

**Theorem (Archimedes).** The buoyant force in a homogeneous liquid equals the weight of displaced liquid:

$$
\boxed{F_B=\rho g\mathcal V_{\mathrm{disp}}.}
$$

Its line of action passes through the **center of buoyancy** $C$, the centroid of displaced volume. A freely floating body satisfies

$$
F_B=W,\qquad \rho g\mathcal V_{\mathrm{disp}}=W.
$$

### 5.2 Fully submerged bodies

For a fully submerged rigid body in homogeneous fluid, with equilibrium force balance, rotational stability is determined by the relative positions of the center of gravity $G$ and center of buoyancy $C$:

| Relative position | Rotational equilibrium |
|---|---|
| $G$ below $C$ | Stable |
| $G$ above $C$ | Unstable |
| $G=C$ | Neutral |

The buoyancy center is fixed in the body when its entire volume remains submerged.

### 5.3 Floating bodies and metacentric height

For a floating body, heel changes the displaced shape and moves $C$. The intersection of neighboring buoyancy axes defines the **metacenter** $M$ for small heel.

$$
\boxed{CM=\frac{I_\xi}{\mathcal V_{\mathrm{disp}}},
\qquad GM=CM-CG.}
$$

Here $I_\xi$ is the second moment of the waterplane area about the relevant heel axis, and vertical distances are used consistently. Positive $GM$ gives initial stability, negative $GM$ instability, and zero $GM$ neutral behavior to first order. Small-angle stability does not establish stability at large heel angles.

---

## 6. Atmospheric Pressure Variation

For an ideal-gas atmosphere in hydrostatic balance,

$$
\frac{dp}{dz}=-\rho g,
\qquad p=\rho RT,
\qquad \frac{dp}{p}=-\frac{g}{RT}\,dz.
$$

**Example (Linear lapse rate).** Let $T=T_0-\beta_Tz$ with constant $g,R,\beta_T$. Integration from $z=0$ gives

$$
\boxed{p=p_0\left(1-\frac{\beta_Tz}{T_0}\right)^{g/(\beta_TR)}.}
$$

The model requires positive absolute temperature and applies only over the layer in which the linear lapse rate is appropriate. Representative reference values are

$$
T_0=288.15\,\mathrm K,\quad p_0=101.3\,\mathrm{kPa},\quad
\rho_0=1.225\,\mathrm{kg/m^3},\quad
\beta_T=0.0065\,\mathrm{K/m}.
$$

For an isothermal layer,

$$
\boxed{p=p_0\exp\left[-\frac{g(z-z_0)}{RT}\right].}
$$

The atmospheric density is then obtained from $\rho=p/(RT)$.
