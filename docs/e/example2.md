efw Framework Output Test Example

Overview

Output Test is a complete example demonstrating the data output functionality in the efw framework, showing how to dynamically populate various HTML form elements with JSON data. This example includes both frontend JSP pages and backend JavaScript event handling logic.

File Structure

1. JSP Page (OutputTest.jsp)

2. JavaScript Event Handling (OutputTest_display.js)

Functionality Implementation

1. Data Source Definition

• Dropdown Option Data (#txtOptions): Defines dropdown options using JSON arrays

• Table Data (#txtTables): Defines table row data using JSON arrays

• Form Value Data (#txtValues): Defines values for each form element using JSON objects

2. Data Processing Flow

1. User clicks the "Batch Display" button to trigger the Efw('OutputTest_display') event
2. Backend JavaScript parses JSON data from three text areas
3. Uses chain operations to populate page elements:
   • Dropdown Lists: Clear existing options → Add new options

   • Tables: Preserve headers → Add data rows

   • Other Elements: Set values based on selectors

3. Supported Input Types

Type Example Element Data Processing Method

Text Input #item1 Directly set value

Hidden Field #item2 Set value but don't display

Special Input #item5 (Phone) Format validation

DateTime #item9 Specific format processing

Number Range #item16 Numeric conversion

Color Picker #item17 Hexadecimal value processing

Checkbox #item18 Set checked status based on value

Radio Button [name=item19] Select corresponding option based on value

Dropdown List #item20 Set selected item

Multi-select List #item21 Set multiple selected items

Text Area #item22 Set text content

Data Table #item23 Dynamically generate row data

Technical Highlights

1. Declarative Data Mapping

• Define mapping relationships between frontend elements and backend parameters using paramsFormat

• Precisely target elements using CSS selectors

2. Template-Driven Rendering

• Dropdown Option Template: <option value='{value}'>{text}</option>

• Table Row Template: <tr><td>{fd1}</td><td>{fd2}</td><td>{fd3}</td></tr>

3. Chain Operation API

```js
new Result()
.runat(selector)
.remove(elements)
.append(template)
.withdata(data)
```

4. Batch Operation Support

• Simultaneously process multiple similar elements (e.g., multiple dropdown lists)

• Unified processing of different form element types

5. JSON Data-Driven

• All data sources use JSON format

• Data exchange between frontend and backend uses JSON

Usage Scenarios

This example is suitable for:

• Dynamic form population

• Data-driven user interfaces

• Report data display

• Configuration management interfaces

• Data editing form initialization

Through this example, developers can learn how the efw framework efficiently populates various HTML form elements with JSON data, achieving separation of data and view.