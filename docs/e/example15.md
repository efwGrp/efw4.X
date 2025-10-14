# efw PDF Processing Function Examples

## Overview
The efw framework provides powerful PDF processing capabilities, supporting two main PDF operation methods:
1. **PDF form field population** (Field filling function)
2. **HTML to PDF conversion** (HTML conversion function)

This example demonstrates how to use efw's PDF module for efficient PDF document generation and processing.

## Core Files
1. **PDF Test Main Page**: `helloPdf.jsp`
2. **PDF Form Field Population Processing**: `helloPdf_fillField.js`
3. **HTML to PDF Conversion Processing**: `helloPdf_html2pdf.js`

## Feature Highlights

### 1. PDF Form Field Population

#### Supported Form Field Types
- **Text Fields**: Single-line text input
- **Multi-line Text Fields**: Line break supported text content
- **Checkboxes**: Support checked/unchecked states
- **Radio Button Groups**: Support selecting one option from a group
- **Dropdown Lists**: Support selection from predefined options
- **Date Fields**: Support date format input

#### Usage
```javascript
// Create Pdf instance
var pdf = new Pdf("template.pdf");

// Set field values
pdf.setField("field_name", "field_value");

// Save result
pdf.save("output.pdf");
```

### 2. HTML to PDF Conversion

#### Supported HTML/CSS Features
- **External CSS Files**: Support importing external stylesheets
- **Inline Styles**: Support style attributes
- **CSS Selectors**: Support class selectors, ID selectors, etc.
- **Page Settings**: Support page size, orientation, margins, etc.
- **Absolute Positioning**: Support position: absolute
- **Table Styling**: Support complete table styling
- **Images**: Support local and network images

#### Usage
```javascript
// Get available font list
var fontList = Pdf.getFontNames("fonts");
console.log("Available fonts: " + fontList.join(", "));

// Generate PDF
Pdf.html2pdf(
    htmlContent,     // HTML content
    baseUrl,         // Base URL (for resolving relative paths)
    outputFileName,  // Output filename
    fontDirectory    // Font directory
);
```

#### Advanced Page Settings
Reference website: https://developer.mozilla.org/ja/docs/Web/CSS/@page

```html
// Custom page settings
var html = `
<html>
<head>
    <style>
        @page {
            size: A4 portrait;
            margin: 2cm;
            @top-center {
                content: "Header Content";
            }
            @bottom-right {
                content: "Page " counter(page) " of " counter(pages);
            }
        }
        body {
            font-family: MS Gothic;
            font-size: 12pt;
        }
    </style>
</head>
<body>
    <h1>Custom Page Settings</h1>
    <p>Document content...</p>
</body>
</html>
`;
```