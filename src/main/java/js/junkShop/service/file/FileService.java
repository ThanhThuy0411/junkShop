package js.junkShop.service.file;

import js.junkShop.dto.file.FileDto;
import js.junkShop.entity.FileEntity;
import js.junkShop.mapper.IFileMapper;
import js.junkShop.repository.FileRepository;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class FileService implements IFileService {
    private final FileRepository fileRepo;
    private final IFileMapper fileMapper;
    public FileService(FileRepository fileRepo, IFileMapper fileMapper) {
        this.fileRepo = fileRepo;
        this.fileMapper = fileMapper;
    }

    public FileDto createFile (FileDto file) {
        FileEntity fileEntity = fileMapper.fromFileDtoToFileEntity(file);
        FileEntity returnFile = fileRepo.save(fileEntity);
        return fileMapper.toFileDto(returnFile);
    }

    public FileDto updateFile (FileDto fileDto, UUID fileId){
        FileEntity fileEntity = fileMapper.fromFileDtoToFileEntity(fileDto);
        fileEntity.setFileId(fileId);
        FileEntity returnFile = fileRepo.save(fileEntity);
        return fileMapper.toFileDto(returnFile);
    }


    public boolean delete(UUID fileId) {
        FileEntity fileEntity = fileRepo.findFirstByFileId(fileId);
        if(fileEntity != null){
           fileRepo.deleteById(fileId);
           return true;
        }
        return false;
    }


    public FileDto getById (UUID fileId){
        FileEntity fileEntity = fileRepo.findFirstByFileId(fileId);
        if(fileEntity != null){
            return fileMapper.toFileDto(fileEntity);
        }
        return  null;
    }


    @Override
    public List<FileDto> getByProductId(UUID productId) {
        List<FileEntity> fileEntity2 = fileRepo.findByProductId(productId);
        if (fileEntity2 != null){
            return fileMapper.toFileDtos(fileEntity2);
        }
        return null;
    }

    @Override
    public void deleteByProductId(UUID productId) {
        List<FileEntity> fileEntities = fileRepo.findByProductId(productId);
        for(FileEntity file : fileEntities) {
            delete(file.getFileId());
        }
    }

}
