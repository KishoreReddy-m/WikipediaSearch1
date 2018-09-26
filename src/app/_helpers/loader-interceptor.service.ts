/*
Inter cepeterr is used show/hide the loader
*/
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../_services/loader-service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.showLoader();

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.hideLoader(); // response
      }
    },
      (err: any) => {
        this.hideLoader(); // error
      }));

  }

  // show loader
  private showLoader(): void {
    this.loaderService.show();
  }
  // hide loader
  private hideLoader(): void {
    this.loaderService.hide();
  }

}
