import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({isLibraryOpen, setIsLibraryOpen}) => {
   const openLibraryHandler = () => {
      setIsLibraryOpen(!isLibraryOpen);
   }
   return (
      <nav className={isLibraryOpen ? 'library-open':""}>
         <h1>Waves</h1>
         <button onClick={openLibraryHandler}>
            <span className='text-span'>Library </span>
            <FontAwesomeIcon icon={faMusic}/>
         </button>
      </nav>
   )
}

export default Nav;
