using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace MongoApp
{
    class Person
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Location { get; set; }
    }
    class Program
    {
        private static IMongoDatabase dataBase;
        static void Main(string[] args)
        {
            string connectionString = "mongodb://localhost";
            dataBase = ConnectToDatabase(connectionString, "test");
            InsertSomeDocuments();
            FindDocs().GetAwaiter().GetResult();
            Console.ReadLine();

        }
        public static IMongoDatabase ConnectToDatabase(string connectionString, string name)
        {
            var client = new MongoClient(connectionString);
            return client.GetDatabase(name);
        }
        private static async void InsertSomeDocuments()
        {
            Person user1 = new Person { Name = "Leha", Surname = "Zhur", Age = 14, Gender = "M", Location = "Moscow" };
            Person user2 = new Person { Name = "Sanya", Surname = "Smir", Age = 21, Gender = "M", Location = "Yar" };
            var collection = dataBase.GetCollection<Person>("users");
            await collection.InsertOneAsync(user1);
            await collection.InsertOneAsync(user2);
        }
        private static async Task FindDocs()
        {
            var collection = dataBase.GetCollection<BsonDocument>("users");
            var filter = new BsonDocument();
            using (var cursor = await collection.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    var people = cursor.Current;
                    foreach (var doc in people)
                    {
                        Console.WriteLine(doc);
                    }
                }
            }
        }
    }
}