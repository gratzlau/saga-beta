package org.saga.restdemo.web;

import java.util.List;

import javax.annotation.Resource;

import org.saga.restdemo.entity.User;
import org.saga.restdemo.service.UserService;
import org.saga.restful.result.ResultDO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    UserService userService;


    @RequestMapping(method = RequestMethod.GET)
    public List<User> list(User user) {
        return userService.getUserList();
//        return "user/list";
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public String get(@PathVariable("id") Long id) {
    	System.out.println("id:"+id);
    	return "user/get"+id;
    }


   /* @RequestMapping(method = RequestMethod.POST,produces="application/json;charset=UTF-8")
    public ResultDO<User> add(User user) {
    	ResultDO<User> result = new ResultDO<>();
    	result.setData(user);
        userService.save(user);
//        return "user/add";
        return result;
    }*/
    @RequestMapping(method = RequestMethod.POST, produces="application/json;charset=UTF-8")
//    @RequestMapping(method = RequestMethod.POST)
    public User add(User user) {
    	ResultDO<User> result = new ResultDO<>();
    	result.setData(user);
    	userService.save(user);
//        return "user/add";
    	return user;
    }


    @RequestMapping(method = RequestMethod.PUT)
    public String update(User user) {
        userService.edit(user);
        return "user/update";
    }
    
    @RequestMapping(method = RequestMethod.PATCH)
    public String patch(User user) {
        userService.edit(user);
        return "user/patch";
    }


    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return "user/delete"+id;
    }
}
