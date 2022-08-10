import { formatCurrentMonth, getCurrentMonth } from '../../helpers/dateFilter';
import * as C from './styles';

type Props = {
    currentMonth: string;
    onMonthChange: (newMonth: string) => void;
}

export const InfoArea = ({ currentMonth, onMonthChange }: Props) => {

    const handlePreviousMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year),parseInt(month)-1,1);
        currentDate.setMonth( currentDate.getMonth()-1 );
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}`)
    }

    const handleNextMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year),parseInt(month)-1,1);
        currentDate.setMonth( currentDate.getMonth()+1 );
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}`)
    }

    return (
        <C.Container>
            <C.MonthArea>
                <C.MonthArrow onClick={handlePreviousMonth}>&#11013;&#65039;</C.MonthArrow>
                <C.MonthTitle>{formatCurrentMonth(currentMonth)}</C.MonthTitle>
                <C.MonthArrow onClick={handleNextMonth}>&#10145;&#65039;</C.MonthArrow>
            </C.MonthArea>
            <C.ResumeArea>
                Resume Area
            </C.ResumeArea>
        </C.Container>
    );
}