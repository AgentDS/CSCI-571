import { get } from "axios";
import { success, failure } from "./response";

export async function main(event, context, callback) {
    const key = process.env.ggKey;
    let response;
    let form = event.queryStringParameters;
    let location = form.location;
    if (form.isUserInput == "true") {
      let url =
        "https://maps.googleapis.com/maps/api/geocode/json?key=" +
        encodeURIComponent(key) +
        "&address=" +
        encodeURIComponent(location);
      try {
        response = await get(url);
      } catch (err) {
        console.log(err);
        callback(null, failure({msg: "faild to get geocode"}));
      }
      try {
        let geoJson = response.data.results[0].geometry.location;
        form.geoJson = geoJson;
      } catch (error) {
        console.log(error);
        callback(null, failure({msg: "no geometry"}));
      }
    } else {
      form.geoJson = JSON.parse(form.geoJson);
    }
  
    let rad = form.distance * 1609.344;
    let url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      form.geoJson.lat +
      "," +
      form.geoJson.lng +
      "&radius=" +
      rad +
      "&type=" +
      form.category +
      "&keyword=" +
      encodeURIComponent(form.keyword) +
      "&key=" +
      key;
    try {
      response = await get(url);
    } catch (err) {
      console.log(err);
      callback(null, failure({msg: "nearby search failed."}));
    }
    let result = response.data;
    callback(null, success(result));
  }
  