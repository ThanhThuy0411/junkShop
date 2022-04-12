package js.junkShop.mapper;

import js.junkShop.dto.user.UserBasicDto;
import js.junkShop.dto.user.UserCreateDto;
import js.junkShop.dto.user.UserInfoDto;
import js.junkShop.entity.UserEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IUserMapper {
    UserEntity fromCreateToEntity(UserCreateDto dto);
    UserEntity fromBasicToEntity(UserBasicDto dto);
    UserBasicDto toBasicDto(UserEntity userEntity);
    UserInfoDto toInfoDto(UserEntity userEntity);
    List<UserBasicDto> toBasicDtos(List<UserEntity> users);
}
