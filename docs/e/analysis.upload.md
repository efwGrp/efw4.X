## 💾 Summary of Efw Framework File Upload Processing

The file upload process in the Efw framework is achieved through the cooperation of multiple components, spanning from **client-side request construction** to **server-side rigorous security checks and persistence**. This process is routed through a dedicated servlet (`uploadServlet`), distinct from regular event processing.

---

### 1. Client-Side Role: `efw.client.js`

`efw.client.js` handles dedicated file upload processing, separate from normal event execution (`fire`).

| Role | Description |
| :--- | :--- |
| **Request Preparation** | Functions that trigger file upload, such as `Efw.prototype.upload`, are executed. This process constructs a **`multipart/form-data`** request containing the file data. |
| **Parameter Addition** | In addition to the file body, necessary metadata for server-side processing (e.g., `cmd`, `id`, `target`, `home`, `isAbs`, and elFinder path arrays `upload_path[]`) is attached as form data. |
| **Destination** | The constructed request is sent directly to **`/uploadServlet`**, which specializes in binary data processing, instead of the general `efwServlet`. |

---

### 2. Server-Side Role: Acceptance & Security Layer (`uploadServlet.java`)

`uploadServlet.java` serves as the dedicated gateway for receiving file data and manages security and I/O.

#### 🛡️ Rigorous Security Checks (Java)

For file upload, a high-risk operation, the following security checks are performed on the Java side **before request parsing**:

1.  **Login Check**: Verifies the session's `loginKey` and rejects uploads from non-logged-in users.
2.  **Authorization Check**: Based on the user's authorization settings (`authKey`), accepts uploads only from users who possess the **permission to upload** (`uploadable="true"`).
3.  **Path Risk Check**: Inspects the upload path and filename for **`..`** (path traversal) and invalid directory characters (`\`, `/`) to eliminate risks such as directory traversal.

#### ⚙️ File I/O and Management

* **Temporary Storage**: The received file data is read, risk-checked against the filename, and then safely saved on the server as a **temporary file** (`efw#####.tmp`).
* **Management Registration**: **`FileManager.keepUploadFile`** is called to register the uploaded filename and temporary file path under the framework's management, enabling manipulation from JavaScript.
* **Processing Delegation**: For elFinder integration, **`ScriptManager.callFunction("elfinder_upload", ...)`** is called after I/O is complete, delegating the persistence business logic to JavaScript.

---

### 3. Server-Side Role: Persistence & Logic Layer (JS)

This layer handles moving the temporarily saved files to a permanent location and cleaning up files associated with event processing.

#### A. Persistence via elFinder Integration (`elfinder_upload.js`)

This function, called by `uploadServlet`, is responsible for the final file upload logic.

* **Final Risk Check**: `elfinder_checkRisk` is executed again on the JavaScript side, providing a second layer of security.
* **Target Decoding**: Decodes the Base64-encoded target path (specific to elFinder) to identify the destination folder (`targetFolder`).
* **Execution of Persistence**: **`file.saveUploadFiles(targetFolder)`** is called, which moves (or copies) the temporary file managed by `FileManager` to the specified permanent folder.

#### B. Post-Event Processing Cleanup (`efw.js` / `efw.server.js`)

When file upload accompanies the regular event processing flow, the files are managed by `FileManager`.

* **Automatic Deletion**: **`Packages.efw.file.FileManager.removeUploadFiles()`** is called within the `finally` block of `efw.js`'s `doPost`.
* **Purpose**: This ensures that temporary files which were not persisted during the event processing (or explicitly moved by `elfinder_upload`, etc.) are **reliably deleted from the server upon request completion**, preventing disk space waste and security risks.

---

### 📊 Division of Roles in File Upload Processing

| Component | Execution Environment | Primary Role |
| :--- | :--- | :--- |
| **`efw.client.js`** | Client (Browser) | Request construction (`multipart/form-data`), sending to `/uploadServlet`. |
| **`uploadServlet.java`** | Server (Java) | **Security Barrier** (login, authorization, path checks), I/O control, **temporary file storage**. |
| **`elfinder_upload.js`** | Server (JavaScript) | Target path decoding, **moving temporary files to the permanent folder**. |
| **`efw.js` / `FileManager`**| Server (JS/Java) | **Automatic deletion of temporary files** after request completion (cleanup). |
