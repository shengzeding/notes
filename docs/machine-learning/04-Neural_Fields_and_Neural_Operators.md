# Neural Fields and Neural Operators

A **neural field** represents a particular function by mapping continuous coordinates to field values. A **neural operator** approximates a map between functions. This chapter develops coordinate-based representations, conditioning mechanisms, and three operator architectures: DeepONet, the Graph Neural Operator (GNO), and the Fourier Neural Operator (FNO).

Write $D$ for the spatial domain, $x,y\in D$ for coordinates, and $\mathcal G:\mathcal U\to\mathcal V$ for an operator between spaces of functions. The subscript $\theta$ denotes learned parameters. Different architectures represent or discretize $\mathcal G_\theta$ differently; the term *operator* does not prescribe a particular neural-network layer.

---

## 1. Neural Fields: Coordinate-Based Function Representations

### 1.1 Discrete fields and coordinate networks

A discrete representation stores values $u_i=u(x_i)$ on a finite collection of grid or graph points $x_1,\ldots,x_N$. Evaluating the field between stored points requires an additional reconstruction or interpolation rule.

A **neural field**, also called an *implicit neural representation*, is a parameterized function

$$
\boxed{u_\theta:D\subseteq\mathbb R^{d_x}\longrightarrow\mathbb R^{d_u}.}
$$

The usual implementation is an ordinary MLP with a coordinate input:

$$
u_\theta(x)=\operatorname{MLP}_\theta(x),\qquad x=(x_1,\ldots,x_{d_x}),
$$

with time included among the coordinates when appropriate. A continuous coordinate can be queried without belonging to the training grid. This means that the **representation** is not restricted to a prescribed output mesh; it does not guarantee accuracy at arbitrarily fine scales.

Given coordinate–value observations $\{(x_i,u(x_i))\}_{i=1}^N$, supervised training minimizes, for example,

$$
\boxed{\mathcal L(\theta)=\frac1N\sum_{i=1}^N\|u_\theta(x_i)-u(x_i)\|_2^2.}
$$

This approximates a spatially integrated squared error when sampling and weighting are appropriate. A standard neural field represents **one fixed target field** after its parameters have been trained. Changing the coordinate changes the point being evaluated, not the physical instance being represented.

### 1.2 Spectral bias

For standard coordinate MLPs, low-frequency components are often fitted earlier or more accurately than high-frequency components under ordinary training. This is **spectral bias**, an optimization tendency rather than a prohibition on representing high-frequency functions.

For a Fourier expansion

$$
u(x)=\sum_k\widehat u_k e^{2\pi ikx},
$$

small $|k|$ corresponds to slowly varying structure and large $|k|$ to rapid oscillation. The bias matters for fields with fine-scale variation or sharp gradients. Its strength depends on network parameterization, initialization, training, and the data; it is not a universal theorem asserting that every MLP learns every low-frequency mode first.

### 1.3 Fourier feature encoding

Fourier features modify the **input representation**, not the MLP's hidden-layer architecture. In one dimension, define

$$
\gamma(x)=\big[\sin(2\pi b_1x),\cos(2\pi b_1x),\ldots,
\sin(2\pi b_mx),\cos(2\pi b_mx)\big]^T,
$$

and evaluate

$$
\boxed{u_\theta(x)=\operatorname{MLP}_\theta(\gamma(x)).}
$$

The frequencies $b_j$ in the lecture's formulation are fixed, often randomly selected, rather than separately trained. One scalar coordinate becomes $2m$ input features. For $x\in\mathbb R^{d_x}$, a common generalization uses frequency vectors $b_j\in\mathbb R^{d_x}$ and the arguments $b_j^Tx$.

The sinusoidal features provide oscillatory basis functions directly to the MLP. Their chosen range controls which spatial scales are easy to resolve. This resembles the sinusoidal coordinate encoding used in Transformers, though the objective here is function representation rather than token-order information.

### 1.4 SIREN: sinusoidal hidden activations

