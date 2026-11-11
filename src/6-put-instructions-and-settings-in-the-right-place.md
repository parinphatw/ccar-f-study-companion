# 6 Put instructions and settings in the right place

## The decision

Choose scope based on who should share an instruction or setting. Do not confuse natural-language guidance with an enforced security control.

CLAUDE.md provides persistent project or personal context. Rules can be organized in .claude/rules, including path-scoped instructions. Relevant instruction files are assembled as context; conflicting prose is not a reliable enforcement mechanism. Keep guidance concise and inspect what loads. Auto memory is distinct from instructions maintained by the team. [8](sources-and-further-reading.md)

Claude Code settings use JSON configuration with user, shared project, project-local, and managed sources. Common paths include ~/.claude/settings.json, .claude/settings.json, and .claude/settings.local.json. The current precedence and merging rules belong to settings, not to an imagined universal “last file wins” rule for all instructions. Managed policy is the appropriate area for organization-enforced configuration. [9](sources-and-further-reading.md)

## Worked example

A team wants every contributor to run the same tests before opening a pull request. Put the shared command and expectations in repository guidance. A developer's preferred terminal appearance belongs in user settings. A temporary personal project override should remain local. A rule forbidding access to production credentials must be implemented through permissions and infrastructure controls, not merely a sentence in CLAUDE.md.

In a monorepo, frontend formatting instructions should not accidentally govern database migrations. Put specialized guidance close to the relevant code or use appropriate path-scoped rules. Keep the root instructions focused on repository-wide facts and links to specialized material.

## Paths and syntax worth recognizing

User guidance commonly lives at ~/.claude/CLAUDE.md. Shared guidance can live in the repository's CLAUDE.md or .claude/CLAUDE.md, with directory-specific files for local conventions. An @ reference can import another instruction file, helping keep standards modular. Use /memory to inspect relevant instruction sources rather than guessing why a teammate's experience differs. [24, objective 3.1]

A rule in .claude/rules can have YAML frontmatter with paths containing glob patterns. A pattern such as **/*.spec.ts can target tests throughout a repository, whereas a directory CLAUDE.md is a better match for conventions confined to one subtree. Keep scoped rules focused enough that unrelated tasks do not load irrelevant material. The exam guide describes path activation in editing terms; consult current docs for precise loading behavior in your version. [24, objective 3.3]

## Debug instruction problems

When a guideline is ignored, ask whether it loaded, whether another instruction contradicts it, whether the wording is actionable, and whether the task requires stronger enforcement. “Write good code” is not a testable instruction. “Run the unit suite for the changed package and report any failures” is much clearer.

Do not put secrets in instruction files. They may be committed, loaded into model context, copied into logs, or shared with collaborators. Prefer references to approved secret-handling mechanisms rather than credentials themselves.

## Chapter summary

- Shared knowledge belongs at shared scope; personal preferences belong at personal scope.
- Instruction text and configuration have different semantics.
- Enforce security-sensitive boundaries in permissions and the underlying environment.

## Recall questions

1. Where should a team-wide test command be documented?
2. Why is CLAUDE.md insufficient to prohibit a sensitive operation?
3. What should you inspect before adding more instructions to fix an ignored rule?
