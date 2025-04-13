import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Orderdetail } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class OrderdetailService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllOrderdetail(): Observable<ODataResponse> {
    let url = '/Orderdetails?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Orderdetail> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Orderdetail
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getOrderdetailById(Id: any): Observable<ODataResponse> {
    let url = `/Orderdetails?$filter=Id eq ${Id}&$expand=ItemDetail
&$expand=Order
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Orderdetail> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Orderdetail
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateOrderdetail(formData: any): Observable<Orderdetail> {
    let url = `/Orderdetails`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateOrderdetail(formData: any, Id: any): Observable<Orderdetail> {
    let url = `/Orderdetails`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteOrderdetail(id: any): Observable<Orderdetail> {
    return super.deleteEntity('/Orderdetails', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getOrderdetailByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Orderdetails?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Orderdetail> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Orderdetail
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
