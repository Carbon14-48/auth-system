package backend.backend.model;

import java.util.Date;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

@Entity
@Table(name = "users")
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public Users(int id, String email, String password, Date creationDate, String username) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.creationDate = creationDate;
        this.username = username;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "Users [id=" + id + ", email=" + email + ", password=" + password + ", creationDate=" + creationDate
                + ", username=" + username + "]";
    }

    private String email;
    private String password;
    private Date creationDate;
    @Column(nullable = true, unique = true)
    private String username;

    public boolean isPresent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'isPresent'");
    }

}