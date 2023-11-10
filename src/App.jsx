import { useEffect, useState, useRef } from "react";
import axios from "axios";
// import Switcher from "./component/Switcher";
import "./App.css";

import { lightTheme, darkTheme } from "./theme";
// Animate.css
import "animate.css";
// AOS.css
import AOS from "aos";
import "aos/dist/aos.css";
// core version + navigation, pagination modules:

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import FilterStatus from "./component/FilterStatus";
// import FilterAllCity from "./component/FilterAllCity";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BatteryCharging30Icon from "@mui/icons-material/BatteryCharging30";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  Typography,
  Stack,
  Link,
  Container,
  TextField,
  Button,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  CssBaseline,
  Checkbox,
  IconButton,
} from "@mui/material/";
import Modals from "./component/Modals";
import ModalComp from "./component/ModalComp";

function App() {
  // useState for translator
  const [t, i18n] = useTranslation();
  // Функция для смены языка
  const changeLang = (language) => {
    i18n.changeLanguage(language);
  };
  // useState для select
  const [lang, setLang] = useState("en");

  // useEffect for AOS
  useEffect(() => {
    AOS.init();
  }, []);

  // Берем данные из localStorage Dark Mode MUI
  const storedTheme = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(storedTheme === "true");

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  // API
  const API = "http://localhost:3000/data";

  // useState for DATA
  const [data, setData] = useState([]);

  // Async Function GET
  async function getData() {
    try {
      const { data } = await axios.get(API);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // useState for getSearch
  const [search, setSearch] = useState("");
  // Async Function GET - Search
  async function getSearch() {
    try {
      const { data } = await axios.get(API + "?q=" + search);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Async Function PUT - Complete
  async function putComplete(clickedItem) {
    const newObj = {
      id: clickedItem.id,
      title: clickedItem.title,
      desc: clickedItem.desc,
      isComplete: !clickedItem.isComplete,
    };
    try {
      const { data } = await axios.put(API + "/" + newObj.id, newObj);
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  // useState for Modal Add
  const [modalAdd, setModalAdd] = useState(false);

  // useState for Modal Add Inputs
  const [titleAdd, setTitleAdd] = useState("");
  const [descAdd, setDescAdd] = useState("");

  // Async Function POST
  async function postData(event) {
    event.preventDefault();
    const newObj = {
      title: titleAdd,
      desc: descAdd,
      isComplete: false,
    };
    try {
      const { data } = await axios.post(API, newObj);
      setTitleAdd("");
      setDescAdd("");
      setModalAdd(false);
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  // Async Function DELETE
  async function deleteData(clickedItem) {
    try {
      const { data } = await axios.delete(API + "/" + clickedItem.id);
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  // useState for Modal Edit
  const [modalEdit, setModalEdit] = useState(false);

  // useState for Modal Edit Inputs
  const [titleEdit, setTitleEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");
  const [completeEdit, setCompleteEdit] = useState(false);

  // useState for idx
  const [inputEdit, setInputEdit] = useState("");

  // Function show edit modal
  function putInput(clickedItem) {
    setTitleEdit(clickedItem.title);
    setDescEdit(clickedItem.desc);
    setCompleteEdit(clickedItem.isComplete);
    setInputEdit(clickedItem);
    setModalEdit(true);
  }

  async function putEdit(event) {
    event.preventDefault();
    const newObj = {
      title: titleEdit,
      desc: descEdit,
      isComplete: completeEdit,
    };
    try {
      const { data } = await axios.put(API + "/" + inputEdit.id, newObj);
      setModalEdit(false);
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect for render Data
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* ToDo Page ================ */}
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            // backgroundColor: "#fff",
            top: 0,
            padding: "0px 30px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="20px"
          >
            <Typography
              color="#F79E89"
              fontSize="35px"
              sx={{ cursor: "default" }}
            >
              {t("header.logo")}
            </Typography>
            {/* Show Add Modal */}
            <Box sx={{ display: "flex", gap: "25px" }}>
              <IconButton
                onClick={() => setModalAdd(true)}
                aria-label="add"
                sx={{
                  backgroundColor: "#F76C6A",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#F76C6A",
                  },
                }}
              >
                <AddIcon sx={{ fontSize: "35px" }} />
              </IconButton>
              {/* Select Language */}
              <select
                className="bg-[transparent] outline-none "
                name=""
                id=""
                value={lang}
                onChange={(event) => {
                  changeLang(event.target.value);
                  setLang(event.target.value);
                }}
              >
                <option value="ru" style={{ color: "#000" }}>
                  RU
                </option>
                <option value="en" style={{ color: "#000" }}>
                  EN
                </option>
              </select>
              <IconButton onClick={toggleDarkMode}>
                <Brightness4Icon />
              </IconButton>
            </Box>
          </Stack>
          {/* Search */}
          <Stack
            marginTop="40px"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <TextField
              onChange={(event) => {
                setSearch(event.target.value);
                getSearch();
              }}
              value={search}
              id="outlined-basic"
              label={t("header.search")}
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Stack>
          {/* Wrapper List */}
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Data */}
            {data.map((e) => {
              return (
                <Box
                  key={e.id}
                  sx={{
                    marginTop: "32px",
                    borderRadius: "12px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      color: "#fff",
                      backgroundColor: "#F76C6A",
                      padding: "16px",
                      boxShadow: "0 0 10px #0000001b",
                      borderTopRightRadius: "12px",
                    }}
                  >
                    <Box>
                      {/* Title */}
                      <Typography
                        sx={{
                          color: `${e.isComplete === true ? "#000" : "none"}`,
                          textDecoration: `${
                            e.isComplete === true ? "line-through" : "none"
                          }`,
                        }}
                      >
                        {e.title}
                      </Typography>
                      {/* Description */}
                      <Typography
                        sx={{
                          color: `${e.isComplete === true ? "#000" : "none"}`,
                          textDecoration: `${
                            e.isComplete === true ? "line-through" : "none"
                          }`,
                        }}
                      >
                        {e.desc}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Panel Control */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-around"
                    spacing={3}
                    sx={{ backgroundColor: "#ffe79e", padding: "7.5px 0" }}
                  >
                    {/* Complete */}
                    <Checkbox
                      onChange={() => putComplete(e)}
                      style={{ color: "#1296b4" }}
                    />
                    {/* Edit */}
                    <Button
                      onClick={() => putInput(e)}
                      sx={{
                        color: "white",
                        backgroundColor: "#008d00b3",
                        "&:hover": {
                          backgroundColor: "#008d00b3",
                        },
                      }}
                    >
                      <EditNoteOutlinedIcon />
                    </Button>
                    {/* Удалить */}
                    <IconButton onClick={() => deleteData(e)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>
        {/* Modal Add */}
        <Modals modal={modalAdd} setModal={setModalAdd} titleModal="Add Task">
          <Box
            onSubmit={(event) => postData(event)}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              alignItems: "center",

              marginTop: "20px",
            }}
          >
            <TextField
              onChange={(event) => setTitleAdd(event.target.value)}
              value={titleAdd}
              label="Title"
              sx={{ width: "100%" }}
            />
            <TextField
              onChange={(event) => setDescAdd(event.target.value)}
              value={descAdd}
              label="Description"
              sx={{ width: "100%" }}
            />
            <Button type="submit">Добавить</Button>
          </Box>
        </Modals>
        {/* Modal Edit */}
        <Modals
          modal={modalEdit}
          setModal={setModalEdit}
          titleModal="Edit Task"
        >
          <Box
            onSubmit={(event) => putEdit(event)}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <TextField
              onChange={(event) => setTitleEdit(event.target.value)}
              value={titleEdit}
              label="Title"
              sx={{ width: "100%" }}
            />
            <TextField
              onChange={(event) => setDescEdit(event.target.value)}
              value={descEdit}
              label="Description"
              sx={{ width: "100%" }}
            />
            <Checkbox
              onChange={(event) => setCompleteEdit(event.target.checked)}
              checked={Boolean(completeEdit)}
            />
            <Button type="submit">Изменить</Button>
          </Box>
        </Modals>
      </ThemeProvider>
    </>
  );
}

export default App;
