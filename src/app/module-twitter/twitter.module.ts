import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent } from './components/tweets/tweets.component';
import { TwitterRoutingModule } from './twitter-routing.module';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    TweetsComponent
  ],
  imports: [
    CommonModule,
    TwitterRoutingModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class TwitterModule { }
