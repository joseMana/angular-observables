import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivesDemoComponent } from './features/component/directives-demo/directives-demo.component';
import { FormsDemoComponent } from './features/component/forms-demo/forms-demo.component';
import { ObservablesDemoComponent } from './features/component/observables-demo/observables-demo.component';
import { ReactiveFormsDemoComponent } from './features/component/reactive-forms-demo/reactive-forms-demo.component';

const routes: Routes = [
  { path: '', redirectTo: '/custom-directives', pathMatch: 'full' },
  { path: 'custom-directives', component: DirectivesDemoComponent },
  { path: 'forms', component: FormsDemoComponent },
  { path: 'reactive-forms', component: ReactiveFormsDemoComponent },
  { path: 'observables', component: ObservablesDemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
