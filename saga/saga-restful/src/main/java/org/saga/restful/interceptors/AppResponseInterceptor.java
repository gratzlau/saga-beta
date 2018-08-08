package org.saga.restful.interceptors;

import java.lang.reflect.Method;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.saga.restful.result.ResultDO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.alibaba.fastjson.JSON;

/**
 * @Description: 统一响应结果处理
 * Author lv bin
 * @date 2017/3/17 10:45
 * version V1.0.0
 */
@SuppressWarnings("hiding")
@ControllerAdvice
public class AppResponseInterceptor<Object> implements ResponseBodyAdvice<Object> {

    private Logger logger = LoggerFactory.getLogger(AppResponseInterceptor.class);

    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {

        return true;
    }


    @SuppressWarnings("unchecked")
	@Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass,
                                  ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
    	ResultDO<Object> result = null;
    	// 响应结果执行
        if(mediaType != null && o != null
                && mediaType.includes(MediaType.APPLICATION_JSON)){
//                && o instanceof ResultDO){

            if(serverHttpRequest instanceof ServletServerHttpRequest){

                ServletServerHttpRequest request = (ServletServerHttpRequest)serverHttpRequest;

                HttpServletRequest httpServletRequest = request.getServletRequest();

                Date requestTime = (Date) httpServletRequest.getAttribute(AppInterceptors.REQUEST_TIME);
                
                if(requestTime!=null) {
                	
                	long useTime = System.currentTimeMillis() - requestTime.getTime();
                	logger.debug("request link:" + serverHttpRequest.getURI() + " times:" + useTime  + "ms");
                }

                Method method = methodParameter.getMethod();

                logger.debug("request controller:" + method.getDeclaringClass() + " request method:" + method.getName());

            }

            o.getClass().getTypeName();
            
            result = new ResultDO<>();
        	result.setData(o);
        	o = (Object) result;
//        	System.out.println("response content:" + JSON.toJSONString(o));
            logger.info("response content:" + JSON.toJSONString(o));
        }

        return o;
    }

	
}
