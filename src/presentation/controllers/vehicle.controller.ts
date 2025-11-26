import { Request, Response } from "express";
import { VehicleRepository } from "../../infrastructure/repositories/vehicle.repository";

const vehicleRepository = new VehicleRepository();

export class VehicleController {
  async list(_req: Request, res: Response) {
    const vehicles = await vehicleRepository.list();
    res.json(vehicles);
  }

  async create(req: Request, res: Response) {
    const created = await vehicleRepository.create(req.body);
    res.status(201).json(created);
  }

  async get(req: Request, res: Response) {
    const vehicle = await vehicleRepository.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.json(vehicle);
  }

  async update(req: Request, res: Response) {
    const updated = await vehicleRepository.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.json(updated);
  }

  async remove(req: Request, res: Response) {
    const deleted = await vehicleRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(204).send();
  }
}
