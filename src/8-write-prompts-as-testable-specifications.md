# 8 Write prompts as testable specifications

## The decision

Specify what a good answer must do, which evidence it may use, and how it should respond when the evidence is insufficient.

Anthropic recommends defining success criteria and evaluations before [prompt optimization](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview). Clarity, representative examples, explicit output requirements, and clear separation of instructions from supplied material are useful techniques. [Model-specific prompting guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) can change; do not assume a technique that helped an older model is always necessary for a newer one.

## Build a practical prompt

For Northstar's reply writer, state the task: draft a concise explanation for the customer using the supplied order and policy records. State constraints: do not invent delivery dates, do not claim an action was taken without a receipt, and identify missing information. State output: a customer-facing draft plus an internal list of unresolved facts. Supply representative examples, including an ambiguous case, rather than only easy successes.

Delimiters or labeled sections can separate policy, evidence, and request. Their value is clarity, not magical protection. Retrieved text remains untrusted even inside XML tags. Enforce consequential boundaries in code.

## Worked example

The prompt “Be helpful and resolve the issue” encourages assumptions about what counts as resolution. Replace it with an explicit contract: explain the observed status, mention only a supported delivery estimate, and ask one necessary question if the order cannot be identified. The improvement is not greater verbosity. It is a clearer decision rule.

If outputs remain wrong, diagnose the source. Did retrieval omit the relevant policy? Are the examples inconsistent? Is the schema missing an unknown state? Is the model being asked to infer a fact that does not exist? A prompt cannot manufacture authoritative evidence.

## Review criteria that reduce false positives

“Be conservative” does not define a review policy. Instead, state which categories matter and what evidence qualifies. For a comment review, report a comment that contradicts observable code behavior; do not flag every imprecise stylistic phrase. Define severity using concrete impact. A potential crash on an ordinary input is different from a formatting preference.

Track dismissed findings by category and detected_pattern. If one category produces many false alarms, temporarily suppress it while improving the rubric and examples. Otherwise it can erode trust in accurate findings elsewhere. A threshold based only on the model saying it is confident is not a substitute for categorical criteria. [Exam guide, objectives 4.1 and 4.4](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=16)

## Use examples deliberately

Suppose tickets can be billing, shipping, or other. Include a ticket mentioning both a late shipment and a duplicate charge, and explain the tie-breaking rule the application actually wants. Otherwise the model must invent one. Keep development examples separate from held-out evaluation examples so that apparent improvement is not merely memorization of the test cases.

Ask for a concise decision and supporting evidence when appropriate. You do not need to demand private internal reasoning to verify an answer; observable citations, calculations, test results, and rule applications are better review artifacts.

## Chapter summary

- Turn vague quality goals into observable requirements.
- Include realistic edge cases and an explicit missing-evidence behavior.
- Diagnose retrieval and application logic before treating every failure as a prompt problem.

## Recall questions

1. What should be defined before optimizing a prompt?
2. Why do delimiters not solve authorization or prompt injection by themselves?
3. What makes an example useful beyond showing the desired format?
