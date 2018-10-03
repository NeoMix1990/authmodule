export class ActivityTDO {
  comment: string;
  counteragentId: string;
  creatorId: number;
  creatorName: string;
  endTimeUNIX: number;
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  orders: [
    {
      activityId: number;
      approved: true;
      createTimeUNIX: number;
      erpOrderId: string;
      erpPaymentTypeId: string;
      id: number;
      orderProducts: [
        {
          basePrice: number;
          discount: number;
          discountPrice: number;
          erpCmsProductId: number;
          id: number;
          price: number;
          profitable: true;
          quantity: number;
        }
      ];
      paidPercent: number;
      prepayment: number;
      productType: string;
      sum: number;
    }
  ];
  startTimeUNIX: number;
  topic: string;
}