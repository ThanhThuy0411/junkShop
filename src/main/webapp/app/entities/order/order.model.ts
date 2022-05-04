import dayjs from 'dayjs/esm';
import { IWard } from 'app/entities/ward/ward.model';
import { IDistrict } from 'app/entities/district/district.model';
import { IProduct } from 'app/entities/product/product.model';
import { IUser } from './../../admin/user-management/user-management.model';

export interface IOrder {
  id?: number;
  date?: dayjs.Dayjs | null;
  address?: string | null;
  ward?: IWard | null;
  district?: IDistrict | null;
  product?: IProduct | null;
  user?: IUser | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public address?: string | null,
    public ward?: IWard | null,
    public district?: IDistrict | null,
    public product?: IProduct | null,
    public user?: IUser | null
  ) {}
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
