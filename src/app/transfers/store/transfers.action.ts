import { createAction, props } from "@ngrx/store";
import { Transfer } from "./transfer";


export const invokeTransfersAPI = createAction(
    "[Transfers API] invoke transfers Fetch API"
)

export const transfersFetchAPISuccess = createAction(
    "[Transfers API] transfers fetch api success", 
    props<{allTransfers:Transfer[]}>()
)

export const invokeSaveTransferAPI = createAction(
    "[Transfers API] invoke save transfer API",
    props<{payload:Transfer}>()
)

export const saveTransferAPISuccess = createAction(
    "[Transfers API] save transfer API success",
    props<{response:Transfer}>()
)

export const invokeUpdateTransferAPI = createAction(
    "[Transfers API] invoke update transfer API",
    props<{payload:Transfer}>()
)

export const updateTransferAPISuccess = createAction(
    "[Transfers API] update transfer API success",
    props<{response:Transfer}>()
)

export const invokeDeleteTransferAPI = createAction(
    "[Transfers API] invoke Delete transfer API",
    props<{id:number}>()
)

export const deleteTransferAPISuccess = createAction(
    "[Transfers API] delete transfer API success",
    props<{id:number}>()
)