import { FormHelperText, Option, Select, Textarea } from '@mui/joy';
import Button from '@mui/joy/Button';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { ChangeEventHandler, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdInfoOutline } from 'react-icons/md';

interface Todo {
  _id?: string;
  title: string;
  description: string;
  status: string;
  date: Date;
}


type Props = {
  open: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: Todo;
};

const initialState: Todo = {
  title: '',
  description: '',
  status: 'pending',
  date: new Date()
};

const FormModal: React.FC<Props> = function ({ open, onOpen, task }) {
  const [todo, setTodo] = useState<Todo>(initialState);
  const [error, setError] = useState<boolean>(false);

  const isFutureOrToday = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };
  
  useEffect(() => {
    if (task) {
      setTodo(task);
    } else {
      setTodo(initialState);
    }
    setError(false);
  }, [open, task]);

  const handleSubmission: ChangeEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!todo.title) {
      setError(true);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/api/task${task ? `/${task._id}` : ''}`, {
        method: task ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (response.ok) {
        console.log(`Todo ${task ? 'updated' : 'created'} successfully`);
        onOpen(false);
      } else {
        console.log(`Failed to ${task ? 'update' : 'create'} todo`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFormInput: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;
    if(name === 'title') setError(false);
    setTodo({...todo, [name]: value});
  };

  return (
    <Modal open={open} onClose={() => onOpen(false)}>
      <ModalDialog>
        <DialogTitle>{task ? 'Edit Todo' : 'Create new Todo'}</DialogTitle>
        <DialogContent>Fill in the information of the Todo.</DialogContent>
        <form onSubmit={handleSubmission}>
          <section className='w-[40rem] h-96 flex flex-col gap-2'>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                '& > div': {
                  width: '50%',
                },
              }}
            >
              <div>
                <FormLabel required>Title</FormLabel>
                <Input
                  value={todo.title}
                  onChange={handleFormInput}
                  name='title'
                  error={error}
                />
                {error && (
                  <FormHelperText className='!text-red-500 !text-base'>
                    <MdInfoOutline />
                    Title is required
                  </FormHelperText>
                )}
              </div>
              <div>
                <FormLabel>Due Date</FormLabel>
                <DatePicker
                  dateFormat='dd MMM, yyyy'
                  filterDate={isFutureOrToday}
                  selected={todo.date}
                  onChange={(date) => setTodo({...todo, date: date || new Date()})}
                  className='border border-[#cdd7e1] rounded p-[5px] shadow-xs w-full'
                />
              </div>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                minRows={3}
                maxRows={5}
                value={todo.description}
                name='description'
                onChange={handleFormInput}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                defaultValue='pending'
                className='w-36'
                name='status'
                value={todo.status}
                onChange={(_, value) =>
                  handleFormInput({
                    target: { name: 'status', value },
                  } as React.ChangeEvent<HTMLSelectElement>)
                }
                variant='soft'
                sx={{ '& button:focus': { outline: 'none' } }}
              >
                <Option color='neutral' value='pending'>
                  Pending
                </Option>
                <Option color='warning' value='in progress'>
                  In Progress
                </Option>
                <Option color='success' value='completed'>
                  Completed
                </Option>
              </Select>
            </FormControl>
            <Button
              className='w-[50%] !mt-4'
              type='submit'
            >
              {task ? 'Update Task' : 'Create Now'}
            </Button>
          </section>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default FormModal;
