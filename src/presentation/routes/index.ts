import { Application } from "express";
import { authRoutes } from "./auth.routes";
import { vehicleRoutes } from "./vehicle.routes";
import { userRoutes } from "./user.routes";
import { preorderRoutes } from "./preorder.routes";
import { inquiryRoutes } from "./inquiry.routes";
import { orderRoutes } from "./order.routes";
import { invoiceRoutes } from "./invoice.routes";
import { shippingRoutes } from "./shipping.routes";
import { appointmentRoutes } from "./appointment.routes";
import { reportRoutes } from "./report.routes";
import { notificationRoutes } from "./notification.routes";

export const registerRoutes = (app: Application) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/vehicles", vehicleRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/preorders", preorderRoutes);
  app.use("/api/inquiries", inquiryRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/invoices", invoiceRoutes);
  app.use("/api/shipments", shippingRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/reports", reportRoutes);
  app.use("/api/notifications", notificationRoutes);
};
