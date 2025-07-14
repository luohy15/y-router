import { faviconDataUrl } from './faviconServer';

export const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude-Code-Router - Universal Claude API Proxy</title>
    <link rel="shortcut icon" type="image/svg+xml" href="${faviconDataUrl}">
    <style>
        :root {
            /* Design Tokens - Colors */
            --color-primary: #2563eb;
            --color-primary-dark: #1d4ed8;
            --color-primary-light: #3b82f6;
            --color-secondary: #7c3aed;
            --color-accent: #06b6d4;
            --color-success: #10b981;
            --color-warning: #f59e0b;
            --color-error: #ef4444;
            
            /* Text Colors */
            --color-text-primary: #0f172a;
            --color-text-secondary: #475569;
            --color-text-muted: #64748b;
            --color-text-inverse: #ffffff;
            
            /* Background Colors */
            --color-bg-primary: #ffffff;
            --color-bg-secondary: #f8fafc;
            --color-bg-tertiary: #f1f5f9;
            --color-bg-accent: #eff6ff;
            
            /* Border Colors */
            --color-border-light: #e2e8f0;
            --color-border-medium: #cbd5e1;
            --color-border-dark: #94a3b8;
            
            /* Typography */
            --font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            --font-family-mono: 'JetBrains Mono', 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
            
            /* Font Sizes */
            --font-size-xs: 0.75rem;
            --font-size-sm: 0.875rem;
            --font-size-base: 1rem;
            --font-size-lg: 1.125rem;
            --font-size-xl: 1.25rem;
            --font-size-2xl: 1.5rem;
            --font-size-3xl: 1.875rem;
            --font-size-4xl: 2.25rem;
            
            /* Spacing */
            --space-1: 0.25rem;
            --space-2: 0.5rem;
            --space-3: 0.75rem;
            --space-4: 1rem;
            --space-5: 1.25rem;
            --space-6: 1.5rem;
            --space-8: 2rem;
            --space-10: 2.5rem;
            --space-12: 3rem;
            --space-16: 4rem;
            --space-20: 5rem;
            
            /* Border Radius */
            --radius-sm: 0.25rem;
            --radius-md: 0.375rem;
            --radius-lg: 0.5rem;
            --radius-xl: 0.75rem;
            --radius-2xl: 1rem;
            --radius-3xl: 1.5rem;
            
            /* Shadows */
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            
            /* Transitions */
            --transition-fast: 0.15s ease-out;
            --transition-normal: 0.2s ease-out;
            --transition-slow: 0.3s ease-out;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-family-primary);
            line-height: 1.6;
            color: var(--color-text-primary);
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            min-height: 100vh;
            padding: var(--space-4);
            overflow-x: hidden;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: var(--color-bg-primary);
            border-radius: var(--radius-3xl);
            box-shadow: var(--shadow-xl);
            overflow: hidden;
            position: relative;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            color: var(--color-text-inverse);
            text-align: center;
            padding: var(--space-16) var(--space-6);
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
            opacity: 0.5;
        }

        .hero-content {
            position: relative;
            z-index: 1;
        }

        .hero h1 {
            font-size: var(--font-size-4xl);
            font-weight: 700;
            margin-bottom: var(--space-4);
            background: linear-gradient(45deg, #ffffff, #e0f2fe);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero .subtitle {
            font-size: var(--font-size-xl);
            opacity: 0.9;
            margin-bottom: var(--space-6);
            font-weight: 300;
        }

        .hero .badges {
            display: flex;
            justify-content: center;
            gap: var(--space-3);
            flex-wrap: wrap;
            margin-bottom: var(--space-8);
        }

        .badge {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: var(--color-text-inverse);
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-xl);
            font-size: var(--font-size-sm);
            font-weight: 500;
            transition: var(--transition-normal);
            cursor: pointer;
            text-decoration: none;
        }

        .badge:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
        }

        .badge.active {
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Provider Grid */
        .providers {
            padding: var(--space-12) var(--space-6);
            background: var(--color-bg-secondary);
        }

        .providers h2 {
            text-align: center;
            font-size: var(--font-size-3xl);
            color: var(--color-text-primary);
            margin-bottom: var(--space-8);
            font-weight: 600;
        }

        .provider-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--space-6);
            margin-bottom: var(--space-12);
        }

        .provider-card {
            background: var(--color-bg-primary);
            border: 1px solid var(--color-border-light);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            transition: var(--transition-normal);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .provider-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
            opacity: 0;
            transition: var(--transition-normal);
        }

        .provider-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--color-primary-light);
        }

        .provider-card:hover::before {
            opacity: 1;
        }

        .provider-card h3 {
            font-size: var(--font-size-xl);
            color: var(--color-text-primary);
            margin-bottom: var(--space-3);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }

        .provider-icon {
            width: 24px;
            height: 24px;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: var(--color-text-inverse);
            font-size: var(--font-size-sm);
        }

        .provider-icon.deepseek { background: linear-gradient(45deg, #1a365d, #2d5aa0); }
        .provider-icon.openai { background: linear-gradient(45deg, #10a37f, #16ba9a); }
        .provider-icon.kimi { background: linear-gradient(45deg, #7c3aed, #a855f7); }
        .provider-icon.openrouter { background: linear-gradient(45deg, #f59e0b, #f97316); }
        .provider-icon.anyrouter { background: linear-gradient(45deg, #ef4444, #dc2626); }
        .provider-icon.siliconflow { background: linear-gradient(45deg, #64748b, #94a3b8); }

        .provider-card p {
            color: var(--color-text-secondary);
            margin-bottom: var(--space-4);
            font-size: var(--font-size-sm);
            line-height: 1.5;
        }

        .provider-example {
            background: var(--color-bg-tertiary);
            padding: var(--space-3);
            border-radius: var(--radius-lg);
            font-family: var(--font-family-mono);
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
            border-left: 3px solid var(--color-primary);
            word-break: break-all;
            overflow-wrap: break-word;
            margin-bottom: var(--space-4);
        }

        .provider-links {
            text-align: center;
            display: flex;
            gap: var(--space-2);
            justify-content: center;
            flex-wrap: wrap;
        }

        .provider-links a {
            color: var(--color-primary);
            text-decoration: none;
            font-weight: 500;
            font-size: var(--font-size-sm);
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-lg);
            background: var(--color-bg-accent);
            border: 1px solid var(--color-primary-light);
            transition: var(--transition-normal);
            display: inline-block;
            flex: 1;
            min-width: 120px;
        }

        .provider-links a:hover {
            background: var(--color-primary);
            color: var(--color-text-inverse);
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }

        /* Provider badges */
        .provider-badge {
            position: absolute;
            top: var(--space-3);
            right: var(--space-3);
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-lg);
            font-size: var(--font-size-xs);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .provider-badge.shared-ready {
            background: linear-gradient(135deg, var(--color-success), #059669);
            color: var(--color-text-inverse);
        }

        .provider-badge.deploy-required {
            background: linear-gradient(135deg, var(--color-warning), #f97316);
            color: var(--color-text-inverse);
        }

        /* Register bonus for promotional offers */
        .register-bonus {
            position: absolute;
            top: var(--space-3);
            left: var(--space-3);
            padding: var(--space-1) var(--space-2);
            background: linear-gradient(135deg, var(--color-success), #059669);
            color: var(--color-text-inverse);
            border-radius: var(--radius-lg);
            font-size: var(--font-size-xs);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: var(--shadow-sm);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* Setup Steps */
        .setup {
            padding: var(--space-12) var(--space-6);
        }

        .setup h2 {
            text-align: center;
            font-size: var(--font-size-3xl);
            color: var(--color-text-primary);
            margin-bottom: var(--space-8);
            font-weight: 600;
        }

        .steps {
            display: grid;
            gap: var(--space-8);
        }

        .step {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: var(--space-6);
            align-items: start;
        }

        .step-number {
            background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
            color: var(--color-text-inverse);
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: var(--font-size-lg);
            box-shadow: var(--shadow-md);
            flex-shrink: 0;
        }

        .step-content h3 {
            font-size: var(--font-size-xl);
            color: var(--color-text-primary);
            margin-bottom: var(--space-3);
            font-weight: 600;
        }

        .step-content p {
            color: var(--color-text-secondary);
            margin-bottom: var(--space-4);
            line-height: 1.6;
        }

        /* Configuration tabs */
        .config-tabs {
            margin: var(--space-4) 0;
        }

        .config-tab {
            margin-bottom: var(--space-4);
            padding: var(--space-4);
            background: var(--color-bg-tertiary);
            border-radius: var(--radius-lg);
            border-left: 4px solid var(--color-primary);
        }

        .config-tab strong {
            color: var(--color-text-primary);
            display: block;
            margin-bottom: var(--space-2);
            font-size: var(--font-size-base);
        }

        .code-block {
            background: var(--color-text-primary);
            color: var(--color-text-inverse);
            padding: var(--space-4);
            border-radius: var(--radius-lg);
            font-family: var(--font-family-mono);
            margin: var(--space-4) 0;
            overflow-x: auto;
            font-size: var(--font-size-sm);
            position: relative;
            border: 1px solid var(--color-border-medium);
        }

        .code-block::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
            pointer-events: none;
        }

        .note {
            background: var(--color-bg-accent);
            border: 1px solid var(--color-primary-light);
            color: var(--color-primary-dark);
            padding: var(--space-4);
            border-radius: var(--radius-lg);
            margin: var(--space-4) 0;
            font-size: var(--font-size-sm);
            display: flex;
            align-items: flex-start;
            gap: var(--space-3);
        }

        .note::before {
            content: 'ℹ️';
            flex-shrink: 0;
        }

        /* Important Notice */
        .important-notice {
            background: linear-gradient(135deg, #fef3cd, #fde68a);
            border: 2px solid var(--color-warning);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            margin-bottom: var(--space-10);
            box-shadow: var(--shadow-lg);
        }

        .important-notice h3 {
            color: #92400e;
            margin-bottom: var(--space-4);
            font-size: var(--font-size-xl);
            font-weight: 600;
            text-align: center;
        }

        .notice-content {
            display: grid;
            gap: var(--space-4);
        }

        .notice-item {
            background: rgba(255, 255, 255, 0.8);
            padding: var(--space-4);
            border-radius: var(--radius-lg);
            border-left: 4px solid var(--color-warning);
        }

        .notice-item strong {
            color: #92400e;
            display: block;
            margin-bottom: var(--space-2);
            font-size: var(--font-size-base);
        }

        .notice-item p {
            margin: 0;
            color: var(--color-text-secondary);
            line-height: 1.5;
        }

        @media (min-width: 768px) {
            .notice-content {
                grid-template-columns: 1fr 1fr;
            }
        }
        .security-notice {
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
            border: 1px solid var(--color-primary-light);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            margin-bottom: var(--space-8);
        }

        .security-notice h3 {
            color: var(--color-primary-dark);
            margin-bottom: var(--space-4);
            font-size: var(--font-size-lg);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }

        .security-notice ul {
            margin: 0;
            padding-left: var(--space-5);
        }

        .security-notice li {
            color: var(--color-text-secondary);
            margin-bottom: var(--space-3);
            line-height: 1.6;
        }

        .security-notice strong {
            color: var(--color-primary-dark);
        }

        /* Deployment Reason */
        .deployment-reason {
            margin-bottom: var(--space-10);
        }

        .deployment-reason h3 {
            text-align: center;
            color: var(--color-text-primary);
            margin-bottom: var(--space-6);
            font-size: var(--font-size-2xl);
            font-weight: 600;
        }

        .reason-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--space-6);
        }

        .reason-item {
            background: var(--color-bg-primary);
            border: 1px solid var(--color-border-light);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            text-align: center;
            transition: var(--transition-normal);
        }

        .reason-item:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--color-primary-light);
        }

        .reason-item h4 {
            color: var(--color-text-primary);
            margin-bottom: var(--space-3);
            font-size: var(--font-size-lg);
            font-weight: 600;
        }

        .reason-item p {
            color: var(--color-text-secondary);
            line-height: 1.6;
            margin: 0;
        }
        .deployment {
            background: var(--color-bg-secondary);
            padding: var(--space-12) var(--space-6);
        }

        .deployment h2 {
            text-align: center;
            font-size: var(--font-size-3xl);
            color: var(--color-text-primary);
            margin-bottom: var(--space-4);
            font-weight: 600;
        }

        .deployment-subtitle {
            text-align: center;
            color: var(--color-text-secondary);
            margin-bottom: var(--space-10);
            font-size: var(--font-size-lg);
        }

        .deployment-steps {
            max-width: 600px;
            margin: 0 auto;
        }

        .deployment-step {
            background: var(--color-bg-primary);
            border: 1px solid var(--color-border-light);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            margin-bottom: var(--space-6);
        }

        .deployment-step h3 {
            color: var(--color-text-primary);
            margin-bottom: var(--space-3);
            font-weight: 600;
        }

        /* Success Banner */
        .success {
            background: linear-gradient(135deg, var(--color-success), #059669);
            color: var(--color-text-inverse);
            padding: var(--space-10);
            text-align: center;
            margin: var(--space-8) 0;
            border-radius: var(--radius-xl);
            position: relative;
            overflow: hidden;
        }

        .success::before {
            content: '🎉';
            position: absolute;
            top: var(--space-4);
            right: var(--space-4);
            font-size: var(--font-size-3xl);
            opacity: 0.3;
        }

        .success h2 {
            font-size: var(--font-size-2xl);
            margin-bottom: var(--space-3);
            font-weight: 600;
        }

        /* Footer */
        .footer {
            background: var(--color-text-primary);
            color: var(--color-text-inverse);
            padding: var(--space-8) var(--space-6);
            text-align: center;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: var(--space-6);
            flex-wrap: wrap;
            margin-bottom: var(--space-4);
        }

        .footer-links a {
            color: var(--color-text-inverse);
            text-decoration: none;
            font-size: var(--font-size-sm);
            opacity: 0.8;
            transition: var(--transition-normal);
        }

        .footer-links a:hover {
            opacity: 1;
            color: var(--color-primary-light);
        }

        .footer-copyright {
            opacity: 0.6;
            font-size: var(--font-size-xs);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .hero {
                padding: var(--space-12) var(--space-4);
            }
            
            .hero h1 {
                font-size: var(--font-size-3xl);
            }
            
            .providers, .setup, .deployment {
                padding: var(--space-8) var(--space-4);
            }
            
            .provider-grid {
                grid-template-columns: 1fr;
            }
            
            .step {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .step-number {
                margin: 0 auto var(--space-4) auto;
            }
        }

        /* Animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .provider-card, .step, .deployment-step {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        .provider-card:nth-child(2) { animation-delay: 0.1s; }
        .provider-card:nth-child(3) { animation-delay: 0.2s; }
        .provider-card:nth-child(4) { animation-delay: 0.3s; }
        .provider-card:nth-child(5) { animation-delay: 0.4s; }

        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }

        /* Highlight effect for targeted provider cards */
        .provider-card:target {
            animation: highlight 2s ease-out;
        }

        @keyframes highlight {
            0% {
                background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent));
                color: var(--color-text-inverse);
                transform: scale(1.05);
                box-shadow: var(--shadow-xl);
            }
            100% {
                background: var(--color-bg-primary);
                color: var(--color-text-primary);
                transform: scale(1);
                box-shadow: var(--shadow-lg);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Hero Section -->
        <div class="hero">
            <div class="hero-content">
                <h1>Claude-Code-Router</h1>
                <p class="subtitle">Universal Claude API Proxy for Multiple Providers</p>
                <div class="badges">
                    <a href="#deepseek" class="badge" data-provider="deepseek">DeepSeek</a>
                    <a href="#openai" class="badge" data-provider="openai">OpenAI</a>
                    <a href="#kimi" class="badge" data-provider="kimi">Kimi</a>
                    <a href="#openrouter" class="badge" data-provider="openrouter">OpenRouter</a>
                    <a href="#anyrouter" class="badge" data-provider="anyrouter">AnyRouter</a>
                    <a href="#siliconflow" class="badge" data-provider="siliconflow">SiliconFlow</a>
                    <span class="badge">Cloudflare Workers</span>
                </div>
            </div>
        </div>

        <!-- Supported Providers -->
        <div class="providers">
            <h2>🚀 Supported AI Providers</h2>
            <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--space-8); font-size: var(--font-size-lg);">Click any provider above to learn more, or scroll to see all options</p>
            <div class="provider-grid">
                <div class="provider-card" id="deepseek">
                    <div class="provider-badge deploy-required">Deploy Required</div>
                    <h3><span class="provider-icon deepseek">DS</span>DeepSeek</h3>
                    <p>High-performance reasoning models with excellent cost efficiency. Perfect for complex coding tasks.</p>
                    <div class="provider-example">DEEPSEEK_BASE_URL=https://api.deepseek.com</div>
                    <div class="provider-links">
                        <a href="https://platform.deepseek.com" target="_blank">Get API Key →</a>
                    </div>
                </div>
                
                <div class="provider-card" id="openai">
                    <div class="provider-badge deploy-required">Deploy Required</div>
                    <h3><span class="provider-icon openai">AI</span>OpenAI</h3>
                    <p>Industry-leading GPT models including GPT-4o and GPT-4o-mini for diverse AI applications.</p>
                    <div class="provider-example">OPENAI_BASE_URL=https://api.openai.com/v1</div>
                    <div class="provider-links">
                        <a href="https://platform.openai.com" target="_blank">Get API Key →</a>
                    </div>
                </div>
                
                <div class="provider-card" id="kimi">
                    <div class="provider-badge deploy-required">Deploy Required</div>
                    <h3><span class="provider-icon kimi">KM</span>Kimi (Moonshot AI)</h3>
                    <p>Advanced Chinese AI models with strong multilingual capabilities and long context support.</p>
                    <div class="provider-example">KIMI_BASE_URL=https://api.moonshot.cn/v1</div>
                    <div class="provider-links">
                        <a href="https://platform.moonshot.cn" target="_blank">Get API Key →</a>
                    </div>
                </div>
                
                <div class="provider-card" id="openrouter">
                    <div class="provider-badge shared-ready">Shared Ready</div>
                    <h3><span class="provider-icon openrouter">OR</span>OpenRouter</h3>
                    <p>Access to multiple AI models through a single API, including Claude, GPT, and open-source models.</p>
                    <div class="provider-example">OPENROUTER_BASE_URL=https://openrouter.ai/api/v1</div>
                    <div class="provider-links">
                        <a href="https://openrouter.ai" target="_blank">Get API Key →</a>
                    </div>
                </div>
                
                <div class="provider-card" id="anyrouter" onclick="window.open('https://anyrouter.top/register?aff=4Ly0', '_blank')" style="cursor: pointer;">
                    <div class="provider-badge shared-ready">Shared Ready</div>
                    <div class="register-bonus">🎁 $100 Free Credits</div>
                    <h3><span class="provider-icon anyrouter">AR</span>AnyRouter</h3>
                    <p><strong>Model proxy service</strong> - Provides access to Claude and other models. Click to register and get $100 free credits!</p>
                    <div class="provider-example">ANTHROPIC_BASE_URL=https://cc.xiaohui.cool</div>
                    <div class="provider-links">
                        <a href="https://anyrouter.top/console/token?aff=4Ly0" target="_blank" onclick="event.stopPropagation();">Get API Key →</a>
                    </div>
                </div>
                
                <div class="provider-card" id="siliconflow">
                    <div class="provider-badge deploy-required">Deploy Required</div>
                    <h3><span class="provider-icon siliconflow">SF</span>SiliconFlow</h3>
                    <p>Chinese AI infrastructure platform providing access to various domestic and international models.</p>
                    <div class="provider-example">SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1</div>
                    <div class="provider-links">
                        <a href="https://siliconflow.cn" target="_blank">Get API Key →</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Setup Instructions -->
        <div class="setup">
            <h2>Quick Setup Guide</h2>
            
            <div class="important-notice">
                <h3>⚠️ Important: Provider Access Notice</h3>
                <div class="notice-content">
                    <div class="notice-item">
                        <strong>🌐 Shared Instance (cc.xiaohui.cool):</strong>
                        <p>Supports <strong>OpenRouter</strong> and <strong>AnyRouter</strong> by default. You can use them immediately with your API key.</p>
                    </div>
                    <div class="notice-item">
                        <strong>🚀 Self-Deployed Instance:</strong>
                        <p>Required for <strong>DeepSeek, OpenAI, Kimi, SiliconFlow</strong> and other providers. You must deploy your own instance to configure these providers.</p>
                    </div>
                </div>
            </div>
            
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Install Claude Code</h3>
                        <p>Get the official Claude Code CLI tool from Anthropic.</p>
                        <div class="code-block">npm install -g @anthropic-ai/claude-code</div>
                        <div class="note">Or download from <a href="https://claude.ai/code" target="_blank" style="color: var(--color-primary-dark); text-decoration: none;">claude.ai/code</a></div>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Choose Your Provider & Get API Key</h3>
                        <p>Sign up with any supported provider and obtain your API key:</p>
                        <ul style="margin: var(--space-4) 0; padding-left: var(--space-5); color: var(--color-text-secondary);">
                            <li><strong>DeepSeek:</strong> <a href="https://platform.deepseek.com" target="_blank" style="color: var(--color-primary);">platform.deepseek.com</a></li>
                            <li><strong>OpenAI:</strong> <a href="https://platform.openai.com" target="_blank" style="color: var(--color-primary);">platform.openai.com</a></li>
                            <li><strong>Kimi:</strong> <a href="https://platform.moonshot.cn" target="_blank" style="color: var(--color-primary);">platform.moonshot.cn</a></li>
                            <li><strong>OpenRouter:</strong> <a href="https://openrouter.ai" target="_blank" style="color: var(--color-primary);">openrouter.ai</a></li>
                            <li><strong>SiliconFlow:</strong> <a href="https://siliconflow.cn" target="_blank" style="color: var(--color-primary);">siliconflow.cn</a></li>
                            <li><strong>AnyRouter:</strong> <a href="https://anyrouter.top/register?aff=4Ly0" target="_blank" style="color: var(--color-primary);">anyrouter.top</a> - 🎁 $100 free credits</li>
                        </ul>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Configure Environment</h3>
                        <p>Add these to your shell config (<code>~/.bashrc</code> or <code>~/.zshrc</code>):</p>
                        <div class="config-tabs">
                            <div class="config-tab">
                                <strong>For OpenRouter:</strong>
                                <div class="code-block">export ANTHROPIC_BASE_URL="https://cc.xiaohui.cool"<br>export ANTHROPIC_API_KEY="your-openrouter-api-key"</div>
                            </div>
                            <div class="config-tab">
                                <strong>For AnyRouter:</strong>
                                <div class="code-block">export ANTHROPIC_BASE_URL="https://anyrouter.top"<br>export ANTHROPIC_API_KEY="your-anyrouter-api-key"</div>
                            </div>
                        </div>
                        <p>Then reload your shell:</p>
                        <div class="code-block">source ~/.bashrc  # or source ~/.zshrc</div>
                    </div>
                </div>
            </div>

            <div class="success">
                <h2>🚀 Ready to Code!</h2>
                <p>Run <code style="background: rgba(255,255,255,0.2); padding: var(--space-1) var(--space-2); border-radius: var(--radius-md);">claude</code> in your terminal and enjoy Claude with your preferred AI provider</p>
            </div>
        </div>

        <!-- Self-Deployment -->
        <div class="deployment">
            <h2>🔒 Deploy Your Own Instance</h2>
            <p class="deployment-subtitle">For maximum data security and to access all AI providers beyond OpenRouter</p>
            
            <div class="deployment-reason">
                <h3>🤔 Why Self-Deploy?</h3>
                <div class="reason-grid">
                    <div class="reason-item">
                        <h4>🌐 Access All Providers</h4>
                        <p>Our shared instance only supports OpenRouter. Self-deploy to use DeepSeek, OpenAI, Kimi, SiliconFlow, and more.</p>
                    </div>
                    <div class="reason-item">
                        <h4>🔐 Data Security</h4>
                        <p>Your API keys and requests never pass through third-party servers when you control the infrastructure.</p>
                    </div>
                    <div class="reason-item">
                        <h4>⚙️ Full Control</h4>
                        <p>Configure any provider, custom model mappings, and deployment settings according to your needs.</p>
                    </div>
                    <div class="reason-item">
                        <h4>📊 Zero Logs</h4>
                        <p>No request logging or data retention when you deploy your own instance to Cloudflare Workers.</p>
                    </div>
                </div>
            </div>
            
            <div class="deployment-steps">
                <div class="deployment-step">
                    <h3>1. Clone & Install</h3>
                    <div class="code-block">git clone https://github.com/istarwyh/claude-code-router<br>cd claude-code-router<br>npm install</div>
                </div>

                <div class="deployment-step">
                    <h3>2. Configure Provider (Secure Method)</h3>
                    <p><strong>Recommended:</strong> Use Wrangler secrets for secure configuration:</p>
                    <div class="code-block"># For DeepSeek<br>wrangler secret put DEEPSEEK_BASE_URL<br># Enter: https://api.deepseek.com<br><br># For OpenAI<br>wrangler secret put OPENAI_BASE_URL<br># Enter: https://api.openai.com/v1<br><br># For Kimi (Moonshot AI)<br>wrangler secret put KIMI_BASE_URL<br># Enter: https://api.moonshot.cn/v1<br><br># For AnyRouter<br>wrangler secret put ANYROUTER_BASE_URL<br># Enter: https://api.anyrouter.top/v1<br><br># For SiliconFlow<br>wrangler secret put SILICONFLOW_BASE_URL<br># Enter: https://api.siliconflow.cn/v1<br><br># Or for OpenRouter<br>wrangler secret put OPENROUTER_BASE_URL<br># Enter: https://openrouter.ai/api/v1<br><br># Legacy support (auto-detects provider by URL)<br>wrangler secret put OPENAI_COMPATIBLE_BASE_URL<br># Enter any of the above URLs</div>
                    <div class="note">Using secrets ensures your API endpoints are encrypted and not visible in your code repository.</div>
                </div>

                <div class="deployment-step">
                    <h3>3. Deploy to Cloudflare</h3>
                    <div class="code-block">npm run deploy</div>
                    <div class="note">Your custom domain will be provided after deployment. Update your ANTHROPIC_BASE_URL accordingly.</div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-links">
                <a href="https://github.com/istarwyh/claude-code-router" target="_blank">GitHub</a>
                <a href="https://claude.ai/code" target="_blank">Claude Code</a>
                <a href="https://developers.cloudflare.com/workers/" target="_blank">Cloudflare Workers</a>
                <a href="/terms">Terms</a>
                <a href="/privacy">Privacy</a>
            </div>
            <div class="footer-copyright">
                Made with ❤️ for the Claude Code community
            </div>
        </div>
    </div>
</body>
</html>`;