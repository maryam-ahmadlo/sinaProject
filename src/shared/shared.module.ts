import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HasRoleDirective } from './directives';




const DIRECTIVES = [
  HasRoleDirective,];

@NgModule({
  declarations: [ ...DIRECTIVES],
  exports: [ ...DIRECTIVES],
  imports: [CommonModule],
  providers: [AsyncPipe, ...DIRECTIVES],
})
export class SharedModule {}