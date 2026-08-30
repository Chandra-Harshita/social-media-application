import { Alert, Box, Skeleton } from "@mui/material";
import {
  useGetFeedPostsQuery,
  useGetUserPostsQuery,
} from "@/features/posts/postsApi";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const feedQuery = useGetFeedPostsQuery(undefined, { skip: isProfile });
  const userPostsQuery = useGetUserPostsQuery(userId, { skip: !isProfile });

  const { data: posts, isLoading, isError } = isProfile
    ? userPostsQuery
    : feedQuery;

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" gap="1rem" mt="1rem">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} variant="rectangular" height={200} sx={{ borderRadius: "0.75rem" }} />
        ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: "1rem" }}>
        Couldn&apos;t load posts. Please try again later.
      </Alert>
    );
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId: postUserId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={postUserId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
