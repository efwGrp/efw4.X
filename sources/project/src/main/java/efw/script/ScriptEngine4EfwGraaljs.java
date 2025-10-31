/**** efw4.X Copyright 2025 efwGrp ****/
package efw.script;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptException;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Engine;
import org.graalvm.polyglot.EnvironmentAccess;
import org.graalvm.polyglot.HostAccess;
import org.graalvm.polyglot.PolyglotAccess;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;
import org.graalvm.polyglot.io.IOAccess;

import cn.danielw.fop.ObjectFactory;
import cn.danielw.fop.ObjectPool;
import cn.danielw.fop.PoolConfig;
import cn.danielw.fop.Poolable;
import efw.efwScriptException;
import efw.framework;
import efw.file.FileManager;
/**
 * Graaljsエンジンを利用するクラス
 */
public class ScriptEngine4EfwGraaljs implements ScriptEngine4Efw {

    private Engine _se;
    
    private String ID="js";

    private ObjectPool<ScriptContext4EfwGraaljs> pool = null;
	/**
	 * ダミーコンストラクタ
	 */
	public ScriptEngine4EfwGraaljs(){super();}

    @Override
	public ScriptEngine se() {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

	@Override
	public void init() throws efwScriptException {
		try {
			//スレッドを跨る共有egineを作成する--------
			System.setProperty("polyglotimpl.AttachLibraryFailureAction", "ignore");
			System.setProperty("polyglotimpl.DisableMultiReleaseCheck", "true");//graaljs25から追加
			_se = Engine.newBuilder()
				.option("engine.WarnInterpreterOnly", "false")
				.build();
			//-------------ソースを作成する------------
			//スレッドを跨る共有ソースを作成する
			StringBuilder sb=new StringBuilder();
			sb.append(loadResource("efw/resources/modules/efw.js.ext.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.js"));
			sb.append(loadResource("efw/resources/modules/efw.js"));

			sb.append(loadResource("efw/resources/modules/efw.server.brms.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.cmd.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.cookie.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.db.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.event.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.file.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.format.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.mail.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.messages.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.properties.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.request.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.rest.js"));
			sb.append(loadResource("efw/resources/modules/efw.server.session.js"));
			
			sb.append(loadResource("efw/resources/classes/efw.server.batch.js"));
			sb.append(loadResource("efw/resources/classes/efw.server.binary.js"));
			sb.append(loadResource("efw/resources/classes/efw.server.csv.js"));
			sb.append(loadResource("efw/resources/classes/efw.server.excel.js"));
			sb.append(loadResource("efw/resources/classes/efw.server.pdf.js"));
			sb.append(loadResource("efw/resources/classes/efw.server.record.js"));
			sb.append(loadResource("efw/resources/classes/efw.server.result.js"));
			sb.append(loadResource("efw/resources/classes/efw.server.txt.js"));
			
			sb.append(loadResource("efw/resources/elfinder/elfinder_achive.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_checkRisk.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_cmds.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_download.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_downloadFileList.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_duplicate.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_extract.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_file.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_ls.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_mkdir.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_mkfile.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_open.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_parents.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_paste.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_preview.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_put.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_rename.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_rm.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_size.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_tree.js"));
			sb.append(loadResource("efw/resources/elfinder/elfinder_upload.js"));

			//リリースモードであれば全部イベントファイルをロードする
			if (!framework.getIsDebug()) {
				//システムのload関数を上書きする
				sb.append("function load(path){}");
				File[] lst=FileManager.getListByAbsolutePath(framework.getEventFolder());
				StringBuilder lg=new StringBuilder();
				lg.append("The following files are loaded:\n");
				for(int i=0;i<lst.length;i++) {
					lg.append(lst[i].getName()+"\n");
					sb.append(loadFile(lst[i].getAbsolutePath()));
				}
				framework.initCLog(lg.toString());
			}
			Source sc = Source.newBuilder(ID, sb.toString(),"efw.all.js").build();
			//--------------poolを作成する--------------------
			PoolConfig config = new PoolConfig();
			if (framework.getIsDebug()) {
				config.setPartitionSize(1);//debug時最大10threadがあれば十分と思う。
				config.setMaxSize(10);
				config.setMinSize(1);
				config.setMaxIdleMilliseconds(60 * 1000 * 5);	
			}else{
				config.setPartitionSize(10);//tomcatの内部threadの最大200ということ比較すると100は適切だと思う。
				config.setMaxSize(10);
				config.setMinSize(1);
				config.setMaxIdleMilliseconds(60 * 1000 * 5);	
			}
			
			ObjectFactory<ScriptContext4EfwGraaljs> factory = new ObjectFactory<ScriptContext4EfwGraaljs>() {
			    @Override public ScriptContext4EfwGraaljs create() {
					Context cxt=Context.newBuilder(ID)
							.allowHostAccess(HostAccess.ALL)
							.allowNativeAccess(true)
							.allowCreateThread(true)
							.allowIO(IOAccess.ALL)
							.allowHostClassLookup(s -> true)
							.allowHostClassLoading(true)
							.allowPolyglotAccess(PolyglotAccess.ALL)
							.allowHostAccess(HostAccess.ALL)
							.allowCreateProcess(true)
							.allowEnvironmentAccess(EnvironmentAccess.INHERIT)
							.allowInnerContextOptions(true)
							.allowValueSharing(true)
							.allowExperimentalOptions(true)
							.option("js.nashorn-compat", "true")
							.option("js.ecmascript-version", "latest")
							.engine(_se).build();
					ScriptContext4EfwGraaljs c=new ScriptContext4EfwGraaljs(cxt,sc);//コンテキストを作成する
			    	c.doInit();
					return c;
			    }
			    @Override public void destroy(ScriptContext4EfwGraaljs c) {
			    	c.doDestory();
			    }
			    @Override public boolean validate(ScriptContext4EfwGraaljs o) {
			        return true; 
			    }
			};
			pool = new ObjectPool<ScriptContext4EfwGraaljs>(config, factory);
		} catch (Exception e) {
			e.printStackTrace();
			throw new efwScriptException(e);
		}
	}

	@Override
	public String doPost(String req) throws efwScriptException {
		try(Poolable<ScriptContext4EfwGraaljs> obj = pool.borrowObject()){
			ScriptContext4EfwGraaljs c=obj.getObject();
			return c.doPost(req);
		}
	}

	@Override
	public void doDestroy() throws efwScriptException {
		try {
			pool.shutdown();
		} catch (InterruptedException e) {
			e.printStackTrace();
			throw new efwScriptException(e);
		}
	}

	@Override
	public String doBatch(String req) throws efwScriptException {
		try(Poolable<ScriptContext4EfwGraaljs> obj = pool.borrowObject()){
			ScriptContext4EfwGraaljs c=obj.getObject();
			return c.doBatch(req);
		}
	}

	@Override
	public String doRestAPI(String eventId, String reqKeys, String httpMethod, String reqParams) throws efwScriptException {
		try(Poolable<ScriptContext4EfwGraaljs> obj = pool.borrowObject()){
			ScriptContext4EfwGraaljs c=obj.getObject();
			return c.doRestAPI(eventId,reqKeys,httpMethod,reqParams);
		}
	}

	@Override
	public Object getJSON(String script) throws efwScriptException {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

	@Override
	public String callFunction(String funcNm, String reqParams) throws efwScriptException {
		try(Poolable<ScriptContext4EfwGraaljs> obj = pool.borrowObject()){
			ScriptContext4EfwGraaljs c=obj.getObject();
			return c.callFunction(funcNm, reqParams);
		}
	}

	@Override
	public boolean getBool(Map<String, Object> params, String script) throws efwScriptException {
		try(Context c=Context.newBuilder(ID)
				.allowHostAccess(HostAccess.ALL)
				.allowNativeAccess(true)
				.allowCreateThread(true)
				.allowIO(IOAccess.ALL)
				.allowHostClassLookup(s -> true)
				.allowHostClassLoading(true)
				.allowPolyglotAccess(PolyglotAccess.ALL)
				.allowHostAccess(HostAccess.ALL)
				.allowCreateProcess(true)
				.allowEnvironmentAccess(EnvironmentAccess.INHERIT)
				.allowInnerContextOptions(true)
				.allowValueSharing(true)
				.allowExperimentalOptions(true)
				.option("js.nashorn-compat", "true")
				.option("js.ecmascript-version", "latest")
				.engine(_se).build()){
			Value jsBindings = c.getBindings(ID);
			for(Map.Entry<String, Object> entry : params.entrySet()) {
				jsBindings.putMember(entry.getKey(), entry.getValue());
			}
			return c.eval(ID,script).asBoolean();
		}
	}

	/////////////////////////////////////////////////////
	/**
	 * 指定ファイル名のサーバーサイトJavaScriptファイルをロードする。
	 * @param fileName　サーバーサイトJavaScriptファイルの名称。
	 * @return ファイルの中身。
	 * @throws ScriptException スクリプトエラー。
	 * @throws IOException ファイル操作エラー。
	 */
	private String loadFile(String fileName) throws ScriptException, IOException  {
		BufferedReader rd=new BufferedReader(new InputStreamReader(
				new FileInputStream(fileName),framework.SYSTEM_CHAR_SET));
		StringBuffer buffer=new StringBuffer();
		String line=null;
		while((line=rd.readLine())!=null){
			buffer.append(line);
			buffer.append("\n");
		}
		rd.close();
		return buffer.toString();
	}
	/**
	 * Jarに含まれるjsをロードする。
	 * @param fileName　Jarファイル内のリソースのパス。
	 * @return ファイルの中身。
	 * @throws ScriptException スクリプトエラー。
	 * @throws IOException ファイル操作エラー。
	 */
	private String loadResource(String fileName) throws ScriptException, IOException  {
		BufferedReader rd=new BufferedReader(new InputStreamReader(
				Thread.currentThread().getContextClassLoader().getResourceAsStream(fileName),framework.SYSTEM_CHAR_SET));
		StringBuffer buffer=new StringBuffer();
		String line=null;
		while((line=rd.readLine())!=null){
			buffer.append(line);
			buffer.append("\n");
		}
		rd.close();
		return buffer.toString();
	}
}
