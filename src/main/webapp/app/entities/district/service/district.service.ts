import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDistrict, getDistrictIdentifier } from '../district.model';

export type EntityResponseType = HttpResponse<IDistrict>;
export type EntityArrayResponseType = HttpResponse<IDistrict[]>;

@Injectable({ providedIn: 'root' })
export class DistrictService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/districts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(district: IDistrict): Observable<EntityResponseType> {
    return this.http.post<IDistrict>(this.resourceUrl, district, { observe: 'response' });
  }

  update(district: IDistrict): Observable<EntityResponseType> {
    return this.http.put<IDistrict>(`${this.resourceUrl}/${getDistrictIdentifier(district) as number}`, district, { observe: 'response' });
  }

  partialUpdate(district: IDistrict): Observable<EntityResponseType> {
    return this.http.patch<IDistrict>(`${this.resourceUrl}/${getDistrictIdentifier(district) as number}`, district, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDistrict>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDistrict[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDistrictToCollectionIfMissing(districtCollection: IDistrict[], ...districtsToCheck: (IDistrict | null | undefined)[]): IDistrict[] {
    const districts: IDistrict[] = districtsToCheck.filter(isPresent);
    if (districts.length > 0) {
      const districtCollectionIdentifiers = districtCollection.map(districtItem => getDistrictIdentifier(districtItem)!);
      const districtsToAdd = districts.filter(districtItem => {
        const districtIdentifier = getDistrictIdentifier(districtItem);
        if (districtIdentifier == null || districtCollectionIdentifiers.includes(districtIdentifier)) {
          return false;
        }
        districtCollectionIdentifiers.push(districtIdentifier);
        return true;
      });
      return [...districtsToAdd, ...districtCollection];
    }
    return districtCollection;
  }
}
