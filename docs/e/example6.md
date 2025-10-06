# efw elFinder File Manager Example

## Overview

The efw framework integrates the elFinder file manager, enabling complete file management functionality in web applications through simple tags. elFinder is a popular file manager based on JavaScript and PHP. The efw framework encapsulates it, provides a Java connector, and offers it in the form of JSP tags.

## Core Files

1. **Basic Usage Example**: `helloElfinder.jsp`
2. **Security Configuration Test Example**: `helloElfinder4.jsp`

## Features

### 1. Basic Usage
elFinder can be invoked with a simple tag:

```jsp
<efw:elFinder home=""/>
```

- The `home` attribute specifies the path relative to the `WEB-INF/efw/storage` directory
- Interface resembles Windows Explorer, supporting drag-and-drop uploads, multi-file/folder operations, and right-click menus

### 2. Path Configuration
Supports both relative and absolute path modes:

```jsp
<!-- Relative path -->
<efw:elFinder home="upload"/>

<!-- Absolute path -->
<efw:elFinder home="C:\Windows\Microsoft.NET\Framework64" isAbs="true"/>
```

### 3. Security Configuration
efw detects and reports errors when paths contain `..`. Additionally, it provides various security configuration options:

#### Protected Mode (`protected="true"`)
- Prevents users from navigating outside the specified directory
- Also reports errors when read-only mode settings are changed

#### Read-only Mode (`readonly="true"`)
- Restricts users to file viewing only; no modification, deletion, or upload operations allowed
- Can be dynamically toggled via JavaScript API in non-protected mode

```javascript
// Toggle read-only mode
elfinder1.setReadOnly(true);  // Enable read-only
elfinder1.setReadOnly(false); // Disable read-only
```

#### Absolute Path Mode (`isAbs="true"`)
- Allows access to any path on the server
- Extremely dangerous in unprotected mode; use with caution

### 4. API Functions
The elFinder component provides essential JavaScript APIs:

```javascript
// Change current directory
elfinder1.setHome('C:/EFW_ALL');

// Toggle read-only mode
elfinder1.setReadOnly(true);
```

## Security Considerations

### 1. Path Traversal Protection
- The framework automatically detects and blocks path operations containing `..`

### 2. File Operation Risks
- Files deleted from elFinder are physically removed from the server
- Recommend using read-only mode or strict permission restrictions in production environments

### 3. Directory Size Limitations
- A single folder containing a large number of files may cause memory overflow
- Avoid pointing to system directories (e.g., `C:\Windows`)

### 4. Network Environment Considerations
- In absolute path mode and unprotected mode, user calls to `setHome` might access system-sensitive files
- Using absolute paths and unprotected mode in internet environments is extremely dangerous

## Usage Recommendations

1. **Development Environment**: Absolute paths can be used for convenient access to various directories
2. **Production Environment**: Use relative paths and protected mode, restricting access to specific directories
3. **Sensitive Operations**: Combine with read-only mode to prevent accidental operations
4. **Performance Considerations**: Avoid pointing to directories containing large numbers of files

## Extended Features

### 1. File Preview
elFinder supports preview for various file types:
- Image files (JPG, PNG, GIF, etc.)
- PDF documents
- Office documents (requires extension installation)

## Summary

The efw elFinder component provides powerful and convenient file management functionality, delivering an experience similar to desktop explorers through simple tag invocations. Proper configuration of security options balances convenience and safety, making it suitable for various web application scenarios.

> Special attention should be paid to path security and permission control during use to avoid potential security risks. In production environments, it is recommended to use relative paths, protected mode, and appropriate read-only restrictions to ensure system security.
