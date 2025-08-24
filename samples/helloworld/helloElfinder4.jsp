<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<title>elFinder セキュリティテスト</title>
	<!--efw:Client lang="jp" nopromise="true"/-->
	<efw:Client lang="jp"/>
	<script>
		function readonlyChange(self,theElfinder){
			if($(self).val()=="読取り専用解除"){
				theElfinder.setReadOnly(true);
				$(self).val("読取り専用設定");
			}else{
				theElfinder.setReadOnly(false);
				$(self).val("読取り専用解除");
			}
		}
	</script>
</HEAD>
<BODY>
<table border=1>
<tr><td></td><td>保護あり</td><td>保護なし</td></tr>
<tr><td>絶対パス</td><td>
	<efw:elFinder id="elfinder1" width="600" height="300" home="C:\EFW_ALL/apache-tomcat-7.0.109" isAbs="true" protected="true" readonly="true"/>
	<button onclick="elfinder1.setHome('C:/EFW_ALL')">上位パスを変更する</button>
	<button onclick="elfinder1.setHome('C:/EFW_ALL/apache-tomcat-7.0.109/bin')">下位パスを変更する</button>
	<button onclick="readonlyChange(this,elfinder1)">読取り専用解除</button>
	<button onclick="elfinder1.setHome('..')">..の上位パスを変更する</button>
	保護ですからエラーが発生する。
</td><td>
	<efw:elFinder id="elfinder2" width="600" height="300" home="C:\EFW_ALL/apache-tomcat-7.0.109" isAbs="true" readonly="true"/>
	<button onclick="elfinder2.setHome('C:/EFW_ALL')">上位パスを変更する</button>
	<button onclick="elfinder2.setHome('C:/EFW_ALL/apache-tomcat-7.0.109/bin')">下位パスを変更する</button>
	<button onclick="elfinder2.setHome('C:/tool')">別パスを変更する</button>
	<button onclick="readonlyChange(this,elfinder2)">読取り専用解除</button>
	OSフォルダは推測できるからきわめて危険。
	<button onclick="elfinder2.setHome('..')">..の上位パスを変更する</button>
	リスクエラー。
</td></tr>
<tr><td></td><td>保護あり</td><td>保護なし</td></tr>
<tr><td>相対パス</td><td>
	<efw:elFinder id="elfinder3" width="600" height="300" home="upload" protected="true" readonly="true"/>
	<button onclick="elfinder3.setHome('')">上位パスを変更する</button>
	<button onclick="elfinder3.setHome('upload/sub')">下位パスを変更する</button>
	<button onclick="readonlyChange(this,elfinder3)">読取り専用解除</button>
	<button onclick="elfinder3.setHome('..')">..の上位パスを変更する</button>
	保護ですからエラーが発生する。
</td><td>
	<efw:elFinder id="elfinder4" width="600" height="300" home="upload" readonly="true"/>
	<button onclick="elfinder4.setHome('')">上位パスを変更する</button>
	<button onclick="elfinder4.setHome('upload/sub')">下位パスを変更する</button>
	<button onclick="readonlyChange(this,elfinder4)">読取り専用解除</button>
	上位フォルダ名がわかる前提ならOK。
	<button onclick="elfinder4.setHome('..')">..の上位パスを変更する</button>
	リスクエラー。
</td></tr>
</table>
</BODY>
</HTML>
