/**
 * Tests
 */


/* Imports */
const parser = require('../../src/parser');
const { config, cases } = require('./spec');

/* Helpers */
const { entries } = Object;

const toExpectationDateString = (date) => date.toISOString().slice(0, 10);

const expectationFinders = {
	first: (occurances) => toExpectationDateString(occurances[0]),
	last: (occurances) => toExpectationDateString(occurances[occurances.length - 1]),
	count: (occurances) => occurances.length,
}

const verifyUseCase = (usecase) => {
	const { schedule, expectations } = usecase;
	const occurances = parser({ ...config, ...schedule });

	entries(expectations).forEach(([expectationName, expectation]) => {
		const actual = expectationFinders[expectationName](occurances);

		if(actual !== expectation)
			throw new Error(`Expectian failed: ${expectationName}\nInfo:\n${JSON.stringify(usecase)}`)
	});

	console.log(`Passed: ${usecase.description}`);
}

module.exports = () => cases.forEach(verifyUseCase);
