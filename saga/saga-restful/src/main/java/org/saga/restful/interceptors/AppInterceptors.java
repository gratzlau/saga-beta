package org.saga.restful.interceptors;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @Package org.jon.lv.interceptors.AppInterceptors
 * @Description: AppInterceptors
 * Author lv bin
 * @date 2017/5/16 13:12
 * version V1.0.0
 */
@Configuration
public class AppInterceptors implements WebMvcConfigurer{
	private Logger logger = LoggerFactory.getLogger(AppInterceptors.class);

    public static String REQUEST_TIME = "http_request_time";

    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptorAdapter() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                                     Object handler) throws Exception {
                request.setAttribute(REQUEST_TIME, new Date());
//                System.out.println("interceptor====1111111111111");
                logger.debug("interceptorApp===="+request.getRequestURL());
                return true;
            }
        }).addPathPatterns("/user/**", "/kafka/**");
    }

}
/*@Configuration
public class AppInterceptors extends WebMvcConfigurationSupport{
	
	public static String REQUEST_TIME = "http_request_time";
	
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new HandlerInterceptorAdapter() {
			@Override
			public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
					Object handler) throws Exception {
				request.setAttribute(REQUEST_TIME, new Date());
				System.out.println("interceptor====1111111111111");
				return true;
			}
		}).addPathPatterns("/user/**", "/kafka/**");
	}
	
	
	
	@Override
	protected void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/sh/static/**").addResourceLocations("classpath:/static/");
		super.addResourceHandlers(registry);
	}
}
*/

/*@Configuration
public class AppInterceptors extends WebMvcConfigurerAdapter {

    public static String REQUEST_TIME = "http_request_time";

    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptorAdapter() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                                     Object handler) throws Exception {
                request.setAttribute(REQUEST_TIME, new Date());
                System.out.println("interceptor====1111111111111");
                return true;
            }
        }).addPathPatterns("/user/**", "/kafka/**");
    }
}*/


