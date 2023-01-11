import {useEffect, useState} from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme, Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';


import {useSelector, useDispatch} from "react-redux";
import {logout, getUser} from "../../state";
import axios from "axios";


const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");


    const isAuth = Boolean(useSelector((state) => state.token))
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const userName = useSelector((state) => state.name)
    const userEmail = useSelector((state) => state.email)

    const getUserInfo = () => {
        const jwt = sessionStorage.getItem('jwt')
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
        axios.get('http://13.209.212.124:5001/user/info', {
            headers: headers
        }).then(response => {
            dispatch(
                getUser({
                    name: response.data.user.name,
                    email: response.data.user.email
                })
            )
            console.log(userName, userEmail)
        }).catch(error => console.error(error))
    }
    useEffect(() => {
        getUserInfo()
    })

    async function setLogout() {
        // Remove the JWT token from the session storage
        sessionStorage.removeItem('jwt');
        dispatch(
            logout()
        )
        navigate('/')
    }


    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                {/*<Typography variant="h3" color={colors.grey[100]}>*/}
                                {/*  ADMINIS*/}
                                {/*</Typography>*/}
                                <a href="/">

                                    <div style={{
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        fontWeight: "bold",
                                        fontSize: "27px",
                                        marginLeft: "20px",
                                    }}>
                                        <span style={{color: "black"}}>Z</span>
                                        <span style={{color: "#3ea6ff"}}>A</span>
                                        <span style={{color: "black"}}>M</span>
                                        <span style={{color: "#3ea6ff"}}>A</span>
                                        <span style={{color: "black"}}>R</span>

                                    </div>
                                </a>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            {isAuth ?
                                <>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <img
                                            alt="profile-user"
                                            width="100px"
                                            height="100px"
                                            src={`../../assets/user.png`}
                                            style={{cursor: "pointer", borderRadius: "50%"}}
                                        />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography
                                            variant="h2"
                                            color={colors.grey[100]}
                                            fontWeight="bold"
                                            sx={{m: "10px 0 0 0"}}
                                        >
                                            {userName}
                                        </Typography>
                                        <Typography variant="h5" color={colors.greenAccent[500]}>
                                            {userEmail}
                                        </Typography>
                                    </Box>
                                </>
                                : null}
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {isAuth ?

                            <>
                                <Item
                                    title="Dashboard"
                                    to="/"
                                    icon={<HomeOutlinedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Item
                                    title="Manage Band"
                                    to="/team"
                                    icon={<PeopleOutlinedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Sheet"
                                    to="/sheets"
                                    icon={<LibraryMusicIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Cloud"
                                    to="/invoices"
                                    icon={<CloudQueueIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />


                                <Item
                                    title="Profile Form"
                                    to="/form"
                                    icon={<PersonOutlinedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Calendar"
                                    to="/calendar"
                                    icon={<CalendarTodayOutlinedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="FAQ Page"
                                    to="/faq"
                                    icon={<HelpOutlineOutlinedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </> :
                            <>
                                {!isCollapsed && (

                                    <Typography
                                        variant="h6"
                                        color={colors.grey[300]}
                                        sx={{m: "15px 0 5px 20px"}}
                                    >
                                        Welcome to ZAMAR
                                    </Typography>)}
                            </>


                        }


                        {!isCollapsed && (
                            <>
                                {isAuth ?
                                    <Button
                                        sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "5px 20px",
                                            left: '25%',
                                            top: '20px'
                                        }} onClick={setLogout}>Log Out</Button> : null
                                }
                            </>)}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
