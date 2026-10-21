---
title: Dimensional Analysis and Similarity
order: 5
---

# Dimensional Analysis and Similarity


## 1. Dimensions and Nondimensionalization

### 1.1 Dimensional homogeneity

Every additive term in a physical equation must have the same dimensions. This provides a useful consistency check, although dimensional consistency alone does not prove that a formula is correct.

| Quantity | Dimension | Quantity | Dimension |
|---|---|---|---|
| Speed | $LT^{-1}$ | Acceleration | $LT^{-2}$ |
| Volume flow rate | $L^3T^{-1}$ | Mass flow rate | $MT^{-1}$ |
| Density | $ML^{-3}$ | Specific weight | $ML^{-2}T^{-2}$ |
| Force | $MLT^{-2}$ | Moment | $ML^2T^{-2}$ |
| Pressure, stress, bulk modulus | $ML^{-1}T^{-2}$ | Dynamic viscosity | $ML^{-1}T^{-1}$ |
| Kinematic viscosity | $L^2T^{-1}$ | Surface tension | $MT^{-2}$ |
| Angular velocity | $T^{-1}$ | Strain rate | $T^{-1}$ |
| Energy or work | $ML^2T^{-2}$ | Power | $ML^2T^{-3}$ |

### 1.2 Why nondimensionalize?

Introducing $\mathbf x=l\mathbf x^*$, $\mathbf v=V\mathbf v^*$, $t=t_c t^*$, and $p=p_{\mathrm{ref}}+p_c p^*$ into constant-property Navier-Stokes gives, for gravity,

$$
\frac{l}{Vt_c}\frac{\partial\mathbf v^*}{\partial t^*}
+(\mathbf v^*\cdot\nabla^*)\mathbf v^*
=-\frac{p_c}{\rho V^2}\nabla^*p^*
+\frac1{\mathrm{Fr}^2}\widehat{\mathbf g}
+\frac1{\mathrm{Re}}\nabla^{*2}\mathbf v^*.
$$

The coefficients identify the relative sizes of unsteady inertia, pressure, gravity, and viscosity. Taking $t_c=1/\omega$ makes the first coefficient $\omega l/V$.

---

## 2. Buckingham's Pi Theorem

### 2.1 Statement and procedure

**Theorem (Buckingham $\Pi$ theorem).** If a dimensionally homogeneous relationship involves $n$ variables whose dimensional matrix has rank $r$, it can be expressed using $n-r$ independent dimensionless groups:

$$
x_1=\varphi(x_2,\ldots,x_n)
\quad\Longrightarrow\quad
\Pi_1=F(\Pi_2,\ldots,\Pi_{n-r}).
$$

To construct the groups:

1. List the physically relevant variables, including geometry and material properties.
2. Choose $r$ dimensionally independent repeating variables.
3. Multiply each remaining variable by powers of the repeating variables and solve for zero net dimensions.
4. Express the response in terms of independent groups and interpret their physical meanings.

The theorem reduces the number of variables; it does not determine the function $F$.

### 2.2 Example: rough-pipe pressure drop

Suppose

$$
\Delta p=\varphi(\rho,V,d,\mu,\varepsilon,l).
$$

There are seven variables and three independent dimensions. Choose $\rho,V,d$ as repeating variables. The pressure group is found from

$$
[\Delta p\,\rho^aV^bd^c]
=M^{1+a}L^{-1-3a+b+c}T^{-2-b},
$$

so $a=-1$, $b=-2$, $c=0$. The other groups may be chosen as $\mathrm{Re}$, $\varepsilon/d$, and $l/d$. Therefore

$$
\boxed{\frac{\Delta p}{\tfrac12\rho V^2}
=F\left(\mathrm{Re},\frac\varepsilon d,\frac ld\right).}
$$

The factor $1/2$ is a convention, not a dimensional requirement. The four groups consist of three independent inputs and one response.

### 2.3 Example: triangular-weir scaling

For a gravity-controlled weir with notch angle $\alpha$, suppose $Q=g^a h^bF(\alpha)$. Equating dimensions gives

$$
L^3T^{-1}=L^{a+b}T^{-2a},
\qquad a=\frac12,\quad b=\frac52.
$$

Thus

$$
\boxed{Q=\sqrt g\,h^{5/2}F(\alpha),}
$$

consistent with direct Bernoulli integration. Dimensional analysis alone cannot supply the ideal coefficient $(8\sqrt2/15)\tan(\alpha/2)$ or empirical loss corrections.

---

## 3. Important Dimensionless Numbers

### 3.1 Similarity criteria

