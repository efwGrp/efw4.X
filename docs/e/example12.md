# efw Email Sending Function Example

## Overview

The efw framework provides a simple and easy-to-use email sending function that supports sending emails through Gmail SMTP servers. This functionality supports advanced features such as templated email content, attachment sending, and multiple recipient settings, while maintaining ease of use.

## Core Files

1. **Email Sending Page**: `helloMail.jsp`
2. **Email Sending Handler**: `helloMail_submit.js`
3. **Email Template Configuration**: `mails.xml`

## Features

### 1. Flexible Email Configuration

#### Recipient Settings
- **Primary Recipient**: Specified via the `to` parameter
- **CC (Carbon Copy)**: Specified via the `cc` parameter
- **BCC (Blind Carbon Copy)**: Specified via the `bcc` parameter
- **Read Receipt**: Specified via the `mdn` parameter

#### Email Content
- **Dynamic Subject**: Supports parameterized subjects
- **Template Body**: Supports parameterized email body templates

### 2. Attachment Support

```javascript
// Single attachment
attachment: "path/to/file.pdf"

// Multiple attachments (`|`-separated)
attachment: "file1.pdf;file2.xlsx|image.jpg"

// Supports storage-based relative paths
attachment: "document.pdf"
```

### 3. Templated Design

Separates email content from code, supporting various predefined templates:
```javascript
// Use welcome template
mail.send("mails", "welcomeMail", {
    email: "user@example.com",
    name: "Zhang San",
    username: "zhangsan",
    regTime: new Date().toLocaleString()
});

// Use notification template
mail.send("mails", "notificationMail", {
    to: "admin@example.com",
    cc: "manager@example.com",
    title: "System Alert",
    message: "Abnormal login activity detected",
    time: new Date().toLocaleString(),
    systemId: "SECURITY-001"
});
```

## Configuration Instructions

### 1. SMTP Server Configuration

Configure mail session resources in META-INF/context.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Context>
<Context>
    <!-- Gmail SMTP Configuration -->
    <Resource name="mail/efw"
              auth="Container"
              type="javax.mail.Session"
              username="your.email@gmail.com"
              password="your-app-password"
              mail.debug="false"
              mail.user="your.email@gmail.com"
              mail.from="your.email@gmail.com"
              mail.transport.protocol="smtp"
              mail.smtp.host="smtp.gmail.com"
              mail.smtp.auth="true"
              mail.smtp.port="587"
              mail.smtp.starttls.enable="true"
              description="Gmail SMTP Resource"/>
    
    <!-- Enterprise SMTP Server Configuration Example -->
    <Resource name="mail/corporate"
              auth="Container"
              type="javax.mail.Session"
              username="user@company.com"
              password="password"
              mail.debug="false"
              mail.from="noreply@company.com"
              mail.transport.protocol="smtp"
              mail.smtp.host="smtp.company.com"
              mail.smtp.auth="true"
              mail.smtp.port="25"
              description="Corporate SMTP Resource"/>
</Context>
```

## Usage Examples

### 1. Basic Email Sending

```javascript
// Send simple text email
mail.send("mails", "freeMail", {
    to: "recipient@example.com",
    from: "sender@example.com",
    subject: "Test Email",
    body: "This is a test email content."
});
```

### 2. Email with Attachments

```javascript
// Send email with attachments
mail.send("mails", "freeMail", {
    to: "recipient@example.com",
    importance:"High",//Important Flag
    subject: "Important Document",
    body: "Please check the important document in the attachment.",
    attachment: "documents/contract.pdf;reports/monthly.xlsx"
});
```

### 3. Using Template Emails

```javascript
// Send email using predefined template
mail.send("mails", "welcomeMail", {
    email: "new.user@example.com",
    name: "Li Si",
    username: "lisi",
    regTime: new Date().toLocaleDateString()
});
```

### 4. Batch Email Sending

```javascript
// Send batch emails to multiple recipients
var recipients = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
];

recipients.forEach(function(email) {
    mail.send("mails", "notificationMail", {
        to: email,
        title: "System Update Notification",
        message: "The system will undergo maintenance updates tonight. Please save your work in advance.",
        time: "2023-12-01 02:00 - 04:00",
        systemId: "SYS-UPDATE-20231201"
    },true);//send in background
});
```

## Best Practices

### 1. Security Recommendations
- Use application-specific passwords instead of account passwords
- Do not send sensitive information via email
- Regularly update SMTP credentials
- Use encrypted connections (STARTTLS/SSL)

### 2. Performance Optimization
- Reuse SMTP connections using connection pools
- Process email sending tasks in batches
- Send non-urgent emails asynchronously
- Set appropriate timeout periods

### 3. Template Management
- Template commonly used emails
- Support multi-language email templates

## Summary

The efw framework's email sending function provides a powerful and flexible toolset that enables developers to easily integrate email functionality into applications. Through templated design, attachment support, and rich configuration options, it can meet various email sending needs.

### Core Advantages
1. **Easy to Use**: Simple API design for quick onboarding
2. **Flexible Configuration**: Supports multiple SMTP servers and authentication methods
3. **Rich Features**: Supports advanced features such as attachments, templates, opening notifications, importance, etc.

### Application Scenarios
- User registration welcome emails
- Password reset emails
- System notifications and alerts
- Marketing and promotional emails
- Report and document sending
- Transactional email notifications

By properly using efw's email functionality, you can build an efficient and reliable email sending system to meet the needs of various business scenarios.