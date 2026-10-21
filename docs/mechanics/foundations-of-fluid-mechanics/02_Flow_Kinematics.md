---
title: Flow Descriptions and Kinematics
order: 1
---


# Flow Descriptions and Kinematics


## 1. Describing a Flow

### 1.1 Lagrangian and Eulerian descriptions

**Definition (Lagrangian description).** Label a particle by its initial coordinates $\mathbf a=(a,b,c)$ and follow its position,

$$
\mathbf r=\mathbf r(\mathbf a,t).
$$

This directly describes a particle's history. In an **Eulerian description**, properties are instead assigned to locations:

$$
B=B(x,y,z,t),\qquad \mathbf v=\mathbf v(x,y,z,t).
$$

The Eulerian approach makes spatial distributions and field equations particularly convenient. Both descriptions refer to the same physical motion.

### 1.2 Spatial dimension and time dependence

A three-dimensional field depends on three spatial coordinates. A plane two-dimensional field has two in-plane velocity components and no dependence on the perpendicular coordinate. Axisymmetric reductions also reduce spatial dependence, but retain cylindrical geometry and may include swirl; they are not identical to plane flow.

A one-dimensional *total-flow model* uses section averages, such as $V=V(s,t)$ along a conduit. This reduces the number of variables while requiring corrections for nonuniform velocity profiles.

**Definition (Steady flow).** A flow is steady when its fields do not change with time at fixed spatial locations; in particular, $\partial\mathbf v/\partial t=0$.

Unsteady behavior includes quasi-steady changes, harmonic and non-harmonic periodic motion, aperiodic decay, and random turbulent fluctuations. A statistically steady turbulent flow can have steady averages while its instantaneous velocity remains unsteady.

### 1.3 Other useful classifications

The Reynolds number compares inertia with viscosity:

$$
\mathrm{Re}=\frac{\rho Vd}{\mu}=\frac{Vd}{\nu}.
$$

For circular pipes, $\mathrm{Re}\approx2300$ is a conventional transition scale. Geometry and disturbances also matter, so this is not a universal boundary for all flows.

Internal flows are constrained by conduits or passages, as in pipes, nozzles, open channels, and fluid machinery. External flows pass around bodies and often contain an outer region coupled to a viscous boundary layer. Rotational and irrotational flows are distinguished by vorticity, developed below.

---

## 2. Flow Rate and Section Averages

### 2.1 Volume and mass flux

For an oriented area with unit normal $\mathbf n$,

$$
dQ=(\mathbf v\cdot\mathbf n)\,dA,
\qquad
Q=\int_A\mathbf v\cdot\mathbf n\,dA,
$$

$$
\dot m=\int_A\rho(\mathbf v\cdot\mathbf n)\,dA.
$$

On a closed surface, $\mathbf n$ points outward and positive flux means net outflow. For constant density and a section normal to the mean flow,

$$
\boxed{V=\frac QA,\qquad Q=VA,\qquad \dot m=\rho Q=\rho VA.}
$$

### 2.2 Energy and momentum correction factors

For a unidirectional normal velocity profile $u$ and uniform density, define

$$
\boxed{\alpha=\frac1A\int_A\left(\frac uV\right)^3dA,
\qquad
\beta=\frac1A\int_A\left(\frac uV\right)^2dA.}
$$

Then the kinetic-energy flux is $\alpha\rho AV^3/2$, while the streamwise momentum flux is $\beta\rho AV^2$. Replacing the actual profile by its mean without these factors generally changes both fluxes.

| Circular-pipe velocity profile | $V/u_{\max}$ | $\alpha$ | $\beta$ |
|---|---|---|---|
| Parabolic | $0.500$ | $2.000$ | $4/3\approx1.333$ |
| One-seventh power | $0.8167$ | $1.058$ | $1.020$ |

**Example (Parabolic-profile corrections).** For $u=u_{\max}(1-r^2/R^2)$, use $dA=2\pi r\,dr$. The substitution $s=r^2/R^2$ gives

$$
\frac1A\int_Au^n\,dA
=u_{\max}^n\int_0^1(1-s)^n ds
=\frac{u_{\max}^n}{n+1}.
$$

Taking $n=1,2,3$ yields $V=u_{\max}/2$, $\beta=4/3$, and $\alpha=2$.

---

## 3. Curves Associated with Fluid Motion

### 3.1 Pathlines, streamlines, streaklines, and timelines

A **pathline** follows one particle:

$$
\frac{dx}{dt}=u,\qquad \frac{dy}{dt}=v,\qquad \frac{dz}{dt}=w,
$$

with the field evaluated at the moving particle position.

A **streamline** is tangent to the instantaneous velocity field. At a fixed time,

$$
\frac{dx}{u}=\frac{dy}{v}=\frac{dz}{w}.
$$

