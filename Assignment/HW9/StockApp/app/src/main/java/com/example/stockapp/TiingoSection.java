package com.example.stockapp;


import android.content.Intent;
import android.net.Uri;
import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

import java.util.Arrays;
import java.util.List;

import io.github.luizgrp.sectionedrecyclerviewadapter.Section;
import io.github.luizgrp.sectionedrecyclerviewadapter.SectionParameters;

final class TiingoSection extends Section {

    String sectionTitle = "Powered by Tiingo";
    List<String> itemList = Arrays.asList();

    public TiingoSection() {
        super(SectionParameters.builder()
                .itemResourceId(R.layout.section_item)
                .headerResourceId(R.layout.tiingo_header)
                .build());
    }


    @Override
    public int getContentItemsTotal() {
        return 0;
    }

    @Override
    public RecyclerView.ViewHolder getItemViewHolder(View view) {
        // return a custom instance of ViewHolder for the items of this section
        return new StockItemViewHolder(view);
    }


    @Override
    public void onBindItemViewHolder(RecyclerView.ViewHolder holder, int position) {
        StockItemViewHolder itemHolder = (StockItemViewHolder) holder;
        String itemName = itemList.get(position);
    }

    @Override
    public RecyclerView.ViewHolder getHeaderViewHolder(final View view) {
        HeaderViewHolder holder = new HeaderViewHolder(view);
        holder.tvTitle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse("https://www.tiingo.com/"));
                v.getContext().startActivity(intent);
            }
        });
        return holder;
    }

    @Override
    public void onBindHeaderViewHolder(final RecyclerView.ViewHolder holder) {
        final HeaderViewHolder headerHolder = (HeaderViewHolder) holder;
        headerHolder.tvTitle.setText(sectionTitle);
    }




}

