# 3 Delegate with explicit contracts

## The decision

Delegate when a task benefits from separate context, specialized instructions, or independent work. Do not delegate responsibility for the final answer.

Claude Code subagents operate with their own context and can have specific prompts, tools, and permissions. They are useful for keeping large searches or logs out of the main conversation. A worker's description influences when it is selected. These capabilities do not imply that every worker automatically receives every relevant fact from the parent. [4](sources-and-further-reading.md)

## Build a useful assignment

A handoff should identify the question, evidence to inspect, constraints, output format, and completion condition. “Investigate the failure” is weak. “Compare failed order exports from the last deployment with the preceding release; return affected versions, reproducible steps, evidence paths, and unresolved assumptions; do not modify records” is actionable.

Give workers the research goal and quality criteria without prescribing every investigative step; this permits adaptation while preserving scope. The coordinator should divide work at boundaries with low coupling. Asking one worker to inspect logs and another to inspect a code change can work well. Asking both to edit the same function concurrently introduces merge and interpretation conflicts. Give one owner authority to integrate changes and run the combined checks.

## Worked example

Northstar investigates a complaint spike. A shipment worker reports carrier delays, a support worker reports complaint categories, and a policy worker checks whether a recent eligibility change affected responses. Each returns findings with source identifiers and time ranges. The coordinator discovers that the shipment worker used the previous month while the others used the current week. It requests comparable evidence before synthesizing.

The important failure was not low model intelligence. It was an inconsistent task contract. Three polished reports can still be incompatible inputs.

## Blueprint terminology and current implementations

The July 2026 guide calls the spawning mechanism Task and says the coordinator's allowedTools must include Task. It also describes AgentDefinition with a description, prompt, and tool restrictions. Learn that terminology when interpreting the guide's examples. Current Claude Code documentation uses Agent for subagent invocation and distinguishes tool availability from tool auto-approval. Do not mechanically copy an old configuration into a new SDK version, or assume allowedTools by itself is a security boundary. Inspect the current SDK types and permission documentation for your runtime. [24, objective 1.3; 4, 11]

In the blueprint's coordinator pattern, route communication and recovery through the coordinator. Pass relevant prior results explicitly, including source metadata; isolated workers should not be expected to know an earlier conversation. Independent workers can be started together rather than serialized across turns. The coordinator can re-delegate a targeted gap after reviewing the synthesis instead of rerunning every worker. Avoid narrowing a broad research question so aggressively that nobody owns an essential subtopic.

## Sessions and recovery

Resume an existing session when its prior evidence is still useful. The guide uses --resume with a named session and fork_session for independent branches from a shared baseline. Forking is suitable for comparing two approaches without mixing their evolving assumptions. When files changed since the earlier analysis, identify the changed files and require targeted rereading. If many old tool results are stale, a fresh session with a structured summary can be safer than blindly resuming. [24, objective 1.7]

For example, after a weekend change to the order model, do not let Monday's resumed agent rely on Friday's field names. Supply the new commit and changed paths. Save a compact manifest with worker IDs, task states, evidence paths, and completed operation identifiers. After a crash, the coordinator can reload that manifest, verify current state, and resume only unfinished work.

## Preserve uncertainty

A worker's output should distinguish found, not found, not checked, and failed to retrieve. “No policy exceptions” is misleading if the policy source was unavailable. The parent should preserve those distinctions in its final response, rather than converting a partial report into apparent certainty.

Parallel work saves time only when dependencies allow it. If task B needs the identity resolved by task A, launching both immediately risks wasted work or a wrong target. Parallelize independent reads; serialize dependent decisions and conflicting writes.

## Chapter summary

- Delegate a bounded question with evidence and a completion condition.
- Separate worker contexts reduce noise but require explicit handoffs.
- The coordinator owns consistency checks, integration, and the user-facing result.

## Recall questions

1. What belongs in a worker handoff besides the task name?
2. Why can parallel agents make a result worse?
3. How should a parent handle a worker's missing evidence?
