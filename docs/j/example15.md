# efw PDF処理機能のサンプル

## 概要

efwフレームワークは強力なPDF処理機能を提供しており、主に2つの操作方式をサポートしています：PDFフォームフィールドの入力（フィールド入力機能）とHTMLからPDFへの変換（HTML変換機能）。本サンプルでは、efwのPDFモジュールを使用した効率的なPDF文書生成と処理の方法を示します。

## 主要ファイル

1. **PDFテストメインページ**: `helloPdf.jsp`
2. **PDFフォームフィールド入力処理**: `helloPdf_fillField.js`
3. **HTMLからPDF変換処理**: `helloPdf_html2pdf.js`

## 機能特性

### 1. PDFフォームフィールド入力

#### サポートするフォームフィールドタイプ
- **テキストフィールド**: 単一行テキスト入力
- **複数行テキストフィールド**: 改行対応テキストコンテンツ
- **チェックボックス**: 選択/未選択状態のサポート
- **ラジオボタングループ**: グループ内オプション選択のサポート
- **ドロップダウンリスト**: 事前定義オプションからの選択
- **日付フィールド**: 日付形式入力のサポート

#### 使用方法
```javascript
// Pdfインスタンスの作成
var pdf = new Pdf("template.pdf");

// フィールド値の設定
pdf.setField("field_name", "field_value");

// 結果の保存
pdf.save("output.pdf");
```

### 2. HTMLからPDFへの変換

#### サポートするHTML/CSS機能
- **外部CSSファイル**: 外部スタイルシートのインポート対応
- **インラインスタイル**: style属性のサポート
- **CSSセレクター**: クラスセレクター、IDセレクター等
- **ページ設定**: 用紙サイズ、方向、余白等の設定
- **絶対位置指定**: position: absolute のサポート
- **テーブルスタイル**: 完全なテーブルスタイルのサポート
- **画像**: ローカル画像とネットワーク画像の両方に対応

#### 使用方法
```javascript
// 利用可能なフォントリストの取得
var fontList = Pdf.getFontNames("fonts");
console.log("利用可能フォント: " + fontList.join(", "));

// PDF生成
Pdf.html2pdf(
    htmlContent,     // HTMLコンテンツ
    baseUrl,         // ベースURL（相対パス解決用）
    outputFileName,  // 出力ファイル名
    fontDirectory    // フォントディレクトリ
);
```

#### 高度なページ設定
参考サイト: https://developer.mozilla.org/ja/docs/Web/CSS/@page

```html
// カスタムページ設定
var html = `
<html>
<head>
    <style>
        @page {
            size: A4 portrait;
            margin: 2cm;
            @top-center {
                content: "ヘッダー内容"; //（実際の内容に置き換えてください）
            }
            @bottom-right {
                content: "ページ " counter(page) " / " counter(pages);
            }
        }
        body {
            font-family: MS Gothic;
            font-size: 12pt;
        }
    </style>
</head>
<body>
    <h1>カスタムページ設定</h1>
    <p>ドキュメント内容...</p>
</body>
</html>
`;
```