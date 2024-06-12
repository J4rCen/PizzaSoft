import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import employees from "./employees.json"

interface Employee {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}
  
const initialState: Employee[] = employees
  
const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
      addEmployee: (state, action: PayloadAction<Employee>) => {
        state.push(action.payload);
      },
      updateEmployee: (state, action: PayloadAction<Employee>) => {
        const index = state.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      },
    },
});
  
export const { addEmployee, updateEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;