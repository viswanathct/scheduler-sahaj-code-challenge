/**
 * Schedule Parser
 */


/* Config */
const selectingConfigPrecedence = ['nthWeekDay', 'dayOfWeek', 'dateOfMonth'];
const filterConfigs = ['month', 'year'];

/* Helpers */
const dayOfWeek = (date) => date.getDay() + 1;

const scales = {
	dayOfWeek,
	dateOfMonth: (date) => date.getDate(),
	nthWeekDay: (date, config) => {
		const weekDay = config.dayOfWeek[0]; //NOTE: When multiple dayOfWeeks are present only the first value is considered.

		if(scales.dayOfWeek(date) !== weekDay)
			return;

		const monthStart = new Date(date).setDate(1);
		const firstDateWithSameWeekDay = new Date(monthStart);
		while(dayOfWeek(firstDateWithSameWeekDay) !== weekDay)
			firstDateWithSameWeekDay.setDate(firstDateWithSameWeekDay.getDate() + 1);

		return (date.getDate() - firstDateWithSameWeekDay.getDate()) / 7 + 1;
	},
	month: (date) => date.getMonth() + 1,
	year: (date) => date.getFullYear(),
}

module.exports = (config) => {
	const { startDate, endDate } = config;
	const dateIndex = new Date(startDate);
	const selectingConfig = selectingConfigPrecedence.filter((configName) => config[configName])[0];
	const selectingScale = scales[selectingConfig];
	const existingFilterConfigs = filterConfigs.filter((configName) => config[configName]);

	let selectedDates = [];

	while(dateIndex <= endDate) {
		config[selectingConfig].forEach((value) => {
			if(selectingScale(dateIndex, config) === value)
				selectedDates.push(new Date(dateIndex));
		});

		dateIndex.setDate(dateIndex.getDate() + 1);
	}

	if(config.step)
		selectedDates = selectedDates.filter((dummy, index) => index % config.step == 0);

	existingFilterConfigs.forEach((filterConfig) =>
		selectedDates = selectedDates.filter((date) => config[filterConfig].includes(scales[filterConfig](date)))
	);

	return selectedDates;
}
