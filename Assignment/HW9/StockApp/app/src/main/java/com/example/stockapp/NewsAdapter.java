package com.example.stockapp;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.util.List;

public class NewsAdapter extends RecyclerView.Adapter<NewsAdapter.NewsViewHolder> {
    private List<News> newsList;

    public NewsAdapter(List<News> object) {
        newsList = object;
    }

    class NewsViewHolder extends RecyclerView.ViewHolder {
        View newsView;
        ImageView imageView;
        TextView source_Tv;
        TextView title_Tv;
        TextView timeAgo_Tv;

        //
        public NewsViewHolder(View itemView, int viewType) {
            super(itemView);
            newsView = itemView;
            imageView = (ImageView) itemView.findViewById(R.id.imageView);
            source_Tv = (TextView) itemView.findViewById(R.id.source_Tv);
            title_Tv = (TextView) itemView.findViewById(R.id.title_Tv);
            timeAgo_Tv = (TextView) itemView.findViewById(R.id.timeAgo_Tv);
        }
    }


    @Override
    public NewsViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v;
        NewsViewHolder newsHolder;
        switch (viewType) {
            case 0:
                v = LayoutInflater.from(parent.getContext()).inflate(R.layout.first_news_item, parent, false);
                break;
            default:
                v = LayoutInflater.from(parent.getContext()).inflate(R.layout.other_news_item, parent, false);
                break;
        }
        newsHolder = new NewsViewHolder(v, viewType);
        return newsHolder;
    }

    @Override
    public void onBindViewHolder(NewsViewHolder holder, int position) {
        News news = newsList.get(position);
        holder.source_Tv.setText(news.getSourceName());
        holder.title_Tv.setText(news.getTitle());
        holder.timeAgo_Tv.setText(news.getTimeAgo());
        // TODO: set Image for news
        Context itemContext = holder.newsView.getContext();
        String imgUrl = Uri.parse(news.getUrlToImage())
                .buildUpon()
                .build()
                .toString();
        Picasso.with(itemContext).load(imgUrl).placeholder(R.drawable.noimage2).error(R.drawable.noimage2).into(holder.imageView);

        holder.newsView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO: make share dialog
                String newsLogMsg = "News " + position + "\noriginal url: " + news.getUrlToImage() + "\npicasso url: " + imgUrl ;
                Log.w("News card: ", newsLogMsg);
                Toast.makeText(v.getContext(), "Clicked News " + position, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public int getItemViewType(int position) {
        // Just as an example, return 0 or 1 depending on position
        if (position == 0) {
            return 0;  // if first news
        } else {
            return 1;  // others
        }
    }

    @Override
    public int getItemCount() {
        return newsList.size();
    }
}
