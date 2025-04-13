import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Itemimage } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class ItemimageService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllItemimage(): Observable<ODataResponse> {
    let url = '/Itemimages?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Itemimage> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Itemimage
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getItemimageById(Id: any): Observable<ODataResponse> {
    let url = `/Itemimages?$filter=Id eq ${Id}&$expand=Item
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Itemimage> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Itemimage
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateItemimage(formData: any): Observable<Itemimage> {
    let url = `/Itemimages`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateItemimage(formData: any, Id: any): Observable<Itemimage> {
    let url = `/Itemimages`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteItemimage(id: any): Observable<Itemimage> {
    return super.deleteEntity('/Itemimages', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getItemimageByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Itemimages?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Itemimage> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Itemimage
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
