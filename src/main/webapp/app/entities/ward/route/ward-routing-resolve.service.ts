import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWard, Ward } from '../ward.model';
import { WardService } from '../service/ward.service';

@Injectable({ providedIn: 'root' })
export class WardRoutingResolveService implements Resolve<IWard> {
  constructor(protected service: WardService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWard> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ward: HttpResponse<Ward>) => {
          if (ward.body) {
            return of(ward.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ward());
  }
}
