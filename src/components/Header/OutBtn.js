import { useNavigate, useContext } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


export default function OutBtn({ token, setToken }) {

    const navigate = useNavigate();

    const URLPOST = "http://localhost:5000/"

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    function logOut() {
        axios
            .delete(`${URLPOST}logout`, config)
            .then((res) => {
                setToken("");
                navigate("/");
            })
            .catch((err) => {
                alert(err.response.message);
            });
    }

    return (

        <Container data-test="menu" >
            <div data-test="logout" onClick={logOut}>
                Logout
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right:0;
    top:72px;

        div{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            width: 150px;
            height: 47px;
            background-color: #171717;
            border-radius: 0 0 20px 20px;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #FFFFFF;
            cursor: pointer;
        }

`