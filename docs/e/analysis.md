# Feature Analysis by AI
The primary source of Efw was provided to AI for feature analysis. The explanation of data flow and security is helpful.

## [Client Feature Analysis](analysis.client.md)
The primary objective of the EFW framework is to provide **event-driven communication between the client (browser) and the server**, along with the consequent **automation of UI operations**.

## [Server Feature Analysis](analysis.server.md)
The Efw server-side acts as an **event-driven middleware** that accepts AJAX/WebSocket requests, starting from the client's `Efw("eventId")` call. It leverages a powerful collaboration between **Java and server-side JavaScript** to seamlessly integrate authentication, validation, logic execution, and resource management.

## [Preview Feature Analysis](analysis.preview.md)
The purpose of the preview function is to enable direct display of files within the browser without forcing the client to download them. Its process focuses heavily on security and file size limitations.

## [Download Feature Analysis](analysis.download.md)
単一ファイルのダウンロードだけでなく、複数のファイルをまとめてZIP圧縮し、パスワード保護まで行う多機能なダウンロード処理を提供します。処理の連携は `previewServlet` と同様に、サーバーサイドJavaScript (`efw.server.js`) とセッションを介して行われます。

## [Upload Feature Analysis](analysis.upload.md)
**クライアント側でのリクエスト構築**から、**サーバー側での厳格なセキュリティチェックと永続化**まで、複数のコンポーネントが連携して実現されます。この処理は、通常のイベント処理とは異なる専用のサーブレット（`uploadServlet`）を介して行われます。

## [Summary of Security Features](analysis.security.md)
Efwフレームワークは、**画面アクセス**、**イベント実行**、および**ファイルI/O**の各レイヤーで多重かつ具体的なセキュリティチェックを組み込むことで、堅牢なエンタープライズアプリケーション環境を提供しています。

