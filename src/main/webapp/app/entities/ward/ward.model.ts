import { IDistrict } from 'app/entities/district/district.model';

export interface IWard {
  id?: number;
  wardName?: string | null;
  district?: IDistrict | null;
}

export class Ward implements IWard {
  constructor(public id?: number, public wardName?: string | null, public district?: IDistrict | null) {}
}

export function getWardIdentifier(ward: IWard): number | undefined {
  return ward.id;
}
