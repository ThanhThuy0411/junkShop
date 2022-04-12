package js.junkShop.controller;

import js.junkShop.dto.user.UserBasicDto;
import js.junkShop.dto.user.UserCreateDto;
import js.junkShop.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
public class UserController {
    @Autowired
//    private AuthenticationManager authenticationManager;

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserBasicDto>> list() {
        try {
            List<UserBasicDto> users = userService.listAll();
            return new ResponseEntity<>(users, HttpStatus.OK);
        }catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/user")
    public  ResponseEntity<UserBasicDto> create(@RequestBody UserCreateDto newUser) throws Exception {
        try {
            UserBasicDto userReturn = userService.createUser(newUser);
            return new ResponseEntity<>(userReturn,HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<UserBasicDto> get(@PathVariable UUID userId) {
        try {
            UserBasicDto user = userService.getById(userId);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/user/{userId}")
    public ResponseEntity<UserBasicDto> update(@RequestBody UserBasicDto user, @PathVariable UUID userId) throws Exception {
        try {
            UserBasicDto userDto = userService.updateUser(user,userId);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<HttpStatus> delete(@PathVariable UUID userId) {
        try {
            userService.delete(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
