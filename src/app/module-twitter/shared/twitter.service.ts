import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }


  public getTweets(url: string): Observable<any> {
    url = `${this.apiURL}${url}`
    return this.http
      .get<any>(url)
      .pipe(
        map((response) => {
          return response;
        }));
  }

  public postTweets(url: string, params: any): Observable<any[]> {
    url = `${this.apiURL}${url}`
    return this.http
      .post<any>(url, params)
      .pipe(
        map((response) => {
          return response;
        }));
  }


  public putTweets(url: string, params: any): Observable<any[]> {
    url = `${this.apiURL}${url}`
    return this.http
      .put<any>(url, params)
      .pipe(
        map((response) => {
          return response;
        }));
  }
}
