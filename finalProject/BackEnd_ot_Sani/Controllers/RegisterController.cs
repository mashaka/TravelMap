using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEnd_ot_Sani.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;
using System.Threading.Tasks;
namespace BackEnd_ot_Sani.Controllers
{
    public class RegisterController : ApiController
    {
        DataBase db = new DataBase();
        public Person GetPerson(int id)
        {
            var persons = db.FilterAsync(id);
            var doc = persons.FirstOrDefault();
            return BsonSerializer.Deserialize<Person>(doc);
            //Person pers = new Person { tempId = 1, Name = "Vasya", Surname = "pupkin", Age = 33 };
            //return pers;
        }

        [HttpPost]
        public void PostPerson(Person doc)
        {
            db.InsertAsync(doc);
        }
    }
}
