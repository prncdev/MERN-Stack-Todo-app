import { FC } from 'react';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { MdDelete, MdEdit } from 'react-icons/md';

type Props = {
  row: {
    _id: string;
    title: string;
    description: string;
    status: string;
    date: Date;
  };
  expend: boolean;
  onExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const Row: FC<Props> = function ({ row, expend, onExpand, onEdit, onDelete }) {
  return (
    <>
      <tr
        className={`text-left ${
          row.status === 'completed'
            ? '!bg-green-100 line-through'
            : row.status === 'in progress'
            ? '!bg-yellow-50'
            : '!bg-neutral-50'
        }`}
      >
        <td>
          <IconButton
            aria-label='expand row'
            variant='plain'
            color={`${row.status === 'completed' ? 'success' : row.status === 'in progress' ? 'warning': 'neutral'}`}
            size='sm'
            className='!outline-0'
            onClick={onExpand}
          >
            {expend ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </td>
        <td scope='row'>{row.title}</td>
        <td>{row.status}</td>
        <td>{new Date(row.date).toLocaleDateString()}</td>
        <td className='!text-center'>
          <div className='flex justify-center gap-2'>
            <IconButton
              aria-label='expand row'
              variant='soft'
              color='success'
              size='sm'
              className='!outline-0'
              onClick={onEdit}
            >
              <MdEdit size={25} />
            </IconButton>
            <IconButton
              aria-label='expand row'
              variant='soft'
              color='danger'
              size='sm'
              className='!outline-0'
              onClick={onDelete}
            >
              <MdDelete size={25} />
            </IconButton>
          </div>
        </td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={5}>
          {expend && (
            <Sheet
              variant='soft'
              sx={{
                p: 1,
                px: 5,
                boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)',
                textAlign: 'left',
              }}
            >
              <Typography level='body-lg' component='h3'>
                Description
              </Typography>
              <hr className='my-2 text-blue-300 opacity-30' />
              <Typography level='body-sm' component='p' className='!py-2'>
                {row.description}
              </Typography>
            </Sheet>
          )}
        </td>
      </tr>
    </>
  );
};

export default Row;
