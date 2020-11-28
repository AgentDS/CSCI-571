package com.zhiyu.ebaysearch;

import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class FragmentShipping extends Fragment {

    private static final String TAG = "FragmentShipping";
    private String jsonShippingInfo;
    private JSONObject shippingInfoData;

    private TextView shippingInfo;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.shipping_information_tab, container, false);

        Bundle bundle = getArguments();
        jsonShippingInfo = bundle.getString("ShippingInfo");
        Log.d(TAG, "jsonShippingInfo: " + jsonShippingInfo);

        try {
            shippingInfoData = new JSONObject(jsonShippingInfo);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String shippingInfoHtml = generateHtml(shippingInfoData);

        shippingInfo = view.findViewById(R.id.shipping_info);

        shippingInfo.setText(Html.fromHtml(shippingInfoHtml));

        return view;
    }


    private String splitString(String string) {
        String spitedString = string.replaceAll("[A-Z]", " $0");
        return spitedString;
    }


    private String generateHtml(JSONObject jsonObject) {
        Iterator<String> returnIterator = jsonObject.keys();
        String html = "<ul>";
        while(returnIterator.hasNext()){
            // get key
            String key = returnIterator.next();
            if (key.equals("shippingServiceCost")) {
                continue;
            }

            // get value according to key
            JSONArray valueArray = null;
            String value = null;
            try {
                valueArray = jsonObject.getJSONArray(key);
                value = valueArray.getString(0);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            // split key
            key = splitString(key);
            key = upperCase(key);
            html += "<li>";
            html += "<b>" + key + ": </b>";
            html += value;
            html += "</li>";

        }
        html += "</ul>";
        return html;
    }


    private String upperCase(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
