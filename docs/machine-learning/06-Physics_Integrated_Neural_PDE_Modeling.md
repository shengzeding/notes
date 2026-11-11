---
title: Physics-Integrated Neural PDE Modeling
order: 6
---

# Physics-Integrated Neural PDE Modeling

Physics-based PDE models and data-driven models have complementary strengths. A numerical solver preserves a chosen mathematical structure and exposes its assumptions, but it may omit unresolved physics or remain too expensive at the required resolution. A learned model can approximate complicated maps from data, but it may spend capacity relearning known structure and can fail when its inputs move outside the training distribution.

**Physics-integrated modeling** does not replace the entire solver by default. It keeps the components that are sufficiently understood and assigns learning to the unresolved, uncertain, unavailable, or computationally expensive part. The resulting model is a coupled computational system: its reliability depends not only on the neural component in isolation, but also on how that component interacts with the numerical solver during repeated use.

This chapter develops that coupling, the distinction between offline and solver-in-the-loop training, and the differentiation machinery needed to optimize through explicit and implicit PDE solvers. The structural correspondences between numerical and learned operators developed in [Numerical Operators and Neural Architectures](05-Numerical_Operators_and_Neural_Architectures.md) become operational here: numerical steps are used inside a trainable computation rather than merely compared with neural layers.


<span id="physics-integrated-modeling"></span>

## 1. Dividing the Model Between Physics and Learning

### 1.1 Purely learned, purely physical, and hybrid updates

Let $U^n$ denote a discretized state at time $t_n$. A purely learned one-step model has the form

$$
U^{n+1}=\mathcal N_\theta(U^n,\mu),
$$

where $\mu$ contains parameters, forcing, boundary data, or other conditioning information. The network must represent the full evolution map, including effects already described by the governing equations.

A physics-based discretization instead gives

$$
U^{n+1}=\mathcal P_h(U^n,\mu),
$$

where $h$ represents the spatial and temporal resolution together with the chosen discretization. This update implements the **selected discrete model**. It should not be described as exact simply because its coefficients came from a PDE: truncation error, unresolved scales, uncertain coefficients, and modeling assumptions remain.

A hybrid update separates the trusted structure from a learned component. Two common forms are

$$
\boxed{
U^{n+1}
=\mathcal P_h(U^n,\mu)+\mathcal C_\theta(Z^n),
}
$$

and

$$
\boxed{
U^{n+1}
=\mathcal P_h\big(U^n,\mathcal C_\theta(Z^n),\mu\big).
}
$$

In the first form, $\mathcal C_\theta$ supplies an additive correction. In the second, it supplies a closure, coefficient, flux, constitutive response, or another quantity used internally by the numerical operator. The features $Z^n$ may include the resolved state, local derivatives, geometry, parameters, or a finite history.

The phrase “learn only what is unknown” is therefore a modeling principle, not a literal decomposition supplied by the data. The interface between $\mathcal P_h$ and $\mathcal C_\theta$ must still be chosen. Changing the grid, filter, state variables, or numerical scheme can change what remains for the learned component to represent.

### 1.2 Unresolved physics and closure

Coarse-graining or averaging a governing equation generally introduces terms that cannot be written uniquely from the resolved variables alone. A schematic resolved equation is

$$
\frac{dU}{dt}=F_h(U)+Q_h,
$$

where $Q_h$ represents the effect of discarded scales. A learned closure replaces it by

$$
Q_h\approx\mathcal C_\theta(Z;h).
$$

The dependence on $h$ is important. A closure is tied to the averaging, filtering, discretization, and resolved variables used to define it. More data can improve its conditional prediction at that scale, but does not turn a scale-dependent closure into a universal microscopic law.

The inputs must also contain enough information for the intended closure. If the unresolved effect depends on history while $Z$ contains only the instantaneous state, the learned map is being asked to represent a non-Markovian process as a single-valued instantaneous function. Recurrence, delay coordinates, or an augmented physical state may then be needed.

