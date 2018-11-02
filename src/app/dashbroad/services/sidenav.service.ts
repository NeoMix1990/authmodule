import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ContactTdnPreviewComponent } from '../pages/contacts/contacts-tdn/contact-tdn-preview/contact-tdn-preview.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
	sidenavWidth = 190;
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
			console.log(this.sidenavWidth);
			this.sideWidthMethod(this.sidenavWidth);
			setTimeout(() => {
				this.sidenav.open();
			}, 400)
	}


	public close() {
			console.log(this.sidenavWidth);
			this.sideWidthMethod(this.sidenavWidth);
			this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
