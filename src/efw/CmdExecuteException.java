/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * Cmd実行エラー。
 */
public final class CmdExecuteException extends efwException {
	public CmdExecuteException(String[] params,String message) {
		super("params = "+CmdExecuteException.join(params)+"; error = "+message);
	}
	private static String join(String[] params) {
		StringBuffer bf=new StringBuffer();
		bf.append("[");
		for(int i=0;i<params.length;i++) {
			bf.append(params[i]);
			if (i!=params.length-1) {
				bf.append(",");
			}
		}
		bf.append("]");
		return bf.toString();
	}
}
