package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import backend.backend.model.Users;
import backend.backend.repos.UsersRepo;

@Service
public class ProfileService {

    @Autowired
    UsersRepo usersRepo;

    public Users getDetails(int id) throws Exception {
        return usersRepo.findById(id).orElseThrow(() -> new Exception("No element with desired Id"));
    }

    public void updateUser(Users user) {
        usersRepo.save(user);
    }
}
