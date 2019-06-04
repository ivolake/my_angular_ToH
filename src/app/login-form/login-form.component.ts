import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public login: string;
  public password: string;
  private returnUrl: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,) { }

  onSubmit() {
    this.authService.signin(this.login, this.password).subscribe((result: any) => {
      if (localStorage.getItem('token')) {
        this.authService.isLoggedIn = true;
        this.log(`Logged into ${this.login}`)
        this.router.navigateByUrl(this.returnUrl);
      } else {
        // this.snackBar.open('Unable to log in with provided credentials.',
        //   'OK',
        //   { duration: 5000, verticalPosition: 'top' });
        this.authService.isLoggedIn = false;
        this.log('Unable to log in with provided credentials.')
      }
    });

    this.authService.isLoggedIn = true;
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  private log(message: string) {
    this.messageService.add(`⚫${message}`);
  }
}
