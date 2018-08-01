package org.saga.designpatten.delegator;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Hashtable;
import java.util.Map;

public class Delegator4Map extends Delegator {
//    private static Log _log = LogFactory.getLog(Delegator4Map.class);
    private Map<?, ?> orginClass = null; //原始对象
    private Map<?, ?> proxyClass = null; //代理对象

    public Map<?, ?> getOrgin() {
        return orginClass;
    }

    public Map<?, ?> getProxy() {
        return proxyClass;
    }

    public Delegator4Map(Map<?, ?> orgin) {
        super(orgin);
        orginClass = orgin;
        proxyClass = (Map<?, ?>) super.obj_proxy;
    }

    public Object invoke(Object obj, Method method, Object[] args) throws Throwable {
        if (method.getName().equals("size")) { //修改size处理逻辑
            Object res2 = new Integer(-1);
            System.out.println("调用委托的方法");
            return res2;
        } else {
            System.out.println("调用原始的方法");
            return super.invoke(obj, method, args);
        }
    }

    public static void main(String[] args) throws IOException {
        Delegator4Map rtm = new Delegator4Map(new Hashtable<Object, Object>());
        Map<?, ?> m = rtm.getProxy();
        m.size();
    }
}
