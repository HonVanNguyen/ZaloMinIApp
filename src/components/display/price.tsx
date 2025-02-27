import React, { FC } from "react";
import { getConfig } from "utils/config";

export const DisplayPrice: FC<{ children: number }> = ({ children }) => {
  const symbol = getConfig((config) => config.template.currencySymbol);
  if (getConfig((config) => config.template.prefixCurrencySymbol)) {
    return (
      <>
        {symbol}
        {children ? children.toLocaleString() : null}
      </>
    );
  } else {
    return (
      <>
        {children ? children.toLocaleString() : null}
        {symbol}
      </>
    );
  }
};
