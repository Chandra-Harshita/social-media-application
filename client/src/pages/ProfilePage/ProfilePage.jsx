import { Box, useMediaQuery, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import FriendListWidget from "@/pages/widgets/FriendListWidget";
import MyPostWidget from "@/pages/widgets/MyPostWidget";
import PostsWidget from "@/pages/widgets/PostsWidget";
import UserWidget from "@/pages/widgets/UserWidget";
import { useGetUserQuery } from "@/features/users/usersApi";

const ProfilePage = () => {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { data: user, isLoading } = useGetUserQuery(userId);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {isLoading || !user ? (
            <Skeleton variant="rectangular" height={180} sx={{ borderRadius: "0.75rem" }} />
          ) : (
            <UserWidget userId={userId} picturePath={user.picturePath} />
          )}
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {!isLoading && user && <MyPostWidget picturePath={user.picturePath} />}
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
