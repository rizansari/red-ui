import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularSplitModule } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './ui/header/header.component';
import { SidepanelComponent } from './ui/sidepanel/sidepanel.component';
import { MainpanelComponent } from './ui/mainpanel/mainpanel.component';
import { BrowserComponent } from './ui/browser/browser.component';
import { InfoComponent } from './ui/info/info.component';
import { MonitorComponent } from './ui/monitor/monitor.component';
import { SidepanelListComponent } from './ui/sidepanel-list/sidepanel-list.component';
import { SidepanelTreeComponent } from './ui/sidepanel-tree/sidepanel-tree.component';
import { MainpanelStringComponent } from './ui/mainpanel-string/mainpanel-string.component';
import { MainpanelHashComponent } from './ui/mainpanel-hash/mainpanel-hash.component';
import { MainpanelSetComponent } from './ui/mainpanel-set/mainpanel-set.component';
import { MainpanelListComponent } from './ui/mainpanel-list/mainpanel-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidepanelComponent,
    MainpanelComponent,
    BrowserComponent,
    InfoComponent,
    MonitorComponent,
    SidepanelListComponent,
    SidepanelTreeComponent,
    MainpanelStringComponent,
    MainpanelHashComponent,
    MainpanelSetComponent,
    MainpanelListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularSplitModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