SIREN changes the **activation function** within the MLP:

$$
\boxed{h^{(l)}=\sin\big(\omega_0 W^{(l)}h^{(l-1)}+b^{(l)}\big).}
$$

The sinusoidal activation can generate oscillatory features within every hidden layer, while a Fourier-feature MLP supplies fixed oscillatory inputs to an otherwise conventional network. SIREN also requires carefully scaled initialization to control activations and gradients; replacing ReLU with sine without adjusting initialization is not the full method.

| Representation | Input transformation | Hidden activation | Main additional design choice |
|---|---|---|---|
| Plain coordinate MLP | Raw coordinates | ReLU, tanh, etc. | Network width and depth |
| Fourier-feature MLP | Fixed multi-frequency sine/cosine features | Conventional MLP activation | Frequencies and their scales |
| SIREN | Raw coordinates or an input transform | Sine in hidden layers | Frequency scale and initialization |

---

## 2. Conditional Neural Fields

### 2.1 Shared representation of a family of fields

A coordinate network $u_\theta(x)$ represents a single field. A **conditional neural field** adds information $z$ identifying the current instance:

$$
\boxed{u_\theta(x;z),\qquad x\in D,\quad z\in\mathbb R^{d_z}.}
$$

For fixed $z$, the map $x\mapsto u_\theta(x;z)$ is one field. Varying $z$ selects another field while the model's trainable parameters remain shared. The conditioning variable may be (i) known physical parameters, (ii) a latent code, or (iii) the output of an encoder applied to an input function. In particular, **$z$ is instance data, not a synonym for trainable network weights**.

The architectural question is where and how this condition enters the coordinate network.

### 2.2 Concatenation

The simplest conditioning is input concatenation:

$$
\boxed{u_\theta(x;z)=\operatorname{MLP}_\theta([x;z]).}
$$

If $x\in\mathbb R^{d_x}$ and $z\in\mathbb R^{d_z}$, the first linear layer receives $d_x+d_z$ features. Its preactivation can be written $W_xx+W_zz+b$. The same weights are used for all instances, while changes in $z$ alter the activations.

### 2.3 Feature-wise linear modulation (FiLM)

FiLM uses the condition to generate feature-wise scale and shift vectors. For a hidden activation $a^{(l)}$,

$$
\boxed{h^{(l)}=\gamma^{(l)}(z)\odot a^{(l)}+\beta^{(l)}(z),}
$$

where $a^{(l)}=\sigma(W^{(l)}h^{(l-1)}+b^{(l)})$ is one common ordering. A conditioning network $C_\phi$ generates $(\gamma^{(l)},\beta^{(l)})$; when the hidden width is $d_l$, both vectors lie in $\mathbb R^{d_l}$. The operation is elementwise rather than a general matrix product.

The trainable quantities are the weights of the main network and of $C_\phi$. The vectors $\gamma^{(l)}(z),\beta^{(l)}(z)$ are **computed anew for each condition**. Once a layer has been modulated, subsequent coordinate-network activations generally depend on $z$ as well. FiLM does not create a fully separate main-network parameter set for each instance.

### 2.4 Hypernetworks

A **hypernetwork** generates parameters used by a second network:

$$
\boxed{W(z)=H_\phi(z),\qquad u(x;z)=F(x;W(z)).}
$$

For a coordinate MLP $1\to8\to1$, including biases, the generated parameter vector has

$$
8\cdot1+8+1\cdot8+1=25
$$

entries. Thus one possible hypernetwork maps $\mathbb R^{d_z}\to\mathbb R^{25}$; its output is reshaped into the weight matrices and biases of the coordinate network. More generally, the generated parameters may belong to an MLP, CNN, GNN, or Transformer. Generating every parameter of a large main network can be costly, so partial parameter generation is also possible.

**Gradient propagation.** The generated weights remain differentiable intermediate values, rather than independently optimized parameters. With

