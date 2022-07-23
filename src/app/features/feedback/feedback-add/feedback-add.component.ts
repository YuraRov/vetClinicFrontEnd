import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../feedbacks/services/feedback.service";
import {AuthService} from "../../../core/services/authService/auth.service";
import {Feedback} from "../../../core/models/Feedback";
import {UserService} from "../../userDashboard/services/userService/user.service";
import {User} from "../../../core/models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.sass',
  './styles.css']
})
export class FeedbackAddComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(this.user.email, [Validators.email, Validators.required]),
    serviceRate : new FormControl(0, Validators.required),
    priceRate : new FormControl(0, Validators.required),
    supportRate : new FormControl(0, Validators.required),
    suggestions : new FormControl(null, Validators.maxLength(1000))
  });

  constructor(
    @Inject(FormBuilder) private  formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private user : User,
    private dialog: MatDialogRef<Feedback>,
    private feedbackService : FeedbackService,
    private authService : AuthService) {
  }

  onSaveForm() : void{
    const feedback : Feedback =
      this.form.value as Feedback;
      feedback.userId = this.authService.getUserId();

    this.feedbackService.create(feedback)
      .subscribe(() => this.dialog.close(true));
  }

  onCancelClick() : void {
    this.dialog.close(false);
  }

  ngOnInit(): void {
  }

}
