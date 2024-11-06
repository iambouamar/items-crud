import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Item } from '../../../core/models/item.model';

export const ItemsActions = createActionGroup({
  source: 'Items',
  events: {
    'Load Items': emptyProps(),
    'Load Items Success': props<{ items: Item[] }>(),
    'Load Items Failure': props<{ error: string }>(),

    'Add Item': props<{ item: Partial<Item> }>(),
    'Add Item Success': props<{ item: Item }>(),
    'Add Item Failure': props<{ error: string }>(),
  },
});
