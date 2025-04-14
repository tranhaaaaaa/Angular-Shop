import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../model/odata-response';
import { Review } from '../model/db.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllReview(): Observable<ODataResponse> {
    let url = '/Reviews?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Review> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Review
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getReviewById(Id: any): Observable<ODataResponse> {
    let url = `/Reviews?$filter=Id eq ${Id}&$expand=Item
&$expand=User
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Review> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Review
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateReview(formData: any): Observable<Review> {
    let url = `/Reviews`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateReview(formData: any, Id: any): Observable<Review> {
    let url = `/Reviews`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteReview(id: any): Observable<Review> {
    return super.deleteEntity('/Reviews', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getReviewByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Reviews?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Review> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Review
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
