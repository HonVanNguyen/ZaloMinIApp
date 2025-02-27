import { ReactElement, ReactNode } from "react";

export interface MenuItem {
  label: string;
  icon: ReactNode | null;
  activeIcon?: ReactNode | null;
  component: React.LazyExoticComponent<React.FC>; 
}
export interface MenuMiniItem {
  label: string;
  icon: ReactNode | null;
}