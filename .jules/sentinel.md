## 2025-02-25 - Exposed API Key in Frontend
**Vulnerability:** A third-party API key (`VITE_CLAUDE_API_KEY`) was directly referenced in the client-side code (`src/api/claude.ts`) and sent via an HTTP POST request from the browser.
**Learning:** Prefixing an environment variable with `VITE_` statically embeds it into the compiled frontend JavaScript bundle, meaning any user can easily view and extract the key by inspecting the network tab or the source code.
**Prevention:** Never call external paid APIs directly from a frontend application if they require secret API keys. Always route such requests through a backend proxy server that securely stores the API keys and applies necessary rate-limiting and authorization checks.
