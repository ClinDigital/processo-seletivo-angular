import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SecureAreaComponent } from './components/layout/secure-area/secure-area.component';
import { PageInfoComponent } from './pages/page-info/page-info.component';
import { authGuard } from './services/auth.guard';
import { PageRegisterComponent } from './pages/page-register/page-register.component';

const routes: Routes = [
  { path: 'home', component: PageHomeComponent },
  {
    path: 'session',
    component: SecureAreaComponent,
    children: [
      { path: 'list', component: PageListComponent },
      { path: 'edit/:id', component: PageInfoComponent },
      { path: 'new', component: PageInfoComponent },
    ],
    canActivate: [
      authGuard
    ]
  },
  { path: "register", component: PageRegisterComponent },
  { path: "**", redirectTo: "home", pathMatch: "full" },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
