package js.junkShop.dto.user;

import js.junkShop.enumration.UserGender;
import js.junkShop.enumration.UserRole;
import lombok.Data;

import java.util.*;

@Data
public class UserCreateDto {
    private String username;
    private String password;
    private String name;
    private String email;
    private String address;
    private String phone;
    private Date birthDay;
    private UserGender gender;
    private UserRole role;
}
