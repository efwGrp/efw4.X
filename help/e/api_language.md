# Language XML

en.xml

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "[http://java.sun.com/dtd/properties.dtd](http://java.sun.com/dtd/properties.dtd)">
<properties>
<entry key="OtherErrorException">An unexpected error has occurred.</entry>
<entry key="CommunicationErrorException">A communication error has occurred. Do you want to retry?</entry>
<entry key="EventIsBusyException">The function is crowded. Please wait.</entry>
<entry key="RuntimeErrorException">A runtime error has occurred.\n\neventId={eventId}\nmessage={message}</entry>
<entry key="ParamsFormatErrorException">The event parameter definition is incorrect.\n\neventId={eventId}</entry>
<entry key="ResultValuesErrorException">The data for display is not correct.\n\neventId={eventId}</entry>
<entry key="ResultActionsErrorException">The data for action is not correct.\n\neventId={eventId}</entry>
<entry key="AlertDialogTitle">Message</entry>
<entry key="AlertDialogOK">OK</entry>
<entry key="WaitDialogTitle">Busy</entry>
<entry key="PreviewDialogTitle">Preview</entry>
・・・

<entry key="NewKeywordWasForgottenException">New keyword was forgotten.</entry>
<entry key="here">here</entry>
</properties>
```

### Entry Key
The entry key must be unique within a file.

### File Name
The file name is the language code for i18n.