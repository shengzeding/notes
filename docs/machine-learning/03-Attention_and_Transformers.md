# Attention and Transformer Architectures

Attention computes interactions between positions using coefficients derived from the current input. Its defining operation is a weighted aggregation of value vectors, with weights obtained by comparing queries and keys. Multi-head attention, positional information, masking, and feed-forward layers turn this operation into Transformer architectures for sequences and spatial fields.


## 1. Scaled Dot-Product Attention

### 1.1 Query, key, and value projections

For input vectors $x_i\in\mathbb R^{d_{\mathrm{in}}}$, define

$$
\boxed{q_i=W_Qx_i,\qquad k_i=W_Kx_i,\qquad v_i=W_Vx_i,}
$$

where

$$
W_Q,W_K\in\mathbb R^{d_k\times d_{\mathrm{in}}},\qquad
W_V\in\mathbb R^{d_v\times d_{\mathrm{in}}}.
$$

Queries and keys have the same width so their dot product is defined. A **query** represents a receiving position for matching, a **key** represents a potential source for matching, and a **value** contains the features passed from that source. The roles are fixed by the subsequent computation, while the projection coefficients are learned from the task loss. The same matrices are shared across token positions.

Stacking input vectors as rows of $X\in\mathbb R^{N\times d_{\mathrm{in}}}$ gives the equivalent row-vector convention

$$
Q=XW_Q^T,\qquad K=XW_K^T,\qquad V=XW_V^T,
$$

with $Q,K\in\mathbb R^{N\times d_k}$ and $V\in\mathbb R^{N\times d_v}$. The transposes come only from the choice to store tokens as rows rather than columns.

### 1.2 Scores, normalization, and aggregation

The score of source $j$ for receiving position $i$ is

$$
s_{ij}=\frac{q_i^Tk_j}{\sqrt{d_k}}.
$$

The $1/\sqrt{d_k}$ factor limits the scale of large dot products. All scores form

$$
S=\frac{QK^T}{\sqrt{d_k}}\in\mathbb R^{N\times N}.
$$

Apply softmax along each row to obtain the attention weights:

$$
\alpha_{ij}=\frac{\exp(s_{ij})}{\sum_{\ell=1}^{N}\exp(s_{i\ell})},
\qquad \sum_{j=1}^{N}\alpha_{ij}=1.
$$

The output is a weighted sum of value vectors,

$$
y_i=\sum_{j=1}^{N}\alpha_{ij}v_j,
$$

or, in matrix notation,

$$
\boxed{\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V.}
$$

| Object | Shape | Role |
|---|---|---|
| $Q,K$ | $N\times d_k$ | Matching representations |
| $V$ | $N\times d_v$ | Transmitted content |
| $S,A$ | $N\times N$ | Pairwise scores and normalized weights |
| $Y=AV$ | $N\times d_v$ | Aggregated token features |

The entry $A_{ij}=\alpha_{ij}$ measures how much output position $i$ uses source position $j$. In general $A_{ij}\ne A_{ji}$; attention is not a symmetric distance or similarity matrix.

### 1.3 Dynamic weights and nonlinear dependence

The directly trainable parameters are $W_Q,W_K,W_V$; the attention matrix $A$ is **recomputed for each input**:

$$
A(X)=\operatorname{softmax}\!\left(
\frac{XW_Q^TW_KX^T}{\sqrt{d_k}}
\right),\qquad
Y=A(X)XW_V^T.
$$

A trained MLP uses fixed learned connection coefficients at inference, whereas a trained attention layer uses fixed projection matrices to generate **input-dependent** coefficients between tokens. Calling $A$ a weight matrix does not mean that each $\alpha_{ij}$ is an independently optimized parameter.

Softmax is the main explicit activation in basic attention. The total mapping is also nonlinear because $QK^T=XW_Q^TW_KX^T$ is quadratic in the shared input $X$. If $A$ were fixed, $Y=AXW_V^T$ would instead be linear in $X$. This distinction concerns the attention mechanism; a nonlinear MLP can also approximate interactions given sufficient capacity.


