import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Category } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllCategory(): Observable<ODataResponse> {
    let url = '/Categories?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Category
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getCategoryById(Id: any): Observable<ODataResponse> {
    let url = `/Categories?$filter=Id eq ${Id}&$expand=Items
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Category
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateCategory(formData: any): Observable<Category> {
    let url = `/Categories`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateCategory(formData: any, Id: any): Observable<Category> {
    let url = `/Categories`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteCategory(id: any): Observable<Category> {
    return super.deleteEntity('/Categories', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getCategoryByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Categories?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Category
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
