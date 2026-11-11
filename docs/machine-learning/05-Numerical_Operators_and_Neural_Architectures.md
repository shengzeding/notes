---
title: Numerical Operators and Neural Architectures
order: 5
---

# Numerical Operators and Neural Architectures

Continuous physical models, numerical discretizations, and learned models all define maps between fields. Their formulas often share a computational skeleton, but the strength of the correspondence varies. A finite-difference stencil is literally a convolution with fixed coefficients. A conservative finite-volume method is a constrained form of graph message passing. A residual network can be interpreted as a time-stepping scheme after an appropriate scaling. A U-Net and a multigrid cycle share a multiscale hierarchy without being the same algorithm.

This chapter develops those connections while keeping their assumptions explicit. Similar notation alone does not imply the same operator, the same guarantees, or the same limiting behavior.


## 1. Continuous, Discrete, and Learned Operators

Let a continuous operator map an input function to an output function,

$$
\mathcal G:U\longrightarrow V,
\qquad
u=\mathcal G(a).
$$

A numerical method introduces a representation with mesh or sample scale $h$ and constructs a discrete operator

$$
G_h:\mathbb R^{N_h\times d_{\mathrm{in}}}
\longrightarrow
\mathbb R^{N_h\times d_{\mathrm{out}}}.
$$

Its coefficients are usually derived from the governing equations, geometry, and an approximation principle. A learned model instead constructs a parameterized map $G_\theta$ whose coefficients are selected from data. The two maps can have identical array operations while representing different mathematical objects.

Four distinctions will be used throughout the chapter.

**Exact algebraic form.** A fixed local stencil and a single-channel convolution can be the same discrete linear map.

**Constrained special case.** A finite-volume update is graph message passing whose messages and aggregation satisfy geometric and conservation constraints. Generic message passing is a much larger class.

**Discretization interpretation.** A residual update has the form of an explicit time step. It becomes a controlled continuous-depth limit only when the step size, depth, and layer maps are scaled consistently.

**Structural analogy.** Multigrid and U-Net both move between resolutions, but their per-level operations, objectives, and guarantees are different.

These distinctions prevent a useful comparison from becoming an unsupported equivalence.


## 2. Local Differential Operators and Convolution

<span id="local-operators-and-convolution"></span>

### 2.1 A stencil is a fixed convolution

After discretization on a translation-compatible regular grid, many local linear differential operators take the form

$$
(D_hu)_i=\sum_{r\in\mathcal S}c_r(h)u_{i+r},
$$

where $\mathcal S$ is a finite set of offsets. For example, the centered first derivative and second derivative in one dimension are

$$
(D_hu)_i=\frac{u_{i+1}-u_{i-1}}{2h},
$$

$$
(L_hu)_i=\frac{u_{i+1}-2u_i+u_{i-1}}{h^2}.
$$

On a two-dimensional square grid, the five-point Laplacian is

$$
(L_hu)_{i,j}
=\frac{u_{i+1,j}+u_{i-1,j}+u_{i,j+1}+u_{i,j-1}-4u_{i,j}}{h^2}.
$$

Each expression is a discrete convolution with a fixed kernel. The same kernel is applied at every interior grid point because the discretized operator is assumed to have the same local form there.

A convolutional layer has the more general form

$$
v_{i,j,c_{\mathrm{out}}}
=\sigma\!\left(
b_{c_{\mathrm{out}}}
+\sum_{a,b,c_{\mathrm{in}}}
K_{a,b,c_{\mathrm{in}},c_{\mathrm{out}}}
u_{i+a,j+b,c_{\mathrm{in}}}
\right).
$$

