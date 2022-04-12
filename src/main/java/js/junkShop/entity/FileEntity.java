package js.junkShop.entity;


import js.junkShop.enumration.FileType;
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
@Table(name = "file")
public class FileEntity {
    @Id
    @GeneratedValue(generator = "uuid2", strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "CHAR(36)")
    @Type(type="uuid-char")
    private UUID fileId;
    private String name;
    @Enumerated(EnumType.STRING)
    private FileType type;
    @Type(type="uuid-char")
    private UUID productId;
    private String url;
}
