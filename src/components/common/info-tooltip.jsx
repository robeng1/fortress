import React from 'react';
import { Box } from 'components/common/reflexbox';
import Tooltip from './tooltip';
import styled from '@emotion/styled';
import { ReactComponent as InfoIcon } from '../../images/info.svg';

const StyledBox = styled(Box)`
  & svg {
    fill: #c4c4c4;
    transition: fill 0.2s ease-in;
  }
  &:hover svg {
    fill: #454b54;
  }
`;

const InfoTooltip = ({ tooltipText, tooltipProps, ...props }) => {
  const id = `tooltip-${tooltipText}`;
  return (
    <StyledBox {...props}>
      <InfoIcon
        style={{ display: 'block' }}
        data-for={id}
        data-tip={tooltipText}
      />
      <Tooltip multiline={true} id={id} {...tooltipProps} />
    </StyledBox>
  );
};

export default InfoTooltip;
