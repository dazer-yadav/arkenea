import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  users: any;
  usersAdded = 0;
  displayedColumns: string[] = [
    'checkbox',
    'name',
    'email',
    'gender',
    'address',
    'dob',
    'actions',
  ];
  userObj = {
    male: 0,
    female: 0,
  };
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private formService: FormService) {
    this.users = [
      {
        id: 1,
        name: 'John',
        email: 'john.doe@example.com',
        address: '123 Main Street',
        gender: 'Male',
        dob: '05/04/1980',
      },
      {
        id: 2,
        name: 'Two',
        email: 'two.user@example.com',
        address: '234 Main Street',
        gender: 'Male',
        dob: '09/04/1980',
      },
      {
        id: 3,
        name: 'Three',
        email: 'three.doe@example.com',
        address: '456 Main Street',
        gender: 'Female',
        dob: '05/04/1980',
      },
      {
        id: 4,
        name: 'Four',
        email: 'four.user@example.com',
        address: '199 Main Street',
        gender: 'Male',
        dob: '09/04/1980',
      },
      {
        id: 5,
        name: 'Five',
        email: 'five.doe@example.com',
        address: '009 Main Street',
        gender: 'Male',
        dob: '05/04/1980',
      },
      {
        id: 6,
        name: 'Six',
        email: 'six.user@example.com',
        address: '765 Main Street',
        gender: 'Female',
        dob: '09/04/1980',
      },
    ];
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.updateUserGenderObj();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(user: any) {
    let config = {
      width: '550px',
      height: '220px',
      data: user,
    };
    this.openDialog(DeleteDialogComponent, config);
  }
  currentUser: any;
  onEditOrAdd(user: any) {
    let config = {
      width: '650px',
      height: '520px',
      data: user,
    };
    this.currentUser = user;
    this.openDialog(EditUserComponent, config);
  }

  openDialog(component: any, config: any): void {
    const dialogRef = this.dialog.open(component, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result === undefined) {
        return;
      }
      if (result.event == 'update') {
        this.updateUserData(result.data);
      }
      if (result.event == 'delete') {
        this.users = this.users.filter((user) => user.id != result.data.id);
        this.dataSource = new MatTableDataSource(this.users);
        this.paginator.length = this.users.length;
        console.log(this.dataSource.length);
      }
      if (result.event == 'add') {
        this.usersAdded += 1;
        this.formService.userCounter.next(this.usersAdded);
        this.onAddUser(result.data);
      }
      this.dataSource.paginator = this.paginator;
      this.updateUserGenderObj();
    });
  }
  updateUserGenderObj() {
    this.userObj.male = 0;
    this.userObj.female = 0;
    this.users.forEach((user) => {
      if (user.gender === 'Male') {
        this.userObj.male += 1;
      } else {
        this.userObj.female += 1;
      }
    });
    this.formService.genderUpdate.next(this.userObj);
  }
  onAddUser(data) {
    let id = this.users.length;
    this.users.push({ id: id, ...data });
    this.dataSource = new MatTableDataSource(this.users);
    this.paginator.length = this.users.length;
  }
  updateUserData(user: any) {
    let index = this.users.findIndex((obj) => obj.id == this.currentUser.id);
    this.users[index] = user;
    this.dataSource = new MatTableDataSource(this.users);
    this.paginator.length = this.users.length;
  }
  onAddNew() {
    let config = {
      width: '650px',
      height: '520px',
      data: 'add',
    };
    this.openDialog(EditUserComponent, config);
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./home.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }
  onDelete() {
    this.dialogRef.close({ event: 'delete', data: this.data });
  }
  onNoClick(): void {
    this.dialogRef.close({ event: 'close' });
  }
}
