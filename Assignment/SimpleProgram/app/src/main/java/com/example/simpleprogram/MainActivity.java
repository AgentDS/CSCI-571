package com.example.simpleprogram;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    String TAG = "MainActivity";
    TextView textView;
    Button dialPhone, toast, showLocation, openWebPage, viewIntent, letsGetPro;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dialPhone = (Button) findViewById(R.id.dialNumber);
        toast = (Button) findViewById(R.id.toast);
        showLocation = (Button) findViewById(R.id.showLocation);
        openWebPage = (Button) findViewById(R.id.openWebPage);
        viewIntent = (Button) findViewById(R.id.viewIntent);
        letsGetPro = (Button) findViewById(R.id.letsGetPro);

        textView = (TextView) findViewById(R.id.textView);

        dialPhone.setOnClickListener(this);
        toast.setOnClickListener(this);
        showLocation.setOnClickListener(this);
        openWebPage.setOnClickListener(this);
        viewIntent.setOnClickListener(this);
        letsGetPro.setOnClickListener(this);
//        push_me.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Log.d(TAG, "Some Body Pushed the Button");
//                textView.setText("Some body Pushed the Button...");
//            }
//        });
//
//        push_me2.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Log.d(TAG, "Some Body Pushed the Button 2");
//                textView.setText("Some body Pushed the Button 2...");
//            }
//        });

        Log.i(TAG, "--onCreate--");
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

    // better approach...
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.dialNumber :
                // Dial happen to be an android component..
                // can we create our own component...????
                Intent intent1 = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:1234567890"));
                startActivity(intent1);
                break;
            case R.id.toast:
                Intent intent2 = new Intent(MainActivity.this, OtherActivity.class);
                startActivity(intent2);
                break;
            case R.id.showLocation:
                Intent intent3 = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:30.0243092,122.0371601,12"));
                startActivity(intent3);
                break;
            case R.id.openWebPage:
                Intent intent4 = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.edureka.co"));
                startActivity(intent4);
                break;
            case R.id.viewIntent:
                Intent intent5 = new Intent(Intent.ACTION_VIEW);
                startActivity(intent5);
                break;
            case R.id.letsGetPro:
//                Intent intent6 = new Intent("com.example.simpleprogram.OtherActivity");
//                startActivity(intent6);
                Intent intent7 = new Intent(Intent.ACTION_VIEW);
                intent7.putExtra("Key","Values is my Data...");
                startActivity(intent7);
                break;
        }
    }
}