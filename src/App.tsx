import * as C from './App.styles';
import { Category } from './types/category';
import { Item } from './types/item';
import { categories } from './data/categories';
import { items } from './data/items';
import { useEffect, useState } from 'react';
import { getCurrentMonth } from './helpers/dateFilter';



const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  useEffect(
    () => {

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

          {/* itens table */}
      </C.Body>
    </C.Container>
  );
}

export default App;