package com.example.stockapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.MenuItemCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.SearchManager;
import android.app.SearchableInfo;
import android.content.ComponentName;
import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import io.github.luizgrp.sectionedrecyclerviewadapter.SectionedRecyclerViewAdapter;

public class MainActivity extends AppCompatActivity {

    private SectionedRecyclerViewAdapter sectionedAdapter;
    private List<Stock> portfolioList = new ArrayList<>();
    private List<Stock> favoriteList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.Theme_StockApp);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        sectionedAdapter = new SectionedRecyclerViewAdapter();
        // Add your Sections
        initLists();
        sectionedAdapter.addSection(new DateSection());
        sectionedAdapter.addSection(new PortfolioSection(portfolioList));
        sectionedAdapter.addSection(new FavoriteSection(favoriteList));
        sectionedAdapter.addSection(new TiingoSection());

        final RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerview);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(sectionedAdapter);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.toolbar, menu);
        SearchView searchView = (SearchView) menu.findItem(R.id.menu_search).getActionView();
        searchView.setIconifiedByDefault(true); // 是否預設顯示圖示
        searchView.setSubmitButtonEnabled(false);

        SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        ComponentName componentName = new ComponentName(this, SearchableActivity.class); // 指定Activity
        SearchableInfo searchableInfo = searchManager.getSearchableInfo(componentName);
        searchView.setSearchableInfo(searchableInfo);

        return true;
    }

    private void initLists() {
        for (int i = 0; i < 15; i++) {
            Random random = new Random();
            float price = random.nextFloat() * 5000;
            int shareNum = random.nextInt(300) + 10;   // positive integers for portfolio
            float change = random.nextFloat() * 40 - 20;
            Stock stock = new Stock("AAPL", "Apple Corp.", change, price, shareNum);
            portfolioList.add(stock);
        }
        Stock stock_tmp = new Stock("AAPL", "Apple Corp.", 0, 23.52f, 43);
        portfolioList.add(stock_tmp);



        for (int i = 0; i < 10; i++) {
            Random random = new Random();
            float price = random.nextFloat() * 5000;
            int shareNum = random.nextBoolean() ? random.nextInt(300) + 10 : 0;   // 0 or positive integers
            float change = random.nextFloat() * 40 - 20;
            Stock stock = new Stock("DIS", "Disney Land", change, price, shareNum);
            favoriteList.add(stock);
        }
    }
}