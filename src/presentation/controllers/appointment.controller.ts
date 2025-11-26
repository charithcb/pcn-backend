import { Request, Response } from "express";
import { AppointmentService } from "../../services/appointment.service";
import { ServiceError } from "../../services/errors";

const appointmentService = new AppointmentService();

export class AppointmentController {
  async list(_req: Request, res: Response) {
    const appointments = await appointmentService.list();
    res.json(appointments);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await appointmentService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await appointmentService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
