import React from "react";

import { Container, Text, InvisibleRect, Line } from "./styles";

function Separator({ text }) {
  return (
    <Container>
      <Line>
        <InvisibleRect>
          <Text>{text}</Text>
        </InvisibleRect>
      </Line>
    </Container>
  );
}

export default Separator;
