package js.junkShop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import java.util.*;
import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class OrderEntity {
    @Id
    @GeneratedValue(generator = "uuid2", strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "CHAR(36)")
    @Type(type="uuid-char")
    private UUID orderId;
    @Type(type="uuid-char")
    private UUID productId;
    @Type(type="uuid-char")
    private UUID userId;
    @Type(type="uuid-char")
    private UUID districtId;
    @Type(type="uuid-char")
    private UUID wardId;
    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    private Date date;
    private String address;
}
