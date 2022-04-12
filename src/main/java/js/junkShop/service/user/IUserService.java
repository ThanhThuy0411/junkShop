package js.junkShop.service.user;

import js.junkShop.dto.user.UserBasicDto;
import js.junkShop.dto.user.UserCreateDto;
import js.junkShop.dto.user.UserInfoDto;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    UserBasicDto createUser(UserCreateDto user) throws Exception;
    UserBasicDto getById(UUID userId);
    boolean delete(UUID userId);
    UserBasicDto updateUser(UserBasicDto dto, UUID userId) throws Exception;
    List<UserBasicDto> listAll();
//    UserInfoDto login(AuthenticationRequestDto authenticationRequestDto);
//    UserDetails loadUserByUsername(String username);
}
