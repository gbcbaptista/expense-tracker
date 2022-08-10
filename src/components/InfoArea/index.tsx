import { formatCurrentMonth } from '../../helpers/dateFilter';
import * as C from './styles';

type Props = {
    currentMonth: string;
}

export const InfoArea = ({ currentMonth }: Props) => {
    return (
        <C.Container>
            <C.MonthArea>
                <C.MonthArrow>&#11013;&#65039;</C.MonthArrow>
                <C.MonthTitle>{formatCurrentMonth(currentMonth)}</C.MonthTitle>
                <C.MonthArrow>&#10145;&#65039;</C.MonthArrow>
            </C.MonthArea>
            <C.ResumeArea>
                Resume Area
            </C.ResumeArea>
        </C.Container>
    );
}