import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  formData: any;
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formService: FormService
  ) {
    console.log(data);
    this.initializeForm();
    this.setUserData(data);
  }

  onSubmit() {
    let body = this.form.getRawValue();
    this.formData = body;
    let event = this.data == 'add' ? 'add' : 'update';
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close({ event: event, data: this.formData });
  }
  onNoClick(): void {
    this.dialogRef.close({ event: 'close' });
  }

  setUserData(user: any) {
    if (user != 'add') {
      this.form.setValue({
        name: user.name,
        email: user.email,
        gender: user.gender,
        address: user.address,
        dob: new Date(user.dob),
      });
    }
  }

  initializeForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {}
}
