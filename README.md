# COVID-19 USA

![.github/workflows/main.yml](https://github.com/amishpr/covid19-usa/workflows/.github/workflows/main.yml/badge.svg)

Converted the `us-states.csv` file from [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) into a JSON file.

View JSON here: https://amishpr.github.io/covid19-usa/timeseries.json

## JSON

The JSON grouped by state with each having an array of objects with the following information:

* Date
* [FIPS Code](https://www.census.gov/quickfacts/fact/note/US/fips)
* Confirmed Cases
* Deaths

**Note:** 

Some data goes back as early as January 21st, 2020 (Ex. Washington), but most of the data starts after March 1st, 2020.

```json
{
...
    "New York": [
        {
	        "date": "2020-03-01",
		    "fips": "36",
		    "cases": "1",
		    "deaths": "0"
	    },
	    {
		    "date": "2020-03-02",
		    "fips": "36",
		    "cases": "1",
		    "deaths": "0"
	    },
	    {
	        "date": "2020-03-03",
		    "fips": "36",
		    "cases": "2",
		    "deaths": "0"
	    },
    ...
    ],
...
}
```

## Use the JSON data

Here is an example of using the data with JavaScript:

```javascript
fetch("https://amishpr.github.io/covid19-usa/timeseries.json")
  .then(response => response.json())
  .then(data => {
    data["New York"].forEach(({ date, fips, cases, deaths }) =>
      console.log(`${date} active cases: ${cases - deaths}`)
    );
  });
```

## Projects using this dataset
 [COVID-19 Tracker](https://www.covid-19tracker.app) ([repo](https://github.com/amishpr/covid-19tracker)): Displays current information about
 COVID-19 cases worldwide and by state for USA.

## Adding your project

Please make a pull request adding a link to your project in this `README.MD`.

Rules:
* Project must be Open Source
* On your project cite [amishpr/covid19-usa](https://github.com/amishpr/covid19-usa) as a data source (with a link) as well as the [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) 
* Use the following format:
 ```
 [project-name](your-project-url) ([repo](repo-url)): description
```

## Inspiration / Thank you

Please go checkout: [pomber/covid19](https://github.com/pomber/covid19).

The idea, a lot of my GitHub Action setup, and other files is from that repo.

pomber made a timeseries.json for every country/territory using 
[CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19)
and I wanted to do the same for every state in the United States.

## License

This repository is licensed under the [GNU General Public License v3.0](https://github.com/amishpr/covid19-usa/blob/master/LICENSE).

The data from [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) is licensed under [their own terms of use](https://github.com/nytimes/covid-19-data/blob/master/LICENSE).