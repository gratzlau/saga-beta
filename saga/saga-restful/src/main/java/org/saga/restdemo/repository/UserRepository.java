package org.saga.restdemo.repository;

import org.saga.restdemo.entity.User;

//public interface UserRepository extends JpaRepository<User, Long> {
public interface UserRepository  {

    User findById(long id);

//    Long deleteById(Long id);
}