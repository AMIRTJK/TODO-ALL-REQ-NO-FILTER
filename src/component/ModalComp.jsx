import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material/";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const ModalComp = ({ modal, setModal, children, modalTitle }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#00000030",
        position: "fixed",
        top: 0,
        zIndex: "10",
        display: modal ? "block" : "none",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "24px", gap: "20px", position: "relative" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="500"
              sx={{ margin: "0 auto" }}
            >
              {modalTitle}
            </Typography>
            <IconButton onClick={() => setModal(false)}>
              {" "}
              <HighlightOffOutlinedIcon
                sx={{ fontSize: "35px", color: "#F76C6A" }}
              />
            </IconButton>
          </Box>
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export default ModalComp;
