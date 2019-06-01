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
		startDate: new Date('2017-01-01'), // The reason for choosing 2017 is that, it's a simple year. IE: Starts with a Sunday and is not a leap year.
		endDate: new Date('2017-12-31'),
		//NOTE: A reference calendar could be found at: https://www.timeanddate.com/calendar/?country=1&year=2017
	},
	cases: [
		{
			description: 'Every second Saturday is a holiday.',
			schedule: {
				dayOfWeek: [7],
				nthWeekDay: [2],
			},
			expectations: {
				first: "2017-01-14",
				last: "2017-12-09",
				count: 12,
			},
		},
		{
			description: 'Remind me to pay my phone bill on the 10th of every month.',
			schedule: {
				dateOfMonth: [10],
			},
			expectations: {
				first: "2017-01-10",
				last: "2017-12-10",
				count: 12,
			},
		},
		{
			description: '2nd Sep is my anniversary.',
			schedule: {
				dateOfMonth: [2],
				month: [9],
			},
			expectations: {
				first: "2017-09-02",
				last: "2017-09-02",
				count: 1,
			}, //TODO: Override the default end-date to test for recurrence.
		},
		{
			description: 'Every Tuesday and Thursday is team catch-up.',
			schedule: {
				dayOfWeek: [3, 5],
			},
			expectations: {
				first: "2017-01-03",
				last: "2017-12-28",
				count: 104,
			},
		},
		{
			description: 'Every 1st and 3rd Sunday, I need to visit the hospital.',
			schedule: {
				dayOfWeek: [1],
				nthWeekDay: [1, 3],
			},
			expectations: {
				first: "2017-01-01",
				last: "2017-12-17",
				count: 24,
			},
		},
		{
			description: '2nd Dec 2017 we have a school reunion. (non-recurrent event)',
			schedule: {
				dateOfMonth: [2],
				month: [12],
				year: [2017],
			},
			expectations: {
				first: "2017-12-02",
				last: "2017-12-02",
				count: 1,
			},
		},
		{
			description: 'Every alternate Wednesday our sprint ends.',
			schedule: {
				dayOfWeek: [4],
				step: 2,
			},
			expectations: {
				first: "2017-01-04",
				last: "2017-12-20",
				count: 26,
			},
		},
		{
			description: 'Once in 2 months, on the 10th I need to pay my credit card bill.',
			schedule: {
				dateOfMonth: [10],
				step: 2,
			},
			expectations: {
				first: "2017-01-10",
				last: "2017-11-10",
				count: 6,
			},
		},
		{
			description: 'Once in every quarter, 5th we have shareholders’ meeting.',
			schedule: {
				dateOfMonth: [5],
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
