The provided **`previewServlet.java`** is a dedicated servlet that implements the **file preview functionality on the server** within the Efw framework.

The purpose of this servlet is to enable direct display of files within the browser without forcing the client to download them. Its process focuses heavily on security and file size limitations.

---

## 🖼️ Analysis of `previewServlet.java`: File Preview Processing

### 1. Role and Invocation Method

* **Role**: Reads the file specified in the server-side event processing (JavaScript) from the session, sets the MIME type, and writes it directly to the HTTP response stream. This causes the browser to display the file **inline** (preview).
* **Annotation**: Operates as a dedicated URL endpoint via `@WebServlet(name="previewServlet", urlPatterns={"/previewServlet"})`.
* **HTTP Method**: Processing is handled only by `doGet`. Clients typically send requests to this URL via JavaScript.

### 2. Processing Flow (`doGet`)

#### A. Retrieval of Preview Information and Session Clearing

1.  **Retrieve from Session**: The file path for the preview target (`EFW_PREVIEW_FILE`) and whether that path is absolute (`EFW_PREVIEW_ISABS`) are retrieved from the **`HttpSession`**.
2.  **Immediate Deletion**: After retrieval, the **session attributes are immediately removed** (`sn.removeAttribute`) for security and to prevent double usage. This mitigates the risk of requesting the same file multiple times or unauthorized external access.

#### B. Strict File Checks

The following checks are performed before accessing the file:

1.  **Path Existence Check**: If the session attributes are missing or empty, an error is returned.
2.  **File Existence Check**:
    * A **`File`** object is created by concatenating the file path with `framework.getStorageFolder()` (or using the path as is, if absolute).
    * It checks for **`!fl.exists()||!fl.isFile()`**. If the specified file does not exist or is a directory, an error is returned.
3.  **MIME Type Check**:
    * The MIME type is obtained using **`FileManager.getMimeTypeByFileName(fl.getName())`**.
    * If the MIME type is `"unknown"`, an error is returned as the file is not previewable (rejects file types that the browser may not safely display).
4.  **Size Limit Check**:
    * If the **file size exceeds 10MB ($10 \times 1024 \times 1024$ bytes)**, an error is returned. This is a measure to reduce server memory load and prevent client-side performance degradation from previewing large files.

#### C. File Reading and Response

1.  **Content Type Setting**: The retrieved `mimeType` is set via **`response.setContentType(mimeType)`**. This prompts the browser to attempt **inline (internal) display** rather than a download dialog.
2.  **Stream Writing**: The file contents are read using `FileInputStream` and `BufferedInputStream` and written as binary data directly to the client via **`response.getOutputStream()`**.

### 3. Error Handling (`outputError`)

* The `outputError` method is called when an error occurs, such as a file not found, size exceeding the limit, or un-previewable content.
* It resets the response and displays an error message to the client in **HTML format** as `text/html`. This message includes internationalized error text retrieved from **I18nManager**.

### 4. Collaboration with Server-side JS

`previewServlet` works in conjunction with server-side JavaScript (`efw.server.js:fire`).

1.  **JS Side**: If the event processing result (`Result`) includes **`actions.preview`**, `efw.server.js` obtains the file path information and **saves it in the session**.
2.  **Client Side**: `efw.client.js` receives the `Result` from the server and sends a request to the preview URL (`/previewServlet`).
3.  **Java Side**: `previewServlet` uses the information saved in that session to serve the file.

This is a common design pattern to ensure **security** by providing the file via the session, instead of exposing the file path directly as a URL parameter.