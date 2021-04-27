import React from "react";
import { RoutePath } from "src/constants";

import AppLayout from "../layouts/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <p>Are you lost?</p>
      <p>
        Lets go back <a href={RoutePath.Home}>home</a>
      </p>
    </AppLayout>
  );
}
