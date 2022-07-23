import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../services/articleService/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../../../core/models/Article";
import {DateTimeService} from "../../../services/dateTimeService/date-time.service";

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.sass'],
})
export class ViewArticleComponent implements OnInit {
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

  otherArticles: Article[] = [];

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              public dateService: DateTimeService){
    this.updateContent();
    route.paramMap.subscribe(() => {
      this.updateContent();
    })
  }

  ngOnInit(): void {
  }

  private updateContent(): void {
    this.currentArticle.id = this.route.snapshot.params['id'];
    this.articleService
      .getById(this.currentArticle.id!)
      .subscribe((article) => {
        this.currentArticle = article;
        this.currentArticle.createdAt = new Date(article.createdAt!);
        this.articleService
          .getAllPaged(1, 5, null, null, null, true)
          .subscribe(data => {
            this.otherArticles = data.entities
              .filter(art => art.id != this.currentArticle!.id!)
              .splice(0, 5);
        });
      });
  }

  onOpenArticle(element: Article, $event: Event): void{
    $event.stopPropagation();
    this.router.navigateByUrl(`blog/${element.id}`).then(() => {
      this.updateContent();
    });
  }
}
