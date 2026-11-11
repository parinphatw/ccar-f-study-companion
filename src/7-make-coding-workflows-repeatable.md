# 7 Make coding workflows repeatable

## The decision

Separate discovery, planning, implementation, and verification. Use reusable procedures without turning them into hidden permission grants.

Claude Code skills package repeatable guidance in SKILL.md and can include supporting files. Current documentation integrates custom slash commands with skills; older .claude/commands files remain supported. Skills can be invoked by name and, when configured, selected by Claude. Their body loads when used rather than always occupying project context. [10](sources-and-further-reading.md)

Permission modes and tool rules govern execution. Plan mode supports analysis before implementation, but the exact behavior of tools, hooks, and mode transitions should be checked in current documentation. Do not treat “planning” as a universal guarantee that every possible external side effect is impossible. [11](sources-and-further-reading.md)

## Worked example

A repository assistant receives “modernize authentication.” That request is too broad to implement confidently. First inspect the current interfaces, tests, callers, and deployment constraints. Produce a plan that identifies compatibility risks and verification steps. Then make a bounded change, inspect the diff, run tests, and explain what remains unverified.

A small, well-understood change can go directly to execution: for example, adding one missing date check to a single function with a clear failing test. Planning is useful when it reduces real ambiguity or architectural risk, not as a ritual that must delay every edit. [24, objective 3.4]

A useful refactoring skill might require reading repository guidance, identifying behavior to preserve, adding a regression test, implementing a minimal change, and reporting test outcomes. The skill should not silently authorize deployment, broad dependency upgrades, or changes outside the agreed goal.

## Skill frontmatter and iterative work

Recognize project commands under .claude/commands and personal commands under ~/.claude/commands. A project skill lives under `.claude/skills/<name>/SKILL.md`; a personal variant can use a different name under ~/.claude/skills. The guide highlights context: fork for isolated execution, allowed-tools for tool configuration, and argument-hint for parameter guidance. An argument hint is a usability aid, not validation of required arguments. For a skill that users should trigger manually, set disable-model-invocation: true in its SKILL.md frontmatter and invoke it with /skill-name. Do not confuse this with user-invocable: false, which prevents direct user invocation rather than automatic model invocation. [10](sources-and-further-reading.md) Current skill allowed-tools semantics concern tool approval; use actual tool restrictions and runtime policy when exclusivity is required. [24, objective 3.2; 10]

When prose requirements are misunderstood, provide a few concrete input and expected-output pairs. For an unfamiliar design, ask focused questions before implementation to expose hidden requirements. Use failing tests as feedback, including null values and boundary cases. Present interacting defects together so a fix can account for their shared cause; address independent defects in focused iterations when that makes verification clearer. [24, objective 3.5]

## Hooks and enforcement

Hooks run at lifecycle events. PreToolUse is relevant when an operation must be checked before it happens; PostToolUse is useful for reactions after a completed tool action. A post-action check cannot prevent an action already performed. Hook capabilities and blocking behavior vary by event and handler type, so test the actual configuration. [12](sources-and-further-reading.md)

For example, run a deterministic path-policy check before a write to a protected directory. A natural-language reminder may improve behavior but is not the same control. For a hook failure, choose intentional fail-open or fail-closed behavior based on the risk and supported mechanism rather than accidentally allowing execution.

PostToolUse-style result handling can also normalize data before the model reasons over it. For example, convert one system's epoch timestamp and another's ISO date into a consistently labeled representation, preserving timezone and original meaning. Map numeric statuses to documented labels. Never normalize away a distinction that affects the decision, such as pending versus confirmed. The exam guide teaches this interception pattern; verify what the selected hook event can actually return in the current SDK. [24, objective 1.5]

## Automation and CI

Claude Code supports non-interactive execution with claude -p and machine-readable output options. Use explicit permissions and stable configuration for unattended runs. Treat exit status, structured results, tests, and produced artifacts as separate evidence; a successful process does not prove a correct code change. [13, 14](sources-and-further-reading.md)

The guide identifies --output-format json and --json-schema for structured CI findings. Supply repository standards and existing tests so the assistant avoids duplicating covered cases. On a rerun, include previous findings and request only new or still-unresolved issues, preventing repeated comments on each commit. Keep publication of comments as a separately authorized workflow step. [24, objective 3.6]

An untrusted pull request can contain instructions in code or documentation. A CI review assistant should not have unnecessary deployment secrets or unrestricted write access. Run conventional tests independently of the model's assessment.

## Chapter summary

- Plan before broad changes; verify after implementation.
- Skills encode procedures; hooks and permissions serve different roles.
- CI requires restricted access, structured results, and independent checks.

## Recall questions

1. When is a skill more suitable than expanding CLAUDE.md?
2. Which hook phase is relevant to preventing an unsafe tool action?
3. Why is a zero exit code insufficient evidence that a code change is correct?
