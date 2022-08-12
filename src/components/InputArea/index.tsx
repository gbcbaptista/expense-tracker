
import { categories } from '../../data/categories';
import { formatDate } from '../../helpers/dateFilter';
import { Category } from '../../types/Category';
import { Item } from '../../types/Item';
import * as C from './styles';

type Props = {
    onAdd: (item: Item) => void;
}



export const InputArea = ({onAdd}: Props) => {

    const handleAddEvent = () => {
        let newItem: Item = { 
            date: new Date(2022, 10, 15), 
            category: 'food', 
            title: 'BBQ', 
            value: 45.60 
        };
        onAdd(newItem)
    }

    return (
        <C.Container>
            <div>
                <div>
                    <label>Date</label>
                    <input
                        id="itemDate"
                        name="itemDate"
                        type="date"
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        id="itemDate"
                        name="itemDate"
                        type="text"
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                        id="itemDate"
                        name="itemDate"
                        type="text"
                    />
                </div>
                <div>
                    <label>Value</label>
                    <input
                        id="itemDate"
                        name="itemDate"
                        type="number"
                    />
                </div>
            </div>
            <button onClick={handleAddEvent}>Add Item</button>
            
            

            
            
        </C.Container>
    );
}