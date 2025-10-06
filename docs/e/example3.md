# efw Framework Action Test Example

## Overview

ActionTest is a complete example that demonstrates user interface interactions and operations in the efw framework, showing how to implement various frontend operation functions including shortcut keys, element control, dialogs, file operations, and page navigation.

## Core Files

1. **JSP Page**: `ActionTest.jsp`
2. **JavaScript Event Handling**: `ActionTest_run.js`

## Function Implementation

### 1. Shortcut Key Support
- **Function Keys**: F1-F12
- **Combination Keys**: CTRL+A to CTRL+Z, ALT+S to ALT+Z
- Define shortcut keys using `data-shortcut` attribute

### 2. Element Operation Control
- **Show/Hide**: `show()` / `hide()` methods
- **Enable/Disable**: `enable()` / `disable()` methods
- Supports element positioning using CSS selectors

### 3. Dialog System
- **Alert Dialog**: `alert()` displays simple messages
- **Confirmation Dialog**: `confirm()` provides option-based confirmation dialogs
- Supports callback functions for handling user selections

### 4. Element State Management
- **Text Highlighting**: `highlight()` method
- **Element Focus**: `focus()` method
- **Clear Highlighting**: Clears highlight state

### 5. File Operations
- **Create Directory**: `file.makeDir()`
- **Write File**: `file.writeAllLines()`
- **File Download**: `attach()` method
- **Batch Operations**: Supports chained calls
- **Delete After Download**: `deleteAfterDownload()`

### 6. Page Navigation
- **External Redirect**: `navigate()` to external URLs
- **Parameter Passing**: Supports query parameters

### 7. File Manager Integration
- Uses `efw:elFinder` component
- Real-time file system status updates

## Technical Features

### 1. Unified API Design
- All operations return through `Result` object
- Supports batch operations through chained calls

### 2. Flexible Element Selection
- Supports CSS selectors
- Supports jQuery extended selectors

### 3. Complete File Operations
- Create, read, download, delete
- Supports folder and file operations
- Supports compressed downloads

### 4. User Interaction Support
- Multiple dialog types
- Shortcut key binding
- Visual feedback (highlighting, focus)

### 5. State Management
- Element state control (show, hide, enable, disable)
- File system state synchronization

## Usage Instructions

### 1. Environment Requirements
- Create `WEB-INF/efw/storage` folder as default file storage location

### 2. Shortcut Key Notes
- Browsers may occupy certain shortcut keys (e.g., ALT+A)
- Recommended to test browser compatibility for all shortcut keys

### 3. File Operation Flow
1. First create folders and files
2. Then perform download or delete operations
3. Refresh file manager after operations complete

### 4. Dialog Handling
- Confirmation dialogs support custom buttons and callbacks
- Supports recursive event handler calls

> This example demonstrates the powerful user interface interaction capabilities of the efw framework, covering various scenarios from simple element operations to complex file management and page navigation.