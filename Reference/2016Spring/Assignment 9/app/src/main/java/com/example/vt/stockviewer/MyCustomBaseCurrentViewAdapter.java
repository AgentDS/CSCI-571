package com.example.vt.stockviewer;

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

public class MyCustomBaseCurrentViewAdapter extends BaseAdapter {
    private static ArrayList<SearchResult_Current> searchArrayList;

    private LayoutInflater mInflater;
    private int[] imageObjSet;

    public MyCustomBaseCurrentViewAdapter(Context context, ArrayList<SearchResult_Current> results, int[] imageSet) {
        searchArrayList = results;
        mInflater = LayoutInflater.from(context);
        imageObjSet = imageSet;
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
            convertView = mInflater.inflate(R.layout.custom_row_view_current, null);
            holder = new ViewHolder();
            holder.txtLabel = (TextView) convertView.findViewById(R.id.label);
            holder.txtValue = (TextView) convertView
                    .findViewById(R.id.Value);
            holder.imgValue = (ImageView) convertView.findViewById(R.id.Up_down); ;
            convertView.setTag(holder);
                  convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        holder.txtLabel.setText(searchArrayList.get(position).getCompanyName());
        holder.txtValue.setText(searchArrayList.get(position)
                .getLastPrice());

                    holder.imgValue.setImageDrawable((searchArrayList.get(position).getFlag()));



        return convertView;
    }

    static class ViewHolder {
        TextView txtLabel;
        TextView txtValue;
        ImageView imgValue;
        TextView headerInfo;
    }
}