import { Request, Response } from "express";
import { AppointmentRepository } from "../../infrastructure/repositories/appointment.repository";

const appointmentRepository = new AppointmentRepository();

export class AppointmentController {
  async list(_req: Request, res: Response) {
    const appointments = await appointmentRepository.list();
    res.json(appointments);
  }

  async create(req: Request, res: Response) {
    const { customer, scheduledAt } = req.body;
    if (!customer || !scheduledAt) {
      return res
        .status(400)
        .json({ message: "customer and scheduledAt are required" });
    }
    const created = await appointmentRepository.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await appointmentRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Appointment not found" });
    res.json(updated);
  }
}
