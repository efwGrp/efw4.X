# efw メール送信機能サンプル

## 概要

efwフレームワークは、Gmail SMTPサーバーを経由したメール送信をサポートする、シンプルで使いやすいメール送信機能を提供します。この機能は、テンプレート化されたメール内容、添付ファイル送信、複数受信者設定などの高度な特性をサポートしながら、使用の簡便性を維持しています。

## コアファイル

1. **メール送信ページ**: `helloMail.jsp`
2. **メール送信処理**: `helloMail_submit.js`
3. **メールテンプレート設定**: `mails.xml`

## 機能特性

### 1. 柔軟なメール設定

#### 受信者設定
- **主な受信者**: toパラメータで指定
- **CC（写し）**: ccパラメータで指定
- **BCC（隠し写し）**: bccパラメータで指定
- **開封確認**: mdnパラメータで指定

#### メール内容
- **動的な件名**: パラメータ化された件名をサポート
- **テンプレート本文**: パラメータ付きのメール本文テンプレートをサポート
- **HTMLサポート**: HTML形式のメール内容をサポート

### 2. 添付ファイルサポート

javascript
// 単一の添付ファイル
attachment: "path/to/file.pdf"

// 複数の添付ファイル（セミコロン区切り）
attachment: "file1.pdf;file2.xlsx;image.jpg"

// storageベースの相対パスをサポート
attachment: "document.pdf"


### 3. テンプレート化設計

メール内容とコードを分離し、多种の事前定義テンプレートをサポート：
javascript
// ウェルカムテンプレートを使用
mail.send("mails", "welcomeMail", {
    email: "user@example.com",
    name: "張三",
    username: "zhangsan",
    regTime: new Date().toLocaleString()
});

// 通知テンプレートを使用
mail.send("mails", "notificationMail", {
    to: "admin@example.com",
    cc: "manager@example.com",
    title: "システムアラート",
    message: "異常なログイン行為を検出しました",
    time: new Date().toLocaleString(),
    systemId: "SECURITY-001"
});


## 設定説明

### 1. SMTPサーバー設定

META-INF/context.xmlでメールセッションリソースを設定：
xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Context>
<Context>
    <!-- Gmail SMTP設定 -->
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
    
    <!-- 企業SMTPサーバー設定例 -->
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


## 使用例

### 1. 基本的なメール送信

javascript
// シンプルなテキストメールを送信
mail.send("mails", "freeMail", {
    to: "recipient@example.com",
    from: "sender@example.com",
    subject: "テストメール",
    body: "これはテストメールの内容です。"
});


### 2. 添付ファイル付きメール

javascript
// 添付ファイル付きメールを送信
mail.send("mails", "freeMail", {
    to: "recipient@example.com",
    subject: "重要書類",
    body: "添付ファイルの重要書類をご確認ください。",
    attachment: "documents/contract.pdf;reports/monthly.xlsx"
});


### 3. テンプレートメールの使用

javascript
// 事前定義テンプレートを使用してメールを送信
mail.send("mails", "welcomeMail", {
    email: "new.user@example.com",
    name: "李四",
    username: "lisi",
    regTime: new Date().toLocaleDateString()
});


### 4. バッチメール送信

javascript
// 複数の受信者にバッチでメールを送信
var recipients = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
];

recipients.forEach(function(email) {
    mail.send("mails", "notificationMail", {
        to: email,
        title: "システム更新通知",
        message: "システムは今夜メンテナンス更新を行う予定です。作業内容を事前に保存してください。",
        time: "2023-12-01 02:00 - 04:00",
        systemId: "SYS-UPDATE-20231201"
    });
});


## ベストプラクティス

### 1. セキュリティ推奨事項
- アカウントパスワードではなくアプリ専用パスワードを使用する
- 機密情報をメールで送信しない
- SMTP認証情報を定期的に更新する
- 暗号化接続（STARTTLS/SSL）を使用する

### 2. パフォーマンス最適化
- 接続プールを使用してSMTP接続を再利用する
- メール送信タスクをバッチ処理する
- 緊急でないメールを非同期で送信する
- 適切なタイムアウト時間を設定する

### 3. テンプレート管理
- 常用メールをテンプレート化する
- 多言語メールテンプレートをサポートする

## まとめ

efwフレームワークのメール送信機能は、強力で柔軟なツールセットを提供し、開発者がアプリケーションに簡単にメール機能を統合できるようにします。テンプレート化設計、添付ファイルサポート、豊富な設定オプションを通じて、様々なメール送信ニーズを満たすことができます。

### コア優位性
1. **簡単使い**: 簡潔なAPI設計で素早く習得可能
2. **柔軟な設定**: 多种のSMTPサーバーと認証方式をサポート
3. **豊富な機能**: 添付ファイル、テンプレート、HTMLメールなどの高度な機能をサポート

### 適用シナリオ
- ユーザー登録ウェルカムメール
- パスワードリセットメール
- システム通知とアラート
- マーケティングとプロモーションメール
- レポートと文書送信
- トランザクションメール通知

efwのメール機能を適切に使用することで、高效で信頼性の高いメール送信システムを構築し、様々な業務シナリオのニーズを満たすことができます。