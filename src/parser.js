/**
 * Schedule Parser
 */


/* Config */
const selectingConfigPrecedence = ['nthWeekDay', 'dayOfWeek', 'dateOfMonth'];

/* Helpers */
const scales = {
	dayOfWeek: (date) => date.getDay(),
	dateOfMonth: (date) => date.getDate(),
	nthWeekDay: (date, config) => {
		const jsWeekDay = config.dayOfWeek[0] - 1; //NOTE: When multiple dayOfWeeks are present only the first value is considered.

		if(date.getDay() !== jsWeekDay)
			return;

		const monthStart = new Date(date).setDate(1);
		const firstDateWithSameWeekDay = new Date(monthStart);
		while(firstDateWithSameWeekDay.getDay() != jsWeekDay) {
			firstDateWithSameWeekDay.setDate(firstDateWithSameWeekDay.getDate() + 1);
		}

		return (date.getDate() - firstDateWithSameWeekDay.getDate()) / 7 + 1;
	},
}

module.exports = (config) => {
	const { startDate, endDate } = config;
	const dateIndex = new Date(startDate);
	const selectingConfig = selectingConfigPrecedence.filter((configName) => config[configName])[0]
	const selectingScale = scales[selectingConfig];

	const selectedDates = [];

	while(dateIndex <= endDate) {
		config[selectingConfig].forEach((value) => {
			if(selectingScale(dateIndex, config) === value)
				selectedDates.push(new Date(dateIndex));
		});

		dateIndex.setDate(dateIndex.getDate() + 1);
	}

	return selectedDates;
}
