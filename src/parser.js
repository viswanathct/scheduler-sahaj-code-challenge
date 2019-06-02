/**
 * Schedule Parser
 */


/* Helpers */
const { keys } = Object;

const dayOfWeek = (date) => date.getDay() + 1;

const getClassifier = (schedule) => (date) => {
	const availableSelectors = selectors.filter((selector) => schedule[selector]);

	return availableSelectors.findIndex((selector) =>  {
		const selectingValues = schedule[selector];
		const selectorScale = selectorScales[selector];
		const hasNoMatches = selectingValues
			.findIndex((value) => selectorScale(date, schedule) === value) == -1;

		return hasNoMatches;
	}) == -1; //NOTE: A no-negatives case is checked for, instead of an all-positives case, so to reduce checks, by deselecting early.
}

/* Core */
const selectorScales = { //NOTE: Selectors are applied sequentially, in the order of declaration. The declaration is specified in such a way to deselect early.
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

/* Exports */
const parseSchedule = (schedule) => {
	const { startDate, endDate } = schedule;
	const classifyDate = getClassifier(schedule);

	let selectedDates = [];

	const dateForSelection = new Date(startDate);
	while(dateForSelection <= endDate) {
		if(classifyDate(dateForSelection))
			selectedDates.push(new Date(dateForSelection));

		dateForSelection.setDate(dateForSelection.getDate() + 1);
	}

	if(schedule.step)
		selectedDates = selectedDates.filter((dummy, index) => index % schedule.step == 0);

	return selectedDates;
}

module.exports = parseSchedule;
