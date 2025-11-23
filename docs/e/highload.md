# [about efw] Build a High Loads Tomcat Environment

## What is "simultaneous connection" in the WEB system?

The term "simultaneous connections" is often used in web system development, but it is often misused without a clear definition. This time, I will try to create a strict definition by including some related terms.

<table>
<tr><th>Item</th><th>Explanation</th></tr>
<tr><td>Maximum number of logged-in users</td><td>
After logging in, session information is created and takes up a certain amount of memory. Depending on the method of the system, if the session memory is large, you should be careful about the number of users who log in within the session timeout period.
</td></tr>
<tr><td>Maximum number of simultaneous connections</td><td>
A TCP connection is considered to be "connected" from "Established" to "Closed". The number of connections that are open at any given time is the number of concurrent connections. Two connections occur with a single screen operation. ※JSP and various static contents. After the output is completed, the connection will be maintained for 15 seconds.

If you exceed the maximum number of simultaneous connections, the server will not accept connection requests and you will receive a "This site cannot be accessed" error. ※This is not 404.
</td></tr>
<tr><td>Maximum number of concurrent executions</td><td>
Number of requests that the server can handle simultaneously.
</td></tr>
<tr><th colspan=2>< In the case of a good start > ※Exhibitions, information sessions, seminars, etc.
</th></tr>
<tr><td>Only one operation at a time</td><td>
Possible number of people who can operate without error = maximum number of simultaneous connections / 2
</td></tr>
<tr><td>Continuously operate once per second ※Light processing within 1 second,</td><td>
Possible number of people who can operate without error = maximum number of simultaneous connections / 2/15
</td></tr>
<tr><td>Continuously operate once per second ※Heavy processing、</td><td>
Possible number of people who can operate without error = min (maximum number of concurrent executions, maximum number of concurrent connections/2/15)
</td></tr>
</table>

## System Conceptual Diagram
The system conceptual diagram below is an example of various setting information when supporting high load with efw application + tomcat.
![image.png](../img/highload/p1.png)
<table>
<tr><th>Item</th><th>Default</th><th>Explanation</th></tr>
<tr><td>ListenBackLog</td><td>
Window32/64: 200<br>
Solaris32/64,Linux32/64: 511<br>
</td><td>
Maximum number of connection waiting queues for queuing requests with established TCP connections
Specified range for the maximum number of connection queues.
Window32/64: 1～200
Solaris32/64,Linux32/64: 1～2147483647
</td></tr>
<tr><td>MaxClients</td><td>256</td><td>
Number of simultaneous requests that can be answered.
</td></tr>
<tr><td>ServerLimit</td><td>256</td><td>
Set the maximum value that can be set for MaxClients while the Apache process is running, and there is a limit of 20000 or less.
</td></tr>
<tr><td>maxConnections</td><td>
NIO: 10000<br>
NIO2: 10000<br>
APR/Native: 8192
</td><td>
Maximum number of connections that the server will accept and process at any given time. Setting the value to -1 disables the maxConnections feature and does not count connections.
</td></tr>
<tr><td>acceptCount</td><td>100</td><td>
Maximum queue length for incoming connection requests when all possible request processing threads are used. Requests received when the queue is full are rejected.
</td></tr>
<tr><td>maxthreads</td><td>200</td><td>
The maximum number of threads (maximum concurrency) that this connector will create for request processing. A Connector attribute that does not specify an Executor attribute constitutes a thread pool.
The maximum number of threads that the thread pool will actually process requests from the waiting queue.
</td></tr>
</table>

## Setting Location

![image.png](../img/highload/p2.png)

![image.png](../img/highload/p3.png)

## System Conceptual Diagram Explanation

If there are a large number of connections from clients,
- First store it in Apache's ListenBacklog queue and pass 1000 connections in it to Tomcat.
- Tomcat receives connection requests and stores them in the Connection queue.
- Route 100 connections from the Connection queue to the Accept queue for processing.
- Fill up any empty space in the Connection queue with subsequent connection requests.
- Match the MaxClients and maxConnections values to avoid exceeding the maximum Connection queue.
When processing connection requests in the Connection queue using the EFW framework,
- Configure concurrent processing queues for each event for heavy processing. Returns an error when the queue maximum is reached.
- Do not set concurrent processing queues for light processing.

There are two types of event queue maximum value reaching errors.
- If set to allow retry, an error message will be displayed and a 30 second countdown will occur.
- If you set it to not allow retry, just display an error message.
<font color=red>"The function in question is busy. Please wait for a while."</font>

## ListenBackLog queue over
![image.png](../img/highload/p4.png)

If you perform a new operation when the server connection is full, the error message shown on the left will be displayed.

## Event queue over (retry possible)
![image.png](../img/highload/p5.png)

When heavy operations reach a limit, the countdown message shown on the left will be displayed (30 seconds total). Retry possible.

## Event queue over (retry not possible)
![image.png](../img/highload/p6.png)

When operations become restricted, the congestion message shown on the left will be displayed. Retry not possible.
