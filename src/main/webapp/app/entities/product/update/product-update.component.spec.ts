import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProductService } from '../service/product.service';
import { IProduct, Product } from '../product.model';
import { IWard } from 'app/entities/ward/ward.model';
import { WardService } from 'app/entities/ward/service/ward.service';
import { IDistrict } from 'app/entities/district/district.model';
import { DistrictService } from 'app/entities/district/service/district.service';

import { ProductUpdateComponent } from './product-update.component';

describe('Product Management Update Component', () => {
  let comp: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productService: ProductService;
  let wardService: WardService;
  let districtService: DistrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProductUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productService = TestBed.inject(ProductService);
    wardService = TestBed.inject(WardService);
    districtService = TestBed.inject(DistrictService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Ward query and add missing value', () => {
      const product: IProduct = { id: 456 };
      const ward: IWard = { id: 5527 };
      product.ward = ward;

      const wardCollection: IWard[] = [{ id: 72314 }];
      jest.spyOn(wardService, 'query').mockReturnValue(of(new HttpResponse({ body: wardCollection })));
      const additionalWards = [ward];
      const expectedCollection: IWard[] = [...additionalWards, ...wardCollection];
      jest.spyOn(wardService, 'addWardToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ product });
      comp.ngOnInit();

      expect(wardService.query).toHaveBeenCalled();
      expect(wardService.addWardToCollectionIfMissing).toHaveBeenCalledWith(wardCollection, ...additionalWards);
      expect(comp.wardsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call District query and add missing value', () => {
      const product: IProduct = { id: 456 };
      const district: IDistrict = { id: 98342 };
      product.district = district;

      const districtCollection: IDistrict[] = [{ id: 19545 }];
      jest.spyOn(districtService, 'query').mockReturnValue(of(new HttpResponse({ body: districtCollection })));
      const additionalDistricts = [district];
      const expectedCollection: IDistrict[] = [...additionalDistricts, ...districtCollection];
      jest.spyOn(districtService, 'addDistrictToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ product });
      comp.ngOnInit();

      expect(districtService.query).toHaveBeenCalled();
      expect(districtService.addDistrictToCollectionIfMissing).toHaveBeenCalledWith(districtCollection, ...additionalDistricts);
      expect(comp.districtsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const product: IProduct = { id: 456 };
      const ward: IWard = { id: 7396 };
      product.ward = ward;
      const district: IDistrict = { id: 5190 };
      product.district = district;

      activatedRoute.data = of({ product });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(product));
      expect(comp.wardsSharedCollection).toContain(ward);
      expect(comp.districtsSharedCollection).toContain(district);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Product>>();
      const product = { id: 123 };
      jest.spyOn(productService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ product });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: product }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(productService.update).toHaveBeenCalledWith(product);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Product>>();
      const product = new Product();
      jest.spyOn(productService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ product });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: product }));
      saveSubject.complete();

      // THEN
      expect(productService.create).toHaveBeenCalledWith(product);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Product>>();
      const product = { id: 123 };
      jest.spyOn(productService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ product });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productService.update).toHaveBeenCalledWith(product);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackWardById', () => {
      it('Should return tracked Ward primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackWardById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDistrictById', () => {
      it('Should return tracked District primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDistrictById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
