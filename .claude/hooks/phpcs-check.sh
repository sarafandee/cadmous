#!/usr/bin/env bash
# PostToolUse hook: lint theme PHP files with PHPCS after Claude edits them.
# Reads Claude Code hook JSON from stdin, extracts file_path, runs phpcs if
# the file is a PHP file inside wp-content/themes/cadmous/.

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
[ -x "$phpcs" ] || exit 0

output=$("$phpcs" --standard="$theme_dir/phpcs.xml.dist" --no-colors "$file" 2>&1)
status=$?

if [ $status -ne 0 ]; then
    printf 'PHPCS violations in %s:\n%s\n' "$file" "$output" >&2
    exit 2
fi

exit 0
