import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TransfersService } from "../transfers.service";
import { transfersFetchAPISuccess, deleteTransferAPISuccess, invokeTransfersAPI, invokeDeleteTransferAPI, invokeSaveTransferAPI, invokeUpdateTransferAPI, saveTransferAPISuccess, updateTransferAPISuccess } from "./transfers.action";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs"
import { select, Store } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectTransfers } from "./transfers.selector";

@Injectable()
export class TransfersEffects {
    constructor(private action$:Actions,
        private transferService: TransfersService, private appStore: Store<Appstate>,
        private store: Store
        ){}

    loadAllTransfers$ = createEffect(() => 
        this.action$.pipe(
            ofType(invokeTransfersAPI),
            withLatestFrom(this.store.pipe(select(selectTransfers))),
            switchMap(([,transfersFromStore]) => {
                if(transfersFromStore.length > 0){
                    return EMPTY;
                }
                return this.transferService.get()
                .pipe(map((data) => transfersFetchAPISuccess({allTransfers: data})))
            })
        )
    )

    saveNewTransfer$ = createEffect(()=> 
        this.action$.pipe(
            ofType(invokeSaveTransferAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.transferService
                .create(action.payload)
                .pipe(map((data) =>  {
                    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return saveTransferAPISuccess({response: data})
                }))
            })
        ));

    updateTransfer$ = createEffect(()=> 
        this.action$.pipe(
            ofType(invokeUpdateTransferAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.transferService
                .update(action.payload)
                .pipe(map((data) =>  {
                    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return updateTransferAPISuccess({response: data})
                }))
            })
        ))

    deleteTransfer$ = createEffect(()=> 
        this.action$.pipe(
            ofType(invokeDeleteTransferAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.transferService
                .delete(action.id)
                .pipe(map((data) =>  {
                    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return deleteTransferAPISuccess({id: action.id})
                }))
            })
        ))
}
