package js.junkShop.service.user;

import js.junkShop.dto.user.UserBasicDto;
import js.junkShop.dto.user.UserCreateDto;
import js.junkShop.entity.UserEntity;
import js.junkShop.mapper.IUserMapper;
import js.junkShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class UserService implements IUserService{
    private final UserRepository userRepo;
    @Autowired
//    private JwtUtil jwtTokenUtil;

    private final IUserMapper userMapper;

    public UserService(UserRepository userRepo, IUserMapper userMapper) {
        this.userRepo = userRepo;
        this.userMapper = userMapper;
    }

//hieu
//    @Override
//    public UserInfoDto login(AuthenticationRequestDto authenticationRequestDto) {
//        UserEntity userEntity = userRepo.findFirstByUsernameAndPassword(authenticationRequestDto.getUsername(),
//                authenticationRequestDto.getPassword());
//        if (userEntity != null) {
//            //Generate token
//            UserDetails userDetails = this.loadUserByUsername(authenticationRequestDto.getUsername());
//            final String token = jwtTokenUtil.generateToken(userDetails);
//
//            UserInfoDto userInfoDto = userMapper.toInfoDto(userEntity);
//            userInfoDto.setToken(token);
//            return userInfoDto;
//        }
//        return null;
//    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<UserEntity> user = userRepo.findByUsername(username);
//        user.orElseThrow(()-> new UsernameNotFoundException("Not found " +username));
//        return user.map(UserLoginDto::new).get();
//    }

    @Override
    public UserBasicDto createUser (UserCreateDto user) {
        UserEntity userEntity = userMapper.fromCreateToEntity(user);
        //check null, email and password validation
        if(userEntity.getName()==null || userEntity.getUsername() == null || userEntity.getPassword() == null || userEntity.getRole() == null
                || userEntity.getEmail() == null || userEntity.getAddress() == null || userEntity.getPhone() == null) {
            throw new IllegalArgumentException("Fields must not be null");
        }else if (!userEntity.getEmail().matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]" +
                "+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")){
            throw new IllegalArgumentException("Invalid email");
        }else if(!userEntity.getPassword().matches("^(?:(?=.*\\d)(?=.*[a-z]).*)[^\\s]{8,}$"))
//          at least 8 digits {8,}
//          at least one number (?=.*\d)
//          at least one lowercase (?=.*[a-z])
//          at least one uppercase (?=.*[A-Z])
//          at least one special character (?=.*[@#$%^&+=])
//          No space [^\s].
            throw new IllegalArgumentException("Invalid password");

        userEntity.setPassword(Base64.getEncoder().encodeToString((user.getUsername() + ":" + user.getPassword()).getBytes()));
        UserEntity returnUser = userRepo.save(userEntity);
        return userMapper.toBasicDto(returnUser);
    }



    /**
     * get user by userId
     *
     * @author tt0411
     * @param userId
     * @return basic user info
     */
    @Override
    public UserBasicDto getById(UUID userId){
        UserEntity userEntity = userRepo.findFirstByUserId(userId);
        if(userEntity != null) {
            return userMapper.toBasicDto(userEntity);
        }
        return null;
    }



    /**
     * delete user
     *
     * @author tt0411
     * @param userId
     * @return status 200
     */
    @Override
    public boolean delete(UUID userId){
        UserEntity userEntity = userRepo.findFirstByUserId(userId);
        if(userEntity != null) {
            userRepo.deleteByUserId(userId);
            return true;
        }
        return false;
    }

    /**
     * update user
     *
     * @author tt0411
     * @param user
     * @param userId
     * @return user info updated
     */
    //    @Override
    public UserBasicDto updateUser(UserBasicDto user, UUID userId) {
        UserEntity oldUser = userRepo.findFirstByUserId(userId);
        UserEntity userEntity = userMapper.fromBasicToEntity(user);
        //check null and format email
        if (userEntity.getName() == null || userEntity.getUsername() == null || userEntity.getRole() == null
                || userEntity.getEmail() == null || userEntity.getAddress() == null || userEntity.getPhone() == null) {
            throw new IllegalArgumentException("Fields must not be null");
        } else if (!userEntity.getEmail().matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]" +
                "+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"))
            throw new IllegalArgumentException("Invalid email");

            userEntity.setUserId(userId);
            userEntity.setPassword(oldUser.getPassword());
            UserEntity returnUser = userRepo.saveAndFlush(userEntity);
            return userMapper.toBasicDto(returnUser);
    }

    /**
     * list users
     *
     * @author tt0411
     * @return list user info
     */
        @Override
    public List <UserBasicDto> listAll() {
        List<UserEntity> users = userRepo.findAll();
        if(users.size() >0){
            return userMapper.toBasicDtos(users);
        }
        return new ArrayList<>();
    }
}
