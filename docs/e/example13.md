# efw Multilingual Support Example

## Overview

The efw framework provides complete internationalization (i18n) support, enabling applications to easily implement multilingual functionality. Through externalized language resource files and simple tag usage, you can quickly build web applications that support multiple languages.

## Core Files

1. **Multilingual Interface Page**: `helloI18n.jsp`
2. **Multilingual Message Handler**: `helloI18n_submit.js`
3. **English Language Resource File**: `en.xml`
4. **Japanese Language Resource File**: `jp.xml`
5. **Chinese Language Resource File**: `cn.xml`

## Features

### 1. Multilingual Resource Management

#### Resource File Structure
- **File Location**: Under WEB-INF/lib/efw/i18n/ directory
- **Naming Convention**: Use language codes (e.g., en.xml, jp.xml, cn.xml)
- **File Format**: Standard Java properties file format (XML version)

#### Message Key Naming Convention
- Use meaningful key names that describe message purpose
- Maintain key name consistency across all language files
- Use camel case or underscore separation

### 2. Frontend Multilingual Support

#### Usage in JSP Pages
html
<!-- Message display -->
<efw:msg key="messageKey"/>


#### Usage in JavaScript
javascript
// Use multilingual messages in client-side JavaScript
var message = "<efw:msg key="messageKey"/>";


### 3. Backend Multilingual Support

#### Server-side Message Response
javascript
// Return multilingual messages in event handler functions
helloI18n_submit.fire = function(params) {
    return new Result()
        .alert("{messageKey}") // Reference message keys using brace syntax
        .runat("body")
        .withdata({
            "#someElement": "{anotherMessageKey}"
        });
}


### 4. Language Switching Mechanism

#### URL Parameter Method
javascript
// Switch language via URL parameters
window.location = "page.jsp?lang=en";


#### JSP Language Setting Retrieval
html
<%
    // Get language setting from request
    String lang=request.getParameter("lang");
    if (lang==null||"".equals(lang))lang="en";
%>
<efw:Client lang="<%=lang%>"/>


## Configuration Instructions

### 2. File Structure

WEB-INF/
  └── efw/
      └── i18n/
          ├── en.xml          # English resource file
          ├── jp.xml          # Japanese resource file
          └── cn.xml          # Chinese resource file


## Best Practices

### 1. Message Key Naming Convention

Use unified naming conventions:

properties
Group by functional modules

[module].[component].[messageType]
Example: login.form.usernameLabel, user.list.deleteButton

Or group by message type

[messageType].[context]
Example: error.login.invalidCredentials, success.user.updated


### 2. Language Resource Maintenance

#### Language File Structure
xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <!-- Common messages -->
    <entry key="common.yes">Yes</entry>
    <entry key="common.no">No</entry>
    <entry key="common.ok">OK</entry>
    <entry key="common.cancel">Cancel</entry>
    
    <!-- Login module -->
    <entry key="login.title">User Login</entry>
    <entry key="login.username">Username</entry>
    <entry key="login.password">Password</entry>
    
    <!-- Error messages -->
    <entry key="error.required">{0} is required</entry>
    <entry key="error.invalidFormat">{0} format is incorrect</entry>
</properties>


## Summary

The efw framework's multilingual support provides a complete and flexible internationalization solution with the following characteristics:

### Core Advantages
1. **Easy to Use**: Achieve multilingual support through simple tags and syntax
2. **Frontend-Backend Unity**: Support unified multilingual management for frontend pages and backend messages
3. **Flexible Configuration**: Support multiple language switching methods and parameterized messages
4. **Easy Maintenance**: Externalized resource files facilitate translation and maintenance

### Application Scenarios
- Multilingual enterprise applications
- Internationalized products
- Multi-region deployment systems
- Public services requiring multilingual support

By properly using efw's multilingual functionality, you can easily build applications that support global users, providing better user experience and broader market coverage.