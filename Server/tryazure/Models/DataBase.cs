using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Configuration;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization;

namespace travelMap.Models
{
    public class DataBase
    {
        MongoClient client;
        const string ConnectionString = "mongodb://travelmap-serv8866.cloudapp.net:27017";
        const string BaseName = "test";
        const string NameOfCollectionForPersons = "persons";
        const string NameOfCollectionForCountries = "countries";
        public IMongoDatabase database;
        private IMongoCollection<Person> collectionForPersons;
        private IMongoCollection<Country> collectionForCountries;

        public DataBase()
        {
            client = new MongoClient( ConnectionString );
            database = client.GetDatabase( BaseName );
            collectionForPersons = database.GetCollection<Person>( NameOfCollectionForPersons );
            collectionForCountries = database.GetCollection<Country>( NameOfCollectionForCountries );
        }

        public Person GetPersonFromDBById( string value )
        {
            var objValue = ObjectId.Parse( value );
            var filter = Builders<Person>.Filter.Eq( "_id", objValue );
            var personFromDB = collectionForPersons.Find( filter );
            if ( personFromDB.Count() != 0 ) {
                return personFromDB.First();
            } else {
                return null;
            }
        }

        public Person GetPersonFromDB( string name, string value )
        {
            var filter = Builders<Person>.Filter.Eq( name, value );
            var personFromDB = collectionForPersons.Find( filter );
            if ( personFromDB.Count() != 0 ) {
                return personFromDB.First();
            } else {
                return null;
            }
        }

        public bool UpdateField( string id, string field, string value )
        {
            ObjectId _id = ObjectId.Parse( id );
            var filter = Builders<Person>.Filter.Eq( "_id", _id );
            var update = Builders<Person>.Update.Set( field, value );
            var result = collectionForPersons.UpdateOne( filter, update );
            return result.MatchedCount != 0;
        }

        public Country GetCountryFromDB( string name )
        {
            var filter = Builders<Country>.Filter.Eq( "Name", name );
            var countryFromDB = collectionForCountries.Find( filter );
            if ( countryFromDB.Count() != 0 ) {
                return countryFromDB.First();
            } else {
                return null;
            }

        }

        public bool AddCountries( string id, string field, List<string> value )
        {
            ObjectId _id = ObjectId.Parse( id );
           
            for (int i = 0; i < value.Count(); i++ ) {
                Country countryFromDb = GetCountryFromDB( value[i] );
                if ( countryFromDb == null ) {
                    Country newCountry = new Country();
                    newCountry.Name = value[i];
                    newCountry.ListOfId = new List<string>();
                    newCountry.ListOfId.Add( id );
                    collectionForCountries.InsertOne( newCountry );
                } else {
                    if ( countryFromDb.ListOfId.IndexOf( id ) != -1 ) {
                        countryFromDb.ListOfId.Add( id );
                    }
                }
            }

            var pers = GetPersonFromDBById( id );
            List<string> countries = pers.Countries;
            if ( countries == null ) {
                countries = value;
            } else {
                for ( int i = 0; i < value.Count; i++ ) {
                    if ( countries.IndexOf( value[i] ) == -1 ) {
                        countries.Add( value[i] );
                    }
                }
            }
            var filter = Builders<Person>.Filter.Eq( "_id", _id );
            var update = Builders<Person>.Update.Set( field, countries );
            var result = collectionForPersons.UpdateOne( filter, update );
            return result.MatchedCount != 0;
        }

        public bool DeleteCountries( string id, string field, List<string> value )
        {
            ObjectId _id = ObjectId.Parse( id );
            var pers = GetPersonFromDBById( id );
            List<string> countries = pers.Countries;
            for (int i = 0; i < value.Count(); i++ ) {
                Country countryFromDb = GetCountryFromDB( value[i] );
                if ( countryFromDb == null ) {
                    Country newCountry = new Country();
                    newCountry.Name = value[i];
                    newCountry.ListOfId = new List<string>();
                    collectionForCountries.InsertOne( newCountry );
                } else {
                    int index = countryFromDb.ListOfId.IndexOf( id );
                    if ( index != -1 ) {
                        var countryFilter = Builders<Country>.Filter.Eq( "Name", value[i] );
                        var countryUpdate = Builders<Country>.Update.Pull( "ListOfId", id );
                        collectionForCountries.UpdateOne( countryFilter, countryUpdate );
                    }
                }
            }
            if ( countries != null ) {
                for ( int i = 0; i < value.Count; i++ ) {
                    if ( countries.IndexOf( value[i] ) != -1 ) {
                        countries.Remove( value[i] );
                    }
                }
            } else {
                countries = new List<string>();
            }
            var filter = Builders<Person>.Filter.Eq( "_id", _id );
            var update = Builders<Person>.Update.Set( field, countries );
            var result = collectionForPersons.UpdateOne( filter, update );
            return result.MatchedCount != 0;
        }

        public List<Country> GetAllCountries()
        {
            var filter = new BsonDocument();
            var countriesFromDB = collectionForCountries.Find( filter );
            if ( countriesFromDB.Count() != 0 ) {
                return countriesFromDB.ToList();
            } else {
                return null;
            }
        }

        public void InsertPerson(Person person)
        {
            collectionForPersons.InsertOne(person);
        }
    }
}