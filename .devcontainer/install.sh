#!/usr/bin/env bash
# Runs once when the Codespace is created. Installs Deno onto the default PATH,
# registers the Deno Jupyter kernel so VS Code can launch it, and warms the
# dependency cache.
set -euo pipefail

# Needed to unpack the Deno release archive.
if ! command -v unzip >/dev/null 2>&1; then
  sudo apt-get update && sudo apt-get install -y unzip
fi

DENO=/usr/local/bin/deno

# Install Deno by downloading the release binary directly into a PATH dir.
# We deliberately avoid deno.land/install.sh: it prompts interactively
# ("Edit shell configs to add deno to the PATH? (Y/n)"), which hangs the
# non-interactive Codespace build.
if [ ! -x "$DENO" ]; then
  case "$(uname -m)" in
    x86_64|amd64) target="x86_64-unknown-linux-gnu" ;;
    aarch64|arm64) target="aarch64-unknown-linux-gnu" ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
  esac
  tmp="$(mktemp -d)"
  curl -fsSL "https://github.com/denoland/deno/releases/latest/download/deno-${target}.zip" -o "$tmp/deno.zip"
  unzip -o "$tmp/deno.zip" -d "$tmp"
  sudo install -m 755 "$tmp/deno" "$DENO"
  rm -rf "$tmp"
fi

"$DENO" --version

# Register the "Deno" kernel so it shows up in the VS Code kernel picker.
"$DENO" jupyter --install --force

# Pre-download the SDK / std deps used by the course so the first cell is fast.
"$DENO" cache lib/helpers.js || true
