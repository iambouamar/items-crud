import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItemsActions } from '../../data/store/items/items.actions';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form">
      <h2 class="form__title">Add New Item</h2>
      <form
        [formGroup]="itemForm"
        (ngSubmit)="addItem()"
        class="form__container"
      >
        <div class="form__group">
          <label class="form__label" for="name">Name</label>
          <input
            type="text"
            id="name"
            class="form__input"
            formControlName="name"
          />
          <div
            *ngIf="
              itemForm.get('name')?.invalid && itemForm.get('name')?.touched
            "
            class="form__error"
          >
            <small *ngIf="itemForm.get('name')?.errors?.['required']">
              Name is required
            </small>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label" for="description">Description</label>
          <textarea
            id="description"
            class="form__input"
            formControlName="description"
          ></textarea>
          <div
            *ngIf="
              itemForm.get('description')?.invalid &&
              itemForm.get('description')?.touched
            "
            class="form__error"
          >
            <small *ngIf="itemForm.get('description')?.errors?.['required']">
              Description is required
            </small>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label" for="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            class="form__input"
            formControlName="imageUrl"
          />
          <div
            *ngIf="
              itemForm.get('imageUrl')?.invalid &&
              itemForm.get('imageUrl')?.touched
            "
            class="form__error"
          >
            <small *ngIf="itemForm.get('imageUrl')?.errors?.['required']">
              Image URL is required
            </small>
            <small *ngIf="itemForm.get('imageUrl')?.errors?.['pattern']">
              Please enter a valid URL
            </small>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label" for="price">Price</label>
          <input
            type="number"
            id="price"
            class="form__input"
            formControlName="price"
          />
          <div
            *ngIf="
              itemForm.get('price')?.invalid && itemForm.get('price')?.touched
            "
            class="form__error"
          >
            <small *ngIf="itemForm.get('price')?.errors?.['required']">
              Price is required
            </small>
            <small *ngIf="itemForm.get('price')?.errors?.['min']">
              Price must be greater than 0
            </small>
          </div>
        </div>

        <button
          type="submit"
          class="form__button"
          [disabled]="itemForm.invalid"
          [class.form__button--disabled]="itemForm.invalid"
        >
          Add Item
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  itemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern('^https?://.*$')],
      ],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  addItem(): void {
    if (this.itemForm.valid) {
      this.store.dispatch(ItemsActions.addItem({ item: this.itemForm.value }));
      this.router.navigate(['/items']);
    }
  }
}
