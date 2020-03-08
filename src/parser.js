/**
 * Schedule Parser
 */

/* Helpers */
const { keys } = Object;

const dayOfWeek = (date) => date.getDay() + 1;

const getSelector = (schedule) => (date) => {
	const availableSelectors = scaleKeys.filter((selector) => schedule[selector]);

	return availableSelectors.findIndex((selector) =>  {
		const selectingValues = schedule[selector];
		const selectorScale = scales[selector];
		const hasNoMatches = selectingValues
			.findIndex((value) => selectorScale(date, schedule) === value) == -1;

		return hasNoMatches;
	}) == -1; //NOTE: A no-negatives case is checked for, instead of an all-positives case, so to reduce checks, by deselecting early.
}

const getRefiner = (schedule) => (dates) => {
	const availableRefiners = refinerKeys.filter(
		(prop) => schedule[prop]).map((prop) => refiners[prop]);
	availableRefiners.forEach((refiner) => dates = refiner(dates, schedule));
	return dates;
}

const getDates = ({ startDate, endDate }) => {
	const dates = [];
	const cursor = new Date(startDate);

	while(cursor <= endDate) {
		dates.push(new Date(cursor));
		cursor.setDate(cursor.getDate() + 1);
	}

	return dates;
}

/* Core */
const scales = { //NOTE: Scales are applied sequentially, in the order of declaration. The declaration is specified in such a way to deselect early.
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

const refiners = {
	step: (dates, schedule) => dates.filter((dummy, index) => index % schedule.step == 0),
}

/* Data */
const scaleKeys = keys(scales);
const refinerKeys = keys(refiners);

/* Exports */
const parseSchedule = (schedule) => {
	const selectDate = getSelector(schedule);
	const refineSelection = getRefiner(schedule);
	const dateRange = getDates(schedule);
	const selectedDates = dateRange.filter(selectDate);

	return refineSelection(selectedDates);
}

// One-liner
// const parseSchedule = (schedule) =>
	// getRefiner(schedule)(getDates(schedule).filter(getSelector(schedule)));

module.exports = parseSchedule;