### 1.3 Unknown constitutive or source laws

In a different problem, the conservation laws may be accepted while a constitutive response is unknown. The model then has the structure

$$
\mathcal B(U,q)=0,
\qquad
q=\mathcal C_\theta(Z),
$$

where $\mathcal B$ contains balances and boundary conditions, while $q$ supplies the missing material response or source law. Unlike a closure created by coarse-graining, the target may be intended as a scale-independent physical relation over a specified regime.

This distinction changes how the result should be interpreted. A learned constitutive law is evaluated against measurements and physical admissibility. A learned closure is additionally conditional on the resolved representation. The formulas can look similar even though the source of uncertainty is different.

Known structure can remain explicit around the learned law. Units, objectivity, symmetry, positivity, dissipation, or conservation can be enforced through the parameterization or numerical coupling rather than left entirely to the loss function. Such constraints narrow the hypothesis class, but they guarantee only the properties actually imposed.

### 1.4 Surrogates for known expensive components

Learning can also be introduced for speed rather than missing physics. Suppose one solver step contains an expensive map $\mathcal S$:

$$
Y=\mathcal S(X).
$$

A surrogate replaces only that component,

$$
Y\approx\mathcal S_\theta(X),
$$

while the surrounding algorithm is unchanged. A [neural operator](04-Neural_Fields_and_Neural_Operators.md) is one possible parameterization when both input and output are fields.

The relevant error is now approximation error relative to a known computation, not recovery of missing physics. Speedup is meaningful only together with the cost of generating training data, the range of inputs encountered inside the coupled solver, and any correction or fallback needed when the surrogate leaves its reliable regime.

### 1.5 Multi-fidelity correction

When low-fidelity predictions are abundant but high-fidelity observations are scarce, a correction model may be written

$$
U_{\mathrm{HF}}
\approx\mathcal I(U_{\mathrm{LF}})+\Delta_\theta(U_{\mathrm{LF}},\mu),
$$

where $\mathcal I$ aligns the two representations and $\Delta_\theta$ learns their discrepancy. The low-fidelity model may use a coarser mesh, simplified equations, reduced parameters, or a less expensive numerical method.

This decomposition is useful only if the low-fidelity state contains predictive information about the high-fidelity state. The correction must also be conditioned on the fidelity definition. A discrepancy learned for one mesh or simplified model need not transfer unchanged to another.

### 1.6 Choosing the coupling interface

The coupling interface determines both learnability and physical control. If the network predicts the full next state, it receives maximum flexibility but little structure from the solver. If it predicts a narrowly defined coefficient or flux, the surrounding equations constrain how its output can affect the state, but the chosen quantity may not be expressive enough to represent the discrepancy.

A useful interface satisfies four requirements:

- its inputs are available during deployment, not only in high-fidelity training data;
- its outputs have a defined mathematical role, units, and tensor structure;
- the numerical solver remains well posed for the range of outputs the network can produce;
- the interface is broad enough to represent the missing effect without forcing the network to compensate for unrelated numerical errors.

These conditions concern the coupled model. A small standalone prediction error cannot establish them by itself.


## 2. Offline and Solver-in-the-Loop Training

### 2.1 Offline fitting and a priori evaluation

The simplest procedure constructs pairs $(Z_i,Q_i)$ outside the solver and minimizes

$$
\boxed{
\mathcal L_{\mathrm{offline}}(\theta)
=\frac1N\sum_{i=1}^N
\left\|\mathcal C_\theta(Z_i)-Q_i\right\|_2^2.
}
$$

After training, $\mathcal C_\theta$ is inserted into the numerical model. This is loosely coupled training: the solver is used to generate or define data, but does not participate in gradient computation.

Evaluation on held-out pairs is an **a priori** test. It answers whether the learned component reproduces its target on states drawn from the data distribution. It is inexpensive and useful for diagnosing representation error, but it does not test the behavior of the coupled trajectory.

