import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetsComponent } from './components/tweets/tweets.component';

const routes: Routes = [
  {
    path: 'twitters',
    component: TweetsComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'twitters'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TwitterRoutingModule { }
