package com.neo.repository;

//import org.springframework.data.jpa.repository.JpaRepository;

import com.neo.entity.User;

//public interface UserRepository extends JpaRepository<User, Long> {
public interface UserRepository  {

    User findById(long id);

//    Long deleteById(Long id);
}