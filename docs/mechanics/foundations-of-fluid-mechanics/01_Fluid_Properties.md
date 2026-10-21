---
title: Fluid Properties and Continuum Models
order: 1
---

# Fluid Properties and Continuum Models


## 1. The Continuum Description

### 1.1 From molecules to fluid particles

Molecules undergo random thermal motion. The macroscopic velocity of a fluid is an average of their motion over a volume containing many molecules but small compared with the length scale of the flow.

**Definition (Fluid particle and fluid element).** A *fluid particle* is an idealized material point carrying locally averaged properties. A *fluid element* is a small material volume, such as $\delta x\,\delta y\,\delta z$, whose constituent particles may move relative to one another, producing deformation and rotation.

The macroscopic particle velocity excludes random thermal motion; this does not mean that the molecules themselves cease moving randomly.

**Continuum hypothesis.** Properties can be represented by continuous fields,

$$
B=B(x,y,z,t).
$$

This permits differential and integral formulations of physical laws. It is appropriate when molecular scales are much smaller than the scales being resolved. Rarefied gases and structures on molecular or shock-thickness scales may require a different description.

### 1.2 What distinguishes a fluid from an elastic solid?

**Definition (Fluid).** A fluid continues to deform under a sustained shear stress, however small that stress may be.

An elastic solid can support shear through a finite deformation. A viscous fluid instead relates shear stress to the *rate* of deformation:

$$
\text{elastic solid: stress}\sim\text{strain},
\qquad
\text{viscous fluid: stress}\sim\text{strain rate}.
$$

Removing the shear does not, in general, restore the fluid's previous shape. In static equilibrium, shear stresses vanish and pressure acts normally on every plane, independently of its orientation.

---

## 2. Viscosity

### 2.1 Newton's law of viscosity

Viscous friction reflects molecular cohesion and the exchange of molecular momentum between neighboring layers. In ordinary continuum flow next to a solid, the adjacent fluid moves with the wall. This is the **no-slip condition**.

For a Newtonian fluid in simple shear, $\mathbf v=(u(y),0,0)$,

$$
\boxed{\tau_{xy}=\mu\frac{du}{dy}=\mu\dot\gamma.}
$$

Here $\dot\gamma$ is the shear rate. Stress depends on the velocity gradient, rather than on velocity itself or on accumulated deformation.

The units and common conversions are

$$
[\mu]=\mathrm{Pa\,s},
\qquad 1\,\mathrm{Pa\,s}=10\,\mathrm P=1000\,\mathrm{cP}.
$$

For ordinary liquids, viscosity generally decreases with increasing temperature as cohesive effects weaken. For gases, it generally increases as molecular momentum exchange becomes stronger.

**Definition (Kinematic viscosity).**

$$
\boxed{\nu=\frac\mu\rho,\qquad [\nu]=\mathrm{m^2/s}.}
$$

Kinematic viscosity acts as a momentum-diffusion coefficient.

**Important qualification.** Newtonian behavior means a linear stress-strain-rate relation at a given thermodynamic state. It does not require viscosity to be independent of temperature or pressure. Constant viscosity is an additional simplifying assumption.

### 2.2 Example: shear stress in a circular pipe

Suppose a pipe of radius $R$ carries volume flow rate $Q$ with profile

$$
u(r)=\frac{2Q}{\pi R^4}(R^2-r^2).
$$

Differentiation gives the signed stress component

$$
\tau_{xr}=\mu\frac{du}{dr}
=-\frac{4\mu Q}{\pi R^4}r.
$$

The positive resisting-shear magnitude is therefore

$$
\boxed{\tau(r)=-\mu\frac{du}{dr}
=\frac{4\mu Q}{\pi R^4}r,
\qquad \tau_w=\frac{4\mu Q}{\pi R^3}.}
$$

Shear vanishes at the center and grows linearly toward the wall. The sign of a stress component depends on the chosen face normal; a wall-shear magnitude is nonnegative.

---

## 3. Density, Compressibility, and Thermodynamics

