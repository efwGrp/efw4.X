# 言語XML

ja.xml (例)

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<entry key="OtherErrorException">予想外エラーが発生しました。</entry>
<entry key="CommunicationErrorException">通信エラーが発生しました。リトライしますか。</entry>
<entry key="EventIsBusyException">該当機能は混雑しています。しばらくお待ちください。</entry>
<entry key="RuntimeErrorException">実行時エラーが発生しました。\n\neventId={eventId}\nmessage={message}</entry>
<entry key="ParamsFormatErrorException">イベントのパラメータ定義は正しくありません。\n\neventId={eventId}</entry>
<entry key="ResultValuesErrorException">表示用のデータは正しくありません。\n\neventId={eventId}</entry>
<entry key="ResultActionsErrorException">動作用のデータは正しくありません。\n\neventId={eventId}</entry>
<entry key="AlertDialogTitle">情報</entry>
<entry key="AlertDialogOK">OK</entry>
<entry key="WaitDialogTitle">取り込み中</entry>
<entry key="PreviewDialogTitle">プレビュー</entry>
・・・

<entry key="NewKeywordWasForgottenException">Newキーワードが忘れられました。</entry>
<entry key="here">ここ</entry>
</properties>
```

### エントリーキー

エントリーキーは、ファイル内で一意である必要があります。

### ファイル名

ファイル名は、i18n (国際化) のための言語コードです。