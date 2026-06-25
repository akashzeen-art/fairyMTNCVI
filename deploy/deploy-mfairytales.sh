#!/bin/bash
# Deploy fairyMTNCVI to mfairytales.com ONLY
# Run on server as root: bash deploy/deploy-mfairytales.sh

set -euo pipefail

PROJECT_DIR="/var/www/vasnumero/fairytales_MTN_CLI"
REPO_URL="https://github.com/akashzeen-art/fairyMTNCVI.git"
NGINX_SITE="mfairytales.com.conf"
NGINX_AVAILABLE="/etc/nginx/sites-available/${NGINX_SITE}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${NGINX_SITE}"

echo "==> Checking Node.js..."
command -v node >/dev/null || { echo "ERROR: Install Node.js 18+ first."; exit 1; }
echo "    Node $(node -v), npm $(npm -v)"

echo "==> Pulling latest code..."
mkdir -p /var/www/vasnumero
if [ ! -d "${PROJECT_DIR}/.git" ]; then
  git clone "${REPO_URL}" "${PROJECT_DIR}"
fi
cd "${PROJECT_DIR}"
git fetch origin
git reset --hard origin/main

echo "==> Installing dependencies..."
npm ci

echo "==> Building..."
npm run build

echo "==> Installing nginx config (mfairytales.com only)..."
cp "${PROJECT_DIR}/deploy/${NGINX_SITE}" "${NGINX_AVAILABLE}"
if [ ! -L "${NGINX_ENABLED}" ]; then
  ln -s "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
fi

echo "==> Testing nginx..."
nginx -t

echo "==> Reloading nginx..."
systemctl reload nginx

echo ""
echo "Done! Site: http://mfairytales.com"
echo "Root:  ${PROJECT_DIR}/dist"
