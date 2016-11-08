using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace BackEnd_ot_Sani.Models
{
    public class Person
    {
        public ObjectId Id { get; set; }
        public int tempId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Location { get; set; }
    }
}