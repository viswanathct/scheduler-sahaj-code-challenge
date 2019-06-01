/*
# Notes

* The reason for using JS, instead of JSON to write down the configuration is multifold, they are:
	* Flexibilty (IE: The config could be used as a spec).
	* Redabilty.
	* IDE support.
	* The ability to add descriptive comments.
	* And more.
*/
module.exports = {
	config: {
		startDate: '2017-01-01', // The reason for choosing 2017 is that, it's a simple year. IE: Starts with a Sunday and is not a leap year.
		endDate: '2017-12-31',
		//NOTE: A reference calendar could be found at: https://www.timeanddate.com/calendar/?country=1&year=2017
	},
	cases: [
		{
			schedule: {
				description: 'Every second Saturday is a holiday.',
				dsl: {
					day: 7,
					ordinal: 2,
				},
			},
			expectations: {
				first: "2017-01-14",
				last: "2017-12-10",
				count: 12,
			},
		},
		{
			schedule: {
				description: 'Remind me to pay my phone bill on the 10th of every month.',
				date: 10,
			},
			expectations: {
				first: "2017-01-10",
				last: "2017-12-10",
				count: 12,
			},
		},
		{
			schedule: {
				description: '2nd Sep is my anniversary.',
				date: 2,
				month: 9,
			},
			expectations: {
				first: "2017-09-02",
				last: "2017-09-02",
				count: 1,
			}, //TODO: Override the default end-date to test for recurrence.
		},
		{
			schedule: {
				description: 'Every Tuesday and Thursday is team catch-up.',
				day: [3, 5],
			},
			expectations: {
				first: "2017-01-03",
				last: "2017-12-28",
				count: 104,
			},
		},
		{
			schedule: {
				description: 'Every 1st and 3rd Sunday, I need to visit the hospital.',
				day: 1,
				ordinal: [1, 3],
			},
			expectations: {
				first: "2017-01-01",
				last: "2017-12-17",
				count: 24,
			},
		},
		{
			schedule: {
				description: '2nd Dec 2017 we have a school reunion. (non-recurrent event)',
				date: 2,
				month: 12,
				year: 2017,
			},
			expectations: {
				first: "2017-12-02",
				last: "2017-12-02",
				count: 1,
			},
		},
		{
			schedule: {
				description: 'Every alternate Wednesday our sprint ends.',
				day: 4,
				step: 2,
			},
			expectations: {
				first: "2017-01-04",
				last: "2017-12-27",
				count: 27,
			},
		},
		{
			schedule: {
				description: 'Once in 2 months, on the 10th I need to pay my credit card bill.',
				date: 10,
				step: 2,
			},
			expectations: {
				first: "2017-01-10",
				last: "2017-12-10",
				count: 6,
			},
		},
		{
			schedule: {
				description: 'Once in every quarter, 5th we have shareholders’ meeting.',
				date: 5,
				month: [3, 6, 9, 12],
			},
			expectations: {
				first: "2017-03-05",
				last: "2017-12-05",
				count: 4,
			},
		},
	],
}
