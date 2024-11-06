import { createReducer, on } from '@ngrx/store';
import { Item } from '../../../core/models/item.model';
import { ItemsActions } from './items.actions';

export interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

export const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(ItemsActions.loadItems, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ItemsActions.addItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  }))
);
