# Scheduler

	An interview problem posed bu Sahaj, Chennai.

# Setup
```sh
# Node v8+ is needed run the solution.
$ node test/index.js
```

# Ask

	See the attached PDF.

# Notes

* The reason for delivering this as a repo, is to help with analyzing the evolution of the solution.

* Comments are frequent in the solution, to convey the intention behind decisions to the reviewer.

* The strcucture is implemented with simplicity in mind, with full awarness on the possibilty of having a nuanced structure, that supports recursive configuration. IE: Such a DSL along with its parser, would enable us to schedule for **"the first sunday of the third week of the second month of the second quarter of the next leap year"**. Though the implementation is only slightly costly (~1.75x), it wasn't undertaken, as the primary ask was simplicity and there was an explicit callout to follow **YAGNI** and **KISS**.


# Plan

* Prepare a prtoype DSL.

* Think over it's implications and refine it before going for an implementation.

* Implement it and test it for the given use cases and for any needed additional test cases.

* Detail the rationale for such an implementation, to help reviewers.

* Optional

	* In addition to spec testing, add edge-case testing.

	* Perform chaos testing to ensure the robustness of the DSL. NOTE: This could be costly as input validations aren't done.

	* Make the DSL more humane.

# Assumptions

* Since *Simplicity* was the primary ask, the implementation concerns primarily on it, by making the strucrue simple and readable.

* This enatails that need for deprioritizing the usual NFR-s like performance optimization, extensibility, input validation, error handling etc.

# Time Taken

* 3.5 hours to think through possible DSL-s and to finalize the simplest **required** DSL.

* 20 minutes to setup the intial documentation.

* 20 minutes to write down the spec in the proposed DSL.

* Setup linting.