### 3.1 Density and related quantities

Writing $\mathcal V$ for volume,

$$
\rho=\frac{dm}{d\mathcal V},
\qquad m=\int_{\mathcal V}\rho\,d\mathcal V.
$$

The derivative is understood in the continuum sense: an averaging volume must still contain many molecules.

**Specific weight** is $\gamma=\rho g$. **Specific gravity** compares density with a reference density, commonly water at $4^\circ\mathrm C$ for liquids:

$$
SG=\frac{\rho}{\rho_{\mathrm{water},4^\circ\mathrm C}}.
$$

Useful approximate values are $\rho_{\mathrm{water}}\approx1000\,\mathrm{kg/m^3}$ and room-temperature $\rho_{\mathrm{air}}\approx1.2\,\mathrm{kg/m^3}$.

### 3.2 Bulk modulus and sound speed

**Definition (Bulk modulus).**

$$
\boxed{K=\frac{dp}{d\rho/\rho}
=-\frac{dp}{d\mathcal V/\mathcal V}.}
$$

A larger $K$ means a smaller fractional volume change for a given pressure change. Liquid compressibility is often negligible in ordinary flows, although it matters in pressure-wave problems.

Small acoustic disturbances propagate at

$$
\boxed{c^2=\left(\frac{\partial p}{\partial\rho}\right)_s
=\frac{K_s}{\rho}.}
$$

The subscript $s$ specifies an isentropic derivative and bulk modulus. The shorter expression $c=\sqrt{dp/d\rho}=\sqrt{K/\rho}$ assumes this thermodynamic path. Approximate sound speeds near $20^\circ\mathrm C$ are $1480\,\mathrm{m/s}$ in water and $340\,\mathrm{m/s}$ in air.

### 3.3 Ideal gas and fluid-model classifications

For air under ordinary ideal-gas conditions,

$$
p=\rho RT,
\qquad R\approx287\,\mathrm{J/(kg\,K)}.
$$

Low-speed gas motion can often be treated as incompressible when density changes remain small.

| Classification | Meaning |
|---|---|
| Inviscid | Viscous stress is neglected; the ideal model takes $\mu=0$ |
| Newtonian / non-Newtonian | Linear Newtonian stress-rate law / a different constitutive law |
| Incompressible | $D\rho/Dt=0$; a homogeneous incompressible model uses constant $\rho$ |
| Compressible | Material density changes must be retained |
| Homogeneous | Density is spatially uniform in the region considered |
| Barotropic | Density is a function of pressure alone, $\rho=\rho(p)$ |
| Baroclinic configuration | Pressure and density gradients are not parallel |
| Isentropic / isothermal | Constant entropy / constant temperature along the specified process |
| Perfect or ideal gas | Equation of state $p=\rho RT$ |

These classifications describe different properties and can be combined. For instance, a flow may be viscous, Newtonian, and approximately incompressible.

---

## 4. Surface Tension and Capillarity

Surface tension $\sigma$ is a tensile force per unit length acting along an interface. A curved interface supports a pressure jump.

**Proposition (Young-Laplace relation).** With consistent signed principal radii $R_1,R_2$,

$$
\boxed{\Delta p=\sigma\left(\frac1{R_1}+\frac1{R_2}\right).}
$$

For a spherical interface of radius $R$, the pressure on the inside of a liquid droplet exceeds the outside pressure by $2\sigma/R$.

**Example (Capillary rise or depression).** In a circular tube of diameter $d$, balance the vertical surface-tension force against the liquid-column weight:

$$
\pi d\sigma\cos\theta
=\rho g\frac{\pi d^2}{4}\Delta h.
$$

Consequently,

$$
\boxed{\Delta h=\frac{4\sigma\cos\theta}{\rho gd}.}
$$

Here $\theta$ is measured through the liquid and gas density is neglected. Positive $\cos\theta$ gives rise; negative $\cos\theta$ gives depression. The effect becomes stronger as the tube diameter decreases.
