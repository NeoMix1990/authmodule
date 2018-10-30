export class Product{
  active: boolean;
  brand: {
    id: number;
    brandName: string;
  };
  createDateUNIX: number;
  culture: {
    groupId: number;
    groupName: string;
    id: number;
    cultureName: string;
  };
  fertilizerGroup: {
    id: number;
    fertilizerGroupName: string;
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