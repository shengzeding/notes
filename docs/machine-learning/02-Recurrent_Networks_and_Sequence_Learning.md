---
title: Recurrent Networks and Sequence Learning
order: 2
---

# Recurrent Networks and Sequence Learning


## 1. Recurrent Neural Networks (RNNs)

### 1.1 Recurrent cell and trainable parameters

A plain RNN cell computes

$$
\boxed{\begin{aligned}
z_t&=W_hh_{t-1}+W_xx_t+b_h,\\
h_t&=\sigma(z_t),\\
y_t&=g(h_t).
\end{aligned}}
$$

For a linear readout, $g(h_t)=W_yh_t+b_y$. Dimensions are

$$
\begin{aligned}
x_t&\in\mathbb R^{d_x},& h_t&\in\mathbb R^{d_h},&y_t&\in\mathbb R^{d_y},\\
W_x&\in\mathbb R^{d_h\times d_x},&W_h&\in\mathbb R^{d_h\times d_h},&W_y&\in\mathbb R^{d_y\times d_h}.
\end{aligned}
$$

The single-layer RNN with a linear readout has three weight matrices and two bias vectors. Its parameter count is

$$
P_{\mathrm{RNN}}=d_h(d_x+d_h+1)+d_y(d_h+1).
$$

**Temporal weight sharing:** the same $W_h$, $W_x$, and biases are used for every $t$. Unrolling $T$ time steps creates $T$ *applications* of the cell, not $T$ independently trained copies. Sequence length affects runtime and gradient path length but not this parameter count.

### 1.2 Hidden state and readout patterns

With an initial state $h_0$, repeated substitution shows that

$$
h_t=F_\theta(x_1,\ldots,x_t;h_0).
$$

Thus $h_t$ is a fixed-dimensional learned representation of input history, not a lossless recording of it. A simple scalar recurrence illustrates the dependence:

$$
h_t=ah_{t-1}+x_t,\quad h_0=0
\quad\Longrightarrow\quad
h_t=\sum_{j=1}^{t}a^{t-j}x_j.
$$

A **many-to-many** model reads out each state, $y_t=g(h_t)$. A **many-to-one** model uses only the final readout, $y=g(h_T)$. The recurrent transition is the same; the placement of predictions and losses differs.

### 1.3 Physical state, input, hidden state, and output

For dynamical prediction, write $s_t$ for the physical system state and $\hat s_t$ for its prediction. RNN symbols refer to the computational interface:

| Symbol | Meaning |
|---|---|
| $s_t$ | Physical state at time $t$ |
| $x_t$ | Input supplied to the recurrent cell; may be $s_t$, $\hat s_t$, or an observation |
| $h_t$ | Internal learned history representation |
| $y_t$ | Readout; can be $\hat s_{t+1}$ in next-state prediction |

For a one-step state predictor trained on observed states,

$$
x_t=s_t,\qquad
h_t=\sigma(W_hh_{t-1}+W_xs_t+b_h),\qquad
\hat s_{t+1}=W_yh_t+b_y.
$$

The accurate shorthand for the recurrent predictor is

$$
(\hat s_{t+1},h_t)=F_\theta(s_t,h_{t-1}),
$$

rather than $\hat s_{t+1}=f_\theta(s_t)$ with the hidden memory omitted. In general $h_t\ne s_t$ and $d_h$ need not equal the physical state dimension.

For a complete autonomous Markov state, a direct learned flow map $s_{t+1}\approx\Phi_{\Delta t}(s_t)$ may suffice. Recurrence is particularly relevant for partial observations or history-dependent targets.


<span id="autoregressive-prediction"></span>

## 2. Autoregressive Prediction and Training

<span id="rnn-autoregressive-rollout"></span>

### 2.1 Rollout as a feedback computation

