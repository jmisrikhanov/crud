import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Transfer } from '../store/transfer';
import { invokeSaveTransferAPI } from '../store/transfers.action';

import {NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from 'angular-iban';



@Component({
  selector: 'app-add', 
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})




export class AddComponent implements OnInit {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      console.log(value)
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }

  addForm= new FormGroup({
    account_holder: new FormControl('', Validators.required),
    // IBAN: new FormControl('', Validators.required),
    transferDate: new FormControl('', Validators.required),
    transferAmount: new FormControl('', [Validators.required, Validators.pattern('[0-9.,]+')]),

  })


  model: NgbDateStruct

  public reactiveForm: FormGroup;

  public IBAN: FormControl;


  constructor(private store:Store, private appStore: Store<Appstate>, private router:Router, private fb: FormBuilder) { }

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
  
  }

  save(){
    
    this.store.dispatch(invokeSaveTransferAPI({payload: {...this.transferForm}}));

    
    let appState$ = this.appStore.pipe(select(selectAppState));
    appState$.subscribe((data)=>{
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'', apiResponseMessage: ''}}))
        this.router.navigate(['./'])
      }
    })
  }

  get account_holder(){return this.addForm.get('account_holder')}
  get transferDate(){return this.addForm.get('transferDate')}
  get transferAmount(){return this.addForm.get('transferAmount')}
}

