import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      { name: 'Авторизация', path: './login', children: [] },
      { 
        name: 'Главная', 
        path: './dashbroad', 
        children: [
          {
            name: 'Продукты',
            path: './products',
            children: [
              { 
                name: 'СЗР',
                path: './szr'
              },
              { 
                name: 'Семена',
                path: './seeds'
              },
              { 
                name: 'Акции',
                path: './sales'
              }        
            ]
          },
          {
            name: 'Пользователи',
            path: './users',
          },
          {
            name: 'Активности',
            path: './activity',
          },
          {
            name: 'КП',
            path: './orders',
          },
          {
            name: 'Отзывы',
            path: './reviews',
            children: [
              { 
                name: 'По контактам брендов',
                path: './contacts-reviews'
              },
              { 
                name: 'По Продуктам',
                path: './product-reviews',
                children: [
                  { 
                    name: 'СЗР отзывы',
                    path: './szr-reviews'
                  },
                  { 
                    name: 'Семена отзывы',
                    path: './seeds-reviews'
                  }  
                ]
              },      
            ]
          },
          {
            name: 'Технологии',
            path: './technology'
          },
          {
            name: 'Контакты',
            path: './contacts',
            children: [
              {
                name: 'Контакты ТДН',
                path: './contactsTDN'
              },
              {
                name: 'Контакты брендов',
                path: './contactsBrands'
              }
            ]
          },
          {
            name: 'Сообщения',
            path: './messages',
          },
          {
            name: 'Справочники',
            path: './manual',
          },
          {
            name: 'Аналитика',
            path: './analytics',
          },
          {
            name: 'Устройства',
            path: './devices',
          },
          {
            name: 'Настройки системы',
            path: './settings',
          },
        ] 
      },
    ];

    return menu;
  }
}
