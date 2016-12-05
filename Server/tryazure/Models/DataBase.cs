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
        const string collectionName = "persons";
        public IMongoDatabase database;
        public DataBase()
        {
            string connectionString = "mongodb://travelmap-serv8866.cloudapp.net:27017";
            string name = "test";
            client = new MongoClient(connectionString);
            database = client.GetDatabase(name);
        }
        //public IEnumerable<BsonDocument> FilterAsync(int id)
        //{
        //    var collection = database.GetCollection<BsonDocument>( collectionName );
        //    var filter = Builders<BsonDocument>.Filter.Eq("AccessToken", id);
        //    return collection.Find(filter).ToList();
        //}
        public Person GetPersonFromDBById( string value )
        {
            var objValue = ObjectId.Parse( value );
            var collection = database.GetCollection<BsonDocument>( collectionName );
            var filter = Builders<BsonDocument>.Filter.Eq( "_id", objValue );
            var personFromDB = collection.Find( filter );
            if ( personFromDB.Count() != 0 ) {
                return BsonSerializer.Deserialize<Person>( personFromDB.First() );
            } else {
                return null;
            }
        }
        public Person GetPersonFromDB( string name, string value )
        {
            var collection = database.GetCollection<BsonDocument>( collectionName );
            var filter = Builders<BsonDocument>.Filter.Eq( name, value );
            var personFromDB = collection.Find( filter );
            if ( personFromDB.Count() != 0 ) {
                return BsonSerializer.Deserialize<Person>( personFromDB.First() );
            } else {
                return null;
            }
        }
        public bool UpdateField( string id, string field, string value )
        {
            ObjectId _id = ObjectId.Parse( id );
            var collection = database.GetCollection<BsonDocument>( collectionName );
            var filter = Builders<BsonDocument>.Filter.Eq( "_id", _id );
            var update = Builders<BsonDocument>.Update.Set( field, value );
            var result = collection.UpdateOne( filter, update );
            return result.MatchedCount != 0;
        }

        public bool AddCountries( string id, string field, List<string> value )
        {
            ObjectId _id = ObjectId.Parse( id );
            var collection = database.GetCollection<BsonDocument>( collectionName );
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
            var filter = Builders<BsonDocument>.Filter.Eq( "_id", _id );
            var update = Builders<BsonDocument>.Update.Set( field, countries );
            var result = collection.UpdateOne( filter, update );
            return result.MatchedCount != 0;
        }

        public bool DeleteCountries( string id, string field, List<string> value )
        {
            ObjectId _id = ObjectId.Parse( id );
            var collection = database.GetCollection<BsonDocument>( collectionName );
            var pers = GetPersonFromDBById( id );
            List<string> countries = pers.Countries;
            if ( countries != null ) {
                for ( int i = 0; i < value.Count; i++ ) {
                    if ( countries.IndexOf( value[i] ) != -1 ) {
                        countries.Remove( value[i] );
                    }
                }
            } else {
                countries = new List<string>();
            }
            var filter = Builders<BsonDocument>.Filter.Eq( "_id", _id );
            var update = Builders<BsonDocument>.Update.Set( field, countries );
            var result = collection.UpdateOne( filter, update );
            return result.MatchedCount != 0;
        }
        public void InsertAsync(Person person)
        {
            var collection = database.GetCollection<Person>( collectionName );
            collection.InsertOne(person);
        }
    }
}