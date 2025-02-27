import React, { FC, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";
// import { Box } from "zmp-ui";
import { Box } from "@mui/material";
import { ROUTER_APP } from "common/constants/router";
import { HomeHeader } from "components/headers/homeHeader";
import { MainHeader } from "components/headers/mainHeader";
import { useHandlePayment } from "hooks";
import { getSystemInfo } from "zmp-sdk";
import { Navigation } from "../navigations/navigation";

// Lazy load pages
const HomePage = React.lazy(() => import("pages/index"));
const ProfilePage = React.lazy(() => import("pages/profile"));
const InformationPage = React.lazy(() => import("pages/informationData"));
const ListProduct = React.lazy(() => import("pages/listProducts"));
const ProductDetailPage = React.lazy(() => import("pages/product"));
const PolicyPage = React.lazy(() => import("pages/common/policy"));
const SupportPage = React.lazy(() => import("pages/common/support"));
const LegacyPage = React.lazy(() => import("pages/common/legacy"));

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

type TabKeys = keyof typeof ROUTER_APP;
export const Layout: FC = () => {
  const location = useLocation();
  useHandlePayment();
  // hidden path
  const hiddenNavPaths = ["/update-profile", "/product-detail"];
  const isNavHidden = hiddenNavPaths.includes(location.pathname);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          position: "relative",
          gap: "10px",
          background: "#FAF8F8",
        }}
      >
        {location.pathname === "/" ? (
          <HomeHeader />
        ) : (
          <MainHeader title={ROUTER_APP[location.pathname].label} />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {Object.keys(ROUTER_APP).map((path) => {
              const route = ROUTER_APP[path];
              return <Route path={path} element={<route.component />}></Route>;
            })}
          </Routes>
        </Suspense>
      </Box>
      {!isNavHidden && (
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            zIndex: "4",
          }}
        >
          <Navigation />
        </Box>
      )}
    </Box>
  );
};
// {
//   /* <Route path="/" element={<HomePage />}></Route>
//             <Route path="/profile" element={<ProfilePage />}></Route>
//             <Route path="/update-profile" element={<InformationPage />}></Route>
//             <Route path="/list-product" element={<ListProduct />}></Route>
//             <Route path="/policy" element={<PolicyPage />}></Route>
//             <Route path="/support" element={<SupportPage />}></Route>
//             <Route path="/legacy" element={<LegacyPage />}></Route>
//             <Route
//               path="/product-detail"
//               element={<ProductDetailPage />}
//             ></Route> */
// }
