import styled from "styled-components";

export const HeaderBody = styled.header`
    width: 100%;
    height: 72px;
    background: #151515;
    display:flex;
    justify-content: space-between;
    align-items: center;

    h4{
        margin-left: 28px;
        width: 108px;
        height: 54px;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        cursor: pointer;
    }

    .right{
        display: flex;
        align-items: center;
        color: #FFFFFF;
        margin-right:18px;
        font-size:26px;
        width:108px;
        cursor: pointer;
        img{
            height: 52px;
            width: 52px;
            border-radius: 100%;
            margin-left: 14px;
        }

    } 
`;