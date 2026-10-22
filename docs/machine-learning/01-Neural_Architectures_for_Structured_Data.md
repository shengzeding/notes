---
title: Neural Architectures for Structured Data
order: 1
---

# Neural Architectures for Structured Data

A neural architecture specifies the form of a parameterized map $f_\theta$ and the pattern by which its components exchange information. These structures encode different **inductive biases**, even when trained with the same loss and optimizer.


## 1. Multilayer Perceptrons (MLPs)

### 1.1 Neurons, layers, and composition

A neuron applies an affine map followed by an activation:

$$
z=w^Tx+b,\qquad y=\sigma(z).
$$

A fully connected layer evaluates several neurons at once:

$$
h=\sigma(Wx+b),\qquad
W\in\mathbb R^{d_{\mathrm{out}}\times d_{\mathrm{in}}},\quad
b\in\mathbb R^{d_{\mathrm{out}}}.
$$

An $L$-layer MLP composes such transformations:

$$
h^{(0)}=x,\qquad
h^{(\ell)}=\sigma_\ell\!\left(W^{(\ell)}h^{(\ell-1)}+b^{(\ell)}\right),
\qquad y=h^{(L)}.
$$

The output activation may be the identity for regression. Training optimizes all weights and biases together:

$$
\theta^*=\operatorname*{arg\,min}_{\theta}\mathcal L(\theta;\mathcal D).
$$

**Nonlinearity.** Without activations, a stack of affine layers is another affine map:

$$
W_2(W_1x+b_1)+b_2=(W_2W_1)x+(W_2b_1+b_2).
$$

It can still be trained by backpropagation, but stacking layers cannot create nonlinear input–output dependence. Narrow intermediate layers may also restrict the rank of the effective matrix. Common activations include sigmoid, $\tanh$, and ReLU; the first two saturate for large inputs, while ReLU is piecewise linear and has zero derivative on its negative side.

### 1.2 Input and output representations

A standard MLP layer operates on vectors,

$$
f_\theta:\mathbb R^{d_{\mathrm{in}}}\rightarrow\mathbb R^{d_{\mathrm{out}}},
$$

but the underlying data need not be intrinsically one-dimensional. A gridded field may be flattened before an MLP and reshaped after its output. A coordinate-based MLP instead maps location and time directly to a field value:

$$
(x,y,t)\mapsto f_\theta(x,y,t)\approx u(x,y,t).
$$

Neither flattening nor output reshaping gives a fully connected layer explicit awareness of spatial adjacency. MLPs have no built-in rule for reusing the same local relation at multiple spatial locations. Intermediate features are learned, not assigned physical meanings in advance.


## 2. Convolutional Neural Networks (CNNs)

### 2.1 Convolution on a regular grid

For an input field $F_{i,j}$ and a kernel of radius $r$, the convolution operation used in deep-learning implementations is

$$
(K*F)_{i,j}=\sum_{a=-r}^{r}\sum_{b=-r}^{r}K_{a,b}F_{i+a,j+b}.
$$

This convention is technically *cross-correlation*, since the kernel is not flipped. A learned kernel has a fixed spatial support, and **the same coefficients are reused at every grid location**. Two properties follow:

- **Locality:** one output location initially depends on a fixed-size input neighborhood.
- **Weight sharing:** kernel parameters do not grow with the number of input pixels.

For one input and one output channel, a $3\times3$ kernel has nine weights regardless of the field resolution, plus an optional bias. Boundary padding and stride determine the spatial dimensions of the output.

### 2.2 Multiple channels and kernel tensor dimensions

Let $F\in\mathbb R^{C_{\mathrm{in}}\times H\times W}$ and suppose the layer produces $C_{\mathrm{out}}$ feature maps using a $k\times k$ kernel, where $k=2r+1$. Its parameters are

$$
K\in\mathbb R^{C_{\mathrm{out}}\times C_{\mathrm{in}}\times k\times k},
\qquad b\in\mathbb R^{C_{\mathrm{out}}}.
$$

For output channel $o$ at location $(i,j)$,

$$
\boxed{
Y_{o,i,j}=\sigma\left(
\sum_{c=1}^{C_{\mathrm{in}}}
\sum_{a=-r}^{r}\sum_{b=-r}^{r}
K_{o,c,a,b}F_{c,i+a,j+b}+b_o
\right).}
$$

Each output channel sums contributions **across all input channels**; each output channel has a different collection of kernels. The trainable kernel-weight count is

$$
P_K=C_{\mathrm{out}}C_{\mathrm{in}}k^2.
$$

For $C_{\mathrm{in}}=3$, $C_{\mathrm{out}}=64$, and $k=3$,

$$
K\in\mathbb R^{64\times3\times3\times3},\qquad
P_K=64\cdot3\cdot3\cdot3=1728,
$$

plus 64 optional biases. The axes are *(output channels, input channels, kernel height, kernel width)*. The value 64 counts **feature maps**, not spatial positions.

For comparison, an MLP forms $y_o=\sigma(\sum_cW_{o,c}x_c+b_o)$. A convolutional layer introduces spatial offsets $(a,b)$ and shares the coefficients attached to those offsets across locations.

### 2.3 Translation equivariance

For a spatial translation $T_s$, a mapping $f$ is **equivariant** when

$$
f(T_sF)=T_sf(F).
$$

