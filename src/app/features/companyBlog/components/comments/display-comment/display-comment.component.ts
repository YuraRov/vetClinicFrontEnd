import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from "../../../services/commentService/comment.service";
import {MatDialog} from "@angular/material/dialog";
import {DateTimeService} from "../../../services/dateTimeService/date-time.service";
import {Comment} from "../../../../../core/models/Comment";
import {EditCommentDialogComponent} from "../edit-comment-dialog/edit-comment-dialog.component";
import {AuthService} from "../../../../../core/services/authService/auth.service";
import {UserService} from "../../../../userDashboard/services/userService/user.service";

@Component({
  selector: 'app-display-comment',
  templateUrl: './display-comment.component.html',
  styleUrls: ['./display-comment.component.sass']
})
export class DisplayCommentComponent implements OnInit {
  @Output() deletedComment = new EventEmitter<{data: Comment, hasListChanged: boolean}>();

  @Input() comment?: Comment

  profilePickTemp: string = '';

  get profilePick(): string{
    if(this.profilePickTemp == null){
      return '/assets/images/default_profile_pic.jpg';
    }
    return `${this.profilePickTemp}`
  }

  constructor(private commentService: CommentService,
              private matDialog: MatDialog,
              public dateService: DateTimeService,
              public authService: AuthService,
              public userService: UserService) { }

  ngOnInit(): void {
    this.comment!.createdAt = new Date(this.comment!.createdAt!)
    this.getProfilePick();
  }

  onDeleteComment(event: any): void{
    event.stopPropagation();

    this.commentService
      .deleteById(this.comment!.id!)
      .subscribe(() => {
        this.deletedComment.emit({data: this.comment!, hasListChanged: true})
      });
  }

  onEditComment(event: any): void{
    event.stopPropagation();
    const dialogRef = this.matDialog.open(EditCommentDialogComponent, {
      data: this.comment!
    });

    dialogRef
      .afterClosed()
      .subscribe((requireReload: boolean) => {
          if(requireReload) {
            this.commentService
              .getById(this.comment!.id!)
              .subscribe((c) => {
                  this.comment = c;
                  this.comment!.createdAt = new Date(this.comment!.createdAt!)
                }
              );
          }
        }
      );
  }

  stopEventProp(event: Event): void{
    event.stopPropagation();
  }

  getProfilePick(): void{
    this.userService
      .getById(this.comment!.authorId!)
      .subscribe(data => {
        this.profilePickTemp = data.profilePicture!;
      });
  }
}
