import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Feedback} from "../../../core/models/Feedback";
import {FeedbackService} from "./services/feedback.service";
import {FeedbackParameters} from "../../../core/models/operational-models/QueryParameters/FeedbackParameters";

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.sass']
})
export class FeedbacksComponent implements OnInit {

  dataSource: MatTableDataSource<Feedback> =
    new MatTableDataSource();

  displayedColumns: string[] = [
    "email","serviceRate","priceRate","supportRate","suggestions","user"
  ];

  pageSizeOptions: { name: string; value: number }[] = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '20', value: 20 }
  ];

  pageInfo: FeedbackParameters | null = null;
  currentPageSize: number = this.pageSizeOptions[0].value;
  filterValue: string | null = null;

  constructor(
    private feedbackService : FeedbackService) { }

  private updateFeedbacks(
    pageNumber: number = 1,
    pageSize: number = 4,
    filterParam: string | null = null){
    this.feedbackService.getFeedbacks(pageNumber, pageSize, filterParam)
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<Feedback>(data.entities);
          this.updatePageInfo(data);
        }
      );
  }

  updatePageInfo(pageInformation : FeedbackParameters){
    this.pageInfo = pageInformation;
  }


  onPrevPageClick(): void {
    if (this.pageInfo?.hasPrevious) {
      this.updateFeedbacks(this.pageInfo!.currentPage - 1, this.pageInfo!.pageSize);
    }
  }

  onNextPageClick(): void {
    if (this.pageInfo?.hasNext) {
      this.updateFeedbacks(this.pageInfo!.currentPage + 1, this.pageInfo!.pageSize);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.updateFeedbacks(1,this.pageInfo?.pageSize,filterValue);

    console.log("Running methid");

    if (this.dataSource.paginator) {
      console.log("paginator is not nmull!");
      this.dataSource.paginator.firstPage();
    }
  }

  selectPageSizeOptions(): void {
    this.updateFeedbacks(1, this.currentPageSize);
  }

  ngOnInit(): void {
    this.updateFeedbacks();
  }

}
