# 1 Choose the smallest useful architecture

## The decision

Decide who should choose the next step. A fixed business process usually belongs in application code. Open-ended investigation may need a model to choose tools and revise its approach. A single model call can be enough when all required evidence already fits in the request.

Anthropic distinguishes [workflows with predefined paths from agents that dynamically direct their work](https://www.anthropic.com/research/building-effective-agents). It recommends starting simply and adding complexity when it produces a measured benefit. That is a design principle, not a claim that one pattern always wins.

## Understand the alternatives

Consider three Northstar tasks. Categorizing a supplied support ticket into a known queue can be one model call with a constrained output. Checking order eligibility, calculating a refund, and requesting approval follows a workflow: each step has a known place and the calculation belongs in code. Investigating a vague report that several shipments disappeared may need an agent to search orders, compare warehouse events, and decide which hypothesis to test next.

The distinction is control flow, not the number of prompts. A workflow may contain ten model calls and still have a fixed route. An agent might solve a request in two calls, but the next operation depended on evidence it discovered. Tools alone do not make a system an autonomous agent.

A useful design review starts with four questions. Is the path known before execution? Are intermediate results easy to validate? What happens if the model chooses a wrong action? How much additional latency and cost can the task justify? These questions keep an impressive demonstration from becoming an unnecessarily complicated production system.

## Worked example

Northstar receives a request to explain a delayed order. The order API already returns a status, promised date, and carrier event. A workflow fetches that record, applies policy in code, and asks Claude to explain the result. A multi-agent discussion adds little because there is one authoritative record and no independent research problem.

Now change the request: identify why delay complaints rose across three warehouses. Independent searches of incident reports, shipment metrics, and support tickets can be useful. A coordinator can compare these findings. The added agents have a purpose: they investigate different evidence, rather than vote on the same incomplete prompt.

## Practical exercise

Draw the steps for an invoice assistant. Mark each as deterministic calculation, model interpretation, external read, or consequential write. Replace every model-generated arithmetic operation with a tested calculation unless interpretation is genuinely needed. Put an explicit authorization check before any payment instruction is executed.

## Chapter summary

- Match the architecture to uncertainty in the work.
- More agents and more prompts create coordination costs as well as capabilities.
- Keep business rules, calculations, and authority checks outside model judgment when they must be dependable.

## Recall questions

1. Why is a five-step prompt chain not necessarily an agent?
2. When does a second agent add useful capability?
3. What evidence would justify replacing an agent with a workflow?
