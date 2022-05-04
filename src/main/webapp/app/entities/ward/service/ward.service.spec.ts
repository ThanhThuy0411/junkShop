import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWard, Ward } from '../ward.model';

import { WardService } from './ward.service';

describe('Ward Service', () => {
  let service: WardService;
  let httpMock: HttpTestingController;
  let elemDefault: IWard;
  let expectedResult: IWard | IWard[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WardService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      wardName: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Ward', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Ward()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ward', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          wardName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ward', () => {
      const patchObject = Object.assign({}, new Ward());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ward', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          wardName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Ward', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addWardToCollectionIfMissing', () => {
      it('should add a Ward to an empty array', () => {
        const ward: IWard = { id: 123 };
        expectedResult = service.addWardToCollectionIfMissing([], ward);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ward);
      });

      it('should not add a Ward to an array that contains it', () => {
        const ward: IWard = { id: 123 };
        const wardCollection: IWard[] = [
          {
            ...ward,
          },
          { id: 456 },
        ];
        expectedResult = service.addWardToCollectionIfMissing(wardCollection, ward);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ward to an array that doesn't contain it", () => {
        const ward: IWard = { id: 123 };
        const wardCollection: IWard[] = [{ id: 456 }];
        expectedResult = service.addWardToCollectionIfMissing(wardCollection, ward);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ward);
      });

      it('should add only unique Ward to an array', () => {
        const wardArray: IWard[] = [{ id: 123 }, { id: 456 }, { id: 21047 }];
        const wardCollection: IWard[] = [{ id: 123 }];
        expectedResult = service.addWardToCollectionIfMissing(wardCollection, ...wardArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ward: IWard = { id: 123 };
        const ward2: IWard = { id: 456 };
        expectedResult = service.addWardToCollectionIfMissing([], ward, ward2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ward);
        expect(expectedResult).toContain(ward2);
      });

      it('should accept null and undefined values', () => {
        const ward: IWard = { id: 123 };
        expectedResult = service.addWardToCollectionIfMissing([], null, ward, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ward);
      });

      it('should return initial array if no Ward is added', () => {
        const wardCollection: IWard[] = [{ id: 123 }];
        expectedResult = service.addWardToCollectionIfMissing(wardCollection, undefined, null);
        expect(expectedResult).toEqual(wardCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
