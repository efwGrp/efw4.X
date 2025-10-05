# efw Framework Input Test Example

## Overview

This example demonstrates how to use the efw (Escco-Framework) framework to handle various types of HTML input elements. efw is an Ajax framework based on server-side JavaScript, adopting a purpose-oriented design approach.

## Core Files

### 1. JSP Page (InputTest.jsp)

### 2. JavaScript Event Handling (InputTest_submit.js)

## Features

1.  **Comprehensive Input Type Support**: Supports all HTML5 input types (text, search, tel, url, email, password, etc.)
2.  **Special Element Handling**:
    *   Checkbox: Returns the value when selected or null
    *   Radio Button: Uses the `[name=item19]:checked` selector
    *   Multi-select List: Returns data in array format
3.  **Data Formatting**: Automatic formatting via the `data-format` attribute
    *   Numeric Format: `#,##0.00`
    *   DateTime Format: `yyyy/MM/dd HH:mm:ss`
4.  **Responsive Updates**: Asynchronous page content updates using Ajax

## Technical Highlights

*   **Declarative Parameter Mapping**: Defines the mapping relationship between front-end elements and back-end parameters via the `paramsFormat` object
*   **Automatic Data Type Conversion**: Formatted fields are automatically converted to numeric or date types
*   **JSON Data Interaction**: Data exchange between front-end and back-end is done via JSON format
*   **jQuery Selector Support**: Supports flexible selectors for targeting page elements

This example showcases how the efw framework simplifies the Ajax development process, implementing complex form data processing functionality with minimal code.