import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// TODO: shared module
import { MatIconModule } from '@angular/material/icon';

const sharedDeclarations: any[] = [];
const sharedImports = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  MatIconModule,
];
const sharedProviders: any[] = [];

@NgModule({
  declarations: sharedDeclarations,
  imports: sharedImports,
  providers: sharedProviders,
  exports: [...sharedDeclarations, ...sharedImports, ...sharedProviders],
})
export class SharedModule {}
