using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testControllers.Models
{
    public class Person
    {
        //public ObjectId Id { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Location { get; set; }
    }
}