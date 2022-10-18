import { createReducer, on } from "@ngrx/store";
import { Transfer } from "./transfer";
import { transfersFetchAPISuccess, deleteTransferAPISuccess, saveTransferAPISuccess, updateTransferAPISuccess } from "./transfers.action";


export const initialState:  ReadonlyArray<Transfer> = [];

export const transferReducer = createReducer(
    initialState, 
    on(transfersFetchAPISuccess,(state, {allTransfers})=>{
        return allTransfers;
    }),
    on(saveTransferAPISuccess, (state,{response})=>{
        let newState = [...state];
        newState.unshift(response);
        return newState
    }),
    on(updateTransferAPISuccess, (state, {response}) => {
        let newState = state.filter(_=>_.id !== response.id);
        newState.unshift(response);
        return newState;
    }),
    on(deleteTransferAPISuccess,(state, {id}) => {
        let newState = state.filter(_=>_.id !== id);
        return newState
    })
)