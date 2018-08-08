package org.saga.restdemo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.saga.restdemo.entity.User;

@Mapper
public interface UserMapper {
	
	List<User> getAll();
	
	User getOne(Long id);

	void insert(User user);

	void update(User user);

	void delete(Long id);

}