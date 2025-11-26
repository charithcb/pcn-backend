import { Request, Response } from "express";
import { VehicleService } from "../../services/vehicle.service";
import { ServiceError } from "../../services/errors";

const vehicleService = new VehicleService();

export class VehicleController {
  async list(_req: Request, res: Response) {
    const vehicles = await vehicleService.list();
    res.json(vehicles);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await vehicleService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async get(req: Request, res: Response) {
    try {
      const vehicle = await vehicleService.getById(req.params.id);
      return res.json(vehicle);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await vehicleService.update(req.params.id, req.body);
      return res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await vehicleService.remove(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
