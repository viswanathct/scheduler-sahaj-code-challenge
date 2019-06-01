# Scheduler

	An interview problem posed by Sahaj, Chennai.

# Setup
```sh
# Node v8.10.0+ is needed run the solution. Available at: https://nodejs.org/en/
$ node test/index.js
```

**Kindly go through this document, to understand the reasoning behind various decisions.**

# The Ask (requirements)

	See the attached PDF.

# Notes

* The reason for delivering this as a repo, is to help with analyzing the evolution of the solution.

* Comments are frequent in the solution, to convey the intention behind decisions to the reviewer.

* The structure is implemented with simplicity in mind, with full awareness on the possibility of having a more nuanced structure, which supports recursive configuration. IE: Such a DSL along with its parser, would enable us to schedule for **"the first sunday of the third week of the second month of the second quarter of the next leap year"**. Though the implementation is only slightly costly (~1.75x), it wasn't undertaken, as the primary ask was **Simplicity** and there was an explicit call-out to follow **YAGNI** and **KISS**.

* Possible deviations from the norm and the reasons for such decisions:

	* The DSL isn't as portrayed in the ask.

		* The current implementation is well thought through, to keep the solution simple -- even when extended. DevEx of the DSL was deprioritized over the ability to generate the DSL from a UI. This required the DSL to be simple and versatile, albeit being a little less readable.

		* If readability were a concern, an adapter could be written for the DSL itself to improve **DevEX**. If needed, see the following repos for an example:

			* A DSL - [JSON Transformation Schema](https://github.com/viswanathct/json-transformation-schema).


			* And an adapter to make it more humane - [JTS Templates](https://github.com/viswanathct/jts-templates).

	* There weren't any *conventional classes*.

		* The decision is taken for two reasons:

			* Making extensions simple and straight forward. Look for **lunarDay** in the parser. An new config is as simple as adding a line of code. ***PS:** This doesn't violate YAGNI, as extensibility is not a feature, but an inherent capacity of a system.*

			* To understand the limitations of a design pattern, which I'm evolving, to help with declarative programming.

		* Even with the absence of classes, SOLID design principles are adhered to.

	* A traditional testing framework isn't used.

		* The reason for this is, I don't know of any traditional testing framework, which supports **spec testing**.


# Plan

* Prepare a prototype DSL.

* Think over its implications and refine it, before going for an implementation.

* Implement it and test it for the given use cases and for any needed additional cases.

* Detail the rationale for such an implementation, to help reviewers.

* Optional

	* In addition to spec testing, add edge-case testing.

	* Perform chaos testing to ensure the robustness of the DSL. NOTE: This could be costly as input validations aren't done.

	* Make the DSL more humane.

# Assumptions

* Since *Simplicity* was the primary ask, the implementation concerns primarily on it, by making the structure simple and readable.

* This entails that need for deprioritizing the usual NFR-s like optimized performance, input validation, error handling etc.

# Time Taken

* 3:30 hours to think through possible DSL-s and to finalize the simplest **required** DSL.

* 20 minutes to setup the initial documentation.

* 20 minutes to write down the spec in the proposed DSL.

* 10 minutes to setup linting.

* 20 minutes to convert the spec to a testable spec.

* 2:10 hours to pass the first use-case.

* 28 minutes to pass all the use-cases.

* 38 minutes to test the interface.

* 50 minutes in cleaning up.

* 10 minutes to add some missing API-s.

* ~7 hours of **Dev Time** in total.
