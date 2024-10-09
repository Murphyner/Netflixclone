import PopUpProvider from '../Context/PopUpContext';
import Nav from './Nav';
import NavRes from './NavRes';

function Header() {
  return (
    <PopUpProvider>
      <header>
        <Nav />
        <NavRes />
      </header>
    </PopUpProvider>
  );
}

export default Header;
