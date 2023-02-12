import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatIcon from "@mui/icons-material/MapsUgcRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AvatarComponent, CardTitleComponent, MuteText } from "./styled";
import { IPost } from "../../interface/timeline.interface";
import { timeElapsed } from "../../utils";

interface PropsType {
  postData: IPost;
  onLikeAndUnlikePost: (post_id: string, index: number) => void;
  index: number;
  likedPost: Array<string>;
}

export default function CustomCard(props: PropsType) {
  const { postData, likedPost, index, onLikeAndUnlikePost } = props;

  // This Function will call when profile image is not available
  const onErrorImg = (e: any) => {
    const currentTarget = e.currentTarget;
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
  };

  const likeIconStyle = () => {
    if (likedPost.includes(postData.id)) {
      return "error";
    }
    return "default";
  };

  return (
    <Card sx={{ maxWidth: "100%" }} key={postData.id}>
      <CardHeader
        avatar={<AvatarComponent aria-label="recipe" alt="" onError={onErrorImg} src={postData.user.profile_image_url} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<CardTitleComponent>{`${postData.user.first_name} ${postData.user.last_name}`}</CardTitleComponent>}
        titleTypographyProps={{ variant: "h6" }}
        subheader={timeElapsed(postData.created_at)}
      />
      <CardContent>
        <Typography sx={{ fontSize: "17px", paddingLeft: "20px", paddingRight: "20px" }} variant="body2">
          {postData.text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton color={likeIconStyle()} onClick={() => onLikeAndUnlikePost(postData.id, index)} aria-label="add to favorites">
          <FavoriteIcon />
          &nbsp; <MuteText>{postData.likes_count}</MuteText>
        </IconButton>
        <IconButton aria-label="share">
          <ChatIcon />
          &nbsp; <MuteText>{postData.replies_count}</MuteText>
        </IconButton>
      </CardActions>
    </Card>
  );
}
