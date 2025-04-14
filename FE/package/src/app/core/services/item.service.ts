import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Item } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllItem(): Observable<ODataResponse> {
    let url = '/Items?$expand=ItemDetails,Itemimages&$Orderby=ItemId DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Item> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Item
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getItemById(Id: any): Observable<ODataResponse> {
    let url = `/Items?$filter=ItemId eq ${Id}&$expand=Category
&$expand=CreatedByNavigation
&$expand=Cartitems
&$expand=Itemdetails
&$expand=Itemimages
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Item> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Item
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateItem(formData: any): Observable<Item> {
    let url = `/Items`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateItem(formData: any, Id: any): Observable<Item> {
    let url = `/Items`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteItem(id: any): Observable<Item> {
    return super.deleteEntity('/Items', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getItemByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Items?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Item> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Item
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
