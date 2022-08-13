
import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import * as C from './styles';

type Props = {
    onAdd: (item: Item) => void;
}


export const InputArea = ({onAdd}: Props) => {
    const [itemDate, setItemDate] = useState('');
    const [itemCategory, setItemCategory] = useState("iFood");
    const [itemTitle, setItemTitle] = useState('');
    const [itemValue, setItemValue] = useState(0);
    const [addItemActive, setAddItemActive] = useState(false);

    useEffect(
        () => {
            if (
                itemDate !== '' &&
                itemDate !== undefined &&
                itemCategory !== '' &&
                itemCategory !== undefined &&
                itemTitle !== '' &&
                itemTitle !== undefined &&
                itemValue > 0
                ) {
                setAddItemActive(true)
            } else {
                setAddItemActive(false)
            }
        }, [itemDate, itemCategory, itemTitle, itemValue]
    );


    const handleAddEvent = () => {
        let [year, month, day] = itemDate.split("-")
        let newItem: Item = { 
            date: new Date(parseInt(year), parseInt(month)-1, parseInt(day)),
            category: itemCategory.toLowerCase(), 
            title: itemTitle, 
            value: itemValue
        };
        onAdd(newItem)
        setItemDate('')
        setItemCategory('iFood')
        setItemTitle('')
        setItemValue(0)
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
                    <select
                        value={itemCategory}
                        onChange={e => setItemCategory(e.target.value)} 
                    >
                        <option>iFood</option>
                        <option>Uber</option>
                        <option>Salary</option>
                    </select>
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
                        onChange={e => setItemValue(parseFloat(e.target.value))} 
                    />
                </div>
                <div />
                <div>
                    <button
                        disabled={!addItemActive}
                        onClick={handleAddEvent}
                    >
                    Add Item
                    </button>
                </div>
            </div>
            
        </C.Container>
    );
}