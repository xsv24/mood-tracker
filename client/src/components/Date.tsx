import React from 'react';
import Row from './Row';

export const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
export const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

export const CalendarIcon = ({
    children
}) => (
    <div className='calendar-bg'>
        <div> {children} </div>
    </div>
);

export const DateRow = ({
    date,
    flex
}) => (
    <Row flex={flex} justify='flex-start'>
        <Row justify='flex-start'>
            <CalendarIcon>
                {date.getUTCDate()}
            </CalendarIcon>

            <div style={{ paddingLeft: '1rem', fontSize: '1.2rem' }}>
                {days[date.getUTCDay()] + ' ' + months[date.getMonth()]}
            </div>
        </Row>

        <div style={{ paddingLeft: '1rem', fontSize: '1.2rem' }}>{date.getUTCHours()}:{date.getUTCMinutes()}</div>
    </Row>
);

export default DateRow;