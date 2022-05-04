import { IProduct } from 'app/entities/product/product.model';
import { FileType } from 'app/entities/enumerations/file-type.model';

export interface IFile {
  id?: number;
  fileName?: string;
  fileType?: FileType | null;
  url?: string | null;
  product?: IProduct | null;
}

export class File implements IFile {
  constructor(
    public id?: number,
    public fileName?: string,
    public fileType?: FileType | null,
    public url?: string | null,
    public product?: IProduct | null
  ) {}
}

export function getFileIdentifier(file: IFile): number | undefined {
  return file.id;
}
