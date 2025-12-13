import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setLeads } from '@/store/leadSlice';
import { mockLeads } from '@/data/mockLeads';
import { Outlet } from 'react-router-dom';

function AppInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize with mock data
    store.dispatch(setLeads(mockLeads));
  }, []);

  return <>{children}</>;
}

const Index = () => {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Outlet />
      </AppInitializer>
    </Provider>
  );
};

export default Index;
