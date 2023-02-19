import { CButton } from "@coreui/react";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
  --primary-color: #4682B4;
}

*, *::before, *::after {
  box-sizing: inherit;
}

html {
    font-size: 62.5%;
    box-sizing: border-box;
}

body {
    font-family: 'Rubik', sans-serif;
}

a {
  text-decoration: none;
  display: block;
}

h1 {
	font-size: clamp(5rem,5vw,7rem);
}

h2 {
  font-size: clamp(3rem, 4vw, 5rem);
}

h1, h2, p {
	margin: 0 0 3rem;
}

h3 {
	margin: 2rem 0;
}

h4 {
	font-size: 2rem;
}
p {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}


`;

export const Container = styled.div`
  width: min(1350px, 95%);
  margin: 0 auto;
`;

export const Button = styled(CButton)`
  text-transform: uppercase;
  cursor: pointer;
  font-size: 1.5rem;
  color: #fff;
  padding: 1.8rem 5rem;
`;
