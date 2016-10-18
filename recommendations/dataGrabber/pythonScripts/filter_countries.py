import os.path
from collections import Counter
import utilities

DATA_DIR = 'dataInstagramCountries'
RESULT_DIR = 'dataCountriesRefactored'


def read_all_files_in_list():
    files = [os.path.join(DATA_DIR, f) for f in os.listdir(DATA_DIR) if os.path.isfile(os.path.join(DATA_DIR, f))]
    result = []
    for filename in files:
        with open(filename) as f:
            result.append(f.read().splitlines())
    return result


def save_data(data_to_save):
    for i in range(len(data_to_save)):
        utilities.save_in_file(data_to_save[i], str(i), RESULT_DIR)


def delete_repetitions(data_list):
    new_list = []
    for i, element in enumerate(data_list):
        if i + 1 != len(data_list):
            if element != data_list[i+1]:
                new_list.append(element)
    new_list.append(data_list[-1])
    return new_list


def extract_home_country_and_visited(locations):
    countries_comebacks = Counter(delete_repetitions(locations)).most_common()
    countries_counter = Counter(locations)
    countries_by_amount, _ = zip(*countries_counter.most_common())
    countries_by_amount = list(countries_by_amount)
    if countries_comebacks[0][1] > 1 and countries_by_amount[0] != countries_comebacks[0][0]:
        countries_by_amount = [countries_comebacks[0][0]] \
                              + [country for country in countries_by_amount if country != countries_comebacks[0][0]]
    return countries_by_amount


def process_data(data_to_process):
    resulted_data = []
    for user_data in data_to_process:
        refactored_data = extract_home_country_and_visited(user_data)
        resulted_data.append(refactored_data)
    return resulted_data

data = read_all_files_in_list()

processed_data = process_data(data)
save_data(processed_data)


