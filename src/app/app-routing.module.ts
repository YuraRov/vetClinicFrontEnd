import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/userDashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
  {
    path: 'doctors',
    loadChildren: () => import('./features/doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: 'procedures',
    loadChildren: () => import('./features/procedures/procedures.module').then(m => m.ProceduresModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/companyBlog/company-blog.module').then(m => m.CompanyBlogModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
