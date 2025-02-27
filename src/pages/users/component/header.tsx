import React, { FC } from "react";
import { Box, Header, } from "zmp-ui";
import { LOGO_SOKI_WHITE } from "assets/icon";
import '../common/styled/home.scss'
export const HeaderComponent: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px] custom-home"
      showBackIcon={false}
      title={
        (
          <Box flex flexDirection="column" justifyContent="space-between" alignItems="flex-start" className="space-x-2 header">
            <img
              className="h-14 rounded-lg "
              src={LOGO_SOKI_WHITE}
            />
          </Box>
        ) as unknown as string
      }
    />
  );
};
