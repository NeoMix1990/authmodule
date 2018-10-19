import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ContactTdnPreviewComponent } from '../pages/contacts/contacts-tdn/contact-tdn-preview/contact-tdn-preview.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
	sidenavwidth;
	sideWidth: Observable<any>;
	private sideSubject = new Subject<any>();
  constructor() { 
		this.sideWidth = this.sideSubject.asObservable();
	}
	sideWidthMethod(data) {
		console.log(data);
			this.sideSubject.next(data);
	}

  private sidenav: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
			this.sidenavwidth = 3;
			this.sideWidthMethod(this.sidenavwidth);
			setTimeout(() => {
				this.sidenav.open();
			}, 400)
	}


	public close() {
			this.sidenavwidth = 190;
			console.log(this.sidenavwidth);
			this.sideWidthMethod(this.sidenavwidth);
			this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
