import axios from "axios";

export default async function putLocation(
  coords: Coords,
  requestId: any,
  endRequest: any
) {
  const url = `${import.meta.env.VITE_API_URL}/${requestId}`;
  try {
    const submitObj = { coordinates: { lat: coords.lat, lng: coords.lng }, accuracy: coords.accuracy.toString() };
    await axios.put(url, submitObj);
    endRequest();
  } catch (error) {
    console.log(error);
    alert("Ooops"); //TODO handle error
  }
}

type Coords = {
  lat: Number;
  lng: Number;
  accuracy: Number;
};
