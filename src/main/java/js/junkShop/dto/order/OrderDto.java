package js.junkShop.dto.order;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class OrderDto {
    private UUID userId;
    private UUID productId;
    private UUID districtId;
    private UUID wardId;
    private Date date;
    private String address;
}
