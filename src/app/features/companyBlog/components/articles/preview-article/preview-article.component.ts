import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../services/articleService/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../../../core/models/Article";
import {DateTimeService} from "../../../services/dateTimeService/date-time.service";
import {Location} from '@angular/common'

@Component({
  selector: 'app-preview-article',
  templateUrl: './preview-article.component.html',
  styleUrls: ['./preview-article.component.sass']
})
export class PreviewArticleComponent implements OnInit {
  currentArticle: Article = {
    id: 0,
    title: "",
    body: "",
    authorId: 0,
    published: false,
    edited: false,
    authorName: "",
    createdAt: new Date()
  };

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              public dateService: DateTimeService,
              private location: Location){
    this.updateContent();
  }

  ngOnInit(): void {
  }

  private updateContent(): void {
    this.currentArticle.id = this.route.snapshot.params['id'];
    this.articleService.getById(this.currentArticle.id!).subscribe((article) => {
      if(article!.published!){
        this.router.navigateByUrl(`blog/${article.id}`);
      }
      this.currentArticle = article;
      this.currentArticle.createdAt = new Date(article.createdAt!);
    });
  }

  onPublish(event: Event): void{
    event.stopPropagation();
    this.currentArticle!.published = true;
    const updatedArticle: Article = Object.assign(this.currentArticle!, {published: true})
    this.articleService.updateArticle(updatedArticle).subscribe(() =>
    {
      this.currentArticle!.published = true
      this.router.navigateByUrl(`blog/${this.currentArticle!.id}`);
    });
  }

  onExit(event: Event): void{
    event.stopPropagation();
    this.location.back();
  }
}
