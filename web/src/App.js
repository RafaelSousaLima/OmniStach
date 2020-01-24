import React, {useState} from 'react';

import './Global.css';
import './App.css';
import './Sidebar.css'

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div>
            <div class="input-block">
              <label htmlFor="github_username">Usuário do Github</label>
              <input name="github_username" id="github_username"></input>
            </div>

            <div class="input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input name="techs" id="techs"></input>
            </div>

            <div className="input group">

              <div class="input-block">
                <label htmlFor="latitude">Usuário do Github</label>
                <input name="latitude" id="latitude"></input>
              </div>

              <div class="input-block">
                <label htmlFor="longitude">Usuário do Github</label>
                <input name="longitude" id="longitude"></input>
              </div>

            </div>

          </div>
        </form>
        <div className="input group">
          
        </div>
      </aside>

      <main>

      </main>
    </div>
  );
}

export default App;
