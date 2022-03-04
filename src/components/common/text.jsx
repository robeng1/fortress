import React, { forwardRef } from 'react';
import { Box } from './reflexbox';

export const Text = forwardRef((props, ref) => (
  <Box ref={ref} tx="text" {...props} />
));
