---
name: linear-implement
description: Take a Linear issue ID (CAD-N) and run the full implement → branch → PR → comment loop. Triggers on phrases like "implement CAD-12", "work on CAD-12", "do CAD-12", "let's do CAD-12", "ship CAD-12". Scoped to the cadmous workspace only.
---

# linear-implement

Run a complete implement-and-ship loop driven entirely by a Linear issue ID. The user types `implement CAD-12` and you do the rest: fetch the issue, branch, plan, code, commit, PR, comment back. This is the magic sentence — keep it magic.

## Trigger

User message contains `implement CAD-N`, `work on CAD-N`, `do CAD-N`, `ship CAD-N`, or any close paraphrase, where `N` is an integer. Extract the ID with the regex `\bCAD-\d+\b` (case-insensitive, normalize to upper).

## Refusals

Refuse and stop immediately if any of these are true:

1. **Wrong workspace**: the issue prefix is not `CAD`. Other prefixes (`SAR-`, anything else) belong to other Linear teams and are out of scope here. Tell the user "this skill only handles `CAD-*` issues; switch repos for other teams."
2. **Wrong repo**: the current working directory is not under `/Users/alisalem/ali-dev-projects/cadmous/`. Tell the user to `cd` into the cadmous repo first.
3. **No `linear-cadmous` MCP**: if the `mcp__linear-cadmous__*` tools are not available, tell the user the MCP isn't connected and to run `/mcp` to authorize.

## Step-by-step recipe

### 1. Fetch the issue

Call `mcp__linear-cadmous__get_issue` with the parsed `CAD-N` identifier. Read every field: title, description, labels, priority, milestone, assignee, status, `gitBranchName`, `parentId`, related/blocking issues.

If the issue is in `Done` or `Canceled` state, refuse: "CAD-N is already closed. Did you mean to reopen it?"

### 2. Fetch any context comments

Call `mcp__linear-cadmous__list_comments` with the issue ID. Read all comments. They often contain decisions or clarifications that supersede the original description.

### 3. Check dependencies

If the issue description includes a `## Depends on` section, look up each referenced `CAD-*` issue and verify its status. If any dependency is not `Done`, warn the user clearly and ask if they want to proceed anyway. Do not auto-block — the user is allowed to override.

### 4. Read the linked files

The issue description has a `## Files` section listing files to create or modify. Use the `Read` tool on each file that already exists. Do not blindly create new files until step 7.

### 5. Move the issue to "In Progress" and self-assign

Call `mcp__linear-cadmous__save_issue` with:
- `id`: `CAD-N`
- `state`: `In Progress`
- `assignee`: `me`

This signals to anyone watching Linear that work has started.

### 6. Create the git branch

Use the `gitBranchName` value returned by `get_issue` — it's pre-formatted by Linear (e.g., `sarafandee/cad-2-themejson-translate-designmd-to-design-tokens`). Run:

```bash
git checkout main && git pull --ff-only && git checkout -b <gitBranchName>
```

If the branch already exists locally, switch to it instead of creating it again.

### 7. Plan in ≤200 words

Present a brief plan to the user before touching code. Format:

```
**CAD-N: <title>**

<one-paragraph approach: what files, what order, what's the risk>

Files I'll touch:
- path/to/file.php (new|modified): <one-line purpose>
- ...

Verification: <how I'll know it works>
```

Wait for the user to say "go", "yes", "proceed", or equivalent before continuing. If they redirect, accept the redirect and re-plan.

### 8. Implement

Make the changes. The post-edit hook at [.claude/hooks/phpcs-check.sh](.claude/hooks/phpcs-check.sh) automatically lints any PHP file inside `wp-content/themes/cadmous/` after every Edit/Write/MultiEdit. PHPCS violations come back to you as stderr — fix them on the next turn before moving on.

Keep commits small if the issue is large — multiple commits on the same branch are fine.

### 9. Verify

Before opening the PR, run from `wp-content/themes/cadmous/`:

```bash
composer lint && composer analyse
```

Both must exit 0. If they don't, fix and re-run. Do NOT open a PR with failing lint or stan.

If the issue's acceptance criteria mention browser verification (a homepage element, an admin screen), use the `browse` skill to take a screenshot and confirm. Read the screenshot back so it's visible to the user.

### 10. Tick the checklist

The issue description is a markdown checklist. Fetch the issue again, edit the description to mark each completed `[ ]` task as `[x]`, and save it back via `mcp__linear-cadmous__save_issue`. Skip any task that genuinely wasn't done — be honest.

### 11. Commit

Stage and commit. Linear auto-links commits whose message starts with the issue ID:

```bash
git add <files>
git commit -m "$(cat <<'EOF'
CAD-N: <imperative summary>

<optional body explaining why>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

### 12. Open the PR

```bash
git push -u origin <branch>
gh pr create --title "CAD-N: <title>" --body "$(cat <<'EOF'
## Summary

<1-3 bullets>

## Closes

Fixes CAD-N

## Test plan

- [ ] <how to verify locally>
- [ ] <browser checks if relevant>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

The `Fixes CAD-N` line is what makes Linear auto-move the issue to "In Review" when the PR opens, and to "Done" when it merges. Don't forget it.

### 13. Comment back on Linear

Call `mcp__linear-cadmous__save_comment` with the issue ID and a short comment containing the PR URL:

```
PR opened: <pr-url>
```

That's it — the issue is now in "In Review" with the PR linked, the implementation is on a branch, the plan was approved, and the user has the PR URL.

## When NOT to follow this skill verbatim

- If the user says "implement CAD-N but skip the PR" — do everything except steps 11-13.
- If the user says "just plan CAD-N" — do steps 1-7 and stop after step 7.
- If the issue is trivially small (one-line typo fix) and the user says "just do CAD-N quickly" — collapse the plan step, but still do the lint, commit, PR, and comment.

## Telemetry / output

End every run with a one-line status:

- `DONE: CAD-N → <pr-url>` (success)
- `BLOCKED: CAD-N — <reason>` (couldn't finish)
- `NEEDS_USER: CAD-N — <what you need>` (waiting on a decision)

Keep these visible so the user can scan progress across many issues in one session.
