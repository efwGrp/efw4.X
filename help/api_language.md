<H1>Language XML</H1>

<pre>
en.xml
------------------------------------
&lt;?xml version="1.0" encoding="UTF-8" standalone="no"?>
&lt;!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
&lt;properties>
&lt;!--EfwClientMessages-->
&lt;entry key="OtherErrorException">An unexpected error has occurred.&lt;/entry>
&lt;entry key="CommunicationErrorException">A communication error has occurred. Do you want to retry?&lt;/entry>
&lt;entry key="EventIsBusyException">The function is crowded. Please wait.&lt;/entry>
&lt;entry key="RuntimeErrorException">A runtime error has occurred.\n\neventId={eventId}\nmessage={message}&lt;/entry>
&lt;entry key="ParamsFormatErrorException">The event parameter definition is incorrect.\n\neventId={eventId}&lt;/entry>
&lt;entry key="ResultValuesErrorException">The data for display is not correct.\n\neventId={eventId}&lt;/entry>
&lt;entry key="ResultActionsErrorException">The data for action is not correct.\n\neventId={eventId}&lt;/entry>
&lt;entry key="AlertDialogTitle">Message&lt;/entry>
&lt;entry key="AlertDialogOK">OK&lt;/entry>
&lt;entry key="WaitDialogTitle">Busy&lt;/entry>
&lt;!--EfwServerMessages-->
&lt;entry key="NumberType">number&lt;/entry>
&lt;entry key="DateType">date&lt;/entry>
&lt;entry key="StringType">string&lt;/entry>
&lt;entry key="SessionTimeoutException">Session timeout. Please log in again.&lt;/entry>
&lt;entry key="NumberIsReuqiredMessage">Please enter {display-name} with a valid number.&lt;/entry>
&lt;entry key="DateIsReuqiredMessage">Please enter {display-name} with a valid date.&lt;/entry>
&lt;entry key="IsRequiredMessage">Please enter {display-name}.&lt;/entry>
&lt;entry key="MaxLengthOverMessage">{display-name} cannot be greater than {max-length} words.&lt;/entry>
&lt;entry key="MinOrMaxOverMessage">{display-name} is {data-type} between {min} and {max}.&lt;/entry>
&lt;entry key="MinOverMessage">{display-name} is {data-type} not less than {min}.&lt;/entry>
&lt;entry key="MaxOverMessage">{display-name} is {data-type} no larger than {max}.&lt;/entry>
&lt;entry key="NotAcceptMessage">Please select the correct file for {display-name}.&lt;/entry>
&lt;entry key="EventIsNotExistsMessage">The event cannot be loaded because there is no file or JavaScript language violation.&lt;/entry>

&lt;entry key="ElFinderIdNotRegisteredMessage">The elFinder is inoperable without id registration.&lt;/entry>
&lt;entry key="ElFinderSessionTimeoutMessage">The elFinder is inoperable because of session timeout.&lt;/entry>
&lt;entry key="ElFinderIsProtectedMessage">The action is rejected because of elFinder protection mode.&lt;/entry>
&lt;entry key="ElFinderHackingRiskMessage">The action is rejected because of hacking risk detection.&lt;/entry>

&lt;!--RuntimeExceptions-->
&lt;entry key="NewKeywordWasForgottenException">New keyword was forgotten.&lt;/entry>
&lt;!-- test -->
&lt;entry key="here">here&lt;/entry>
&lt;/properties>

</pre>


<h3>Entry Key</h3>
The entry key must be unique in a file.

<h3>File Name</h3>
The file name is the language code for i18n.