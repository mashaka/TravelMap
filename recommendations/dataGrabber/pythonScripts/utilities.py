import json
import os.path

TXT_SUFFIX = '.txt'


def read_json(name):
    with open(name) as f:
        data_json = json.load(f)
        return data_json


def save_in_file(data_list, name, directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
    with open(os.path.join(directory, name + TXT_SUFFIX), mode='wt') as f:
        for data in data_list:
            f.write(data + '\n')