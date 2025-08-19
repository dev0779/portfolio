export interface Fonts {
  body: string;
  small: string;
  weightBody: string;
  lineHeightBody: string;
  lineHeightDisplay: string;
  fontFamilyDisplay: string;
  fontFamilyBody: string;
  fontgroup: string[];
}

export interface HeadlineSize {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  headlineWeight: string;
}

export interface Theme {
  name: string;
  background: string;
  text: string;
  primaryColor: string;
  whiteColor: string;
  ligthColor: string;
  grayColor: string;
  blackColor: string;
  successColor: string;
  errorColor: string;
  fonts: Fonts;
  headlineSize: HeadlineSize;
}
