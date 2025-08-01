import React from 'react'
import type { ModalProps } from '../../constants/interfaces/manageUsersPage';


const BaseModal: React.FC<ModalProps> = ({ show, onClose, title, children, onSave }) => {

    if (!show) return null;
  return (
     <div className="fixed inset-0  bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 cursor-pointer text-lg hover:text-white"
              >
                ×
              </button>
            </div>
            {children}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 cursor-pointer text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {title.includes('Edit') ? 'Update' : 'Add'} User
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BaseModal