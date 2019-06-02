# The structure of a Schedule

## Example
```js
const schedule = {
	/* Limits */
	startDate: new Date('2017-01-01'),
	startDate: new Date('2017-12-31'),

	/* Selectors */
	year: [2017],
	month: [1],
	dateOfMonth: [1],
	dayOfWeek: [1],
	nthWeekDay: [1],

	/* Refiners */
	step: 1,
}
```

## The Design

	The design is in such a way to ensure simplicity and versatility. The DSL is capable of combining selectors to describe complex schedules.

## Flow

* The parser parses the schedule in an order of  **generic -> specific -> special** cases. IE: The order is same as that of the above example. The order is built so to deselect early (for performance).

* For a date to be selected, it has to be selected by all the selectors (**an AND filter**).

* The values of the selectors or **an OR Filter**. IE: *dateOfMonth: [1, 2]*, means a date that's one or two.

* When a selector is absent, it's assumed to be recurrent. IE: *dateOfMonth: undefined*, means all dates. This renders the need for explicit intervals, obsolete.

* Refiners are parsed after the selection is done. IE: A refiner runs over the selected sub-set of dates.
