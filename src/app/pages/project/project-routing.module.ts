import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectPage } from './project.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectPage
  },
  {
    path: 'form',
    loadChildren: () => import('./modal/form/form.module').then( m => m.FormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule {}
