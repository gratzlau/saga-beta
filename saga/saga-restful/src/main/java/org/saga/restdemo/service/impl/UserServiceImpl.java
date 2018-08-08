package org.saga.restdemo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.saga.restdemo.entity.User;
import org.saga.restdemo.mapper.UserMapper;
import org.saga.restdemo.service.UserService;

@Service
public class UserServiceImpl implements UserService{

//    @Autowired
//    private UserRepository userRepository;
	@Autowired
	private UserMapper userMapper;

    @Override
    public List<User> getUserList() {
//        return userRepository.findAll();
    	return userMapper.getAll();
    }

    @Override
    public User findUserById(long id) {
//        return userRepository.findById(id);
    	return userMapper.getOne(id);
    }

    @Override
    public void save(User user) {
//        userRepository.save(user);
    	userMapper.insert(user);
    }

    @Override
    public void edit(User user) {
//        userRepository.save(user);
    	userMapper.update(user);
    }

    @Override
    public void delete(long id) {
//        userRepository.deleteById(id);
    	userMapper.delete(id);
    }
}


