import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Role } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllRole(): Observable<ODataResponse> {
    let url = '/Roles?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Role> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Role
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getRoleById(Id: any): Observable<ODataResponse> {
    let url = `/Roles?$filter=Id eq ${Id}&$expand=UserRoles
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Role> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Role
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateRole(formData: any): Observable<Role> {
    let url = `/Roles`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateRole(formData: any, Id: any): Observable<Role> {
    let url = `/Roles`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteRole(id: any): Observable<Role> {
    return super.deleteEntity('/Roles', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getRoleByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Roles?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Role> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Role
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
