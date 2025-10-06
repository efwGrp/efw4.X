# efw File Upload Example

## Overview

This example demonstrates the implementation of file upload functionality in the efw framework, specifically showing how to restrict upload file types (only .xlsx format allowed). The efw framework provides a concise API for handling file upload, save, and management operations, while supporting file type validation.

## Core Files

1. **Main Page**: `helloUpload.jsp`
2. **Single File Upload Handler**: `helloUpload_submit1.js`
3. **Multiple File Upload Handler**: `helloUpload_submitM.js`

## Function Implementation

### 1. File Type Restrictions

#### Frontend Restrictions

```html
<input type="file" id="file1" accept=".xlsx">
```

- Use `accept=".xlsx"` attribute to restrict selection to Excel files only
- Browser automatically filters non-.xlsx files

#### Backend Validation

```javascript
helloUpload_submit1.paramsFormat = {
    "#file1": "accept:xlsx;display-name:Single File Selection"
};
```

- Add `accept:xlsx` validation rule in `paramsFormat`
- Framework automatically blocks and displays error message for non-.xlsx files
- `display-name` attribute used to display friendly field names in error messages

### 2. Single File Upload Flow

1. **User selects file**:
   - Select single .xlsx file via `<input type="file" id="file1" accept=".xlsx">`

2. **Trigger upload event**:
   - Click "Execute" button to call `Efw('helloUpload_submit1')`

3. **Server-side processing**:

```javascript
   // Clean up and create upload directory
   file.remove("upload");
   file.makeDir("upload");
   
   // Parse filename
   var filePath = params["#file1"];
   var filename = filePath.split(/[\\\/]/g).pop();
   
   // Save uploaded file
   file.saveSingleUploadFile("upload/" + filename);
```

4. **Return results**:
   - Get file list from upload directory
   - Display results in `#divResult`

### 3. Multiple File Upload Flow

1. **User selects multiple files**:
   - Select multiple .xlsx files via `<input type="file" id="fileM" multiple accept=".xlsx">`

2. **Trigger upload event**:
   - Click "Execute" button to call `Efw('helloUpload_submitM')`

3. **Server-side processing**:

```javascript
   // Clean up and create upload directory
   file.remove("upload");
   file.makeDir("upload");
   
   // Save all uploaded files
   file.saveUploadFiles("upload");
```

4. **Return results**:
   - Get file list from upload directory
   - Display results in `#divResult`

## Technical Highlights

### 1. File Type Validation

#### Frontend Validation
- Use HTML5 `accept` attribute to restrict selectable file types
- Browser native support provides consistent user experience

#### Backend Validation
- Define `accept:xlsx` rule in `paramsFormat`
- Framework automatically validates file types
- Provides friendly error messages (using `display-name`)

### 2. File Operation API

#### Directory Management
- `file.remove("upload")`: Delete directory and its contents
- `file.makeDir("upload")`: Create new directory

#### File Saving
- `file.saveSingleUploadFile("upload/filename")`: Save single uploaded file
- `file.saveUploadFiles("upload")`: Save multiple uploaded files

#### File Listing
- `file.list("upload")`: Get file list from directory

### 3. Parameter Processing
- Use `paramsFormat` to define mapping between frontend elements and backend parameters
- Support validation rule definition (accept, required, format, etc.)
- Get file path via `params["#file1"]`

### 4. Result Return
- Use `Result` object to return processing results
- Update page content via `withdata()` method
- Format output using `JSON.stringify()`

## Usage Instructions

### 1. Single File Upload
1. Click "Select File" button to choose single .xlsx file
2. Click "Execute" button to upload file
3. Upload results displayed at bottom of page

### 2. Multiple File Upload
1. Click "Select File" button to choose multiple .xlsx files (hold Ctrl or Shift for multiple selection)
2. Click "Execute" button to upload all files
3. Upload results displayed at bottom of page

### 3. File Storage
- Files stored in server-side `upload` directory
- Directory contents cleared before each upload
- File list from directory displayed after upload

## Security Considerations

### 1. File Type Validation
- Frontend and backend dual validation ensures only .xlsx files accepted
- Prevents upload of dangerous file types like executables

### 2. File Size Limits
- Should set maximum file size limits
- Prevents server resource exhaustion from oversized files
- Implement this feature through Tomcat settings

### 3. Filename Processing
- Framework checks filenames to prevent path traversal attacks

### 4. Access Control
- Upload directory should not have execute permissions
- Uploaded files should not be directly accessible via URL

> This example demonstrates how the efw framework implements secure file upload functionality, ensuring only specific file types are accepted through frontend and backend dual validation, while providing complete file management capabilities.
