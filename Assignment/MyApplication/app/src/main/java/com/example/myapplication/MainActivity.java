package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Date;


public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    String TAG = "MainActivity";
    //    TextView textView;
    ListView listView;
    ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_listview);
        Log.i(TAG, "--onCreate--");

//        textView = (TextView) findViewById(R.id.textView);
        listView = (ListView) findViewById(R.id.listView);
        adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1);
        adapter.add("Amazon");
        adapter.add("eBay");
        adapter.add("Snapdeal");
        adapter.add("Flipkart");
        adapter.add("Myntra");

        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);
    }


    @Override
    protected void onStart() {
        super.onStart();
        Log.i(TAG, "--onStart--");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.i(TAG, "--onRestart--");
    }


    @Override
    protected void onResume() {
        super.onResume();
        Log.i(TAG, "--onResume--");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i(TAG, "--onPause--");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.i(TAG, "--onStop--");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i(TAG, "--onDestroy--");
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        String item = adapter.getItem(position);
        Toast.makeText(this, "you selected: " + item, Toast.LENGTH_LONG).show();

        // Navigate from MainActivity to ActivityTwo
        Intent intent = new Intent(MainActivity.this, ActivityTwo.class);
        startActivity(intent);
    }

//    public void clickHandler(View view) {
//        Date date = new Date();
//        textView.setText("Today is: " + date.toString());
//        Toast.makeText(this, "You clicked Button", Toast.LENGTH_LONG).show();
//
//    }
}