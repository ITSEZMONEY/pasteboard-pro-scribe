## 2025-02-25 - Insecure Cookie Configuration
**Vulnerability:** The cookie used to store the sidebar state (`SIDEBAR_COOKIE_NAME`) was configured without `SameSite` and `Secure` attributes, which makes it vulnerable to Cross-Site Request Forgery (CSRF) and interception over unencrypted connections.
**Learning:** Even non-sensitive UI state cookies should follow security best practices. By default, cookies might be sent in cross-site requests or over HTTP, which slightly increases the attack surface.
**Prevention:** Always append `; SameSite=Lax; Secure` to cookies created via `document.cookie`. This restricts the cookie to first-party contexts and ensures it is only transmitted over HTTPS connections (or localhost).
