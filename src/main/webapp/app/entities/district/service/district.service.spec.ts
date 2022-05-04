import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDistrict, District } from '../district.model';

import { DistrictService } from './district.service';

describe('District Service', () => {
  let service: DistrictService;
  let httpMock: HttpTestingController;
  let elemDefault: IDistrict;
  let expectedResult: IDistrict | IDistrict[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DistrictService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      districtName: 'AAAAAAA',
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

    it('should create a District', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new District()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a District', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          districtName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a District', () => {
      const patchObject = Object.assign(
        {
          districtName: 'BBBBBB',
        },
        new District()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of District', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          districtName: 'BBBBBB',
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

    it('should delete a District', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDistrictToCollectionIfMissing', () => {
      it('should add a District to an empty array', () => {
        const district: IDistrict = { id: 123 };
        expectedResult = service.addDistrictToCollectionIfMissing([], district);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(district);
      });

      it('should not add a District to an array that contains it', () => {
        const district: IDistrict = { id: 123 };
        const districtCollection: IDistrict[] = [
          {
            ...district,
          },
          { id: 456 },
        ];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, district);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a District to an array that doesn't contain it", () => {
        const district: IDistrict = { id: 123 };
        const districtCollection: IDistrict[] = [{ id: 456 }];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, district);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(district);
      });

      it('should add only unique District to an array', () => {
        const districtArray: IDistrict[] = [{ id: 123 }, { id: 456 }, { id: 44807 }];
        const districtCollection: IDistrict[] = [{ id: 123 }];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, ...districtArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const district: IDistrict = { id: 123 };
        const district2: IDistrict = { id: 456 };
        expectedResult = service.addDistrictToCollectionIfMissing([], district, district2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(district);
        expect(expectedResult).toContain(district2);
      });

      it('should accept null and undefined values', () => {
        const district: IDistrict = { id: 123 };
        expectedResult = service.addDistrictToCollectionIfMissing([], null, district, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(district);
      });

      it('should return initial array if no District is added', () => {
        const districtCollection: IDistrict[] = [{ id: 123 }];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, undefined, null);
        expect(expectedResult).toEqual(districtCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
