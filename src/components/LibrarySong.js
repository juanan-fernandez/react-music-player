import React from 'react'


const LibrarySong = (props) => {

   //const {setCurrentSong} = props

   const {cover, name, artist, active} = props.song;
   return(
      <div className={`library-song ${active? 'selected-song' : ""}`}>
         <img src={cover} alt={name}/>
         <div className="song-description">
            <h3>{name}</h3>
            <h4>{artist}</h4>
         </div>
      </div>
   )
}

export default LibrarySong;