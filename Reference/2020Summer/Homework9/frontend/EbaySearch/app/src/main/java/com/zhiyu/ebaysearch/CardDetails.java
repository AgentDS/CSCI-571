package com.zhiyu.ebaysearch;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.graphics.drawable.DrawableCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.LightingColorFilter;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.RequestFuture;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.ExecutionException;

public class CardDetails extends AppCompatActivity {
    private static final String TAG = "MYTAG";
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
    private JSONObject jsonResponse;

    private LinearLayout progressBar;
    private ImageView redirect;
    private ViewPager viewPager;
    private TabLayout tabLayout;
    private ViewPageAdapter adapter;

//
    private FragmentSummary fragmentSummary;
    private FragmentSeller fragmentSeller;
    private FragmentShipping fragmentShipping;


    private Bundle bundleSummary;
    private Bundle bundleSeller;
    private Bundle bundleShipping;
//
//    private ArrayList<Bundle> bundleArrayList;
//    private ArrayList<Bundle> tabBundle;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_card_details);
        context = CardDetails.this;


        fragmentSummary = new FragmentSummary();
        fragmentSeller = new FragmentSeller();
        fragmentShipping = new FragmentShipping();


        // Receive Data from SearchResults
        Intent intent = getIntent();
        title = intent.getExtras().getString("Title");
        Log.d(TAG, "Title: " + title );
        itemID = intent.getExtras().getString("ItemID");
        price = intent.getExtras().getString("Price");
        shipping = intent.getExtras().getString("Shipping");
        itemUrl = intent.getExtras().getString("ItemUrl");
        try {
            shippingInfo = new JSONObject(getIntent().getStringExtra("ShippingInfo"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        progressBar = findViewById(R.id.single_item_progress);
        progressBar.setVisibility(View.VISIBLE);


        redirect = findViewById(R.id.redirect_image);
        redirect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Uri uri = Uri.parse(itemUrl);
                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(uri);
                startActivity(intent);

            }
        });
//

        Log.d(TAG, "shippingInfo: " + shippingInfo);
//        Log.d(TAG, "itemID: " + itemID);
//        Log.d(TAG, "price: " + price);
//        Log.d(TAG, "shipping: " + shipping);
//        Log.d(TAG, "itemUrl: " + itemUrl);





        // toolbar
        Toolbar toolbar = findViewById(R.id.card_detail_bar);
        toolbar.setTitle(title);
        setSupportActionBar(toolbar);

        getSupportActionBar().setHomeButtonEnabled(true);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


        // viewPager and fragment
        viewPager = findViewById(R.id.view_pager_id);
        tabLayout = findViewById(R.id.tab_layout_id);
        adapter = new ViewPageAdapter(getSupportFragmentManager());

        adapter.addFragment(fragmentSummary,"PRODUCT");
        adapter.addFragment(fragmentSeller,"SELLER INFO");
        adapter.addFragment(fragmentShipping,"SHIPPING");

//      set data of fragment
        bundleSummary = new Bundle();
        bundleSummary.putSerializable("Title",title);
        bundleSummary.putSerializable("Price",price);
        bundleSummary.putSerializable("Shipping",shipping);

        bundleSeller = new Bundle();



        bundleShipping = new Bundle();
        bundleShipping.putSerializable("ShippingInfo",shippingInfo.toString());

        receiveData();

    }


    private void receiveData() {


        String singleSearchUrl = "";
        singleSearchUrl += URL;
        singleSearchUrl += "ItemID=" + itemID;
//        singleSearchUrl += "ItemID=254038842493";
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
                    bundleSummary.putSerializable("PictureURL",jsonPictureURL.toString());

                    if (response.has("Subtitle")) {
                        String jsonSubtitle = response.getString("Subtitle");
                        bundleSummary.putSerializable("Subtitle",jsonSubtitle);
                        Log.d(TAG, "Subtitle: " +jsonSubtitle);
                    }
                    else {
                        bundleSummary.putSerializable("Subtitle",null);
                        Log.d(TAG, "Subtitle is empty ");

                    }

                    if (!response.has("ItemSpecifics")) {
                        bundleSummary.putSerializable("Specification",null);

                    }
                    else {
                        JSONArray jsonSpecification = response.getJSONObject("ItemSpecifics").getJSONArray("NameValueList");
                        bundleSummary.putSerializable("Specification",jsonSpecification.toString());
                    }

                    if (response.getJSONObject("ItemSpecifics").getJSONArray("NameValueList").getJSONObject(0).getString("Name").equals("Brand")) {
                        String jsonBrand = response.getJSONObject("ItemSpecifics").getJSONArray("NameValueList").getJSONObject(0).getJSONArray("Value").getString(0);
                        bundleSummary.putSerializable("Brand",jsonBrand);
                        Log.d(TAG, "Brand: " +jsonBrand);
                    }
                    else {
                        bundleSummary.putSerializable("Brand",null);
                        Log.d(TAG, "Brand is empty ");

                    }
                    if(!response.has("Seller")) {
                        bundleSeller.putSerializable("Seller",null);
                    }
                    else {
                        JSONObject seller = response.getJSONObject("Seller");
                        bundleSeller.putSerializable("Seller",seller.toString());
                        Log.d(TAG, "Seller: " + seller.toString());
                    }


                    if (!response.has("ReturnPolicy")) {
                        bundleSeller.putSerializable("ReturnPolicy",null);

                    }
                    else {
                        JSONObject returnPolicy = response.getJSONObject("ReturnPolicy");
                        bundleSeller.putSerializable("ReturnPolicy",returnPolicy.toString());
                        Log.d(TAG, "ReturnPolicy: " + returnPolicy.toString());
                    }





                    fragmentSummary.setArguments(bundleSummary);
                    fragmentSeller.setArguments(bundleSeller);
                    fragmentShipping.setArguments(bundleShipping);


                    progressBar.setVisibility(View.GONE);
                    viewPager.setAdapter(adapter);
                    tabLayout.setupWithViewPager(viewPager);

                    Drawable mySellerIcon = getResources().getDrawable(R.drawable.seller).mutate();
                    mySellerIcon.setColorFilter(Color.parseColor("#276cd9"), PorterDuff.Mode.SRC_ATOP);

                    tabLayout.getTabAt(0).setIcon(R.drawable.information_variant_selected);
                    tabLayout.getTabAt(1).setIcon(mySellerIcon);
                    tabLayout.getTabAt(2).setIcon(R.drawable.truck_delivery_selected);


                    tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
                        @Override
                        public void onTabSelected(TabLayout.Tab tab) {
                            viewPager.setCurrentItem(tab.getPosition());
                        }

                        @Override
                        public void onTabUnselected(TabLayout.Tab tab) {

                        }

                        @Override
                        public void onTabReselected(TabLayout.Tab tab) {

                        }
                    });






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