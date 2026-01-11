import { faviconDataUrl } from './faviconServer';

export const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Open Claude Router (Local)</title>
    <link rel="shortcut icon" type="image/svg+xml" href="${faviconDataUrl}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(45deg, #2c3e50, #3498db);
            color: white;
            text-align: center;
            padding: 40px 20px;
        }

        .header h1 {
            font-size: 2.2em;
            margin-bottom: 10px;
            font-weight: 300;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .content {
            padding: 40px;
        }

        .step {
            margin-bottom: 30px;
            padding: 20px;
            border-left: 4px solid #3498db;
            background: #f8f9fa;
            border-radius: 0 8px 8px 0;
        }

        .step h2 {
            color: #2c3e50;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            font-size: 1.3em;
        }

        .step-number {
            background: #3498db;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-weight: bold;
            font-size: 0.9em;
        }

        .code-block {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', monospace;
            margin: 15px 0;
            overflow-x: auto;
            font-size: 0.9em;
            position: relative;
            white-space: pre;
        }

        .code-block-wrapper {
            position: relative;
        }

        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #3498db;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8em;
            opacity: 0.8;
            transition: opacity 0.2s;
        }

        .copy-button:hover {
            opacity: 1;
            background: #2980b9;
        }

        .copy-button.copied {
            background: #27ae60;
        }

        .note {
            background: #e3f2fd;
            border: 1px solid #bbdefb;
            color: #1565c0;
            padding: 12px;
            border-radius: 6px;
            margin: 10px 0;
            font-size: 0.9em;
        }
        
        .footer-links {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
        }

        .footer-links a {
            color: #6c757d;
            text-decoration: none;
            margin: 0 15px;
            font-size: 0.9em;
        }

        .footer-links a:hover {
            color: #3498db;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Open Claude Router</h1>
            <p>Local Proxy for Claude Code + OpenRouter</p>
        </div>

        <div class="content">
            <div class="step">
                <h2><span class="step-number">1</span>Installation</h2>
                <p>Clone the repository and install dependencies:</p>
                <div class="code-block-wrapper">
                    <div class="code-block">git clone https://github.com/elusznik/open-claude-router.git
cd open-claude-router
npm install</div>
                    <button class="copy-button" onclick="copyToClipboard(this, 'git clone https://github.com/elusznik/open-claude-router.git\\ncd open-claude-router\\nnpm install')">Copy</button>
                </div>
            </div>

            <div class="step">
                <h2><span class="step-number">2</span>Configuration</h2>
                <p>Create a <code>.dev.vars</code> file in the project root:</p>
                <div class="code-block-wrapper">
                    <div class="code-block"># .dev.vars
MODEL_OVERRIDE="x-ai/grok-4.1-fast"
OPENROUTER_API_KEY="sk-or-..."</div>
                    <button class="copy-button" onclick="copyToClipboard(this, 'MODEL_OVERRIDE=&quot;x-ai/grok-4.1-fast&quot;\\nOPENROUTER_API_KEY=&quot;sk-or-...&quot;')">Copy</button>
                </div>
            </div>

            <div class="step">
                <h2><span class="step-number">3</span>Start Router</h2>
                <p>Run the start script to launch the router and automatically configure Claude Code:</p>
                <div class="code-block-wrapper">
                    <div class="code-block">./start-detached.sh</div>
                    <button class="copy-button" onclick="copyToClipboard(this, './start-detached.sh')">Copy</button>
                </div>
                <div class="note">This will backup your settings and point Claude Code to localhost.</div>
            </div>

            <div class="step">
                <h2><span class="step-number">4</span>Stop & Restore</h2>
                <p>When finished, stop the router to restore your original settings:</p>
                <div class="code-block-wrapper">
                    <div class="code-block">./stop-router.sh</div>
                    <button class="copy-button" onclick="copyToClipboard(this, './stop-router.sh')">Copy</button>
                </div>
                <div class="note"><strong>Important:</strong> Always use this script to ensure your config is restored!</div>
            </div>
        </div>

        <div class="footer-links">
            <a href="https://github.com/elusznik/open-claude-router" target="_blank">GitHub</a>
            <a href="https://openrouter.ai" target="_blank">OpenRouter</a>
            <a href="https://claude.ai/code" target="_blank">Claude Code</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
        </div>
    </div>

    <script>
        function copyToClipboard(button, text) {
            navigator.clipboard.writeText(text).then(function() {
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(function() {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
            });
        }
    </script>
</body>
</html>`;