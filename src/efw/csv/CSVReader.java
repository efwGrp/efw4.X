/**** efw4.X Copyright 2022 efwGrp ****/
package efw.csv;

import java.io.FileInputStream;
import java.io.IOException;

public class CSVReader{

    private FileInputStream in;
    private String encoding;
    private long offsetBytes=0;
    private long offsetRows=0;

    private byte cb[];
    private int nChars, nextChar;

    private static final int INVALIDATED = -2;
    private static final int UNMARKED = -1;
    private int markedChar = UNMARKED;
    private int readAheadLimit = 0; /* Valid only when markedChar > 0 */

    private static int defaultCharBufferSize = 8192;
    private static int defaultExpectedLineLength = 80;

    /**
     * Create a CSV reader
     * @param in
     * @param encoding
     */
    public CSVReader(FileInputStream in,String encoding) {
        this.in = in;
        this.encoding=encoding;
        cb = new byte[defaultCharBufferSize];
        nextChar = nChars = 0;
    }
    /**
     * skip some bytes
     * @param n
     * @return
     * @throws IOException
     */
    public long skip(long offsetBytes,long offsetRows) throws IOException {
        synchronized (in) {
            this.offsetBytes=offsetBytes;
            this.offsetRows=offsetRows;
            return in.skip(offsetBytes);            
        }
    }
    /**
     * close
     * @throws IOException
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
     * read a line
     * @return
     * @throws IOException
     */
    public String readLine() throws IOException {
        StringBuffer s = null;
        int startChar;
        
        synchronized (in) {
            for (;;) {

                if (nextChar >= nChars)
                    fill();
                if (nextChar >= nChars) { /* EOF */
                    if (s != null && s.length() > 0) {
                        return new String(s.toString().getBytes(),this.encoding);
                    }else
                        return null;
                }
                // Skip a leftover '\r', if necessary 
                if (cb[nextChar] == '\r') {
                    nextChar++;offsetBytes++;
                }
                if (nextChar >= nChars) { /* EOF */
                	return null;
                }
                //Skip a leftover '\n', if necessary
                if (cb[nextChar] == '\n') {
                    nextChar++;offsetBytes++;
                }

                boolean eol = false;
                byte c = 0;
                int i;

                for (i = nextChar; i < nChars; i++,offsetBytes++) {
                    c = cb[i];
                    if ((c == '\n') || (c == '\r')) {
                        eol = true;
                        break;
                    }
                }

                startChar = nextChar;
                nextChar = i;

                if (eol) {
                    String str;
                    if (s == null) {
                        str = new String(cb, startChar, i - startChar);
                    } else {
                        s.append(new String(cb, startChar, i - startChar));
                        str = s.toString();
                    }
                    nextChar++;offsetBytes++;
                	offsetRows++;
                    return new String(str.getBytes(),this.encoding);
                }

                if (s == null)
                    s = new StringBuffer(defaultExpectedLineLength);
                s.append(new String(cb, startChar, i - startChar));
            }
        }
    }
    
    
    public double getCurrentOffsetBytes() {
    	return this.offsetBytes;
    }
    public double getCurrentOffsetRows() {
    	return this.offsetRows;
    }
    /**
     * Fills the input buffer, taking the mark into account if it is valid.
     */
    private void fill() throws IOException {
        int dst;
        if (markedChar <= UNMARKED) {
            /* No mark */
            dst = 0;
        } else {
            /* Marked */
            int delta = nextChar - markedChar;
            if (delta >= readAheadLimit) {
                /* Gone past read-ahead limit: Invalidate mark */
                markedChar = INVALIDATED;
                readAheadLimit = 0;
                dst = 0;
            } else {
                if (readAheadLimit <= cb.length) {
                    /* Shuffle in the current buffer */
                    System.arraycopy(cb, markedChar, cb, 0, delta);
                    markedChar = 0;
                    dst = delta;
                } else {
                    /* Reallocate buffer to accommodate read-ahead limit */
                	byte ncb[] = new byte[readAheadLimit];
                    System.arraycopy(cb, markedChar, ncb, 0, delta);
                    cb = ncb;
                    markedChar = 0;
                    dst = delta;
                }
                nextChar = nChars = delta;
            }
        }
        int n;
        do {
            n = in.read(cb, dst, cb.length - dst);
        } while (n == 0);
        if (n > 0) {
            nChars = dst + n;
            nextChar = dst;
        }
    }

}
