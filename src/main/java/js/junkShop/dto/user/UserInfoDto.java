package js.junkShop.dto.user;

import js.junkShop.enumration.UserGender;
import lombok.Data;

import java.util.UUID;

@Data
public class UserInfoDto {
    private UUID userId;
    private String name;
    private String email;
    private String address;
    private UserGender gender;
    private String phone;
    private String token;
}
