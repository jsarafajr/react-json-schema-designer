import React, { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';
import {
  SmallAddIcon,
  EditIcon,
  DeleteIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DragHandleIcon,
} from '@chakra-ui/icons';

type IconName = 'add' | 'edit' | 'delete' | 'chevron-down' | 'chevron-right' | 'drag-handle';

type Props = {
  icon: IconName;
  active?: boolean;
  dimmed?: boolean;
  hidden?: boolean;
  highlight?: boolean;
  onClick?: () => void;
};

const iconsMap: { [i in IconName]: ReactNode } = {
  add: <SmallAddIcon w="14px" h="14px" />,
  edit: <EditIcon w="12px" h="12px" />,
  delete: <DeleteIcon w="12px" h="12px" />,
  'chevron-down': <ChevronDownIcon w="14px" h="14px" />,
  'chevron-right': <ChevronRightIcon w="14px" h="14px" />,
  'drag-handle': <DragHandleIcon w="12px" h="12px" />,
};

export const ActionButton = (props: Props) => {
  const opacity = props.dimmed ? 0.2 : 1;
  const visibility = props.hidden ? 'hidden' : 'visible';

  return (
    <Button
      width="1em"
      size="xs"
      variant="ghost"
      h="16px"
      minWidth="16px"
      isActive={props.active}
      css={{ opacity, visibility }}
      onClick={props.onClick}
    >
      {iconsMap[props.icon]}
    </Button>
  );
};
