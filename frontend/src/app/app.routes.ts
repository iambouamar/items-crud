import { Routes } from '@angular/router';
import { ItemsListComponent } from './features/items/items-list.component';
import { AddItemComponent } from './features/items/add-item.component';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemsListComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: '**', redirectTo: 'items' },
]; 