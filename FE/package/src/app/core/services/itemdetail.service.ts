import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Itemdetail } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class ItemdetailService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllItemdetail(): Observable<ODataResponse> {
    let url = '/Itemdetails?$expand=Item($expand=Itemimages)&$Orderby=ItemDetailId DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Itemdetail> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Itemdetail
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getItemdetailById(Id: any): Observable<ODataResponse> {
    let url = `/Itemdetails?$filter=ItemDetailId eq ${Id}&$expand=Item
&$expand=Orderdetails
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Itemdetail> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Itemdetail
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateItemdetail(formData: any): Observable<Itemdetail> {
    let url = `/Itemdetails`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateItemdetail(formData: any, Id: any): Observable<Itemdetail> {
    let url = `/Itemdetails`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteItemdetail(id: any): Observable<Itemdetail> {
    return super.deleteEntity('/Itemdetails', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getItemdetailByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Itemdetails?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Itemdetail> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Itemdetail
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
