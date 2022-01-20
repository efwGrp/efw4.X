/**** efw4.X Copyright 2022 efwGrp ****/
package efw;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * SameSiteFilterはcookieにSameSiteとSecureを追加
 * Cors機能のため
 * @author Chang Kejun
 */
@WebFilter(filterName="efwCorsFilter", urlPatterns={"*.jsp","/efwServlet","/efwRestAPI","/uploadServlet","/downloadServlet","/drawServlet"})
public final class efwCorsFilter implements Filter {
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req=(HttpServletRequest)request;
		HttpServletResponse res=(HttpServletResponse) response;
		if ("OPTIONS".equals(req.getMethod())){
			efwCorsFilter.doCORSPreflight(req, res);
			return;
		}else {
			chain.doFilter(request, response);
			efwCorsFilter.doCORS(req, res);
			Collection<String> headers = res.getHeaders("Set-Cookie");
			boolean firstHeader = true;
			for (String header : headers) {  
				if (firstHeader) {
					res.setHeader("Set-Cookie", String.format("%s; %s", header, "SameSite=None; Secure"));
					firstHeader = false;
					continue;
				}
				res.addHeader("Set-Cookie", String.format("%s; %s", header, "SameSite=None; Secure"));
			}
		}
	}
	//CORS対応
	private static void doCORSPreflight(HttpServletRequest request, HttpServletResponse response){
		//if init is failed, return the info instead of throw exception
		if (framework.getInitSuccessFlag()){
			response.setHeader("Access-Control-Allow-Headers", "Connection,Content-Length,Content-Type,Host,Origin,Referer,User-Agent,X-Requested-With");
			//cors support
			if("*".equals(framework.getCors())){
				response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
			}else if("null".equals(framework.getCors())||"".equals(framework.getCors())||null==framework.getCors()){
				//do nothing
			}else{
				String[] corsAry=framework.getCors().split(",");
				for(int i=0;i<corsAry.length;i++){
					if (corsAry[i].equals(request.getHeader("Origin"))){
						response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
						break;
					}
				}
			}
			response.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
			response.setHeader("Access-Control-Allow-Credentials", "true");
		}
	}
	private static void doCORS(HttpServletRequest request, HttpServletResponse response){
		//if init is failed, return the info instead of throw exception
		if (framework.getInitSuccessFlag()){
			//cors support
			if("*".equals(framework.getCors())){
				response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
			}else if("null".equals(framework.getCors())||"".equals(framework.getCors())||null==framework.getCors()){
				//do nothing
			}else{
				String[] corsAry=framework.getCors().split(",");
				for(int i=0;i<corsAry.length;i++){
					if (corsAry[i].equals(request.getHeader("Origin"))){
						response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
						break;
					}
				}
			}
			response.setHeader("Access-Control-Allow-Credentials", "true");
		}
	}
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {}
	@Override
	public void destroy() {}
}
