import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  Download,
  MoreVertical,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Hash
} from 'lucide-react';

import { useQuery } from '@tanstack/react-query';

import UserForm from '../../components/manage-users-page/UserForm';
import type { UserData, UserFormData, ModalProps } from '../../constants/interfaces/manageUsersPage';
import BaseModal from '../../components/Modal/BaseModal';
import { userApi, userAuthApi } from '../../config/apiConfig';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../../components/Modal/Modal';
const ManageUsers: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<Record<number, boolean>>({});
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const { data: users, isLoading, error } = useQuery<UserData[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.get('/all');
      return response.data;
    }
  });

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    emailAddress: '',
    address: '',
    contactNumber: '',
    role: '',
    password: '',

  });

  const roles: string[] = ['Inventory Manager', 'Sales Representative', 'Production Manager'];


  const filteredUsers = users?.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.emailAddress} ${user.employeeId}`
      .toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = async () => {


    try {
      const response = await userAuthApi.post('/register', formData);

      if (response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        setShowAddModal(false);
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          age: '',
          emailAddress: '',
          address: '',
          contactNumber: '',
          role: '',
          password: '',
        });

      }

    } catch (error) {
      console.error('Error adding user:', error);

    }


  };

  const handleEditUser = async() => {

    try {
      const response = await userApi.put(`/${selectedUser?.id}`, formData);

      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        setShowEditModal(false);
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          age: '',
          emailAddress: '',
          address: '',
          contactNumber: '',
          role: '',
          password: '',
        });
      }

      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error editing user:', error);

    }




    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async() => {

    try {

      const response = await userApi.delete(`/${selectedUserId}`);
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        setSelectedUserId(null);
      }

    } catch (error) {
      console.error('Error deleting user:', error);
    }

  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      ...user,
      age: user.age.toString(),
      password: ''
    });
    setShowEditModal(true);
  };

  const toggleMobileMenu = (userId: number) => {
    setShowMobileMenu(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };





  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Manage Users</h1>
          <p className="text-gray-400">Manage system users and their permissions</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white w-full sm:w-64 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role.replace(/\s+/g, '_').toUpperCase()}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex-1 sm:flex-none">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-1 sm:flex-none"
              >
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.firstName} {user.middleName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-400">Age: {user.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{user.emailAddress}</div>
                      <div className="text-sm text-gray-400">{user.contactNumber}</div>
                      <div className="text-sm text-gray-400">{user.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {user.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedUserId(user.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="lg:hidden space-y-4">
          {filteredUsers?.map((user) => (
            <div key={user.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {user.firstName} {user.middleName} {user.lastName}
                    </h3>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleMobileMenu(user.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {showMobileMenu[user.id] && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => {
                          openEditModal(user);
                          setShowMobileMenu({});
                        }}
                        className="flex items-center cursor-pointer gap-2 w-full px-4 py-2 text-left text-white hover:bg-gray-600"
                      >
                        <Edit className="w-4 h-4 cursor-pointer" />
                        Edit User
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setShowMobileMenu({});
                        }}
                        className="flex  items-center cursor-pointer gap-2 w-full px-4 py-2 text-left text-red-400 hover:bg-gray-600"
                      >
                        <Trash2 className="w-4  cursor-pointer h-4" />
                        Delete User
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Hash className="w-4 h-4" />
                  <span>ID: {user.employeeId}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{user.emailAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{user.contactNumber}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span>Age: {user.age}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No users found matching your criteria.</p>
          </div>
        )}

        <BaseModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New User"
          onSave={handleAddUser}
        >
          <UserForm setFormData={setFormData} formData={formData} roles={roles} />
        </BaseModal>

         <Modal
         loading={false}
          isOpen={selectedUserId !== null}
          onClose={() => setSelectedUserId(null)}
          title="Delete User"
          message='Are you sure you want to delete this user? This action cannot be undone.'
          onConfirm={handleDeleteUser}
        >
         
        </Modal>

        <BaseModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit User"
          onSave={handleEditUser}
        >
          <UserForm isEdit={true} setFormData={setFormData} formData={formData} roles={roles} />
        </BaseModal>
      </div>
    </div>
  );
};

export default ManageUsers;