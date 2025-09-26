# Language XML

en.xml

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<entry key="OtherErrorException">发生意外错误。</entry>
<entry key="CommunicationErrorException">发生了通信错误。 重试吗？</entry>
<entry key="EventIsBusyException">系统繁忙。请稍后再试。</entry>
<entry key="RuntimeErrorException">发生运行时错误。\n\neventId={eventId}\nmessage={message}</entry>
<entry key="ParamsFormatErrorException">事件参数定义不正确。\n\neventId={eventId}</entry>
<entry key="ResultValuesErrorException">显示用数据不正确。\n\neventId={eventId}</entry>
<entry key="ResultActionsErrorException">动作用数据不正确。\n\neventId={eventId}</entry>
<entry key="AlertDialogTitle">信息</entry>
<entry key="AlertDialogOK">确定</entry>
<entry key="WaitDialogTitle">繁忙</entry>
<entry key="PreviewDialogTitle">预览</entry>
・・・

<entry key="NewKeywordWasForgottenException">New关键字被遗忘了。</entry>
<entry key="here">这里</entry>
</properties>
```

### Entry Key

条目键在一个文件中必须是唯一的。

### 文件名

文件名是 i18n 的语言代码。