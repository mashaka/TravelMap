import os.path
import utilities
import numpy as np

COUNTRIES_INFO = 'countryInfo.txt'

DATA_DIR = 'dataCountriesRefactored'
OUTPUT_FILE = 'train.csv'


def read_countries_dict_and_list():
    countries_dict = {}
    countries_list = []
    with open(COUNTRIES_INFO) as f:
        content = f.readlines()
        for i, country_info in enumerate(content):
            countries_dict[country_info.split('\t')[4]] = i
            countries_list.append(country_info.split('\t')[4])
    countries_dict['Spain (territorial waters)'] = countries_dict['Spain']
    countries_dict['Portugal (territorial waters)'] = countries_dict['Portugal']
    countries_dict['Côte d\'Ivoire'] = countries_dict['Ivory Coast']
    return countries_dict, countries_list


# line for a person: home country + list of 0/1 indicating which countries are visited by the person
def prepare_data():
    countries_dict, countries_list = read_countries_dict_and_list()
    data = utilities.read_all_files_in_list(DATA_DIR)
    converted_data = []
    for person_info in data:
        converted_info = [countries_dict[person_info[0]]]
        visited_countries = [0 for _ in range(len(countries_list))]
        for country in person_info[1:]:
            visited_countries[countries_dict[person_info[0]]] = 1
        converted_info += visited_countries
        converted_data.append(converted_info)
    return converted_data