# Review checklist

Use these as explanations to rehearse, not as claims about the wording of any live exam.

## Architecture and orchestration

- Explain workflow versus agent control flow.
- Trace a complete client-tool round trip.
- Distinguish completed, failed, cancelled, and uncertain states.
- Design bounded delegation with explicit evidence and ownership.
- Place enforcement before consequential actions.

## Tools and integration

- Write descriptions that distinguish overlapping tools.
- Design schemas, meaningful errors, and backend checks.
- Distinguish client tools, server tools, and MCP integrations.
- Explain connection scope, authorization, and untrusted results.

## Claude Code

- Separate persistent instructions from enforced configuration.
- Select shared, personal, local, or managed scope appropriately.
- Explain skills, hooks, permission modes, and non-interactive runs.
- Design a repository workflow with independent tests and restricted access.

## Prompting and outputs

- Define measurable success before changing prompts.
- Use examples to expose ambiguity and edge cases.
- Separate schema compliance from semantic validity.
- Build bounded repair and explicit unknown states.
- Evaluate actions and evidence as well as final prose.

## Context and reliability

- Preserve constraints, action state, and provenance through handoffs.
- Compare retrieval, compaction, and durable state.
- Handle conflicting sources and partial failures honestly.
- Retry only when appropriate and reconcile uncertain writes.
- Escalate with a precise packet of evidence and a decision request.
