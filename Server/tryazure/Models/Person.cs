using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace travelMap.Models
{
    public class Person
    {
        public ObjectId Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int BirthDay { get; set; }
        public int BirthMonth { get; set; }
        public int BirthYear { get; set; }
        public string Gender { get; set; }
        public string Locale { get; set; }
        public List<string> Countries { get; set; }
    }
    public class PersonWithAge
    {
        public PersonWithAge(Person pers)
        {
            Email = pers.Email;
            Gender = pers.Gender;
            Locale = pers.Locale;
            DateTime a = new DateTime( pers.BirthYear, pers.BirthMonth, pers.BirthDay );
            DateTime b = DateTime.Now;
            Age = ( b.Year - a.Year - 1 ) +
            ( ( ( b.Month > a.Month ) ||
            ( ( b.Month == a.Month ) && ( b.Day >= a.Day ) ) ) ? 1 : 0 );
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
}