---
title: Markdown reference
order: 20
description: Equations, code blocks, tables, and links.
---

# Markdown reference

This page is a formatting example, not a research note. It can be edited or removed.

## Equations

Wrap inline mathematics in single dollar signs: `$f(x) = x^2$` renders as $f(x) = x^2$.

Use double dollar signs for a displayed equation:

$$
\mathcal{L}(\theta) = \frac{1}{N}\sum_{i=1}^{N}\left(f_\theta(x_i)-y_i\right)^2.
$$

Source:

```latex
$$
\mathcal{L}(\theta) = \frac{1}{N}\sum_{i=1}^{N}\left(f_\theta(x_i)-y_i\right)^2.
$$
```

### A short derivation

For $f(x)=x^2$, we have $f'(x)=2x$. Gradient descent gives

$$
x_{k+1}=x_k-\eta f'(x_k)=(1-2\eta)x_k.
$$

When $0<\eta<1$, the factor satisfies $|1-2\eta|<1$, so the iterates converge to $x=0$.

## Code

Specify a language after the opening code fence to enable syntax highlighting. Use the copy button in the upper-right corner to copy a block.

```python
def gradient_descent(x0, learning_rate=0.1, steps=50):
    """Minimize f(x) = x**2."""
    x = x0
    for _ in range(steps):
        x -= learning_rate * 2 * x
    return x

print(gradient_descent(3.0))
```

## Tables

| Symbol | Meaning |
| --- | --- |
| $x_k$ | Position at iteration $k$ |
| $\eta$ | Learning rate |
| $\mathcal{L}$ | Objective function |

## Callouts

::: tip Writing a derivation
State the question and assumptions before working through the equations.
:::

::: warning Check the conditions
An expression may only be valid under specific assumptions. Record those assumptions alongside the result.
:::

## Links

Use relative links for other notes:

```md
[Adding a note](./writing.md)
```

Read [Adding a note](./writing.md) or return to [Mathematics & methods](../math/index.md).
