# Part Tag

`Part`タグは、JSPで作成された共通ページ部分のインクルードを簡略化します。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="####" param2="####" /> // または efw:part, efw:PART
...
</body>
```


## 属性

| 名前 | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `path` | はい |  | アプリケーション内のページへの相対パス。 |
| `{any}` | いいえ | `""` | インクルードされるページに渡したい任意の値。 |

インクルードされたJSPでパラメータを取得するには、以下に示すように`request.getAttribute`または`efw:attr`タグを使用できます。

```jsp
<%= request.getAttribute("param1") %>  // これは動作します。
<%= request.getAttribute("param2") %>
<efw:attr key="param1"/> // あるいは、これを使用します。
<efw:attr key="param2"/>
```


動的な値を`Part`タグの属性に渡すには、以下に示すようにJSPスクリプトレットを使用できます。

```jsp
<%
  String param1 = "hello";
%>
<efw:Part path="part.jsp" param1="<%= param1 %>"/>
```