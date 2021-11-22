import numpy as np
from scipy import sqrt as sqrt

def Adam(timer, velocity, step, param_grad, biase_grad, alpha=0.001, momentum=0.9, gamma=0.999, eps=1e-7):
    step = gamma * step + (1.-gamma)*np.power(param_grad, 2)
    adam_step = step/(1.-np.power(gamma, timer))
    alpha_adapt = alpha/((sqrt(adam_step)+eps))

    velocity = momentum*velocity + (1-momentum)*param_grad
    adam_velocity = velocity/(1-np.power(momentum, timer))

    gradient_adapt = alpha_adapt * adam_velocity

    return gradient_adapt


def Adam2(timer, velocityParam, stepParam, param_grad, alpha=0.001, momentum=0.9, gamma=0.999, eps=1e-7):
    gradient_adapt = []
    for i in range(len(velocityParam)):
        stepParam[i] = gamma * stepParam[i] + (1.-gamma)*np.power(param_grad[i], 2)
        adam_stepParam = stepParam[i]/(1.-np.power(gamma, timer))
        alpha_adaptParam = alpha/((sqrt(adam_stepParam)+eps))

        velocityParam[i] = momentum*velocityParam[i] + (1-momentum)*param_grad[i]
        adam_velocityParam = velocityParam[i]/(1-np.power(momentum, timer))

        gradient_adapt.append(alpha_adaptParam * adam_velocityParam)

    return gradient_adapt, velocityParam, stepParam


def adamC(timer, velocityParam, velocityBiase, stepParam, stepBiase, param_grad, biase_grad, alpha=0.001, momentum=0.9, gamma=0.999, eps=1e-7):

    adam_stepParam = list(range(len(velocityParam)))
    adam_stepBiase = list(range(len(velocityParam)))
    alpha_adaptParam = list(range(len(velocityParam)))
    alpha_adaptBiase = list(range(len(velocityParam)))
    velocityParam = list(range(len(velocityParam)))
    velocityBiase = list(range(len(velocityParam)))
    adam_velocityParam = list(range(len(velocityParam)))
    adam_velocityBiase = list(range(len(velocityParam)))
    gradient_adapt = list(range(len(velocityParam)))
    biase_adapt = list(range(len(velocityParam)))

    gradient_adapt = list(range(len(velocityParam)))
    biase_adapt = list(range(len(velocityParam)))
    for i in range(len(velocityParam)):
        stepParam[i] = gamma * stepParam[i] + (1.-gamma)*np.power(param_grad[i], 2)
        stepBiase[i] = gamma * stepBiase[i] + (1.-gamma)*np.power(biase_grad[i], 2)
        adam_stepParam[i] = stepParam[i]/(1.-np.power(gamma, timer))
        adam_stepBiase[i] = stepBiase[i]/(1.-np.power(gamma, timer))
        alpha_adaptParam[i] = alpha/((sqrt(adam_stepParam[i])+eps))
        alpha_adaptBiase[i] = alpha/((sqrt(adam_stepBiase[i])+eps))

        velocityParam[i] = momentum*velocityParam[i] + (1-momentum)*param_grad[i]
        velocityBiase[i] = momentum*velocityBiase[i] + (1-momentum)*biase_grad[i]
        adam_velocityParam[i] = velocityParam[i]/(1-np.power(momentum, timer))
        adam_velocityBiase[i] = velocityBiase[i]/(1-np.power(momentum, timer))

        gradient_adapt[i] = alpha_adaptParam[i] * adam_velocityParam[i]
        biase_adapt[i] = alpha_adaptBiase[i] * adam_velocityBiase[i]

    return gradient_adapt, biase_adapt, velocityParam, velocityBiase, stepParam, stepBiase


def adam(timer, velocityParam, velocityBiase, stepParam, stepBiase, param_grad, biase_grad, alpha=0.001, momentum=0.9, gamma=0.999, eps=1e-7):
    gradient_adapt = []
    biase_adapt = list(range(len(velocityParam)))
    for i in range(len(velocityParam)):
        stepParam[i] = gamma * stepParam[i] + (1.-gamma)*np.power(param_grad[i], 2)
        stepBiase[i] = gamma * stepBiase[i] + (1.-gamma)*np.power(biase_grad[i], 2)
        adam_stepParam = stepParam[i]/(1.-np.power(gamma, timer))
        adam_stepBiase = stepBiase[i]/(1.-np.power(gamma, timer))
        alpha_adaptParam = alpha/((sqrt(adam_stepParam)+eps))
        alpha_adaptBiase = alpha/((sqrt(adam_stepBiase)+eps))

        velocityParam[i] = momentum*velocityParam[i] + (1-momentum)*param_grad[i]
        velocityBiase[i] = momentum*velocityBiase[i] + (1-momentum)*biase_grad[i]
        adam_velocityParam = velocityParam[i]/(1-np.power(momentum, timer))
        adam_velocityBiase = velocityBiase[i]/(1-np.power(momentum, timer))

        gradient_adapt.append(alpha_adaptParam * adam_velocityParam)
        biase_adapt[i] = alpha_adaptBiase * adam_velocityBiase
    return gradient_adapt, biase_adapt, velocityParam, velocityBiase, stepParam, stepBiase
