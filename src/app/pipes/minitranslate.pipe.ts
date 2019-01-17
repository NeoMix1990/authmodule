import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minitranslate'
})
export class MinitranslatePipe implements PipeTransform {

  transform(value: string): any {
    if(value === "FERTILIZER") {
      return value = "СЗР";
    } else if (value === "HYBRID") {
      return value = "Семена";
    } else if (value === "SALE") {
      return value = "Акция";
    } else if (value === "BRAND_CONTACT") {
      return value = "Контакт бренда";
    } else if (value === "CRM_PRODUCT") {
      return value = "Продукт";
    } else if (value === "MESSAGE") {
      return value = "Простое";
    }
  }

}
