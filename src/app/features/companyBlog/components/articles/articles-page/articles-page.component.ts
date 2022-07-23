import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ArticleService} from "../../../services/articleService/article.service";
import {Article} from "../../../../../core/models/Article";
import {MatTableDataSource} from "@angular/material/table";
import {DateTimeService} from "../../../services/dateTimeService/date-time.service";
import {NewArticleDialogComponent} from "../new-article-dialog/new-article-dialog.component";
import {AuthService} from "../../../../../core/services/authService/auth.service";
import {ArticleParameters} from "../../../../../core/models/operational-models/QueryParameters/ArticleParameters";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.sass']
})
export class ArticlesPageComponent implements OnInit {

  articles: Article[] = [];

  selectedView = new FormControl('grid');
  selectedCount = new FormControl(8);
  selectedOrderBy = new FormControl('Creation Time');

  dataSource: MatTableDataSource<Article> = new MatTableDataSource(this.articles);
  displayedColumns: string[] = ['title', 'createdAt', 'authorName'];

  pageSizeOptions: { name: string; value: number }[] = [
    { name: '8', value: 8 },
    { name: '16', value: 16 },
    { name: '24', value: 24 }
  ];

  pageInfo: ArticleParameters | null = null;
  currentPageSize: number = this.pageSizeOptions[0].value;
  filterValue: string | null = '';
  currentOrderByOption: string | null = 'Creation Time';
  currentOrderByDirection: string | null = 'asc';
  iconStyle: string = '';

  constructor(private formBuilder : FormBuilder,
              private articleService: ArticleService,
              private matDialog: MatDialog,
              public dateTimeService: DateTimeService,
              public authService: AuthService,
              private snackBar: MatSnackBar) {
    this.updateList();
    if(authService.isAuthorized() && authService.isInRole('Admin')){
      this.displayedColumns.push('action');
    }
  }

  updateList(
    pageNumber: number = 1,
    pageSize: number = this.currentPageSize!,
    filterParam: string | null = this.filterValue,
    orderByParam: string | null = this.currentOrderByOption,
    orderByDirection: string | null = this.currentOrderByDirection): void{
    this.articleService.getAllPaged(
        pageNumber,
        pageSize,
        filterParam,
        orderByParam,
        orderByDirection,
        !(this.authService.isAuthorized() && this.authService.isInRole('Admin')))
      .subscribe(data => {
        this.articles = data.entities;
        this.dataSource.data = data.entities;
        this.updatePageInfo(data);
      });
      return;
  }

  private updatePageInfo(data: ArticleParameters): void {
    this.pageInfo = <ArticleParameters>data;
  }

  ngOnInit(): void {
    this.selectedCount.valueChanges.subscribe(
      data => {
        if (this.selectedView.value == 'grid') {
          this.pageInfo!.pageSize = data!;
          this.currentPageSize = data!;
          this.updateList();
        }
      }
    );

    this.selectedOrderBy.valueChanges.subscribe(
      data => {
        if (this.selectedView.value == 'grid') {
          this.currentOrderByOption = data!;
          this.updateList();
        }
      }
    );
  }

  toggleOrderByDirection(){
    if(this.currentOrderByDirection === 'asc') {
      this.currentOrderByDirection = 'desc';
      this.iconStyle = 'rotated-icon';
    }
    else {
      this.currentOrderByDirection = 'asc';
      this.iconStyle = '';
    }

    this.updateList();
  }

  onDeleteArticle(event: any): void{
    this.articles = this.articles.filter(a => a.id !== event.id);
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.updateList(1,
      this.currentPageSize,
      this.filterValue,
      this.currentOrderByOption,
      this.currentOrderByDirection);
  }

  onNewArticle(){
    const dialogRef = this.matDialog.open(NewArticleDialogComponent);

    dialogRef
      .afterClosed()
      .subscribe((requireReload: boolean) => {
        if(requireReload) {
          this.snackBar.open(`The article has been created successfully!`, 'Close', {
            duration: 4000,
            panelClass: ['green-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.updateList()
        } else {
          this.snackBar.open(`The article hasn't been created!`, 'Close', {
            duration: 4000,
            panelClass: ['green-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      }
    );
  }

  onArticleChange(): void {
    this.updateList();
  }

  selectPageSizeOptions(): void {
    this.updateList(1, this.currentPageSize);
  }

  onPrevPageClick(): void {
    if (this.pageInfo?.hasPrevious) {
      this.updateList(
        this.pageInfo!.currentPage - 1,
        this.currentPageSize,
        this.filterValue,
        this.currentOrderByOption,
        this.currentOrderByDirection);
    }
  }

  onNextPageClick(): void {
    if (this.pageInfo?.hasNext) {
      this.updateList(this.pageInfo!.currentPage + 1,
        this.currentPageSize, this.filterValue,
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
      this.currentPageSize!,
      this.filterValue,
      this.currentOrderByOption,
      this.currentOrderByDirection);
  }
}
