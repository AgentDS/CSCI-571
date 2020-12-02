package com.example.stockapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;

import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.GridView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HurlStack;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.ms.square.android.expandabletextview.ExpandableTextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;

public class SearchableActivity extends AppCompatActivity {

    String TAG = "SearchableActivity";
    private Menu menu;
    public boolean stared = false;
    private int sharesNum = 400;
    private String ticker;
    private String companyName;
    private String companyDescription;
    private double currentPrice;
    private double priceChange;
    private double marketValue;
    private GridView statesAreaGridView;
    private List<StatesAreaPriceStr> statesPriceStrList = new ArrayList<>();
    private StatesAreaPriceStrAdapter gridViewAdapter;
    private BackendUrlMaker urlMaker;
    private RequestQueue queue;

    private String tiingoAPIKey = "be37d86b75ad931e483aaab61f620653921a7517";
    //    private String tiingoAPIKey = "dea471cb1109196d1921d429284606624f433067";
    private String newsAPIkey = "83d88b3f4f9d44ccad89772a6ef0e218";


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

        // TODO: check local storage and set 'stared' ------ Begin
        //
        //
        // TODO: check local storage and set 'stared' ------ End


        // set Summary area
//        setSummaryArea();


        // set Charts area
        // TODO: set Charts area ------ Begin//
        //
        //
        // TODO: set Charts area ------ End


        // set States area gridView
//        initStatesPriceStrs();  // init data for States area
//        setStatesArea();

        // set About area
//        companyDescription = getString(R.string.about_test); // R.string.about_test for long string, R.string.about_test2 for short string
//        setAboutArea();
        // set Portfolio area
//        setPortfolioArea();


        // set News area
        // TODO: set News area ------ Begin
        //
        //
        // TODO: set News area ------ End

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
            ticker = intent.getStringExtra(SearchManager.QUERY).toUpperCase();
            Log.i(TAG, "handleIntent: ticker entered : " + ticker);
            queue = Volley.newRequestQueue(this);
            urlMaker = new BackendUrlMaker(ticker);

            // SearchutilUrl back: [{"name":"Apple Inc","ticker":"AAPL","permaTicker":"US000000000038","openFIGIComposite":"BBG000B9XRY4","assetType":"Stock","isActive":true,"countryCode":"US"}]
            Log.i(TAG, "searchutilUrl: " + urlMaker.getSearchutilUrl());

            // summaryUrl back: {"endDate":"2020-12-01","name":"Apple Inc","exchangeCode":"NASDAQ","description":"Apple Inc. (Apple) designs, manufactures and markets mobile communication and media devices, personal computers, and portable digital music players, and a variety of related software, services, peripherals, networking solutions, and third-party digital content and applications. The Company's products and services include iPhone, iPad, Mac, iPod, Apple TV, a portfolio of consumer and professional software applications, the iOS and OS X operating systems, iCloud, and a variety of accessory, service and support offerings. The Company also delivers digital content and applications through the iTunes Store, App StoreSM, iBookstoreSM, and Mac App Store. The Company distributes its products worldwide through its retail stores, online stores, and direct sales force, as well as through third-party cellular network carriers, wholesalers, retailers, and value-added resellers. In February 2012, the Company acquired app-search engine Chomp.","startDate":"1980-12-12","ticker":"AAPL"}
            Log.i(TAG, "summaryUrl: " + urlMaker.getMetadataUrl());

            // statesUrl back: {"last":122.72,"quoteTimestamp":"2020-12-01T21:00:00+00:00","bidPrice":null,"bidSize":null,"mid":null,"high":123.4693,"lastSize":null,"tngoLast":122.72,"lastSaleTimestamp":"2020-12-01T21:00:00+00:00","open":121.01,"askSize":null,"low":120.01,"volume":125920963,"timestamp":"2020-12-01T21:00:00+00:00","prevClose":119.05,"askPrice":null,"ticker":"AAPL"}
            Log.i(TAG, "statesUrl: " + urlMaker.getLatestPriceUrl());

            // newsUrl back: [{"source":{"id":null,"name":"9to5Mac"},"author":"Ben Lovejoy","title":"AAPL and other tech stocks up in possible response to election uncertainty","description":"AAPL is up around 4% in pre-market trading, with other tech stocks up too. One theory being suggested is that tech giants are the new safe haven in uncertain times … \n more…\nThe post AAPL and other tech stocks up in possible response to election uncertainty a…","url":"https://9to5mac.com/2020/11/04/aapl-and-other-tech-stocks-up-in-possible-response-to-election-uncertainty/","urlToImage":"https://9to5mac.com/wp-content/uploads/sites/6/2020/11/tech-stocks-up.jpg?quality=82&strip=all","publishedAt":"2020-11-04T14:01:01Z","content":"AAPL is up around 4% in pre-market trading, with other tech stocks up too. One theory being suggested is that tech giants are the new safe haven in uncertain times … \r\nTechCrunchreports.\r\nOn the back… [+2232 chars]"}, ...]
            Log.i(TAG, "newsUrl: " + urlMaker.getNewsUrl());

