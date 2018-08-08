package org.saga.restful.utils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * 解决ajax跨域
 * @author gavin
 * @time   2018年8月16日
 */
/*@Component
@ServletComponentScan
@WebFilter(urlPatterns = "/*",filterName = "corsFilter")*/
public class CorsFilter implements Filter {

    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(CorsFilter.class);

    public void doFilter(ServletRequest req, ServletResponse resp,  
    		FilterChain chain) throws IOException, ServletException {  
    		HttpServletResponse res = (HttpServletResponse) resp;
    		logger.info("corsFilter=="+req.getRemoteAddr());
            
            
    		// 这里最好不要写通配符，如果允许多个域请求数据的话，可以直接用逗号隔开："http://www.baidu.com,http://google.com"  
    		  
    		res.setHeader("Access-Control-Allow-Origin", "*");  
    		  
    		res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");  
    		  
    		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept,X-Requested-With");  
    		  
    		//res.setHeader("Access-Control-Allow-Credentials","false");  
    		  
    		chain.doFilter(req, resp);  
    		  
    		}  
    public void init(FilterConfig filterConfig) {}
    public void destroy() {}
}