At deployment, the network receives states produced by the hybrid solver itself. Even a small prediction error changes the next state and therefore changes all later inputs. The resulting distribution can drift away from the high-fidelity states used during training. Consequently,

$$
\text{small a priori error}
\centernot\Longrightarrow
\text{stable or accurate coupled evolution}.
$$

### 2.2 A posteriori evaluation

An **a posteriori** test runs the learned component inside the actual numerical loop. It evaluates quantities that matter at the system level: trajectory error, stability, conservation defect, long-time statistics, constraint violation, and behavior under changed parameters or boundary conditions.

This test can reveal errors hidden by pointwise fitting. The solver may amplify a small biased correction, repeatedly visit a region with weak data support, or become unstable when the learned output violates a property assumed by the discretization. Conversely, the solver may damp some component-level errors so that they have little effect on the final quantity of interest.

Offline and coupled evaluations therefore answer different questions. A priori metrics diagnose the learned map on prescribed inputs; a posteriori metrics diagnose the complete dynamical system.

<span id="solver-in-loop-training"></span>

### 2.3 Solver-in-the-loop training

Solver-in-the-loop training includes the coupled numerical evolution in the training computation. Define

$$
\widehat U^{n+1}
=\mathcal R_{h,\theta}(\widehat U^n,\mu_n),
\qquad
\widehat U^0=U^0,
$$

where $\mathcal R_{h,\theta}$ contains both the physics-based and learned components. A trajectory loss may be

$$
\boxed{
\mathcal L_{\mathrm{traj}}(\theta)
=\sum_{n=1}^{T}w_n
\left\|\widehat U^n-U^n_{\mathrm{ref}}\right\|_W^2.
}
$$

