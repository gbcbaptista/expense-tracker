import * as C from './App.styles';
import { categories } from './data/categories';
import { items } from './data/items';
import { useEffect, useState } from 'react';
import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { Item } from "./types/Item";
import { Category } from './types/Category';



const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  useEffect(
    () => {
      setFilteredList( filterListByMonth(list, currentMonth) );
    }, [list, currentMonth]
  );
  

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Expense Tracker</C.HeaderText>
      </C.Header>
      <C.Body>
          {/* information */}

          {/* adding data */}

          <TableArea list={filteredList}/>
      </C.Body>
    </C.Container>
  );
}

export default App;