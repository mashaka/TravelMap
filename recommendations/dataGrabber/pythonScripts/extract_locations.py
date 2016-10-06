import utilities
import os.path
from geopy.geocoders import Nominatim

DATA_DIR = 'dataInstagram'
RESULT_DIR = 'dataInstagramCountries'

LOCATION = 'location'

COUNTRY = 'country'
TYPES = 'types'
RESULTS = 'results'
ADDRESS_COMPONENTS = 'address_components'
LONG_NAME = 'long_name'
LAT = 'lat'
LONG = 'lng'

TXT_SUFFIX = '.txt'


def read_all_jsons():
    locations = []
    batches = [os.path.join(DATA_DIR, f) for f in os.listdir(DATA_DIR) if os.path.isfile(os.path.join(DATA_DIR, f))]
    for name in batches:
        data = utilities.read_json(name)
        user_locations = []
        for media in data:
            location = media[LOCATION]
            if location:
                user_locations.append(location)
        if len(user_locations) > 0:
            locations.append(user_locations)
    return locations


def save_in_files(lists):
    if not os.path.exists(RESULT_DIR):
        os.makedirs(RESULT_DIR)
    for i, data_list in enumerate(lists):
        with open(os.path.join(RESULT_DIR, str(i) + TXT_SUFFIX), mode='wt') as f:
            for data in data_list:
                f.write(data + '\n')


def get_country(lat, long):
    lat_long_str = "%d, %d" % (lat, long)
    geolocator = Nominatim()
    address, (latitude, longitude) = geolocator.reverse(lat_long_str, language='en')
    if address:
        address = address.split(",")
        if len(address) > 2:
            return address[-1].strip()
    return False


def extract_countries(data_list):
    result_list = []
    for coordinates_list in data_list:
        countries = []
        for coordinates in coordinates_list:
            country = get_country(coordinates[LAT], coordinates[LONG])
            if country:
                countries.append(country)
        if len(countries) > 0:
            result_list.append(countries)
    return result_list

locations_lists = read_all_jsons()

countries_list = extract_countries(locations_lists)

save_in_files(countries_list)