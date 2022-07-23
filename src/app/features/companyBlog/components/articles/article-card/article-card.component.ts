import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleService} from "../../../services/articleService/article.service";
import {Article} from "../../../../../core/models/Article";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../core/services/authService/auth.service";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.sass']
})
export class ArticleCardComponent implements OnInit {
  @Output() deletedArticle = new EventEmitter<Article>();

  @Input() article?: Article;

  constructor(private articleService: ArticleService,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  onOpenArticle($event: Event): void{
    $event.stopPropagation();
    if(this.article!.published){
      this.router.navigateByUrl(`${this.router.url}/${this.article!.id}`);
    } else {
      this.router.navigateByUrl(`${this.router.url}/preview/${this.article!.id}`);
    }
  }

  onDeleteArticle(): void{
    this.deletedArticle.emit(this.article!)
  }

  onArticleChange(article: Article):void{
    this.article = article;
  }
}
