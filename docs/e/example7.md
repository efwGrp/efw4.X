# efw Chart Component Example

## Overview

The efw framework provides powerful charting capabilities that enable various types of chart displays through simple JSP tags. This component supports two rendering engines - Google Charts and Chart.js - meeting chart requirements for both online and offline environments.

## Core Files

- `helloChart.jsp`

## Features

### 1. Data Table Configuration
Chart data is defined through HTML tables with rich configuration options:
```html
<table id="chart1_data" 
       data-format="$#,##0" 
       data-legend="bottom" 
       data-ticks="0,200,400,600,800,1000">
    <!-- Table content -->
</table>
```

- `data-format`: Data format settings (currency format, etc.)
- `data-legend`: Legend position configuration
- `data-ticks`: Axis tick settings
- `data-color`: Row and column color configuration

### 2. Chart Rendering Engines
Supports two rendering modes:
```html
<!-- Google Charts mode (requires internet connection) -->
<efw:Chart mode="googlechart" />

<!-- Chart.js mode (supports offline usage) -->
<efw:Chart mode="chartjs" />
```

### 3. Supported Chart Types
Dynamically switch between multiple chart types via JavaScript API:

| Chart Type | Description | Supported Engines |
|------------|-------------|-------------------|
| area | Area Chart | Both |
| bar | Bar Chart | Both |
| column | Column Chart | Both |
| donut | Donut Chart | Both |
| line | Line Chart | Both |
| pie | Pie Chart | Both |
| scatter | Scatter Chart | Both |
| stackedarea | Stacked Area Chart | Both |
| stackedbar | Stacked Bar Chart | Both |
| stackedcolumn | Stacked Column Chart | Both |
| radar | Radar Chart | Chart.js |

### 4. Configuration Options Callback
Get or set chart configuration information through the `setoptions` attribute:
```javascript
function setChar1Options(options) {
    $("#char1Options").html(JSON.stringify(options));
}
```

## Usage Instructions

### 1. Basic Configuration
```html
<efw:Chart 
    id="chart1"                <!-- Chart ID -->
    data="chart1_data"         <!-- Data table ID -->
    type="column"              <!-- Initial chart type -->
    mode="googlechart"         <!-- Rendering engine -->
    width="400px"             <!-- Chart width -->
    height="300px"            <!-- Chart height -->
    setoptions="callbackFunc" <!-- Configuration callback function -->
/>
```

### 2. Data Table Specifications
Data tables must follow a specific structure:
- First row as header, defining data series names
- First column as row labels
- Support color settings via `data-color` attribute
- Support numerical formatting

### 3. Dynamic Operations
Dynamically manipulate charts through JavaScript API:
```javascript
// Change chart type
chart1.setType('pie');

// Refresh chart data
chart1.draw();
```

## Technical Advantages

### 1. Simplified Development
- No need to write complex JavaScript code
- Define chart data directly through HTML tables
- Excel-like configuration approach reduces learning curve

### 2. Dual Engine Support
- Google Charts: Feature-rich with beautiful charts
- Chart.js: Supports offline usage, lightweight

### 3. Theme Customization
- Support for custom color schemes
- Extensible style configurations

## Considerations

1. **Network Dependency**: Google Charts mode requires internet connection to access Google servers
2. **Browser Compatibility**: Modern browsers recommended for optimal experience
3. **Data Volume Limitations**: Server-side pagination recommended for extremely large datasets

## Summary

The efw chart component provides a simple and easy-to-use charting solution that significantly reduces the complexity of chart development through declarative configuration. Whether for simple data visualization or complex business reports, it can be quickly implemented through simple tag configurations.

The dual-engine architecture ensures both feature richness and flexibility for offline usage, making it suitable for various application scenarios.