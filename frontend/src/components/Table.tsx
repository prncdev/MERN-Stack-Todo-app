import { Sheet, Table } from '@mui/joy';
import { FC, useState } from 'react';
import Row from './CollapsibleRow';
import TableFooter from './TableFooter';

type Props = {
  data: {
    _id: string;
    title: string;
    description: string;
    date: Date;
    status: string;
  }[];
  loading: boolean;
  onEdit: (task: Props['data'][0]) => void;
  onDelete: (id: string) => void;
};

const ToDoTable: FC<Props> = function ({ data, loading, onEdit, onDelete }) {
  const [expendRow, setExpendRow] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpendRow(expendRow === index ? null : index);
  };

  return (
    <Sheet sx={{ height: 500, overflow: 'auto', borderRadius: '0.5rem' }}>
      <Table
        size='md'
        stickyHeader
        stickyFooter
        variant='soft'
        sx={{
          height: '100%',
          '& th, & td': {
            whiteSpace: 'nowrap',
          },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label='empty' />
            <th>Title</th>
            <th>Status</th>
            <th>Due date</th>
            <th className='!w-[10.625rem] !text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className='!p-0'>
                <h2 className='bg-white w-full block p-2 text-xl'>
                  Loading....
                </h2>
              </td>
            </tr>
          ) : data.length ? (
            data.map((row, index) => (
              <Row
                key={row._id}
                row={row}
                expend={expendRow === index}
                onExpand={() => handleExpand(index)}
                onEdit={() => onEdit(row)}
                onDelete={() => onDelete(row._id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className='!p-0'>
                <h2 className='bg-white w-full block p-2 text-xl'>No Todos</h2>
              </td>
            </tr>
          )}
        </tbody>
        <TableFooter rows={data.length} />
      </Table>
    </Sheet>
  );
};

export default ToDoTable;
