import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OrderService } from '../service/order.service';
import { IOrder, Order } from '../order.model';
import { IWard } from 'app/entities/ward/ward.model';
import { WardService } from 'app/entities/ward/service/ward.service';
import { IDistrict } from 'app/entities/district/district.model';
import { DistrictService } from 'app/entities/district/service/district.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { OrderUpdateComponent } from './order-update.component';

describe('Order Management Update Component', () => {
  let comp: OrderUpdateComponent;
  let fixture: ComponentFixture<OrderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let orderService: OrderService;
  let wardService: WardService;
  let districtService: DistrictService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OrderUpdateComponent],
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
      .overrideTemplate(OrderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OrderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    orderService = TestBed.inject(OrderService);
    wardService = TestBed.inject(WardService);
    districtService = TestBed.inject(DistrictService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Ward query and add missing value', () => {
      const order: IOrder = { id: 456 };
      const ward: IWard = { id: 69 };
      order.ward = ward;

      const wardCollection: IWard[] = [{ id: 88041 }];
      jest.spyOn(wardService, 'query').mockReturnValue(of(new HttpResponse({ body: wardCollection })));
      const additionalWards = [ward];
      const expectedCollection: IWard[] = [...additionalWards, ...wardCollection];
      jest.spyOn(wardService, 'addWardToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ order });
      comp.ngOnInit();

      expect(wardService.query).toHaveBeenCalled();
      expect(wardService.addWardToCollectionIfMissing).toHaveBeenCalledWith(wardCollection, ...additionalWards);
      expect(comp.wardsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call District query and add missing value', () => {
      const order: IOrder = { id: 456 };
      const district: IDistrict = { id: 81781 };
      order.district = district;

      const districtCollection: IDistrict[] = [{ id: 15438 }];
      jest.spyOn(districtService, 'query').mockReturnValue(of(new HttpResponse({ body: districtCollection })));
      const additionalDistricts = [district];
      const expectedCollection: IDistrict[] = [...additionalDistricts, ...districtCollection];
      jest.spyOn(districtService, 'addDistrictToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ order });
      comp.ngOnInit();

      expect(districtService.query).toHaveBeenCalled();
      expect(districtService.addDistrictToCollectionIfMissing).toHaveBeenCalledWith(districtCollection, ...additionalDistricts);
      expect(comp.districtsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Product query and add missing value', () => {
      const order: IOrder = { id: 456 };
      const product: IProduct = { id: 51993 };
      order.product = product;

      const productCollection: IProduct[] = [{ id: 4055 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ order });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const order: IOrder = { id: 456 };
      const ward: IWard = { id: 53711 };
      order.ward = ward;
      const district: IDistrict = { id: 60838 };
      order.district = district;
      const product: IProduct = { id: 29956 };
      order.product = product;

      activatedRoute.data = of({ order });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(order));
      expect(comp.wardsSharedCollection).toContain(ward);
      expect(comp.districtsSharedCollection).toContain(district);
      expect(comp.productsSharedCollection).toContain(product);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Order>>();
      const order = { id: 123 };
      jest.spyOn(orderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ order });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: order }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(orderService.update).toHaveBeenCalledWith(order);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Order>>();
      const order = new Order();
      jest.spyOn(orderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ order });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: order }));
      saveSubject.complete();

      // THEN
      expect(orderService.create).toHaveBeenCalledWith(order);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Order>>();
      const order = { id: 123 };
      jest.spyOn(orderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ order });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(orderService.update).toHaveBeenCalledWith(order);
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

    describe('trackProductById', () => {
      it('Should return tracked Product primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProductById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
