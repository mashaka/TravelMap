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
            countries = RecomnnededCountries.Recommend( person.Locale, countries );
            return Request.CreateResponse<Recommendations>( HttpStatusCode.OK, new Recommendations( countries ) );
        }
        [HttpPost]
        [Route( "api/map/list" )]
        public HttpResponseMessage GetListOfUsers( RequestInfo info )
        {
            //var objId = "58433e70112d77168cd68063";
            //var objId = Request.Headers.Authorization.ToString();
            string countryName = info.Name;
            Country country = db.GetCountryFromDB( countryName );
            if ( country == null ) {
                var answerString = "Invalid country";
                return Request.CreateResponse<ErrorMessage>( HttpStatusCode.BadRequest, new ErrorMessage( answerString ) );
            }
            List<string> users = country.ListOfId;
            int answerCount = 0;
            foreach( var id in users ) {
                Person userFromCountry = db.GetPersonFromDBById( id );
                if ( ( userFromCountry.Gender == info.Gender || info.Gender == "ANY" ) &&
                    userFromCountry.GetAge() >= info.StartAge && userFromCountry.GetAge() <= info.FinishAge && 
                    info.Locales.IndexOf( userFromCountry.Locale ) != -1) {
                    answerCount++;
                }
            }
            return Request.CreateResponse<JSONInt>( HttpStatusCode.OK, new JSONInt( answerCount ) );
        }
        //оптимизировать
        //и допилить
        [HttpPost]
        [Route( "api/map/distribution" )]
        public HttpResponseMessage GetDistribution( RequestInfo info )
        {
            //var objId = "58433e70112d77168cd68063";
            //var objId = Request.Headers.Authorization.ToString();
            ListOfCountries allCountries = new ListOfCountries();
            var listOfCountries = allCountries.List;
            List<string> allUsers = new List<string>();
            Dictionary<string, int> distribution = new Dictionary<string, int>();
            foreach( var country in listOfCountries ) {
                int numberOfGuyes = 0;
                string countryName = country.Key;
                Country dbCountry = db.GetCountryFromDB( countryName );
                if ( dbCountry != null ) {
                    List<string> guyes = dbCountry.ListOfId;
                    foreach ( var guy in guyes ) {
                        Person userFromCountry = db.GetPersonFromDBById( guy );
                        if ( ( userFromCountry.Gender == info.Gender || info.Gender == "ANY" ) &&
                            userFromCountry.GetAge() >= info.StartAge && userFromCountry.GetAge() <= info.FinishAge ) {
                            numberOfGuyes++;
                        }
                        if ( allUsers.IndexOf( guy ) == -1 ) {
                            allUsers.Add( guy );
                        }
                    }
                }
                distribution.Add( countryName, numberOfGuyes );
            }
            distribution.Add( "TOTAL", allUsers.Count );
            return Request.CreateResponse<Recommendations>( HttpStatusCode.OK, new Recommendations( distribution ) );
        }


        [HttpPost]
        [Route( "api/map/add" )]
        public HttpResponseMessage Add( MapInfo countries )
        {
            var objId = Request.Headers.Authorization.ToString();
            //var objId = "5845f322112d764258959e27";
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
