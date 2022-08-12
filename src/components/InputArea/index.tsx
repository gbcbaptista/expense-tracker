
import { useState } from 'react';
import { categories } from '../../data/categories';
import { formatDate } from '../../helpers/dateFilter';
import { Category } from '../../types/Category';
import { Item } from '../../types/Item';
import * as C from './styles';

type Props = {
    onAdd: (item: Item) => void;
}



export const InputArea = ({onAdd}: Props) => {
    const [itemDate, setItemDate] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemTitle, setItemTitle] = useState('');
    const [itemValue, setItemValue] = useState('');


    const handleAddEvent = () => {
        let [year, month, day] = itemDate.split("-")
        console.log(itemDate);
        console.log(year)
        console.log(month)
        console.log(day)
        console.log(new Date(parseInt(year), parseInt(month)-1, parseInt(day)),)
        let newItem: Item = { 
            date: new Date(parseInt(year), parseInt(month)-1, parseInt(day)),
            category: itemCategory, 
            title: itemTitle, 
            value: parseInt(itemValue)
        };
        onAdd(newItem)
    }

    return (
        <C.Container>
            <div>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        value={itemDate}
                        onChange={e => setItemDate(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        value={itemCategory}
                        onChange={e => setItemCategory(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={itemTitle}
                        onChange={e => setItemTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Value</label>
                    <input
                        type="number"
                        value={itemValue}
                        onChange={e => setItemValue(e.target.value)} 
                    />
                </div>
            </div>
            <button onClick={handleAddEvent}>Add Item</button>

        </C.Container>
    );
}