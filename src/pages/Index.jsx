import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "", dueDate: null, priority: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleAddTask = () => {
    if (isEditing) {
      const updatedTasks = tasks.map((t, index) => (index === editIndex ? task : t));
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask({ title: "", description: "", dueDate: null, priority: "" });
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t));
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todo Application</h1>
        <Button variant="outline">Toggle Dark Mode</Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Task" : "Add Task"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={task.title} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={task.description} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <DatePickerDemo selected={task.dueDate} onSelect={(date) => setTask({ ...task, dueDate: date })} />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={task.priority} onValueChange={(value) => setTask({ ...task, priority: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddTask}>{isEditing ? "Save Changes" : "Add Task"}</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-2">
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <Card key={index} className={task.completed ? "bg-gray-200" : ""}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{task.description}</p>
                  <p>Due Date: {task.dueDate ? task.dueDate.toLocaleDateString() : "None"}</p>
                  <p>Priority: {task.priority}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={task.completed} onCheckedChange={() => handleCompleteTask(index)} />
                    <span>Completed</span>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => handleEditTask(index)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteTask(index)}>
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
