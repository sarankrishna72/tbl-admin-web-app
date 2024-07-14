import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastModel } from '../../core/model';
import { ToastService } from '../services/toast/toast.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private _toastService: ToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // You can use your service here

    // Modify or handle the request here
    const modifiedReq = req.clone({
      // Modify the request if needed
    });

    // Pass the modified request on to the next handler
    return next.handle(modifiedReq).pipe(
      catchError((err: any) => {
        return this.checkHttpError(err);
     })
    );
  }


  /**
   * Check  if any status errors and to the toast
   *
   * @return {*}
   * @memberof StatusError
   */
  checkHttpError(err: any) {
    let toast: ToastModel = { duration: 3 }
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        toast['message'] = err.error.error;
        toast['title'] = "401: Unauthorized request";
      } else {
        toast['title'] = err.statusText;
        toast['message'] = err.error.error;
      }
    } else {
      toast['title'] = "Error: ";
      toast['message'] = "An error occurred!"
    }

    this._toastService.error(toast)
    return throwError(() => err);
  }
}
