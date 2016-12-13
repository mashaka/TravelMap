using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;

namespace travelMap.Functions
{
    public class RecommendedCountries
    {
        private struct Data
        {
            public String home_country;
            public Dictionary<String, int> visited_countries;
        }

        public Dictionary<string, int> Recommend( string locale, Dictionary<string, int> countries )
        {
            var pyPath = Path.Combine(Environment.GetEnvironmentVariable("TRAVELMAP_RECOMMENDATIONS_LOCATION"), "algo.py");
            Process process = new Process();
            process.StartInfo.FileName = "python.exe";
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.Arguments = pyPath;

            var data = new Data();
            data.home_country = locale;
            data.visited_countries = countries;
            String dump = JsonConvert.SerializeObject(data);

            process.Start();
            process.StandardInput.WriteLine(dump);
            process.WaitForExit();

            String output = process.StandardOutput.ReadToEnd();
            var result = JsonConvert.DeserializeObject<Dictionary<string, int>>(output);

            return result;
        }
    }
}