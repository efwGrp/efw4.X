# efw Dialog Example

## Overview

This example demonstrates the complete implementation of dialog functionality in the efw framework, including the usage of various dialog types (alert, confirm, wait, preview, and custom dialogs). The efw framework provides a concise API for creating and managing various user interaction dialogs.

## Core Files

1. **Main Page**: `helloDialog.jsp`
2. **Custom Dialog Component**: `helloDialog_myDialog.jsp`
3. **Dialog Initialization Event Handler**: `helloDialog_init.js`

## Function Implementation

### 1. Dialog Types

#### Alert Dialog

```js
efw.dialog.alert("I am here");
```

- Displays simple alert messages
- Users can only close by clicking OK

#### Confirm Dialog

```js
efw.dialog.confirm(
    "Testing alert functionality.",
    {
        "Yes": function(){ alert("Clicked 'Yes'."); },
        "No": function(){ alert("Clicked 'No'."); }
    },
    "Alert Test",
    function(){ alert("Test completed"); }
);
```

- Displays confirmation dialog with custom buttons
- Each button has independent callback functions
- Supports dialog titles
- Supports post-close callbacks

#### Wait Dialog

```js
efw.dialog.wait(
    "Please wait 5 seconds.",
    5,
    "Wait Test",
    function(){ alert("Test completed"); }
);
```

- Displays wait messages
- Sets wait time (seconds)
- Supports dialog titles
- Supports timeout callbacks

#### Preview Dialog

```js
efw.dialog.preview("a.jpg", "a.jpg");
```

- Previews file content
- Supports preview of file types like images

#### Custom Dialog

```js
function testDialog(){
    myDialog.p1 = 'hello world! ' + new Date();
    myDialog.dialog('open');
}
```

- Fully customizable dialogs
- Supports parameter passing
- Supports open/close event handling

### 2. Custom Dialog Workflow

1. **Dialog Initialization**:
   - Define dialog structure and initialization logic in `helloDialog_myDialog.jsp`
   - Create dialogs using jQuery UI dialog component

2. **Opening Dialog**:
   - Set parameters and open dialog in `testDialog()` function
   - Pass parameters through `myDialog.p1`

3. **Initialization Event**:
   - Trigger open event when dialog opens
   - Call `Efw("helloDialog_init", { msg: myDialog.p1 })`
   - Pass parameters to initialization event handler

4. **Initialization Processing**:
   - `helloDialog_init.js` receives parameters
   - Update dialog content using Result object
   - Display message in dialog's `.msg` element

## Technical Highlights

### 1. Modular Design
- Separation of main page, dialog components, and event handling
- Introduce components using `<efw:part>`

### 2. Parameter Passing Mechanism
- Pass parameters through custom attributes (e.g., `myDialog.p1`)
- Event handlers receive parameters through `params`

### 3. Chain Operation API

```js
return (new Result())
    .runat("#myDialog")
    .withdata({".msg": params["msg"]});
```

### 4. Event-Driven Architecture
- Trigger initialization event when dialog opens
- Call server-side events using `Efw()` function

### 5. Debug Support

```js
params.debug(); // Output parameter information
```

### 6. Flexible Dialog Configuration
- Highly customizable dialog options
- Supports modal/non-modal dialogs
- Adjustable size and position

## Usage Scenarios

This example applies to:
- Operations requiring user confirmation
- File preview functionality
- Custom complex dialogs
- Dialog scenarios requiring parameter passing

> Through this example, developers can learn how to use various dialogs in the efw framework, as well as how to create and manage custom dialogs.