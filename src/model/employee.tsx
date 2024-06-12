export const role: OptionType[] = [
    { value: 'cook', label: 'Повар' },
    { value: 'waiter', label: 'Официант' },
    { value: 'driver', label: 'Водитель' },
];

export interface OptionType {
    value: string;
    label: string;
}
  
export interface EmployeeFormValues {
    name: string;
    phone: string;
    birthday: string;
    role: OptionType | null;
    isArchive: boolean;
}