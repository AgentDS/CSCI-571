import { get } from "axios";
import { success, failure } from "./response";

export async function main(event, context, callback) {
  const key = process.env.ggKey;
  const pagetoken = event.queryStringParameters.pagetoken;
  let url =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" +
    pagetoken +
    "&key=" +
    key;

  let response;
  try {
    response = await get(url);
  } catch (error) {
    callback(null, failure({ msg: "can not get next page." }));
  }
  callback(null, success(response.data));
}
