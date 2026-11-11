# Publication checks, 11 November 2026

- Converted the original companion into 18 mdBook sections, preserving original chapter prose, questions, and answers.
- Inspected source for private identifying details, local workspace paths, credentials, and confidential examples. Only fictional examples and generic configuration paths were found.
- All 26 original source URLs returned HTTP 200. Checked current Claude Code skills documentation for disable-model-invocation, user-invocable, and allowed-tools semantics; checked current structured-output documentation for output_config.format and strict tool use.
- Foundations supplementary prose license: CC BY-NC-SA 4.0; code: MIT. Professional supplementary prose: CC BY-NC-SA 4.0. No upstream prose or code imported.
- mdBook 0.5.4 build passed without warnings.
- Headless browser at 390 × 844: no horizontal overflow; chapter menu and navigation work; full-text search returns relevant results; no JavaScript errors. Desktop 1365 × 900 screenshot checked.
- These checks are not a line-by-line re-audit of every technical claim or a guarantee of current exam coverage. Use the linked official guide and product documentation as authoritative references.

## Layout and contextual-link update

- Added grouped chapter navigation, restrained typography, comfortable reading width, compact controls, and a wide-desktop “On this page” outline. Native search, themes, mobile menu, and print remain available.
- Added direct contextual documentation links and page-specific exam-guide links in 15 content files. All 30 unique external URLs returned HTTP 200 at verification time.
- mdBook 0.5.4 rebuild and `git diff --check` passed.
- Chromium checked all 19 reading pages at 390, 768, 1365, and 1536 pixels wide with no document horizontal overflow.
- Browser interaction checks passed for wide-screen outline anchors, five themes, repeated menu toggles, mobile chapter navigation, search results, browser Back/Forward, and hiding the outline in print. No JavaScript errors observed.
- Desktop and mobile screenshots visually inspected. No full assistive-technology audit was performed.
