package com.example.stockapp;

import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

import java.util.Arrays;
import java.util.List;

import io.github.luizgrp.sectionedrecyclerviewadapter.Section;
import io.github.luizgrp.sectionedrecyclerviewadapter.SectionParameters;

final class FavoriteSection extends Section {
    String sectionTitle = "FAVORITES";
    List<String> stockPortforlioList = Arrays.asList("AAPL", "DIS", "WMD", "AAPL", "DIS", "WMD", "NETFLIX", "BiliBili", "Twitter", "AAPL", "DIS", "WMD", "Twitter", "AAPL", "DIS", "WMD", "NETFLIX", "BiliBili", "Twitter");

    public FavoriteSection() {
        super(SectionParameters.builder()
                .itemResourceId(R.layout.section_item)
                .headerResourceId(R.layout.section_header)
                .build());
    }

    @Override
    public int getContentItemsTotal() {
        return stockPortforlioList.size();
    }

    @Override
    public RecyclerView.ViewHolder getItemViewHolder(View view) {
        // return a custom instance of ViewHolder for the items of this section
        return new StockItemViewHolder(view);
    }

    @Override
    public void onBindItemViewHolder(RecyclerView.ViewHolder holder, int position) {
        StockItemViewHolder itemHolder = (StockItemViewHolder) holder;
        String itemName = stockPortforlioList.get(position);

        // bind your view here
        itemHolder.tvItem.setText(itemName);
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