$$
\hat u=F(x;H_\phi(z)),\qquad
\mathcal L=\ell(\hat u,u),
$$

the chain rule gives, after vectorizing the generated parameters,

$$
\boxed{\nabla_\phi\mathcal L
=\left(\frac{\partial H_\phi(z)}{\partial\phi}\right)^T
\nabla_W\mathcal L.}
$$

As a scalar illustration, let $W(z)=az+b$, $\hat u=W(z)x$, and $\mathcal L=\frac12(\hat u-y)^2$. Then

$$
\frac{\partial\mathcal L}{\partial a}=(\hat u-y)xz,
\qquad
\frac{\partial\mathcal L}{\partial b}=(\hat u-y)x.
$$

The optimizer updates $a,b$, not the generated $W(z)$ as a persistent independent weight. With several input conditions, their gradient contributions accumulate in the shared hypernetwork parameters $\phi$.

### 2.5 Cross-attention conditioning

If the condition is a token collection $Z=\{z_1,\ldots,z_M\}$ rather than one vector, the query coordinate can retrieve a location-dependent summary:

$$
q(x)=W_Qx,\qquad k_j=W_Kz_j,\qquad v_j=W_Vz_j,
$$

$$
\alpha_j(x,Z)=
\frac{\exp(q(x)^Tk_j/\sqrt{d_k})}
{\sum_{r=1}^M\exp(q(x)^Tk_r/\sqrt{d_k})},
\qquad
c(x,Z)=\sum_{j=1}^M\alpha_j(x,Z)v_j.
$$

The lecture's basic conditioning design then evaluates

$$
\boxed{u_\theta(x;Z)=\operatorname{MLP}_\theta([x;c(x,Z)]).}
$$

The query comes from the output coordinate; keys and values come from the conditioning tokens. Consequently, the retrieved information $c(x,Z)$ can change with $x$ even if $Z$ remains fixed. The attention projections are shared trainable parameters, while $\alpha_j$ are input-dependent coefficients.

| Mechanism | Information produced from the condition | Where it enters the coordinate model |
|---|---|---|
| Concatenation | The vector $z$ itself | Initial MLP input |
| FiLM | Channel-wise $\gamma(z),\beta(z)$ | Hidden activations |
| Hypernetwork | Parameters $W(z)$ | Main-network weights |
| Cross-attention | Query-dependent summary $c(x,Z)$ | Conditioning input or features |

### 2.6 From conditional field to operator

When the condition encodes an *input function*, a conditional field gives an operator representation:

$$
\boxed{z=E_\phi(u_0),\qquad
\mathcal G_{\theta,\phi}(u_0)(x)=u_\theta(x;E_\phi(u_0)).}
$$

The encoder $E_\phi$ may operate on function samples, a grid, a graph, or a known parameterization; the decoder evaluates the output field at the requested coordinate. A continuous-coordinate decoder permits arbitrary **output** queries, but input-resolution flexibility depends separately on the encoder. This distinction matters when evaluating claims of resolution invariance.

---

## 3. Deep Operator Network (DeepONet)

### 3.1 Branch–trunk construction

DeepONet specifies two learned maps:

$$
\text{Branch:}\quad b(u_0)=B_\phi(u_0)\in\mathbb R^p,
\qquad
\text{Trunk:}\quad t(x)=T_\psi(x)\in\mathbb R^p.
$$

Their outputs are combined at the final layer by an inner product:

$$
\boxed{\mathcal G_{\phi,\psi}(u_0)(x)=b(u_0)^Tt(x)
=\sum_{k=1}^pb_k(u_0)t_k(x).}
$$

For the classical sampled-input formulation, $B_\phi$ receives

$$
\mathbf u_0=[u_0(\xi_1),\ldots,u_0(\xi_m)]^T\in\mathbb R^m
$$

at fixed sensor positions $\xi_1,\ldots,\xi_m$. The trunk receives the output query coordinate $x\in\mathbb R^{d_x}$. Thus $m$ is the input sensor count and $p$ is the common branch/trunk feature width; they need not be equal.

