import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, from, Observable, switchMap, tap, throwError } from 'rxjs';
import { ToastModel } from '../../core/model';
import { ToastService } from '../services/toast/toast.service';
import { IndexedDbService } from '../services/storage/indexed-db.service';
import { AppStoreService } from '../services/store/app-store.service';
import { Router } from '@angular/router';
import { APP_PAGES_PATH } from '../../core/constants/application_paths';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private _toastService: ToastService,
    private _indexedDbService: IndexedDbService,
    private _appStoreService: AppStoreService,
    private _router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     return from(this._indexedDbService.getItem("token")).pipe(
      switchMap((token: any) => {
        this._appStoreService.setLoading(true);
        if (token) {
          let modifiedReq = req.clone({
             headers: req.headers.append('X-Authentication-Token', token.value)
          });
          return next.handle(modifiedReq).pipe(
             tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  this._appStoreService.setLoading(false);
                }
              }
            )
          );
        } else {
          return next.handle(req).pipe(
             tap(
               (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  this._appStoreService.setLoading(false);
                }
               }
             )
          );;
        }
      }),
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
    let toast: ToastModel = { duration: 3 };
    let routerUrl: any = null
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        toast['message'] = err.error.error;
        toast['title'] = "401: Unauthorized request";
        this._indexedDbService.getItem("token").then((token: any) => {
          if (token.user_type == "admin") {
            routerUrl = APP_PAGES_PATH.ADMIN_SIGNIN_PATH;
          } else {
            routerUrl = APP_PAGES_PATH.CASHIER_SIGNIN_PATH;
          } 
        });
      } else {
        console.log( err.error);
        toast['title'] = err.statusText;
        toast['message'] =  err.error?.error || err.error.message;
      }
    } else {
      toast['title'] = "Error: ";
      toast['message'] = "An error occurred!";
    }

    this._toastService.error(toast);
    this._appStoreService.setLoading(false);
    if (routerUrl) {
      this._indexedDbService.deleteItem('token').then((res: any) => {
      this._toastService.success({title: 'Success!', message: "Logout successfully. Redirecting to log in screen."});
      this._router.navigate([routerUrl]);
     })
     
    }
    return throwError(() => err);
  }
}
