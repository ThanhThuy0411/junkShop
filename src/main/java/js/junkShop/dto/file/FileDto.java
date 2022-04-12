package js.junkShop.dto.file;

import js.junkShop.enumration.FileType;
import lombok.Data;

import java.util.UUID;

@Data
public class FileDto {
    private String name;
    private FileType type;
    private UUID productId;
    private String url;
}