The $t_k(x)$ can be viewed as learned coordinate-dependent basis functions and $b_k(u_0)$ as coefficients determined by the input function. For fixed trunk parameters, the predicted outputs lie in the span of $\{t_k\}_{k=1}^p$. This finite separable representation is efficient but constrains the model at fixed $p$.

### 3.2 Training and representation limits

With paired functions $\{(u_0^{(n)},u^{(n)})\}_{n=1}^M$ and output samples $x_j$, a typical loss is

$$
\mathcal L(\phi,\psi)=\frac1{MJ}
\sum_{n=1}^M\sum_{j=1}^J
\left|b(u_0^{(n)})^Tt(x_j)-u^{(n)}(x_j)\right|^2.
$$

For one predicted value, $\partial\hat u/\partial b=t$ and $\partial\hat u/\partial t=b$. Backpropagation therefore updates both branches through the final dot product. The branch computation can be reused across many output queries belonging to the same input function.

The trunk supports arbitrary output coordinates, whereas a classical branch MLP commonly expects a fixed input sensor layout. General operator-approximation results provide a theoretical basis for branch–trunk representations under appropriate continuity and compactness assumptions; they do not remove finite-capacity or sampling limitations.

---

## 4. Graph Neural Operator (GNO)

### 4.1 From graph messages to an integral kernel

A conventional message-passing GNN updates node $i$ by aggregating features over a discrete neighbor set:

$$
h_i^{(l+1)}=\Gamma_\theta\left(h_i^{(l)},
\sum_{j\in\mathcal N(i)}\Psi_\theta(h_i^{(l)},h_j^{(l)},e_{ij})\right).
$$

A GNO instead starts from a continuous kernel integral

$$
\boxed{(\mathcal Kv)(x)=\int_D\kappa_\theta(x,y)v(y)\,dy.}
$$

The learned function $\kappa_\theta(x,y)$ depends on the source and target coordinates, not on permanent node indices. With $v(y)\in\mathbb R^{d_{\mathrm{in}}}$, one construction uses a matrix-valued kernel

$$
\kappa_\theta(x,y)\in\mathbb R^{d_{\mathrm{out}}\times d_{\mathrm{in}}},
$$

so $\kappa_\theta(x,y)v(y)\in\mathbb R^{d_{\mathrm{out}}}$. The kernel may itself be generated by a coordinate MLP. For two-dimensional coordinates and a $16\to16$ feature mapping, such an MLP could map $\mathbb R^4\to\mathbb R^{256}$ and reshape its output into a $16\times16$ matrix.

### 4.2 Discrete quadrature and message passing

At sampling sites $y_j$, a quadrature approximation is

$$
\boxed{(\mathcal K_Nv)(x_i)=
\sum_{j\in\mathcal N(i)}w_{ij}\kappa_\theta(x_i,y_j)v(y_j).}
$$

Each term is a message from source point $y_j$ to target point $x_i$. For uniformly distributed samples over a unit-measure integration region, a simplified Monte Carlo rule uses $w_{ij}=1/N$ with an appropriate sum over the sampled region. This yields the schematic GNO layer in the lecture,

$$
\boxed{v_i^{(l+1)}=\sigma\left(Wv_i^{(l)}
+\frac1N\sum_{j\in\mathcal N(i)}
\kappa_\theta(x_i,x_j)v_j^{(l)}\right).}
$$

For nonuniform sampling, non-unit domain measure, or variable local neighborhoods, the quadrature weights must reflect the relevant sampling density and integration region. A bare factor $1/N$ is not a general substitute for a consistent integration scheme.

### 4.3 Resolution invariance and its conditions

A message-passing GNN can execute on graphs with different numbers of nodes because its message and update parameters are shared. This is a property of the **software-defined architecture**, not a proof that its outputs converge to a fixed continuum operator as a mesh is refined.

