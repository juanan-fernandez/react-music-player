export const playAudio = (isPlaying, audioRef) => {
   if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
         playPromise
            .then(() => {
               audioRef.current.play();
            })
            .catch((error) => console.log(error));
      }
   }
};


export const calcSongPercentage = (currentTime, songDuration) => {
   const currentRounded = Math.round(currentTime);
   const songRounded = Math.round(songDuration);

   return Math.round((currentRounded / songRounded) * 100);
}