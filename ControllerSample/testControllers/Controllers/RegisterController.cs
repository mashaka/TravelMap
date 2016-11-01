using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using testControllers.Models;

namespace testControllers.Controllers
{
    public class RegisterController : ApiController
    {
        Person[] persons = new Person[]
        {
            new Person { Id = 1, Name = "Vasya", Surname = "pupkin", Age = 33 },
            new Person { Id = 2, Name = "Vova",  Surname = "petrov", Age = 22 },
            new Person { Id = 3, Name = "Sanya",  Surname = "smirnov", Age = 11 }
        };

        public IEnumerable<Person> GetPersons()
        {
            return persons;
        }

        public Person GetPerson(int id)
        {
            Person book = new Person();
            for (int i = 0; i < persons.Count(); i++)
            {
                if (id == persons[i].Id)
                {
                    book = persons[i];
                }
            }
            return book;
        }
    }
}
