package js.junkShop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import js.junkShop.enumration.UserGender;
import js.junkShop.enumration.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(generator = "uuid2", strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "CHAR(36)")
    @Type(type="uuid-char")
    private UUID userId;
    private String username;
    private String password;
    private String name;
    private String email;
    private String address;
    private String phone;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date birthday;
    @Enumerated(EnumType.STRING)
    private UserGender gender;
    @Enumerated(EnumType.STRING)
    private UserRole role;


}
