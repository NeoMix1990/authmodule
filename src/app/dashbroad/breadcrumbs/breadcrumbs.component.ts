import { Component, OnInit } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  // breadcrumb: any;
  constructor(private router: Router, private breadcrumb: BreadcrumbService) {
    // this.router.events.subscribe(data => {
    //   if(data instanceof ActivationStart) {
    //         console.log(data);
    //         if(data.snapshot) {
    //           this.breadcrumb = data.snapshot.data.breadcrumb;
    //         }
    //       }
    // });
    this.menu = this.breadcrumb.getMenu();
    this.listenRouting();
  }

  ngOnInit() {
  }

  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this.router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        // Инициализировать breadcrumb
        target = this.menu;
        this.breadcrumbList.length = 0;
        // Получить текущий URL-адрес маршрутизации с /, [0] = первым слоем, [1] = второй слой ... и т. Д.
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {
          // Найдите этот слой в пути меню и тот же путь, что и текущая маршрутизация
          target = target.find(page => page.path.slice(2) === router);
          // После сохранения списка breadcrumbList список будет непосредственно сухарями.
          this.breadcrumbList.push({
            name: target.name,
            // Второй уровень начинает маршрутизацию и добавляет маршрутизацию предыдущего слоя. Относительное положение вызовет ошибку маршрутизации.
            path: (index === 0) ? target.path : `${this.breadcrumbList[index-1].path}/${target.path.slice(2)}`
          });
          
          // Следующий уровень, который нужно сравнить, - это указанная подстраница этого слоя.
          if (index+1 !== routerList.length) {
            target = target.children;
          }
        });

        // console.log(this.breadcrumbList);
      }
    });
  }

}
