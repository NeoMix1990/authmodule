export class Product{
  active: true;
  brand: number;
  createDateUNIX: number;
  groupOrCulture: number;
  id: number;
  isFavorite: true;
  productType: string;
  products: [
    {
      currency: string;
      id: number;
      idCMS: number;
      idCRM: number;
      idERP: string;
      idERPDescription: string;
      packagings: [
        {
          quantity: number;
          unit: string;
        }
      ];
      price: number;
      productProperties: string;
    }
  ];
  rating: number;
}