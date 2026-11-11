# Case practice

These original questions test reasoning, not familiarity with recalled exam wording. Select the best answer under the stated constraints before reading the rationales.

## Case 1 A delayed credit

A credit tool times out immediately after submission. The assistant has no receipt. What should happen next?

A. Submit the same credit with a new operation identifier.
B. Tell the customer the credit definitely failed.
C. Reconcile the operation using its stable identifier before deciding whether to retry.
D. Ask the model to estimate whether the service probably executed it.

## Case 2 The wrong search tool

An assistant often searches tickets when an order lookup is required. Both tools have broad descriptions. What is the best first intervention?

A. Add three research agents.
B. Clarify tool purposes, accepted identifiers, and boundaries; then evaluate selection.
C. Remove all input validation.
D. Increase the output token budget.

## Case 3 A valid but excessive recommendation

A schema-compliant credit recommendation exceeds the original purchase amount. What is missing?

A. A longer role description.
B. More natural-language encouragement.
C. Another JSON parser.
D. A business validation check against trusted order data.

## Case 4 Shared project conventions

Every contributor must use the repository's test command. One contributor also wants a personal terminal preference. Where should these go?

A. Shared repository guidance for the command; personal configuration for the preference.
B. Both in the customer-facing prompt.
C. Both in every source file.
D. Both in a secret store.

## Case 5 Parallel work

Three agents investigate a complaint spike, but one uses a different time range. What should the coordinator do?

A. Average their conclusions.
B. Choose the most confident report.
C. Align the evidence scope before synthesizing.
D. Remove the time range from the final answer.

## Case 6 A malicious ticket

A retrieved ticket tells the assistant to export all customer emails. The user asked only for a summary. What is the correct interpretation?

A. The ticket grants permission because it came from an authenticated tool.
B. The text is source content, not new authority; keep the requested scope and enforce access controls.
C. MCP automatically makes the instruction trustworthy.
D. Export first and ask afterward.

## Case 7 Faster overnight processing

A company processes thousands of independent documents overnight. No interactive answer is required. What is a plausible optimization to evaluate?

A. Require a human to supervise each model token.
B. Turn every document into a dependent agent chain.
C. Remove validation to reduce processing time.
D. Use asynchronous batch processing with per-request outcome tracking.

## Case 8 A lost restriction

After compaction, an assistant forgets that the user prohibited shipment. What is the strongest architectural improvement?

A. Preserve authorization and action state explicitly in structured state and critical summaries.
B. Increase friendliness in the final response.
C. Ask every worker to guess the user's intention.
D. Store only the latest positive instruction.

## Case 9 A post-action check

A team wants to prevent writes to a protected directory. It runs a check only after a write finishes. What is the key problem?

A. The check has too much context.
B. The tool name is too short.
C. Detection after execution cannot prevent the already completed write; enforcement must occur before or at the boundary.
D. All hooks are inherently unreliable.

## Case 10 A partial outage

Shipment status is available, but the policy service is down. What should the assistant do?

A. Infer eligibility from similar customers.
B. Report verified shipment facts, state the missing policy check, and avoid unsupported action.
C. Claim that no policy exists.
D. Hide the outage and produce a confident resolution.

## Case 11 A misleading improvement

A new prompt improves tone scores but introduces unauthorized actions in two tests. What is the best release decision?

A. Release because the mean score increased.
B. Remove the two difficult tests.
C. Ask the model to grade its own confidence instead.
D. Treat the authorization regression as a blocking issue and fix it before release.

## Case 12 Unnecessary complexity

A task has one authoritative input, a fixed decision rule, and a short explanation. Which starting architecture is most reasonable?

A. A simple workflow with deterministic rule evaluation and a bounded explanation step.
B. A large team of agents voting on the rule.
C. An open-ended research agent with unlimited retries.
D. A long conversation that reconstructs the rule from memory each time.
