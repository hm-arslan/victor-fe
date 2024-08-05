import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
  })
// export class HeaderComponent implements AfterViewInit, OnDestroy {
  export class HeaderComponent implements AfterViewInit, OnDestroy{
  private fragmentSubscription: Subscription | null = null;

  constructor(private _getService: GetService, private route: ActivatedRoute, private router: Router) {
    var token = sessionStorage.getItem("token")
    if (token) {
      this.loggedin = true;
    }
    else {
      this.loggedin = false
    }
   }

  loggedin: Boolean = false

  signin_clicked() {
    this.router.navigate(['login'])
  }

  signup_clicked() {
    this.router.navigate(['create_account'])
  }
  signOut_clicked() {
    this._getService.getRequest('auth/logout').subscribe(
      res => {
        sessionStorage.clear()
        window.location.reload();
      },
      err => {
        sessionStorage.clear()
        window.location.reload();
      }
    )
  }

  ngAfterViewInit(): void {
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      this.scrollToFragment(fragment);
    });
  }

  ngOnDestroy(): void {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }

  scrollToFragment(fragment: string | null): void {
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

