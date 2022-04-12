package js.junkShop.repository;

import js.junkShop.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    UserEntity findFirstByUserId(UUID userId);
    UserEntity findFirstByUsernameAndPassword(String username, String password);
    Optional<UserEntity> findByUsername(String username);
    void deleteByUserId(UUID userId);
}
