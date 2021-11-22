from scipy.special import expit


def sigmoid(z):
    return expit(z)


def derive_sigmoid(z):
    return z * (1. - z)

import numpy as np
a = np.array([1,3,5,6,7])
if np.all(a>6):
    print('yes')
else:
    print('no')
