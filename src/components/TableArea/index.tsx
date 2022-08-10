import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';
import * as C from './styles';

type Props = {
    list: Item[]
}

export const TableArea = ({ list }: Props) => {
    return (
        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColumn width={150}>Data</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Category</C.TableHeadColumn>
                    <C.TableHeadColumn >Title</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Value</C.TableHeadColumn>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <TableItem key={index} item={item} />
                ))}
            </tbody>
        </C.Table>
    );
}