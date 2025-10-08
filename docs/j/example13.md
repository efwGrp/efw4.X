# efw 多言語サポートサンプル

## 概要

efwフレームワークは、完全な国際化（i18n）サポートを提供し、アプリケーションが簡単に多言語機能を実装できるようにします。外部化された言語リソースファイルとシンプルなタグ使用により、多言語をサポートするWebアプリケーションを迅速に構築できます。

## コアファイル

1. **多言語インターフェースページ**: `helloI18n.jsp`
2. **多言語メッセージ処理**: `helloI18n_submit.js`
3. **英語言語リソースファイル**: `en.xml`
4. **日本語言語リソースファイル**: `jp.xml`
5. **中国語言語リソースファイル**: `cn.xml`

## 機能特性

### 1. 多言語リソース管理

#### リソースファイル構造
- **ファイル位置**: WEB-INF/lib/efw/i18n/ ディレクトリ下
- **命名規則**: 言語コードを使用（例: en.xml, jp.xml, cn.xml）
- **ファイル形式**: 標準Javaプロパティファイル形式（XML版）

#### メッセージキー命名規則
- 意味のあるキー名を使用し、メッセージの用途を説明
- すべての言語ファイルでキー名の一貫性を維持
- キャメルケースまたはアンダースコア区切りを使用

### 2. フロントエンド多言語サポート

#### JSPページでの使用
html
<!-- メッセージ表示 -->
<efw:msg key="messageKey"/>


#### JavaScriptでの使用
javascript
// クライアント側JavaScriptで多言語メッセージを使用
var message = "<efw:msg key="messageKey"/>";


### 3. バックエンド多言語サポート

#### サーバーサイドメッセージ返信
javascript
// イベント処理関数で多言語メッセージを返信
helloI18n_submit.fire = function(params) {
    return new Result()
        .alert("{messageKey}") // 中括弧構文でメッセージキーを参照
        .runat("body")
        .withdata({
            "#someElement": "{anotherMessageKey}"
        });
}


### 4. 言語切替メカニズム

#### URLパラメータ方式
javascript
// URLパラメータで言語を切替
window.location = "page.jsp?lang=en";


#### JSPでの言語設定取得
html
<%
    // requestから言語設定を取得
    String lang=request.getParameter("lang");
    if (lang==null||"".equals(lang))lang="en";
%>
<efw:Client lang="<%=lang%>"/>


## 設定説明

### 2. ファイル構造

WEB-INF/
  └── efw/
      └── i18n/
          ├── en.xml          # 英語リソースファイル
          ├── jp.xml          # 日本語リソースファイル
          └── cn.xml          # 中国語リソースファイル


## ベストプラクティス

### 1. メッセージキー命名規則

統一された命名規則を使用：

properties
機能モジュールごとにグループ化

[module].[component].[messageType]
例: login.form.usernameLabel, user.list.deleteButton

またはメッセージタイプごとにグループ化

[messageType].[context]
例: error.login.invalidCredentials, success.user.updated


### 2. 言語リソースメンテナンス

#### 言語ファイル構造
xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <!-- 共通メッセージ -->
    <entry key="common.yes">はい</entry>
    <entry key="common.no">いいえ</entry>
    <entry key="common.ok">確定</entry>
    <entry key="common.cancel">キャンセル</entry>
    
    <!-- ログインモジュール -->
    <entry key="login.title">ユーザーログイン</entry>
    <entry key="login.username">ユーザー名</entry>
    <entry key="login.password">パスワード</entry>
    
    <!-- エラーメッセージ -->
    <entry key="error.required">{0}は必須項目です</entry>
    <entry key="error.invalidFormat">{0}の形式が正しくありません</entry>
</properties>


## まとめ

efwフレームワークの多言語サポートは、完全かつ柔軟な国際化ソリューションを提供し、以下の特徴があります：

### コア優位性
1. **簡単使い**: シンプルなタグと構文で多言語サポートを実現
2. **フロントエンドとバックエンドの統一**: フロントエンドページとバックエンドメッセージの統一的多言語管理をサポート
3. **柔軟な設定**: 多种の言語切替方式とパラメータ化メッセージをサポート
4. **メンテナンス容易**: 外部化されたリソースファイルにより翻訳とメンテナンスが容易

### 適用シナリオ
- 多言語企業アプリケーション
- 国際化製品
- 多地域展開システム
- 多言語サポートが必要な公共サービス

efwの多言語機能を適切に使用することで、全世界のユーザーをサポートするアプリケーションを簡単に構築でき、より良いユーザー体験とより広い市場カバレッジを提供できます。