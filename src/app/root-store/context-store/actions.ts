import { Action } from '@ngrx/store';

export enum ActionTypes {
    CONTEXT_SET_ACCT = '[CONTEXT] set account UID',
    CONTEXT_SET_FIELDS = '[CONTEXT] set field UIDs',
    CONTEXT_ADD_FIELD = '[CONTEXT] add field UID',
    CONTEXT_REMOVE_FIELD = '[CONTEXT] remove field UID',
    CLEAR_ALL = '[CONTEXT] Clear all'
}

export class ContextSetAcctUID implements Action {
    readonly type = ActionTypes.CONTEXT_SET_ACCT;
    
    constructor(public payload: { acctUID: string }) {}
}

export class ContextSetFieldUIDs implements Action {
    readonly type = ActionTypes.CONTEXT_SET_FIELDS;
    
    constructor(public payload: { fieldUIDs: string[] }) {}
}

export class ContextAddFieldUID implements Action {
    readonly type = ActionTypes.CONTEXT_ADD_FIELD;
    
    constructor(public payload: { fieldUID: string }) {}
}

export class ContextRemoveFieldUID implements Action {
    readonly type = ActionTypes.CONTEXT_REMOVE_FIELD;
    
    constructor(public payload: { fieldUID: string }) {}
}

export class ClearAll implements Action {
    readonly type = ActionTypes.CLEAR_ALL;
}

export type  Actions =
    | ContextSetAcctUID
    | ContextSetFieldUIDs
    | ContextAddFieldUID
    | ContextRemoveFieldUID
    | ClearAll
    ;