With one channel, no bias, no nonlinearity, and the Laplacian coefficients inserted into $K$, this layer is exactly the discrete Laplacian. The broader [CNN field model](01-Neural_Architectures_for_Structured_Data.md#cnn-field-model "concept:cnn-field-model") allows learned coefficients, multiple channels, nonlinearities, and stacked layers, so it need not correspond to a recognizable differential operator.

### 2.2 Weight sharing is not numerical consistency

Weight sharing makes the same kernel act at different spatial positions and therefore supports translation equivariance away from boundary effects. Numerical consistency is a different statement. It requires the discrete operator to approach a prescribed continuous operator as the mesh is refined:

$$
D_hu\longrightarrow Du
\qquad\text{as }h\to0
$$

for an appropriate class of smooth functions. The stencil coefficients must satisfy moment or Taylor-expansion conditions for this limit to hold. Sharing an arbitrary learned kernel across a grid does not impose those conditions.

Conversely, a nonuniform mesh can support a consistent discretization even though its coefficients vary with position. Translation-invariant weight sharing is therefore one possible structural assumption, not the definition of consistency.

### 2.3 Learning a known stencil from data

Suppose a single linear convolution is trained on pairs $(u,L_hu)$. Recovering the exact stencil is an identification problem. If the observed local patches span the relevant input space, least squares can identify the coefficients. If all training fields are very smooth or strongly correlated, many kernels may agree on the observed patches while differing elsewhere.

A small training loss therefore shows agreement on the sampled fields, not necessarily recovery of the intended operator. Data diversity and conditioning matter even when the target map is linear and the architecture contains the exact stencil as a special case.

Finally, applying a differential operator is local, whereas solving a boundary-value problem usually defines a global solution operator. A small convolutional kernel may represent the former in one layer; approximating the latter requires sufficient receptive field, boundary information, or a nonlocal architecture.


## 3. Finite-Volume Fluxes as Graph Messages

<span id="finite-volume-message-passing"></span>

### 3.1 Cells, faces, and directed messages

A finite-volume mesh naturally defines a graph. A control volume is a node, a shared face is an edge, and face geometry can be stored as an edge feature. For a conserved scalar $u_i$ in a cell of volume $V_i$, a semidiscrete balance has the form

$$
V_i\frac{du_i}{dt}
=-\sum_{j\in\mathcal N(i)}F_{ij}+V_i s_i,
$$

where $F_{ij}$ is the flux leaving cell $i$ through the face shared with cell $j$, and $s_i$ is a source per unit volume.

Define the message received by $i$ from $j$ as

$$
m_{ji}=-F_{ij}.
$$

The update is then an instance of [graph message passing](01-Neural_Architectures_for_Structured_Data.md#graph-message-passing "concept:graph-message-passing"):

$$
\frac{du_i}{dt}
=\frac1{V_i}\sum_{j\in\mathcal N(i)}m_{ji}+s_i.
$$

The message function may use $u_i,u_j$, face area, orientation, distance, velocity, material coefficients, and boundary data. Unlike a generic GNN, each of these inputs has a geometric or physical role.

### 3.2 Pairwise antisymmetry and conservation

<span id="finite-volume-conservation"></span>

For an internal face, a single numerical flux is used with opposite orientations in its two adjacent cells:

$$
F_{ji}=-F_{ij}.
$$

Equivalently, the corresponding messages satisfy $m_{ij}=-m_{ji}$. Summing the cell balances over the mesh gives

$$
\frac{d}{dt}\sum_iV_iu_i
=-\sum_{(i,j)}(F_{ij}+F_{ji})
-\sum_{f\subset\partial\Omega}F_f
+\sum_iV_is_i.
$$

All internal-face contributions cancel pairwise. Only boundary fluxes and sources can change the total. When $u$ represents mass per unit volume, this is the discrete counterpart of [local mass conservation](../mechanics/foundations-of-fluid-mechanics/03_Differential_Conservation_Laws.md#local-mass-conservation "concept:local-mass-conservation").

A standard message-passing network does not satisfy this property automatically. Sum aggregation only sums whatever messages it receives; it does not force the two directed messages on an edge to cancel. Conservation must be imposed through the message parameterization, a shared edge flux, or another explicit constraint.

### 3.3 Diffusive and convective messages

On an orthogonal mesh, a diffusive flux leaving cell $i$ through a face toward $j$ may be approximated by

$$
F_{ij}^{\mathrm{diff}}
=-\kappa_{ij}|S_{ij}|
\frac{u_j-u_i}{d_{ij}}.
$$

The same formula with the opposite face orientation gives $F_{ji}^{\mathrm{diff}}=-F_{ij}^{\mathrm{diff}}$. A convective flux instead depends on the oriented mass flux through the face and on an interpolation or upwind choice for the transported value. Both fit the same message-aggregation skeleton, but they use different message functions and have different stability and accuracy properties.

Finite-volume discretizations therefore occupy a constrained region of the message-passing design space. The graph supplies connectivity; geometry, flux consistency, conservation, and boundary treatment supply the numerical meaning.


## 4. Network Depth, Time Stepping, and Fixed Points

<span id="depth-as-time-integration"></span>

### 4.1 Explicit Euler and residual updates

Consider an evolution equation after spatial discretization,

$$
\frac{dU}{dt}=R(U,t).
$$

Forward Euler gives

$$
U^{n+1}=U^n+\Delta t\,R(U^n,t_n).
$$

A residual block has the same additive form,

$$
h^{(\ell+1)}=h^{(\ell)}+F_{\theta_\ell}(h^{(\ell)}).
$$

If $F_{\theta_\ell}=\Delta t\,f_\theta(\,\cdot\,,t_\ell)$, layer index can be interpreted as discrete time. The skip connection carries the current state, while the residual branch represents its increment.

This interpretation does not make every ResNet a numerical solver. Ordinary residual blocks may use unrelated parameters at different depths, omit an explicit step-size scale, and be trained only for a finite architecture. A convergence claim as depth increases requires a family of networks whose increments shrink and whose layer maps approach a regular vector field.

### 4.2 Continuous depth and Neural ODEs

Set $\Delta t=T/L$ and consider

$$
h^{(\ell+1)}
=h^{(\ell)}+\Delta t\,f_\theta(h^{(\ell)},t_\ell).
$$

Under suitable regularity and stability assumptions, the limit $L\to\infty$ leads to

$$
\boxed{
\frac{dh}{dt}=f_\theta(h(t),t),
\qquad h(0)=h_{\mathrm{in}}.
}
$$

A Neural ODE defines its forward map by solving this initial-value problem to a final time $T$. The ODE solver becomes part of evaluation: fixed-step Euler, higher-order Runge-Kutta methods, or adaptive solvers trade function evaluations against numerical error.

The continuous-depth formulation separates the learned vector field from the numerical method used to integrate it. It also inherits numerical issues. A stiff learned vector field may force an explicit adaptive solver to take very small steps, and changing solver tolerances can change the computed network output.

### 4.3 Implicit updates, recurrence, and equilibrium models

Backward Euler gives the implicit equation

$$
U^{n+1}=U^n+\Delta t\,R(U^{n+1},t_{n+1}).
$$

One possible solver is fixed-point iteration,

$$
Z^{(k+1)}
=U^n+\Delta t\,R(Z^{(k)},t_{n+1}).
$$

This has the same recurrent structure as

$$
h^{(k+1)}=f_\theta(h^{(k)},x),
$$

with the same update reused across iterations. If $f_\theta(\,\cdot\,,x)$ is a contraction on the relevant region, the iterates converge to a fixed point

$$
h^*=f_\theta(h^*,x).
$$

A deep equilibrium model defines its hidden state by this equation and uses a root-finding or fixed-point solver rather than choosing a fixed number of explicit layers. This is a genuine implicit-layer construction, whereas a finite RNN is only an iterative map unless convergence to an equilibrium is part of its definition.

Implicit does not mean automatically stable or easy to solve. Backward Euler is A-stable for the linear test equation, but other implicit schemes have different stability regions, and the nonlinear algebraic solve can still fail. The contraction condition for a fixed-point solver is a solver property, not a universal property of implicit time integration.

### 4.4 Amplification and gradient propagation

For the scalar test equation $u'=\lambda u$, Forward Euler has amplification factor

$$
g=1+\Delta t\,\lambda,
$$

so repeated steps produce $u^n=g^nu^0$. Stability depends on how repeated application of the update acts on perturbations.

The corresponding sensitivity through a recurrent or deep network is a product of Jacobians,

$$
\frac{\partial h^{(L)}}{\partial h^{(0)}}
=J_{L-1}J_{L-2}\cdots J_0.
$$

Repeated contraction produces vanishing gradients; repeated amplification can produce exploding gradients. This is the same dynamical question at a structural level, but a single spectral radius does not characterize a general product of changing, nonlinear, or nonnormal Jacobians. Numerical stability and trainability should therefore be compared through the actual update maps, not identified by one eigenvalue slogan.


## 5. Integral and Spectral Operators

<span id="learned-integral-operators"></span>

### 5.1 Quadrature, GNO, and attention

An integral kernel operator has the form

$$
(\mathcal Kv)(x)=\int_D\kappa(x,y)v(y)\,d\mu(y).
$$

A [quadrature formula](../numerical-methods/Numerical_Integration_Numerical_Analysis.md#quadrature-formula "concept:quadrature-formula") gives a sampled approximation

$$
(\mathcal K_Nv)(x_i)
=\sum_{j=1}^Nw_{ij}\kappa(x_i,y_j)v(y_j).
$$

The [Graph Neural Operator](04-Neural_Fields_and_Neural_Operators.md#gno-discretization "concept:gno-discretization") learns the kernel while retaining this source-to-target aggregation structure. Interpreting the sum as a discretized integral requires weights and neighborhoods that remain consistent with the intended measure as the sampling changes.

[Self-attention](03-Attention_and_Transformers.md#self-attention "concept:self-attention") also computes a weighted source aggregation,

$$
y_i=\sum_j\alpha_{ij}(X)v_j,
\qquad
\sum_j\alpha_{ij}(X)=1.
$$

It can therefore be viewed as an input-dependent normalized kernel on a complete or masked graph. The analogy has limits. Attention coefficients depend on the current content through queries and keys, and softmax normalization alone does not make them quadrature weights for a prescribed spatial measure. A fixed factor such as $1/N$ is likewise a valid integration weight only under appropriate sampling and measure assumptions.

### 5.2 Spectral multipliers and FNO

<span id="spectral-multiplier-fno"></span>

For a linear translation-invariant operator $L$, Fourier modes diagonalize the spatial action:

$$
\widehat{Lu}(k)=m(k)\widehat u(k).
$$

The symbol is $m(k)=ik$ for first differentiation in one dimension and $m(k)=-|k|^2$ for the Laplacian. A spectral differentiation step uses these fixed, analytically derived multipliers.

The linear spectral path of a [Fourier Neural Operator](04-Neural_Fields_and_Neural_Operators.md#fno "concept:fno") has the parallel form

$$
\widehat v^{(\ell+1)}(k)
=R_\theta(k)\widehat v^{(\ell)}(k),
$$

where $R_\theta(k)$ is learned and usually mixes feature channels. In the single-channel linear special case, choosing $R_\theta(k)=m(k)$ reproduces the corresponding spectral multiplier on the retained modes.

A complete FNO is broader than spectral differentiation. It includes lifting and projection maps, pointwise channel mixing, nonlinearities, multiple layers, and mode truncation, and it is usually trained to approximate a solution operator rather than one differential operator. Classical spectral methods also handle nonlinear PDEs, commonly by evaluating nonlinear products in physical space and transforming between physical and spectral representations. The useful correspondence is the per-mode multiplier structure, not an identification of the full methods.


## 6. Multiscale Hierarchies

<span id="multigrid-and-unet"></span>

### 6.1 Why a coarse level helps

For elliptic problems, simple relaxation methods often reduce oscillatory error rapidly but leave smooth error components that decay slowly on a fine grid. After restriction to a coarser grid, the same physical variation occupies fewer grid cells and can be corrected more efficiently.

A multigrid cycle therefore combines:

1. fine-grid smoothing;
2. residual restriction to a coarser grid;
3. a coarse-grid error solve or approximation;
4. prolongation of the correction;
5. additional fine-grid smoothing.

The hierarchy is tied to a residual equation and to transfer operators whose approximation and smoothing properties support convergence analysis.

### 6.2 The U-Net analogy

A U-Net encoder repeatedly downsamples features, a bottleneck processes the coarsest representation, and a decoder upsamples while receiving skip connections from matching resolutions. Downsampling makes long-range interactions cheaper in coarse coordinates, while the skip paths retain fine-scale information that might be lost at the bottleneck.

This is a strong architectural analogy to multigrid: both alternate local processing with transfers between resolutions. It is not an algorithmic equivalence. A standard U-Net does not explicitly form a PDE residual, solve a coarse-grid error equation, or satisfy a multigrid convergence theorem. Its transfer and correction maps are learned for a data loss, whereas classical multigrid derives them for a linear or nonlinear system.

The comparison is most useful as a design principle. Problems with widely separated spatial scales often benefit from architectures that communicate on more than one resolution, but the numerical meaning of each scale must still be established separately.


## 7. A PDE View of Graph Oversmoothing

<span id="graph-diffusion-oversmoothing"></span>

### 7.1 Diffusion-like propagation

Let $L$ be the combinatorial graph Laplacian of a connected undirected graph. It is positive semidefinite, and the graph heat equation is

$$
\frac{dH}{dt}=-LH.
$$

Forward Euler gives

$$
H^{(\ell+1)}=(I-\tau L)H^{(\ell)}.
$$

For a connected undirected graph with eigenpairs $(\lambda_k,q_k)$, the component in mode $q_k$ is multiplied by

$$
(1-\tau\lambda_k)^\ell.
$$

Under a stable step size, modes with $\lambda_k>0$ decay while the constant mode associated with $\lambda_0=0$ remains. Repeated propagation therefore removes variation across nodes and drives features toward the low-frequency subspace.

Certain linearized GCN or mean-aggregation updates are repeated low-pass graph filters of this kind. Their loss of node-level distinction can be understood as long-time diffusion. This gives a precise explanation for one important oversmoothing mechanism.

### 7.2 Scope of the diagnosis

Not every message-passing network is a heat equation. Directed edges, feature-dependent attention, nonlinear updates, source or reaction terms, normalization, and changing layer parameters can produce dynamics that are not generated by a fixed symmetric graph Laplacian. Oversmoothing also depends on what representation the task needs; convergence to a componentwise subspace is not identical to failure in every downstream readout.

The PDE viewpoint is therefore diagnostic rather than universal. If repeated averaging is the cause, a model can alter the dynamics through initial-feature injection, residual or antisymmetric pathways, directional transport, reaction terms, adaptive connectivity, or controlled depth. Adding a term labeled “convection” is not by itself a guarantee: the resulting update still needs stability, expressivity, and task-appropriate information preservation.

