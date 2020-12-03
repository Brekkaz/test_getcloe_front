import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  baseUrl: string = 'http://homestead.test/api/people';

  constructor(private httpClient: HttpClient) {}

  getAll(offset: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        offset: String(offset),
        pageSize: String(pageSize),
        search: search || '',
      },
    });
    return this.httpClient.get(this.baseUrl, { params: params });
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