When a component vanishes, use the tangent-vector definition instead of dividing by zero.

A **streakline** joins particles that have successively passed through a fixed location, as in continuous dye injection. A **material line**, or timeline, consists of particles marked at one instant and subsequently followed.

**Proposition.** In a steady flow, pathlines, streamlines, and streaklines coincide as geometric curves. In an unsteady flow they generally differ.

### 3.2 Streamtubes and total flow

A **streamtube** is bounded by streamlines, so instantaneous velocity has no component through its side surface. The fluid inside may be called a stream bundle. In a gradually varied bundle, streamlines are nearly parallel, which supports approximately hydrostatic section pressures and a one-dimensional section-average model.

**Remark.** In an unsteady flow, an instantaneous streamtube need not be a material tube moving with the same particles.

---

## 4. Material Derivative and Acceleration

### 4.1 Following a field along a particle

**Proposition (Material derivative).** For a differentiable scalar field $B$,

$$
\boxed{\frac{DB}{Dt}
=\frac{\partial B}{\partial t}
+u\frac{\partial B}{\partial x}
+v\frac{\partial B}{\partial y}
+w\frac{\partial B}{\partial z}
=\frac{\partial B}{\partial t}+(\mathbf v\cdot\nabla)B.}
$$

*Derivation.* Apply the chain rule to $B(x(t),y(t),z(t),t)$ and substitute the particle velocity. $\square$

The first term is the **local change**, caused by unsteadiness. The second is the **convective change**, caused by a particle moving through a spatially nonuniform field.

### 4.2 Acceleration

Apply the material derivative componentwise to velocity:

$$
\boxed{\mathbf a=\frac{D\mathbf v}{Dt}
=\frac{\partial\mathbf v}{\partial t}
+(\mathbf v\cdot\nabla)\mathbf v.}
$$

Along a one-dimensional path coordinate $s$, the tangential acceleration is

$$
a_s=\frac{\partial q}{\partial t}+q\frac{\partial q}{\partial s},
\qquad
a_s^{(\mathrm{mean})}=\frac{\partial V}{\partial t}+V\frac{\partial V}{\partial s}.
$$

**Example (A steady nozzle).** If the section area changes with $s$, steady incompressible continuity gives $V=Q/A(s)$. Thus

$$
a_s=V\frac{dV}{ds}
=-\frac{Q^2}{A^3}\frac{dA}{ds}.
$$

A narrowing nozzle accelerates the flow even though its local time derivative is zero. On a curved path, there is also a normal acceleration $q^2/R$ toward the center of curvature.

---

## 5. Deformation, Rotation, and Vorticity

### 5.1 Local relative motion

The velocity near a point consists of translation plus relative motion described by the velocity gradient. Its symmetric part gives deformation; its antisymmetric part gives local rigid rotation. In traditional terms, the decomposition is

$$
\text{translation}+\text{rotation}
+\text{linear deformation}+\text{angular deformation}.
$$

For plane flow,

$$
\dot\varepsilon_{xx}=\frac{\partial u}{\partial x},
\qquad \dot\varepsilon_{yy}=\frac{\partial v}{\partial y},
\qquad
\dot\gamma_{xy}=\frac{\partial v}{\partial x}+\frac{\partial u}{\partial y}.
$$

The area and volume expansion rates are

$$
\frac1A\frac{DA}{Dt}=\frac{\partial u}{\partial x}+\frac{\partial v}{\partial y},
\qquad
\frac1{\mathcal V}\frac{D\mathcal V}{Dt}=\nabla\cdot\mathbf v.
$$

### 5.2 Vorticity and circulation

The local rotation angular velocity in plane flow is

$$
\omega_z=\frac12\left(\frac{\partial v}{\partial x}-\frac{\partial u}{\partial y}\right).
$$

**Definition (Vorticity).**

$$
\boxed{\boldsymbol\Omega=\nabla\times\mathbf v=2\boldsymbol\omega.}
$$

A flow is **irrotational** when $\boldsymbol\Omega=\mathbf0$. Circulation around an oriented closed curve is

$$
\Gamma=\oint_C\mathbf v\cdot d\mathbf r.
$$

For a smooth field on a spanning surface $S$, Stokes' theorem gives

$$
\Gamma=\int_S\boldsymbol\Omega\cdot\mathbf n\,dA.
$$

**Important qualification.** A loop surrounding an excluded singularity may have nonzero circulation even if the velocity is irrotational everywhere on the fluid domain. The smooth spanning surface required by Stokes' theorem must lie in that domain.

### 5.3 Choosing an analytical description

Begin with mass conservation, momentum balance, and energy balance. Use a material system when particle history matters, a control volume for overall transport or forces, differential equations for local fields, and dimensional analysis when the detailed functional relationship is unknown.
