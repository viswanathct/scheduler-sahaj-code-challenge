/**
 * Scheduler
 */


/* Delegates */
const scheduleParser = require('./parser');

/* Exports */
const scheduler = () => {
	const state = {};

	return {
		for: (config) => {
			state.occurances = scheduleParser(config);
		},
		getOccurances: (count) => state.occurances.slice(0, count),
		getOccurrencesFrom: (startDate, count) => state.occurances.filter((date) => date >= startDate).slice(0, count),
		getAllOccurrences: () => occurances.slice(0), //NOTE: A copy is retruned, to prevent against mutations.
		getNumberOfOccurences: () => occurances.length(),
	}
};

module.exports = scheduler;
