package backend.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import backend.backend.model.Users;

public interface UsersRepo extends JpaRepository<Users, Integer> {

    @Query("SELECT u FROM Users u WHERE u.username = :username")
    Users getUserByUsername(String username);
}