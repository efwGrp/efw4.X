/**** efw4.X Copyright 2022 efwGrp ****/
package efw.csv;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;

/**
 * CSVを読み込むクラス。
 * @author kejun.chang
 *
 */
public final class CSVReader{

    private FileInputStream in;
    private String encoding;
    private long offsetBytes=0;
    private long offsetRows=0;

    private byte cb[];
    private int nChars, nextChar;

    private static final int defaultCharBufferSize = 8192;
    private byte CRLFCodeAry[]=null;
    
    /**
     * @param in ファイルインプットストリーム。
     * @param encoding エンコード。
     * @param CRLFCode 改行コード。
     */
    public CSVReader(FileInputStream in,String encoding,String CRLFCode) {
        this.in = in;
        this.encoding=encoding;
        cb = new byte[defaultCharBufferSize];
        nextChar = nChars = 0;
        if (CRLFCode!=null&&!"".equals(CRLFCode)) {
        	CRLFCodeAry=CRLFCode.getBytes();
        }else {
        	CRLFCodeAry="\r\n".getBytes();
        }
    }
    /**
     * 指定バイト数をスキップする。
     * @param offsetBytes スキップバイト数。
     * @param offsetRows スキップ行数。
     * @return 実際スキップバイト数。
     * @throws IOException 通信エラー。
     */
    public long skip(long offsetBytes,long offsetRows) throws IOException {
        synchronized (in) {
            this.offsetBytes=offsetBytes;
            this.offsetRows=offsetRows;
            return in.skip(offsetBytes);
        }
    }
    /**
     * CSVを閉じる。
     * @throws IOException 通信エラー。
     */
    public void close() throws IOException {
        synchronized (in) {
            if (in == null)
                return;
            try {
                in.close();
            } finally {
                in = null;
                cb = null;
            }
        }
    }

    /**
     * 一行を取得する。
     * @return 行の内容。
     * @throws IOException 通信エラー。
     */
    public String readLine() throws IOException {
        byte dst[]=new byte[0];
        synchronized (in) {
            for (;;) {

                if (nextChar >= nChars) {
                    offsetBytes+=nChars;//まえのbufferが処理済み、offsetに入れる。
                	int n = in.read(cb, 0, cb.length);
                    if (n > 0) {
                        nextChar = 0;//次は0番の位置から
                        nChars = n;
                    }else {//EOF
                        if (dst != null && dst.length > 0) {
                        	offsetRows++;
                            return new String(dst,this.encoding);
                        }else {
                            return null;
                        }
                    }
                }
                ////////////////////////////////////////////
                int startChar = nextChar;
                
                byte lastCRLFChar=CRLFCodeAry[CRLFCodeAry.length-1];
                for (; nextChar < nChars; nextChar++) {
                	byte c = cb[nextChar];
                	//改行マークの最後のバイトと一致する場合
                	if (c==lastCRLFChar) {
                		boolean isCRLF=true;
                		int compareChar=nextChar;
                		for (int i=CRLFCodeAry.length-1;i>-1 && compareChar>-1;i--,compareChar--) {
                			if (cb[compareChar]!=CRLFCodeAry[i]) {
                				isCRLF=false;
                				break;
                			}
                		}
                		if (isCRLF) {
                			break;
                		}
                	}
                }

            	byte part[]=Arrays.copyOfRange(cb, startChar,nextChar);
            	byte newDst[]=new byte[part.length+dst.length];
            	System.arraycopy(dst,0,newDst,0,dst.length);
            	System.arraycopy(part,0,newDst,dst.length,part.length);
            	dst=newDst;
            	if (nextChar < nChars) {
                    offsetRows++;nextChar++;
                    return new String(dst,0,dst.length-(CRLFCodeAry.length-1),this.encoding);
                }
            }
        }
    }
    
    /**
     * 現在のバイト数を取得する。
     * @return バイト数。
     */
    public double getCurrentOffsetBytes() {
    	return this.offsetBytes+nextChar;
    }
    /**
     * 現在の行数を取得する。
     * @return 行数。
     */
    public double getCurrentOffsetRows() {
    	return this.offsetRows;
    }


}
