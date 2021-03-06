/**
 * Testing the interface.
 *
 * //NOTE: This test is written in a more traditional manner (as compared to the spec test), so to demonstrate variety.
 */

/* Imports */
const scheduler = require('../../src');

/* Helpers */
const { entries } = Object;
const assert = (value) => {
	if(!value) throw new Error();
}
const isDateValid = (date) => !isNaN(date.valueOf('Oops!'));

/* Config */
const scheduleConfig = {
	startDate: new Date('2017-01-01'),
	endDate: new Date('2017-12-31'),
	dateOfMonth: [1],
}

const tests = {
	for: () => {
		const schedule = scheduler().for(scheduleConfig);
		assert(schedule.getAllOccurrences !== undefined);

		const occurrences = schedule.getAllOccurrences();
		const firstOccurrence = occurrences[0];
		assert(isDateValid(firstOccurrence));
	},

	startDate: () => {
		const schedule = scheduler().for(scheduleConfig);
		assert(schedule.startDate().valueOf() === new Date('2017-01-01').valueOf());
	},

	endDate: () => {
		const schedule = scheduler().for(scheduleConfig);
		assert(schedule.endDate().valueOf() === new Date('2017-12-01').valueOf());
	},

	getOccurrences: () => {
		const schedule = scheduler().for(scheduleConfig);
		const occurrences = schedule.getOccurrences(1);

		assert(occurrences.length == 1);
	},

	getOccurrencesFrom: () => {
		const schedule = scheduler().for(scheduleConfig);
		const fromDate = new Date('2017-01-02');

		const occurrences = schedule.getOccurrencesFrom(fromDate);
		assert(occurrences.length == 11);

		const limitedOccurrences = schedule.getOccurrencesFrom(fromDate, 3);
		assert(limitedOccurrences.length == 3);
	},

	getAllOccurrences: () => {
		const schedule = scheduler().for(scheduleConfig);
		assert(schedule.getAllOccurrences().length == 12);
	},

	getNumberOfOccurrences: () => {
		const schedule = scheduler().for(scheduleConfig);
		assert(schedule.getNumberOfOccurrences() == 12);
	},
}

module.exports = () => {

	console.log('\nTesting the interface:');

	entries(tests).forEach(([testName, test]) => {

		console.log(`Testing the method: ${testName}`);
		test();
		console.log('done');
	});
};
