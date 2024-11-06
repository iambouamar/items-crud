import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <a class="navbar__brand" routerLink="/">My Store</a>
      <button class="navbar__toggle">
        <span class="navbar__toggle-icon"></span>
      </button>
      <div class="navbar__menu">
        <ul class="navbar__list">
          <li class="navbar__item">
            <a class="navbar__link" routerLink="/items">Items</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" routerLink="/add-item">Add Item</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {}
