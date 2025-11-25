# EFW Batch Processing Example Introduction

EFW provides powerful batch processing capabilities that allow developers to write batch processing logic using JavaScript and execute it in both Windows and Linux environments. The following is a complete batch processing example.

## 1. Processing Startup Scripts

### 1.1 Windows Batch Startup Script
**Filename**: `helloBatch.bat`

### 1.2 Linux Batch Startup Script
**Filename**: `helloBatch.sh`

## 2. Batch Processing Business Logic

**Main File**: `helloBatch.js`

### Parameter Definition
```javascript
var helloBatch = {};
helloBatch.paramsFormat = {
    "sysDate": "format:yyy/MM/dd;display-name:sysdate"
};
```

### Main Functional Modules
- **2.1** Excel File Operations
- **2.2** PDF File Processing
- **2.3** Text and CSV File Processing
- **2.4** Database Operations
- **2.5** REST API Calls
- **2.6** Email Sending

## 3. Execution Process

1. **Environment Preparation**: Set up JDK, TOMCAT paths and classpath
2. **Parameter Passing**: Pass system date parameters via JSON format
3. **Log Recording**: Redirect output to log files
4. **Business Execution**: Execute each functional module in sequence
5. **Result Return**: Return execution results through Batch object

## 4. Technical Features

- **Cross-platform Support**: Provides startup scripts for both Windows and Linux
- **Unified API**: Uses consistent JavaScript API for various operations
- **Transaction Management**: Supports database transaction commit and rollback
- **Error Handling**: Comprehensive exception handling and logging mechanism
- **Templating**: Supports templated operations for Excel, PDF and other files

## 5. Usage Instructions

### Execute in Windows Environment
```batch
helloBatch.bat
```

### Execute in Linux Environment
```bash
chmod +x helloBatch.sh
./helloBatch.sh
```

### View Execution Results
```bash
tail -f $TOMCAT/logs/helloBatch.log
```

This example demonstrates the powerful functionality of the EFW batch processing framework, covering common enterprise application scenarios such as file processing, database operations, and API integration, providing a complete solution for complex batch processing tasks.
