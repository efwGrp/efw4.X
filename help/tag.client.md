<H1>Client Tag</H1>
To programming with Efw, it is required to import several .js files and .css files into JSP.
You can use the Efw Tag to make the importing easy.

<pre>
...
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;head&gt;
...
&lt;efw:Client baseurl="/appfolder" mode="jquery-ui" theme="base" lang="en" /&gt;		//efw:client or efw:CLIENT
...
&lt;/head&gt;
</pre>

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>baseurl</td><td>No</td><td>"."</td><td>The web application base url. If your page is not in the base folder, it is must.</td></tr>
<tr><td>mode</td><td>No</td><td>"jquery-ui"</td><td>To set the designing mode to "jquery-ui" or "bootstrap".</td></tr>
<tr><td>theme</td><td>No</td><td>"base"</td><td>To set the theme for "jquery-ui".</td></tr>
<tr><td colspan=4>
	<table>
	<tr>
		<td>base</td><td><img src="themes/base.png"></td>
		<td>black-tie</td><td><img src="themes/black-tie.png"></td>
		<td>blitzer</td><td><img src="themes/blitzer.png"></td>
		<td>cupertino</td><td><img src="themes/cupertino.png"></td>
		<td>dark-hive</td><td><img src="themes/dark-hive.png"></td>
	</tr>
	<tr>
		<td>dot-luv</td><td><img src="themes/dot-luv.png"></td>
		<td>eggplant</td><td><img src="themes/eggplant.png"></td>
		<td>excite-bike</td><td><img src="themes/excite-bike.png"></td>
		<td>flick</td><td><img src="themes/flick.png"></td>
		<td>hot-sneaks</td><td><img src="themes/hot-sneaks.png"></td>
	</tr>
	<tr>
		<td>humanity</td><td><img src="themes/humanity.png"></td>
		<td>le-frog</td><td><img src="themes/le-frog.png"></td>
		<td>mint-choc</td><td><img src="themes/mint-choc.png"></td>
		<td>overcast</td><td><img src="themes/overcast.png"></td>
		<td>pepper-grinder</td><td><img src="themes/pepper-grinder.png"></td>
	</tr>
	<tr>
		<td>redmond</td><td><img src="themes/redmond.png"></td>
		<td>smoothness</td><td><img src="themes/smoothness.png"></td>
		<td>south-street</td><td><img src="themes/south-street.png"></td>
		<td>start</td><td><img src="themes/start.png"></td>
		<td>sunny</td><td><img src="themes/sunny.png"></td>
	</tr>
	<tr>
		<td>swanky-purse</td><td><img src="themes/swanky-purse.png"></td>
		<td>trontastic</td><td><img src="themes/trontastic.png"></td>
		<td>ui-darkness</td><td><img src="themes/ui-darkness.png"></td>
		<td>ui-lightness</td><td><img src="themes/ui-lightness.png"></td>
		<td>vader</td><td><img src="themes/vader.png"></td>
	</tr>
	</table>
</td></tr>
<tr><td>lang</td><td>No</td><td>"en"</td><td>To set the language, which is prepared in the multi language folder as a resource file.</td></tr>
</table>

