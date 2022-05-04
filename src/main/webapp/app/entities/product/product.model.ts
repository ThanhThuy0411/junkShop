import { IUser } from './../../admin/user-management/user-management.model';
import dayjs from 'dayjs/esm';
import { IFile } from 'app/entities/file/file.model';
import { IWard } from 'app/entities/ward/ward.model';
import { IDistrict } from 'app/entities/district/district.model';
import { ProductType } from 'app/entities/enumerations/product-type.model';
import { ProductStatus } from 'app/entities/enumerations/product-status.model';

export interface IProduct {
  id?: number;
  productName?: string;
  productType?: ProductType | null;
  price?: number | null;
  address?: string | null;
  description?: string | null;
  productStatus?: ProductStatus | null;
  date?: dayjs.Dayjs | null;
  files?: IFile[] | null;
  ward?: IWard | null;
  district?: IDistrict | null;
  user?: IUser | null;

}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public productName?: string,
    public productType?: ProductType | null,
    public price?: number | null,
    public address?: string | null,
    public description?: string | null,
    public productStatus?: ProductStatus | null,
    public date?: dayjs.Dayjs | null,
    public files?: IFile[] | null,
    public ward?: IWard | null,
    public district?: IDistrict | null,
    public user?: IUser | null,
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
