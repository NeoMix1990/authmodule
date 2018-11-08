export class Order {
      activities: [
        {
          comment: string;
          counteragentId: string;
          counteragentName: string;
          creatorId: number;
          creatorName: string;
          endTimeUNIX: number;
          id: string;
          latitude: number;
          location: string;
          longitude: number;
          orders: number[];
          startTimeUNIX: number;
          topic: string;
        }
      ];
      activityId: string;
      createTimeUNIX: number;
      erpOrderCode: number;
      erpOrderId: string;
      erpPaymentTypeId: string;
      erpStatus: string;
      id: string;
      name: string;
      orderProducts: [
        {
          basePrice: number;
          crmProductId: number;
          discount: number;
          discountPrice: number;
          erpItemPrice: number;
          id: string;
          price: number;
          profitable: boolean;
          quantity: number;
          sum: number;
        }
      ];
      orderType: string;
      paidPercent: number;
      paymentTime: number;
      prePaymentTime: number;
      prepayment: number;
      productType: string;
      sum: number;

}
