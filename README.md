# COVID-19 USA
![Main CI](https://github.com/amishpr/covid19-usa/workflows/Main%20CI/badge.svg)

<span>
<a href="https://www.buymeacoffee.com/amish" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-green.png" alt="Buy Me A Coffee" height=50px""></a>
</span>

This project checks [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) every 4 hours to see if the `us-states.csv` and `us-counties.csv` have been updated and then converts them to a JSON format and deploys it to a website for public use.

* Converted the `us-states.csv` file from [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) into a JSON file.

	* View JSON here: https://amishpr.github.io/covid19-usa/timeseries.json

* Converted the `us-counties.csv` file from [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) into a JSON file.

	* View JSON here: https://amishpr.github.io/covid19-usa/timeseries-counties.json

## JSON

### timeseries.json
The JSON is grouped by state with each having an array of objects with the following information:

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

### timeseries-counties.json
The JSON is grouped by state and then county with each county having an array of objects with the following information:

* Date
* [FIPS Code](https://www.census.gov/quickfacts/fact/note/US/fips)
* Confirmed Cases
* Deaths

**Note:** 

Some data goes back as early as January 21st, 2020 (Ex. Washington), but most of the data starts after March 1st, 2020.

```json
{
    "Washington": {
		"Snohomish": [
			{
				"date": "2020-01-21",
				"fips": "53061",
				"cases": "1",
				"deaths": "0"
			},
			{
				"date": "2020-01-22",
				"fips": "53061",
				"cases": "1",
				"deaths": "0"
			},
			...
			],
		"Spokane": [
			{
				"date": "2020-02-24",
				"fips": "53063",
				"cases": "4",
				"deaths": "0"
			},
			{
				"date": "2020-02-25",
				"fips": "53063",
				"cases": "4",
				"deaths": "0"
			},
			...
			]
		...
		}
	...
}
```

### Example

Here is an example of using the data with JavaScript:

TBA

## Projects using this dataset ([➕Add Yours](#adding-your-project))
 [COVID-19 Tracker](https://www.covid-19tracker.app) ([repo](https://github.com/amishpr/covid-19tracker)): Displays current information about
 COVID-19 cases worldwide and by state for USA.

## Adding your project 

Please make a pull request adding a link to your project in this `README.MD`.

Rules:
* Project must be Open Source
* On your project cite [amishpr/covid19-usa](https://github.com/amishpr/covid19-usa) as a data source (with a link) as well as the [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) 
* Use the following format:
	```markdown
 	[PROJECT NAME](PROJECT URL) ([repo](REPO URL)): DESCRIPTION
	```
	* **Note:** Replace UPPER CASED values with your own
	
[➕Add a new project to the list](https://github.com/amishpr/covid19-usa/edit/master/README.md)

## Inspiration / Thank you

Please go checkout: [pomber/covid19](https://github.com/pomber/covid19).

The idea, a lot of my GitHub Action setup, and other files are from that repo.

pomber made a timeseries.json for every country/territory using 
[CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19)
and I wanted to do the same for every state in the United States.

## License

This repository is licensed under the [GNU General Public License v3.0](https://github.com/amishpr/covid19-usa/blob/master/LICENSE).

The data from [nytimes/covid-19-data](https://github.com/nytimes/covid-19-data) is licensed under [their own terms of use](https://github.com/nytimes/covid-19-data/blob/master/LICENSE).
