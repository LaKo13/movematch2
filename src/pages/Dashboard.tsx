import { useAuth } from '../contexts/AuthContext';
import { CustomerDashboard } from '../components/dashboard/CustomerDashboard';
import { MoverDashboard } from '../components/dashboard/MoverDashboard';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {user?.userType === 'customer' ? (
        <CustomerDashboard />
      ) : (
        <MoverDashboard />
      )}
    </DashboardLayout>
  );
}