A simple counterexample takes $v(x)\equiv1$ on $[0,1]$ and a fully connected sum aggregation:

$$
\sum_{j=1}^Nv(x_j)=N,\qquad
\int_0^1v(y)\,dy=1.
$$

The unweighted sum grows with $N$, although the integral remains unchanged. Uniform averaging fixes this particular example, but not arbitrary sampling distributions. For example, if $v(x)=x$ and $x_j=(j/N)^2$,

$$
\lim_{N\to\infty}\frac1N\sum_{j=1}^Nx_j=\frac13
\ne\int_0^1x\,dx=\frac12.
$$

A convergent GNO discretization requires a coordinate-defined kernel, quadrature weights consistent with the intended measure, and neighborhoods consistent with the integration region. Under suitable regularity and quadrature conditions, refining the sampling approximates the same continuous kernel operator without changing $\theta$. Resolution-invariant parameterization alone does not guarantee identical prediction accuracy on all meshes.

GNO can accommodate irregular samples and geometries. Its principal computational costs arise from constructing neighborhoods and evaluating the kernel over source–target pairs.

---

## 5. Fourier Neural Operator (FNO)

### 5.1 Function-to-function architecture

FNO approximates an operator $\mathcal G:a(\cdot)\mapsto u(\cdot)$, but unlike the branch–trunk formulation, it processes an **entire sampled field** at once. For a two-dimensional regular grid, the discrete input and output have shapes such as

$$
A\in\mathbb R^{N_x\times N_y\times d_{\mathrm{in}}},\qquad
U\in\mathbb R^{N_x\times N_y\times d_{\mathrm{out}}}.
$$

The architecture consists of a pointwise **lifting** map $P$, a stack of Fourier layers $\mathcal L_1,\ldots,\mathcal L_L$, and a pointwise **projection** map $Q$:

$$
\boxed{\mathcal G_\theta=Q\circ\mathcal L_L\circ\cdots\circ\mathcal L_1\circ P.}
$$

At each grid point, $P:\mathbb R^{d_{\mathrm{in}}}\to\mathbb R^d$ creates $d$ hidden channels; the Fourier layers transform the hidden *field*; $Q:\mathbb R^d\to\mathbb R^{d_{\mathrm{out}}}$ gives the output field. These lifting/projection maps are typically small pointwise neural networks. Coordinates can also be supplied as input channels where appropriate.

Thus FNO, like a field-to-field CNN, produces a discretized output field. It does **not** require a separate trunk query for every output coordinate.

### 5.2 One Fourier layer

For hidden field $v^{(l)}:D\to\mathbb R^d$, the lecture's layer has two parallel paths:

$$
\boxed{v^{(l+1)}(x)=\sigma\left(
Wv^{(l)}(x)+
\mathcal F^{-1}\!\left(R_\theta\cdot\mathcal F(v^{(l)})\right)(x)
\right).}
$$

The **pointwise path** $Wv^{(l)}(x)$ uses the same channel-mixing matrix at each coordinate and does not itself exchange information between different spatial positions. The **spectral path** performs:

1. Spatial FFT: transform the entire field into Fourier coefficients.
2. Mode selection: retain a prescribed number of low-frequency modes.
3. Spectral multiplication: apply a learned complex channel-mixing matrix to each retained mode.
4. Inverse FFT: reconstruct the transformed spatial field, using zeros for discarded spectral components.

The outputs of the two paths are added and passed through $\sigma$. FFT and inverse FFT are fixed transforms, not learned parameters. The learnable spectral parameters are the matrices $R_\theta(k)$.

A single Fourier layer has global spatial reach because each Fourier coefficient depends on samples across the domain. This differs from the gradual growth of receptive field in a local CNN.

### 5.3 Tensor shapes and spectral parameters

Consider a $64\times64$ grid with $d=16$ hidden channels:

