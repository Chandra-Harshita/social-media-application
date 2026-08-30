import { Box, Typography, useTheme, Skeleton } from "@mui/material";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useGetUserFriendsQuery } from "@/features/users/usersApi";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const { data: friends, isLoading } = useGetUserFriendsQuery(userId);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {isLoading ? (
          [0, 1, 2].map((i) => (
            <Skeleton key={i} variant="rounded" height={55} />
          ))
        ) : (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
