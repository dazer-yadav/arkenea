import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formData: any;
  genderUpdate = new Subject<any>();
  userCounter = new Subject<number>();
  constructor() {}
}
