import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDistrict, District } from '../district.model';
import { DistrictService } from '../service/district.service';

@Injectable({ providedIn: 'root' })
export class DistrictRoutingResolveService implements Resolve<IDistrict> {
  constructor(protected service: DistrictService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDistrict> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((district: HttpResponse<District>) => {
          if (district.body) {
            return of(district.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new District());
  }
}
