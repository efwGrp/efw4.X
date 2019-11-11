/**** efw4.X Copyright 2019 efwGrp ****/
package efw.mail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public final class MailAuthenticator extends Authenticator {
	
	String userName = "";
    String password = "";

    public MailAuthenticator() {

    }

    public MailAuthenticator(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName, password);
    }

}
