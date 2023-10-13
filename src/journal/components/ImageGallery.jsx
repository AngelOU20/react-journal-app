import { Grid, ImageList, ImageListItem } from "@mui/material";
import PropTypes from "prop-types";

export const ImageGallery = ({ images }) => {
  return (
    <Grid container justifyContent="center">
      <ImageList
        sx={{ width: 800, borderRadius: 2 }}
        variant="quilted"
        cols={3}
        // rowHeight={150}
      >
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Imagen de la nota"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
};
