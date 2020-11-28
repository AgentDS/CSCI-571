package com.zhiyu.ebaysearch;

import android.content.Context;
import android.content.Intent;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class RecycleViewAdapter extends RecyclerView.Adapter<RecycleViewAdapter.MyViewHolder> {
    private Context mContext;
    private List<Products> mData;

    private static final String TAG = "Recycle";


    public RecycleViewAdapter(Context mContext, List<Products> mData) {
        this.mContext = mContext;
        this.mData = mData;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view;
        LayoutInflater mInflater = LayoutInflater.from(mContext);
        view = mInflater.inflate(R.layout.card_item_view,parent,false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, final int position) {
        Picasso.with(mContext).load((mData.get(position).getImageUrl())).placeholder(R.drawable.ebay_default).fit().into(holder.item_img);
        holder.item_title.setText(Html.fromHtml("<b>" + mData.get(position).getTitle()+ "</b>"));
        holder.item_shipping.setText(Html.fromHtml(mData.get(position).getShipping()));
        holder.item_condition.setText(Html.fromHtml("<b><I>" + mData.get(position).getCondition()+ "</I></b>"));
        holder.item_price.setText(Html.fromHtml("<font color=\"#85b300\"><b>$" + mData.get(position).getPrice()+ "</b></font>"));

        if (mData.get(position).getTopFlag().equals("true")) {
            holder.item_top_rated.setText(Html.fromHtml("<b>Top Rated Listing</b>"));
        }
        else {
            holder.item_top_rated.setVisibility(View.INVISIBLE);
        }

        holder.cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                receiveData();
                Intent intent = new Intent(mContext, CardDetails.class);

                // passing data to CardDetails Activity
                intent.putExtra("Title",mData.get(position).getTitle());
                intent.putExtra("ItemID",mData.get(position).getItemID());
                intent.putExtra("Price",mData.get(position).getPrice());
                intent.putExtra("Shipping",mData.get(position).getShipping());
                intent.putExtra("ItemUrl",mData.get(position).getItemUrl());
                intent.putExtra("ShippingInfo",mData.get(position).getShippingInfo().toString());
//                intent.putExtra("JSON",jsonResponse.toString());
                mContext.startActivity(intent);
            }
        });


    }

    @Override
    public int getItemCount() {
        return mData.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        ImageView item_img;
        TextView item_title;
        TextView item_shipping;
        TextView item_top_rated;
        TextView item_condition;
        TextView item_price;
        CardView cardView;

        public MyViewHolder(View itemView) {
            super(itemView);
            item_img = itemView.findViewById(R.id.item_image);
            item_title = itemView.findViewById(R.id.item_title);
            item_shipping = itemView.findViewById(R.id.item_shipping);
            item_top_rated = itemView.findViewById(R.id.item_top_rated);
            item_condition = itemView.findViewById(R.id.item_condition);
            item_price = itemView.findViewById(R.id.item_price);
            cardView = itemView.findViewById(R.id.card);

        }
    }

//    private void receiveData() {
//
//
//        String singleSearchUrl = "";
//        singleSearchUrl += URL;
////        singleSearchUrl += "ItemID=" + itemID;
//        singleSearchUrl += "ItemID=254038842493";
////        singleSearchUrl += "ItemID=254603172743";
////        Log.d(TAG, "singleSearchUrl: " + singleSearchUrl);
//
//
//        Log.d(TAG, "success!");
//
//
//
//        requestQueue = Volley.newRequestQueue(mContext);
//        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
//                singleSearchUrl, null, new Response.Listener<JSONObject>() {
//            @Override
//            public void onResponse(JSONObject response) {
//
//                try {
//                    jsonResponse = response;
//                    JSONArray jsonPictureURL = response.getJSONArray("PictureURL");
//                    Log.d(TAG, "jsonPictureURL: " +jsonPictureURL.toString());
//
////                    if (response.has("Subtitle")) {
////                        String jsonSubtitle = response.getString("Subtitle");
////                        bundleSummary.putSerializable("Subtitle",jsonSubtitle);
////                        Log.d(TAG, "Subtitle: " +jsonSubtitle);
////                    }
////                    else {
////                        bundleSummary.putSerializable("Subtitle","null");
////                        Log.d(TAG, "Subtitle is empty ");
////
////                    }
////                    String jsonBrand = response.getJSONObject("ItemSpecifics").getJSONArray("NameValueList").optJSONObject(0).getJSONArray("Value").getString(0);
////                    Log.d(TAG, "Brand: " +jsonBrand);
//
//
//
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
//
//
//
//            }
//        }, new Response.ErrorListener(){
//
//            @Override
//            public void onErrorResponse(VolleyError error) {
//                System.out.println("error！");
//                error.printStackTrace();
//            }
//        });
//
//        requestQueue.add(jsonObjectRequest);
//
//    }
}
