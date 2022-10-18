import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Transfer } from "./transfer";


export const selectTransfers = createFeatureSelector<Transfer[]>("mytransfers");

export const selectTransferById = (transferId:number) =>{

    return createSelector(
        selectTransfers,
        (transfers:Transfer[]) => {
            var transferById = transfers.filter(_ => _.id == transferId);
            if(transferById.length == 0){
                return null;
            }
            return transferById[0];
        }
    )
} 