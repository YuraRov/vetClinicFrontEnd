import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FileSaverService } from 'ngx-filesaver';
import { FinStatementOneMonth } from '../../../../core/models/FinancialStatement/FinStatementOneMonth';
import { MyDate } from '../../../../core/models/FinancialStatement/MyDate';
import { FinancialStatementParameters } from '../../../../core/models/operational-models/QueryParameters/FinancialStatementParameters';
import { FinancialStatementService } from '../../../../core/services/financialService/financial-statement.service';
import { FinancialStatementPageComponent } from '../financial-statement-page/financial-statement-page.component';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-financial-statement-result',
  templateUrl: './financial-statement-result.component.html',
  styleUrls: ['./financial-statement-result.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FinancialStatementResultComponent implements OnInit {

  dataSource: MatTableDataSource<FinStatementOneMonth> = new MatTableDataSource();
  displayedColumns = ['month', 'totalExpences', 'totalIncomes', 'incomesDetail', 'expencesDetail'];
  ExpandedExpences: any;
  ExpandedIncomes: any;

  pageSizeOptions: { name: string; value: number }[] = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '20', value: 20 }
  ];
  pageInfo: FinancialStatementParameters | null = null;
  currentPageSize: number = this.pageSizeOptions[0].value;

    constructor(
    @Inject(MAT_DIALOG_DATA) private date: MyDate,
    private finService: FinancialStatementService,
      public dialogRef: MatDialogRef<FinancialStatementPageComponent>,
      private fS: FileSaverService) {
  }

  ngOnInit(): void {
    this.updateList();
  }

  MakePdf() {

    this.finService.getPDF(this.date, 1, this.pageInfo?.totalCount).subscribe(blob => {
      saveAs(blob, 'FinancialStatement.pdf')
    });
  }

  private updateList(pageNumber: number = 1, pageSize: number = 5): void {
    this.finService.getAllFinStat(this.date, pageNumber, pageSize).subscribe((data) => {
      this.dataSource.data = data.entities;
      this.updatePageInfo(data);
    });
  }

  private updatePageInfo(data: FinancialStatementParameters): void {
    this.pageInfo = <FinancialStatementParameters>data;
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
}
