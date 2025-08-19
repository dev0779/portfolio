/* eslint-disable @typescript-eslint/no-empty-object-type */
import "styled-components";
import { Theme } from "./Theme/ThemeTypes";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}


