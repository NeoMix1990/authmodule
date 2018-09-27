export class Product{
    createDateUNIX: number;
    id: number;
    isFavorite: true;
    // productType: HYBRID;
    products: [
      {
        id: number;
        idCMS: number;
        idCRM: number;
        idERP: string;
        idERPDescription: string;
        packagings: [
          {
            quantity: number;
            unit: string
          }
        ];
        productProperties: string
      }
    ];
    rating: number
}