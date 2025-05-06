// src/components/common/GridItem.tsx
import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

interface GridItemProps {
  children: ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  key?: React.Key;
  sx?: SxProps<Theme>;
}

const GridItem: React.FC<GridItemProps> = ({ children, xs, sm, md, lg, xl, sx, key }) => {
  const gridItemStyles: SxProps<Theme> = {
    ...(xs !== undefined && { gridColumn: { xs: `span ${xs}` } }),
    ...(sm !== undefined && { gridColumn: { sm: `span ${sm}` } }),
    ...(md !== undefined && { gridColumn: { md: `span ${md}` } }),
    ...(lg !== undefined && { gridColumn: { lg: `span ${lg}` } }),
    ...(xl !== undefined && { gridColumn: { xl: `span ${xl}` } }),
    ...(sx || {}),
  };

  return (
    <Box 
      key={key}
      sx={{
        ...gridItemStyles,
        padding: 1, // Equivalent to Grid item spacing
      }}
    >
      {children}
    </Box>
  );
};

export default GridItem;