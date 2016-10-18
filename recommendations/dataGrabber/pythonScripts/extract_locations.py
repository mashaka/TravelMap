import utilities
import os.path
import osm_rg

DATA_DIR = 'dataInstagram'
RESULT_DIR = 'dataInstagramCountries'

LOCATION = 'location'
COUNTRY = 'country'
LAT = 'lat'
LONG = 'lng'


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


def get_country(lat, long):
    if not lat or not long:
        return False
    lat_long = (float(lat), float(long))
    results = osm_rg.get(lat_long)
    return results[COUNTRY]


def extract_countries(data_list):
    result_list = []
    for i, coordinates_list in enumerate(data_list):
        countries = []
        for coordinates in coordinates_list:
            country = get_country(coordinates[LAT], coordinates[LONG])
            if country:
                countries.append(country)
        if len(countries) > 0:
            utilities.save_in_file(countries, str(i), RESULT_DIR)
            result_list.append(countries)
    return result_list


locations_lists = read_all_jsons()

countries_list = extract_countries(locations_lists)
