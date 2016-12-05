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
using System.Web.Http.ModelBinding;

namespace travelMap.Controllers
{
    public class InformationController : ApiController
    {
        DataBase db = new DataBase();
        [HttpGet]
        [Route( "api/information/" )]
        public HttpResponseMessage Get()
        {
            var objId = Request.Headers.Authorization.ToString();
            var person = db.GetPersonFromDBById( objId );
            if ( person != null ) {
                return Request.CreateResponse<PersonWithAge>( HttpStatusCode.OK, new PersonWithAge(person) );
            } else {
                return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( "Alesha molodec" ) );
            }
        }
        [HttpPost]
        [Route( "api/information/" )]
        public HttpResponseMessage PostPerson( ChangePersonInfo doc )
        {
            var objId = Request.Headers.Authorization.ToString();
            //var objId = "5842db84112d802d2c951f77";
            if ( doc.Email != null ) {
                if ( db.UpdateField( objId, "Email", doc.Email ) ) {
                    return new HttpResponseMessage( HttpStatusCode.OK );
                } else {
                    return new HttpResponseMessage( HttpStatusCode.BadRequest );
                }

            } else if ( doc.NewPassword != null ) {
                Person dbPers = db.GetPersonFromDBById( objId );
                if ( dbPers.Password != doc.OldPassword ) {
                    var answerMessage = "Incorrect password";
                    return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( answerMessage ) );
                }
                if ( db.UpdateField( objId, "Password", doc.NewPassword ) ) {
                    return new HttpResponseMessage( HttpStatusCode.OK );
                } else {
                    return new HttpResponseMessage( HttpStatusCode.BadRequest );
                }
            } else {
                return new HttpResponseMessage( HttpStatusCode.InternalServerError );
            }
        }
    }
}
