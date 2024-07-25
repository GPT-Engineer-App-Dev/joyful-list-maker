import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const addTask = () => {
    if (newTask.title.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }
    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
    setIsModalOpen(false);
    toast.success("Task added successfully");
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setNewTask({ title: task.title, description: task.description });
    setIsModalOpen(true);
  };

  const updateTask = () => {
    if (newTask.title.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }
    const updatedTasks = tasks.map((t) =>
      t.id === currentTask.id
        ? { ...t, title: newTask.title, description: newTask.description }
        : t
    );
    setTasks(updatedTasks);
    setIsModalOpen(false);
    setCurrentTask(null);
    setNewTask({ title: "", description: "" });
    toast.success("Task updated successfully");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task deleted successfully");
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setIsModalOpen(true)} className="mb-4 bg-green-500 hover:bg-green-600 text-white">
        Add New Task
      </Button>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskStatus(task.id)}
              />
              <div>
                <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => editTask(task)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={currentTask ? updateTask : addTask}>
              {currentTask ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;