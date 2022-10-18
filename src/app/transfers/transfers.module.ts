import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersRoutingModule } from './transfers-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { transferReducer } from './store/transfers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransfersEffects } from './store/transfers.effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { NgbModule,NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { AngularIbanModule } from 'angular-iban';
import { ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TransfersRoutingModule,
    FormsModule,
    StoreModule.forFeature("mytransfers", transferReducer),
    EffectsModule.forFeature([TransfersEffects]),
    NgbModule,
    AngularIbanModule,
    ReactiveFormsModule
  ]
})
export class TransfersModule { }
