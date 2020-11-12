import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class InterceptorCatchErrorsService {

  re: any = /authenticate/gi;
  recuperarPass: any = "/user/recuperar";

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }

          alert("Ha ocurrido un error: " + errorMessage);

          return throwError(errorMessage);
        })
      )
  }
}
