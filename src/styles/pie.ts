import styled from "styled-components";

export const ChartLabel = styled.text`
  fill: #1C1C1E;
  font-size: 20px;
  font-weight: 600;
  text-anchor: middle;
`;

export const ChartSubLabel = styled.text<{ smaller?: boolean }>`
  fill: #1C1C1E;
  font-size: ${({ smaller }) => smaller ? '10px' : '14px'};
  font-weight: 300;
  text-anchor: middle;
`;