import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { UserRole } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllUserRole(): Observable<ODataResponse> {
    let url = '/UserRoles?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<UserRole> = this.jsonConvert.deserializeArray(
          odataRes.value,
          UserRole
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getUserRoleById(Id: any): Observable<ODataResponse> {
    let url = `/UserRoles?$filter=Id eq ${Id}&$expand=Role
&$expand=User
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<UserRole> = this.jsonConvert.deserializeArray(
          odateRes.value,
          UserRole
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateUserRole(formData: any): Observable<UserRole> {
    let url = `/UserRoles`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateUserRole(formData: any, Id: any): Observable<UserRole> {
    let url = `/UserRoles`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteUserRole(id: any): Observable<UserRole> {
    return super.deleteEntity('/UserRoles', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getUserRoleByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/UserRoles?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<UserRole> = this.jsonConvert.deserializeArray(
          odataRes.value,
          UserRole
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
