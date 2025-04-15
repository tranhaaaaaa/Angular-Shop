import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Order } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllOrder(): Observable<ODataResponse> {
    let url = '/Orderses?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Order> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Order
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getOrderById(Id: any): Observable<ODataResponse> {
    let url = `/Orderses?$filter=Id eq ${Id}&$expand=Address
&$expand=User
&$expand=Orderdetails
&$expand=Payments
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Order> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Order
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateOrder(formData: any): Observable<Order> {
    let url = `/Orderses`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateOrder(formData: any, Id: any): Observable<Order> {
    let url = `/Orders`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteOrder(id: any): Observable<Order> {
    return super.deleteEntity('/Orders', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getOrderByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Orderses?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Order> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Order
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
