import { Request, Response } from "express";
import { VehicleModel } from "../../infrastructure/models/vehicle.model";
import { OrderModel } from "../../infrastructure/models/order.model";
import { InquiryModel } from "../../infrastructure/models/inquiry.model";
import { UserModel } from "../../infrastructure/models/user.model";
import { PreorderModel } from "../../infrastructure/models/preorder.model";

export class ReportController {
  async summary(_req: Request, res: Response) {
    const [vehicles, orders, inquiries, users, preorders] = await Promise.all([
      VehicleModel.countDocuments(),
      OrderModel.countDocuments(),
      InquiryModel.countDocuments(),
      UserModel.countDocuments(),
      PreorderModel.countDocuments(),
    ]);

    res.json({ vehicles, orders, inquiries, users, preorders });
  }
}
