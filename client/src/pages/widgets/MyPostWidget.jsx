import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";

import FlexBetween from "@/components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "@/components/UserImage";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "@/features/posts/postsApi";

const MyPostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { palette } = useTheme();

  const { _id } = useSelector(
    (state) => state.auth.user
  );

  const isNonMobileScreens = useMediaQuery(
    "(min-width: 1000px)"
  );

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const [
    createPost,
    { isLoading },
  ] = useCreatePostMutation();

  const handlePost = async () => {
    // Remove previous error
    setErrorMessage("");

    const formData = new FormData();

    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    try {
      const result = await createPost(formData);

      // Check if backend returned an error
      if (result.error) {
        setErrorMessage(
          result.error.data?.message ||
            "Post could not be created. Please try again."
        );

        return;
      }

      // Post successfully created
      if (result.data) {
        setImage(null);
        setPost("");
        setIsImage(false);
      }
    } catch (error) {
      setErrorMessage(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <WidgetWrapper>

      {/* ERROR ALERT */}
      {errorMessage && (
        <Alert
          severity="error"
          onClose={() => setErrorMessage("")}
          sx={{ mb: "1rem" }}
        >
          {errorMessage}
        </Alert>
      )}

      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />

        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setImage(acceptedFiles[0])
            }
          >
            {({
              getRootProps,
              getInputProps,
            }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />

                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>
                        {image.name}
                      </Typography>

                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() => setIsImage(!isImage)}
        >
          <ImageOutlined sx={{ color: mediumMain }} />

          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: medium,
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined
                sx={{ color: mediumMain }}
              />
              <Typography color={mediumMain}>
                Clip
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined
                sx={{ color: mediumMain }}
              />
              <Typography color={mediumMain}>
                Attachment
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined
                sx={{ color: mediumMain }}
              />
              <Typography color={mediumMain}>
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined
              sx={{ color: mediumMain }}
            />
          </FlexBetween>
        )}

        <Button
          disabled={!post || isLoading}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          {isLoading ? (
            <CircularProgress size={18} />
          ) : (
            "POST"
          )}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
