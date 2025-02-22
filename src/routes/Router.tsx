//import { BrowserRouter, Route, Routes } from 'react-router';
import { Route, Routes } from 'react-router';
import SelfIntroduction from '../pages/SelfIntroduction.tsx';
import Home from '../pages/Home.tsx';
import { StaticRouter } from 'react-router';

function Router ({ url }: { url: string }) {

  return (
    <StaticRouter location={url}>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/test/' element={<SelfIntroduction />} />
      </Routes>
    </StaticRouter>
    
  );
};

//export default Router;
export { Router }