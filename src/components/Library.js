import React from 'react';
import LibrarySong from './LibrarySong';
import { playAudio } from './../util';

const Library = (props) => {
	
	//props
	const { listSongs, setCurrentSong, isPlaying,  audioRef, isLibraryOpen } = props;	

	//eventos
	const _selectSongHandler = idSong => {

		const idx = listSongs.findIndex(song => song.id === idSong);
		// const newListSongs = listSongs.map((song, index) => {
		// 	if (song.id === idSong) {
		// 		idx=index;
		// 		return {...song, active: true }
		// 	}else {
		// 		return {...song, active: false }
		// 	}
		// });

		//setSongs(newListSongs)
		setCurrentSong(listSongs[idx]);
		playAudio(isPlaying, audioRef);
	}

	
	return (
		<div className={`library ${isLibraryOpen ? 'library-open' : ""}`}>
			<h2>My Library</h2>
			{listSongs.map((song) => (
				<div key={song.id} onClick={() => {_selectSongHandler(song.id)}}>
					<LibrarySong song={song}/>
				</div>
			))}
		</div>
	);
};

export default Library;
