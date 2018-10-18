export class Product{
  active: boolean;
  brand: {
    id: number;
    name: string;
  };
  createDateUNIX: number;
  culture: {
    groupId: number;
    groupName: string;
    id: number;
    name: string;
  };
  fertilizerGroup: {
    id: number;
    name: string;
  };
  id: number;
  isFavorite: boolean;
  name: string;
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
      sales: [
        {
          active: boolean;
          blocked: boolean;
          description: string;
          endTimeUNIX: number;
          id: number;
          productsIds: [
            number
          ];
          startTimeUNIX: number;
          topic: string;
          url: string
        }
      ]
    }
  ];
  rating: number;
}