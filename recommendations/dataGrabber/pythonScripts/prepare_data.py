import os.path
import utilities
import numpy as np
import csv

COUNTRIES_INFO = 'countryInfo.txt'

DATA_DIR = 'dataCountriesRefactored'
OUTPUT_FILE = 'train.csv'
OUTPUT_FILE_COLUMNS = 'columns.txt'


def write_in_file(data, header):
    with open(OUTPUT_FILE, 'w', newline='') as f:
        csv_writer = csv.writer(f, delimiter=' ')
        csv_writer.writerow(header)
        csv_writer.writerows(data)
    with open(OUTPUT_FILE_COLUMNS, 'w') as f:
        for country in header[1:]:
            f.write(country + '\n')


def read_countries_dict_and_list():
    countries_dict = {}
    countries_list = []
    with open(COUNTRIES_INFO) as f:
        content = f.readlines()
        for i, country_info in enumerate(content):
            country_name = country_info.split('\t')[4]
            country_name = country_name.strip()
            countries_dict[country_name] = i
            countries_list.append(country_name)
    countries_dict['Spain (territorial waters)'] = countries_dict['Spain']
    countries_dict['Portugal (territorial waters)'] = countries_dict['Portugal']
    countries_dict['Côte d\'Ivoire'] = countries_dict['Ivory Coast']
    countries_dict['France, Polynésie française (eaux territoriales)'] = countries_dict['France']
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
            visited_countries[countries_dict[country]] = 1
        converted_info += visited_countries
        converted_data.append(converted_info)
    write_in_file(converted_data, ['home_country'] + countries_list)


prepare_data()