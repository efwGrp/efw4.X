<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>test</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client/>
</HEAD>
<BODY>
<efw:Part path="dialogShortcut.jsp"/>
Press the function key to fire the click event. The cursor will return to the element which was focused before.<br>
<input>
<button data-shortcut="F1" onclick="alert('F1')">F1 Key</button>
<button data-shortcut="F2" onclick="alert('F2')">F2 Key</button>
<button data-shortcut="F3" onclick="alert('F3')">F3 Key</button>
<button data-shortcut="F4" onclick="alert('F4')">F4 Key</button>
<button data-shortcut="F5" onclick="alert('F5')">F5 Key</button>
<button data-shortcut="F6" onclick="alert('F6')">F6 Key</button>
<button data-shortcut="F7" onclick="alert('F7')">F7 Key</button>
<button data-shortcut="F8" onclick="alert('F8')">F8 Key</button>
<button data-shortcut="F9" onclick="alert('F9')">F9 Key</button>
<button data-shortcut="F10" onclick="alert('F10')">F10 Key</button>
<button data-shortcut="F11" onclick="alert('F11')">F11 Key</button>
<button data-shortcut="F12" onclick="alert('F12')">F12 Key</button>
<br><br><br>
<button data-shortcut="CTRL+D" onclick="dialogShortcut.dialog('open')">CTRL+D Show Dialog</button>

</BODY>
</HTML>
