import { Typography } from '@mui/joy';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Dispatch, FC, SetStateAction } from 'react';
import { MdAdd, MdMoreVert } from 'react-icons/md';

type Props = {
  onOpen: Dispatch<SetStateAction<boolean>>;
  onFilter: (status: string) => void;
  onSort: (order: string) => void;
};

const More: FC<Props> = function ({onOpen, onFilter, onSort}) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
      >
        <MdMoreVert size={23} />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem onClick={() => onOpen(true)}>
          <ListItemDecorator>
            <MdAdd />
          </ListItemDecorator>
          Add Todo
        </MenuItem>
        <ListDivider />
        <Typography className='!pl-1' component='span'>Sort By</Typography>
        <MenuItem color="neutral" onClick={() => onSort('oldest')}>
          Oldest
        </MenuItem>
        <MenuItem color="neutral" onClick={() => onSort('newest')}>
          Newest
        </MenuItem>

        <ListDivider />

        <Typography className='!pl-1' component='span'>Filter By Status</Typography>
        <section className="flex flex-col gap-1">
          <MenuItem variant="soft" color="neutral" onClick={() => onFilter('pending')}>
            Pending
          </MenuItem>
          <MenuItem variant="soft" color="warning" onClick={() => onFilter('in progress')}>
            In Progress
          </MenuItem>
          <MenuItem variant="soft" color="success" onClick={() => onFilter('completed')}>
            Completed
          </MenuItem>
        </section>
      </Menu>
    </Dropdown>
  );
}

export default More;