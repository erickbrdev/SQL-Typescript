import { Request, Response } from "express";
import { Job } from "../models";

export const jobsController = {
  index: async (req: Request, res: Response) => {
    try {
      const jobs = await Job.findAll({ include: "company" });
      return res.status(200).json(jobs);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  save: async (req: Request, res: Response) => {
    try {
      const { title, description, limitDate, companyId } = req.body;
      const jobs = await Job.create({
        title,
        description,
        limitDate,
        companyId,
      });
      return res.status(201).json(jobs);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id, {
        include: ["company", "candidates"],
      });
      const candidatesCount = await job?.countCandidates();
      return res.status(200).json({ ...job?.get(), candidatesCount });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, limitDate, companyId } = req.body;
      const [affectedRows, jobs] = await Job.update(
        {
          title,
          description,
          limitDate,
          companyId,
        },
        {
          where: { id },
          returning: true,
        }
      );
      return res.status(200).json(jobs[0]);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Job.destroy({ where: { id } });
      return res.status(204).end();
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  },

  addCandidates: async (req: Request, res: Response) => {
    const jobsId = req.params.id;
    const { candidateId } = req.body;
    try {
      const job = await Job.findByPk(jobsId);

      if (!job) {
        return res.status(404).json({ message: "Vaga não encontrada " });
      }

      await job.addCandidate(candidateId);
      return res.status(201).json({ message: "Candidato cadastrado" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  },

  removeCandidate: async (req: Request, res: Response) => {
    const jobsId = req.params.id;
    const { candidateId } = req.body;
    try {
      const job = await Job.findByPk(jobsId);

      if (!job) {
        return res.status(404).json({ message: "Candidato removido" });
      }

      await job.removeCandidate(candidateId);
      return res.status(204).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  },
};
