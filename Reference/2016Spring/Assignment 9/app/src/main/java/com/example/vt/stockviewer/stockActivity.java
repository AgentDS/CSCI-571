package com.example.vt.stockviewer;
import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBar.Tab;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import android.support.v7.app.ActionBar;
import android.text.Html;
import android.text.Layout;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.inputmethod.InputMethodManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookDialog;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.share.Sharer;
import com.facebook.share.model.ShareLinkContent;
import com.facebook.share.widget.ShareDialog;
import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;


public class stockActivity extends AppCompatActivity implements android.support.v7.app.ActionBar.TabListener{
    public  static String inputData;
    private static String filename="MyPrefs1";

    ShareDialog shareDialog;
    CallbackManager callbackManager;
    public static String companyName,Name,LastPrice,ChangePercent,Timestamp,MSDate,MarketCap,Volume,ChangeYTD,ChangePercentYTD,High,Low,Open,Change;
    private ViewPager tabsviewPager;
    private ActionBar mActionBar;
    private Tabsadapter mTabsAdapter;
    private Toolbar toolbar;                              // Declaring the Toolbar Object
    private TextView objText;
    private ImageView fbImage;
    SharedPreferences sharedpreferences;
    SharedPreference objSharedPreference;
    Activity context = this;
    Integer counter;
    ImageView saveButton;
    public static final String MyPREFERENCES = "MyPrefs" ;
    public static String getData(){
        return companyName;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {

     /*   toolbar = (Toolbar) findViewById(R.id.tool_bar); // Attaching the layout to the toolbar object
        setSupportActionBar(toolbar);
      */  // getting data from Main screen
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final android.app.ActionBar actionBar =  getActionBar();
        getSupportActionBar().setCustomView(R.layout.actionbar_custom_view_home);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        getSupportActionBar().setDisplayShowCustomEnabled(true);

        tabsviewPager = (ViewPager) findViewById(R.id.tabspager);

        mTabsAdapter = new Tabsadapter(getSupportFragmentManager());

        tabsviewPager.setAdapter(mTabsAdapter);
        jsonParse();
                fbImage  = (ImageView) findViewById(R.id.FbImage);
        callbackManager = CallbackManager.Factory.create();
        shareDialog = new ShareDialog(this);
        shareDialog.registerCallback(callbackManager, shareCallBack);

        fbImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (ShareDialog.canShow(ShareLinkContent.class)) {
                    ShareLinkContent linkContent = new ShareLinkContent.Builder()
                            .setContentTitle("Current Stock Price of "+Name+" $"+LastPrice)
                            .setContentDescription("Last Price: $"+LastPrice+" CHANGE: ("+Current.round(Double.parseDouble(ChangePercent),2)+"%)")

                            .setContentUrl(Uri.parse("http://finance.yahoo.com/q?s="+companyName))
                            .setImageUrl(Uri.parse("http://chart.finance.yahoo.com/t?s="+companyName+"&lang=en-US"))
                            .build();

                    shareDialog.show(linkContent);
                }
            }
        });
      //  objSharedPreference = new SharedPreference();
        sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);

        saveButton  =(ImageView) findViewById(R.id.actionBarLogo);
        saveButton.setOnClickListener(new View.OnClickListener() {



            @Override
            public void onClick(View v) {

                SharedPreferences myPrefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);
                SharedPreferences myPrefs1 = getSharedPreferences(filename, MODE_PRIVATE);


                Map<String, ?> allEntries = myPrefs.getAll();
                boolean flag =false;
                for (Map.Entry<String, ?> entry : allEntries.entrySet()) {
                    if(entry.getKey().toString().contains(companyName)){
                        flag = true;
                    }

                }
                    if (flag == true) {
                    sharedpreferences.edit().remove(companyName).commit();
                    Toast.makeText(context,
                            getResources().getString(R.string.notSaved),
                            Toast.LENGTH_LONG).show();

                    saveButton.setImageResource(R.drawable.star);

                } else {
                    // Save the text in SharedPreference
                    SharedPreferences.Editor editor = sharedpreferences.edit();
                    editor.putString(companyName, getIntent().getStringExtra("data"));
                    editor.commit();
                        SharedPreferences.Editor editor1 = myPrefs1.edit();
                       Integer counter = myPrefs1.getAll().keySet().size();
                        editor1.putString(counter.toString(),companyName);
                        editor.commit();
                     String value =  myPrefs1.getString("0",null);
                       /* Toast.makeText(context,
                                value,
                                Toast.LENGTH_LONG).show();*/
                    Toast.makeText(context,
                            getResources().getString(R.string.saved),
                            Toast.LENGTH_LONG).show();
                    //saveButton.setTag("StarMarked");
                  //  saveButton.setColorFilter(Color.rgb(255, 255, 0));
                    saveButton.setImageResource(R.drawable.yellow);
                }
            }
        });


        getSupportActionBar().setHomeButtonEnabled(false);
        getSupportActionBar().setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);

        Tab friendstab = getSupportActionBar().newTab().setText("Current").setTabListener(this);
        Tab publicprofiletab = getSupportActionBar().newTab().setText("Historical").setTabListener(this);
        Tab communitytab = getSupportActionBar().newTab().setText("News").setTabListener(this);

        getSupportActionBar().addTab(friendstab);
        getSupportActionBar().addTab(publicprofiletab);
        getSupportActionBar().addTab(communitytab);


        //This helps in providing swiping effect for v7 compat library
        tabsviewPager.setOnPageChangeListener(new OnPageChangeListener() {

            @Override
            public void onPageSelected(int position) {
                // TODO Auto-generated method stub
                getSupportActionBar().setSelectedNavigationItem(position);
            }

            @Override
            public void onPageScrolled(int arg0, float arg1, int arg2) {
                // TODO Auto-generated method stub

            }

            @Override
            public void onPageScrollStateChanged(int arg0) {
                // TODO Auto-generated method stub

            }
        });

    }

    @Override
    public void onTabReselected(Tab arg0, FragmentTransaction arg1) {
        // TODO Auto-generated method stub

    }

    @Override
    public void onTabSelected(Tab selectedtab, FragmentTransaction arg1) {
        // TODO Auto-generated method stub
        tabsviewPager.setCurrentItem(selectedtab.getPosition()); //update tab position on tap
    }

    @Override
    public void onTabUnselected(Tab arg0, FragmentTransaction arg1) {
        // TODO Auto-generated method stub

    }
    public FacebookCallback<Sharer.Result> shareCallBack = new FacebookCallback<Sharer.Result>() {

        @Override
        public void onSuccess(Sharer.Result result) {
            Toast.makeText(stockActivity.this, "Facebook Post Successful", Toast.LENGTH_SHORT).show();
        }
        @Override
        public void onCancel() {
            Toast.makeText(stockActivity.this, "Post Cancelled", Toast.LENGTH_SHORT).show();
        }
        @Override
        public void onError(FacebookException error) {
            Toast.makeText(stockActivity.this, "Failed To Post", Toast.LENGTH_SHORT).show();
        }
    };

    private void jsonParse(){
        try {
            companyName = new JSONObject(getIntent().getStringExtra("data")).getString("Symbol");
            Name = new JSONObject(getIntent().getStringExtra("data")).getString("Name");
            objText  =(TextView) findViewById(R.id.stockName);


            objText.requestLayout();
            objText.setText(Name);
            SharedPreferences myPrefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);

            Map<String, ?> allEntries = myPrefs.getAll();
            saveButton  =(ImageView) findViewById(R.id.actionBarLogo);
            outerLoop:
            for (Map.Entry<String, ?> entry : allEntries.entrySet()) {

                    if (companyName.equalsIgnoreCase(entry.getKey())){
                        saveButton.setImageResource(R.drawable.yellow);
                        break outerLoop;

                    }
                else {
                        saveButton.setImageResource(R.drawable.star);
                    }
              }
            LastPrice = new JSONObject(getIntent().getStringExtra("data")).getString("LastPrice");
            Change = new JSONObject(getIntent().getStringExtra("data")).getString("Change");
            ChangePercent = new JSONObject(getIntent().getStringExtra("data")).getString("ChangePercent");
            Timestamp = new JSONObject(getIntent().getStringExtra("data")).getString("Timestamp");


            MSDate = new JSONObject(getIntent().getStringExtra("data")).getString("MarketCap");
            Volume = new JSONObject(getIntent().getStringExtra("data")).getString("Volume");
            ChangeYTD = new JSONObject(getIntent().getStringExtra("data")).getString("ChangeYTD");
            ChangePercentYTD = new JSONObject(getIntent().getStringExtra("data")).getString("ChangePercentYTD");
            High = new JSONObject(getIntent().getStringExtra("data")).getString("High");
            Low = new JSONObject(getIntent().getStringExtra("data")).getString("Low");
            Open = new JSONObject(getIntent().getStringExtra("data")).getString("Open");
            MarketCap = new JSONObject(getIntent().getStringExtra("data")).getString("MarketCap");

           // Toast.makeText(stockActivity.this, companyName, Toast.LENGTH_LONG).show();

        }
        catch (JSONException e){
            e.printStackTrace();
        }
    }

}