import { configureStore } from "@reduxjs/toolkit";

import websiteLeadReducer from "../fethure/website/websiteSlice";
import googleLeadReducer from "../fethure/googleAdds/googleAddSlice";
import metaLeadReducer from "../fethure/metaAdds/metaAddSlice";
import dashboardReducer from "../fethure/dashboard/dashboardSlice";
import chartReducer from "../fethure/leadChart/leadChatSlice";

export const store = configureStore({
  reducer: {
    websiteLeads: websiteLeadReducer,
    googleLeads: googleLeadReducer,
    metaLeads: metaLeadReducer,
    dashboard: dashboardReducer,
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
