import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../store/employeesSlice';
import {EmployeeFormValues, role} from "../../model/employee"
import { RootState } from '../../store/store';
import './style.scss';



const AddEmployee: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<EmployeeFormValues>();
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employees);

  const onSubmit: SubmitHandler<EmployeeFormValues> = data => {
    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    if (data.role) {
      dispatch(addEmployee({
        ...data, id: newId, 
        role: data.role.value,
        isArchive: false,
        birthday: ''
      }));
    }
  };

  return (
    <div>
      <h1>Добавить сотрудника</h1>
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

export default AddEmployee;
