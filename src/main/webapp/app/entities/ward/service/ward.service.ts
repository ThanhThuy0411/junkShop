import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWard, getWardIdentifier } from '../ward.model';

export type EntityResponseType = HttpResponse<IWard>;
export type EntityArrayResponseType = HttpResponse<IWard[]>;

@Injectable({ providedIn: 'root' })
export class WardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/wards');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ward: IWard): Observable<EntityResponseType> {
    return this.http.post<IWard>(this.resourceUrl, ward, { observe: 'response' });
  }

  update(ward: IWard): Observable<EntityResponseType> {
    return this.http.put<IWard>(`${this.resourceUrl}/${getWardIdentifier(ward) as number}`, ward, { observe: 'response' });
  }

  partialUpdate(ward: IWard): Observable<EntityResponseType> {
    return this.http.patch<IWard>(`${this.resourceUrl}/${getWardIdentifier(ward) as number}`, ward, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addWardToCollectionIfMissing(wardCollection: IWard[], ...wardsToCheck: (IWard | null | undefined)[]): IWard[] {
    const wards: IWard[] = wardsToCheck.filter(isPresent);
    if (wards.length > 0) {
      const wardCollectionIdentifiers = wardCollection.map(wardItem => getWardIdentifier(wardItem)!);
      const wardsToAdd = wards.filter(wardItem => {
        const wardIdentifier = getWardIdentifier(wardItem);
        if (wardIdentifier == null || wardCollectionIdentifiers.includes(wardIdentifier)) {
          return false;
        }
        wardCollectionIdentifiers.push(wardIdentifier);
        return true;
      });
      return [...wardsToAdd, ...wardCollection];
    }
    return wardCollection;
  }
}
