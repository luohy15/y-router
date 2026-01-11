const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_PATH = path.join(os.homedir(), '.claude', 'settings.json');
const BACKUP_PATH = path.join(os.homedir(), '.claude', 'settings.json.backup');

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`❌ Config file not found at ${CONFIG_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function patchConfig(modelName) {
  console.log('🔧 Patching Claude Code configuration...');
  
  // 1. Backup existing config
  if (fs.existsSync(CONFIG_PATH)) {
    if (!fs.existsSync(BACKUP_PATH)) {
      fs.copyFileSync(CONFIG_PATH, BACKUP_PATH);
      console.log('📦 Created backup at', BACKUP_PATH);
    } else {
      console.log('ℹ️  Backup already exists. Skipping backup to preserve original state.');
    }
  }

  const config = loadConfig();
  
  // 2. Inject Router Settings
  config.anthropicBaseUrl = 'http://localhost:8787';
  
  // 3. Inject Model Override (if provided)
  if (modelName) {
    console.log(`🎭 Injecting model override: ${modelName}`);
    if (!config.env) config.env = {};
    
    // Update relevant model keys to ensure UI reflects the change
    config.env.ANTHROPIC_MODEL = modelName;
    config.env.ANTHROPIC_SMALL_FAST_MODEL = modelName;
    
    // Also update defaults to be safe/consistent
    config.env.ANTHROPIC_DEFAULT_SONNET_MODEL = modelName;
    config.env.ANTHROPIC_DEFAULT_OPUS_MODEL = modelName;
    config.env.ANTHROPIC_DEFAULT_HAIKU_MODEL = modelName;
  }
  
  saveConfig(config);
  console.log('✅ Configuration patched to use local router.');
}

function restoreConfig() {
  console.log('Restoring Claude Code configuration...');
  
  if (fs.existsSync(BACKUP_PATH)) {
    fs.copyFileSync(BACKUP_PATH, CONFIG_PATH);
    fs.unlinkSync(BACKUP_PATH);
    console.log('✅ Configuration restored from backup.');
  } else {
    console.log('⚠️  No backup found. Skipping restore.');
  }
}

const command = process.argv[2];
const modelArg = process.argv[3];

if (command === 'patch') {
  patchConfig(modelArg);
} else if (command === 'restore') {
  restoreConfig();
} else {
  console.log('Usage: node manage-config.js [patch <model>] | [restore]');
}
