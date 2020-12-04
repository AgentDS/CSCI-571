package com.example.stockapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.core.widget.NestedScrollView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
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
import android.widget.Button;
import android.widget.GridView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
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
import java.util.concurrent.atomic.AtomicInteger;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;

public class SearchableActivity extends AppCompatActivity {

    String TAG = "SearchableActivity";
    private Menu menu;
    public boolean stared;

    private List<LocalStock> localPortfolio;
    private List<LocalStock> localFavorite;


    private int sharesNum;
    private String ticker;
    private String companyName;
    private String companyDescription;
    private double currentPrice;
    private double priceChange;
    private double marketValue;
    private double prevClose;
    private GridView statesAreaGridView;
    private RecyclerView newsAreaRecyclerView;
    private List<StatesAreaPriceStr> statesPriceStrList;
    private List<News> newsList;
    private StatesAreaPriceStrAdapter gridViewAdapter;
    private LinearLayout progressBarArea;
    private NestedScrollView nestedScrollView;
    private NewsAdapter newsAdapter;
    private BackendUrlMaker urlMaker;
    private RequestQueue queue;
    MenuItem starItem;
    AtomicInteger requestsCounter;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        Log.i(TAG, "onCreate: start");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.searchable_layout);

        // set toolbar
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // set back to home page button
        getSupportActionBar().setHomeAsUpIndicator(R.drawable.ic_arrow_back_black_24dp);// set drawable icon
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        nestedScrollView = (NestedScrollView) findViewById(R.id.detail_content);  // detail contents
        progressBarArea = (LinearLayout) findViewById(R.id.progressbar_area);   // progress bar area
        progressBarArea.setVisibility(View.VISIBLE);    // show progress bar area
        nestedScrollView.setVisibility(View.GONE);  // hide content


        handleIntent(getIntent());
        Log.i(TAG, "onCreate: end");

    }


    @Override
    protected void onStart() {
        Log.i(TAG, "onStart: start");
        super.onStart();
        Log.i(TAG, "onStart end");
    }

    @Override
    protected void onResume() {
        Log.i(TAG, "onResume: start");
        super.onResume();
        Log.i(TAG, "onResume end");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i(TAG, "onPause: end");
    }

    @Override
    protected void onStop() {
        Log.i(TAG, "onStop: start");
        super.onStop();
        Log.i(TAG, "onStop: end");
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
//        setIntent(intent);
//        handleIntent(getIntent());
    }

    private void handleIntent(Intent intent) {


        if (Intent.ACTION_SEARCH.equals(intent.getAction())) {
            ticker = intent.getStringExtra(SearchManager.QUERY).toUpperCase();
            Log.i(TAG, "handleIntent: ticker entered : " + ticker);

            urlMaker = new BackendUrlMaker(ticker);
            queue = Volley.newRequestQueue(this);
            requestsCounter = new AtomicInteger(3);  // initial for request queue


            Log.i(TAG, "searchutilUrl: " + urlMaker.getSearchutilUrl());
            Log.i(TAG, "summaryUrl: " + urlMaker.getMetadataUrl());
            Log.i(TAG, "statesUrl: " + urlMaker.getLatestPriceUrl());
            Log.i(TAG, "newsUrl: " + urlMaker.getNewsUrl());
            Log.i(TAG, "chartsUrl: " + urlMaker.getHistChartsUrl());

            // TODO: real API call
            fetchChartsArea();
            fetchNewsArea();
            fetchStatesArea();  // include portfolio area data
            fetchSummaryArea();


            // TODO: for test fake newsList
//            progressBarArea.setVisibility(View.GONE);
//            nestedScrollView.setVisibility(View.VISIBLE);
//            initNewsList();
//            setNewsArea();
//            setPortfolioArea();


            queue.addRequestFinishedListener(req -> {
                requestsCounter.decrementAndGet();
                if (requestsCounter.get() == 0) {
                    priceChange = currentPrice - prevClose;

                    setSummaryArea();
                    setStatesArea();
                    setPortfolioArea();
                    setAboutArea();

                    // set visibility GONE for progress bar, show nestedScrollView
                    progressBarArea.setVisibility(View.GONE);
                    nestedScrollView.setVisibility(View.VISIBLE);
                }
            });


        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // read local data
        localPortfolio = new ArrayList<>();
        localFavorite = new ArrayList<>();
        readListsFromLocal();

        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.detail_toolbar, menu);
        this.menu = menu;
        starItem = this.menu.findItem(R.id.star);
        initStar();  // init star from local storage

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

    private boolean initStar() {
        Log.i(TAG, "initStar: " + localFavorite.toString());
        for (int j = 0; j < localFavorite.size(); j++) {
            if (localFavorite.get(j).getTickerName().equals(ticker)) {
                stared = true;
                setStar();
                return stared;
            }
        }
        stared = false;
        setStar();
        return stared;
    }


    private void setStar() {
        if (stared) {
            starItem.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_24));
        } else {
            starItem.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_border_24));
        }
    }

    private boolean setSharesNum() {
        int idx = 0;
        for (; idx < localPortfolio.size(); idx++) {
            if (localPortfolio.get(idx).getTickerName().equals(ticker)) {
                sharesNum = localPortfolio.get(idx).getShareNum();
                return true;
            }
        }
        sharesNum = 0;
        return false;
    }

    private void switchStar() {
        // switch icon of star when clicked
        stared = !stared;
        setStar();
        if (stared) {
            Toast.makeText(this, "\"" + ticker + "\" was added to favorites", Toast.LENGTH_SHORT).show();
            LocalStock s = new LocalStock(ticker, companyName, sharesNum);
            localFavorite.add(s);
        } else {
            Toast.makeText(this, "\"" + ticker + "\" was removed from favorites", Toast.LENGTH_SHORT).show();
            int idx = 0;
            for (; idx < localFavorite.size(); idx++) {
                if (localFavorite.get(idx).getTickerName() == ticker) {
                    localFavorite.remove(idx);
                    break;
                }
            }
        }
        writeListsToLocal();
    }

    private void readListsFromLocal() {
        SharedPreferences sharedPreferences = getSharedPreferences("LocalStorage", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        Gson gson1 = new Gson();
        String favResponse = sharedPreferences.getString("localFavorite", "");
        localFavorite = gson1.fromJson(favResponse,
                new TypeToken<List<LocalStock>>() {
                }.getType());
        Gson gson2 = new Gson();
        String portResponse = sharedPreferences.getString("localPortfolio", "");
        localPortfolio = gson2.fromJson(portResponse,
                new TypeToken<List<LocalStock>>() {
                }.getType());
    }

    private void writeListsToLocal() {
        // write
        SharedPreferences sharedPreferences = getSharedPreferences("LocalStorage", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        Gson gson = new Gson();
        String jsonlocalFavorite = gson.toJson(localFavorite);
        editor.putString("localFavorite", jsonlocalFavorite);
        String jsonlocalPortfolio = gson.toJson(localPortfolio);
        editor.putString("localPortfolio", jsonlocalPortfolio);
        editor.commit();
    }

    private void fetchNewsArea() {
        JsonArrayRequest newsReq = new JsonArrayRequest(Request.Method.GET,
                urlMaker.getNewsUrl(),
                null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray newsRes) {
                        try {
                            newsList = new ArrayList<>();
                            for (int i = 0; i < newsRes.length(); i++) {
                                JSONObject jsonNews = newsRes.getJSONObject(i);
                                String urlToImage = jsonNews.getString("urlToImage");
                                String sourceName = jsonNews.getJSONObject("source").getString("name");
                                String title = jsonNews.getString("title");
                                String publishedAt = jsonNews.getString("publishedAt");  // strings like "2020-11-04T14:01:01Z"
                                String url = jsonNews.getString("url");  // for sharing
                                News news = new News(urlToImage,
                                        sourceName,
                                        title,
                                        publishedAt,
                                        url);
                                newsList.add(news);
                            }
                            Log.i(TAG, "onResponse: News fetch DONE");
                            setNewsArea();
                        } catch (JSONException newsE) {
                            newsE.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError newsError) {
                newsError.printStackTrace();
                Log.i(TAG, "onErrorResponse: News fetch FAILED: " + newsError.toString());
            }
        });
        queue.add(newsReq);
    }


    private void fetchStatesArea() {
        JsonObjectRequest statesObjReq = new JsonObjectRequest(Request.Method.GET, urlMaker.getLatestPriceUrl(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject statesRes) {
                        try {
                            statesPriceStrList = new ArrayList<>();  // init

                            currentPrice = statesRes.isNull("last") ? 0.0 : statesRes.getDouble("last");
                            double lowPrice = statesRes.isNull("low") ? 0.0 : statesRes.getDouble("low");
                            double bitPrice = statesRes.isNull("bidPrice") ? 0.0 : statesRes.getDouble("bidPrice");
                            double highPrice = statesRes.isNull("high") ? 0.0 : statesRes.getDouble("high");
                            double midPrice = statesRes.isNull("mid") ? 0.0 : statesRes.getDouble("mid");
                            double openPrice = statesRes.isNull("open") ? 0.0 : statesRes.getDouble("open");
                            prevClose = statesRes.isNull("prevClose") ? 0.0 : statesRes.getDouble("prevClose");
                            int volume = statesRes.getInt("volume");
                            statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", currentPrice), "current"));
                            statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", lowPrice), "low"));
                            statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", bitPrice), "bid"));
                            statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", openPrice), "open"));
                            statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", midPrice), "mid"));
                            statesPriceStrList.add(new StatesAreaPriceStr(String.format("%.2f", highPrice), "high"));
                            statesPriceStrList.add(new StatesAreaPriceStr(String.format("%d.00", volume), "volume"));
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
    }

    private void fetchSummaryArea() {
        JsonObjectRequest summaryObjReq = new JsonObjectRequest(Request.Method.GET, urlMaker.getMetadataUrl(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject summaryRes) {
                        try {
                            companyDescription = summaryRes.getString("description");
                            companyName = summaryRes.getString("name");
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
        Button tradeBtn = (Button) portfolioView.findViewById(R.id.trade_button);
        TextView firstTextView = (TextView) portfolioView.findViewById(R.id.portfolio_text_first_line);
        TextView secondTextView = (TextView) portfolioView.findViewById(R.id.portfolio_text_second_line);

        String firstLine;
        String secondLine;

        setSharesNum(); // set shareNum from local storage

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

        tradeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TradeItem tradeItem = new TradeItem(2000.0, ticker, companyName, currentPrice);
                TradeDialog tradeDialog = TradeDialog.newInstance(tradeItem);
                Toast.makeText(v.getContext(), "Trade button clicked", Toast.LENGTH_SHORT).show();
                tradeDialog.show(((AppCompatActivity) v.getContext()).getSupportFragmentManager(), "TradeDialog");
            }
        });
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

    private void setNewsArea() {
        newsAreaRecyclerView = (RecyclerView) findViewById(R.id.news_area).findViewById(R.id.news_area_recyclerView);
        newsAdapter = new NewsAdapter(newsList);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        newsAreaRecyclerView.setLayoutManager(layoutManager);
        newsAreaRecyclerView.setAdapter(newsAdapter);
    }

    private void fetchChartsArea() {
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


    private void initNewsList() {
        // fake news
        currentPrice = 200.0;
        ticker = "AAPL";
        companyName = "Apple Corp";
        sharesNum = 100;
        News n1 = new News("https://9to5mac.com/wp-content/uploads/sites/6/2020/11/tech-stocks-up.jpg?quality=82&strip=all",
                "9to5Mac",
                "AAPL and other tech stocks up in possible response to election uncertainty",
                "2020-11-04T14:01:01Z",
                "https://9to5mac.com/2020/11/04/aapl-and-other-tech-stocks-up-in-possible-response-to-election-uncertainty/");
        News n2 = new News("https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/kxuwkqycl44kvhtcfqt3.jpg",
                "Gizmodo.com",
                "Apple's Still Getting Punished on Wall Street for Not Selling Enough iPhones",
                "2020-11-02T21:22:00Z",
                "https://gizmodo.com/apples-still-getting-punished-on-wall-street-for-not-se-1845554650");

        News n3 = new News("https://9to5mac.com/wp-content/uploads/sites/6/2020/11/Judge-allows-lawsuit-from-AAPL-investors.jpg?quality=82&strip=all",
                "9to5Mac",
                "Judge allows lawsuit from AAPL investors over ‘credible’ claims of being misled",
                "2020-11-06T14:23:33Z",
                "https://9to5mac.com/2020/11/06/judge-allows-lawsuit-from-aapl-investors-over-credible-claims-of-being-misled/");
        News n4 = new News("https://static.reuters.com/resources/r/?m=02&d=20201112&t=2&i=1540933035&r=LYNXMPEGAB0DM&w=800",
                "Reuters",
                "Apple supplier Foxconn posts $1.1 billion quarterly profit; beats estimates - Reuters India",
                "2020-11-12T06:29:00Z",
                "https://in.reuters.com/article/foxconn-results-idINKBN27S0OE");
        newsList.add(n1);
        newsList.add(n2);
        newsList.add(n3);
        newsList.add(n4);
    }

    private void makeLocalLists() {
        localPortfolio = new ArrayList<>();
        localFavorite = new ArrayList<>();

        LocalStock s1 = new LocalStock("AAPL", "Apple Inc", 1);
        localPortfolio.add(s1);
        LocalStock s2 = new LocalStock("TSLA", "Tesla Inc", 1);
        localPortfolio.add(s2);


        LocalStock s5 = new LocalStock("MSFT", "Microsoft Corporation", 0);
        localFavorite.add(s5);
        LocalStock s6 = new LocalStock("NVDA", "NVIDIA Corporation", 0);
        localFavorite.add(s6);
    }


}