Convolution with shared kernels has translation equivariance on a translation-compatible domain. It differs from **invariance**, $f(T_sF)=f(F)$, in which the transformation is discarded. Global pooling may produce an invariant representation, but field-to-field prediction often requires location-dependent outputs. Finite boundaries, padding, striding, and pooling can alter exact equivariance.

### 2.4 Receptive field, pooling, and feature maps

For $L$ successive $3\times3$ convolutions with unit stride and no dilation, the theoretical receptive-field width is

$$
R_L=1+2L.
$$

Local information thus propagates over larger regions as layers are stacked. The *effective* influence of individual input positions depends on the learned parameters and need not be uniform over this region.

Pooling or strided convolution reduces spatial resolution and increases the original-input region covered by later features. It also discards fine-scale information. This is a consequential trade-off for dense physical-field prediction.

Channel counts, kernel shapes, and connectivity are specified before training; **the meaning of an individual feature channel is not**. A trained channel may respond to a local pattern or a smoother aggregate, but no particular response is guaranteed. Consistently permuting one layer's output channels and the next layer's corresponding input-channel weights leaves the network function unchanged.

### 2.5 Local stencils and global field maps

For equal grid spacing $h$, the stencil

$$
K=\begin{bmatrix}0&1&0\\1&-4&1\\0&1&0\end{bmatrix}
$$

produces $h^2$ times the usual five-point discrete Laplacian. Its presence illustrates the relation between convolution and local numerical operators; learned CNN kernels need not reproduce recognizable differential stencils.

A differential operator such as $\nabla^2u$ is local, whereas solving a boundary-value problem can define a **global solution map**. A small-kernel CNN has a limited receptive field, so global dependencies may require depth, multiscale processing, suitable boundary features, or other long-range mechanisms. A model also does not automatically generalize across resolutions merely because convolutional weights are resolution-independent.


## 3. Graph Neural Networks (GNNs)

### 3.1 Graph representation

A graph $G=(V,E)$ consists of nodes and edges. Node $i$ carries a feature vector $h_i$; its neighbors are

$$
\mathcal N(i)=\{j:(j,i)\in E\}.
$$

Edges may reflect mesh connectivity or another chosen adjacency rule. Unlike a regular grid, an unstructured graph allows varying node degrees and geometric offsets. A graph network replaces the CNN's fixed spatial offsets by the actual set $\mathcal N(i)$.

### 3.2 Message-passing layer

A common message-passing formulation is

$$
\boxed{\begin{aligned}
m_{ij}&=\psi_\theta(h_i,h_j,e_{ij}),\\
m_i&=\bigoplus_{j\in\mathcal N(i)}m_{ij},\\
h_i^{\mathrm{new}}&=\gamma_\theta(h_i,m_i).
\end{aligned}}
$$

The optional edge feature $e_{ij}$ may encode geometry. The message function $\psi_\theta$ and update function $\gamma_\theta$ are **shared across nodes and edges**; $\bigoplus$ aggregates a variable number of neighbors. One layer communicates over one graph hop, and $L$ ordinary message-passing layers can transmit information up to $L$ hops.

### 3.3 Permutation symmetry of aggregation

A neighbor list has no physically prescribed order. Aggregation must therefore be invariant to a permutation of the neighbors:

$$
\bigoplus_{j\in\mathcal N(i)}m_{ij}
=\bigoplus_{j\in\pi(\mathcal N(i))}m_{ij}.
$$

| Aggregation | Property |
|---|---|
| Sum | Preserves total message magnitude; degree-sensitive |
| Mean | Normalizes by degree; does not preserve total magnitude |
| Max | Retains strongest componentwise response; discards the rest |

Local aggregation is **permutation invariant**. A node-to-node network should usually be **permutation equivariant** to a consistent relabeling of all nodes: relabeling inputs relabels corresponding outputs. Edge features must be relabeled along with their incident nodes.

### 3.4 Common message-passing variants

**GCN-style averaging.** A simplified update is

$$
h_i^{\mathrm{new}}=\sigma\left(W\frac{1}{|\mathcal N(i)|}
\sum_{j\in\mathcal N(i)}h_j\right).
$$

All neighbors contribute equally in this simplified form; the canonical GCN has additional self-loop and degree-normalization details. Without geometric inputs, averaging cannot distinguish direction or distance.

**Edge-feature-aware networks.** Relative geometry may enter the message function:

$$
e_{ij}=x_j-x_i,\qquad
m_{ij}=\operatorname{MLP}([h_i,h_j,e_{ij}]).
$$

This allows different contributions from geometrically different neighbors. Including coordinates alone does not enforce rotation equivariance or conservation.

**Graph attention networks (GATs).** A learned score assigns different weights to connected neighbors:

$$
\alpha_{ij}=\frac{\exp(\operatorname{score}(h_i,h_j))}
{\sum_{k\in\mathcal N(i)\cup\{i\}}\exp(\operatorname{score}(h_i,h_k))},
$$

$$
h_i^{\mathrm{new}}=\sigma\left(
\sum_{j\in\mathcal N(i)\cup\{i\}}\alpha_{ij}Wh_j\right).
$$

The score determines neighbor importance, while $Wh_j$ supplies message content. The attention weights are recomputed from current node features rather than treated as fixed edge parameters.
