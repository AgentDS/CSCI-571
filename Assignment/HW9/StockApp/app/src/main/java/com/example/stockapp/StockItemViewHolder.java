package com.example.stockapp;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import org.w3c.dom.Text;

import java.text.BreakIterator;

public class StockItemViewHolder extends RecyclerView.ViewHolder {
    final TextView ticker_name;
    final TextView company_name;
    final TextView current_price;
    final TextView price_change;
    final ImageView trending_img;
    final View view;


    public StockItemViewHolder(View itemView) {
        super(itemView);
        view = itemView;
        ticker_name = (TextView) itemView.findViewById(R.id.ticker_name);
        company_name = (TextView) itemView.findViewById(R.id.company_name);
        current_price = (TextView) itemView.findViewById(R.id.current_price);
        price_change = (TextView) itemView.findViewById(R.id.price_change);
        trending_img = (ImageView) itemView.findViewById(R.id.trending_img);

    }






}
