export class ProductReview {
    active: boolean;
    brand: {
      id: number;
      name: string;
    };
    createDateUNIX: number;
    creatorId: number;
    creatorName: string;
    crmProductId: number;
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
    imageUrl: string;
    message: string;
    name: string;
    rating: number;
    vote: number;
}