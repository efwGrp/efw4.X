# elFinderタグ

elFinderは人気のWebファイルマネージャーです。Efwには、[elFinder 2.1](https://studio-42.github.io/elFinder/)をベースにしたカスタマイズ版が含まれており、タグとして提供されています。jQueryとjQuery UIを含む`Client`タグの後に使用する必要があります。`Thumb.db`のようなシステムファイルを保護するため、すべての隠しファイルは表示されません。

![elFinder Tag Screenshot](../img/addition_tag_elfinder.png)

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<head>
  <efw:Client/>
</head>
<body>
  <efw:elFinder id="elFinder1" home="homefolder" height="400" width="800" readonly="false" /> // または efw:elfinder, efw:Elfinder, efw:ELFINDER
</body>
```

## 属性

| 名前 | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `id` | はい |  | elFinderタグのID。elFinderインスタンスにアクセスするために使用できます。 |
| `home` | いいえ | `""` | ストレージフォルダ(`/WEB-INF/storage`)への相対パス。ストレージフォルダは[プロパティファイル](properties.web.md)を変更することで設定できます。 |
| `selection` | いいえ | `""` | ホームフォルダへの相対パス。elFinderが開いたときに、このパスにあるファイルまたはフォルダが選択されます。 |
| `height` | いいえ | `"400"` | elFinderタグの高さをピクセル単位で指定します。 |
| `width` | いいえ | `"auto"` | elFinderタグの幅をピクセル単位で指定します。 |
| `readonly` | いいえ | `"false"` | elFinderタグが読み取り専用かどうかを指定します。 |
| `protected` | いいえ | `"false"` | elFinderタグが保護されているかどうかを指定します。`true`の場合、`setHome`および`setReadOnly`メソッドの呼び出しは無視されます。 |
| `isAbs` | いいえ | `false` | `home`パスが絶対パスかどうかを指定します。 |

## メソッド

| 呼び出し | 戻り値 | 説明 |
|---|---|---|
| `elfinder. setHome ( path )` | `void` | `home`属性を設定します。 |
| `elfinder. setHome ( path, selection )` | `void` | `home`および`selection`属性を設定します。 |
| `elfinder. setHeight ( height )` | `void` | `height`属性を設定します。 |
| `elfinder. setWidth ( width )` | `void` | `width`属性を設定します。 |
| `elfinder. setReadOnly ( readonly )` | `void` | `readonly`属性を設定します。 |