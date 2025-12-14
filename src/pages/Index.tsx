import { Outlet } from 'react-router-dom';
import { LeadsProvider } from '@/contexts/LeadsContext';

const Index = () => {
  return (
    <LeadsProvider>
      <Outlet />
    </LeadsProvider>
  );
};

export default Index;
