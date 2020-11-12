import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../module-twitter/twitter.module').then(m => m.TwitterModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
