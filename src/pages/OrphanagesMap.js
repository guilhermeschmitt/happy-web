import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import mapMarkerImg from '../images/map-marker.svg';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';

function OrphanagesMap() {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarkerImg} alt='logo' />
          <h2>
            Escolha um orfanato no mapa
          </h2>
          <p>
            Muitas crianças estão esperando a sua visita
          </p>
        </header>
        <footer>
          <strong>
            Biguaçu
          </strong>
          <span>
            Santa Catarina
          </span>
        </footer>
      </aside>

      <MapContainer
        zoom={15}
        center={[-27.5201881, -48.6489143]}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* Podia ser usado o mapbox também, mas teria que criar uma conta */}
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </MapContainer>

      <Link to='' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div>
  )
}

export default OrphanagesMap;