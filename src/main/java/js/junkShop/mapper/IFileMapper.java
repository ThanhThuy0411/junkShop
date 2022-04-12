package js.junkShop.mapper;

import java.util.*;
import js.junkShop.dto.file.FileDto;
import js.junkShop.entity.FileEntity;
import org.mapstruct.Mapper;


import java.util.List;

@Mapper(componentModel = "spring")
public interface IFileMapper {
    FileEntity fromFileDtoToFileEntity(FileDto dto);
    FileDto toFileDto(FileEntity fileEntity);
    List<FileDto> toFileDtos(List<FileEntity> fileEntity);

}