$$
V^{(l)}\in\mathbb R^{64\times64\times16}
\quad\xrightarrow{\operatorname{FFT2}}\quad
\widehat V^{(l)}\in\mathbb C^{64\times64\times16}.
$$

Retain a nominal $k_{\max}\times k_{\max}$ set of low-frequency modes, with $k_{\max}=12$. In the lecture's simplified shape convention,

$$
\widehat V_{\mathrm{trunc}}^{(l)}\in\mathbb C^{12\times12\times16},
\qquad
R_\theta\in\mathbb C^{12\times12\times16\times16}.
$$

For a retained mode $k=(k_1,k_2)$,

$$
\boxed{\widehat V'(k)=R_\theta(k)\widehat V^{(l)}(k),
\qquad
(16\times16)(16\times1)=(16\times1).}
$$

The multiplication mixes **channels at the same frequency**; it is not a dense learned interaction between all pairs of Fourier modes. Actual real-valued FFT implementations also account for negative-frequency indexing and conjugate symmetry, so stored parameter-array shapes can differ from the schematic $12\times12$ example.

After restoring the full spectral array, the inverse FFT returns a real field of shape $64\times64\times16$. The pointwise branch has that same shape, permitting elementwise addition.

### 5.4 Resolution changes and spectral truncation

An FNO trained at $64\times64$ can be evaluated at, for example, $256\times256$ using FFTs of the new size while retaining the same learned $R_\theta$ for a fixed number of modes. Its **parameter count** does not grow with the number of grid points:

$$
R_\theta\in\mathbb C^{k_{\max}\times k_{\max}\times d\times d}
$$

in the simplified two-dimensional convention. This is the mechanism of the resolution invariance discussed in the lecture. It allows cross-resolution parameter reuse; reliable numerical convergence and predictive accuracy at new resolutions remain separate questions.

Low-mode truncation reduces spectral parameter cost and is effective for relatively smooth fields. It also suppresses the learnable spectral response to fine-scale or discontinuous structure. Nonlinearities and the pointwise path still influence the full layer output, so truncation should not be interpreted as simply deleting every possible high-frequency contribution from the final nonlinear network.

The regular-grid FFT also builds in a periodic-extension structure. Standard FNO is consequently most natural on regular, approximately periodic domains; irregular geometries and nonperiodic boundaries typically require additional handling such as padding, mappings, or modified architectures. For $N$ total grid points, FFT computation scales approximately as $O(N\log N)$, in addition to channel operations and retained-mode multiplications.

---

## 6. Architecture Comparison

| Architecture | Structural computation | Input representation | Output representation | Main resolution caveat |
|---|---|---|---|---|
| Neural field | Coordinate MLP | Coordinate $x$ | Value $u_\theta(x)$ | One fixed field; coordinate query does not ensure accuracy |
| Conditional neural field | Coordinate network modulated by $z$ | Condition and coordinate | Value $u_\theta(x;z)$ | Input encoder may be discretization-dependent |
| DeepONet | Branch–trunk dot product | Input-function samples and coordinate | Value $\mathcal G_\theta(u_0)(x)$ | Fixed branch sensor layout in classical design |
| GNO | Quadrature of learned spatial kernel | Sampled field and coordinates/graph | Field at sampled positions | Consistent quadrature and neighborhoods required |
| FNO | Fourier-mode channel transforms | Field on regular grid | Field on regular grid | FFT grid and boundary assumptions |

A conventional CNN or GNN can also approximate a function-to-function map; an operator-learning problem alone does not make a network resolution-invariant. Conversely, standard convolutional parameter sharing can permit CNNs to run at several spatial sizes. The more specific distinction is whether changing the discretization preserves a meaningful approximation to the **same continuous operator**.

DeepONet and conditional neural fields represent output values through coordinate queries. GNO and FNO construct operator-like layers for updating entire sampled fields. GNO parameterizes interactions by spatial kernel evaluations and numerical quadrature; FNO parameterizes a frequency-domain transformation with a fixed set of learned modes.
