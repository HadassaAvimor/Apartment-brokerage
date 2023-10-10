import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {

  const navigate = useNavigate();
  const moveTohostMode = () => navigate('/host');
  const moveToguestMode = () => navigate('/guest');

    
    return (<>

    <button  type="button" onClick={moveTohostMode}>
      host
    </button>
    <br></br>
    <button type="button" onClick={moveToguestMode}>
    guest
    </button>

    </>
    )
  }
  