The model is now trained on its own [autoregressive rollout](02-Recurrent_Networks_and_Sequence_Learning.md#autoregressive-prediction "concept:autoregressive-prediction"). Errors influence later states during training just as they do during deployment. The loss can also include terminal objectives, integral quantities, conservation defects, or observations at only a subset of times.

This does not remove distribution shift in general. The reference data still cover only part of the possible state and parameter space, and a finite training horizon need not control arbitrarily long evolution. It does align the training computation with the coupled use of the model over the selected horizon.

To optimize this objective with gradients, information must propagate backward through every solver step that connects $\theta$ to the loss. The numerical program must therefore expose usable derivatives or a justified gradient approximation.


<span id="automatic-differentiation"></span>

## 3. Differentiable Programs and Automatic Differentiation

### 3.1 A numerical solver as a computation graph

Consider a program composed of elementary maps,

$$
v_0=x,
\qquad
v_k=f_k(v_{k-1};\theta_k),
\quad k=1,\ldots,K,
\qquad
\mathcal L=\ell(v_K).
$$

The maps $f_k$ need not be neural-network layers. They may be flux evaluations, time steps, transforms, interpolation rules, constitutive calculations, or algebraic solver operations. If their local derivatives are defined and implemented, the chain rule differentiates the complete program.

**Automatic differentiation (AD)** evaluates these derivatives by traversing the executed computation graph. It is different from symbolic differentiation, which manipulates expressions, and from finite differences, which approximate a derivative by repeated perturbed evaluations. Up to floating-point effects, AD applies the chain rule to the discrete program that was actually executed.

This last qualification matters. Differentiating a discretized PDE solver gives the derivative of that discrete solver. It does not automatically prove that the gradient converges to the derivative of the continuous PDE problem as the discretization is refined.

### 3.2 Forward mode

Let $v$ be a direction in the input or parameter space. Forward mode propagates a tangent together with every primal value. For

$$
y=f(x),
$$

the tangent update is

$$
\dot y
=\frac{\partial f}{\partial x}\dot x.
$$

For a multistage program, this update is applied locally at every operation. The final tangent is a Jacobian-vector product,

$$
\boxed{\dot y=Jv.}
$$

One forward sweep computes sensitivity to one input direction. Forward mode is therefore attractive when there are few independent parameters and many outputs, such as the sensitivity of a full state field to a small set of physical coefficients.

### 3.3 Reverse mode

Reverse mode first evaluates the primal computation and then propagates adjoints from the output toward the inputs. If $y=f(x)$ and $\bar y$ is the incoming output adjoint, then

$$
\bar x
=\left(\frac{\partial f}{\partial x}\right)^T\bar y.
$$

When one variable influences several downstream operations, their adjoint contributions are summed. For a scalar loss, one reverse sweep produces derivatives with respect to every differentiable input and parameter. This is why reverse mode, usually called backpropagation in neural networks, is effective when millions of parameters determine one scalar objective.

The corresponding primitive is a vector-Jacobian product, written with column vectors as

$$
\boxed{J^Tw.}
$$

Neither forward nor reverse mode requires forming the full Jacobian. Matrix-free Jacobian-vector and transposed-Jacobian-vector products are sufficient for many sensitivity and optimization algorithms.

### 3.4 Memory and recomputation

Reverse mode usually needs intermediate values from the forward pass. For a time-dependent solver storing a state of size $N$ over $T$ steps, naive storage scales like

$$
O(TN).
$$

Checkpointing stores only selected states. During the backward pass, missing intermediate values are regenerated by rerunning portions of the forward computation. This trades additional computation for lower memory without changing the differentiated discrete program, provided recomputation is deterministic and reproduces the same operations.

The best checkpoint schedule depends on the number and cost of time steps, the state size, and available memory. It is not equivalent to truncating the gradient: recomputation preserves the full dependency path, whereas truncation deliberately discards part of it.

### 3.5 Nonsmooth and discrete operations

Many solver components are not smoothly differentiable everywhere. Hard branching, sorting, discrete mesh changes, clipping, limiters, and convergence decisions can make the executed map discontinuous or piecewise smooth. AD still differentiates the executed branch where local rules exist, but the resulting gradient may be zero, undefined at a switching point, or uninformative about a nearby change of branch.

Possible responses include a smooth relaxation, a custom subgradient, a straight-through approximation, or a reformulation of the numerical method. These choices alter the backward model. They should be documented as gradient approximations rather than described as exact derivatives of the original discrete operation.

### 3.6 Gradient checking

Custom derivative and adjoint implementations should be checked against an independent approximation on a small problem. For a normalized direction $v$, the centered directional difference is

$$
\frac{\mathcal L(\theta+\varepsilon v)
-\mathcal L(\theta-\varepsilon v)}{2\varepsilon}
\approx
\nabla_\theta\mathcal L(\theta)^Tv.
$$

Directional checks test many parameter components at once. The step $\varepsilon$ must balance truncation error against floating-point cancellation, so agreement should be examined over a range of step sizes rather than at one arbitrarily small value. A successful check supports the derivative implementation for that test; it does not establish physical correctness of the model or stability of training.


## 4. Differentiating Through Time-Dependent Solvers

### 4.1 The discrete sensitivity chain

Let a differentiable time-stepping model be

$$
U^{n+1}=R_n(U^n,\theta),
\qquad n=0,\ldots,T-1,
$$

with objective

$$
\mathcal L
=\sum_{n=0}^{T}\ell_n(U^n,\theta).
$$

A perturbation of $\theta$ changes $U^1$, which changes $U^2$, and so on. Forward sensitivity propagates

$$
\frac{dU^{n+1}}{d\theta}
=\frac{\partial R_n}{\partial U^n}
\frac{dU^n}{d\theta}
+\frac{\partial R_n}{\partial\theta}.
$$

This can be efficient for a small number of parameters, but explicitly storing $dU^n/d\theta$ becomes expensive when $\theta$ is high-dimensional.

### 4.2 Reverse recurrence and the discrete adjoint

Define the state adjoint

$$
\lambda^n=\frac{d\mathcal L}{dU^n}.
$$

Starting from the final time, reverse mode gives

$$
\lambda^T
=\left(\frac{\partial\ell_T}{\partial U^T}\right)^T,
$$

and

$$
\boxed{
\lambda^n
=\left(\frac{\partial\ell_n}{\partial U^n}\right)^T
+\left(\frac{\partial R_n}{\partial U^n}\right)^T
\lambda^{n+1}.
}
$$

The parameter gradient is

$$
\boxed{
\frac{d\mathcal L}{d\theta}
=\sum_{n=0}^{T}
\frac{\partial\ell_n}{\partial\theta}
+\sum_{n=0}^{T-1}
\left(\frac{\partial R_n}{\partial\theta}\right)^T
\lambda^{n+1}.
}
$$

This backward recurrence is both reverse-mode AD through the unrolled solver and the **discrete adjoint** of the time-stepping scheme. It has the same dependency structure as [backpropagation through time](02-Recurrent_Networks_and_Sequence_Learning.md#the-unrolled-computation-graph), although the state update here contains an explicit numerical model.

Long products of state Jacobians can contract or amplify perturbations. Vanishing and exploding gradients are therefore not restricted to conventional recurrent networks; they also occur when a differentiable dynamical solver is unrolled over a long horizon. Numerical stability of the forward trajectory and conditioning of the backward sensitivity are related but not identical properties.

### 4.3 What is being differentiated

There are several distinct derivative targets:

- differentiating the executed time-stepping algorithm gives a derivative of the discrete trajectory;
- deriving an adjoint PDE first and then discretizing it gives a discretization of a continuous sensitivity equation;
- differentiating a solver stopped at a finite tolerance includes the behavior of that approximate algorithm;
- differentiating the exactly converged defining equation describes the sensitivity of the converged solution.

These objects can agree under suitable consistency and convergence conditions, but they are not identical by definition. A training implementation should state which object its gradient represents.


<span id="implicit-differentiation"></span>

## 5. Implicit Differentiation and Steady Solvers

### 5.1 Outputs defined by an equation

Some layers and solvers define their output as the solution of an equation rather than a fixed sequence of explicit operations. Let $U^*$ satisfy

$$
\boxed{F(U^*,x,\theta)=0.}
$$

The forward pass may find $U^*$ using Newton iteration, a fixed-point method, or another nonlinear solver. Unrolling those iterations and differentiating each one is possible, but it stores the iteration history, depends on the chosen stopping path, and can inherit poorly conditioned long-chain gradients.

Implicit differentiation instead differentiates the converged equation. If

$$
A=\frac{\partial F}{\partial U}(U^*,x,\theta)
$$

is nonsingular, the implicit function theorem gives

$$
\frac{\partial U^*}{\partial\theta}
=-A^{-1}\frac{\partial F}{\partial\theta},
\qquad
\frac{\partial U^*}{\partial x}
=-A^{-1}\frac{\partial F}{\partial x}.
$$

These formulas describe the local sensitivity of the solution branch containing $U^*$. If several roots exist, they do not specify which root the forward solver selects after a large perturbation.

### 5.2 The adjoint linear system

Suppose the scalar objective is $\mathcal L(U^*,x,\theta)$. Forming $A^{-1}$ or the full solution Jacobian is unnecessary. Define the adjoint $\lambda$ by

$$
\boxed{
A^T\lambda
=\left(\frac{\partial\mathcal L}{\partial U^*}\right)^T.
}
$$

Then the total gradients are

$$
\boxed{
\frac{d\mathcal L}{d\theta}
=\frac{\partial\mathcal L}{\partial\theta}
-\left(\frac{\partial F}{\partial\theta}\right)^T\lambda,
}
$$

and

$$
\boxed{
\frac{d\mathcal L}{dx}
=\frac{\partial\mathcal L}{\partial x}
-\left(\frac{\partial F}{\partial x}\right)^T\lambda.
}
$$

One adjoint solve supplies gradients with respect to many parameters. For a large system, a matrix-free iterative method can apply $A^T$ through vector-Jacobian products without explicitly assembling the Jacobian. The adjoint system must still be solved accurately enough for the resulting gradient to be useful.

### 5.3 Convergence and conditioning

Implicit differentiation removes the need to backpropagate through every forward iteration, but it does not remove the numerical difficulty of the underlying problem. Several conditions matter:

- the forward residual $F(U^*,x,\theta)$ must be sufficiently small for the converged-equation derivative to describe the computed state;
- $A$ must be nonsingular on the selected solution branch;
- an ill-conditioned $A$ can amplify both state perturbations and adjoint errors;
- the backward linear solve needs its own tolerance and convergence checks;
- nondifferentiable changes in active constraints, mesh topology, or branch selection can invalidate a local smooth analysis.

Unrolling and implicit differentiation answer slightly different questions when the forward solve is not converged. Unrolling differentiates the finite algorithm that ran. Implicit differentiation approximates the derivative of the root it was intended to find. The appropriate choice depends on whether the iteration path or the converged state defines the layer.


## 6. Training Dynamic Hybrid Models

### 6.1 One-step fitting

A one-step objective supplies the true state at every training input:

$$
\widehat U^{n+1}
=\mathcal R_{h,\theta}(U^n_{\mathrm{ref}}),
$$

$$
\boxed{
\mathcal L_{\mathrm{1step}}
=\sum_{n=0}^{T-1}
\left\|\widehat U^{n+1}-U^{n+1}_{\mathrm{ref}}\right\|_W^2.
}
$$

Each prediction begins from a reference state, so the model does not learn how to recover from its own previous errors. The objective is inexpensive and often useful for initialization, but it controls a local transition error rather than the composed trajectory.

For a stateless update whose complete state is $U^n$, teacher forcing and one-step fitting describe the same input construction. If a separate hidden state $H^n$ satisfies

$$
H^{n+1}=G_\theta(H^n,U^n_{\mathrm{ref}}),
$$

the hidden states still form a recurrent chain. Gradients must propagate through that chain even though every physical-state input is supplied by the reference sequence.

### 6.2 Trajectory-based training

Trajectory training feeds predictions back into the model:

$$
\widehat U^{n+1}
=\mathcal R_{h,\theta}(\widehat U^n),
\qquad
\widehat U^0=U^0_{\mathrm{ref}},
$$

and penalizes one or more states along the rollout. It exposes the learned component to the coupled states produced by its own errors and directly optimizes the finite-horizon behavior of the hybrid system.

The advantages come with three costs. First, every training example requires several solver steps. Second, reverse differentiation must traverse the same horizon, increasing memory or recomputation. Third, early in training an unstable model may leave the meaningful state region before the loss provides a useful gradient.

The time weights $w_n$ in $\mathcal L_{\mathrm{traj}}$ determine which part of the trajectory dominates. A terminal-only loss can ignore intermediate deviations that later cancel, while equal per-step weights can overemphasize densely sampled portions of the same physical interval. The norm $\|\cdot\|_W$ should reflect variable scales, spatial quadrature, and the quantities the model is intended to preserve.

### 6.3 Curriculum over rollout length

A rollout curriculum begins with a short horizon and increases it as optimization progresses. Short rollouts first teach the local update in a better-conditioned problem. Longer rollouts then expose error accumulation and stability requirements.

The schedule is part of the training method. Increasing the horizon too quickly can produce divergent trajectories and unusable gradients; keeping it short can leave the final model unprepared for deployment. Validation should therefore include the intended rollout horizon and longer horizons that probe whether the learned dynamics remain bounded.

Trajectory training improves alignment between training and deployment, but it does not by itself guarantee conservation, stability, or extrapolation. Those properties must come from the coupled architecture, explicit constraints, the data regime, and evaluation of the complete solver.
