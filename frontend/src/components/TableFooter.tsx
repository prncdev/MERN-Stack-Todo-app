import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import { FC, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function labelDisplayedRows({
  from,
  to,
  count,
}: {
  from: number;
  to: number;
  count: number;
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

type Props = {
  rows: number;
};

const TableFooter: FC<Props> = function ({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (_event: unknown, newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? rows : Math.min(rows, (page + 1) * rowsPerPage);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <tfoot>
      <tr>
        <td colSpan={5} className='!bg-neutral-300 !rounded-b-lg'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'flex-end',
              borderBottomRightRadius: '0.5rem',
              borderBottomLeftRadius: '0.5rem',
            }}
          >
            <FormControl orientation='horizontal' size='sm'>
              <FormLabel>Rows per page:</FormLabel>
              <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
              </Select>
            </FormControl>
            <Typography sx={{ textAlign: 'center', minWidth: 80 }}>
              {labelDisplayedRows({
                from: rows === 0 ? 0 : page * rowsPerPage + 1,
                to: getLabelDisplayedRowsTo(),
                count: rows === -1 ? -1 : rows,
              })}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size='sm'
                color='neutral'
                variant='outlined'
                disabled={page === 0}
                onClick={() => handleChangePage(page - 1)}
                sx={{ bgcolor: 'background.surface' }}
              >
                <MdKeyboardArrowLeft />
              </IconButton>
              <IconButton
                size='sm'
                color='neutral'
                variant='outlined'
                disabled={
                  rows !== -1
                    ? page >= Math.ceil(rows / rowsPerPage) - 1
                    : false
                }
                onClick={() => handleChangePage(page + 1)}
                sx={{ bgcolor: 'background.surface' }}
              >
                <MdKeyboardArrowRight />
              </IconButton>
            </Box>
          </Box>
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
