# EFW Examples

Collection of example implementations and tests with documentation links


## Examples

### [efw Framework Input Test Example](example1.md)
This example demonstrates how to use the efw framework to handle various types of HTML input elements.

- JSP Page ([InputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/InputTest.jsp))
- JavaScript Event Handling ([InputTest_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/InputTest_submit.js))

-----

### [efw Framework Output Test Example](example2.md)
Output Test is a complete example demonstrating the data output functionality in the efw framework, showing how to dynamically populate various HTML form elements with JSON data. This example includes both frontend JSP pages and backend JavaScript event handling logic.

- JSP Page ([OutputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/OutputTest.jsp))
- JavaScript Event Handling ([OutputTest_display.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/OutputTest_display.js))

-----

### [efw Framework Action Test Example](example3.md)
ActionTest is a complete example that demonstrates user interface interactions and operations in the efw framework, showing how to implement various frontend operation functions including shortcut keys, element control, dialogs, file operations, and page navigation.

- JSP Page ([ActionTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/ActionTest.jsp))
- JavaScript Event Handling ([ActionTest_run.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/ActionTest_run.js))

-----

### [efw Dialog Example](example4.md)
This example demonstrates the complete implementation of dialog functionality in the efw framework, including the usage of various dialog types (alert, confirm, wait, preview, and custom dialogs). The efw framework provides a concise API for creating and managing various user interaction dialogs.

#### With JQuery UI
- JSP Page ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog.jsp))
- Custom Dialog Component ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog.jsp))
- Dialog Initialization Event Handler ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### With Bootstrap4
- JSP Page ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog4.jsp))
- Custom Dialog Component ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog4.jsp))
- Dialog Initialization Event Handler ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### With Bootstrap5
- JSP Page ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog5.jsp))
- Custom Dialog Component ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog5.jsp))
- Dialog Initialization Event Handler ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

-----

### [efw File Upload Example](example5.md)
This example demonstrates the implementation of file upload functionality in the efw framework, specifically showing how to restrict upload file types (only .xlsx format allowed). The efw framework provides a concise API for handling file upload, save, and management operations, while supporting file type validation.

- JSP Page ([helloUpload.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloUpload.jsp))
- Single File Upload Handler ([helloUpload_submit1.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submit1.js))
- Multiple File Upload Handler ([helloUpload_submitM.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submitM.js))

-----

### [efw elFinder File Manager Example](example6.md)
The efw framework integrates the elFinder file manager, enabling complete file management functionality in web applications through simple tags. elFinder is a popular file manager based on JavaScript and PHP. The efw framework encapsulates it, provides a Java connector, and offers it in the form of JSP tags.

- Basic Usage Example ([helloElfinder.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloElfinder.jsp))
- Security Configuration Test Example ([helloElfinder4.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloElfinder4.jsp))

-----

### [efw Chart Component Example](example7.md)
The efw framework provides powerful charting capabilities that enable various types of chart displays through simple JSP tags. This component supports two rendering engines - Google Charts and Chart.js - meeting chart requirements for both online and offline environments.

- JSP Page ([helloChart.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloChart.jsp))

-----

### [efw Barcode and QR Code Generation Example](example8.md)
The efw framework provides powerful barcode and QR code generation capabilities that can generate various types of barcodes and QR codes through simple Servlet calls. This functionality is implemented based on ZXing and Barcode4j libraries, supporting multiple barcode formats including QR Code, Code 128, EAN-13, and more.

- JSP Page ([helloBarcode.jsp.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloBarcode.jsp))

-----

### [efw Excel Operation Example](example9.md)
The efw framework provides a set of APIs that simplify Excel operations by encapsulating the complexities of Apache POI, making the creation, editing, and processing of Excel files more straightforward and intuitive. This example demonstrates various Excel operation functionalities within the efw framework.

- JSP Page ([helloExcel.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloExcel.jsp))
- Excel Operation Handler ([helloExcel_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloExcel_submit.js))

-----

### [efw Large File Processing Technology Example](example10.md)
This example demonstrates various optimization techniques of the efw framework for processing large text and CSV files. It provides a complete solution specifically for memory management, I/O efficiency, and concurrent processing in big data scenarios.

- JSP Page ([helloTextCSV.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloTextCSV.jsp))
- Fixed-length Text Processing ([helloTextCSV_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit.js))
- CSV Format Processing ([helloTextCSV_submit2.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit2.js))

