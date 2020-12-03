package com.example.stockapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

import com.squareup.picasso.Picasso;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class NewsShareDialog extends DialogFragment {
    String TAG = "News Dialog";
    public News newsItem;
    private ImageView twitterIv, chromeIv;
    public View view;
    public String RESPONSE = "response";

    static NewsShareDialog newInstance(News news) {
        NewsShareDialog newsDialog = new NewsShareDialog();

        Bundle args = new Bundle();
        args.putSerializable("news_data", (Serializable) news);
        newsDialog.setArguments(args);

        return newsDialog;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        newsItem = (News) getArguments().getSerializable("news_data");
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        twitterIv = view.findViewById(R.id.news_share_twitter);
        chromeIv = view.findViewById(R.id.news_share_chrome);

        twitterIv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //
                Uri twitterUri = Uri.parse(makeTwitterUrl());
                Intent intent = new Intent(Intent.ACTION_VIEW, twitterUri);
                startActivity(intent);
            }
        });

        chromeIv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Uri chromeUri = Uri.parse(makeChromeUrl());
                Intent intent = new Intent(Intent.ACTION_VIEW, chromeUri);
                startActivity(intent);
            }
        });
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.detail_news_share_dialog, container, false);
        bindView(view);
        return view;
    }

    private String makeChromeUrl() {
        // TODO: URL parse for Chrome seems done
        return newsItem.getUrl();
    }

    private String makeTwitterUrl() {
        // TODO: URL parse for Twitter???
        String url;
        try {
            url = "https://twitter.com/intent/tweet?text=" + URLEncoder.encode(newsItem.getTitle(), "UTF-8") + "&url=" + URLEncoder.encode(newsItem.getUrl(), "UTF-8");
        } catch (UnsupportedEncodingException uee) {
            uee.getStackTrace();
            url = newsItem.getUrl();
        }
        Log.i(TAG, "makeTwitterUrl: \n" + url);
        return url;

    }

    private void bindView(View view) {
        TextView titleTv = view.findViewById(R.id.news_share_title);
        ImageView imageView = view.findViewById(R.id.news_share_img);
        titleTv.setText(newsItem.getTitle());
        String imgUrl = Uri.parse(newsItem.getUrlToImage())
                .buildUpon()
                .build()
                .toString();
        Picasso.with(getContext())
                .load(imgUrl)
                .placeholder(R.drawable.noimage2)
                .error(R.drawable.noimage2)
                .into(imageView);
    }


}
