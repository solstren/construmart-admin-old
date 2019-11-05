import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  constructor() { }

  CATEGORY_SAVED_SUCCESSFULLY = 'Category saved successfully';
}
