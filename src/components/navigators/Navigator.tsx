import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"


export type RouteType = {
    to: string, name: string, order?: number
}

export const Navigator: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const[value, setValue] = useState(0)
    useEffect(() => {
        let index = routes.findIndex(r => r.to === location.pathname);
        if(index < 0){
            index = 0;
        }
        navigate(routes[index].to)
        setValue(index)
    }, [routes])
    function onChangeFn(event: any, newValue: number){
        setValue(newValue)
    }

    function getTabs(){
        return routes.map((r) => <Tab component={Link} to = {r.to} label= {r.name}></Tab>)
    }
    return <Box mt={10}>
        <AppBar sx={{backgroundColor: 'lightgray'}}>
            <Tabs value={value < routes.length ? value: 0} onChange={onChangeFn}>
               { getTabs()}
            </Tabs>
        </AppBar>
       
        <Outlet></Outlet>
    </Box>
}