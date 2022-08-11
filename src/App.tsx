import * as C from './App.styles';
import { categories } from './data/categories';
import { items } from './data/items';
import { useEffect, useState } from 'react';
import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { Item } from "./types/Item";
import { Category } from './types/Category';
import { InfoArea } from './components/InfoArea';



const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(
    () => {
      setFilteredList( filterListByMonth(list, currentMonth) );
    }, [list, currentMonth]
  );

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  useEffect(
    () => {
      let totalExpense = 0;
      let totalIncome = 0;
      filteredList.map((item) => {
        if (categories[item.category].expense){
          totalExpense += item.value;
        } else {
          totalIncome += item.value;
        }
          
      })
      setExpense(totalExpense)
      setIncome(totalIncome)
    }, [filteredList]
  );
  

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Expense Tracker</C.HeaderText>
      </C.Header>
      <C.Body>
          <InfoArea 
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            income={income}
            expense={expense}
          />

          {/* adding data */}

          <TableArea list={filteredList}/>
      </C.Body>
    </C.Container>
  );
}

export default App;