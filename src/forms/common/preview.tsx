import styled from "@emotion/styled"
import { Box, Flex, Image } from "rebass"
export const Cross = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const ImageCardWrapper = styled(Box)`
  position: relative;
  display: inline-block;
  height: 240px;
  width: 240px;
  margin: 0px 16px 16px 0px;
`

export const StyledImageCard = styled(Box)`
  height: 240px;
  width: 240px;
  border: ${(props) => (props.selected ? "1px solid #53725D" : "none")};
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.08) 0px 3px 9px 0px,
    rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  border-radius: 3px;
`

export const StyledImageBox = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  .img-container {
    border: 1px solid black;
    background-color: white;
    height: 50px;
    width: 50px;
    &:first-of-type {
      height: 230px;
      width: 100%;
      object-fit: contain;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`
