#!/bin/bash
# Deploy PSEO images to CF Pages
# Run after batch generation completes

set -e

echo "=== PSEO Image Deployment ==="
echo "Counting images..."

TOTAL=$(find /root/projects/tattoo-tool/frontend/public/images/ideas -name "*.webp" | wc -l)
echo "Total images: $TOTAL"

if [ "$TOTAL" -lt 100 ]; then
  echo "Warning: Less than 100 images. Continue? (y/n)"
  read -r confirm
  if [ "$confirm" != "y" ]; then
    exit 1
  fi
fi

echo "Building frontend..."
cd /root/projects/tattoo-tool/frontend
npm run build

echo "Deploying to CF Pages..."
export CLOUDFLARE_API_TOKEN CF_API_TOKEN CLOUDFLARE_ACCOUNT_ID CF_ACCOUNT_ID
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  source /root/projects/soulvirtues/.env.local
  export CLOUDFLARE_API_TOKEN="$CF_API_TOKEN"
  export CLOUDFLARE_ACCOUNT_ID="$CF_ACCOUNT_ID"
fi

npx wrangler pages deploy out --project-name=inkpreview --commit-dirty=true

echo ""
echo "=== Deployment Complete ==="
echo "Verify at: https://inkpreview.co/tattoo-ideas/geometric"
echo "Submit sitemap: https://search.google.com/search-console/sitemaps"
