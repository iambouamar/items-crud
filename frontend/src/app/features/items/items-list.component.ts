import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ItemsActions } from '../../data/store/items/items.actions';
import {
  selectAllItems,
  selectItemsLoading,
} from '../../data/store/items/items.selectors';
import { ItemsState } from '../../data/store/items/items.reducer';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  items$;
  loading$;

  constructor(private store: Store<{ items: ItemsState }>) {
    this.items$ = this.store.select(selectAllItems);
    this.loading$ = this.store.select(selectItemsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(ItemsActions.loadItems());
  }
}
