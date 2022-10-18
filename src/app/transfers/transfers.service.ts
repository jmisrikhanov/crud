import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Transfer } from './store/transfer';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor(private http:HttpClient) { }

  get(){
    return this.http.get<Transfer[]>("http://localhost:3000/transfers")
  }

  create(payload:Transfer){
    return this.http.post<Transfer>("http://localhost:3000/transfers", payload)
  }

  update(payload:Transfer){
    return this.http.put<Transfer>(`http://localhost:3000/transfers/${payload.id}`, payload)
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/transfers/${id}`)
  }
}

