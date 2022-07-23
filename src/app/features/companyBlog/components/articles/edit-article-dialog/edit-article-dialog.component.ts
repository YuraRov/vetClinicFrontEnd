import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../../../services/articleService/article.service";
import {Article} from "../../../../../core/models/Article";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditorConfigProviderService} from "../../../services/editorConfigProvider/editor-config-provider.service";

@Component({
  selector: 'app-edit-article-dialog',
  templateUrl: './edit-article-dialog.component.html',
  styleUrls: ['./edit-article-dialog.component.sass']
})
export class EditArticleDialogComponent<T> implements OnInit {

  form = new FormGroup({
    title: new FormControl("", Validators.minLength(5)),
    body: new FormControl("", Validators.minLength(5))
  });

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<T>,
    @Inject(MAT_DIALOG_DATA) public data : Article,
    private articleService : ArticleService,
    public editorConfig: EditorConfigProviderService
  ) {
    this.form.patchValue(this.data);
  }

  onPublish(): void{
    const finalData : Article = this.form.value as Article;
    finalData.edited = false;
    finalData.published = true;
    finalData.createdAt = new Date(Date.now());
    finalData.id = this.data.id;
    this.articleService
      .updateArticle(finalData)
      .subscribe(result => this.dialogRef.close(result !== null && result !== undefined));
  }

  onSaveDraft(){
    const finalData : Article = this.form.value as Article;
    finalData.edited = false;
    finalData.published = false;
    finalData.createdAt = new Date();
    finalData.id = this.data.id;
    this.articleService.updateArticle(finalData).subscribe(() => this.dialogRef.close(true));
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.articleService.discardEditing().subscribe(() => this.dialogRef.close(false));
  }
}
