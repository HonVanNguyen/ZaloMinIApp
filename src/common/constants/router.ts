// export enum appRouter {
//     PROFILE = '/profile',
//     LIST_NEW = '/list-product',
//     POLICY = '/policy',
//     HELP = '/support',
//     TERM = '/legacy',
//     SUBJECT= '/list-product'
//   }
// export const getRoutePath = (routeKey: keyof typeof appRouter): string => {
// return appRouter[routeKey];

import { IC_GIFT, IC_GIFT_AC, IC_HOME, IC_HOME_AC, IC_NOTI, IC_PROFILE, IC_PROFILE_AC } from "assets/bottom";
import React from "react";
import { MenuItem } from "types/menu";

// Lazy load pages
const HomePage = React.lazy(() => import("pages/index"));
const ProfilePage = React.lazy(() => import("pages/profile"));
const GiftRedemptionPage = React.lazy(() => import("pages/giftRedemptionPage"));
const InformationPage = React.lazy(() => import("pages/informationData"));
const ListProduct = React.lazy(() => import("pages/listProducts"));
const ProductDetailPage = React.lazy(() => import("pages/product"));
const PolicyPage = React.lazy(() => import("pages/common/policy"));
const SupportPage = React.lazy(() => import("pages/common/support"));
const LegacyPage = React.lazy(() => import("pages/common/legacy"));


export const ROUTER_APP: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: IC_HOME,
    activeIcon: IC_HOME_AC,
    component: HomePage,
  },
  "/gift": {
    label: "Đổi quà",
    icon: IC_GIFT,
    activeIcon: IC_GIFT_AC,
    component: GiftRedemptionPage,
  },
  "/notification": {
    label: "Thông báo",
    icon: IC_NOTI,
    activeIcon: IC_NOTI,
    component: HomePage,
  },
  "/profile": {
    label: "Cá nhân",
    icon: IC_PROFILE,
    activeIcon: IC_PROFILE_AC,
    component: ProfilePage,
  },
};
