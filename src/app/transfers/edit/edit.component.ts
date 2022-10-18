import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Transfer } from '../store/transfer';
import { selectTransferById } from '../store/transfers.selector';
import { switchMap } from "rxjs"
import { invokeUpdateTransferAPI } from '../store/transfers.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from 'angular-iban';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public reactiveForm: FormGroup;

  public IBAN: FormControl;

  constructor(private store:Store, private route:ActivatedRoute,
    private router:Router, private appStore:Store<Appstate>, private fb: FormBuilder ) { }

  transferForm:Transfer = {
    id: 0,
    account_holder: '',
    IBAN: '',
    date: '',
    amount: 0,
    note: '',
  }

  ngOnInit(): void {

    this.IBAN = new FormControl(
      null,
        [
          Validators.required,
          ValidatorService.validateIban
        ]
    );

    this.reactiveForm = this.fb.group({
      IBAN: this.IBAN,
    });

    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectTransferById(id)))
      })
    )

    

    fetchFormData$.subscribe((data) => {
      if(data){
        this.transferForm = {...data}
      }
      else{
        this.router.navigate(['/'])
      }
    })
  }

  update(){
    this.store.dispatch(invokeUpdateTransferAPI({ payload: {...this.transferForm} }));

    let appState$ = this.appStore.pipe(select(selectAppState));
    appState$.subscribe((data)=>{
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'', apiResponseMessage: ''}}))
        this.router.navigate(['./'])
      }
    })
  }

}
