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

namespace tryazure.Controllers
{
    public class AuthorizationController : ApiController
    {
        DataBase db = new DataBase();
        [HttpPost]
        public HttpResponseMessage PostPerson( Person doc )
        {
            var dbPers = db.GetPersonFromDB( "Login", doc.Login );
            if ( dbPers != null ) {
                if ( dbPers.Login == doc.Login && dbPers.Password == doc.Password ) {
                    var id = dbPers.Id;
                    return Request.CreateResponse<OkMessage>( HttpStatusCode.OK, new OkMessage( id.ToString() ) );
                } else if ( dbPers.Password != doc.Password ) {
                    var answerString = "Invalid password";
                    return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( answerString ) );
                }
            } else {
                var answerString = "Invalid login";
                return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( answerString ) );
            }
            return new HttpResponseMessage( HttpStatusCode.InternalServerError );
        }
    }
}
