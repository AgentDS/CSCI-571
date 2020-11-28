package com.zhiyu.ebaysearch;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;



public class SingleItemApi extends AppCompatActivity {

    private static final String TAG = "Single Item";
    private RequestQueue requestQueue;
    private static final String URL = "https://zhiyuhomework9-singleitem.wl.r.appspot.com/?";
    private Context context;


    private String title;
    private String itemID;
    private String price;
    private String shipping;
    private String itemUrl;
    private JSONObject shippingInfo = null;
    private JSONArray pictureURL = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_card_details);
        context = SingleItemApi.this;
        // Receive Data from SearchResults
        Intent intent = getIntent();
        title = intent.getExtras().getString("Title");
        itemID = intent.getExtras().getString("ItemID");
        price = intent.getExtras().getString("Price");
        shipping = intent.getExtras().getString("Shipping");
        itemUrl = intent.getExtras().getString("ItemUrl");


        try {
            shippingInfo = new JSONObject(getIntent().getStringExtra("ShippingInfo"));
        } catch (
        JSONException e) {
            e.printStackTrace();
        }


        // toolbar
        Toolbar toolbar = findViewById(R.id.card_detail_bar);
        toolbar.setTitle(title);
        setSupportActionBar(toolbar);









    }

    private void receiveData() {


        String singleSearchUrl = "";
        singleSearchUrl += URL;
//        singleSearchUrl += "ItemID=" + itemID;
        singleSearchUrl += "ItemID=254038842493";
//        singleSearchUrl += "ItemID=254603172743";
//        Log.d(TAG, "singleSearchUrl: " + singleSearchUrl);


        Log.d(TAG, "success!");

        requestQueue = Volley.newRequestQueue(getApplicationContext());
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                singleSearchUrl, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                try {
                    JSONArray jsonPictureURL = response.getJSONArray("PictureURL");
                    Log.d(TAG, "jsonPictureURL: " +jsonPictureURL.toString());
//                    bundleSummary.putSerializable("PictureURL",jsonPictureURL.toString());

//                    if (response.has("Subtitle")) {
//                        String jsonSubtitle = response.getString("Subtitle");
////                        bundleSummary.putSerializable("Subtitle",jsonSubtitle);
////                        Log.d(TAG, "Subtitle: " +jsonSubtitle);
//                    }
//                    else {
////                        bundleSummary.putSerializable("Subtitle","null");
////                        Log.d(TAG, "Subtitle is empty ");
//
//                    }
//                    String jsonBrand = response.getJSONObject("ItemSpecifics").getJSONArray("NameValueList").optJSONObject(0).getJSONArray("Value").getString(0);
//                    Log.d(TAG, "Brand: " +jsonBrand);
                    Intent intent = new Intent(context, CardDetails.class);
                    // passing data to CardDetails Activity
                    intent.putExtra("Title",title);
                    intent.putExtra("Price",price);
                    intent.putExtra("Shipping",shipping);
                    intent.putExtra("ItemUrl",itemUrl);
                    intent.putExtra("ShippingInfo",shippingInfo.toString());
                    context.startActivity(intent);



                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        }, new Response.ErrorListener(){

            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println("error！");
                error.printStackTrace();
            }
        });

        requestQueue.add(jsonObjectRequest);

    }
}

