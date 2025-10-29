import { useAuth } from '../context';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default DashboardLayout;
