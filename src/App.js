import { React, useState, useRef, useEffect } from 'react';
//components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
//styles
import './styles/app.scss';
//datos y auxiliares
import data from './data';
import { calcSongPercentage, playAudio } from './util';


function App() {
	const audioRef = useRef(null);
	//state
	const [isLibraryOpen, setIsLibraryOpen] = useState(false);
	const [songs, setSongs] = useState(data);
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
      currentTime: 0, 
		duration: 0, 
		animationPercent: 0 
   });


   const timeUpdateHandler = (ev) => {
      const duration = ev.target.duration;
		const timePlaying = ev.target.currentTime;
		//calcular porcentaje
		const animationPercent = calcSongPercentage(timePlaying, duration);
      setSongInfo({...songInfo, currentTime: timePlaying, duration, animationPercent});
	}

	const endSongHandler  = () => {
		nextOrPrevSong(1);
	}

	const nextOrPrevSong = (offSetValue) => {
		let index = songs.findIndex(song => song.id === currentSong.id);
		index += offSetValue;
		if (index < 0) {
			index = songs.length - 1;
		} else if (index >= songs.length){
			index = 0;
		}
		setCurrentSong(songs[index]);  //actualizamos currentSong
	}

	const playAudio = () => {
		if (isPlaying) audioRef.current.play();
	}
	useEffect(()=> {
		const updateActive = () => {
			setSongs(prevList => {
				return prevList.map(song => {
					if (song.id === currentSong.id) {
						return { ...song, active: true };
					} else {
						return { ...song, active: false };
					}
				});
			});
		}
		updateActive();
		playAudio();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSong])

	return (
		<div className={`App ${isLibraryOpen? 'library-active' : ''}`}>
			<Nav isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen}/>
			<Song currentSong={currentSong} />
			<Player
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				currentSong={currentSong}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				audioRef={audioRef}
				nextOrPrevSong={nextOrPrevSong}
			/>
			<Library
				listSongs={songs}
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				audioRef={audioRef}
				isLibraryOpen={isLibraryOpen}
			/>
			<audio
				ref={audioRef}
				src={currentSong.audio}
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				onEnded={endSongHandler}
			></audio>
		</div>
	);
}

export default App;
