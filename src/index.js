/**
 * Scheduler
 */


/* Delegates */
const scheduleParser = require('./parser');

/* Exports */
const scheduler = () => { //NOTE: The reason for using a partial, instead of a traditional class is to ensure better encapsulation.
	const state = {};

	const self = {
		for: (config) => {
			state.occurrences = scheduleParser(config);
			return self;
		},
		getOccurrences: (count) => state.occurrences.slice(0, count),
		getOccurrencesFrom: (fromDate, count) => state.occurrences.filter((date) => date >= fromDate).slice(0, count),
		getAllOccurrences: () => state.occurrences.slice(0), //NOTE: A copy is retruned, to prevent against mutations.
		getNumberOfOccurrences: () => state.occurrences.length,
	}

	return self;
};

module.exports = scheduler;
