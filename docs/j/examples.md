# EFW サンプル

ドキュメントリンク付きの実装サンプルとテストのコレクション


## サンプル

### [efw フレームワーク入力テストサンプル](example1.md)
このサンプルは、efw フレームワークを使用して、様々なタイプのHTML入力要素を処理する方法を実演します。

- JSP ページ ([InputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/InputTest.jsp))
- JavaScript イベント処理 ([InputTest_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/InputTest_submit.js))

-----

### [efw フレームワーク出力テストサンプル](example2.md)
出力テストサンプル は、efw フレームワークにおけるデータ出力機能を紹介する完全なサンプルです。JSON データを様々な HTML フォーム要素に動的に設定する方法を実演します。このサンプルには、フロントエンドの JSP ページとバックエンドの JavaScript イベント処理ロジックが含まれています。

- JSP ページ ([OutputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/OutputTest.jsp))
- JavaScript イベント処理 ([OutputTest_display.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/OutputTest_display.js))

-----

### [efw フレームワーク アクションテスト サンプル](example3.md)
ActionTest は、efw フレームワークにおけるユーザーインターフェースのインタラクションと操作を展示する完全なサンプルです。ショートカットキー、要素制御、ダイアログ、ファイル操作、ページナビゲーションなど、さまざまなフロントエンド操作機能の実装方法を実演します。

- JSP ページ ([ActionTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/ActionTest.jsp))
- JavaScript イベント処理 ([ActionTest_run.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/ActionTest_run.js))

-----

### [efw ダイアログサンプル](example4.md)

本サンプルは、efwフレームワークにおけるダイアログ機能の完全な実装を展示し、多种類のダイアログタイプ（警告、確認、待機、プレビュー、カスタムダイアログ）の使用方法を含みます。efwフレームワークは、様々なユーザーインタラクションダイアログを作成および管理するための簡潔なAPIを提供します。

#### JQuery UI 版
- JSP ページ ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog.jsp))
- カスタムダイアログコンポーネント ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog.jsp))
- ダイアログ初期化イベント処理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### Bootstrap4 版
- JSP ページ ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog4.jsp))
- カスタムダイアログコンポーネント ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog4.jsp))
- ダイアログ初期化イベント処理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### Bootstrap5 版
- JSP ページ ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog5.jsp))
- カスタムダイアログコンポーネント ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog5.jsp))
- ダイアログ初期化イベント処理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

-----

### [efw ファイルアップロードサンプル](example5.md)

本サンプルは、efwフレームワークにおけるファイルアップロード機能の実装を展示し、特にアップロードファイルタイプの制限（.xlsx形式のみ許可）方法を実演します。efwフレームワークは、ファイルアップロード、保存、管理操作を処理する簡潔なAPIを提供し、ファイルタイプ検証をサポートします。

- JSP ページ ([helloUpload.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloUpload.jsp))
- 単一ファイルアップロード処理 ([helloUpload_submit1.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submit1.js))
- 複数ファイルアップロード処理 ([helloUpload_submitM.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submitM.js))

-----

### [efw elFinder ファイルマネージャーサンプル](example6.md)

efwフレームワークはelFinderファイルマネージャーを統合しており、シンプルなタグでWebアプリケーションに完全なファイル管理機能を実現します。elFinderはJavaScriptとPHPベースの一般的なファイルマネージャーであり、efwフレームワークはこれをカプセル化し、Javaコネクタを提供し、JSPタグ形式で提供します。

- 基本使用法サンプル ([helloElfinder.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloElfinder.jsp))
- セキュリティ設定テストサンプル ([helloElfinder4.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloElfinder4.jsp))

-----

### [efw Chart コンポーネントサンプル](example7.md)

efwフレームワークは強力なグラフ機能を提供し、シンプルなJSPタグで多種多様なグラフ表示を実現します。このコンポーネントはGoogle ChartsとChart.jsの2つのレンダリングエンジンをサポートし、オンラインとオフライン環境の両方でのグラフ要件に対応できます。

- JSP ページ ([helloChart.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloChart.jsp))

-----

### [efw バーコードとQRコード生成サンプル](example8.md)

efwフレームワークは強力なバーコードとQRコード生成機能を提供し、シンプルなServlet呼び出しで多種多様なバーコードを生成できます。この機能はZXingとBarcode4jライブラリをベースに実装されており、QRコード、Code 128、EAN-13など様々なバーコード形式をサポートします。

- JSP ページ ([helloBarcode.jsp.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloBarcode.jsp))

-----

### [efw Excel 操作サンプル](example9.md)

efwフレームワークは、Excel操作を簡素化するAPIセットを提供し、Apache POIの複雑な操作をカプセル化することで、Excelファイルの作成、編集、処理をより簡単で直感的にします。本サンプルは、efwフレームワークにおけるExcel操作の様々な機能を紹介します。

- JSP ページ ([helloExcel.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloExcel.jsp))
- Excel操作処理 ([helloExcel_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloExcel_submit.js))

-----

### [efw 大容量ファイル処理技術サンプル](example10.md)

本サンプルは、efwフレームワークが大規模なテキストおよびCSVファイルを処理するための様々な最適化手法を示しています。特に大規模データシナリオにおけるメモリ管理、I/O効率、並行処理に対して完全なソリューションを提供します。

