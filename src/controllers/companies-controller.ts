import { Request, Response } from "express";
import { Company } from "../models";

export const companiesController = {
  index: async (_req: Request, res: Response) => {
    try {
      const companies = await Company.findAll();
      return res.status(200).json(companies);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  save: async (req: Request, res: Response) => {
    const { name, bio, website, email } = req.body;
    try {
      const companies = await Company.create({
        name,
        bio,
        website,
        email,
      });
      return res.status(201).json(companies);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const company = await Company.findByPk(id, { include: 'jobs'});
      res.status(200).json(company);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: `Empresa não encontrada` });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, website, email } = req.body;
    try {
      const [affectedRows, companies] = await Company.update(
        {
          name,
          bio,
          website,
          email,
        },
        {
          where: { id },
          returning: true,
        }
      );
      return res.json(companies[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await Company.destroy({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  },
};
