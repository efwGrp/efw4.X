# 💻 Client-Side JavaScript Library: efw (ESCCO-Framework)

The provided source code constitutes the **client-side JavaScript library** (`efw.js` and `efw.client.js`) for a framework called **efw (ESCCO-Framework)**.

The primary goal of this framework is to provide **event-driven communication between the client (browser) and the server**, along with the subsequent **automation of UI operations**.

---

## 🧪 Core Structure and Features

### 1\. `Efw` Constructor (`efw.js`)

* **Basic Usage:** Used in the format `Efw("eventId")` to issue a specific **event** to the server.
* **Overloading:** `Efw` supports multiple argument patterns based on the number and type of arguments.
    * `eventId` (Required): The ID of the server event to execute.
    * `manualParams`: Parameters (object) to pass manually to the event.
    * `server`: The target server URL (string).
    * `wsMode`: Whether to use WebSocket mode (boolean).
* **Event Parameter Construction:** It builds an `eventParams` object from the passed arguments.
    ```javascript
    // Example: Passing only eventId and wsMode
    Efw("myEvent", true); // manualParams is interpreted as boolean, leading to wsMode=true
    // Example: Passing eventId and manualParams
    Efw("myEvent", { key: "value" });
    ```
* **Event Execution:** Finally, it executes `(new EfwClient()).fire(eventParams)`, initiating the event processing via an `EfwClient` instance.

### 2\. Global Instance and Properties (`efw.js`)

* **`efw` Instance:** A global instance generated as `var efw = new Efw();`, providing access to the framework's basic functionalities.
* **Prototype Properties:**
    * `efw.baseurl`: Base URL (default is `.`).
    * `efw.lang`: Language setting (default is `"en"`).
    * `efw.dialog`: An `EfwDialog` instance for dialog control.
    * `efw.messages`: An `EfwClientMessages` instance for message control.
    * `efw.isDownloading`: A flag indicating if a download is in progress.

### 3\. System Initialization (`efw.js`)

* **DOM Ready Processing:** The following processing is performed inside `$(function() { ... });` after the DOM is ready (using jQuery):
    * **Input Behavior Control:** Methods from `efwClientInputBehavior` are bound to `keydown`, `focus`, and `blur` events for specific input elements to customize input operations (e.g., shortcut keys, formatting).
    * **Loading Indicator:** Settings are configured to display `#efw_loading` on `ajaxStart` and hide it on `ajaxStop`, providing a **loading animation** during Ajax communication.
    * **Dialog and Message Initialization:** Initializes `efw.dialog` and `efw.messages`.

---

## 📡 `EfwClient` Communication Flow (`efw.client.js`)

The `EfwClient.prototype.fire` method contains the main logic for executing a server event.

### 1\. Event Execution Sequence

Event execution essentially consists of the following **two stages of Ajax communication** (or WebSocket communication):

| Step | Method | Purpose |
| :--- | :--- | :--- |
| **Clear** | N/A | Clears error displays (`.efw_input_error`). |
| **URL Construction** | N/A | Constructs URLs for `efwServlet`, `uploadServlet`, `downloadServlet`, `previewServlet`, and `efwWebSocket`. |
| **Phase 1** | `_callFirstAjax` | Sends the event ID to the server to get the **format of parameters** (`paramsFormat`) the client should collect. |
| **Parameter Collection** | `_pickupParams` | Automatically collects data from HTML elements (`$(key)`) and `manualParams` based on the `paramsFormat` received from the server. |
| **File Upload** | `_callUploadAjax` | If file inputs (`<input type="file">`) are included, **uploads the files** using `FormData`. |
| **Phase 2** | `_callSecondAjax` / `_callSecondAjaxInWsMode` | Sends the **entire collected parameters** to the server to get the **event execution result** (`values`, `actions`). |
| **Result Reflection** | `_showValues` | **Automatically updates HTML element values** based on the `values` returned from the server. |
| **Action Execution** | `_showActions` | Executes **client-side operations** (error display, element show/hide, navigation, download, etc.) based on the `actions` returned from the server.

### 2\. Parameter Collection (`_pickupParams`)

* **Purpose:** Automatically retrieves values from DOM elements using the selectors (`key`) defined in `paramsFormat` and stores them in the `data` object.
* **Data Type Handling:**
    * If `format` is `null` or a string: Retrieves the HTML element's value (`.val()`, `.text()`, `src`, `html()`).
    * If `format` includes `secure:true`: Encodes the value using `btoa(encodeURIComponent(vl))` for **simple encryption** before transmission.
    * If `format` is an array (`[]`) or an object (`{}`): Recursively calls `_pickupParams` to retrieve structured data (supporting table and composite object retrieval).
* **Special Handling for File Uploads:** For `<input type="file">` elements, the file itself is added to `_pickupParams_uploadformdata` (`FormData`), and the parameter value contains a `|`-separated list of file names.

### 3\. Action Processing (`_showActions`)

The server can instruct the client to perform specific behaviors by returning an `actions` object.

* **Error Handling:** If `actions.error` exists, retrieves the message from `efw.messages` and displays it using `efw.dialog.alert`.
* **UI Operations:** Changes the state of elements corresponding to selectors specified in `actions.show`, `actions.hide`, `actions.enable`, `actions.disable`, and `actions.highlight`.
* **Special Actions:**
    * `actions.preview`: Displays a preview dialog.
    * `actions.progress`: Displays a progress dialog.
    * `actions.download`: Initiates a download via `window.location = downloadUrl` and waits for a download completion cookie (`efw_Downloaded`) before proceeding.
* **Final Operations:** After displaying a dialog with `actions.confirm` or `actions.alert`, it executes `actions.eval` (JavaScript code execution), `actions.focus`, or `actions.navigate` (screen transition).

---

## 💡 Summary

The provided source code is designed as a **robust client framework** to **abstract and automate "bidirectional client-server communication" and "UI data binding/manipulation"**. Developers can call `Efw("eventId")` to execute a server event, automatically collect parameters, display results, and perform UI actions, without writing verbose Ajax callback processing or DOM manipulation.
