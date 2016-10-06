import json


def read_json(name):
    with open(name) as f:
        data_json = json.load(f)
        return data_json