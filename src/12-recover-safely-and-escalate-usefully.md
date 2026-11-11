# 12 Recover safely and escalate usefully

## The decision

Make failure explicit, recover only when it is safe, and give a human enough information to continue without repeating the investigation.

## Classify before retrying

A transient connection failure may justify a bounded retry with backoff. Invalid arguments require correction. Missing access requires a permission decision or a permitted alternative. An uncertain write requires reconciliation. A business-rule rejection requires a different authorized outcome, not repeated attempts to bypass the rule.

Set budgets for attempts, elapsed time, and work. An agent that keeps searching indefinitely is not more reliable than one that stops with a precise explanation. Repeatedly issuing the same failing call is usually evidence that the recovery policy needs a terminal condition.

## Worked example

Northstar's order lookup succeeds, but the policy service is unavailable. The assistant can still report the observed shipment status and explain that it could not verify credit eligibility. It must not convert the missing policy response into a default approval. A partial answer is useful when it clearly separates confirmed facts from unavailable checks.

Now suppose a worker says “all checks passed,” but one service actually returned an authentication error. The coordinator should reject that success label and preserve the failure. Error propagation across components is part of the design contract, not an optional detail in logs.

## Resolve multiple concerns coherently

If a customer reports a delayed shipment and a duplicate charge, split the concerns into separate investigations sharing the same verified customer and order facts. Independent reads can proceed in parallel. Keep dependencies and consequential actions gated, then synthesize one coherent response that accounts for both concerns. Track each concern separately so resolving the shipment question does not silently close the billing issue. [24, objective 1.4]

## Escalation packet

A useful handoff contains the user's objective, verified identity or record, checks completed, evidence references, the exact unresolved issue, action state, and the smallest decision needed. For example: “Order N104 is delayed. Shipment status verified at 14:10 UTC. Credit policy could not be retrieved. No credit has been submitted. Please confirm eligibility under policy version X or restore policy-service access.”

Avoid escalating everything. Escalation has a cost in user attention and time. Define triggers around ambiguity, authority, risk, and repeated failure. Make the routine path effective while ensuring exceptional cases remain visible.

## Honor the actual escalation trigger

An explicit request to speak to a human should be honored without forcing another investigation first. Frustration alone is different: acknowledge it and offer a useful resolution if the user has not requested a human. Escalate when policy is silent or contradictory, not merely when a request sounds complex. If several customer records match, ask for a discriminating identifier rather than selecting the most plausible person. [24, objective 5.2]

For research, a failed source should produce a coverage gap annotation rather than a false empty result. Let workers attempt appropriate local recovery, then return the attempted query, failure type, partial evidence, and permitted alternatives. The coordinator can continue unaffected work without either suppressing the failure or abandoning the whole task.

## Security and reliability reinforce each other

Least-privilege credentials reduce the consequences of a mistaken tool call. Idempotency reduces duplicate side effects. Logs with operation identifiers support reconciliation. Source references support review. Tests for adverse conditions expose failures before users encounter them. These controls are useful even if the model becomes more capable, because the surrounding system can still fail.

## Chapter summary

- Classify failures before deciding whether to retry.
- Preserve partial success without hiding missing checks.
- Escalate with evidence and a specific decision, not a vague request for help.

## Recall questions

1. How does an uncertain write differ from a rejected write?
2. What makes a partial answer honest and useful?
3. What information should accompany escalation?
