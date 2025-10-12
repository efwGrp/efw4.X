# efw と Vue.js 連携サンプル

## 概要

本サンプルは、efwフレームワークとVue.jsフロントエンドフレームワークを連携させ、フロントエンドとバックエンドを分離した開発モデルを実現する方法を示しています。efwはバックエンドのデータ処理とビジネスロジックを担当し、Vue.jsはフロントエンドのユーザーインターフェースと状態管理を担当します。両者はefwイベントを通じて通信を行います。

## コアファイル

1. **連携インターフェースページ**: `helloVue.jsp`
2. **データ初期化処理**: `helloVue_init.js`
3. **データ送信処理**: `helloVue_send.js`

## 機能特性

### 1. フロントエンド Vue.js 機能

#### リアクティブデータバインディング
```javascript
// Vue 3 Composition API
const data = Vue.ref({});
```

#### イベント処理
```javascript
// メソッド定義
const vueSend = function() {
    Efw('helloVue_send', { data: data.value })
    .then(function(ret){
        data.value = ret;
    });
};
```

#### テンプレート構文
```html
<!-- 双方向データバインディング -->
<input v-model="data.item1">

<!-- 条件付きレンダリング -->
<span v-if="data.item18">選択済み</span>
<span v-else>未選択</span>

<!-- リストレンダリング -->
<tr v-for="(item, index) in data.item22datas" :key="index">
```

### 2. バックエンド efw 機能

#### データ提供
```javascript
// provideメソッドを使用してデータを返す
return new Result().provide(data);
```

#### エラー処理
フレームワークは自動的にデータベース関連のエラーを捕捉し、トランザクション処理をロールバックします。
特別な要件がない場合、データベース処理にtry-catch処理を追加する必要はありません。

#### メッセージ伝達
```javascript
// 通知メッセージを追加
return new Result()
    .provide(data)
    .alert("操作が成功しました");
```

### 3. 基本データフロー

#### 初期化フロー
1. ページ読み込み時に helloVue_init イベントを呼び出す
2. バックエンドが初期データを返す
3. Vue.js がデータをインターフェースにバインドする

#### データ送信フロー
1. ユーザーがインターフェースでデータを変更する
2. 送信ボタンをクリックして vueSend メソッドをトリガーする
3. helloVue_send イベントを呼び出してデータを渡す
4. バックエンドがデータを処理して結果を返す
5. フロントエンドがインターフェース表示を更新する