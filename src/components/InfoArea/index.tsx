import { formatCurrentMonth, getCurrentMonth } from '../../helpers/dateFilter';
import { ResumeItem } from '../ResumeItem';
import * as C from './styles';

type Props = {
    currentMonth: string;
    onMonthChange: (newMonth: string) => void;
    income: number;
    expense: number;
}

export const InfoArea = ({ currentMonth, onMonthChange, income, expense }: Props) => {

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
                <ResumeItem title="Income" value={income}></ResumeItem>
                <ResumeItem title="Expenses" value={expense}></ResumeItem>
                <ResumeItem 
                    title="Result"
                    value={income-expense}
                    color={(income-expense) > 0 ? 'green' : 'red'}
                ></ResumeItem>
            </C.ResumeArea>
        </C.Container>
    );
}