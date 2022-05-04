import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistrictDetailComponent } from './district-detail.component';

describe('District Management Detail Component', () => {
  let comp: DistrictDetailComponent;
  let fixture: ComponentFixture<DistrictDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ district: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DistrictDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DistrictDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load district on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.district).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
