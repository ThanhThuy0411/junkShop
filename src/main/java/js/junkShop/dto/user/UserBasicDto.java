package js.junkShop.dto.user;

import js.junkShop.enumration.UserGender;
import js.junkShop.enumration.UserRole;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;
import java.util.UUID;

@Data
public class UserBasicDto {
    private UUID userId;
    private String username;
    private String name;
    private String email;
    private String address;
    private String phone;
    private Date birthDay;
    private UserGender gender;
    private UserRole role;
}
