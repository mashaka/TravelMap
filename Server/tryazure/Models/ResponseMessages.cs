﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace travelMap.Models
{
    public class ErrorMessage
    {
        public ErrorMessage( string message )
        {
            Message = message;
        }
        public string Message { get; set; }
    }

    public class OkMessage
    {
        public OkMessage( string message )
        {
            Id = message;
        }
        public string Id { get; set; }
    }

    public class MapInfo
    {
        public List<string> Countries { get; set; }
    }

    public class Recommendations
    {
        public Recommendations( Dictionary<string, int> countries )
        {
            Countries = countries;
        }
        public Dictionary<string, int> Countries;
    }

    public class JSONInt
    {
        public JSONInt( int number )
        {
            Number = number;
        }
        public int Number { get; set; }
    }

    public class Distribution
    {
        public Distribution( int count, SortedDictionary<string,int> _distribution )
        {
            TotalNumber = count;
            Countries = _distribution;
        }
        public int TotalNumber;
        public SortedDictionary<string, int> Countries;
    }

}