import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmployee } from '../../store/employeesSlice';
import { RootState } from '../../store/store';
import {EmployeeFormValues, role} from "../../model/employee"
import './style.scss';

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employee = useSelector((state: RootState) => state.employees.find(emp => emp.id === parseInt(id as string)));
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm<EmployeeFormValues>({
    defaultValues: {
      name: employee?.name,
      phone: employee?.phone,
      birthday: employee?.birthday ? new Date(employee.birthday).toISOString().split('T')[0] : '',
      role: role.find(pos => pos.value === employee?.role) || null,
      isArchive: employee?.isArchive,
    }
  });

  const onSubmit: SubmitHandler<EmployeeFormValues> = data => {
    if (employee && data.role) {
      dispatch(updateEmployee({ ...employee, ...data, role: data.role.value }));
    }
  };
  
  return (
    <div>
      <h1>Редактирование сотрудника</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Имя</label>
          <input {...register('name')} type="text" />
        </div>
        <div>
          <label>Телефон</label>
          <input {...register('phone')} type="text" />
        </div>
        <div>
          <label>Дата рождения</label>
          <input {...register('birthday')} type="date" />
        </div>
        <div>
          <label>Должность</label>
          <Select
            options={role}
            onChange={value => setValue('role', value)}
            defaultValue={role.find(pos => pos.value === employee?.role)}
          />
        </div>
        <div>
          <label>
            <input {...register('isArchive')} type="checkbox" />
            В архиве
          </label>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default EditEmployee;