| Number | Definition | Physical role |
|---|---|---|
| Reynolds | $\mathrm{Re}=\rho Vl/\mu=Vl/\nu$ | Inertia relative to viscosity |
| Froude | $\mathrm{Fr}=V/\sqrt{gl}$ | $\mathrm{Fr}^2$ compares inertia with gravity |
| Euler | $\mathrm{Eu}=p_c/(\rho V^2)$ | Pressure relative to inertia |
| Strouhal | $\mathrm{St}=fl/V$ | Ordinary-frequency unsteadiness relative to convection |
| Angular-frequency Strouhal | $\mathrm{Sr}_\omega=\omega l/V=2\pi\mathrm{St}$ | Angular-frequency unsteadiness relative to convection |
| Womersley | $\mathrm{Wo}=l\sqrt{\omega/\nu}$ | $\mathrm{Wo}^2$ compares unsteady inertia with viscosity |
| Mach | $\mathrm{Ma}=V/c$ | Compressibility and acoustic propagation |
| Weber | $\mathrm{We}=\rho V^2l/\sigma$ | Inertia relative to surface tension |
| Newton | $\mathrm{Ne}=F/(\rho V^2l^2)$ | Applied force relative to fluid inertia |

**Remark (Frequency convention).** Both $fl/V$ and $\omega l/V$ occur in fluid mechanics. They differ by $2\pi$ and must not be exchanged numerically. Vortex-shedding frequency is ordinarily reported using $\mathrm{St}=fD/U$.

For circular pipes, a conventional critical value is $\mathrm{Re}\approx2300$. Flat-plate transition is commonly characterized by an order-of-magnitude scale around $5\times10^5$; the more specific value $3.2\times10^5$ is also used in the boundary-layer discussion. Neither value is a universal threshold.

The elementary Mach classification is subsonic for $\mathrm{Ma}<1$, sonic at $\mathrm{Ma}=1$, and supersonic for $\mathrm{Ma}>1$. *Transonic* describes a regime near sonic conditions, often with both subsonic and supersonic regions, rather than just the single value $1$.

### 3.2 Pressure, force, moment, and power coefficients

Useful response coefficients are

$$
C_p=\frac{\Delta p}{\tfrac12\rho V^2},
\qquad
\sigma_{\mathrm{cav}}=\frac{p-p_v}{\tfrac12\rho V^2},
$$

$$
C_D=\frac{F_D}{\tfrac12\rho V^2l^2},
\qquad
C_L=\frac{F_L}{\tfrac12\rho V^2l^2},
\qquad
C_M=\frac{M}{\tfrac12\rho V^2l^3}.
$$

Here $p_v$ is vapor pressure. In practical drag and lift definitions, a stated reference area $A$ replaces $l^2$.

Power has an inertial scale $\rho V^3l^2$. For rotating machinery with diameter $D$ and rotational frequency $n$, the equivalent scale is $\rho n^3D^5$:

$$
C_P=\frac{P}{\rho V^3l^2},
\qquad C_{P,n}=\frac{P}{\rho n^3D^5}.
$$

Definitions may differ by numerical constants; compare coefficients only after matching their reference scales.

---

## 4. Model Experiments and Similarity

### 4.1 Geometric, kinematic, and dynamic similarity

**Geometric similarity** requires matching shapes with all corresponding lengths in a fixed ratio. **Kinematic similarity** requires proportional velocities and corresponding time scales. **Dynamic similarity** requires matching the relevant ratios of force effects.

Dimensionless criteria can be obtained from dimensional analysis, nondimensional governing equations, or characteristic force ratios. A model is useful when a full-scale experiment is difficult or expensive and the governing physical effects are understood well enough to identify the controlling groups.

If a prototype obeys

$$
\Pi_1=F(\Pi_2,\Pi_3,\ldots),
$$

a geometrically similar model with corresponding boundary conditions obeys the same relation. Matching the controlling input groups makes the corresponding response groups equal.

### 4.2 Example: why complete ship-model similarity is difficult

Let $\lambda_l=l_m/l_p<1$ be the model-to-prototype length ratio, with the same gravity. Froude similarity requires

$$
\frac{V_m}{V_p}=\sqrt{\lambda_l}.
$$

Matching Reynolds number as well would require

$$
\frac{\nu_m}{\nu_p}
=\frac{V_ml_m}{V_pl_p}
=\lambda_l^{3/2}.
$$

A small model would need an unrealistically low fluid viscosity. One therefore often matches Froude number and corrects viscous effects separately. This is **approximate similarity**, and its validity depends on which effects control the response.

### 4.3 Reynolds-number independence

At sufficiently high Reynolds number in a fully rough pipe, the friction factor depends mainly on relative roughness and becomes nearly independent of Reynolds number. This is sometimes called a self-similar or Reynolds-independent regime. It is distinct from the spatial profile self-similarity used to describe free jets.
