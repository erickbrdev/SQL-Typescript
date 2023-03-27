import { Request, Response } from "express";
import { Candidate } from "../models";

export const candidatesController = {
  //GET ALL /candidates
  index: async (req: Request, res: Response) => {
    try {
      const candidates = await Candidate.findAll();
      return res.status(200).json(candidates);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  // POST
  save: async (req: Request, res: Response) => {
    const { name, bio, email, phone, openToWork } = req.body;
    try {
      const candidate = await Candidate.create({
        name,
        bio,
        email,
        phone,
        openToWork,
      });
      return res.status(201).json(candidate);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const candidate = await Candidate.findByPk(id);
      return res.status(200).json(candidate);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, email, phone, openToWork } = req.body;
    try {
      const [affectedRows, candidates] = await Candidate.update(
        {
          name,
          bio,
          email,
          phone,
          openToWork,
        },
        {
          where: { id },
          returning: true,
        }
      );

      return res.status(200).json(candidates[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await Candidate.destroy({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
