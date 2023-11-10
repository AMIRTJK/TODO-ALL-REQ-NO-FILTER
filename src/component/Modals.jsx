import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, Stack, IconButton } from "@mui/material/";

const Modals = (props) => {
  return (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: "#00000020",
        height: "100%",
        width: "100%",
        display: `${props.modal === true ? "block" : "none"}`,
      }}
    >
      <Box
        sx={{
          width: "30%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={20} fontWeight={500} mx="auto">
            {props.titleModal}
          </Typography>
          {/* Close */}
          <IconButton onClick={() => props.setModal(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {props.children}
      </Box>
    </Box>
  );
};

export default Modals;
