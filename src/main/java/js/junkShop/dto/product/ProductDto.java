package js.junkShop.dto.product;

import js.junkShop.enumration.ProductType;
import js.junkShop.enumration.Status;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class ProductDto {
    private String name;
    private ProductType type;
    private Integer price;
    private UUID userId;
    private UUID districtId;
    private UUID wardId;
    private String address;
    private String description;
    private Status status;
    private Date date;
}
