package js.junkShop.service.file;

import js.junkShop.dto.file.FileDto;

import java.util.List;
import java.util.UUID;

public interface IFileService {
    FileDto createFile (FileDto file);
    FileDto updateFile (FileDto file, UUID fileId);
    FileDto getById (UUID fileId);
    boolean delete(UUID fileId);
    List<FileDto> getByProductId(UUID productId);
    void deleteByProductId(UUID productId);
}
