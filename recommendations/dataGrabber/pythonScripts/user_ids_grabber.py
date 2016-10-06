# To obtain batches of user ids you can use this request for celebrities accounts:
# https://www.instagram.com/query/?q=ig_user(<user-id>){followed_by.first(9000){nodes{id}}}
# This script join ids from batches in one file

import utilities
import os.path

RESULT_FILE = 'instagram_user_ids.txt'

DATA_DIR = 'dataUserIds'
FOLLOWERS = 'followed_by'
NODES = 'nodes'
ID = 'id'

ids = set()

def read_batches():
    batches = [os.path.join(DATA_DIR, f) for f in os.listdir(DATA_DIR) if os.path.isfile(os.path.join(DATA_DIR, f))]
    for name in batches:
        data = utilities.read_json(name)
        for id_dict in data[FOLLOWERS][NODES]:
            ids.add(id_dict[ID])


def save_ids():
    with open(RESULT_FILE, mode='wt') as f:
        for user_id in ids:
            f.write(user_id + '\n')

read_batches()
save_ids()

print(len(ids))
