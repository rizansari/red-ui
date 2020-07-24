import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserComponent } from './ui/browser/browser.component';
import { InfoComponent } from './ui/info/info.component';
import { MonitorComponent } from './ui/monitor/monitor.component';

const routes: Routes = [
  {
    path: 'browser',
    component: BrowserComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'monitor',
    component: MonitorComponent
  },
  {
    path: '',
    redirectTo: 'browser',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
