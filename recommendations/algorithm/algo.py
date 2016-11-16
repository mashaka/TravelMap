import numpy as np
import pandas as pd
import os.path

DATA_DIR = os.path.join('..', 'dataGrabber', 'pythonScripts')
TRAIN_FILE = 'train.csv'

HOME_SIMILAR_BONUS = 3


def read_data():
    df = pd.read_csv(os.path.join(DATA_DIR, TRAIN_FILE), sep=' ')
    return df.values


def distance(a, b):
    dist = np.sum(a[1:] == b[1:])
    if a[0] == b[0]:
        dist += HOME_SIMILAR_BONUS
    return dist


def answer(user):
    data = read_data()
    p = [0 for _ in range(len(user) - 1)]
    for i_a, a in enumerate(data[:-1]):
        dist = distance(a, user)
        for i in range(1, len(a)):
            if a[i] != user[i] and user[i] == 0:
                p[i-1] += dist
    if sum(p) != 0:
        p = [float(i) / sum(p) for i in p]
    return p


print(answer(np.random.randint(2, size=253)))
