import numpy as np

def logloss(X, y, activated_layer):
    cost = (1/(2*X.shape[0]))*np.sum(np.sum((-y * np.log(activated_layer))-(1-y)*np.log(1-activated_layer)))
    return cost
