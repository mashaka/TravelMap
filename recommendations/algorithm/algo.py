import numpy as np
import pandas as pd
import os.path
import json

DATA_DIR = os.path.join('..', 'dataGrabber', 'pythonScripts')
TRAIN_FILE = 'train_new.csv'

HOME_COUNTRY = 'home_country'

HOME_SIMILAR_BONUS = 3


def read_data():
    df = pd.read_csv(os.path.join(DATA_DIR, TRAIN_FILE), sep='\t')
    df.drop
    return list(df.columns.values)[1:], df.values


def distance(a, b):
    dist = np.sum(a[1:] == b[1:])
    if a[0] == b[0]:
        dist += HOME_SIMILAR_BONUS
    return dist


def answer(user_json):
    user_dict = json.loads(user_json)
    country_codes, data = read_data()
    # Reorder to match train data features
    user = [user_dict[HOME_COUNTRY]] + [user_dict[c] for c in country_codes]
    p = {c: 0 for c in country_codes}
    for i_a, a in enumerate(data[:-1]):
        dist = distance(a, user)
        for i in range(1, len(a)):
            if a[i] != user[i] and user[i] == 0:
                p[country_codes[i-1]] += dist
    if sum(p.values()) != 0:
        sum_p = sum(p.values())
        p = {c: float(p[c]) / sum_p for c in p}
    return p