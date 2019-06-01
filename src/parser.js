/**
 * Schedule Parser
 */


/* Helpers */
const { keys } = Object;

const dayOfWeek = (date) => date.getDay() + 1;

/* Core */
const selectorScales = {
	year: (date) => date.getFullYear(),
	month: (date) => date.getMonth() + 1,
	dateOfMonth: (date) => date.getDate(),
	dayOfWeek,
	lunarDay: () => 'An imaginary config to demonstrate the extensibility of the parser.',
	nthWeekDay: (date, config) => {
		const weekDay = config.dayOfWeek[0]; //NOTE: When multiple dayOfWeeks are present only the first value is considered.

		if(selectorScales.dayOfWeek(date) !== weekDay)
			return;

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
	const dateIndex = new Date(startDate);
	const availableSelectors = selectors.filter((selector) => config[selector]);

	let selectedDates = [];

	while(dateIndex <= endDate) {
		if(availableSelectors.every(
			(selector) =>  {
				const selectingValues = config[selector];
				return selectingValues
					.findIndex((value) => selectorScales[selector](dateIndex, config) === value) > -1;
			}
		))
			selectedDates.push(new Date(dateIndex));

		dateIndex.setDate(dateIndex.getDate() + 1);
	}

	if(config.step)
		selectedDates = selectedDates.filter((dummy, index) => index % config.step == 0);

	return selectedDates;
}
