import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Procedure} from "../../../../core/models/Procedure";
import {ProcedureService} from "../../services/procedureService/procedure.service";
import {AuthService} from "../../../../core/services/authService/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProcedureDialogComponent} from "../delete-procedure-dialog/delete-procedure-dialog.component";
import {EditProcedureDialogComponent} from "../edit-procedure-dialog/edit-procedure-dialog.component";
import {NewProcedureDialogComponent} from "../new-procedure-dialog/new-procedure-dialog.component";
import {ProcedureParameters} from "../../../../core/models/operational-models/QueryParameters/ProcedureParameters";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-procedures-page',
  templateUrl: './procedures-page.component.html',
  styleUrls: ['./procedures-page.component.sass']
})
export class ProceduresPageComponent implements OnInit {

  dataSource: MatTableDataSource<Procedure> = new MatTableDataSource();

  displayedColumns: string[] = ['name', 'cost', 'description', 'duration', 'delete', 'edit'];

  pageSizeOptions: { name: string; value: number }[] = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '20', value: 20 }
  ];

  pageInfo: ProcedureParameters | null = null;
  currentPageSize: number = this.pageSizeOptions[0].value;
  filterValue: string | null = null;
  currentOrderByOption: string | null = null;
  currentOrderByDirection: string | null = 'asc';

  constructor(
    private procedureService: ProcedureService,
    public authService : AuthService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  private updateList(
    pageNumber: number = 1,
    pageSize: number = this.currentPageSize!,
    filterParam: string | null = this.filterValue,
    orderByParam: string | null = this.currentOrderByOption,
    orderByDirection: string | null = this.currentOrderByDirection): void {
    this.procedureService.getAllPaged(
      pageNumber,
      pageSize,
      filterParam,
      orderByParam,
      orderByDirection).subscribe(data => {
      this.dataSource.data = data.entities;
      this.updatePageInfo(data);
    });
  }

  private updatePageInfo(data: ProcedureParameters): void {
    this.pageInfo = <ProcedureParameters>data;
  }

  ngOnInit(): void {
    this.updateList();
  }

  onDeleteProcedure(element:any){
    const procedure :Procedure = element as Procedure;

    const dialogRef = this.matDialog.open(DeleteProcedureDialogComponent, {
      autoFocus: false,
      data:{
        name: procedure.name,
        id: procedure.id
      }
    });

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {
      if(requireReload) {
        this.snackBar.open(`The procedure has been deleted successfully!`, 'Close', {
          duration: 4000,
          panelClass: ['green-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.updateList();
      }
    });
  }

  onEditProcedure(element: any){
    const procedure: Procedure = element as Procedure;
    const dialogRef = this.matDialog.open(EditProcedureDialogComponent, {
      data: procedure
    });

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {
      if(requireReload) {
        this.snackBar.open(`The procedure has been updated successfully!`, 'Close', {
          duration: 4000,
          panelClass: ['green-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.updateList();
      }
    });
  }

  onNewProcedure(){
    const dialogRef = this.matDialog.open(NewProcedureDialogComponent);

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {
      if(requireReload) {
        this.snackBar.open(`The procedure has been created successfully!`, 'Close', {
          duration: 4000,
          panelClass: ['green-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.updateList();
      }
    });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.updateList(1,
      this.currentPageSize,
      this.filterValue,
      this.currentOrderByOption,
      this.currentOrderByDirection);
  }

  selectPageSizeOptions(): void {
    this.updateList(1, this.currentPageSize);
  }

  onPrevPageClick(): void {
    if (this.pageInfo?.hasPrevious) {
      this.updateList(
        this.pageInfo!.currentPage - 1,
        this.pageInfo!.pageSize,
        this.filterValue,
        this.currentOrderByOption,
        this.currentOrderByDirection);
    }
  }

  onNextPageClick(): void {
    if (this.pageInfo?.hasNext) {
      this.updateList(
        this.pageInfo!.currentPage + 1,
        this.pageInfo!.pageSize,
        this.filterValue,
        this.currentOrderByOption,
        this.currentOrderByDirection);
    }
  }

  setOrderByProperty(column: string): void{
    //asc => desc => no
    if(this.currentOrderByOption === column){
      if(this.currentOrderByDirection === 'asc'){
        this.currentOrderByDirection = 'desc';
      } else if(this.currentOrderByDirection === 'desc'){
        this.currentOrderByDirection = null;
        this.currentOrderByOption = null;
      }
    } else {
      this.currentOrderByOption = column;
      this.currentOrderByDirection = 'asc';
    }
    this.updateList(
      1,
      this.pageInfo!.pageSize!,
      this.filterValue,
      this.currentOrderByOption,
      this.currentOrderByDirection);
  }
}
