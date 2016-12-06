using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using travelMap.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;

namespace travelMap.Controllers
{
    public class RegisterController : ApiController
    {
        DataBase db = new DataBase();
        [HttpPost]
        public HttpResponseMessage PostPerson( Person doc )
        {
            var personFromDB = db.GetPersonFromDB( "Login", doc.Login );
            if ( personFromDB == null ) {
                doc.Countries = new List<string>();
                db.InsertPerson( doc );
                var id = db.GetPersonFromDB( "Login", doc.Login ).Id;
                return Request.CreateResponse<OkMessage>( HttpStatusCode.OK, new OkMessage( id.ToString() ) );
            } else if ( doc.Email == personFromDB.Email ) {
                var answerString = "User with such email already exists";
                return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( answerString ) );
            } else if ( doc.Login == personFromDB.Login ) {
                var answerString = "User with nickname already exists";
                return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage (answerString ) );
            }
            return new HttpResponseMessage( HttpStatusCode.InternalServerError );
        }
    }
}
