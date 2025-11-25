## 🛡️ Efw Framework Security Mechanism

The analysis integrates the six main server-side components provided (`efwServlet.java`, `efw.server.js`, `uploadServlet.java`, `previewServlet.java`, `downloadServlet.java`, and `efwFilter.java`) to summarize the Efw framework's security.

The Efw framework provides a robust enterprise application environment by incorporating multiple, specific security checks at the layers of **screen access**, **event execution**, and **file I/O**.

---

### 1. Screen Access Control Layer (`efwFilter.java`)

`efwFilter` is the **front-line security gateway** that intercepts all requests for important resources (JSPs, various servlets). 

* **JSP Access Control**: Checks login status and authorization at the Java level for direct access to JSP pages.
    * **Login Check**: If the login key does not exist in the session when accessing a JSP that requires authentication, the user is **forcefully redirected to `loginUrl`**, preventing unauthenticated access.
    * **JSP Authorization Check**: Even after login, if the user's authority pattern (`authPattern`) does not match the access URL pattern (`urlPattern`), the user is **forcefully redirected to `systemErrorUrl`**, preventing navigation to unauthorized screens.
* **Event Endpoint Passthrough**: Endpoints like `/efwServlet` and the file I/O servlets pass through the filter, but without redirection checks, **delegating authentication and authorization to the respective servlet or JS layer**.

---

### 2. Event Execution & Authorization Layer (`efw.server.js`)

The event execution (AJAX request) pipeline is protected by dedicated logic within server-side JavaScript.

* **Login Check (`checkLogin`)**: Detects **session timeout** and instructs the client to display an alert and navigate to `loginUrl`.
* **Authorization Check (`checkAuth`)**: Compares the executing **`eventId`** with the user's authority in the session, preventing the execution of unauthorized functions.
* **Decryption of Encrypted Data**: If `secure:true` is set in the parameters, the server performs Base64 decoding, ensuring data confidentiality during communication.

---

### 3. Data Quality & Validation Layer (`efw.server.js`)

Strict quality checks and sanitization are performed on input data before business logic execution.

* **Server-Side Validation (`checkStyle`)**:
    * **Type Safety**: Based on `format`, data (dates, numbers, etc.) format is validated and **converted to a safe data type** before being passed to the logic layer.
    * **Range/Length Check**: Enforces `min/max` and `max-length`.
    * **Prohibited Character Handling**: Based on settings, dangerous or special characters in the input value are replaced/deleted, **reducing the risk of data injection**.

---

### 4. File I/O Control Layer (Dedicated Servlets)

Because file processing carries high risk, specific security measures are enforced by Java within the dedicated servlets.

#### A. File Upload (`uploadServlet.java`)

**Multi-layered access control and risk mitigation** are performed at the earliest stage of upload.

* **Enforced Upload Privilege**: Even after passing through `efwFilter`, `uploadServlet` only accepts files from users with the **`uploadable=true` privilege**.
* **Directory Traversal Prevention**: The file name and upload path are strictly checked for **`..`** (parent directory traversal) or illegal path characters, preventing unauthorized access to the file system.
* **Temporary File Management**: Files are first saved to a secure temporary area before being passed to the persistence logic (`elfinder_upload.js`).

#### B. File Provision Control (`previewServlet.java`, `downloadServlet.java`)

A mechanism is employed to prevent file path leakage during file retrieval.

* **Path Secrecy via Session**: File paths are passed via the **HTTP session** instead of URL parameters. This significantly reduces the risk of paths being guessed.
* **Immediate Attribute Deletion**: File information (file path, options) is **immediately deleted from the session** after the servlet retrieves it.
* **Resource Restriction (`previewServlet`)**: File size is **limited to 10MB** during preview to prevent Denial-of-Service (DoS) attacks and server load increase.
* **Resource Cleanup (`downloadServlet`)**: Generated temporary ZIP files and optionally configured source files are reliably deleted after the download is complete.

---

### Integrated Security Strategy

The Efw framework's security strategy is based on the following three principles:

1.  **Defense in Depth**: Establishing independent checkpoints at every layer: **screen, event, data, and file I/O**.
2.  **Role Delegation**: Low-risk control is assigned to JavaScript, while **high-risk control (JSP access, file I/O, path checks) is assigned to Java Servlets**.
3.  **Session Usage**: The transfer of highly sensitive information (file paths, login status) is conducted via the highly secure **Session** rather than the URL.
