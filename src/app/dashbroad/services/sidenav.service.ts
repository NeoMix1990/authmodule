import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ContactTdnPreviewComponent } from '../pages/contacts/contacts-tdn/contact-tdn-preview/contact-tdn-preview.component';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private sidenav: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
		return this.sidenav.open();
	}


	public close() {
		return this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}
