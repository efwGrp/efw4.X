# Record.map

`map`関数は、`Record`オブジェクト内の配列データの形式を変換します。

## サンプル

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);

record.map({
	"A":"data1",
	"B":["data2","#,##0"],
	"C":["data3","yyyy/MM/dd"],
	"D":function(data){
		return data["data1"]+data["data2"]+data["data3"];
	}
});
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. map ( mapping )` | `Record` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `mapping` | `Object` | 新しいフィールドと既存のフィールド間のマッピング。<br> 参照：[formatter&rounder](formatter&rounder.md)。 |

`mapping`のサンプル。

```javascript
{
    newField1: oldField1,
    newField2: [oldField2, "#,##0.0", "HALF_EVEN"], // formatter（フォーマッター）, rounder（丸め処理）
    newField3: function(data){return String|Number|Date|Boolean;}
}