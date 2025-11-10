# efw Framework Login and Authorization Control Example

## Overview

This is a sample web application based on the efw framework, demonstrating comprehensive login control and authorization management functionality. Designed for both internal enterprise systems and internet-facing web applications, it provides a **defense-in-depth security architecture** that effectively prevents direct URL access and malicious calls through developer tools.

## Key Features

### Login Control
- **Login verification mechanism**: Automatically validates user login status
- **Session timeout handling**: Automatic redirection to login page
- **Login-free pages**: Login page, password recovery, password change, error page
- **Dual-layer security**: Frontend component protection + Backend session validation

### Authorization Control
- **Role management**: Administrator and regular user roles
- **Granular control**: URL and event ID-based access control
- **Secure error handling**: Displays system error page for unauthorized access
- **Multi-layer authorization**: Frontend UI control + Backend permission checks

## Security Architecture: Defense in Depth

### Frontend Security Protection
Prevents direct component calls through the `<efw:client>` tag mechanism:

**Protection Principle**:
- Component pages (sub-screens, dialogs) don't contain `<efw:client>` tags
- Only components loaded correctly through main pages can execute functions normally
- When accessing component pages directly, all JavaScript event functions fail to execute

**Security Effect**:
```
Direct access: http://app.com/MST01_inputdialog.jsp 
→ Page loads but all functionality is disabled

Proper access: Through main page dialog → Full functionality works
```

### Backend Security Validation
Server-side session and permission checks as the ultimate defense line:

**Session Validation**:
- Every request validates if a valid USER_ID exists in the session
- Automatic redirection to login page for unauthenticated or expired sessions
- Session data stored server-side, cannot be tampered with client-side

**Permission Checking**:
- Granular control based on user roles (admin/regular user)
- Verifies if current operation is within user's permission scope
- Direct error page return for unauthorized access

**Protection Effect**:
```javascript
// Hacker attempt to forge request in developer tools
fetch('/app/event', {
    method: 'POST', 
    body: 'eventId=MST01_delete&userId=123'
});
→ Backend validates user permissions → Insufficient permissions → Returns error page
```

## Project Structure

```
skeletonSample/
├── JSP Pages/
│   ├── LG01.jsp          # Login page
│   ├── LG02.jsp          # Menu page
│   ├── LG03.jsp          # Password recovery page
│   ├── LG04.jsp          # Password change page
│   ├── MST01.jsp         # User management main page
│   ├── error.jsp         # Error page
│   └── Component files...
├── JavaScript Event Files/
│   ├── LG01_*.js         # Login-related events
│   ├── LG02_*.js         # Menu-related events
│   ├── MST01_*.js        # User management events
│   └── Global events...
├── Configuration Files/
│   └── efw.properties    # Framework configuration
└── Database Files/
    ├── skeletonSample.backup    # PostgreSQL backup
    └── ユーザマスタDDL.sql      # User table creation script
```

## Core Configuration

### Login Control (efw.properties)
```properties
# Enable login control
efw.login.check = true
efw.login.key = USER_ID
efw.login.url = LG01.jsp

# Login-free page patterns
efw.outoflogin.url.pattern = LG01|LG03|LG04.jsp
efw.outoflogin.eventid.pattern = LG01|LG03|LG04|head_logout
```

### Authorization Control (efw.properties)
```properties
# Enable authorization control
efw.auth.check = true
efw.auth.key = USER_ID
efw.system.error.url = error.jsp

# Role definitions
efw.auth.cases = admin,user

# Administrator permissions
admin.auth.pattern = ^admin.*$
admin.url.pattern = LG02|MST01.jsp
admin.eventid.pattern = LG02|MST01

# Regular user permissions
user.auth.pattern = ^((?!admin).)*$
user.url.pattern = LG02.jsp
user.eventid.pattern = LG02
```

## Security Features Explained

### 1. Frontend Component Protection
- **Implementation**: Register frontend-executable functions via `<efw:client>` tags
- **Protection scope**: Prevents direct URL access to component pages
- **Advantage**: Lightweight protection, enhanced user experience

### 2. Backend Session Validation
- **Implementation**: Server-side session state checking
- **Protection scope**: All HTTP requests (page access, event calls, API requests)
- **Advantage**: Cannot be bypassed frontend, extremely high security

### 3. Authorization Flow
```
User request → Frontend component validation → Backend session validation → Backend permission validation → Business execution
```

### 4. Error Handling Strategy
- **Normal operations**: User-friendly interface prompts
- **Abnormal access**: Unified system error page
- **Security principle**: No detailed information provided to potential attackers

## Database Design

User master table structure:
```sql
CREATE TABLE "ユーザマスタ" (
    "ユーザID" VARCHAR(10) NOT NULL PRIMARY KEY,    -- User ID
    "パスワード" VARCHAR(10),                      -- Password
    "ユーザ名" VARCHAR(20),                        -- Username
    "メール" VARCHAR(50),                         -- Email
    "コメント" VARCHAR(200),                       -- Comments
    "初期化フラグ" INTEGER,                        -- Initialization flag
    "ロックフラグ" INTEGER,                        -- Lock flag
    "パスワード更新日" DATE,                       -- Password update date
    "作成日時" DATE,                              -- Creation timestamp
    "作成者" VARCHAR(10),                         -- Creator
    "更新日時" DATE,                              -- Update timestamp
    "更新者" VARCHAR(10)                          -- Updater
);
```

## System Requirements

- Database: PostgreSQL (recommended) or other supported databases
- Web Server: JSP-supported servlet container
- Dependencies: Database driver, email components, POI components

## Quick Start

1. Restore database backup or execute provided SQL script
2. Configure database connection parameters
3. Deploy to web server
4. Access login page to begin using

## Security Best Practices

1. **Session management**: Set appropriate session timeout periods
2. **Password policies**: Implement strong password requirements and regular changes
3. **Error handling**: Unified error pages to prevent information leakage
4. **Logging**: Record important security events
5. **Regular audits**: Review permission configurations and user roles

This example demonstrates a complete security solution for enterprise-level web applications using the efw framework. Through the **frontend protection + backend validation** defense-in-depth architecture, it provides enterprise-grade security assurance for web applications.