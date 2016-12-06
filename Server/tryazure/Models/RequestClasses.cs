using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace travelMap.Models
{
    public class PersonWithAge
    {
        public PersonWithAge( Person pers )
        {
            Email = pers.Email;
            Gender = pers.Gender;
            Locale = pers.Locale;
            Age = pers.GetAge();
        }
        public string Email { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Locale { get; set; }
    }
    public class ChangePersonInfo
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class RequestInfo
    {
        public string Name { get; set; }
        public int StartAge { get; set; }
        public int FinishAge { get; set; }
        public string Gender { get; set; }
        public List<string> Locales { get; set; }
    }
}