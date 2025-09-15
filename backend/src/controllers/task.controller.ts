import type { Request, Response } from "express";
import Task from "../models/task.model.ts";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const taskFound = await Task.findOne({ title, user: req.user!.id });

    if (taskFound) {
      res.status(400).json({ message: "La tarea ya se encuentra registrada" });
      return;
    }

    const newTask = new Task({
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      user: req.user!.id,
    });

    const taskSaved = await newTask.save();

    res.status(201).json({
      id: taskSaved._id.toString(),
      title: taskSaved.title,
      description: taskSaved.description,       
      completed: taskSaved.completed,
      createdAt: taskSaved.createdAt,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!.id }).select(
      "_id title description completed createdAt"
    );
    res.status(200).json(
      tasks.map((task) => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user!.id });

    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    const taskUpdated = await task.save();

    res.status(200).json({
      id: taskUpdated._id.toString(),
      title: taskUpdated.title,
      description: taskUpdated.description,
      completed: taskUpdated.completed,
      createdAt: taskUpdated.createdAt,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user!.id,
    });

    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
      return;
    }

    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