## 2. Multi-Head Attention

For $M$ heads, each head has independent query, key, and value projections:

$$
H_m=\operatorname{Attention}
\left(X(W_Q^{(m)})^T,X(W_K^{(m)})^T,X(W_V^{(m)})^T\right),
\qquad m=1,\ldots,M.
$$

Concatenating the head outputs and applying a linear projection gives

$$
\boxed{\operatorname{MultiHead}(X)=\operatorname{Concat}(H_1,\ldots,H_M)W_O.}
$$

If each head produces $N\times d_v$, the concatenated feature width is $Md_v$ and $W_O\in\mathbb R^{Md_v\times d_{\mathrm{model}}}$ in the row-vector convention. A common choice is

$$
d_k=d_v=\frac{d_{\mathrm{model}}}{M},
$$

provided $d_{\mathrm{model}}$ is divisible by $M$. This is conventional, not a requirement of attention.

For $d_{\mathrm{model}}=64$, $M=4$, $d_k=d_v=16$, and $N=10$, each head returns $10\times16$; concatenation returns $10\times64$, and the output projection preserves $10\times64$.

Different heads have the capacity to learn different matching relations, but no specific function is assigned to a head, and multiple heads may be redundant. The construction is analogous to using several learned feature channels in a CNN.


## 3. Input Embedding and Positional Information

### 3.1 Distinguishing feature dimensions

The four dimensions commonly used in Transformer descriptions have different roles:

| Symbol | Definition |
|---|---|
| $d_{\mathrm{in}}$ | Width of the input to the operation currently under discussion |
| $d_{\mathrm{model}}$ | Common feature width within Transformer blocks |
| $d_k$ | Width of each query and key |
| $d_v$ | Width of each value |

If raw observations have width $d_{\mathrm{raw}}$, an **optional input embedding** maps them to model width:

$$
e_t=W_{\mathrm{emb}}s_t+b_{\mathrm{emb}}\in\mathbb R^{d_{\mathrm{model}}}.
$$

The subsequent Q/K/V projections operate on $e_t$, or its position-augmented version. Thus the attention module's $d_{\mathrm{in}}$ often equals $d_{\mathrm{model}}$, even when the original observations have a different dimension. **Input embedding and Q/K/V projections are distinct transformations**; generic attention does not require a separate embedding layer.

### 3.2 Positional encoding

Without position-dependent information or a structural mask, self-attention is permutation equivariant:

$$
\operatorname{Attention}(PX)=P\operatorname{Attention}(X)
$$

for a permutation matrix $P$ that reorders tokens. It does not intrinsically encode temporal order or spatial coordinates. A common remedy is

$$
\tilde x_t=x_t+\operatorname{PE}(t).
$$

The lecture's fixed sinusoidal positional encoding is

$$
\operatorname{PE}(t)_{2k}=\sin\left(\frac{t}{10000^{2k/d_{\mathrm{model}}}}\right),
\qquad
\operatorname{PE}(t)_{2k+1}=\cos\left(\frac{t}{10000^{2k/d_{\mathrm{model}}}}\right).
$$

Learned positional embeddings and relative-position methods are alternatives. For spatial fields, positional information typically represents 2D coordinates rather than sequence indices.


## 4. Causal Attention and Sequence Mapping

### 4.1 Full self-attention and causal masking

In **self-attention**, Q, K, and V are derived from the same token collection. Without a mask, each position may attend to every other position, including itself. In **cross-attention**, queries come from a receiving sequence and keys/values from a source sequence; the score matrix may be rectangular.

Autoregressive prediction requires position $i$ to exclude future positions $j>i$. A **causal mask** sets these scores to $-\infty$ before softmax:

$$
S_{ij}=\begin{cases}
q_i^Tk_j/\sqrt{d_k},&j\le i,\\
-\infty,&j>i.
\end{cases}
$$

Thus $\alpha_{ij}=0$ for $j>i$. Inputs and targets must also be shifted consistently: when position $t$ receives the observed state $s_t$, its readout may predict $s_{t+1}$ without accessing future targets.

