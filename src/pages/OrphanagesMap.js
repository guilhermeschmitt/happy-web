import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';

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
        <Marker
          icon={mapIcon}
          position={[-27.5201881, -48.6489143]}
        >
          <Popup
            minWidth={240}
            maxWidth={240}
            closeButton={false}
            className='map-popup'
          >
            Nome do orfanato
            <Link to='/orphanages/1'>
              <FiArrowRight
                size={20}
                color='#fff'
              />
            </Link>
          </Popup>
        </Marker>

      </MapContainer>

      <Link to='orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div>
  )
}

export default OrphanagesMap;