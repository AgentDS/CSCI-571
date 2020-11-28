package com.zhiyu.ebaysearch;

import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;


public class FragmentSeller extends Fragment {
        private static final String TAG = "FragmentSeller";

        private String jsonSeller;
        private String jsonReturn;

        private JSONObject sellerData;
        private JSONObject returnData;

        private TextView sellerInfo;
        private TextView returnPolicies;
        private LinearLayout returnBar;
        private LinearLayout sellerInfoBar;

        @Nullable
        @Override
        public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

            View view = inflater.inflate(R.layout.seller_information_tab, container, false);
            Bundle bundle = getArguments();
            jsonSeller = bundle.getString("Seller");
            jsonReturn = bundle.getString("ReturnPolicy");

            sellerInfo = view.findViewById(R.id.seller_info);
            returnPolicies = view.findViewById(R.id.return_policies);
            returnBar = view.findViewById(R.id.return_policies_bar);
            sellerInfoBar = view.findViewById(R.id.seller_info_bar);
//            Log.d(TAG, "jsonSeller: " + jsonSeller);
//            Log.d(TAG, "jsonReturn: " + jsonReturn);
            if (jsonSeller == null) {
                sellerData = null;
            }
            else {
                try {
                    sellerData = new JSONObject(jsonSeller);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }



            if (jsonReturn == null) {
                returnData = null;
            }
            else {
                try {
                    returnData = new JSONObject(jsonReturn);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
//            Log.d(TAG, "returnData: " + returnData);


            if (returnData == null) {
                returnBar.setVisibility(View.GONE);
            }
            else {
                returnBar.setVisibility(View.VISIBLE);
                String returnHtml = generateHtml(returnData);
                returnPolicies.setText(Html.fromHtml(returnHtml));

            }

            if (sellerData == null) {
                sellerInfoBar.setVisibility(View.GONE);
            }
            else {
                sellerInfoBar.setVisibility(View.VISIBLE);
                String sellerHtml = generateHtml(sellerData);
                sellerInfo.setText(Html.fromHtml(sellerHtml));

            }


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

                // get value according to key
                String value = null;
                try {
                    value = jsonObject.getString(key);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                // split key
                key = splitString(key);
                html += "<li>";
                html += "<b>" + key + ": </b>";
                html += value;
                html += "</li>";

            }
            html += "</ul>";
            return html;
        }


}
