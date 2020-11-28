package com.zhiyu.ebaysearch;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentResolver;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.util.concurrent.BlockingDeque;


public class MainActivity extends AppCompatActivity {
    private static String TAG = "MYTAG";
    private Button searchBtn;
    private Button clearBtn;
    private EditText keyWords;
    private EditText minPrice;
    private EditText maxPrice;
    private TextView keyWordsError;
    private TextView PriceError;
    private CheckBox newCondition;
    private CheckBox usedCondition;
    private CheckBox unspecifiedCondition;
    private Spinner sortOrder;



    private static final String URL = "https://zhiyuhomework9-allitems.wl.r.appspot.com/?";
//    private static final String URL = "http://127.0.0.1:8080/?";
    private String searchUrl;





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        searchBtn = findViewById(R.id.SearchButton);
        clearBtn = findViewById(R.id.ClearButton);
        keyWords = findViewById(R.id.keyWordInput);
        minPrice = findViewById(R.id.minPrice);
        maxPrice = findViewById(R.id.maxPrice);
        keyWordsError = findViewById(R.id.keyWordError);
        PriceError = findViewById(R.id.PriceError);
        newCondition = findViewById(R.id.NewCondition);
        usedCondition = findViewById(R.id.UsedCondition);
        unspecifiedCondition = findViewById(R.id.UnspecifiedCondition);
        sortOrder = findViewById(R.id.SortByInput);


        searchBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 searchUrl = "";

                 String keyWordValue = keyWords.getText().toString();
                 String minPriceValue = minPrice.getText().toString();
                 String maxPriceValue = maxPrice.getText().toString();

                float inputMinPrice = 0;
                float inputMaxPrice = Float.POSITIVE_INFINITY;

                if (!minPriceValue.trim().equals("")) {
                    inputMinPrice = Float.parseFloat(minPriceValue);
                }
                if (!maxPriceValue.trim().equals("")) {
                    inputMaxPrice = Float.parseFloat(maxPriceValue);
                }

//                System.out.println(minPriceValue);
                boolean newChecked = newCondition.isChecked();
                boolean usedChecked = usedCondition.isChecked();
                boolean unspecifiedChecked = unspecifiedCondition.isChecked();
                String sortOrderValue = sortOrder.getSelectedItem().toString();
                Log.d(TAG, "sortOrderValue is: " + sortOrderValue );

                if (!isValid(keyWordValue, inputMinPrice, inputMaxPrice)) {
                    Toast.makeText(getApplicationContext(),"Please fix all fields with errors", Toast.LENGTH_SHORT).show();
                    return;
                }

                searchUrl += URL;
                searchUrl += generateUrl(keyWordValue, inputMinPrice, inputMaxPrice,
                                         newChecked, usedChecked, unspecifiedChecked, sortOrderValue);

//                System.out.println(searchUrl);
                Log.d(TAG, "searchUrl is : " + searchUrl);
                // intent obj
                Intent intent = new Intent(MainActivity.this, SearchResults.class);
                // pack data
                intent.putExtra("keyword", keyWordValue);
                intent.putExtra("SearchURL",searchUrl );
                // start activity
                startActivity(intent);
            }
        });

        clearBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                keyWords.setText("");
                minPrice.setText("");
                maxPrice.setText("");
                keyWordsError.setVisibility(View.GONE);
                PriceError.setVisibility(View.GONE);
                newCondition.setChecked(false);
                usedCondition.setChecked(false);
                unspecifiedCondition.setChecked(false);
                sortOrder.setSelection(0);

            }
        });

    }


    private boolean isValid (String inputKeyWord, float inputMinPrice, float inputMaxPrice) {

//        float inputMinPrice = 0;
//        float inputMaxPrice = Float.POSITIVE_INFINITY;
//
//        if (!minPriceValue.trim().equals("")) {
//            inputMinPrice = Float.parseFloat(minPriceValue);
//        }
//        if (!maxPriceValue.trim().equals("")) {
//            inputMaxPrice = Float.parseFloat(maxPriceValue);
//        }

        if (inputKeyWord.trim().equals("")) {
            this.keyWordsError.setVisibility(View.VISIBLE);
            if (inputMinPrice < 0 || inputMaxPrice < 0 || inputMinPrice > inputMaxPrice) {
                this.PriceError.setVisibility(View.VISIBLE);
            }
            return false;
        }

        if (inputMinPrice < 0 || inputMaxPrice < 0 || inputMinPrice > inputMaxPrice) {
            this.PriceError.setVisibility(View.VISIBLE);
            this.keyWordsError.setVisibility(View.GONE);

            return false;
        }

        this.keyWordsError.setVisibility(View.GONE);
        this.PriceError.setVisibility(View.GONE);
        return true;
    }

    private String generateUrl(String inputKeyWord, float inputMinPrice, float inputMaxPrice,
                               boolean isNew, boolean isUsed, boolean isUnspecified,
                               String inputSortOrder) {
        String url = "";
        int i = 0;

        // keywords
        url += "keywords=" + inputKeyWord;

        // sort by
        if (inputSortOrder.equals("Best Match")) {
            url += "&sortOrder=BestMatch";
        } else if (inputSortOrder.equals("Price: highest first")){
            url += "&sortOrder=CurrentPriceHighest";
        } else if (inputSortOrder .equals("Price + Shipping: Highest first")){
            url += "&sortOrder=PricePlusShippingHighest";
        } else {
            url += "&sortOrder=PricePlusShippingLowest";
        }

        // minimum price
        if (inputMinPrice !=0) {
            url += "&itemFilter(" + i + ").name=MinPrice&itemFilter(" + i + ").value=" + inputMinPrice
                    + "&itemFilter(" + i + ").paramName=Currency&itemFilter(" + i + ").paramValue=USD";
            i++;
        }

        // maximum price
        if (inputMaxPrice != Float.POSITIVE_INFINITY) {
            url += "&itemFilter(" + i + ").name=MaxPrice&itemFilter(" + i + ").value=" + inputMaxPrice
                    + "&itemFilter(" + i + ").paramName=Currency&itemFilter(" + i + ").paramValue=USD";
            i++;
        }

        // condition
        if (isNew || isUsed || isUnspecified) {
            url += "&itemFilter(" + i + ").name=Condition";
            int j = 0;
            if (isNew) {
                url += "&itemFilter(" + i + ").value(" + j + ")=New";
                j += 1;
            }
            if (isUsed)  {
                url += "&itemFilter(" + i + ").value(" + j + ")=Used";
                j += 1;
            }
            if (isUnspecified) {
                url += "&itemFilter(" + i + ").value(" + j + ")=Unspecified";
                j += 1;
            }

        }

        return url;
    }

}


