The provided **`downloadServlet.java`** is a dedicated servlet within the Efw framework responsible for **enabling clients to download files from the server**.

This servlet offers multi-functional download processing, including not only single-file download but also the capability to compress multiple files into a single ZIP archive and add password protection. The collaboration for this process, similar to `previewServlet`, occurs via server-side JavaScript (`efw.server.js`) and the session.

-----

## 📦 Analysis of `downloadServlet.java`: File Download Processing

### 1\. Role and Mechanism

  * **Role**: Retrieves the file paths and download options (such as zipping, save name, and deletion flag) specified in the client event processing from the session, sets the appropriate HTTP response headers, and transmits the file to the client.
  * **Session Collaboration**: Similar to `previewServlet`, the information for the target download is passed via session attributes (`EFW_DOWNLOAD_FILE`, `EFW_DOWNLOAD_ZIP`, etc.) rather than URL parameters.
  * **Notification**: By setting an `efw_Downloaded=OK` cookie at the start of the download, client-side JavaScript (often used by `efw.client.js`) can recognize the completion of the non-asynchronous download process.

### 2\. Processing Flow (`doGet`)

#### A. Retrieval of Download Options and Session Clearing

1.  **Retrieve from Session**: All necessary options for the download (file path, ZIP list, save name, password, delete-after-download flag, etc.) are retrieved from the session.
2.  **Immediate Deletion**: After retrieval, all related session attributes are immediately deleted to ensure security.

#### B. ZIP Compression Processing (Conditional)

```java
if(attr_zip!=null&&!"".equals(attr_zip)){
    // ... Create temporary ZIP file
    // ... Call FileManager.zip() to generate the ZIP file
    // ... Set attr_file to the temporary ZIP file name
}
```

  * If the `EFW_DOWNLOAD_ZIP` attribute contains a file list, ZIP compression is performed before the download.
  * **Temporary File Creation**: A temporary ZIP file is generated using `File.createTempFile("efw", "zip", ...)`.
  * **Compression Execution**: `FileManager.zip` is called to execute the compression using the list of files (`tmp_files`), the base path (`attr_zipBasePath`), and the **password** (`attr_password`).

#### C. Setting Response Headers

1.  **Default Filename Setting**:
      * For ZIP files, the default is `"attachment.zip"`.
      * For single files, the filename is obtained from the file path, and the download filename (`attr_saveas`) is set.
2.  **MIME Type**: **`response.setContentType("application/octet-stream")`** is set. This is the most common MIME type that forces the browser to open a **download dialog**, regardless of the file type (in contrast to `previewServlet`'s `text/html`).
3.  **Content-Disposition**:
      * The `Content-Disposition: attachment; filename="..."` header is set.
      * The filename (`attr_saveas`) is encoded using **`java.net.URLEncoder.encode`** to support multibyte characters such as Japanese.
4.  **Cookie Setting**: An `efw_Downloaded=OK` cookie is added.

#### D. File Reading and Transmission

  * The contents of the target download file (either a single file or the generated temporary ZIP file) are read using `FileInputStream`.
  * The binary data is streamed to the client via `response.getOutputStream()`.

#### E. Post-Download Cleanup

After the download is complete, resources are deleted based on the options.

  * **Temporary ZIP File Deletion (finally block)**: The generated temporary ZIP file (`tmp_zip`) is always deleted, regardless of the success or failure of the process.
  * **Source File Deletion (deleteafterdownload)**: If `attr_deleteafterdownload="true"` was retrieved from the session, the **source file itself** (the original file before zipping, or the single file) is deleted using `FileManager.remove` after the download is complete.

### 3\. Comparison of `previewServlet` and `downloadServlet`

| Item | previewServlet.java | downloadServlet.java |
| :--- | :--- | :--- |
| **URL** | `/previewServlet` | `/downloadServlet` |
| **Purpose** | **Inline display** of file content within the browser. | Forcing the client to **save** the file to their local system. |
| **MIME Type** | Sets the file-specific MIME type. | Sets `application/octet-stream` (forces download). |
| **Security** | File size restriction (10MB). | Provides an option for password-protected ZIP compression. |
| **Resource Mgmt**| No specific temporary file deletion feature. | Feature for **source file deletion after download** (`deleteafterdownload`) and guaranteed deletion of temporary ZIP files. |

Both servlets adopt a common mechanism of receiving the file path via the session from `efw.server.js`, but the logic for setting the response headers and resource management is entirely different, tailored to their respective purposes.
