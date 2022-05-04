export interface IDistrict {
  id?: number;
  districtName?: string | null;
}

export class District implements IDistrict {
  constructor(public id?: number, public districtName?: string | null) {}
}

export function getDistrictIdentifier(district: IDistrict): number | undefined {
  return district.id;
}
