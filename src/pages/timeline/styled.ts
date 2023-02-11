import { styled } from "@mui/system";

export const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

export const SideBarComponent = styled("div")({
  width: "24%",
  backgroundColor: "#dee0df",
});

export const MainComponent: any = styled("div")({
  width: "52%",
  padding: "20px",
  maxHeight: "100vh",
  overflow: "auto",
  "-ms-overflow-style": "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export const SummaryComponent = styled("div")({
  width: "24%",
  backgroundColor: "#dee0df",
  display: "flex",
});

export const LabelText = styled("label")({
  fontSize: "35px",
  padding: "10px",
});
