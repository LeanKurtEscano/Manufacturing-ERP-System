

export interface UserData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  emailAddress: string;
  address: string;
  contactNumber: string;
  role: string;
  password?: string;
  employeeId: string;
}


export  interface UserFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  emailAddress: string;
  address: string;
  contactNumber: string;
  role: string;
  password: string;
  employeeId: string;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
}


export interface UserFormProps {
  isEdit?: boolean;
}
