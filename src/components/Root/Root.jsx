import { Outlet } from 'react-router-dom';
import Banner from './../Banner/Banner';
const Root = () => {
    return (
        <div>
            <Banner/>
            <Outlet/>
        </div>
    );
};

export default Root;