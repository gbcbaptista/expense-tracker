import styled from "styled-components";


export const Container = styled.div`
    

    background-color: #FFF;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;

    div {
        display: grid;
        grid-template-columns: auto;
        text-align:center;
        grid-row: 1;
    }

    label {
        margin-bottom: 3px;
        padding: 0;
    }

    input, select {
        background-color: #FFF;
        padding: 10px;
        border: 1px solid #CCC;
        border-radius: 5px;
        margin: 0px 5px 0px 5px;
    }

    button {
        padding: auto;
        margin: auto;
        width: 100px;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        cursor: pointer;
        color: #FFF;
        background-color: #009933;
        border: none;
        border-radius: 10px;
        font-size: 15px;

        &:hover {
            text-color: #FFF;
            background-color: darkgreen;
        }
    }

    
`;
