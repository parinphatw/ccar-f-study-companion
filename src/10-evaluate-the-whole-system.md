# 10 Evaluate the whole system

## The decision

Measure whether the application solves the user's task, not merely whether the final paragraph sounds convincing.

[Official evaluation guidance](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) emphasizes measurable success criteria and representative tests. Use deterministic checks for exact properties and clear rubrics for judgments that require interpretation. Held-out cases and edge cases help reveal whether a change generalizes.

## Build a compact evaluation set

For Northstar, include easy order lookups, missing orders, multiple matching customers, stale delivery estimates, conflicting policy documents, inaccessible records, and tool outages. Add malicious instructions inside retrieved tickets. Each case should state the expected behavior, allowed actions, required evidence, and unacceptable outcomes.

Measure several dimensions separately. A reply can be accurate but unauthorized. A safe answer can be unnecessarily unhelpful. A low-cost run can omit essential evidence. Track task completion, unsupported claims, unauthorized actions, latency, cost, and escalation quality rather than compressing everything prematurely into one number.

## Worked example

A new prompt improves average answer quality but issues credits in two cases where approval was missing. The average score hides a critical regression. Treat authorization violations as a release-blocking condition, not merely a small deduction balanced by better tone.

A grader model can help scale qualitative review, but it is another imperfect component. Give it a rubric, compare its judgments with human review, and inspect disagreement cases. Do not assume two models agreeing establishes ground truth when both saw the same misleading evidence.

## Independent and multi pass review

A fresh reviewer should inspect the change, requirements, and tests without inheriting the generator's persuasive rationale. Independence reduces shared assumptions, but does not guarantee correctness. For a broad change, review each file for local issues and then run a distinct pass over cross-file contracts and data flow. Otherwise local passes can miss a mismatch between a caller and its callee. Requiring majority agreement among repeated reviews can suppress a real issue seen by only one reviewer; verify the evidence instead. [Exam guide, objective 4.6](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=19)

## Calibrate human review

A self-reported confidence score is a signal to test, not a probability to trust automatically. Compare field-level confidence against labeled examples and choose thresholds from observed errors. Segment results by document family and field. An excellent overall extraction score may hide weak performance on handwritten totals or unusual invoice layouts.

Route ambiguous, conflicting, or low-confidence results to human review. Also take stratified random samples from supposedly high-confidence outputs, including uncommon document types. That ongoing audit catches confidently wrong patterns and distribution changes. Review capacity is limited, so prioritize risk and observed error rates rather than inspecting only the easiest cases. [Exam guide, objective 5.5](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=22)

## Optimize the measured bottleneck

If retrieval dominates latency, shorten or parallelize independent retrieval rather than changing the wording of the final prompt. If generation dominates, reduce unnecessary output length or evaluate a suitable model. If repeated stable context dominates cost, investigate [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). Caching reuses prompt-prefix computation; it is not a cache of verified final answers and does not make stale facts current.

For large sets of independent, nonurgent requests, [asynchronous batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) can be more appropriate than interactive requests. Do not put a user waiting for an immediate support answer behind an offline batch merely because batching is cheaper.

The July 2026 guide describes Message Batches as offering 50 percent cost savings with processing up to 24 hours, rather than an interactive latency promise. Correlate results using custom_id, not returned order. Inspect each outcome and resubmit only failed requests after correcting the cause. A single batch request does not run an interactive client-tool loop that executes a tool and sends its result back mid-request. Test prompts on representative samples before sending the full workload. [Exam guide, objective 4.5](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=18)

For an original scheduling example, a document arriving just after a five-hour submission boundary can wait nearly five hours before submission and then up to 24 hours for processing. That is almost 29 hours before downstream overhead. If the service target is 30 hours, leave enough margin for that overhead and failures; do not confuse average completion with a guaranteed deadline.

## Chapter summary

- Evaluate actions, evidence, failures, and final output together.
- Keep safety-critical failures visible rather than hiding them in an average.
- Optimize the component measured to be expensive or slow.

## Recall questions

1. Why can an improved average score conceal a worse system?
2. What should a tool-failure test verify?
3. When is batching inappropriate even if it lowers cost?
