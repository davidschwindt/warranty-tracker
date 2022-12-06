import { Duration } from './Duration';
import { ExtendedWarrantyStart } from './Item';

export enum Threat {
  damage = 'DAMAGE',
  loss = 'LOSS',
  theft = 'THEFT',
}

export type ProtectionLimit = {
  amount: number;
  type: ProtectionLimitType;
};

export enum ProtectionLimitType {
  account = 'ACCOUNT',
  card = 'CARD',
  claim = 'CLAIM',
  person = 'PERSON',
}

type ProtectionPlan = {
  duration: Duration;
  threats: Threat[];
  limits: ProtectionLimit[];
};

type PurchaseMethod = {
  id: string;
  description: string;
  lastFour: string;
  purchaseProtection?: ProtectionPlan;
  extendedWarranty?: {
    duration: Duration;
    startDate: ExtendedWarrantyStart;
  };
  returnProtectionEnabled: boolean;
};

export const purchaseMethodLabels: Record<
  Exclude<
    keyof PurchaseMethod | keyof ProtectionPlan,
    'purchaseProtection' | 'extendedWarranty' | 'id'
  >,
  string
> = {
  description: 'Description',
  lastFour: 'Last 4 Digits:',
  duration: 'Duration',
  threats: 'Protects Against',
  limits: 'Limit',
  returnProtectionEnabled: 'Return Protection',
};

export default PurchaseMethod;
