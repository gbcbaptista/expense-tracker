
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
            <button onClick={handleAddEvent}>Add Item</button>
        </C.Container>
    );
}