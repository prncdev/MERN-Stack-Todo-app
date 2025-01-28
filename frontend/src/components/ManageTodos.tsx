import { FC, useEffect, useState } from 'react';
import { Button } from '@mui/joy';
import FormModal from './FormModal';
import More from './Menu';
import ToDoTable from './Table';

interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: string;
}

const ManageTodos: FC = function () {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await (await fetch('http://localhost:8081/api/task')).json();
      setTasks(response.todos);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:8081/api/task/${id}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
  };

  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;
    if (filterStatus) {
      filteredTasks = filteredTasks.filter(task => task.status === filterStatus);
    }
    if (sortOrder) {
      filteredTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      });
    }
    return filteredTasks;
  };

  useEffect(() => {
    if (!open) {
      fetchTasks();
      setSelectedTask(undefined);
    }
  }, [open]);

  useEffect(() => {
    fetchTasks();
  }, [])

  return (
    <section className='bg-white rounded-lg'>
      <aside className='w-full flex justify-between my-2 py-2 px-3 bg-neutral-300 rounded-t-lg'>
        <h2 className='text-md text-black py-1.5'>Prince Todo App</h2>
        <section className="flex gap-1">
            <Button
              disabled={!filterStatus && !sortOrder}
              onClick={() => {
                setSortOrder(null);
                setFilterStatus(null);
              }}
              color='primary'
              className='!px-2 !py-1 !text-sm !font-medium'>
                Reset Filter
            </Button>
          <More
            onOpen={setOpen}
            onFilter={handleFilter}
            onSort={handleSort}
          />
        </section>
      </aside>
      <aside>
        <FormModal 
          open={open}
          onOpen={setOpen}
          task={selectedTask}
        />
        <ToDoTable
          data={getFilteredAndSortedTasks()}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </aside>
    </section>
  );
};

export default ManageTodos;
