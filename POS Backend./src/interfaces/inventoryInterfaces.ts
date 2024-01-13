/** @format */

import { Document } from "mongoose";

export interface IInventory extends Document {
  Request: IRequest;
  Image: Buffer;
  ItemName?: string;
}
// Interface for Item Object.

export interface IRequest extends Document {
  ItemName: string;
  ItemImage: string;
  ItemCode: string;
  Brand: string;
  Category: string;
  Description: string;
  Discount: number;
  UnitPrice: number;
  IsActive: boolean;
}
