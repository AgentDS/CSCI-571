package com.zhiyu.ebaysearch;

import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;

public class FragmentSummary extends Fragment {
    private static final String TAG = "FragmentSummary";

    private TextView singleCardTitle;
    private TextView singleCardPrice;
    private TextView singleCardShipping;
    private TextView subTitle;
    private TextView brand;
    private TextView nameValueList;


    private LinearLayout gallery;
    private LinearLayout featureBar;
    private LinearLayout subTitleBar;
    private LinearLayout brandBar;

    private LinearLayout specificationBar;





    private String jsonTitle;
    private String jsonPrice;
    private String jsonShipping;
    private String jsonPicture;
    private String jsonSubTitle;
    private String jsonBrand;
    private String jsonSpecification;


    private JSONArray picture;
    private JSONArray specification;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.summary_tab, container, false);

        Bundle bundle = getArguments();
        // receive data
        jsonTitle = bundle.getString("Title");
        jsonPrice = bundle.getString("Price");
        jsonShipping = bundle.getString("Shipping");
        jsonPicture =  bundle.getString("PictureURL");
        jsonSubTitle = bundle.getString("Subtitle");
        jsonBrand = bundle.getString("Brand");
        jsonSpecification = bundle.getString("Specification");
        Log.d(TAG, "PictureURL is: " + jsonPicture);


        try {
            picture = new JSONArray(jsonPicture);
//            Log.d(TAG, "picture[0] is: " + picture.getJSONObject(0).toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }


        try {
            specification = new JSONArray(jsonSpecification);
        } catch (JSONException e) {
            e.printStackTrace();
        }


//        Log.d(TAG, "Subtitle is: " + jsonSubTitle);
//        Log.d(TAG, "Brand is: " + jsonBrand);
//        Log.d(TAG, "jsonSpecification is: " + jsonSpecification);
//        Log.d(TAG, "picture length is: " + picture.length());



//
//        try {
//            Log.d(TAG, "picture[0] is: " + picture.getString(0));
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }



        // get view items
        singleCardTitle = view.findViewById(R.id.single_item_title);
        singleCardPrice = view.findViewById(R.id.single_item_price);
        singleCardShipping = view.findViewById(R.id.single_item_shipping);
        gallery = view.findViewById(R.id.gallery);

        featureBar = view.findViewById(R.id.product_feature_bar);
        subTitleBar = view.findViewById(R.id.subtitle_bar);
        brandBar = view.findViewById(R.id.brand_bar);
        subTitle = view.findViewById(R.id.single_item_subtitle);
        brand = view.findViewById(R.id.single_item_brand);

        specificationBar = view.findViewById(R.id.specification_bar);
        nameValueList = view.findViewById(R.id.name_value_list);



        // set text
        singleCardTitle.setText(Html.fromHtml(jsonTitle));
        singleCardPrice.setText(Html.fromHtml("<font color=\"#85b300\"><b>$"+ jsonPrice + "</b></font>"));
        singleCardShipping.setText(Html.fromHtml(jsonShipping));


        if (jsonSubTitle == null) {
            subTitleBar.setVisibility(View.GONE);
        }
        else {
            subTitle.setText(jsonSubTitle);
        }

        if (jsonBrand == null) {
            brandBar.setVisibility(View.GONE);
        }
        else {
            brand.setText(jsonBrand);
        }


        if (jsonSubTitle == null && jsonBrand == null) {
            featureBar.setVisibility(View.GONE);
        }

        try {
            if (specification == null || (specification.length() == 1 && specification.getJSONObject(0).getString("Name").equals("Brand"))) {
                specificationBar.setVisibility(View.GONE);
            }
            else {
                String speciHtml = "<ul>";
                int count = 0;
                int i = 1;
                if (jsonBrand == null) {
                    i = 0;
                }
                for (; i < specification.length(); i++ ) {
                    if (count == 5 ) {break;}
                    speciHtml += "<li>";
                    speciHtml += specification.getJSONObject(i).getJSONArray("Value").getString(0);
                    speciHtml += "</li>";
                    count++;
                }
                speciHtml += "</ul>";
                nameValueList.setText(Html.fromHtml(speciHtml));

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }





        for (int i = 0 ;i < picture.length();i++) {
            ImageView imageView = new ImageView(getActivity());
            LinearLayout.LayoutParams param = new LinearLayout.LayoutParams(1000,1000);
            param.leftMargin = 20;
            imageView.setLayoutParams(param);
            try {
//                Log.d(TAG, "picture i : " + picture.getString(i));
                Glide.with(this).load(picture.getString(i)).into(imageView);
                gallery.addView(imageView);

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return view;
    }

}