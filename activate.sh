#!/bin/bash

# This script should be sourced: source ./activate.sh

# 1. Start the router if not already running
if [ ! -f router.pid ]; then
    echo "🚀 Starting router..."
    nohup npm run dev > router.log 2>&1 &
    echo $! > router.pid
    echo "✅ Router started (PID: $(cat router.pid))"
else
    echo "ℹ️  Router is already running (PID: $(cat router.pid))"
fi

# 2. Read configuration from .dev.vars
if [ -f .dev.vars ]; then
    # Extract MODEL_OVERRIDE if it exists
    # We use grep and sed to parse the simple KEY="VALUE" format
    OVERRIDE_MODEL=$(grep "^MODEL_OVERRIDE=" .dev.vars | sed -E 's/MODEL_OVERRIDE="(.*)"/\1/')
fi

# 3. Set Environment Variables
export ANTHROPIC_BASE_URL="http://localhost:8787"
echo "🔗 Set ANTHROPIC_BASE_URL to http://localhost:8787"

if [ -n "$OVERRIDE_MODEL" ]; then
    export ANTHROPIC_MODEL="$OVERRIDE_MODEL"
    echo "🎭 Set ANTHROPIC_MODEL to $OVERRIDE_MODEL (from .dev.vars)"
fi

# 4. Define a deactivate function
deactivate_router() {
    # Stop the router
    if [ -f router.pid ]; then
        PID=$(cat router.pid)
        if ps -p $PID > /dev/null; then
            kill $PID
            echo "🛑 Router stopped (PID: $PID)"
        fi
        rm router.pid
    fi

    # Unset variables
    unset ANTHROPIC_BASE_URL
    unset ANTHROPIC_MODEL
    
    # Remove the function itself
    unset -f deactivate_router
    
    echo "🔙 Environment restored to stock."
}

echo ""
echo "🌟 Router environment activated!"
echo "   Run 'claude' to use the proxied model."
echo "   Run 'deactivate_router' to stop the router and restore settings."
