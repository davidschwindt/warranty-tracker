import { Duration } from './Duration';

export enum ExtendedWarrantyStart {
  purchaseDate = 'PURCHASE',
  expirationDate = 'EXPIRATION',
}

export type Category = {
  id: string;
  label: string;
};

type Item = {
  id: string;
  category: string; // ref id
  description: string;
  make: string;
  model: string;
  serial: string;
  purchaseDate: Date;
  purchaseMethod: string; // ref id
  manufacturerWarranty: Duration;
  itemImageUri: string;
  receiptImageUri: string;
  serialImageUri: string;
  warrantyImageUri: string;
  storageLocation: string;
  extendedWarranty?: {
    duration: Duration;
    startDate: ExtendedWarrantyStart;
  };
  notes: string;
};

export const itemLabels: Record<keyof Item, string> = {
  id: 'Id',
  category: 'Category',
  description: 'Description',
  make: 'Make',
  model: 'Model',
  serial: 'Serial Number',
  purchaseDate: 'Purchase Date',
  purchaseMethod: 'Purchase Method',
  manufacturerWarranty: 'Manufacturer Warranty',
  itemImageUri: 'Photo of item',
  receiptImageUri: 'Photo of receipt',
  serialImageUri: 'Photo of serial number',
  warrantyImageUri: 'Photo of warranty',
  storageLocation: 'Storage Location of Original Warranty',
  extendedWarranty: 'In-Store Extended Warranty Purchased',
  notes: 'Notes',
};

export default Item;