- JSP ページ ([helloTextCSV.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloTextCSV.jsp))
- 固定長テキスト処理 ([helloTextCSV_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit.js))
- CSVフォーマット処理 ([helloTextCSV_submit2.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit2.js))

-----

### [efw データベース操作サンプル](example11.md)

efwフレームワークは、コネクションプール管理、外部SQL定義、データ変換処理をサポートする完全なデータベース操作ソリューションを提供します。このサンプルでは、efwを使用してテーブル作成、データ挿入、更新、削除などの基本的なCRUD操作を含む様々なデータベース操作の方法を示します。

- JSP ページ ([helloDB.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDB.jsp))
- デフォルトコネクションプール操作 ([helloDB_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDB_submit.js))
- 代替コネクションプール操作 ([helloDB_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDB_submit2.js))
- SQL定義ファイル ([helloDB.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/sql/helloDB.xml))

-----

### [efw メール送信機能サンプル](example12.md)

efwフレームワークは、Gmail SMTPサーバーを経由したメール送信をサポートする、シンプルで使いやすいメール送信機能を提供します。この機能は、テンプレート化されたメール内容、添付ファイル送信、複数受信者設定などの高度な特性をサポートしながら、使用の簡便性を維持しています。

- JSP ページ ([helloMail.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloMail.jsp))
- メール送信処理 ([helloMail_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloMail_submit.js))
- メールテンプレート設定 ([mails.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/mail/mails.xml))

-----

### [efw 多言語サポートサンプル](example13.md)

efwフレームワークは、完全な国際化（i18n）サポートを提供し、アプリケーションが簡単に多言語機能を実装できるようにします。外部化された言語リソースファイルとシンプルなタグ使用により、多言語をサポートするWebアプリケーションを迅速に構築できます。

- JSP ページ ([helloI18n.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloI18n.jsp))
- 多言語メッセージ処理 ([helloI18n_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloI18n_submit.js))
- 英語言語リソースファイル ([en.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/en.xml))
- 日本語言語リソースファイル ([jp.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/jp.xml))
- 中国語言語リソースファイル ([cn.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/cn.xml))

-----

### [efw PDF処理機能のサンプル](example15.md)

efwフレームワークは強力なPDF処理機能を提供しており、主に2つの操作方式をサポートしています：PDFフォームフィールドの入力（フィールド入力機能）とHTMLからPDFへの変換（HTML変換機能）。本サンプルでは、efwのPDFモジュールを使用した効率的なPDF文書生成と処理の方法を示します。

- JSP ページ ([helloPdf.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloPdf.jsp))
- PDFフォームフィールド入力処理 ([helloPdf_fillField.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloPdf_fillField.js))
- HTMLからPDF変換処理 ([helloPdf_html2pdf.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloPdf_html2pdf.js))

-----

### [efw と Vue.js 連携サンプル](example16.md)

本サンプルは、efwフレームワークとVue.jsフロントエンドフレームワークを連携させ、フロントエンドとバックエンドを分離した開発モデルを実現する方法を示しています。efwはバックエンドのデータ処理とビジネスロジックを担当し、Vue.jsはフロントエンドのユーザーインターフェースと状態管理を担当します。両者はefwイベントを通じて通信を行います。

- JSP ページ ([helloVue.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloVue.jsp))
- データ初期化処理 ([helloVue_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloVue_init.js))
- データ送信処理 ([helloVue_send.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloVue_send.js))

-----

### [efw WebSocket モード機能サンプル](example17.md)

efwフレームワークはWebSocketモードをサポートし、リアルタイム通信、進捗フィードバック、ブロードキャスト機能を実現します。このサンプルは、WebSocketモードを使用して効率的なクライアント-サーバー通信を行う方法を示し、進捗表示やリアルタイムメッセージブロードキャストを含みます。

- JSP ページ ([helloWsMode.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloWsMode.jsp))
- 進捗テスト機能 ([helloWsMode_progress_test.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_progress_test.js))
- ブロードキャスト開始機能 ([helloWsMode_broadcast_start.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_start.js))
- ブロードキャスト停止機能 ([helloWsMode_broadcast_stop.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_stop.js))
- ブロードキャスト受信機能 ([helloWsMode_broadcast_receive.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_receive.js))
- ブロードキャスト受信停止機能 ([helloWsMode_broadcast_bye.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_bye.js))

-----

### [efwフレームワーク ログイン・権限制御サンプル](example18.md)

これはefwフレームワークに基づいたWebアプリケーションのサンプルで、包括的なログイン制御と権限管理機能を実装しています。社内システムとインターネット向けWebアプリケーションの両方に対応し、**多層防御セキュリティアーキテクチャ**により、直接URLアクセスや開発者ツールからの悪意のある呼び出しを効果的に防止します。

- プロジェクトフォルダ ([skeletonSample](https://github.com/efwGrp/efw4.X/tree/master/examples/skeletonSample/))

-----

### [efw バッチ処理サンプル紹介](example19.md)

EFW は強力なバッチ処理機能を提供し、開発者がJavaScriptを使用してバッチ処理ロジックを作成し、WindowsおよびLinux環境で実行することを可能にします。以下は完全なバッチ処理のサンプルです。

- Windowsバッチ起動スクリプト ([helloBatch.bat](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/efw/batch/helloBatch.bat))
- Linuxバッチ起動スクリプト ([helloBatch.sh](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloBatch.sh))
- バッチ処理ビジネスロジック ([helloBatch.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/))

