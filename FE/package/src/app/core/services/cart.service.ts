import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Cart } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllCart(): Observable<ODataResponse> {
    let url = '/Carts?$expand=Cartitems($expand=Item($expand=Itemimages))?$Orderby=CartId DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Cart> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Cart
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getCartById(Id: any): Observable<ODataResponse> {
    let url = `/Carts?$filter=Id eq ${Id}&$expand=User
&$expand=Cartitems
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Cart> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Cart
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateCart(formData: any): Observable<Cart> {
    let url = `/Carts`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateCart(formData: any, Id: any): Observable<Cart> {
    let url = `/Carts`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteCart(id: any): Observable<Cart> {
    return super.deleteEntity('/Carts', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getCartByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Carts?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Cart> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Cart
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
