import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ArticleService} from "../../../services/articleService/article.service";
import {Article} from "../../../../../core/models/Article";
import {EditorConfigProviderService} from "../../../services/editorConfigProvider/editor-config-provider.service";

@Component({
  selector: 'app-new-article-dialog',
  templateUrl: './new-article-dialog.component.html',
  styleUrls: ['./new-article-dialog.component.sass']
})
export class NewArticleDialogComponent<T> implements OnInit {

  form = new FormGroup({
    title: new FormControl("", Validators.minLength(5)),
    body: new FormControl("", Validators.minLength(5))
  });

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<T>,
              private articleService : ArticleService,
              public editorConfig: EditorConfigProviderService) { }

  onPublish(): void{
    const finalData : Article = this.form.value as Article;
    finalData.edited = false;
    finalData.published = true;
    finalData.createdAt = new Date(Date.now());
    this.articleService
      .postArticle(finalData)
      .subscribe(result => this.dialogRef.close(result !== null && result !== undefined));
  }

  onSaveDraft(){
    const finalData : Article = this.form.value as Article;
    finalData.edited = false;
    finalData.published = false;
    finalData.createdAt = new Date();
    this.articleService
      .postArticle(finalData)
      .subscribe(() => this.dialogRef.close(true));
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.articleService.discardEditing().subscribe(() => this.dialogRef.close(false));
  }
}
