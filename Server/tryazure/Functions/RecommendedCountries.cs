﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace travelMap.Functions
{
    public class RecommendedCountries
    {
        public Dictionary<string, int> Recommend( string locale, Dictionary<string, int> countries )
        {
            //TODO
            var newCollection = new Dictionary<string, int>();
            foreach(KeyValuePair<string,int> element in countries ) {
                newCollection[element.Key] = 33;
            }
            return newCollection;
        }
    }
}