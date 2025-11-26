export const USER_ROLES = ["admin", "staff", "customer"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ORDER_STATUSES = ["pending", "confirmed", "cancelled", "completed"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const INQUIRY_STATUSES = ["new", "in_progress", "closed"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const PREORDER_STATUSES = ["new", "review", "matched", "cancelled"] as const;
export type PreorderStatus = (typeof PREORDER_STATUSES)[number];

export const SHIPPING_STATUSES = ["pending", "preparing", "shipped", "delivered"] as const;
export type ShippingStatus = (typeof SHIPPING_STATUSES)[number];

export const APPOINTMENT_STATUSES = ["scheduled", "completed", "cancelled"] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export const INVOICE_STATUSES = ["draft", "issued", "paid", "void"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const NOTIFICATION_TYPES = ["system", "order", "vehicle", "shipping"] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];
