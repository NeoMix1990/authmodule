import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { SidenavService } from '../../../services/sidenav.service';
import { ActivityComponent } from '../activity.component';
import { MatPaginator, MatSidenav, MatSort, MatTableDataSource, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material';
import { HttpService } from '../../../services/http.service';
import { OrderService } from '../../orders/order.service';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { GoogleLocation } from '../../../../models/googlelocation.model';
declare let google: any;

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.css']
})

export class ActivityPreviewComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['name', 'date', 'sum', 'status', 'link'];

    dataSource: MatTableDataSource<any>;

  constructor(private _http: HttpService,
              private sidenavService: SidenavService,
              private orderServ: OrderService, 
              private activity: ActivityService,
              public activityComponent: ActivityComponent) {  }

    @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    if(this.activity.ifroadTo === true) {
      setTimeout(() => {
        this.getOrders();
        this.getGoogle();
        this.initMap();
      }, 1000);
    }
  }
  ngAfterViewInit(): void {
    // Load google maps script after view init
    const DSLScript = document.createElement('script');
    DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQAarkuaOJcfPGkkQbGtXCx_60J5z6ODQ'; // replace by your API key
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
  }

  getFilter() {
    this.getOrders();
    this.sidenavService.close();
    this.getGoogle();
  }

    getOrders() {
      this.dataSource = new MatTableDataSource(this.activity.selectedActivity.orders);
    }

  close() {
    this.sidenavService.close();
    this.sidenavService.padding = 0;
    this.sidenavService.sidenavWidth = 220;
  }

// init map
    waypts = [];
    wayptsnotsort: GoogleLocation[] = [];
    // waypts = [
    //   { location: { lat: 50.4874328, lng: 30.5015491 } },
    //   { location: { lat: 50.4874333, lng: 30.5015497 } },
    //   { location: { lat: 50.487433, lng: 30.5015509 } },
    //   { location: { lat: 50.4874358, lng: 30.5015528 } },
    //   { location: { lat: 50.4874319, lng: 30.501535 } },
    //   { location: { lat: 50.4874372, lng: 30.5015527 } },
    //   { location: { lat: 50.4874372, lng: 30.5015524 } },
    //   { location: { lat: 50.4875173, lng: 30.5014949 } },
    //   { location: { lat: 50.4878612, lng: 30.5012469 } },
    //   { location: { lat: 50.3902134, lng: 30.4934509 } },
    // ];
    getGoogle() {
      return this._http.getContent(`${PROD_URL}/activity/${this.activity.selectedActivity.id}/logs`).subscribe(data => {
        this.wayptsnotsort = [];
        this.waypts = [];
        this.wayptsnotsort = Object(data).slice().sort((a, b) => {
          if (a.time > b.time) {
            return 1;
          } else if (b.time > a.time) {
            return -1;
          } else {
            return 0;
          }});
        console.log(this.wayptsnotsort);
        this.wayptsnotsort.forEach(element => {
          this.waypts.push(element.location);
        });
        console.log(this.waypts);

				if(this.wayptsnotsort.length > 0){
					this.initMap();
				}
      });
    }
    initMap() {
			let mapdot = [];
				mapdot = this.wayptsnotsort;
				let mapmy = this.waypts;
				let map = new google.maps.Map(document.getElementById('map'), {
					zoom: 14,
					center: {lat: mapmy[0].lat, lng: mapmy[0].lng},  // Kiev.
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});

				// let directionsService = new google.maps.DirectionsService;
				let directionsDisplay = new google.maps.DirectionsRenderer({
					draggable: false,
					map: map
				});
				// console.log(mapdot);
				// console.log(mapdot[0]);
				// console.log(mapdot[mapdot.length-1]);
				// displayRoute(mapdot[0], mapdot[mapdot.length-1], directionsService,
				//     directionsDisplay);

				// function displayRoute(origin, destination, service, display) {
				//   service.route({
				//     origin: origin,
				//     destination: destination,
				//     // waypoints: [{location: 'Melbourne, NSW'}, {location: 'Broken Hill, NSW'}],
				//     waypoints: mapdot,
				//     travelMode: 'DRIVING',
				//     avoidTolls: true
				//   }, function(response, status) {
				//     if (status === 'OK') {
				//       display.setDirections(response);
				//     } else {
				//       alert('Could not display directions due to: ' + status);
				//     }
				//   });
				// }

				let flightPath = new google.maps.Polyline({
					path: mapmy,
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 2
				});
				
				let marker, i;
				let infowindow = new google.maps.InfoWindow();
					
				flightPath.setMap(map);
				// function computeTotalDistance(result) {
				//   let total = 0;
				//   let myroute = result.routes[0];
				//   for (let i = 0; i < myroute.legs.length; i++) {
				//     total += myroute.legs[i].distance.value;
				//   }
				//   total = total / 1000;
				//   document.getElementById('total').innerHTML = total + ' км';
				// }

				for (i = 0; i < mapdot.length; i++) {  
					let label = String.fromCharCode(65+i);
					marker = new google.maps.Marker({
						map: map,
						label: label,
						position: new google.maps.LatLng(mapdot[i].location)
					});

					
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infowindow.setContent(Unix_timestamp(mapdot[i].time));
							infowindow.open(map, marker);
							console.log(Unix_timestamp(mapdot[i].time)); 
						}
					})(marker, i));
				}

				function Unix_timestamp(t){
					let dt = new Date(t);
					let hr = dt.getHours();
					let m = "0" + dt.getMinutes();
					let s = "0" + dt.getSeconds();
					return hr+ ':' + m.substr(-2) + ':' + s.substr(-2); 
				}


			// directionsDisplay.addListener('directions_changed', function() {
      //   computeTotalDistance(directionsDisplay.getDirections());
      // });
    }


  goToCP(activity) {
    this.activity.roadMainCP(activity);
  }

}
