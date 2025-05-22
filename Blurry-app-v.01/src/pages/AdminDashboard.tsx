import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart4, Users, AlertTriangle, User, ShieldCheck } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Slider from '../components/ui/Slider';
import Button from '../components/ui/Button';

const AdminDashboard: React.FC = () => {
  const [matchAgeSimilarity, setMatchAgeSimilarity] = useState(70);
  const [matchLocationImportance, setMatchLocationImportance] = useState(60);
  const [matchInterestWeight, setMatchInterestWeight] = useState(80);
  
  const navigate = useNavigate();
  
  // Mock stats data
  const stats = [
    {
      label: 'Total Users',
      value: '12,845',
      change: '+15%',
      icon: <Users size={24} className="text-primary-500" />,
    },
    {
      label: 'Active Today',
      value: '1,287',
      change: '+8%',
      icon: <User size={24} className="text-accent-500" />,
    },
    {
      label: 'Pending Reports',
      value: '23',
      change: '-4%',
      icon: <AlertTriangle size={24} className="text-error-500" />,
    },
    {
      label: 'Successful Matches',
      value: '3,156',
      change: '+12%',
      icon: <ShieldCheck size={24} className="text-success-500" />,
    },
  ];
  
  // Mock users data
  const users = [
    {
      id: 'u1',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      joined: '2023-09-15',
      status: 'active',
      reports: 0,
    },
    {
      id: 'u2',
      name: 'Michael Scott',
      email: 'michael@example.com',
      joined: '2023-10-02',
      status: 'pending',
      reports: 0,
    },
    {
      id: 'u3',
      name: 'David Johnson',
      email: 'david@example.com',
      joined: '2023-10-05',
      status: 'active',
      reports: 2,
    },
    {
      id: 'u4',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      joined: '2023-10-10',
      status: 'suspended',
      reports: 5,
    },
    {
      id: 'u5',
      name: 'Robert Brown',
      email: 'robert@example.com',
      joined: '2023-10-12',
      status: 'active',
      reports: 0,
    },
  ];
  
  // Mock reports data
  const reports = [
    {
      id: 'r1',
      reporter: 'Emma Wilson',
      reported: 'David Johnson',
      reason: 'Inappropriate messages',
      date: '2023-10-12',
      status: 'pending',
    },
    {
      id: 'r2',
      reporter: 'Michael Scott',
      reported: 'Sarah Miller',
      reason: 'Fake profile',
      date: '2023-10-10',
      status: 'resolved',
    },
    {
      id: 'r3',
      reporter: 'Sarah Miller',
      reported: 'David Johnson',
      reason: 'Harassment',
      date: '2023-10-08',
      status: 'pending',
    },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-medium">Admin User</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
                AU
              </div>
            </div>
          </div>
          
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100">
                    {stat.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent users */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Recent Users</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Joined</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                              {user.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge
                            variant={
                              user.status === 'active' ? 'success' :
                              user.status === 'pending' ? 'warning' :
                              'error'
                            }
                            size="sm"
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          {new Date(user.joined).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin/users')}
                >
                  View All Users
                </Button>
              </div>
            </Card>
            
            {/* Recent reports */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Recent Reports</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-3 font-medium">Reported User</th>
                      <th className="pb-3 font-medium">Reason</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b">
                        <td className="py-3">
                          <p className="font-medium">{report.reported}</p>
                          <p className="text-xs text-gray-500">
                            by {report.reporter}
                          </p>
                        </td>
                        <td className="py-3 text-sm">
                          {report.reason}
                        </td>
                        <td className="py-3">
                          <Badge
                            variant={
                              report.status === 'pending' ? 'warning' :
                              report.status === 'resolved' ? 'success' :
                              'error'
                            }
                            size="sm"
                          >
                            {report.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/reports/${report.id}`)}
                          >
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin/reports')}
                >
                  View All Reports
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Matching algorithm settings */}
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">Matching Algorithm Settings</h2>
            <p className="text-gray-600 mb-6">
              Adjust these parameters to fine-tune the matching algorithm. Changes will apply to new matches only.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-2">Age Similarity Weight</h3>
                <p className="text-sm text-gray-600 mb-3">
                  How important is it for users to be close in age?
                </p>
                <Slider
                  min={0}
                  max={100}
                  value={matchAgeSimilarity}
                  onChange={setMatchAgeSimilarity}
                  label="Age similarity"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Location Importance</h3>
                <p className="text-sm text-gray-600 mb-3">
                  How much should user distance affect matching?
                </p>
                <Slider
                  min={0}
                  max={100}
                  value={matchLocationImportance}
                  onChange={setMatchLocationImportance}
                  label="Location"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Interest Matching Weight</h3>
                <p className="text-sm text-gray-600 mb-3">
                  How much should shared interests influence matching?
                </p>
                <Slider
                  min={0}
                  max={100}
                  value={matchInterestWeight}
                  onChange={setMatchInterestWeight}
                  label="Interests"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                className="mr-3"
              >
                Reset to Defaults
              </Button>
              
              <Button
                variant="primary"
              >
                Save Changes
              </Button>
            </div>
          </Card>
          
          {/* User activity chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">User Activity</h2>
              
              <div className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                >
                  Weekly
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                >
                  Monthly
                </Button>
                
                <Button
                  variant="primary"
                  size="sm"
                >
                  Yearly
                </Button>
              </div>
            </div>
            
            <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg">
              <BarChart4 size={48} className="text-gray-400" />
              <p className="ml-4 text-gray-500">Activity chart visualization would go here</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;