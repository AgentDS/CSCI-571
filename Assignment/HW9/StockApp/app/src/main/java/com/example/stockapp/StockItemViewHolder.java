package com.example.stockapp;

import android.view.View;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.text.BreakIterator;

public class StockItemViewHolder extends RecyclerView.ViewHolder {
    final TextView tvItem;

    public StockItemViewHolder(View itemView) {
        super(itemView);
        tvItem = (TextView) itemView.findViewById(R.id.tvItem);
    }
}
