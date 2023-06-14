package efw.cmd;

import efw.CmdExecuteException;

public final class CmdManager {
	public static void execute(String[] params) throws CmdExecuteException {
		try {
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
		}catch(Exception e) {
			throw new CmdExecuteException(params,e.getMessage());
		}
	}
}
