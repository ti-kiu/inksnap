#!/bin/bash
# Auto-retry batch generation until complete
cd /root/projects/tattoo-tool/frontend/pseo-generator

while true; do
  TOTAL=$(find ../public/images/ideas -name "*.webp" | wc -l)
  echo "$(date) - Total: $TOTAL/384"
  
  if [ "$TOTAL" -ge 380 ]; then
    echo "Generation complete!"
    break
  fi
  
  echo "Running generation..."
  python3 generate_tattoos.py --count 24 --delay 15
  
  echo "Process ended, checking..."
  sleep 10
done