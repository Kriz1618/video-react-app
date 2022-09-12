import React from "react";
import { Grid } from "@material-ui/core";

import VideoItem from "./VideoItem";
import AddFavorite from "./AddFavorites";

export const VideoList = ({ videos, onVideoSelect, onSaveFavorite }) => {
  const listOfVideos = videos.map(video => (
    <div key={video.id.videoId} style={{ marginBottom: '5px' }} className="grid-container">
      <VideoItem
        onVideoSelect={onVideoSelect}
        video={video}
      />
      <div onClick={() => onSaveFavorite(video)}>
        <AddFavorite />
      </div>
    </div>
  ));

  return (
    <Grid container spacing={10}>
      {listOfVideos}
    </Grid>
  );
};
