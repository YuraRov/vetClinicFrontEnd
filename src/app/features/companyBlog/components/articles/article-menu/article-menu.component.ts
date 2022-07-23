import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ArticleService} from "../../../services/articleService/article.service";
import {Article} from "../../../../../core/models/Article";
import {Router} from "@angular/router";
import {DeleteArticleDialogComponent} from "../delete-article-dialog/delete-article-dialog.component";
import {EditArticleDialogComponent} from "../edit-article-dialog/edit-article-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-article-menu',
  templateUrl: './article-menu.component.html',
  styleUrls: ['./article-menu.component.sass']
})
export class ArticleMenuComponent implements OnInit {

  @Output() deletedArticle = new EventEmitter<Article>();
  @Output() articleChange : EventEmitter<Article> = new EventEmitter<Article>();

  @Input() set article(value : Article){
    this.currentArticle = value;
  }

  currentArticle?: Article;

  constructor(private articleService: ArticleService,
              private router: Router,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  stopEventProp(event: Event): void{
    event.stopPropagation();
  }

  onEditArticle(event: Event): void{
    event.stopPropagation();
    const dialogRef = this.matDialog.open(EditArticleDialogComponent, {
      data: this.currentArticle!
    });

    dialogRef
      .afterClosed()
      .subscribe((requireReload: boolean) => {
          if(requireReload) {
            this.articleService
              .getById(this.currentArticle!.id!)
              .subscribe((art) => {
                this.snackBar.open(`The article has been edited successfully!`, 'Close', {
                  duration: 4000,
                  panelClass: ['green-snackbar'],
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });
                this.currentArticle = art;
                this.articleChange.emit(this.currentArticle!)
                }
              );
          } else {
            this.snackBar.open(`The article hasn't been updated!`, 'Close', {
              duration: 4000,
              panelClass: ['green-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        }
      );
  }

  onPublish(event: Event): void{
    event.stopPropagation();
    this.currentArticle!.published = true;
    const updatedArticle: Article = Object.assign(this.currentArticle!, {published: true})
    this.articleService.updateArticle(updatedArticle).subscribe(() => {
      this.currentArticle!.published = true
      this.snackBar.open(`The article has been published successfully!`, 'Close', {
        duration: 4000,
        panelClass: ['green-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }

  onUnublish(event: Event): void{
    event.stopPropagation();
    const updatedArticle: Article = Object.assign(this.currentArticle!, {published: false})
    this.articleService.updateArticle(updatedArticle).subscribe(() => { this.currentArticle!.published = false });
  }

  onDeleteArticle(event: Event): void{
    event.stopPropagation();
    const dialogRef = this.matDialog.open(DeleteArticleDialogComponent, {
      data: this.currentArticle!
    });

    dialogRef
      .afterClosed()
      .subscribe((requireReload: boolean) => {
        if(requireReload){
          this.snackBar.open(`The article has been deleted successfully!`, 'Close', {
            duration: 4000,
            panelClass: ['green-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.deletedArticle.emit(this.currentArticle!)
        }
      });
  }

  onPreview(event: Event) : void{
    event.stopPropagation();
    this.router.navigateByUrl(`${this.router.url}/preview/${this.currentArticle!.id!}`);
  }
}
