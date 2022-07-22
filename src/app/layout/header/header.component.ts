import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { MessagingService } from 'src/app/features/messaging/services/messaging.service';
import { UserService } from 'src/app/features/userDashboard/services/userService/user.service';
import { LoginComponent } from '../../shared/components/authComponents/login-page/login.component'
import { SignupComponent } from '../../shared/components/authComponents/signup-page/signup.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  userId: number = 0;
  profilePic?: string;

  constructor(
    private matDialog: MatDialog,
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    public messagingService: MessagingService
  ) 
  {
  }

  ngOnInit(): void { 
    this.loadProfilePicture();
    this.authService.login$.subscribe(_ => {
      this.loadProfilePicture();
    });
    this.userService.edit$.subscribe(_ => {
      this.loadProfilePicture();
    });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
  
  loadProfilePicture(){
    let userId: number = this.authService.getUserId();
    if (userId != null) {
      this.userService.getById(userId).subscribe(user => {
        if (user.profilePicture != null)
          this.profilePic = user.profilePicture!;
        else
          this.profilePic = '/assets/images/default_profile_pic.jpg';
      })
    }
  }
}
