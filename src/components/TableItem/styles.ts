import styled from "styled-components";

export const TableLine = styled.tr`

`;

export const TableColumn = styled.td`
    padding: 10px 0;
`;

export const Category = styled.div<{color: string}>`
    background-color: ${props => props.color};
    display: inline-block;
    color: #FFF;
    padding: 5px 10px;
    border-radius: 5px;
`;

export const ValueNumber = styled.div<{color: string}>`
    color: ${props => props.color};
`;