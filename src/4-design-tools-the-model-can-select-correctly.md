# 4 Design tools the model can select correctly

## The decision

Make the right operation easy to identify and hard to misuse. Tool design affects both selection and execution quality.

A [custom tool definition](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) includes a name, description, and input_schema. A useful description explains the operation, when to use it, and relevant limitations. Detailed schemas make parameters less ambiguous; examples can clarify intended inputs.

## Describe boundaries rather than marketing

Compare “Search customer information” with “Find orders by exact order ID or customer email. Returns order IDs and status only. Does not issue refunds or search support messages.” The second description distinguishes neighboring tools and limits mistaken expectations.

A narrow tool surface often improves safety and testability. Separate read_order from issue_credit because their authority requirements differ. Avoid a generic execute_action tool with an arbitrary action string if a small set of explicit operations would represent the task accurately. However, splitting every tiny step can increase round trips. Choose a boundary that matches a meaningful operation and an enforceable permission.

## Worked example

Northstar has search_orders and search_tickets. Claude repeatedly uses search_tickets for an order number because both descriptions say “find customer records.” Rename or clarify the tools and add examples of the identifiers each accepts. Increasing model size is not the first remedy for an unclear interface.

For issue_credit, use integer minor currency units or a carefully specified decimal representation. Define the currency, order identifier, reason code, and authorization reference. The backend should check maximum amount and eligibility using trusted state. A schema can require amount to be an integer; it cannot by itself prove that the customer is eligible.

## Control selection without confusing it with authorization

The guide distinguishes tool_choice auto, any, and a forced named tool. Auto permits a text-only response. Any requires a tool selection, but does not specify which available tool. A forced selection, expressed as a type of tool with its name, is useful when a particular extraction must happen before enrichment. Process that result before allowing dependent steps. Tool choice directs the model; it does not prove user approval or enforce business prerequisites. Check model and mode compatibility in the current API. [Exam guide, objectives 2.3 and 4.3](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=10)

Give each worker the tools needed for its role. If a synthesis worker repeatedly needs simple source verification, a narrowly scoped verify_fact tool may avoid needless coordinator round trips. Deep research can still go through the research worker. This is a measured exception to separation of duties, not a reason to give every agent every capability.

Also inspect the system prompt when routing goes wrong. A rule associating every mention of “document” with one tool can override the distinction you intended in otherwise clear tool descriptions.

## Design useful errors

A result such as “failed” gives the model no safe next step. A better error distinguishes missing information, invalid arguments, permission denial, transient service outage, and an operation with uncertain status. Include actionable details without secrets: “Order ID format invalid; expected N followed by digits” or “Access denied; additional retries will not help.”

Keep sensitive internals out of model-visible errors. Database credentials, stack traces containing tokens, and unrelated customer records are not helpful recovery information.

## Chapter summary

- Descriptions should distinguish tools with overlapping names or purposes.
- Schemas constrain shape; backend validation enforces meaning and authority.
- Good errors make recovery possible without encouraging blind retries.

## Recall questions

1. Why does a valid JSON argument not prove an action is safe?
2. What should change first when two tools are regularly confused?
3. Which error types are unsuitable for automatic retry?
