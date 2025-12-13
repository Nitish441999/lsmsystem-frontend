import { configureStore } from '@reduxjs/toolkit';
import leadReducer from './leadSlice';

export const store = configureStore({
  reducer: {
    leads: leadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['leads/setLeads', 'leads/addLead', 'leads/updateLead'],
        ignoredPaths: ['leads.leads', 'leads.filteredLeads'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
