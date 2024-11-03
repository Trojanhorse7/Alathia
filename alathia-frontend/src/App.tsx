import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

// Routes
import Home from 'pages/Home/index';
import RegisterPlayer from 'pages/RegisterPlayer';
import CreateBattle from 'pages/CreateBattle';
import JoinBattle from 'pages/JoinBattle';
import Battleground from 'pages/Battleground';
import Battle from 'pages/Battle';
import Profile from 'pages/Profile';

function App() {

  return (
    <div className='relative bg-black20 overflow-x-hidden'>
      <div className='relative z-[100]'>
        <Toaster richColors position='top-right' closeButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterPlayer />} />
          <Route path='/create' element={<CreateBattle />} />
          <Route path='/join' element={<JoinBattle />} />
          <Route path='/battleground' element={<Battleground />} />
          <Route path='/battle/:battleName' element={<Battle />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
