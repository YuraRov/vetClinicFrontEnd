import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Procedure} from "../../../../core/models/Procedure";
import {MatPaginator} from "@angular/material/paginator";
import {ProcedureService} from "../../services/procedureService/procedure.service";
import {AuthService} from "../../../../core/services/authService/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProcedureDialogComponent} from "../delete-procedure-dialog/delete-procedure-dialog.component";
import {EditProcedureDialogComponent} from "../edit-procedure-dialog/edit-procedure-dialog.component";
import {NewProcedureDialogComponent} from "../new-procedure-dialog/new-procedure-dialog.component";
import {ProcedureParameters} from "../../../../core/models/operational-models/QueryParameters/ProcedureParameters";

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
    { name: '10', value: 10 }
  ];

  pageInfo: ProcedureParameters | null = null;
  currentPageSize: number = this.pageSizeOptions[0].value;
  filterValue: string | null = null;
  currentOrderByOption: string | null = null;
  currentOrderByDirection: string | null = 'asc';

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private procedureService: ProcedureService,
    public authService : AuthService,
    private matDialog: MatDialog) {
  }

  private updateList(
    pageNumber: number = 1,
    pageSize: number = 5,
    filterParam: string | null = null,
    orderByParam: string | null = null,
    orderByDirection: string | null = null): void {
    this.procedureService.getAllPaged(pageNumber, pageSize, filterParam, orderByParam, orderByDirection).subscribe(data => {
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
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

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {if(requireReload) this.updateList()});
  }

  onEditProcedure(element: any){
    const procedure: Procedure = element as Procedure;
    const dialogRef = this.matDialog.open(EditProcedureDialogComponent, {
      data: procedure
    });

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {if(requireReload) this.updateList()});
  }

  onNewProcedure(){
    const dialogRef = this.matDialog.open(NewProcedureDialogComponent);

    dialogRef.afterClosed().subscribe((requireReload: boolean) => {if(requireReload) this.updateList()});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectPageSizeOptions(): void {
    this.updateList(1, this.currentPageSize);
  }

  onPrevPageClick(): void {
    if (this.pageInfo?.hasPrevious) {
      this.updateList(this.pageInfo!.currentPage - 1, this.pageInfo!.pageSize, this.currentOrderByOption);
    }
  }

  onNextPageClick(): void {
    if (this.pageInfo?.hasNext) {
      this.updateList(this.pageInfo!.currentPage + 1, this.pageInfo!.pageSize, this.currentOrderByOption);
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
