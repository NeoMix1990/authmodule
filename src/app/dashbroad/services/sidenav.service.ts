import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
	sidenavWidth = 220;
	padding = 0;
	indexsidebar = 5;
	

	sideWidth: Observable<any>;
	private sideSubject = new Subject<any>();


	pad: Observable<any>;
	private padSubject = new Subject<any>();

	indexsid: Observable<any>;
	private indexsidSubject = new Subject<any>();
	


  constructor() { 
		this.sideWidth = this.sideSubject.asObservable();
		this.pad = this.padSubject.asObservable();
		this.indexsid = this.indexsidSubject.asObservable();
	}
	sideWidthMethod(data) {
		// console.log(data);
			this.sideSubject.next(data);
	}

	public setPadding(padding) {
		this.padding = padding;
	}

	paddingMethod(data) {
		// console.log(data);
			this.padSubject.next(data);
	}

	indexsidMethod(data) {
		// console.log(data);
			this.indexsidSubject.next(data);
	}

  public sidenav: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
			// console.log(this.sidenavWidth);
			this.sideWidthMethod(this.sidenavWidth);
			this.paddingMethod(this.padding);
			this.indexsidMethod(this.indexsid);
			setTimeout(() => {
				this.sidenav.open();
			}, 1000)
	}


	public close() {
			// console.log(this.sidenavWidth);
			this.sideWidthMethod(this.sidenavWidth);
			this.paddingMethod(this.padding);
			this.indexsidMethod(this.indexsid);
			this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