An **autoregressive rollout** is an instance of [autoregressive prediction](#autoregressive-prediction "concept:autoregressive-prediction"): it feeds a model's prediction into its next input. For an initial observed state $s_0$,

$$
\begin{aligned}
h_0&=\sigma(W_hh_{-1}+W_xs_0+b_h),
&\hat s_1&=g(h_0),\\
h_1&=\sigma(W_hh_0+W_x\hat s_1+b_h),
&\hat s_2&=g(h_1),\\
h_2&=\sigma(W_hh_1+W_x\hat s_2+b_h),
&\hat s_3&=g(h_2).
\end{aligned}
$$

Both $h_t$ and $\hat s_{t+1}$ are passed forward, but serve different purposes: $h_t$ is the internal memory and $\hat s_{t+1}$ is the next physical-state input. A model may also receive exogenous inputs such as known forcing or boundary conditions independently of prediction feedback.

### 2.2 Teacher-forced and rollout training

Given observed states $s_0,\ldots,s_T$, one-step supervised training supplies the *true* state at each step:

$$
x_t=s_t,\qquad
\mathcal L_{\mathrm{1step}}=\frac1T\sum_{t=0}^{T-1}
\|\hat s_{t+1}-s_{t+1}\|_2^2.
$$

This training regime is commonly described as **teacher forcing**. The hidden state still depends on the preceding sequence; the time steps are not independent regressions.

A second choice is to use model-generated inputs during training and differentiate through an $H$-step rollout:

$$
x_{t+1}=\hat s_{t+1},\qquad
\mathcal L_{\mathrm{rollout}}=
\sum_{k=1}^{H}\|\hat s_{t+k}-s_{t+k}\|_2^2.
$$

The rollout loss includes gradient paths through both hidden-state recurrence and predicted-input feedback. Mixtures of supervised inputs and feedback are also possible. **Autoregression describes prediction feedback, not a unique training algorithm.** A model trained on true inputs can still be run autoregressively at inference time.

One-step error and multi-step rollout error are distinct objectives. During rollout, a prediction error alters subsequent inputs and may accumulate or amplify.


## 3. Backpropagation Through Time (BPTT)

### 3.1 The unrolled computation graph

BPTT applies reverse-mode differentiation to the RNN unrolled over time. For a sequence of per-step losses,

$$
\mathcal L=\sum_{t=1}^{T}\ell_t(y_t,y_t^*),\qquad
y_t=W_yh_t+b_y,
$$

the shared parameters appear at several locations in the computation graph. **Their gradients are sums of contributions from every occurrence.** There is one optimizer update for each shared matrix, not a separate update for each time index.

### 3.2 Backward recurrence and parameter gradients

Define the output sensitivity $e_t=\partial\ell_t/\partial y_t$ and the recurrent preactivation sensitivity $\delta_t=\partial\mathcal L/\partial z_t$. For an elementwise activation,

$$
\boxed{
\delta_t=\left(W_y^Te_t+W_h^T\delta_{t+1}\right)
\odot\sigma'(z_t),\qquad\delta_{T+1}=0.
}
$$

The first term comes from the loss at time $t$; the second term carries sensitivities backward from later steps. The gradients of the shared parameters are

$$
\boxed{\begin{aligned}
\frac{\partial\mathcal L}{\partial W_h}&=
\sum_{t=1}^T\delta_t h_{t-1}^T,&
\frac{\partial\mathcal L}{\partial W_x}&=
\sum_{t=1}^T\delta_t x_t^T,\\
\frac{\partial\mathcal L}{\partial b_h}&=\sum_{t=1}^T\delta_t,&
\frac{\partial\mathcal L}{\partial W_y}&=
\sum_{t=1}^Te_t h_t^T,\\
\frac{\partial\mathcal L}{\partial b_y}&=\sum_{t=1}^Te_t.
\end{aligned}}
$$

These expressions describe the displayed RNN with externally supplied inputs. Differentiable feedback $x_{t+1}=\hat s_{t+1}$ introduces additional paths and requires backpropagation through the *entire* rollout graph.

For a scalar recurrence $h_t=wh_{t-1}$ with $h_0=1$ and final loss $\mathcal L=\tfrac12(h_3-r)^2$, direct differentiation gives

$$
\frac{d\mathcal L}{dw}=(w^3-r)\,3w^2.
$$

The factor 3 reflects the three uses of the *same* parameter $w$. Even a loss only at time $T$ can generate gradients for earlier time steps, provided a dependency path exists.

### 3.3 Vanishing and exploding gradients

The hidden-state Jacobian is

$$
J_t=\frac{\partial h_t}{\partial h_{t-1}}
=\operatorname{diag}(\sigma'(z_t))W_h.
$$

Long-range differentiation involves

$$
\frac{\partial h_T}{\partial h_0}=J_TJ_{T-1}\cdots J_1.
$$

Products of Jacobians may strongly contract or amplify gradients. In the scalar case $h_t=ah_{t-1}$, the sensitivity is $a^T$, which vanishes for $|a|<1$ and grows for $|a|>1$. Matrix behavior also depends on directions and activation derivatives; it is not completely characterized by a single eigenvalue. Gradient clipping can limit explosion but does not create a missing long-range learning signal.


## 4. Long Short-Term Memory (LSTM)

### 4.1 Gates and state updates

LSTM adds a cell state $c_t$ to the hidden state $h_t$. Both typically have dimension $d_h$. Define $z_t=[h_{t-1};x_t]\in\mathbb R^{d_h+d_x}$. The four learned transformations are

$$
\boxed{\begin{aligned}
f_t&=\operatorname{sigmoid}(W_fz_t+b_f) &&\text{forget gate},\\
i_t&=\operatorname{sigmoid}(W_iz_t+b_i) &&\text{input gate},\\
o_t&=\operatorname{sigmoid}(W_oz_t+b_o) &&\text{output gate},\\
\tilde c_t&=\tanh(W_cz_t+b_c) &&\text{candidate memory}.
\end{aligned}}
$$

Then

$$
\boxed{c_t=f_t\odot c_{t-1}+i_t\odot\tilde c_t},\qquad
\boxed{h_t=o_t\odot\tanh(c_t)},\qquad y_t=g(h_t).
$$

The symbol $\odot$ denotes elementwise multiplication. The cell-state update combines retained memory and selected candidate content; the hidden state is calculated only after $c_t$ is updated.

### 4.2 Roles of the gates

The three gates have the same affine-plus-sigmoid form and receive the same input $z_t$. Their roles follow from **where they enter the state equations**: $f_t$ scales old cell memory, $i_t$ scales candidate content, and $o_t$ scales the exposed hidden state. The candidate supplies signed memory content rather than a gate.

For a local sensitivity $g_t=\partial\mathcal L/\partial c_t$, the direct derivatives through the cell update are

$$
\frac{\partial\mathcal L}{\partial f_t}=g_t\odot c_{t-1},\qquad
\frac{\partial\mathcal L}{\partial i_t}=g_t\odot\tilde c_t,\qquad
\frac{\partial\mathcal L}{\partial\tilde c_t}=g_t\odot i_t.
$$

The different gradient factors allow the gate parameters to acquire different behavior even under the same loss. No specific semantic interpretation of a gate component is guaranteed, and learned gates can be redundant.

Sigmoid maps to $(0,1)$, appropriate for multiplicative control factors. Tanh maps to $(-1,1)$, allowing positive or negative candidate content. This is the standard design, not the only possible gate architecture.

### 4.3 Parameter shapes and gradient pathway

All four matrices $W_f,W_i,W_o,W_c$ have shape

$$
\mathbb R^{d_h\times(d_h+d_x)},
$$

with a separate $d_h$-dimensional bias each. Thus

$$
P_{\mathrm{LSTM\ cell}}=4d_h(d_h+d_x+1),
$$

and a linear readout adds $d_y(d_h+1)$ parameters. Like an RNN, LSTM reuses its parameters across time, but its per-step computation is larger.

Along the direct cell-state path, **holding the gates and candidate fixed** gives

$$
\left.\frac{\partial c_t}{\partial c_{t-1}}\right|_{\mathrm{direct}}
=\operatorname{diag}(f_t).
$$

If a forget-gate component remains near one, memory and the direct gradient can persist over many steps without repeated multiplication by an unrestricted $W_h$. The full derivative contains additional paths through the gates and hidden state. LSTM therefore *mitigates* long-range gradient problems; it does not eliminate them.
