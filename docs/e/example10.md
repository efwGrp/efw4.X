# efw Large File Processing Technology Example

## Overview

This example demonstrates various optimization techniques of the efw framework for processing large text and CSV files. It provides a complete solution specifically for memory management, I/O efficiency, and concurrent processing in big data scenarios.

## Core Files

1. **Main Page**: `helloTextCSV.jsp`
2. **Fixed-length Text Processing**: `helloTextCSV_submit.js`
3. **CSV Format Processing**: `helloTextCSV_submit2.js`

## Features

### 1. Multiple Processing Modes

#### Mode 1: Simple Processing
- **Characteristics**: Loads all data into memory at once
- **Applicable Scenarios**: Small file processing, when sufficient memory is available
- **Risk**: Large files may cause memory overflow

#### Mode 2: Line-by-Line Processing
- **Characteristics**: Stream reading, line-by-line processing
- **Advantages**: Stable memory usage
- **Disadvantages**: Frequent I/O operations, lower performance

#### Mode 3: Batch Processing
- **Characteristics**: Reads and processes data in batches
- **Advantages**: Balances memory usage and I/O efficiency
- **Configuration**: Batch size can be adjusted to optimize performance

#### Mode 4: Writer Reuse
- **Characteristics**: Reuses CSV Writer to reduce file operations
- **Advantages**: Significantly reduces file open/close operations
- **Note**: Requires management of Writer lifecycle

#### Mode 5: ID Grouping
- **Characteristics**: Processes data grouped by data ID
- **Advantages**: Suitable for scenarios requiring category-based processing
- **Applications**: Data distribution, classified storage, etc.

### 2. File Format Support

#### Fixed-length Text Format
```javascript
new BinaryReader(
    "filename.txt", 
    [10, 10],        // Field length
    ["MS932", "MS932"], // Encoding format
    20               // Total record length
)
```

#### CSV Format
```javascript
new CSVReader(
    "filename.csv",
    ",", "\"",       // Delimiter and quotes
    "MS932"          // Encoding format
)
```

### 3. Performance Optimization Features

#### Memory Management
- Stream processing avoids large memory usage
- Batch processing controls memory usage peaks
- Automatic cleanup and resource release

#### I/O Optimization
- Reduces unnecessary file operations
- Improves I/O efficiency through batch writing
- Intelligent buffer management

## Usage Instructions

### 1. File Preparation

#### Input File Structure
- **Fixed-length text**: Fields arranged in fixed lengths
- **CSV files**: Standard comma-separated format
- **Character encoding**: Supports multiple encodings including MS932

#### Output Directory
Automatically cleans up and creates output directory before processing:
```javascript
file.remove("text&csv/seperated");
file.makeDir("text&csv/seperated");
```

### 2. Performance Tuning Recommendations

#### Batch Size Adjustment
Adjust processing batches according to data characteristics:
```javascript
// Adjust batch size according to actual situation
if (index % batchSize == 0) {
    processBatch();
}
```

#### Memory Monitoring
Monitor memory usage when processing large files to avoid overflow.

#### Exception Handling
Add appropriate exception handling mechanisms to ensure program robustness.

## Application Scenarios

### 1. Big Data Processing
- Massive log file analysis
- Data warehouse ETL processing
- Batch data conversion

### 2. Data Distribution
- Data distribution according to business rules
- Multi-target output processing
- Real-time data stream processing

### 3. System Integration
- Data exchange with traditional systems
- Multi-format data conversion
- Heterogeneous system integration

## Summary

The efw framework provides powerful and flexible large file processing capabilities. Through the combination of multiple processing modes, it can handle various complex data processing scenarios. From simple memory processing to complex stream batch processing, suitable solutions can be found.

### Core Advantages
1. **Flexibility**: Supports multiple processing modes and file formats
2. **Performance**: Optimized memory and I/O management
3. **Reliability**: Complete exception handling and resource management
4. **Usability**: Concise API and rich examples

### Selection Recommendations
- **Small files**: Use simple mode to improve development efficiency
- **Large files**: Use stream or batch mode to ensure stability
- **High-performance requirements**: Combine Writer reuse and batch processing for optimization

By selecting appropriate processing modes and parameter configurations, various data files from KB to TB level can be processed efficiently and stably.