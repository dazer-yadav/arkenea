import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-right-progress-bar',
  templateUrl: './right-progress-bar.component.html',
  styleUrls: ['./right-progress-bar.component.scss'],
})
export class RightProgressBarComponent implements OnInit {
  usersAdded = 0;
  usersGender = {
    male: 0,
    female: 0,
  };
  constructor(private formService: FormService) {
    this.formService.genderUpdate.subscribe((res) => {
      this.usersGender = res;
    });
  }

  ngOnInit(): void {
    this.formService.userCounter.subscribe((res) => {
      this.usersAdded = res;
    });
    this.formService.genderUpdate.subscribe((res) => {
      this.usersGender = res;
    });
  }
}
