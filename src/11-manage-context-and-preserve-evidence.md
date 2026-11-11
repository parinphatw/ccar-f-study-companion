# 11 Manage context and preserve evidence

## The decision

Keep the information needed for the next decision available, accurate, and attributable. More tokens are not automatically better context.

The [context window](https://platform.claude.com/docs/en/build-with-claude/context-windows) is the model's working input and generated output budget, not a permanent database. Long histories can reduce effective recall. [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) replaces older conversation material with a summary, while retrieval and external state provide other ways to make relevant information available. Current APIs and Claude Code expose different context-management mechanisms, so verify the mechanism for the product you use.

## Preserve the right things

For a long support investigation, retain the user's goal, explicit constraints, resolved customer and order identifiers, confirmed actions and receipts, unresolved questions, and source references. Raw debug logs and repeated search results may be less useful than a short evidence summary plus retrievable originals.

A summary should not silently change “the carrier may have lost the parcel” into “the carrier lost the parcel.” Store uncertainty and provenance with the claim. Preserve negative restrictions such as “do not issue a credit yet”; losing a restriction can be more harmful than losing descriptive background.

## Worked example

After several rounds of research, Northstar's assistant compacts its history. The summary says “customer approved resolution,” but the customer approved only a replacement quote, not shipment. A later agent dispatches a replacement. The failure came from compressing distinct commitments into an ambiguous phrase.

A better state record separates proposed, approved, submitted, and confirmed actions, with a reference to the source message and receipt. Critical state should be stored in a structured application record rather than reconstructed solely from conversational memory.

## Explore a repository without loading everything

Use Glob to find paths by filename pattern and Grep to search file contents. Read relevant files to inspect complete definitions. Edit supports targeted changes when the anchor is unambiguous. If Edit fails because the target text matches more than once, reread the full current file and either provide a unique anchor or use a careful Read plus Write replacement that preserves unrelated content. Do not blindly repeat the ambiguous edit. Bash is appropriate for commands such as running tests. Do not default to a shell command when a narrow file tool expresses the operation more clearly. [Exam guide, objective 2.5](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=11)

To trace a behavior, find an entry point, inspect its imports and exports, and follow actual callers. If wrappers re-export the function under different names, search those names as well. Persist a short map of important modules, relationships, open questions, and evidence paths. Use an Explore worker for verbose discovery, then pass its compact findings into the next phase. /compact can reduce a bloated session, but keep durable facts and a recovery manifest outside a lossy summary. [Exam guide, objective 5.4](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=21)

When assembling a long research input, put a concise statement of key findings and constraints early, with detailed evidence in labeled sections. Trim irrelevant tool fields while preserving exact amounts, dates, identifiers, and user expectations. Do not summarize a promised date as merely “soon.”

## Ground answers in sources

Citations help readers trace a claim to evidence. The Claude API supports [document citation features](https://platform.claude.com/docs/en/build-with-claude/citations) for supported document content. A citation should support the actual claim, not simply point to a related document. A cited outdated policy remains outdated.

When sources disagree, compare effective dates, authority, scope, and the specific entity involved. Do not silently blend them into a confident consensus. If an old general policy conflicts with a current exception approved for one account, identify which applies and why, or escalate if that authority is unclear.

For each research claim, preserve a structured record containing the claim, source URL or document name, supporting excerpt or location, publication date, data collection date, and relevant methodology. Publication and collection dates answer different questions: a report published this year may describe last year's population. Preserve conflicting values and their sources until the coordinator has a justified reconciliation. If the conflict remains, show both and label it rather than silently selecting one.

Match presentation to the information. A table helps compare financial figures across periods, prose explains a news development, and a structured list can present technical findings. A common evidence schema does not require every final answer to use the same visual format. [Exam guide, objective 5.6](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf#page=23)

## Chapter summary

- Context selection is a correctness problem as well as a token-budget problem.
- Preserve restrictions, action state, uncertainty, and provenance.
- A citation enables verification; it does not automatically establish freshness or truth.

## Recall questions

1. What should survive compaction in an action-taking assistant?
2. Why is a concise summary sometimes dangerous?
3. How should conflicting sources be reconciled?
