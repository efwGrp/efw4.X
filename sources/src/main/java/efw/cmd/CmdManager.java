/**** efw4.X Copyright 2025 efwGrp ****/
package efw.cmd;

import java.io.IOException;

import efw.CmdExecuteException;
/**
 * コマンド実行を管理するクラス。
 * @author kejun.chang
 *
 */
public final class CmdManager {
	/**
	 * ダミーコンストラクタ
	 */
	public CmdManager(){super();}

	/**
	 * コマンドを実行する。
	 * <p><strong>Security Note:</strong> This method executes OS commands using ProcessBuilder.
	 * Callers MUST validate all parameters before passing them to this method, especially
	 * when parameters originate from untrusted sources (HTTP requests, user input, etc.).
	 * The validation in this method is defense-in-depth only and does NOT constitute
	 * the primary security boundary.</p>
	 * <p>Applications using the efw framework should perform input validation in event JS
	 * before invoking cmd.execute(), as event JS is the trust boundary where HTTP parameters
	 * enter the system.</p>
	 *
	 * @param params コマンドとパラメータの配列。First element is the executable path,
	 *               remaining elements are arguments passed to that executable.
	 * @throws CmdExecuteException コマンド実行エラー。
	 */
	public static void execute(String[] params) throws CmdExecuteException {
		try {
			if (params == null || params.length == 0) {
				throw new CmdExecuteException(params, "params is empty.");
			}
			// Defense-in-depth validation: reject parameters containing shell metacharacters.
			// NOTE: ProcessBuilder does NOT invoke a shell, so these characters are not directly
			// exploitable for command injection. However, certain argument patterns may still be
			// dangerous depending on the executable being invoked. Primary validation should occur
			// in calling code (event JS) before untrusted input reaches this method.
			for (String param : params) {
				if (param == null || param.matches(".*[;&|`$<>\\\\\"'\\n\\r].*")) {
					throw new CmdExecuteException(params, "params contains invalid character.");
				}
			}
			ProcessBuilder pb = new ProcessBuilder(params);
			Process process = pb.start();
			//InputStreamのスレッド開始
			InputStreamThread it = new InputStreamThread(process.getInputStream());
			InputStreamThread et = new InputStreamThread(process.getErrorStream());
			it.start();
			et.start();
			//プロセスの終了待ち
			process.waitFor();
			//InputStreamのスレッド終了待ち
			it.join();
			et.join();
			//標準出力の内容を出力
			for (String s : it.getStringList()) {
				System.out.println(s);
			}
			//標準エラーの内容を出力
			for (String s : et.getStringList()) {
				System.err.println(s);
			}
			
			int ret=process.exitValue();
			if (ret!=0) {
				throw new CmdExecuteException(params,"");
			}
		}catch(CmdExecuteException e) {
			throw e;
		}catch(IOException e) {
			throw new CmdExecuteException(params,e.getMessage());
		}catch(InterruptedException e) {
			throw new CmdExecuteException(params,e.getMessage());
		}
	}
}
