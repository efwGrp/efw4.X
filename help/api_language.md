<H1>Language XML</H1>

en.xml
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<!--EfwClientMessages-->
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
<!--EfwServerMessages-->
<entry key="NumberType">number</entry>
<entry key="DateType">date</entry>
<entry key="StringType">string</entry>
<entry key="SessionTimeoutException">Session timeout. Please log in again.</entry>
<entry key="NumberIsReuqiredMessage">Please enter {display-name} with a valid number.</entry>
<entry key="DateIsReuqiredMessage">Please enter {display-name} with a valid date.</entry>
<entry key="IsRequiredMessage">Please enter {display-name}.</entry>
<entry key="MaxLengthOverMessage">{display-name} cannot be greater than {max-length} words.</entry>
<entry key="MinOrMaxOverMessage">{display-name} is {data-type} between {min} and {max}.</entry>
<entry key="MinOverMessage">{display-name} is {data-type} not less than {min}.</entry>
<entry key="MaxOverMessage">{display-name} is {data-type} no larger than {max}.</entry>
<entry key="NotAcceptMessage">Please select the correct file for {display-name}.</entry>
<entry key="EventIsNotExistsMessage">The event cannot be loaded because there is no file or JavaScript language violation.</entry>

<entry key="ElFinderIdNotRegisteredMessage">The elFinder is inoperable without id registration.</entry>
<entry key="ElFinderSessionTimeoutMessage">The elFinder is inoperable because of session timeout.</entry>
<entry key="ElFinderIsProtectedMessage">The action is rejected because of elFinder protection mode.</entry>
<entry key="ElFinderHackingRiskMessage">The action is rejected because of hacking risk detection.</entry>

<!--RuntimeExceptions-->
<entry key="NewKeywordWasForgottenException">New keyword was forgotten.</entry>
<!-- test -->
<entry key="here">here</entry>
</properties>

```


<h3>Entry Key</h3>
The entry key must be unique in a file.

<h3>File Name</h3>
The file name is the language code for i18n.