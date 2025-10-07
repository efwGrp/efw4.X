# efw Excel Operation Example

## Overview

The efw framework provides a set of APIs that simplify Excel operations by encapsulating the complexities of Apache POI, making the creation, editing, and processing of Excel files more straightforward and intuitive. This example demonstrates various Excel operation functionalities within the efw framework.

## Core Files

1. **Main Page**: `helloExcel.jsp`
2. **Excel Operation Handler**: `helloExcel_submit.js`

## Features

### 1. Template-Driven Operations
The efw Excel API employs a template-driven approach, enabling quick creation of worksheets and cells based on existing templates while maintaining style and format consistency.

javascript
// Create worksheet based on template
.createSheet("newSheet", "templateSheet")

// Set cell style based on template
.setCell("sheetName", "A1", "value", "templateSheet", "B2")


### 2. Comprehensive Worksheet Operations
- Create worksheets (supports template duplication)
- Adjust worksheet order
- Show/hide worksheets
- Delete worksheets
- Set active worksheet
- Set print areas

### 3. Flexible Row and Column Management
- Add/delete rows
- Show/hide rows and columns
- Dynamically adjust row and column layout

### 4. Data Operation Capabilities
- Set cell values and styles
- Create hyperlinks
- Support various data types (text, numbers, dates)
- Batch data reading (supports formatting and callbacks)

### 5. Graphic Processing Capabilities
- Add various shapes (circles, rectangles, etc.)
- Precise graphic positioning
- Image replacement functionality
- Graphic status checking

### 6. Formula Support
- Automatic formula application
- Maintain formula calculation functionality

## Usage Instructions

### 1. Basic Workflow
javascript
// 1. Create or open Excel file
var excel = new Excel("template.xlsx");

// 2. Perform various operations
excel.createSheet("newSheet", "templateSheet")
    .setCell("newSheet", "A1", "Hello World")
    .addRow("newSheet", 0);

// 3. Save file
excel.save("output.xlsx");

// 4. Close file
excel.close();


### 2. Data Reading Example
javascript
// Read array data
var data = excel.getArray("Sheet1", 1, 1, {
    name: "A",
    age: "B",
    salary: ["C", "#,##0.00"],
    date: ["D", "yyyy/MM/dd"]
});

// Read single cell value
var value = excel.getValue("Sheet1", "A1");


### 3. Graphic Operation Example
javascript
// Add graphic, myCircle is the name of a pre-defined graphic on the template
excel.addShape("Sheet1", "B2", "TemplateSheet", "myCircle", "Circle Text");

// Check if covered by graphic
var tf = excel.isEncircled("Sheet1", "A1", 0.5, 0.5);


## Technical Advantages

### 1. Simplifies Complex Operations
The efw Excel API encapsulates Apache POI's complex operations, making Excel file processing more straightforward and intuitive.

### 2. Template Reusability
Supports template-based operations, ensuring style and format consistency while improving development efficiency.

### 3. Chained Calls
Supports method chaining, making code more concise and readable.

### 4. Type Safety
Provides comprehensive type support, reducing runtime errors.

## Summary

The efw framework's Excel operation API provides a simple yet powerful solution that significantly simplifies the creation, editing, and processing of Excel files. Through its template-driven design and rich feature set, developers can quickly implement complex Excel operation requirements without needing deep knowledge of Apache POI's intricate details.

This API supports various operation types including worksheet management, row and column operations, data processing, graphic operations, and formula calculations, meeting the requirements of most Excel processing scenarios. The chained call design makes code more concise and readable, improving both development efficiency and code quality.
