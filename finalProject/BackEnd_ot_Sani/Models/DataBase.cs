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

namespace BackEnd_ot_Sani.Models
{
    public class DataBase
    {
        MongoClient client;
        public IMongoDatabase database;
        public DataBase()
        {
            string connectionString = "mongodb://localhost";
            string name = "test";
            client = new MongoClient(connectionString);
            database = client.GetDatabase(name);
        }
        public IEnumerable<BsonDocument> FilterAsync(int id)
        {
            var collection = database.GetCollection<BsonDocument>("persons");
            var filter = new BsonDocument();//Builders<BsonDocument>.Filter.Eq("tempId", id);
            return collection.Find(filter).ToList();
        }
        
        public void InsertAsync(Person person)
        {
            var collection = database.GetCollection<Person>("persons");
            collection.InsertOne(person);
        }
    }
}