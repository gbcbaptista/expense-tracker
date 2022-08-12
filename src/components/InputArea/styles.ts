import styled from "styled-components";


export const Container = styled.div`
    

    background-color: #FFF;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    padding:20px;
    margin-top: 20px;

    div {
        display: grid;
        grid-template-columns: auto;
        text-align:center;
        grid-row: 1;
    }

    label {
        margin: 5px;
    }

    input, select {
        background-color: #FFF;
        padding: 10px;
        border: 1px solid #CCC;
        border-radius: 5px;
        margin-right: 10px;
    }

    button {
        
    }
`;
