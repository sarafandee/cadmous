#!/usr/bin/env bash
#
# bin/archive-legacy-site.sh — full offline mirror of the legacy
# cadmous.edu.lb static HTML site. Run BEFORE the production cutover
# (CAD-19) so we always have the exact pre-cutover state on disk.
#
# Output: archive/cadmous.edu.lb/ — a complete wget mirror with all
# pages, images, CSS, JS, and the /en/, /fr/, /ar/ language branches.
# Also: archive/cadmous.edu.lb.tar.gz — a compressed tarball of the
# mirror for long-term storage.
#
# The legacy site speaks HTTP only (cert is broken), so we explicitly
# use http:// URLs.

set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p archive
cd archive

echo "[archive] mirroring http://www.cadmous.edu.lb/ …"

wget \
	--mirror \
	--convert-links \
	--adjust-extension \
	--page-requisites \
	--no-parent \
	--execute robots=off \
	--user-agent="CadmousArchiver/1.0" \
	--wait=1 \
	--random-wait \
	--tries=3 \
	--timeout=30 \
	--no-verbose \
	http://www.cadmous.edu.lb/ || true

if [ ! -d www.cadmous.edu.lb ]; then
	echo "[archive] wget produced no output — check network access to cadmous.edu.lb" >&2
	exit 1
fi

mv www.cadmous.edu.lb cadmous.edu.lb 2>/dev/null || true

echo "[archive] tarring cadmous.edu.lb …"
tar -czf cadmous.edu.lb.tar.gz cadmous.edu.lb

size=$(du -sh cadmous.edu.lb.tar.gz | cut -f1)
pages=$(find cadmous.edu.lb -name '*.html' | wc -l | tr -d ' ')

echo "[archive] done."
echo "  pages archived: $pages"
echo "  tarball size:   $size"
echo "  location:       archive/cadmous.edu.lb.tar.gz"
