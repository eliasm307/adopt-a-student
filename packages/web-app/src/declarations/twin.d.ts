// from https://github.com/ben-rogerson/twin.examples/tree/master/gatsby-emotion#complete-the-typescript-setup

import "twin.macro";
import styledImport from "@emotion/styled";
import { css as cssImport } from "@emotion/react";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