### 4.2 Parallel training and autoregressive inference

For a fully observed training sequence, all positions of a causal-attention layer can be computed simultaneously using the triangular mask. This differs from recurrent computation, where $h_t$ depends explicitly on the previously computed $h_{t-1}$.

At inference, autoregressive generation remains sequential in *generated states*:

$$
(s_0,\ldots,s_t)\mapsto\hat s_{t+1},\qquad
(s_0,\ldots,s_t,\hat s_{t+1})\mapsto\hat s_{t+2}.
$$

Each new token may attend directly to previous positions, but future generated inputs do not yet exist. Prediction errors can accumulate over long rollouts.

### 4.3 Model usage patterns

| Structure | Readout / information access |
|---|---|
| Aligned many-to-many | Full attention; an output at each observed position |
| Many-to-one | Full attention; pooled or selected sequence-level readout |
| Encoder–decoder | Encoder full attention; decoder causal self-attention and cross-attention |
| Autoregressive continuation | Causal attention; generated outputs appended as context |

These are architectural choices of masks, readouts, and information sources; all use the same underlying Q/K/V algebra.

---

## 5. Transformer Block

Attention alone is not a complete Transformer block. A standard block combines multi-head attention, a positionwise feed-forward network (FFN), residual connections, and normalization. One **pre-normalization** form is

$$
\boxed{\begin{aligned}
Z&=X+\operatorname{MultiHead}(\operatorname{LN}(X)),\\
Y&=Z+\operatorname{FFN}(\operatorname{LN}(Z)).
\end{aligned}}
$$

The same FFN operates independently at each token position:

$$
\operatorname{FFN}(z)=W_2\phi(W_1z+b_1)+b_2,
$$

where $\phi$ is often ReLU or GELU. Attention exchanges information **across positions**; the FFN transforms features **within each position**. Residual connections supply additive paths across blocks, while layer normalization uses input-dependent feature statistics. Post-normalization blocks are also possible.

The complete block has nonlinearities beyond attention softmax, including the FFN activation and normalization. The block equations here describe standard Transformer practice; the lecture emphasizes attention and its usage modes rather than presenting one canonical block implementation.


## 6. Spatial Attention and Vision Transformers (ViTs)

A ViT converts a spatial field into a collection of patch tokens. For a field $F\in\mathbb R^{C\times H\times W}$ and nonoverlapping $p\times p$ patches, assume $H$ and $W$ are divisible by $p$. Then

$$
N=\frac{H}{p}\frac{W}{p},\qquad
\text{patch width}=Cp^2.
$$

Each flattened patch $r_i\in\mathbb R^{Cp^2}$ is projected into the model space:

$$
e_i=W_er_i+b_e,\qquad
W_e\in\mathbb R^{d_{\mathrm{model}}\times Cp^2}.
$$

After adding 2D position information, the resulting $N$ tokens are processed by Transformer blocks. A readout maps token features to the required prediction; dense field reconstruction requires an appropriate spatial output mechanism.

With global attention, every patch has access to all other unmasked patches in one layer. Unlike convolution, this does not impose a fixed local spatial kernel or translation equivariance. Patchification reduces token count but may discard fine-scale information; boundaries and resolution transfer require explicit design choices.


## 7. Connectivity and Computational Cost

Global attention can be interpreted as learned message passing on a complete graph:

$$
y_i=\sum_{j=1}^N\alpha_{ij}(X)v_j.
$$

A graph-attention layer restricts $j$ to prescribed graph neighbors; unrestricted self-attention allows all token pairs. Masks impose restricted connectivity without changing the aggregation rule.

The score matrix $QK^T$ has $N^2$ entries. For one head, score computation costs $O(N^2d_k)$, and an explicitly materialized attention matrix requires $O(N^2)$ storage. Sparse/local attention, reduced token counts, and approximate attention methods alter this cost-connectivity trade-off. Efficient implementations may avoid materializing the full weight matrix, but dense pairwise computation remains a scaling concern.


