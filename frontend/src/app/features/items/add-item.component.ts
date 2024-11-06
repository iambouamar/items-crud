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
  templateUrl: './add-item.component.html',
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
