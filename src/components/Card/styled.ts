import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";

export const AvatarComponent = styled(Avatar)({
  background: red[500],
  width: 56,
  height: 56,
});

export const CardTitleComponent: any = styled("label")({
  fontSize: "18px",
  fontWeight: "bold",
});

export const CardMediaComponent: any = styled(CardMedia)({
  padding: "20px",
  marginLeft: "25px",
  height: "450px",
  width: "660px",
  borderRadius: "40px",
});

export const MuteText = styled("label")({
  fontSize: "15px",
});
