import React from "react";
import { RecoilRoot } from "recoil";
import { getConfig } from "utils/config";
import { App, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { ConfigProvider } from "./config-provider";
import { Layout } from "./layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "redux/store";
import { SplashScreen } from "./layout/splashScreen";
const MyApp = () => {
  const queryClient = new QueryClient();
  // Splashscreen
  const [showSplashscreen, setShowSplashscreen] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setShowSplashscreen(false);
    }, 1000);
  }, []);
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#FAF8F8",
        }}
      >
        <App>
          <SnackbarProvider>
            <ReduxProvider store={store}>
              {showSplashscreen ? (
                <SplashScreen />
              ) : (
                <ZMPRouter>
                  <QueryClientProvider client={queryClient}>
                    <Layout />
                  </QueryClientProvider>
                </ZMPRouter>
              )}
            </ReduxProvider>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
