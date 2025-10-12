# efw and Vue.js Integration Example

## Overview

This example demonstrates how to integrate the efw framework with the Vue.js frontend framework to implement a frontend-backend separation development model. efw is responsible for backend data processing and business logic, Vue.js handles frontend user interface and state management, and the two communicate through efw events.

## Core Files

1. **Integration Interface Page**: `helloVue.jsp`
2. **Data Initialization Handler**: `helloVue_init.js`
3. **Data Sending Handler**: `helloVue_send.js`

## Features

### 1. Frontend Vue.js Functionality

#### Reactive Data Binding
```javascript
// Vue 3 Composition API
const data = Vue.ref({});
```

#### Event Handling
```javascript
// Method definition
const vueSend = function() {
    Efw('helloVue_send', { data: data.value })
    .then(function(ret){
        data.value = ret;
    });
};
```

#### Template Syntax
```html
<!-- Two-way data binding -->
<input v-model="data.item1">

<!-- Conditional rendering -->
<span v-if="data.item18">Selected</span>
<span v-else>Not selected</span>

<!-- List rendering -->
<tr v-for="(item, index) in data.item22datas" :key="index">
```

### 2. Backend efw Functionality

#### Data Provision
```javascript
// Use provide method to return data
return new Result().provide(data);
```

#### Error Handling
The framework automatically captures database-related errors and rolls back transaction processing.
No special requirements mean no need to add try-catch handling for database processing.

#### Message Passing
```javascript
// Add notification message
return new Result()
    .provide(data)
    .alert("Operation successful");
```

### 3. Basic Data Flow

#### Initialization Flow
1. Call helloVue_init event when page loads
2. Backend returns initial data
3. Vue.js binds data to the interface

#### Data Sending Flow
1. User modifies data in the interface
2. Click send button to trigger vueSend method
3. Call helloVue_send event and pass data
4. Backend processes data and returns results
5. Frontend updates interface display