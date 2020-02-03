import React, {useState, useEffect} from 'react';

function DevForm({onSubmit}) {
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
  
    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');
  

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            }, (err) => {
                console.log(err);
            }, { timeout: 30000,}
        )    
    });

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({github_username,
            techs,
            latitude,
            longitude
        });
        setGithub_username('');
        setTechs('');
    };

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              id="github_username" 
              name="github_username" 
              value={github_username}
              onChange={e => setGithub_username(e.target.value)}
              required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              id="techs" 
              name="techs" 
              value={techs}
              onChange={e => setTechs(e.target.value)}
              required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">latitude</label>
              <input 
                id="latitude" 
                type="number" 
                name="latitude" 
                value={latitude} 
                onChange={e => setLatitude(e.target.value)} 
                required />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">longitude</label>
              <input 
                id="longitude" 
                type="number" 
                name="longitude" 
                value={longitude}
                onChange={e => setLongitude(e.target.value)} 
                required />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
    )
};

export default DevForm;
