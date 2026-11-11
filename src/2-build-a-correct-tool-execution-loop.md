# 2 Build a correct tool execution loop

## The decision

A model proposes a tool call; your runtime decides whether and how to execute it. Treat the loop as a state machine, not a conversation that happens to contain function names.

For client tools in the Messages API, Claude returns tool_use blocks and a tool_use stop reason. The application executes the requested operations and returns tool_result blocks matched by tool_use_id. Preserve the assistant content when extending the conversation. Tool results belong in the subsequent user message, with result blocks before ordinary text. A client-side failure can be reported using is_error. Server tools execute on Anthropic infrastructure instead. [2, 3](sources-and-further-reading.md)

## Reason about states

A robust loop has at least five conceptual states: model response received, requested action validated, action executed or rejected, result recorded, and next model step requested. It also needs terminal states for a completed response, refusal, exhausted budget, cancellation, and unrecoverable failure. A truncated response is not the same as a completed answer.

The runtime should validate tool names and arguments, enforce permission checks, and track the result of each operation. Do not let a sentence such as “the refund is complete” substitute for a successful refund receipt. Conversely, if the operation succeeded but the explanation step failed, do not execute the operation again merely to obtain a nicer final answer.

## Worked example

Claude requests get_order with order_id N104. The application checks access, retrieves the record, and records the response with its call identifier. Claude then requests issue_credit. The runtime confirms eligibility and authorization, executes once using a stable idempotency key, and stores the credit receipt. Only then should a final answer state that credit was issued.

Suppose the credit service times out after submission. The outcome is uncertain. Query the operation status or reconcile using the idempotency key before retrying. Treating timeout as proof that nothing happened can create duplicate credits.

## Stop conditions are not interchangeable

For the blueprint's core loop, continue tool processing on stop_reason equal to tool_use and terminate a normal completed model turn on end_turn. Do not detect completion by searching the assistant's text for phrases such as “done,” and do not assume that any text block means the work is finished. An iteration ceiling is an operational safeguard, not the primary definition of successful completion. If that ceiling is reached, report an incomplete or escalated state. [24, objective 1.1]

## Pseudocode to remember

Start with the authorized goal and a bounded budget. Request a model response. Preserve its content. If tools were requested, validate each call, enforce authorization, execute or return an informative error, append correlated results, and continue. If the response is final, verify completion evidence and stop. For other stop conditions, handle the specific condition rather than guessing from prose.

This is a conceptual outline, not a drop-in SDK implementation. Production code must also handle streaming, cancellation, API errors, model-specific content blocks, and persistence.

## Chapter summary

- A request to use a tool is not evidence of execution.
- Preserve call identifiers and the required message structure.
- Bound the loop and distinguish failure from uncertain execution.

## Recall questions

1. Which component executes a client tool?
2. Why must a tool result be correlated with its call identifier?
3. What should happen before retrying a timed-out consequential write?
