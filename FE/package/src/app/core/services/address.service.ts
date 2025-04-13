import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Address } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllAddress(): Observable<ODataResponse> {
    let url = '/Addresses?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Address> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Address
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getAddressById(Id: any): Observable<ODataResponse> {
    let url = `/Addresses?$filter=Id eq ${Id}&$expand=User
&$expand=Orders
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Address> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Address
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateAddress(formData: any): Observable<Address> {
    let url = `/Addresses`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateAddress(formData: any, Id: any): Observable<Address> {
    let url = `/Addresses`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteAddress(id: any): Observable<Address> {
    return super.deleteEntity('/Addresses', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getAddressByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Addresses?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Address> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Address
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
