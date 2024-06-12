import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { useSelector} from 'react-redux';
import { RootState } from '../../store/store';
import {OptionType, role} from "../../model/employee"
import './style.scss';

const EmployeeList: React.FC = () => {
    const employees = useSelector((state: RootState) => state.employees);
    const [positionFilter, setPositionFilter] = useState<SingleValue<OptionType>>(null);
    const [showArchived, setShowArchived] = useState(false);
    const [sortKey, setSortKey] = useState<'name' | 'birthday' | null>(null);
  
    const filteredEmployees = employees.filter(employee => {
      return (
        (!positionFilter || employee.role === positionFilter.value) &&
        (showArchived ? employee.isArchive : !employee.isArchive)
      );
    });
  
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (sortKey === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortKey === 'birthday') {
        return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
      } else {
        return 0;
      }
    });

    const handleResetFilter = () => {
      setPositionFilter(null);
    };
  
    return (
      <div>
        <h1>Список сотрудников</h1>
        <div className="filter-container">
          <div className='filter-select'>
            <Select
              options={role}
              onChange={setPositionFilter}
              placeholder="Выберите должность"
            />
            <button onClick={handleResetFilter}>Сбросить фильтр</button>
          </div>
          
          <label>
            <input
              type="checkbox"
              checked={showArchived}
              onChange={() => setShowArchived(!showArchived)}
            />
            В архиве
          </label>
        </div>
        <button onClick={() => setSortKey('name')}>Сортировать по имени</button>
        <button onClick={() => setSortKey('birthday')}>Сортировать по дате рождения</button>
        <ul>
          {sortedEmployees.map(employee => (
            <li key={employee.id}>
              <Link to={`/edit/${employee.id}`}>
                {employee.name} - {employee.role} - {employee.birthday} - {employee.phone}
              </Link>
            </li>
          ))}
        </ul>
        <button>
          <Link to="/add">Добавить нового сотрудника</Link>
        </button>
      </div>
    );
};

export default EmployeeList;