-----

### [efw Database Operation Example](example11.md)
The efw framework provides a complete database operation solution that supports connection pool management, external SQL definition, and data transformation processing. This example demonstrates how to use efw for various database operations, including basic CRUD operations such as table creation, data insertion, update, and deletion.

- JSP Page ([helloDB.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDB.jsp))
- Default Connection Pool Operations ([helloDB_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDB_submit.js))
- Alternate Connection Pool Operations ([helloDB_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDB_submit2.js))
- SQL Definition File ([helloDB.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/sql/helloDB.xml))

-----

### [efw Email Sending Function Example](example12.md)
The efw framework provides a simple and easy-to-use email sending function that supports sending emails through Gmail SMTP servers. This functionality supports advanced features such as templated email content, attachment sending, and multiple recipient settings, while maintaining ease of use.

- JSP Page ([helloMail.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloMail.jsp))
- Email Sending Handler ([helloMail_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloMail_submit.js))
- Email Template Configuration ([mails.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/mail/mails.xml))

-----

### [efw Multilingual Support Example](example13.md)
The efw framework provides complete internationalization (i18n) support, enabling applications to easily implement multilingual functionality. Through externalized language resource files and simple tag usage, you can quickly build web applications that support multiple languages.

- JSP Page ([helloI18n.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloI18n.jsp))
- Multilingual Message Handler ([helloI18n_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloI18n_submit.js))
- English Language Resource File ([en.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/en.xml))
- Japanese Language Resource File ([jp.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/jp.xml))
- Chinese Language Resource File ([cn.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/cn.xml))

-----

### [efw PDF Processing Function Examples](example15.md)
The efw framework provides powerful PDF processing capabilities, supporting two main PDF operation methods:
1. **PDF form field population** (Field filling function)
2. **HTML to PDF conversion** (HTML conversion function)
This example demonstrates how to use efw's PDF module for efficient PDF document generation and processing.

- JSP Page ([helloPdf.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloPdf.jsp))
- PDF Form Field Population Processing ([helloPdf_fillField.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloPdf_fillField.js))
- HTML to PDF Conversion Processing ([helloPdf_html2pdf.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloPdf_html2pdf.js))

-----

### [efw and Vue.js Integration Example](example16.md)
This example demonstrates how to integrate the efw framework with the Vue.js frontend framework to implement a frontend-backend separation development model. efw is responsible for backend data processing and business logic, Vue.js handles frontend user interface and state management, and the two communicate through efw events.

- JSP Page ([helloVue.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloVue.jsp))
- Data Initialization Handler ([helloVue_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloVue_init.js))
- Data Sending Handler ([helloVue_send.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloVue_send.js))

-----

### [efw WebSocket Mode Example](example17.md)
The efw framework provides WebSocket mode support, implementing real-time communication, progress feedback, and broadcast functionality. This example demonstrates how to use WebSocket mode for efficient client-server communication, including progress display and real-time message broadcasting.

- JSP Page ([helloWsMode.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloWsMode.jsp))
- Progress Test Function ([helloWsMode_progress_test.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_progress_test.js))
- Broadcast Start Function ([helloWsMode_broadcast_start.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_start.js))
- Broadcast Stop Function ([helloWsMode_broadcast_stop.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_stop.js))
- Broadcast Receive Function ([helloWsMode_broadcast_receive.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_receive.js))
- Broadcast Stop Receive Function ([helloWsMode_broadcast_bye.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_bye.js))

-----

### [efw Framework Login and Authorization Control Example](example18.md)
This is a sample web application based on the efw framework, demonstrating comprehensive login control and authorization management functionality. Designed for both internal enterprise systems and internet-facing web applications, it provides a **defense-in-depth security architecture** that effectively prevents direct URL access and malicious calls through developer tools.

- Project folder ([skeletonSample](https://github.com/efwGrp/efw4.X/tree/master/examples/skeletonSample/))

-----

### [efw Batch Processing Example](example19.md)
EFW provides powerful batch processing capabilities that allow developers to write batch processing logic using JavaScript and execute it in both Windows and Linux environments. The following is a complete batch processing example.

- Windows Batch Startup Script ([helloBatch.bat](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/efw/batch/helloBatch.bat))
- Linux Batch Startup Script ([helloBatch.sh](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloBatch.sh))
- Batch Processing Business Logic ([helloBatch.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/))

