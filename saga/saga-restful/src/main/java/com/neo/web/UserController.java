package com.neo.web;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.neo.entity.User;
import com.neo.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    UserService userService;


    @RequestMapping(method = RequestMethod.GET)
    public String list(User user) {
        return "user/list";
    }

    @RequestMapping(value = "{id}",method = RequestMethod.GET)
    public String get(@PathVariable("id") Long id) {
    	System.out.println("id:"+id);
    	return "user/get"+id;
    }


    @RequestMapping(method = RequestMethod.POST)
    public String add(User user) {
        userService.save(user);
        return "user/add";
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


    @RequestMapping(value = "{id}",method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        System.out.println("id:"+id);
        return "user/update"+id;
    }
}
