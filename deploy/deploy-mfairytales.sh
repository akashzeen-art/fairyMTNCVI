#!/bin/bash
# Deploy fairyMTNCVI to mfairytales.com
# Run on server as root: bash deploy/deploy-mfairytales.sh

set -euo pipefail

PROJECT_DIR="/var/www/vasnumero/fairytales_MTN_CLI"
REPO_URL="https://github.com/akashzeen-art/fairyMTNCVI.git"
NGINX_SITE="mfairytales.com.conf"
NGINX_AVAILABLE="/etc/nginx/sites-available/${NGINX_SITE}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${NGINX_SITE}"

echo "==> Checking Node.js..."
if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js is not installed. Install Node 18+ first."
  exit 1
fi
echo "    Node $(node -v), npm $(npm -v)"

echo "==> Pulling latest code..."
mkdir -p "${PROJECT_DIR}"
if [ ! -d "${PROJECT_DIR}/.git" ]; then
  git clone "${REPO_URL}" "${PROJECT_DIR}"
fi
cd "${PROJECT_DIR}"
git fetch origin
git reset --hard origin/main

echo "==> Installing dependencies..."
npm ci

echo "==> Building production bundle..."
npm run build

echo "==> Installing nginx site config (mfairytales.com only — no other sites touched)..."
cp "${PROJECT_DIR}/deploy/${NGINX_SITE}" "${NGINX_AVAILABLE}"
if [ ! -L "${NGINX_ENABLED}" ]; then
  ln -s "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
fi

echo "==> Testing nginx config..."
nginx -t

echo "==> Reloading nginx..."
systemctl reload nginx

echo ""
echo "Deploy complete!"
echo "  Site:  http://mfairytales.com"
echo "  Root:  ${PROJECT_DIR}/dist"
