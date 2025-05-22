import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Flag, 
  BarChart4, 
  Settings, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive 
}) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center px-4 py-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-gray-600 hover:bg-gray-100'
        }
      `}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
      
      {isActive && (
        <span className="ml-auto h-2 w-2 rounded-full bg-primary-500" />
      )}
    </Link>
  );
};

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <ShieldCheck className="h-8 w-8 text-primary-600" />
          <h1 className="ml-2 text-xl font-bold text-gray-900">
            Admin Panel
          </h1>
        </div>
      </div>
      
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <SidebarItem
          to="/admin/users"
          icon={<Users size={20} />}
          label="User Management"
          isActive={currentPath === '/admin/users'}
        />
        
        <SidebarItem
          to="/admin/reports"
          icon={<Flag size={20} />}
          label="Reports"
          isActive={currentPath === '/admin/reports'}
        />
        
        <SidebarItem
          to="/admin/analytics"
          icon={<BarChart4 size={20} />}
          label="Analytics"
          isActive={currentPath === '/admin/analytics'}
        />
        
        <SidebarItem
          to="/admin/settings"
          icon={<Settings size={20} />}
          label="Settings"
          isActive={currentPath === '/admin/settings'}
        />
      </div>
      
      <div className="p-4 border-t">
        <button className="flex items-center w-full px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;