/**
 * Testing the spec.
 */


/* Imports */
const parser = require('../../src/parser');
const { config, cases } = require('./spec');

/* Helpers */
const { entries } = Object;

const toExpectationDateString = (date) => date.toISOString().slice(0, 10);

const expectationFinders = {
	first: (occurrences) => toExpectationDateString(occurrences[0]),
	last: (occurrences) => toExpectationDateString(occurrences[occurrences.length - 1]),
	count: (occurrences) => occurrences.length,
}

const verifyUseCase = (usecase) => {
	const { schedule, expectations } = usecase;
	const occurrences = parser({ ...config, ...schedule });

	entries(expectations).forEach(([expectationName, expectation]) => {
		const actual = expectationFinders[expectationName](occurrences);

		if(actual !== expectation)
			throw new Error(`Expectian failed: ${expectationName}\nInfo:\n${JSON.stringify(usecase)}`)
	});

	console.log(`Passed: ${usecase.description}`);
}

module.exports = () => {
	console.log('\nTesting the spec:');
	cases.forEach(verifyUseCase);
}
