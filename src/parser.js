/**
 * Schedule Parser
 */


/* Helpers */
const { keys } = Object;

const dayOfWeek = (date) => date.getDay() + 1;

/* Core */
const selectorScales = { //NOTE: Selectors are applied sequentially, in the order of declaration.
	year: (date) => date.getFullYear(),
	month: (date) => date.getMonth() + 1,
	dateOfMonth: (date) => date.getDate(),
	dayOfWeek,
	lunarDay: () => 'An imaginary config to demonstrate the extensibility of the parser.',
	nthWeekDay: (date) => { //NOTE: For this filter to work, the incoming date should've been passed through the dayOfWeek selector. IE: Don't change the order of declaration.
		const weekDay = dayOfWeek(date);
		const monthStart = new Date(date).setDate(1);
		const firstDateWithSameWeekDay = new Date(monthStart);

		while(dayOfWeek(firstDateWithSameWeekDay) !== weekDay)
			firstDateWithSameWeekDay.setDate(firstDateWithSameWeekDay.getDate() + 1);

		return (date.getDate() - firstDateWithSameWeekDay.getDate()) / 7 + 1;
	},
}

/* Data */
const selectors = keys(selectorScales);

module.exports = (config) => {
	const { startDate, endDate } = config;
	const availableSelectors = selectors.filter((selector) => config[selector]);

	let selectedDates = [];

	const dateIndex = new Date(startDate);
	while(dateIndex <= endDate) {
		const dateMatchesAllSelectors = availableSelectors.findIndex((selector) =>  {
			const selectingValues = config[selector];
			const hasNoMatches = selectingValues
				.findIndex((value) => selectorScales[selector](dateIndex, config) === value) == -1;
			return hasNoMatches;
		}) == -1; //NOTE: A no-negatives case is checked for, instead of an all-positives case, so to reduce checks.

		if(dateMatchesAllSelectors)
			selectedDates.push(new Date(dateIndex));

		dateIndex.setDate(dateIndex.getDate() + 1);
	}

	if(config.step)
		selectedDates = selectedDates.filter((dummy, index) => index % config.step == 0);

	return selectedDates;
}
