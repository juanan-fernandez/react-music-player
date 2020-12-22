import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { calcSongPercentage } from '../util';

const Player = (props) => {
   //console.log(props);
   const audioRef = props.audioRef;
   const {isPlaying, setIsPlaying} = props;
   const {songInfo, setSongInfo} = props;
   const {currentSong} =props;
   const {nextOrPrevSong} = props;

   const _skipTrackHandler = (direction) => {
      direction === 'back' ? nextOrPrevSong(-1) : nextOrPrevSong(+1)
   }
   
   const _playSoundHandler = () => {
      if (isPlaying) {
         audioRef.current.pause();
      } else {
         audioRef.current.play();
      }
      setIsPlaying(!isPlaying);  
   }

   const getFormattedTime = (timeInSeconds) => {
      return ('0' + Math.floor(timeInSeconds / 60)).slice(-2) + ':' + ('0' + Math.floor(timeInSeconds % 60)).slice(-2);
   }

   const inputRangeHandler = (ev) => {
      		//calcular porcentaje
		const animationPercent = calcSongPercentage(ev.target.value, songInfo.duration);
      setSongInfo({...songInfo, currentTime: ev.target.value, animationPercent})
      audioRef.current.currentTime= ev.target.value;
   }

   const trackAnim = {transform: `translateX(${songInfo.animationPercent}%)`}
 
	return (
   <div className='player'>
			<div className='time-control'>
				<p>{getFormattedTime(songInfo.currentTime)}</p>
            <div className='track' style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
               <input type='range' 
                  min={0} 
                  max={songInfo.duration || 0} 
                  onChange={inputRangeHandler} 
                  value={songInfo.currentTime}
               />
               <div style={trackAnim} className='animate-track'></div>
            </div>
				
				<p>{songInfo.duration ? getFormattedTime(songInfo.duration) : '0:00'}</p>
			</div>
			<div className='play-control'>
				<FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} onClick={()=> {_skipTrackHandler('back')}} />
				<FontAwesomeIcon className='play' size='2x' icon={isPlaying? faPause: faPlay} onClick={_playSoundHandler} />
				<FontAwesomeIcon className='skip-forward' size='2x' icon={faAngleRight} onClick={()=> {_skipTrackHandler('forward')}}/>
			</div>
		</div>
	);
};

export default Player;
