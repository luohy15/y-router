#!/bin/bash

# Read MODEL_OVERRIDE from .dev.vars if it exists
OVERRIDE_MODEL=""
if [ -f .dev.vars ]; then
    OVERRIDE_MODEL=$(grep "^MODEL_OVERRIDE=" .dev.vars | sed -E 's/MODEL_OVERRIDE="(.*)"/\1/')
fi

# Patch Claude Code configuration with optional model override
node manage-config.js patch "$OVERRIDE_MODEL"

nohup npm run dev -- --port 8787 > router.log 2>&1 &
echo $! > router.pid
echo "🚀 Router started in background (PID: $(cat router.pid))"
echo "📝 Logs are being written to router.log"
echo "🌍 Server ready at http://localhost:8787"
