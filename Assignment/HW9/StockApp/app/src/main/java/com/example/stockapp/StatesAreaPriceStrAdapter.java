package com.example.stockapp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.List;

public class StatesAreaPriceStrAdapter extends ArrayAdapter<StatesAreaPriceStr> {
    private int resourceId;

    public StatesAreaPriceStrAdapter(Context context, int textViewResourceId, List<StatesAreaPriceStr> objects) {
        super(context, textViewResourceId, objects);
        resourceId = textViewResourceId;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
//        return super.getView(position, convertView, parent);
        View view;
        ViewHolder viewHolder;
        StatesAreaPriceStr priceStr = getItem(position);
        if (convertView==null) {
            view = LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
            viewHolder = new ViewHolder();
            viewHolder.priceStr = (TextView) view.findViewById(R.id.price_str);
            view.setTag(viewHolder);
        } else {
            view = convertView;
            viewHolder = (ViewHolder) view.getTag();
        }
        viewHolder.priceStr.setText(priceStr.getPriceStr());
        return view;
    }

    class ViewHolder {
        TextView priceStr;
    }
}
