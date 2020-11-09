import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { MapContainer, TileLayer } from 'react-leaflet';

import api from '../services/api';
import Sidebar from '../components/Sidebar';

import '../styles/pages/create-orphanage.css';
import LocationMarker from "../components/LocationMarker";

export default function CreateOrphanage() {

  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [images, setImages] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  function handleSelectImages({ target }) {
    if (!target.files)
      return;

    const selectedImages = Array.from(target.files);
    const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image));

    setImages([...images, ...selectedImages]);
    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { latitude, longitude } = position;
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('instructions', instructions);
    data.append('longitude', String(longitude));
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => data.append('images', image));

    await api.post('orphanages', data);
    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              zoom={15}
              center={[-27.5201881, -48.6489143]}
              style={{ width: '100%', height: 280 }}
            >
              <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

              <LocationMarker
                position={position}
                setPosition={setPosition}
              />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                value={about}
                maxLength={300}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">
                Fotos
              </label>

              <div className="images-container">
                {
                  previewImages.map(image => (
                    <img
                      alt={name}
                      key={image}
                      src={image}
                    />
                  ))
                }

                <label className="new-image" htmlFor='image[]'>
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type='file'
                id='image[]'
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">
                Instruções
              </label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">
                Horário de funcionamento
              </label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(true)}
                  className={open_on_weekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(false)}
                  className={!open_on_weekends ? 'active' : ''}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}