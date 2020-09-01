package com.example.vt.stockviewer;

/**
 * Created by vt on 5/4/16.
 */

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;



import android.graphics.Bitmap;
import android.widget.BaseAdapter;

import java.lang.reflect.Array;
import java.util.ArrayList;



import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class MyCustomBaseFavViewAdapter extends BaseAdapter {
    private static ArrayList<SearchResult_Current> searchArrayList;
    private Context mContext;

    private LayoutInflater mInflater;
    private int[] imageObjSet;

    public MyCustomBaseFavViewAdapter(Context context, ArrayList<SearchResult_Current> results) {
        searchArrayList = results;
        mInflater = LayoutInflater.from(context);
        mContext = context;

    }

    @Override
    public void notifyDataSetChanged() {
        super.notifyDataSetChanged();
    }

    public void remove(int postion){
        searchArrayList.remove(postion);
    }

    public int getCount() {
        return searchArrayList.size();
    }

    public Object getItem(int position) {
        return searchArrayList.get(position);
    }

    public long getItemId(int position) {
        return position;
    }


    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if (convertView == null) {
            convertView = mInflater.inflate(R.layout.custom_favorite_stock, null);
            holder = new ViewHolder();
            holder.txtSymbol = (TextView) convertView.findViewById(R.id.fav_symbol);
            holder.txtLastPrice = (TextView) convertView
                    .findViewById(R.id.fav_lastprice);
            holder.Change = (TextView) convertView.findViewById(R.id.fav_change);
            holder.companyName = (TextView) convertView.findViewById(R.id.fav_comapnyName);
            holder.MarketCap = (TextView) convertView.findViewById(R.id.fav_MarketCap);
            convertView.setTag(holder);

        } else {
            holder = (ViewHolder) convertView.getTag();
        }
     String value =   holder.Change.getText().toString();
        if( (holder.Change.getText().toString()).contains("+")){
            holder.Change.setBackgroundColor(Color.rgb(0,255,0));
        }
        else {
            holder.Change.setBackgroundColor(Color.rgb(255,0,0));


        }
      //  holder.Change.setBackgroundColor(Color.rgb(255,255,0));
        holder.txtSymbol.setText(searchArrayList.get(position).getCompanyName());
        holder.txtLastPrice.setText(searchArrayList.get(position)
                .getLastPrice());
        holder.Change.setText(searchArrayList.get(position).getChangePercent());
        holder.companyName.setText(searchArrayList.get(position).getName());
        holder.MarketCap.setText(searchArrayList.get(position).getMarketCap());





        return convertView;
    }

    static class ViewHolder {
        TextView txtSymbol;
        TextView txtLastPrice;
        TextView Change;
        TextView companyName;
        TextView MarketCap;
    }
}