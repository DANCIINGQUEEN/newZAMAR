import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./authPage/Login";
import {useSelector} from "react-redux";
import SignUp from "./authPage/SignUp";
import Sheet from "./sheet/Sheet";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(false);

    const isAuth = Boolean(useSelector((state) => state.token))
    console.log(isAuth)


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <BrowserRouter>
                    <div className="app">
                        <Sidebar isSidebar={isSidebar}/>
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar}/>

                            <Routes>
                                <Route path="/" element={isAuth ? <Dashboard/> : <Login/>}/>
                                <Route path="/team" element={<Team/>}/>
                                <Route path="/signUp" element={<SignUp/>}/>
                                {/*<Route path="/contacts" element={<Contacts/>}/>*/}
                                <Route path="/sheets" element={<Sheet/>}/>
                                <Route path="/invoices" element={<Invoices/>}/>
                                <Route path="/form" element={<Form/>}/>
                                {/*<Route path="/bar" element={<Bar/>}/>*/}
                                {/*<Route path="/pie" element={<Pie/>}/>*/}
                                {/*<Route path="/line" element={<Line/>}/>*/}
                                <Route path="/faq" element={<FAQ/>}/>
                                <Route path="/calendar" element={<Calendar/>}/>
                                {/*<Route path="/geography" element={<Geography/>}/>*/}
                            </Routes>
                        </main>
                    </div>

                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
