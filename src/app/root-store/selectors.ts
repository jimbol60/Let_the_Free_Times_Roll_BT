import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthStoreSelectors } from './auth-store';
import { ContextStoreSelectors } from './context-store';
import { AcctStoreSelectors } from './acct-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    AuthStoreSelectors.selectAuthError,
    AcctStoreSelectors.selectAcctError,
    ContextStoreSelectors.selectContextError,
    
    (
        authError: string,
        acctError: string,
        contextError: string,
    ) => {
        
        return authError
            || acctError
            || contextError
            ;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    AuthStoreSelectors.selectAuthIsLoading,
    AcctStoreSelectors.selectAcctIsLoading,
    
    (
        authStore: boolean,
        acctStore: boolean,
    ) => {
        
        return authStore
            || acctStore;
    }
);
