package com.zhiyu.ebaysearch;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.app.ActionBar;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.Html;
import android.text.Spanned;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;



public class SearchResults extends AppCompatActivity {
    public static final String TAG = "MyTAG";
    private RequestQueue requestQueue;
    private TextView resultText;
    private LinearLayout noRecordMsg;
    private LinearLayout progressBar;
    private SwipeRefreshLayout refreshLayout;
    private boolean flag = false;
    private List<Products> listProducts;
    private int count;
    private Context context;
    private int decorationCount;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        decorationCount = 0;
        super.onCreate(savedInstanceState);
        context = SearchResults.this;

        setContentView(R.layout.activity_search_results);
        resultText = findViewById(R.id.resultDescription);
        noRecordMsg = findViewById(R.id.noRecordMsg);
        progressBar = findViewById(R.id.progress);
        refreshLayout = findViewById(R.id.swipe_refresh_id);

        progressBar.setVisibility(View.VISIBLE);

        Toolbar toolbar = findViewById(R.id.search_bar);
        toolbar.setTitle("Search Results");
        setSupportActionBar(toolbar);

        getSupportActionBar().setHomeButtonEnabled(true);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        receiveData();
        // refresh listener
        refreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override public void onRefresh() {
                // begin to rotate
                refreshLayout.setRefreshing(true);

                new Thread(new Runnable() {
                    @Override public void run() {
                        try {
                            Thread.sleep(1000);
                            runOnUiThread(new Runnable() {
                                @Override public void run() {
                                    receiveData();
                                    refreshLayout.setRefreshing(false);
                                }
                            });
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        });
//        refreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
//            @Override
//            public void onRefresh() {
//                refreshLayout.setRefreshing(true);
//
//                // receive data
//                if (receiveData()) {
//                     refreshLayout.setRefreshing(false);
//                }
//            }
//        });
//        ActionBar actionBar = getActionBar();
//        actionBar.setDisplayHomeAsUpEnabled(true);



    }

    private boolean receiveData() {
        flag = false;
        Intent intent = getIntent();
        final String keyWords = intent.getStringExtra("keyword");
        String searchUrl = intent.getStringExtra("SearchURL");
//        Log.d(TAG, "keyword is "+ keyWords);
        Log.d(TAG, "url is "+ searchUrl);
        listProducts = new ArrayList<>();
        requestQueue = Volley.newRequestQueue(getApplicationContext());

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                searchUrl, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try{
                    count = response.getInt("count");
    //                System.out.println("jsonArray is: " + jsonArray);
//                    System.out.println("count is: " + count);
                    Log.d(TAG, "count is : " + count);

    //                System.out.println("json data===" + response);

                    if (count == 0) {
                        noRecordMsg.setVisibility(View.VISIBLE);
                        progressBar.setVisibility(View.GONE);
                        Toast.makeText(context,"No Records",Toast.LENGTH_SHORT).show();
                    }

                    else {

                        try {
                            String resultHtml = "<b>Showing<font color=\"#3366ff\"> " +
                                    count +
                                    " </font>results for<font color=\"#3366ff\"> " +
                                    keyWords +
                                    " </font></b>\n";
                            resultText.setText(Html.fromHtml(resultHtml));

                            JSONArray searchResult = response.getJSONArray("searchResult");

                            for (int i = 0; i < count; i++) {
                                Products product = new Products();
                                JSONObject itemObj = null;
                                try {
                                    itemObj = searchResult.getJSONObject(i);
                                    product.setImageUrl(itemObj.getJSONArray("galleryURL").getString(0));
//                                    Log.d(TAG, "img url: " + product.getImageUrl());
                                    product.setTitle(itemObj.getJSONArray("title").getString(0));
//                                    Log.d(TAG, "title: " + product.getTitle());

                                    String tempItemShipping = itemObj.getJSONArray("shippingInfo").getJSONObject(0).getJSONArray("shippingServiceCost").getJSONObject(0).getString("__value__");


                                    if (tempItemShipping.equals("0.0")) {
                                        product.setShipping("<b>FREE </b>Shipping");
                                    } else {
                                        product.setShipping("Ships for <b>$" + tempItemShipping + "</b>");
                                    }

//                                    Log.d(TAG, "shipping: " + product.getShipping());

                                    product.setTopFlag(itemObj.getJSONArray("topRatedListing").getString(0));
//                                    Log.d(TAG, "topRatedListing: " + product.getTopFlag());

                                    product.setCondition(itemObj.getJSONArray("condition").getJSONObject(0).getJSONArray("conditionDisplayName").getString(0));
//                                    Log.d(TAG, "conditionDisplayName: " + product.getCondition());

                                    product.setPrice(itemObj.getJSONArray("sellingStatus").getJSONObject(0).getJSONArray("convertedCurrentPrice").getJSONObject(0).getString("__value__"));
//                                    Log.d(TAG, "convertedCurrentPrice: " + product.getPrice());

                                    product.setItemID(itemObj.getJSONArray("itemId").getString(0));

                                    product.setItemUrl(itemObj.getJSONArray("viewItemURL").getString(0));

                                    product.setShippingInfo(itemObj.getJSONArray("shippingInfo").getJSONObject(0));
//                                    Log.d(TAG, "itemId: " + product.getItemID());
//                                    Log.d(TAG, "i is: " + i);
//                                    Log.d(TAG, "listProducts is: " + listProducts);


                                }


                                catch (JSONException e) {
                                    e.printStackTrace();

                                }
                                listProducts.add(product);
                            }

//                            Log.d(TAG, "listProducts is: " + listProducts);
                            progressBar.setVisibility(View.GONE);
                            RecyclerView myrv = findViewById(R.id.recycle_view_id);
                            RecycleViewAdapter myAdapter = new RecycleViewAdapter(context,listProducts);
                            myrv.setLayoutManager(new GridLayoutManager(context,2));
                            myrv.setAdapter(myAdapter);

                            // separate line
                            decorationCount ++;
                            if (decorationCount == 1) {
                                myrv.addItemDecoration(new DividerItemDecoration(context, DividerItemDecoration.HORIZONTAL));
                                myrv.addItemDecoration(new DividerItemDecoration(context, DividerItemDecoration.VERTICAL));
                            }
//                            myrv.addItemDecoration(new MyDividerGridItemDecoration(context));
//
//                            DividerItemDecoration verticalDecoration = new DividerItemDecoration(context,
//                                    DividerItemDecoration.HORIZONTAL);
//                            Drawable verticalDivider = ContextCompat.getDrawable(getActivity(), R.drawable.vertical_divider);
//                            verticalDecoration.setDrawable(verticalDivider);
//                            recyclerview.addItemDecoration(verticalDecoration);
//
//                            DividerItemDecoration horizontalDecoration = new DividerItemDecoration(recyclerview.getContext(),
//                                    DividerItemDecoration.VERTICAL);
//                            Drawable horizontalDivider = ContextCompat.getDrawable(getActivity(), R.drawable.horizontal_divider);
//                            horizontalDecoration.setDrawable(horizontalDivider);
//                            recyclerview.addItemDecoration(horizontalDecoration);
                            flag = true;

                        }

                        catch (Exception e) {
                            Log.d(TAG, "Error occurred in reading searchResult");
                        }



                    }

                }
                catch (JSONException e) {
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
        return true;
    }
}