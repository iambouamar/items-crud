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
  template: `
    <div class="items">
      <h2 class="items__title">Items List</h2>
      <div *ngIf="loading$ | async" class="items__loading">Loading...</div>
      <div class="items__grid">
        <div class="item-card" *ngFor="let item of items$ | async">
          <img
            [src]="item.imageUrl"
            class="item-card__image"
            alt="{{ item.name }}"
          />
          <div class="item-card__content">
            <h5 class="item-card__title">{{ item.name }}</h5>
            <p class="item-card__description">{{ item.description }}</p>
            <p class="item-card__price">{{ item.price | currency }}</p>
            <p class="item-card__date">Added on {{ item.createdAt | date }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
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
