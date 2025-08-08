import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Navbar from './Component/Navbar';
import Home_page from './pages/Home_page';

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Home_page/>}/>
        </Routes>
      </Router>
      </SignedIn>
    </header>
  );
}
