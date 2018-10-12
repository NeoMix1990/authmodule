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


	// count;
	// countplus: Observable<any>;
	// private countSubject = new Subject<any>();


  constructor() { 
		this.sideWidth = this.sideSubject.asObservable();
		// this.countplus = this.countSubject.asObservable();
	}
	// countPlusMethod(data) {
	// 	console.log(data)
	// 	this.countSubject.next(data);
	// }

	sideWidthMethod(data) {
		console.log(data);
			this.sideSubject.next(data);
	}

  private sidenav: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
		// this.count = 1;
		this.sidenavwidth = 3;
		console.log(this.sidenavwidth);
		// console.log(this.count);
		this.sideWidthMethod(this.sidenavwidth);
		// this.countPlusMethod(this.count);
		setTimeout(() => {
			this.sidenav.open();
		}, 400)
	}


	public close() {
		// this.count = 2;
		this.sidenavwidth = 190;
		console.log(this.sidenavwidth);
		// console.log(this.count);
		this.sideWidthMethod(this.sidenavwidth);
		// this.countPlusMethod(this.count);
		this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
