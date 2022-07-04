import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';                    //Specially for sorting
import { ViewChild } from '@angular/core';                           //Specially for sorting
import { MatTableDataSource } from '@angular/material/table';
import { Exception } from 'src/app/core/models/Exception';
import { ExceptionService } from 'src/app/core/services/exceptionServices/exception.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { R3SelectorScopeMode } from '@angular/compiler';
import { Subject } from 'rxjs';
import { ExceptionParameters } from 'src/app/core/models/operational-models/QueryParameters/ExceptionParameters';
import { ExceptionParametersWithList } from 'src/app/core/models/operational-models/QueryParameters/ExceptionParametersWithList';

@Component({
  selector: 'app-exception-page',
  templateUrl: './exception-page.component.html',
  styleUrls: ['./exception-page.component.sass']
})

export class ExceptionPageComponent implements OnInit {
  dataSource: MatTableDataSource<Exception> = new MatTableDataSource();
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['name', 'date', 'path', 'button'];
  pagingInfo: ExceptionParameters | null = null;
  itemsPerPage: number = 5;
  options = [
    { name: "5", value: 5 },
    { name: "10", value: 10 }
  ]

  constructor(
    private exceptionService: ExceptionService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.updateList(1, 5);
  }

  ngAfterViewInit(): void {

  }

  onButtonInfoClick(element: Exception) {
    this.router.navigateByUrl(`/exceptions/${element.id}`)
  }
  onNextButtonInfoClick() {
    if (this.pagingInfo?.hasNext) {

      this.updateList(this.pagingInfo!.currentPage + 1, this.pagingInfo!.pageSize);
    }

  }
  onPrevButtonInfoClick() {

    if (this.pagingInfo?.hasPrevious) {

      this.updateList(this.pagingInfo!.currentPage - 1, this.pagingInfo!.pageSize);
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateList(this.pagingInfo!.currentPage, this.pagingInfo!.pageSize, filterValue);

  }

  private updateList(CurrentPage: number = 1, PageSize: number = 5, name: string = ""): void {
    if (name == "") {
      this.exceptionService.getExceptions(CurrentPage, PageSize).subscribe((data) => {
        this.dataSource.data = data.exceptionList;
        this.dataSource.sort = this.sort!;
        this.updatePagingInfo(data)
      });
    }
    else {
      this.exceptionService.getExceptions(CurrentPage, PageSize, name).subscribe((data) => {
        this.updatePagingInfo(data)
        this.dataSource.data = data.exceptionList;
        this.dataSource.sort = this.sort!;
      });
    }
  }

  private updatePagingInfo(data: ExceptionParametersWithList): void {
    this.pagingInfo = <ExceptionParameters>data;
  }

  selectOption() {
    this.updateList(1, this.itemsPerPage);
  }
}
