# 9 Validate structure and meaning separately

## The decision

Choose the right mechanism for each kind of correctness: output shape, factual support, business validity, and permission.

[Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) constrain responses to a supported schema; current Messages API documentation uses output_config.format for JSON output. Strict tool use is a related mechanism for tool names and input schemas. Schema compliance does not establish truth or business eligibility. Handle documented exceptions such as refusal or interrupted generation rather than assuming every API response is a usable business object.

An ordinary input_schema alone does not guarantee valid tool inputs. In [current strict tool use](https://platform.claude.com/docs/en/build-with-claude/structured-outputs), enable strict: true on the tool definition for the supported schema guarantees. That distinction matters when translating the guide's shorthand description of schema-enforced extraction into a real implementation. Strictness still does not validate the truth of extracted values.

## A layered validation pipeline

First confirm the request completed appropriately. Then parse and validate the expected structure. Next apply deterministic domain checks. Finally check evidence and authorization before any action. These layers catch different errors.

For a credit recommendation, structure checks may require order_id, currency, amount_minor, and reason. Domain checks verify that the amount is nonnegative, the currency matches the order, and the proposed credit does not exceed the permitted amount. Evidence checks confirm the stated reason exists in the record. Authorization checks determine whether the system may actually issue the credit.

## Worked example

Claude returns a perfectly valid object recommending a credit of 9000 minor units. The order total is 6000. A schema that permits any nonnegative integer accepts the result, but the business validator rejects it. Tightening the schema helps for fixed bounds, yet dynamic limits still need trusted application state.

A retry should explain the specific validation failure and provide the relevant evidence. Do not simply say “try harder.” Set a retry limit. If the evidence is missing or the policy is ambiguous, return an explicit review state instead of repeatedly forcing a confident answer.

## Model uncertainty in the schema

A required field can encourage fabrication if the actual input omits that information. Allow a deliberate unknown or needs_review representation when the task permits it. Distinguish zero from missing, an empty list from an unsuccessful search, and no qualifying records from no access to the data.

For document extraction, include evidence references alongside fields when useful. A field value with a source location is easier to audit than an unsupported answer. Be careful when combining product features: consult current compatibility documentation rather than assuming every output mode works with every citation feature.

Optional and nullable are different. An optional property may be absent from an object; a nullable property may be present with null as its value. Decide both separately, following the supported schema dialect. For categories, an enum can include unclear, or other with a detail field, so unusual inputs do not get forced into a false known category. [Exam guide, objective 4.3](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=17)

For invoice extraction, keep stated_total separate from a total calculated by trusted code. Compare them and record conflict_detected when appropriate. A corrective request should include the original source, the failed extraction, and the specific validation error. If the required fact exists only in a missing attachment, retrieve that attachment when authorized or report the gap; repeated extraction cannot recover unavailable information.

## Chapter summary

- Valid syntax and schema are necessary for many pipelines, but not sufficient.
- Use deterministic checks for business invariants.
- Provide explicit uncertainty states and bounded repair loops.

## Recall questions

1. Which correctness problems does structured output solve?
2. What validation must remain after schema checking?
3. Why might a required field need a permitted unknown value?