            // sample back: [{"date":"2018-12-03T00:00:00.000Z","close":184.82,"high":184.94,"low":181.21,"open":184.46,"volume":40798002,"adjClose":45.1285861362,"adjHigh":45.1578872418,"adjLow":44.2471112095,"adjOpen":45.0406828194,"adjVolume":163192008,"divCash":0,"splitFactor":1}, ...]
            Log.i(TAG, "chartsUrl: " + urlMaker.getHistChartsUrl());

            // TODO: real API call
//            initSummary_Portfolio_StatesArea();
//            initChartsArea();



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
        // TODO: modify local storage ------ Begin
        //
        //
        // TODO: modify local storage ------ End

    }

    private void initSummary_Portfolio_StatesArea() {
        JsonObjectRequest summaryObjReq = new JsonObjectRequest(Request.Method.GET, urlMaker.getMetadataUrl(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject summaryRes) {
                        try {
                            companyDescription = summaryRes.getString("description");
                            setAboutArea();
                            companyName = summaryRes.getString("name");
                            JsonObjectRequest statesObjReq = new JsonObjectRequest(Request.Method.GET, urlMaker.getLatestPriceUrl(), null,
                                    new Response.Listener<JSONObject>() {
                                        @Override
                                        public void onResponse(JSONObject statesRes) {
                                            try {
                                                currentPrice = statesRes.isNull("last") ? 0.0 : statesRes.getDouble("last");
                                                double lowPrice = statesRes.isNull("low") ? 0.0 : statesRes.getDouble("low");
                                                double bitPrice = statesRes.isNull("bidPrice") ? 0.0 : statesRes.getDouble("bidPrice");
                                                double highPrice = statesRes.isNull("high") ? 0.0 : statesRes.getDouble("high");
                                                double midPrice = statesRes.isNull("mid") ? 0.0 : statesRes.getDouble("mid");
                                                double openPrice = statesRes.isNull("open") ? 0.0 : statesRes.getDouble("open");
                                                double prevClose = statesRes.isNull("prevClose") ? 0.0 : statesRes.getDouble("prevClose");
                                                int volume = statesRes.getInt("volume");
                                                statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", currentPrice), "current"));
                                                statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", lowPrice), "low"));
                                                statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", bitPrice), "bid"));
                                                statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", openPrice), "open"));
                                                statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", midPrice), "mid"));
                                                statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", highPrice), "high"));
                                                statesPriceStrList.add(new StatesAreaPriceStr(String.format("%d.00", volume), "volume"));
                                                setStatesArea();
                                                Log.i(TAG, "States area data fetched & set");
                                                priceChange = currentPrice - prevClose;
                                                setSummaryArea();
                                                Log.i(TAG, "Summary area data fetched & set");
                                                setPortfolioArea();
                                                Log.i(TAG, "Portfolio area data fetched & set");


                                            } catch (JSONException statesE) {
                                                statesE.printStackTrace();
                                            }
                                        }
                                    }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError statesError) {
                                    Log.i(TAG, "onErrorResponse: LatestPrice Req failed -- " + statesError.toString());
                                }
                            });
                            queue.add(statesObjReq);


                        } catch (JSONException summaryE) {
                            summaryE.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError summaryError) {
                Log.i(TAG, "onErrorResponse: Summary Req failed -- " + summaryError.toString());
            }
        });
        queue.add(summaryObjReq);
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
            marketValue = sharesNum * currentPrice;
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


    private void fetchSetCharts() {
        // TODO: handling charts JSONArray and feed to charts ---- Begin
        //
        // TODO: handling charts JSONArray and feed to charts ---- End
    }

    private void initChartsArea() {
        WebView webView;
        webView = (WebView) findViewById(R.id.charts_area).findViewById(R.id.chart_area_webView);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        webView.clearCache(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowFileAccess(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/test.html");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                String dataUrl = urlMaker.getHistChartsUrl();

                view.loadUrl("javascript:setTicker('" + ticker + "', '" + dataUrl + "')");
            }
        });

    }


    private void initStatesPriceStrs() {
        double currentPrice = 245.53;
        double lowPrice = 23.3;
        double bitPrice = 45.52;
        double highPrice = 354.34;
        double midPrice = 23.9;
        double openPrice = 23.2;
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