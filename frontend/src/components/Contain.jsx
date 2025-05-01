import { Outlet } from "react-router-dom";
import { Header } from "./Home";
const Contain=()=>{
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
};
export default Contain;