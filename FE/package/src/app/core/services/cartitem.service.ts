import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Cartitem } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class CartitemService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllCartitem(): Observable<ODataResponse> {
    let url = '/Cartitems?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Cartitem> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Cartitem
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getCartitemById(Id: any): Observable<ODataResponse> {
    let url = `/Cartitems?$filter=Id eq ${Id}&$expand=Cart
&$expand=Item
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Cartitem> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Cartitem
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateCartitem(formData: any): Observable<Cartitem> {
    let url = `/Cartitems`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateCartitem(formData: any, Id: any): Observable<Cartitem> {
    let url = `/Cartitems`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteCartitem(id: any): Observable<Cartitem> {
    return super.deleteEntity('/Cartitems', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getCartitemByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Cartitems?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Cartitem> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Cartitem
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
