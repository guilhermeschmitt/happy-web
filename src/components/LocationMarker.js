import { Marker, useMapEvents } from 'react-leaflet';
import mapIcon from '../utils/mapIcon';

function LocationMarker(props) {
  useMapEvents({
    click({ latlng }) {
      const { lat, lng } = latlng;
      props.setPosition({ latitude: lat, longitude: lng });
    }
  });

  return props.position === null
    ? null
    : (
      <Marker
        icon={mapIcon}
        interactive={false}
        position={[props.position.latitude, props.position.longitude]}
      />
    )
}

export default LocationMarker
