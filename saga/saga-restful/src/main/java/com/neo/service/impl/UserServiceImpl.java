package com.neo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.neo.entity.User;
import com.neo.service.UserService;

@Service
public class UserServiceImpl implements UserService{

//    @Autowired
//    private UserRepository userRepository;

    @Override
    public List<User> getUserList() {
//        return userRepository.findAll();
    	return null;
    }

    @Override
    public User findUserById(long id) {
//        return userRepository.findById(id);
    	return null;
    }

    @Override
    public void save(User user) {
//        userRepository.save(user);
    }

    @Override
    public void edit(User user) {
//        userRepository.save(user);
    }

    @Override
    public void delete(long id) {
//        userRepository.deleteById(id);
    }
}


