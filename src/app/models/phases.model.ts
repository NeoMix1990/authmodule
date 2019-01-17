import { PhaseProducts } from "./phaseProducts.model";

export class Phases {
    description?: string;
    number?: string;
    phaseId?: string;
    phaseNumber?: number;
    phaseProducts?: PhaseProducts[] = [];

    constructor(description: string,
      number: string,
      phaseId: string,
      phaseNumber: number,
      phaseProducts?: PhaseProducts[]){}
  }