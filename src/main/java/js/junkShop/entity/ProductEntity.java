package js.junkShop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import js.junkShop.enumration.ProductType;
import js.junkShop.enumration.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name ="product")
public class ProductEntity {
    @Id
    @GeneratedValue(generator = "uuid2", strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "CHAR(36)")
    @Type(type="uuid-char")
    private UUID productId;
    private String name;
    @Enumerated(EnumType.STRING)
    private ProductType type;
    private Integer price;
    @Type(type="uuid-char")
    private UUID userId;
    @Type(type="uuid-char")
    private UUID districtId;
    @Type(type="uuid-char")
    private UUID wardId;
    private String address;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    private Date date;

}
