import { faviconDataUrl } from './faviconServer';

export const privacyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Claude-Code-Router</title>
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
            background: #f8f9fa;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            padding: 40px;
        }

        h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 2.5em;
            font-weight: 300;
        }

        .last-updated {
            color: #6c757d;
            margin-bottom: 30px;
            font-size: 0.9em;
        }

        h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.4em;
        }

        h3 {
            color: #34495e;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        p, li {
            margin-bottom: 10px;
            color: #555;
        }

        ul {
            padding-left: 20px;
        }

        .highlight {
            background: #e8f5e8;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }

        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }

        .contact {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }

        .nav {
            text-align: center;
            margin-bottom: 30px;
        }

        .nav a {
            color: #3498db;
            text-decoration: none;
            margin: 0 15px;
            padding: 5px 10px;
            border-radius: 4px;
            transition: background 0.3s;
        }

        .nav a:hover {
            background: #e3f2fd;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
            font-size: 0.9em;
        }

        .data-flow {
            background: #f1f8ff;
            border: 1px solid #c8e1ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav">
            <a href="/">Home</a>
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
        </div>

        <h1>Privacy Policy</h1>
        <div class="last-updated">Last updated: July 12, 2025</div>

        <div class="highlight">
            <strong>Privacy First:</strong> Claude-Code-Router is designed to be a transparent proxy that does not store your data. However, your requests are processed by third-party API providers with their own privacy policies.
        </div>

        <h2>1. Information We Process</h2>
        
        <h3>1.1 What We Process</h3>
        <ul>
            <li>API requests and responses in transit</li>
            <li>Request metadata (timestamps, response codes) for operation</li>
            <li>Technical information required for API format conversion</li>
        </ul>

        <h3>1.2 What We Do NOT Store</h3>
        <ul>
            <li>Your API keys (these are forwarded directly to third-party providers)</li>
            <li>Your conversation content or prompts</li>
            <li>Personal identifying information</li>
            <li>Request history or logs beyond operational necessity</li>
        </ul>

        <h2>2. Data Flow</h2>
        <div class="data-flow">
            <h3>How Your Data Moves:</h3>
            <ol>
                <li><strong>Your Application</strong> → sends request to Claude-Code-Router</li>
                <li><strong>Claude-Code-Router</strong> → converts format and forwards to API provider (e.g., OpenRouter)</li>
                <li><strong>API Provider</strong> → processes request and returns response</li>
                <li><strong>Claude-Code-Router</strong> → converts response format and returns to you</li>
            </ol>
            <p><em>Claude-Code-Router acts as a pass-through service and does not retain data.</em></p>
        </div>

        <h2>3. Third-Party Services</h2>
        <p>When you use Claude-Code-Router, your data is processed by third-party API providers. These services have their own privacy policies:</p>
        <ul>
            <li><strong>OpenRouter:</strong> <a href="https://openrouter.ai/privacy" target="_blank">Privacy Policy</a></li>
            <li><strong>Anthropic:</strong> <a href="https://www.anthropic.com/privacy" target="_blank">Privacy Policy</a></li>
            <li><strong>Other API Providers:</strong> Review their respective privacy policies</li>
        </ul>

        <div class="warning">
            <strong>Important:</strong> Claude-Code-Router cannot control how third-party API providers handle your data. Please review their privacy policies carefully.
        </div>

        <h2>4. Technical Implementation</h2>
        
        <h3>4.1 Cloudflare Workers</h3>
        <p>Claude-Code-Router runs on Cloudflare Workers, which may temporarily process requests in memory during execution. Cloudflare's privacy practices apply to the infrastructure layer.</p>

        <h3>4.2 No Persistent Storage</h3>
        <p>Claude-Code-Router does not use databases or persistent storage for user data. All processing happens in real-time during request handling.</p>

        <h3>4.3 Logging</h3>
        <p>Minimal operational logs may be kept temporarily for:</p>
        <ul>
            <li>Error debugging and service improvement</li>
            <li>Performance monitoring</li>
            <li>Security and abuse prevention</li>
        </ul>
        <p>These logs do not contain your API keys or conversation content.</p>

        <h2>5. Your Rights and Choices</h2>
        
        <h3>5.1 Self-Hosting</h3>
        <p>For maximum privacy control, you can deploy Claude-Code-Router yourself:</p>
        <ul>
            <li>Full control over your data processing</li>
            <li>No shared infrastructure</li>
            <li>Complete transparency through open-source code</li>
        </ul>

        <h3>5.2 API Key Security</h3>
        <p>Best practices for protecting your privacy:</p>
        <ul>
            <li>Use API keys with minimal necessary permissions</li>
            <li>Regularly rotate your API keys</li>
            <li>Monitor API usage through provider dashboards</li>
        </ul>

        <h2>6. Data Security</h2>
        
        <h3>6.1 In Transit</h3>
        <ul>
            <li>All communications use HTTPS encryption</li>
            <li>API keys are transmitted securely</li>
            <li>No data is cached or stored during transit</li>
        </ul>

        <h3>6.2 Service Security</h3>
        <ul>
            <li>Regular security updates to dependencies</li>
            <li>Minimal attack surface through simple proxy design</li>
            <li>No user authentication or session management</li>
        </ul>

        <h2>7. International Data Transfers</h2>
        <p>Claude-Code-Router may process data in various geographic locations through Cloudflare's global network. Third-party API providers may also process data internationally according to their own policies.</p>

        <h2>8. Children's Privacy</h2>
        <p>Claude-Code-Router is not intended for use by children under 13 years of age. We do not knowingly collect or process information from children.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this privacy policy periodically. Material changes will be reflected by updating the "Last updated" date. Your continued use of the service constitutes acceptance of any changes.</p>

        <h2>10. Compliance and Transparency</h2>
        <p>Claude-Code-Router is designed with privacy-by-design principles:</p>
        <ul>
            <li>Minimize data processing</li>
            <li>Open-source transparency</li>
            <li>No unnecessary data collection</li>
            <li>User control through self-hosting options</li>
        </ul>

        <div class="contact">
            <h3>Contact Information</h3>
            <p>For privacy-related questions or concerns:</p>
            <ul>
                <li>GitHub Issues: <a href="https://github.com/istarwyh/claude-code-router/issues" target="_blank">Report privacy concerns</a></li>
                <li>General inquiries: Through GitHub repository</li>
            </ul>
            <p><strong>Data Subject Requests:</strong> Since Claude-Code-Router does not store personal data, most data subject requests should be directed to the relevant third-party API providers.</p>
        </div>

        <div class="footer">
            <p>Claude-Code-Router is an independent, open-source project.<br>
            Not affiliated with Anthropic, OpenAI, or OpenRouter.</p>
        </div>
    </div>
</body>
</html>`;