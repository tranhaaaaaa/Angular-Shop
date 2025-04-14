import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { User } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllUser(): Observable<ODataResponse> {
    let url = '/Users?$Orderby=UserId DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<User> = this.jsonConvert.deserializeArray(
          odataRes.value,
          User
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getUserById(Id: any): Observable<ODataResponse> {
    let url = `/Users?$filter=UserId eq ${Id}&$expand=Addresses
&$expand=Carts
&$expand=Items
&$expand=Orders
&$expand=UserRoles
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<User> = this.jsonConvert.deserializeArray(
          odateRes.value,
          User
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateUser(formData: any): Observable<User> {
    let url = `/Users`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateUser(formData: any, Id: any): Observable<User> {
    let url = `/Users`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteUser(id: any): Observable<User> {
    return super.deleteEntity('/Users', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getUserByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Users?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<User> = this.jsonConvert.deserializeArray(
          odataRes.value,
          User
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
