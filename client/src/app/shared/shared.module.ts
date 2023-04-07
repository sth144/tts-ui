import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// TODO: shared module
import { MatIconModule } from '@angular/material/icon';
import { StateService } from './state/state.service';
import { NgxsModule } from '@ngxs/store';
import { RootState } from './state/root.state';

const sharedDeclarations: any[] = [];
const sharedImports = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  MatIconModule,
  NgxsModule.forRoot([RootState]),
];
const sharedProviders: any[] = [StateService];

@NgModule({
  declarations: sharedDeclarations,
  imports: sharedImports,
  providers: sharedProviders,
  exports: [...sharedDeclarations, ...sharedImports],
})
export class SharedModule {}
