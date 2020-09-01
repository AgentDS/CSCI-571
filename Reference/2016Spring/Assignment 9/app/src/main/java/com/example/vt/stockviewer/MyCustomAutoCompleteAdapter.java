package com.example.vt.stockviewer;

/**
 * Created by vt on 5/5/16.
 */

import android.content.Context;
import android.graphics.Paint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;



import android.graphics.Paint;
import android.widget.BaseAdapter;

import java.util.ArrayList;



import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import android.text.SpannableString;
import android.text.style.UnderlineSpan;

public class MyCustomAutoCompleteAdapter extends BaseAdapter {
    private static ArrayList<SearchResults> searchArrayList;

    private LayoutInflater mInflater;

    public MyCustomAutoCompleteAdapter(Context context, ArrayList<SearchResults> results) {
        searchArrayList = results;
        mInflater = LayoutInflater.from(context);
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
            convertView = mInflater.inflate(R.layout.custom_row_view, null);
            holder = new ViewHolder();
            holder.txtTitle = (TextView) convertView.findViewById(R.id.Titleitle);
            holder.txtDescription = (TextView) convertView
                    .findViewById(R.id.Description);
            holder.txtPublisher = (TextView) convertView.findViewById(R.id.Publisher);
            holder.txtDate = (TextView) convertView.findViewById(R.id.Date);
            holder.txtTitle.setPaintFlags(holder.txtTitle.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        holder.txtTitle.setText(searchArrayList.get(position).getTitle());
        holder.txtDescription.setText(searchArrayList.get(position)
                .getDescription());
        holder.txtPublisher.setText(searchArrayList.get(position).getPublisher());
        holder.txtDate.setText(searchArrayList.get(position).getDate());

        return convertView;
    }

    static class ViewHolder {
        TextView txtTitle;
        TextView txtDescription;
        TextView txtPublisher;
        TextView txtDate;
    }
}