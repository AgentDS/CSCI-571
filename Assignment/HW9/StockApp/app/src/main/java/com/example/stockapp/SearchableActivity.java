package com.example.stockapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;

import android.app.SearchManager;
import android.app.SearchableInfo;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.GridView;
import android.widget.TextView;
import android.widget.Toast;

import com.ms.square.android.expandabletextview.ExpandableTextView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SearchableActivity extends AppCompatActivity {

    String TAG = "SearchableActivity";
    private Menu menu;
    public boolean stared = false;
    private int sharesNum = 400;
    private String ticker = "MSFT";
    private String companyName = "Microsoft Corporation";
    private String companyDescription;
    private float currentPrice = 210.08f;
    private float priceChange = 0f;
    private float marketValue = 134514.34f;
    private GridView statesAreaGridView;
    private List<StatesAreaPriceStr> statesPriceStrList = new ArrayList<>();
    private StatesAreaPriceStrAdapter gridViewAdapter;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.searchable_layout);

        // set toolbar
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // set back to home page button
        getSupportActionBar().setHomeAsUpIndicator(R.drawable.ic_arrow_back_black_24dp);// set drawable icon
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        // set Summary area
        setSummaryArea();

        // set Portfolio area
        setPortfolioArea();

        // set About area
        companyDescription = getString(R.string.about_test); // R.string.about_test for long string, R.string.about_test2 for short string
        setAboutArea();

        // set States area gridView
        initStatesPriceStrs();  // init data for States area
        setStatesArea();

        // TODO: check local storage and set 'stared'
    }

    @Override
    protected void onStart() {
        Log.i(TAG, "onStart start");
        super.onStart();
        Log.i(TAG, "onStart end");
    }

    @Override
    protected void onResume() {
        Log.i(TAG, "onResume start");
        super.onResume();
        Log.i(TAG, "onResume end");
    }

    @Override
    protected void onPause() {
        Log.i(TAG, "onPause start");
        super.onPause();
        Log.i(TAG, "onPause end");
    }

    @Override
    protected void onStop() {
        Log.i(TAG, "onStop start");
        super.onStop();
        Log.i(TAG, "onStop end");
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(getIntent());
    }

    private void handleIntent(Intent intent) {
        if (Intent.ACTION_SEARCH.equals(intent.getAction())) {
            String query = intent.getStringExtra(SearchManager.QUERY);
            Log.i(TAG, "handleIntent: query=" + query);
            ticker = query.toUpperCase();
//            doMySearch(query);
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.detail_toolbar, menu);
        this.menu = menu;
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.star:
                switchStar();
                break;
            default:
                // back to homepage
//                Toast.makeText(this, "Back button clicked", Toast.LENGTH_SHORT).show();
                onBackPressed();
                break;
        }
        return true;
    }

    private void switchStar() {
        // switch icon of star when clicked
        MenuItem starItem = menu.findItem(R.id.star);
        stared = !stared;

        if (stared) {
            Toast.makeText(this, "\"" + ticker + "\" was added to favorites", Toast.LENGTH_SHORT).show();
            starItem.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_24));
        } else {
            Toast.makeText(this, "\"" + ticker + "\" was removed from favorites", Toast.LENGTH_SHORT).show();
            starItem.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_border_24));
        }
        // TODO: modify local storage

    }

    private void setSummaryArea() {
        View summaryView = (View) findViewById(R.id.summary_area);
        TextView tickerTextView = (TextView) summaryView.findViewById(R.id.summary_ticker);
        TextView companyNameTextView = (TextView) summaryView.findViewById(R.id.summary_company_name);
        TextView currentPriceTextView = (TextView) summaryView.findViewById(R.id.summary_current_price);
        TextView priceChangeTextView = (TextView) summaryView.findViewById(R.id.summary_price_change);
        tickerTextView.setText(ticker);
        companyNameTextView.setText(companyName);
        currentPriceTextView.setText(String.format("$%.2f", currentPrice));
        String changePriceStr;
        int textColor;
        if (priceChange > 0) {
            changePriceStr = String.format("$%.2f", Math.abs(priceChange));
            textColor = Color.rgb(49, 156, 94); // green
        } else if (priceChange < 0) {
            changePriceStr = String.format("-$%.2f", Math.abs(priceChange));
            textColor = Color.rgb(155, 64, 73); //red
        } else {
            changePriceStr = "$0.0";
            textColor = Color.rgb(167, 167, 169); // grey
        }
        priceChangeTextView.setText(changePriceStr);
        priceChangeTextView.setTextColor(textColor);
    }

    private void setPortfolioArea() {
        View portfolioView = (View) findViewById(R.id.portfolio_area);
        TextView firstTextView = (TextView) portfolioView.findViewById(R.id.portfolio_text_first_line);
        TextView secondTextView = (TextView) portfolioView.findViewById(R.id.portfolio_text_second_line);

        String firstLine;
        String secondLine;

        if (sharesNum == 0) {
            firstLine = String.format("You have 0 shares of %s.", ticker);
            secondLine = "Start trading!";
        } else {
            firstLine = String.format("Shares owned: %d.0", sharesNum);
            secondLine = String.format("Market Value: $%.2f", marketValue);
        }
        firstTextView.setText(firstLine);
        secondTextView.setText(secondLine);
    }


    private void setStatesArea() {
        statesAreaGridView = (GridView) findViewById(R.id.states_area).findViewById(R.id.states_area_gridView);
        gridViewAdapter = new StatesAreaPriceStrAdapter(SearchableActivity.this, R.layout.states_area_price_str, statesPriceStrList);
        statesAreaGridView.setAdapter(gridViewAdapter);
    }

    private void setAboutArea() {
        // IMPORTANT - call setText on the ExpandableTextView to set text content
        // DO NOT change the id name for this area!!!!!
        ExpandableTextView expTextView = (ExpandableTextView) findViewById(R.id.about_area).findViewById(R.id.expand_text_view);
        expTextView.setText(companyDescription);
    }

    private void initStatesPriceStrs() {
        HashMap<String, String> latestPrice = new HashMap<String, String>();
        float currentPrice = 245.53f;
        float lowPrice = 23.3f;
        float bitPrice = 45.52f;
        float highPrice = 354.34f;
        float midPrice = 23.9f;
        float openPrice = 23.2f;
        int volume = 23443;
        statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", currentPrice), "current"));
        statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", lowPrice), "low"));
        statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", bitPrice), "bid"));
        statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", openPrice), "open"));
        statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", midPrice), "mid"));
        statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", highPrice), "high"));
        statesPriceStrList.add(new StatesAreaPriceStr(String.format("%d.00", volume), "volume"));
    }
}