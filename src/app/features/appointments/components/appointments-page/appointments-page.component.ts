import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/core/models/Appointment';
import { AppointmentService } from '../../services/appointment.service';
import { DeleteAppointmentDialogComponent } from '../delete-appointment-dialog/delete-appointment-dialog.component';
import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';
import { NewAppointmentDialogComponent } from '../new-appointment-dialog/new-appointment-dialog.component';
import {FeedbackAddComponent} from "../../../feedback/feedback-add/feedback-add.component";
import { AppointmentParameters } from 'src/app/core/models/operational-models/QueryParameters/AppointmentParameters';

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.sass']
})
export class AppointmentsPageComponent implements OnInit {

  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource();
  displayedColumns: string[] = ['animalName', 'disease', 'procedureName', 'doctorName', 'appointmentDate', 'edit', 'delete'];

  pageSizeOptions: { name: string; value: number }[] = [
    { name: '5', value: 5 },
    { name: '10', value: 10 }
  ];
  pageInfo: AppointmentParameters | null = null;
  currentPageSize: number = this.pageSizeOptions[0].value;

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private appointmentService: AppointmentService,
    private matDialog: MatDialog) {
     }

  private updateList(pageNumber: number = 1, pageSize: number = 5): void {
    this.appointmentService.getAllAppointment(pageNumber, pageSize).subscribe(data => {
      console.log(data);
      this.dataSource.data = data.entities;
      this.dataSource.sort = this.sort!;
      this.updatePageInfo(data);
    });
  }

  private updatePageInfo(data: AppointmentParameters): void {
    this.pageInfo = <AppointmentParameters>data;
  }

  onNextPageClick(): void {
    if (this.pageInfo?.hasNext)
      this.updateList(this.pageInfo.currentPage + 1, this.pageInfo.pageSize);
  }

  onPrevPageClick(): void {
    if (this.pageInfo?.hasPrevious)
      this.updateList(this.pageInfo.currentPage - 1, this.pageInfo.pageSize);
  }

  selectPageSizeOptions(): void {
    this.updateList(1, this.currentPageSize);
  }

  ngOnInit(): void {
    this.updateList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  onDeleteAppointment(element:any){
    const appointment :Appointment = element as Appointment;

    const dialogRef = this.matDialog.open(DeleteAppointmentDialogComponent, {
      autoFocus: false,
      data:{
        id: appointment.id,
        disease: appointment.disease,
      }
    });

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {if(requireReload) this.updateList()});
  }

  onEditAppointment(element: any){
    const appointment: Appointment = element as Appointment;
    const dialogRef = this.matDialog.open(EditAppointmentDialogComponent, {
      data: appointment
    });

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {if(requireReload) this.updateList()});
  }

  onNewAppointment(){
    const dialogRef = this.matDialog.open(NewAppointmentDialogComponent);

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {if(requireReload) this.updateList()});
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
