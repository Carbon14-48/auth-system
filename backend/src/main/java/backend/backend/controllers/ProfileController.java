package backend.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import backend.backend.model.Users;
import backend.backend.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @GetMapping("/profile/{id}")
    public ResponseEntity<Users> getDetails(@PathVariable("id") int id) {
        try {
            Users user = profileService.getDetails(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/profile/{id}")
    public void UpdateUser(@RequestBody Users user) {
        profileService.updateUser(user);
    }
}
