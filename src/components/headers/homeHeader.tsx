
import React, { FC } from "react";
import { Box, Header } from "zmp-ui";
import { LOGO_MAIN } from "assets/icon";
export const HomeHeader: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px] custom-home-main "
      style={{
        position: "relative",
      }}
      showBackIcon={false}
      title={
        (
          <Box
            flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            className="header"
          >
            <img className="h-14 rounded-lg " src={LOGO_MAIN} />
          </Box>
        ) as unknown as string
      }
    />
  );
};
