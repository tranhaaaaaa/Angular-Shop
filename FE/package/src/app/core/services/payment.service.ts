import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Payment } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllPayment(): Observable<ODataResponse> {
    let url = '/Payments?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Payment> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Payment
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getPaymentById(Id: any): Observable<ODataResponse> {
    let url = `/Payments?$filter=Id eq ${Id}&$expand=Order
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Payment> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Payment
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreatePayment(formData: any): Observable<Payment> {
    let url = `/Payments`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdatePayment(formData: any, Id: any): Observable<Payment> {
    let url = `/Payments`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeletePayment(id: any): Observable<Payment> {
    return super.deleteEntity('/Payments', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getPaymentByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Payments?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Payment> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Payment
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
