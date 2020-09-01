import { get } from "axios";
import { success, failure } from "./response";
import { client } from "yelp-fusion";

export async function main(event, context, callback) {
  const key = process.env.yelpKey;
  const yelpClient = client(key);

  let query = event.queryStringParameters;
  let request = {
    name: query.name,
    address1: query.address,
    city: query.city,
    state: query.state,
    country: query.country
  };

  let response;
  try {
    response = await yelpClient.businessMatch("best", request);
  } catch (err) {
    console.log(err);
    callback(null, failure({ msg: "business match error" }));
  }

  let jsonBody = response.jsonBody;
  try {
    let yelpId;
    if (jsonBody.businesses[0]) {
      yelpId = jsonBody.businesses[0].id;
    } else {
      callback(null, success(null));
      return;
    }
    try {
      response = await yelpClient.reviews(yelpId);
    } catch (err) {
      console.log(err);
      callback(null, failure({ msg: "review error" }));
    }
    callback(null, success(response.jsonBody.reviews));
  } catch (error) {
    callback(null, failure({ msg: "unexpected error" }));
  }
}
