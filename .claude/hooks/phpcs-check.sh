#!/usr/bin/env bash
# PostToolUse hook: autofix + lint theme PHP files after Claude edits them.
#
# Flow:
#   1. If the target file is NOT a PHP file inside wp-content/themes/cadmous/,
#      exit 0 silently.
#   2. Run phpcbf to auto-fix trivial style issues (alignment, trailing
#      whitespace, etc.). phpcbf's exit code is ignored — we only care about
#      phpcs's verdict after autofix.
#   3. Re-run phpcs with --error-severity=1 --warning-severity=0 so only true
#      ERRORS block the write. Warnings already got a best-effort autofix in
#      step 2; anything left over is informational and not worth blocking on.
#   4. If phpcs still reports errors, print them to stderr and exit 2. Claude
#      sees the output and fixes the real problem on the next turn.
#
# Reads Claude Code hook JSON from stdin.

set -u

payload=$(cat)
file=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_input.path // empty')

[ -z "$file" ] && exit 0
case "$file" in
    *.php) ;;
    *) exit 0 ;;
esac
case "$file" in
    *"/wp-content/themes/cadmous/"*) ;;
    *) exit 0 ;;
esac
[ -f "$file" ] || exit 0

theme_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}/wp-content/themes/cadmous"
phpcs="$theme_dir/vendor/bin/phpcs"
phpcbf="$theme_dir/vendor/bin/phpcbf"
[ -x "$phpcs" ] || exit 0

# Step 1: autofix whatever phpcbf can fix. Ignore its exit code.
if [ -x "$phpcbf" ]; then
    "$phpcbf" --standard="$theme_dir/phpcs.xml.dist" --no-colors "$file" >/dev/null 2>&1 || true
fi

# Step 2: re-lint for real errors only (ignore warnings).
output=$("$phpcs" \
    --standard="$theme_dir/phpcs.xml.dist" \
    --error-severity=1 \
    --warning-severity=0 \
    --no-colors \
    "$file" 2>&1)
status=$?

if [ $status -ne 0 ]; then
    printf 'PHPCS errors in %s:\n%s\n' "$file" "$output" >&2
    exit 2
fi

exit 0
