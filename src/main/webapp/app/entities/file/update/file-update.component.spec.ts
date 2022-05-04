import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FileService } from '../service/file.service';
import { IFile, File } from '../file.model';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { FileUpdateComponent } from './file-update.component';

describe('File Management Update Component', () => {
  let comp: FileUpdateComponent;
  let fixture: ComponentFixture<FileUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fileService: FileService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FileUpdateComponent],
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
      .overrideTemplate(FileUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FileUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fileService = TestBed.inject(FileService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const file: IFile = { id: 456 };
      const product: IProduct = { id: 31062 };
      file.product = product;

      const productCollection: IProduct[] = [{ id: 84841 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ file });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const file: IFile = { id: 456 };
      const product: IProduct = { id: 60025 };
      file.product = product;

      activatedRoute.data = of({ file });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(file));
      expect(comp.productsSharedCollection).toContain(product);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<File>>();
      const file = { id: 123 };
      jest.spyOn(fileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ file });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: file }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(fileService.update).toHaveBeenCalledWith(file);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<File>>();
      const file = new File();
      jest.spyOn(fileService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ file });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: file }));
      saveSubject.complete();

      // THEN
      expect(fileService.create).toHaveBeenCalledWith(file);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<File>>();
      const file = { id: 123 };
      jest.spyOn(fileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ file });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fileService.update).toHaveBeenCalledWith(file);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProductById', () => {
      it('Should return tracked Product primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProductById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
