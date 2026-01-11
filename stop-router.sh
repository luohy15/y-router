#!/bin/bash
if [ -f router.pid ]; then
  PID=$(cat router.pid)
  if ps -p $PID > /dev/null; then
    kill $PID
    rm router.pid
    echo "🛑 Router stopped (PID: $PID)"
    
    # Restore Claude Code configuration
    node manage-config.js restore
  else
    echo "⚠️  Router process $PID not found. Removing stale pid file."
    rm router.pid
  fi
else
  echo "⚠️  No router.pid file found. Is the router running?"
fi
