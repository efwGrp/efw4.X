# efw データベース操作サンプル

## 概要

efwフレームワークは、コネクションプール管理、外部SQL定義、データ変換処理をサポートする完全なデータベース操作ソリューションを提供します。このサンプルでは、efwを使用してテーブル作成、データ挿入、更新、削除などの基本的なCRUD操作を含む様々なデータベース操作の方法を示します。

## コアファイル

1. **メインページ**: `helloDB.jsp`
2. **デフォルトコネクションプール操作**: `helloDB_submit.js`
3. **代替コネクションプール操作**: `helloDB_submit2.js`
4. **SQL定義ファイル**: `helloDB.xml`

## 機能特性

### 1. データベースコネクションプール管理

efwは複数のデータベースコネクションプールの設定をサポートし、JNDIリソースを通じて管理します：
```xml
<!-- context.xml 設定例 -->
<Resource name="jdbc/efw" 
          auth="Container"
          type="javax.sql.DataSource"
          driverClassName="org.postgresql.Driver"
          url="jdbc:postgresql://localhost:5432/helloworld"
          username="postgres"
          password="postgres"
          maxTotal="10"
          maxIdle="10"
          maxWaitMillis="10000"/>
```

### 2. 外部SQL定義

SQL文は外部XMLファイルに保存され、以下の特性をサポートします：

- **パラメータ化クエリ**: `:paramName` 構文を使用
- **動的パラメータ**: `@dynamicParam` 構文を使用
- **SQL包含**: `<include>` タグを使用してSQLフラグメントを再利用
- **カスタムプレフィックス**: カスタムパラメータと動的パラメータのプレフィックスをサポート
- **コメントサポート**: 複数のコメント形式をサポート

### 3. データ操作API

#### データ検索
```javascript
// 基本検索
var record = db.select("groupId", "sqlId", {param1: "value1"});

// 指定コネクションプールを使用
var record = db.select("groupId", "sqlId", {param1: "value1"}, "jdbc/connectionPool");
```

#### データ変更
```javascript
// 更新操作を実行
var affectedRows = db.change("groupId", "sqlId", {param1: "value1"});

// 指定コネクションプールを使用
var affectedRows = db.change("groupId", "sqlId", {param1: "value1"}, "jdbc/connectionPool");
```

### 4. データマッピングと変換

efwは強力なデータマッピング機能を提供します：
```javascript
// 基本マッピング
var mappedData = db.select(...)
    .map({
        newField: "originalField",
        formattedDate: ["dateField", "yyyy/MM/dd"]
    });

// カスタム変換関数
var mappedData = db.select(...)
    .map({
        calculatedField: function(data) {
            return data.field1 + " - " + data.field2;
        }
    });

// 単一レコードを取得
var singleRecord = mappedData.getSingle();

// すべてのレコードを取得
var allRecords = mappedData.getAll();
```

## 設定説明

### 1. データベース接続設定

META-INF/context.xmlでデータベースコネクションプールを設定：
```xml
<Context>
    <Resource name="jdbc/efw"
              auth="Container"
              type="javax.sql.DataSource"
              driverClassName="org.postgresql.Driver"
              url="jdbc:postgresql://localhost:5432/database"
              username="username"
              password="password"
              maxTotal="20"
              maxIdle="10"
              maxWaitMillis="10000"/>
</Context>
```

### 2. データベースドライバ依存関係

使用するデータベースに応じて対応するJDBCドライバを追加

## 使用例

### 1. 基本操作フロー
```javascript
// 1. テーブル作成
db.change("helloDB", "createTbl", {});

// 2. データ挿入
db.change("helloDB", "insertRow", {
    id: "001",
    name: "Test User",
    birthday: new Date(),
    years: 25
});

// 3. データ検索
var users = db.select("helloDB", "selectAll", {})
    .map({
        userId: "id",
        userName: "name",
        birthDate: ["birthday", "yyyy-MM-dd"],
        age: "years"
    })
    .getAll();

// 4. データ更新
db.change("helloDB", "updateName", {
    id: "001",
    name: "Updated Name",
    tbl: "tbl_hello"
});

// 5. データ削除
db.change("helloDB", "deleteRow", {id: "001"});

// 6. テーブル削除
db.change("helloDB", "dropTbl", {tbl: "tbl_hello"});
```

### 2. 複数コネクションプールの使用
```javascript
// デフォルトコネクションプールを使用
db.select("groupId", "sqlId", params);

// 指定コネクションプールを使用
db.select("groupId", "sqlId", params, "jdbc/anotherPool");
```

### 3. 複雑なデータ変換
```javascript
var processedData = db.select("helloDB", "complexQuery", {})
    .map({
        // フィールド名変更
        newId: "id",
        
        // 日付フォーマット
        formattedDate: ["birthday", "yyyy年MM月dd日"],
        
        // カスタム計算フィールド
        ageGroup: function(data) {
            if (data.years < 20) return "青少年";
            else if (data.years < 40) return "青年";
            else return "中年以上";
        },
        
        // 結合フィールド
        fullInfo: function(data) {
            return data.name + " (" + data.years + "歳)";
        }
    })
    .getAll();
```

## ベストプラクティス

### 1. SQL管理
- SQL文を外部XMLファイルに保存
- 意味のあるSQL ID名を使用
- `<include>`タグを利用して共通フラグメントを再利用

### 2. コネクションプール最適化
- アプリケーション負荷に応じてコネクションプールサイズを調整
- 異なる業務で異なるコネクションプールを使用
- コネクションプールの使用状況を監視

### 3. データ変換
- マッピング層でデータフォーマット処理を実施
- カスタム関数を使用して複雑な変換ロジックを処理
- 変換ロジックを簡潔で保守可能に保つ

### 4. エラー処理
フレームワークは自動的にデータベース関連のエラーを捕捉し、トランザクション処理をロールバックします。
特別な要件がない場合、データベース処理にtry-catch処理を追加する必要はありません。

## まとめ

efwフレームワークのデータベースモジュールは、強力で柔軟なデータ操作能力を提供し、外部SQL定義、コネクションプール管理、データ変換機能を通じて、データベース操作コードの作成と保守を大幅に簡素化します。単純なCRUD操作から複雑なデータ処理まで、適切なソリューションを見つけることができます。

### コア優位性
1. **関心の分離**: SQLとコードの分離により保守性を向上
2. **柔軟な設定**: 複数コネクションプールとパラメータ化クエリをサポート
3. **強力な変換**: 豊富なデータマッピングと変換機能を提供
4. **パフォーマンス最適化**: コネクションプール管理とバッチ操作をサポート

### 適用シナリオ
- 従来型CRUDアプリケーション
- データレポートと統計分析
- データ移行と変換タスク
- 複数データベース環境アプリケーション

efwのデータベース機能を適切に使用することで、効率的で信頼性が高く、保守が容易なデータアクセス層を構築できます。