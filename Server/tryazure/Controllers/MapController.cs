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
using travelMap.Functions;

namespace travelMap.Controllers
{
    public class MapController : ApiController
    {
        DataBase db = new DataBase();
        [HttpGet]
        [Route( "api/map/" )]
        public HttpResponseMessage GetCountries()
        {
            var objId = Request.Headers.Authorization.ToString();
            var person = db.GetPersonFromDBById( objId );
            if ( person != null ) {
                return Request.CreateResponse<MapInfo>( HttpStatusCode.OK, new MapInfo { Countries = person.Countries} );
            } else {
                var answerString = "Invalid user id";
                return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( answerString ));
            }
        }
        [HttpGet]
        [Route( "api/map/recommended" )]
        public HttpResponseMessage GetRecommendedCountries()
        {
            RecommendedCountries RecomnnededCountries = new RecommendedCountries();
            //var objId = "58433e70112d77168cd68063";
            var objId = Request.Headers.Authorization.ToString();
            var person = db.GetPersonFromDBById( objId );
            if ( person == null ) {
                var answerString = "Invalid user id";
                return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( answerString ) );
            }
            Dictionary<string, int> countries = new Dictionary<string, int>();
            if (person.Countries != null ) {
                for (int i = 0; i < person.Countries.Count; i++ ) {
                    countries.Add( person.Countries[i], 0 );
                }
            }
            RecomnnededCountries.Recommend( ref countries );
            return Request.CreateResponse<Recommendations>( HttpStatusCode.OK, new Recommendations( countries ) );
        }
        [HttpPost]
        [Route( "api/map/add" )]
        public HttpResponseMessage Add( MapInfo countries )
        {
            var objId = Request.Headers.Authorization.ToString();
            //var objId = "58433e70112d77168cd68063";
            if ( db.AddCountries( objId, "Countries", countries.Countries ) ) {
                return new HttpResponseMessage( HttpStatusCode.OK );
            } else {
                return new HttpResponseMessage( HttpStatusCode.BadRequest );
            }
        }
        [HttpPost]
        [Route( "api/map/delete" )]
        public HttpResponseMessage Delete( MapInfo countries )
        {
            var objId = Request.Headers.Authorization.ToString();
            //var objId = "58433e70112d77168cd68063";
            if ( db.DeleteCountries( objId, "Countries", countries.Countries ) ) {
                return new HttpResponseMessage( HttpStatusCode.OK );
            } else {
                return new HttpResponseMessage( HttpStatusCode.BadRequest );
            }
        }
    }
}
