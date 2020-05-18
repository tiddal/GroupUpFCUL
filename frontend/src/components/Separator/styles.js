import styled from "styled-components";

export const Container = styled.div`
  top: 60px;
  position: fixed;
  padding: 0 14px 0 10px;
  width: 80%;
  height: 55px;
  background: #f6f6f6;
  display: flex;
  justify-content: space-between;

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    justify-content: flex-start;
    padding: 0;
  }
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #a6a6a6;
`;

export const Text = styled.text``;

export const InvisibleRect = styled.div`
  background: #f6f6f6;
`;
