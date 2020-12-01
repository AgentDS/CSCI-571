package com.example.stockapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;

import android.app.SearchManager;
import android.app.SearchableInfo;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.Toast;

import com.ms.square.android.expandabletextview.ExpandableTextView;

public class SearchableActivity extends AppCompatActivity {

    String TAG = "SearchableActivity";
    private Menu menu;
    public boolean stared = false;
    private String ticker;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.searchable_layout);
        // set toolbar
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // back to home page button
        getSupportActionBar().setHomeAsUpIndicator(R.drawable.ic_arrow_back_black_24dp);// set drawable icon
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        // Get the intent, verify the action and get the query, handled in onNewIntent
        // handleIntent(getIntent());

        // ExpandableTextView in About area
        // IMPORTANT - call setText on the ExpandableTextView to set text content
        // DO NOT change the id name for this area!!!!!
        ExpandableTextView expTv = (ExpandableTextView) findViewById(R.id.about_area).findViewById(R.id.expand_text_view);
        // R.string.about_test for long string, R.string.about_test2 for short string
        expTv.setText(getString(R.string.about_test));

        // TODO: check local storage and set 'stared'
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(getIntent());
    }

    private void handleIntent(Intent intent) {
        if (Intent.ACTION_SEARCH.equals(intent.getAction())) {
            String query = intent.getStringExtra(SearchManager.QUERY);
            Log.i(TAG, "handleIntent: query=" + query);
            ticker = query.toUpperCase();
//            doMySearch(query);
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.detail_toolbar, menu);
        this.menu = menu;
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
//            case R.id.back:
//                onBackPressed();
////                Toast.makeText(this, "Back button clicked", Toast.LENGTH_SHORT).show();
//                break;
            case R.id.star:
                switchStar();
                break;
            default:
                // back to homepage
//                Toast.makeText(this, "Back button clicked", Toast.LENGTH_SHORT).show();
                onBackPressed();
                break;
        }
        return true;
    }

    private void switchStar() {
        // switch icon of star when clicked
        MenuItem starItem = menu.findItem(R.id.star);
        stared = !stared;

        if (stared) {
            Toast.makeText(this, "\"" + ticker + "\" was added to favorites", Toast.LENGTH_SHORT).show();
            starItem.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_24));
        } else {
            Toast.makeText(this, "\"" + ticker + "\" was removed from favorites", Toast.LENGTH_SHORT).show();
            starItem.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_baseline_star_border_24));
        }
        // TODO: modify local storage

    }
}