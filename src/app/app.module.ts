import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectivesDemoComponent } from './features/component/directives-demo/directives-demo.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { Highlight2Directive } from './shared/directives/highlight2.directive';
import { IsAuthorizedDirective } from './shared/directives/is-authorized.directive';
import { FormsDemoComponent } from './features/component/forms-demo/forms-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsDemoComponent } from './features/component/reactive-forms-demo/reactive-forms-demo.component';
import { AgeValidatorDirective } from './shared/directives/age-validator.directive';
import { HotObservableComponent } from './features/component/observables-demo/hot-observable/hot-observable.component';
import { ColdObservableComponent } from './features/component/observables-demo/cold-observable/cold-observable.component';
import { ObservablesDemoComponent } from './features/component/observables-demo/observables-demo.component'

@NgModule({
  declarations: [
    AppComponent,
    DirectivesDemoComponent,
    HighlightDirective,
    Highlight2Directive,
    IsAuthorizedDirective,
    FormsDemoComponent,
    ReactiveFormsDemoComponent,
    AgeValidatorDirective,
    HotObservableComponent,
    ColdObservableComponent,
    ObservablesDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
