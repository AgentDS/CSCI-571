package com.example.stockapp;

import android.app.SearchManager;
import android.content.Intent;
import android.graphics.Color;
import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

import java.util.Arrays;
import java.util.List;

import io.github.luizgrp.sectionedrecyclerviewadapter.Section;
import io.github.luizgrp.sectionedrecyclerviewadapter.SectionParameters;

final class FavoriteSection extends Section {
    String sectionTitle = "FAVORITES";
    //    List<String> stockPortforlioList = Arrays.asList("AAPL", "DIS", "WMD", "AAPL", "DIS", "WMD", "NETFLIX", "BiliBili", "Twitter", "AAPL", "DIS", "WMD", "Twitter", "AAPL", "DIS", "WMD", "NETFLIX", "BiliBili", "Twitter");
    List<Stock> stockList;

    public FavoriteSection(List<Stock> favoriteList) {
        super(SectionParameters.builder()
                .itemResourceId(R.layout.stock_item)
                .headerResourceId(R.layout.section_header)
                .build());
        stockList = favoriteList;
    }

    @Override
    public int getContentItemsTotal() {
        return stockList.size();
    }

    @Override
    public RecyclerView.ViewHolder getItemViewHolder(View view) {
        // return a custom instance of ViewHolder for the items of this section
        return new StockItemViewHolder(view);
    }

    @Override
    public void onBindItemViewHolder(RecyclerView.ViewHolder holder, int position) {
        StockItemViewHolder itemHolder = (StockItemViewHolder) holder;
        Stock stock = stockList.get(position);

        // bind your view here
        itemHolder.ticker_name.setText(stock.getTickerName());
        itemHolder.current_price.setText(String.format("%.2f", stock.getCurrentPrice()));
        itemHolder.price_change.setText(String.format("%.2f", Math.abs(stock.getPriceChange())));

        if (stock.getShareNum() > 0) {
            itemHolder.company_name.setText(String.format("%d.0 shares", stock.getShareNum()));
        } else {
            itemHolder.company_name.setText(stock.getCompanyName()); // if share is 0 set company name
        }

        if (stock.getPriceChange() > 0) {
            itemHolder.price_change.setTextColor(Color.rgb(49, 156, 94));  // green
            itemHolder.trending_img.setImageResource(R.drawable.ic_twotone_trending_up_24);
        } else if (stock.getPriceChange() < 0) {
            itemHolder.price_change.setTextColor(Color.rgb(155, 64, 73));  // red
            itemHolder.trending_img.setImageResource(R.drawable.ic_baseline_trending_down_24);
        } else {
            itemHolder.price_change.setTextColor(Color.rgb(167, 167, 169)); // grey
            // no need for trending img
        }

        itemHolder.view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(),SearchableActivity.class);
                intent.setAction(Intent.ACTION_SEARCH);
                intent.putExtra(SearchManager.QUERY, stock.getTickerName());
                v.getContext().startActivity(intent);
                // TODO: not elegant? by changing handleintent position in search activity
            }
        });


    }

    @Override
    public RecyclerView.ViewHolder getHeaderViewHolder(final View view) {
        return new HeaderViewHolder(view);
    }

    @Override
    public void onBindHeaderViewHolder(final RecyclerView.ViewHolder holder) {
        final HeaderViewHolder headerHolder = (HeaderViewHolder) holder;
        headerHolder.tvTitle.setText(sectionTitle);
    }

}
