import React from 'react';
import { Box } from 'components/blocks/reflexbox';
import Tooltip from './tooltip';
import styled from '@emotion/styled';
import InfoIcon from "components/icons/info-icon"

const StyledBox = styled(Box)`
  & svg {
    transition: fill 0.2s ease-in;
  }
`;

const InfoTooltip = ({ tooltipText, tooltipProps, ...props }) => {
  const id = `tooltip-${tooltipText}`;
  return (
    <StyledBox {...props}>
      <InfoIcon
        size={16} className="flex text-grey-40"
        data-for={id}
        data-tip={tooltipText}
      />
      <Tooltip multiline={true} id={id} {...tooltipProps} />
    </StyledBox>
  );
};

export default InfoTooltip;
