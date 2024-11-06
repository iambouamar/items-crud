import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ItemsApiService } from '../../api/items.api.service';
import { ItemsActions } from './items.actions';

@Injectable()
export class ItemsEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      mergeMap(() =>
        this.itemsApi.getItems().pipe(
          map((items) => ItemsActions.loadItemsSuccess({ items })),
          catchError((error) =>
            of(ItemsActions.loadItemsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.addItem),
      mergeMap(({ item }) =>
        this.itemsApi.addItem(item).pipe(
          map((newItem) => ItemsActions.addItemSuccess({ item: newItem })),
          catchError((error) =>
            of(ItemsActions.addItemFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly itemsApi: ItemsApiService
  ) {}
}
