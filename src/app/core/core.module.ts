import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorLoadingService } from './services/interceptors/interceptor-loading.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHeaderService } from './services/interceptors/interceptor-header.service';
import { TwitterModule } from '../module-twitter/twitter.module';
import { CoreRoutingModule } from './core-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { InterceptorCatchErrorsService } from './services/interceptors/interceptor-catch-errors.service';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    TwitterModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule,
    LoaderComponent
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHeaderService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorLoadingService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorCatchErrorsService,
      multi: true
    }
  ]
})
export class CoreModule { }
