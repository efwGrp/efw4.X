<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %> 
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE"CONTENT="TEXT/HTML;CHARSET=UTF-8">       
	<TITLE>efw Vue Test</TITLE>
	<!-- Efwクライアントの取り込み、addVueを設定する-->
	<efw:Client lang="jp" addVue="true" />
	<style>
		button{
			font-size:30px;
			font-weight:bold;
		}
	</style>
</HEAD>
<BODY>
<div id="app">
<h1>Vue連携テスト</h1>
<button @click="vueSend(data)" >サーバ送信</button>
<table><tr><td style="vertical-align:top">
<h3>html5 input type</h3>
<fieldset style="width:220px">
1	<input id="item1" v-model="data.item1"><br>
2	I am hidden<input id="item2" type="hidden" v-model="data.item2"><br>
3	<input id="item3" type="text" v-model="data.item3"><br>
4	<input id="item4" type="search" v-model="data.item4"><br>
5	<input id="item5" type="tel" v-model="data.item5"><br>
6	<input id="item6" type="url" v-model="data.item6"><br>
7	<input id="item7" type="email" v-model="data.item7"><br>
8	<input id="item8" type="password" v-model="data.item8"><br>
9	<input id="item9" type="datetime" v-model="data.item9"><br>
10	<input id="item10" type="date" v-model="data.item10"><br>
11	<input id="item11" type="month" v-model="data.item11"><br>
12	<input id="item12" type="week" v-model="data.item12"><br>
13	<input id="item13" type="time" v-model="data.item13"><br>
14	<input id="item14" type="datetime-local" v-model="data.item14"><br>
15	<input id="item15" type="number" v-model="data.item15"><br>
16	<input id="item16" type="range" v-model="data.item16"><br>
17	<input id="item17" type="color" v-model="data.item17"><br>
18	<input id="item18" type="checkbox" v-model="data.item18"><br>
19	<input id="item19_1" name="item19" type="radio" value="1" v-model="data.item19">
	<input id="item19_2" name="item19" type="radio" value="2"  v-model="data.item19"><br>
</fieldset>
</td><td style="vertical-align:top">
<h3>その他の入力用タグ</h3>
<fieldset style="width:200px">
20	<select id="item20" v-model="data.item20">
		<option v-for="option in data.item20options" :value="option.value">
		{{ option.text }}
		</option>
	</select><br>
21	<select id="item21" size=3 multiple v-model="data.item21">
		<option v-for="option in data.item21options" :value="option.value">
		{{ option.text }}
		</option>
	</select><br>
22	<textarea id="item22" v-model="data.item22"></textarea><br>
</fieldset>
</td><td style="vertical-align:top">
<h3>table</h3>
<fieldset style="width:200px">
	<table id="item23" border=1>
		<tr><th>head1</th><th>head2</th><th>head3</th></tr>
		<tr v-for="d in data.item22datas">
			<td>{{d.fd1}}</td>
			<td>{{d.fd2}}</td>
			<td>{{d.fd3}}</td>
		</tr>
	</table>
</fieldset>
</td><td style="vertical-align:top">
<h3>データ層</h3>
<textarea id="txtValues" style="width:400px;height:500px;font-size:15px;">
{{data}}
</textarea>

</td></tr></table>
</div>
</BODY>
<script>
	(function(){
		Vue.createApp({setup(){
				//データ層
				var data=Vue.ref({});
				//初期表示イベントを実行する
				Efw('helloVue_init')
				.then(function(ret){
					data.value=ret;
				});
				// 送信ボタンイベント。
				 function vueSend() {
				 	Efw('helloVue_send',{data:data.value})
				 	.then(function(ret){
				 		data.value=ret;
				 	});
				}
				return {data,vueSend}
			}
		}).mount('#app');
	})();
	
</script>
</HTML>
