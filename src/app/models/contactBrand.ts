export class  ContactBrand {
    brandContactCommentDTOs: [
      {
        active: boolean;
        brand: {
          id: number;
          name: string;
        };
        brandContact: number;
        brandContactName: string;
        brandContactPosition: string;
        createDateUNIX: number;
        creatorId: number;
        creatorName: string;
        id: number;
        message: string;
      }
    ];
    brandId: number;
    brandName: string;
    email: string;
    firstPhone: string;
    id: number;
    imgUrl: string;
    name: string;
    position: string;
    productType: string;
    secondPhone: string;
  }