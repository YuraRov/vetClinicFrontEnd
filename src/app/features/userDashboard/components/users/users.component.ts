import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../../core/models/User";
import { MatSort } from "@angular/material/sort";
import { UserService } from "../../services/userService/user.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteUserComponent } from "../delete-user/delete-user.component";
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  displayedColumns: string[] = [
    'firstName', 'lastName', 'email', 'phoneNumber', 'birthDate', 'role', 'edit', 'delete'
  ];

  pageSizeOptions: {name: string; value: number}[] = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 }
  ];
  
  currentPageSize: number = this.pageSizeOptions[0].value;
  currentPageNumber: number = 1;

  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog) { }

  private updateUsers(takeCount?: number, skipCount: number = 0, filterParam: string | null = null, orderByParam?: string): void {
    this.userService.getAllUsers(takeCount, skipCount, filterParam, orderByParam).subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.sort = this.sort!;
    });
  }

  ngOnInit(): void {
    this.updateUsers(this.currentPageSize);
  }

  onDelete(user: User): void {
    const dialogRef = this.matDialog.open(DeleteUserComponent, {
      autoFocus: false,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {
      if (requireReload) {
        this.updateUsers(this.currentPageSize, this.currentPageSize * (this.currentPageNumber - 1));
      }
    });
  }

  onCreateEmployee(): void {
    const dialogRef = this.matDialog.open(CreateEmployeeComponent);

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {
      if (requireReload) {
        this.updateUsers(this.currentPageSize, this.currentPageSize * (this.currentPageNumber - 1));
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.updateUsers(this.currentPageSize, 0, filterValue);
  }

  onPrevPageClick(): void {
    this.currentPageNumber -= 1;
    this.updateUsers(this.currentPageSize, this.currentPageSize * (this.currentPageNumber - 1));
  }

  onNextPageClick(): void {
    this.currentPageNumber += 1;
    this.updateUsers(this.currentPageSize, this.currentPageSize * (this.currentPageNumber - 1));
  }

  selectPageSizeOption(): void {
    this.updateUsers(this.currentPageSize);
    this.currentPageNumber = 1;
  }

  orderBy(orderByParam: string): void {
    this.updateUsers(this.currentPageSize, this.currentPageSize * (this.currentPageNumber - 1), orderByParam);
  }
}
