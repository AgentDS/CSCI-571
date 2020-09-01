package com.example.vt.stockviewer;

import java.text.DecimalFormat;
import java.text.Format;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AlertDialog;
import android.text.Editable;
import android.text.Html;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

public class MainActivity extends ActionBarActivity {
    public String data;
    ImageView objRefresh;
    Activity context = this;
    public List<String> suggest;
    public ArrayAdapter<String> aAdapter;
    public AutoCompleteTextView autoComplete;
    ArrayList<SearchResults> results;
    Button getQuote, clear;
    TextView errorMessage;
    static  ListView tempList;
    DecimalFormat format = new DecimalFormat("0.00");
    float historicX = Float.NaN, historicY = Float.NaN;
    static final int DELTA = 50;
    enum Direction {LEFT, RIGHT;}
    public boolean flag;
    private MyCustomBaseFavViewAdapter favAdapter;

    private AlertDialog AskOption()
    {
        flag =false;
        AlertDialog myQuittingDialogBox =new AlertDialog.Builder(this)
                //set message, title, and icon
                .setTitle("Delete")
                .setMessage("Do you want to Delete")


                .setPositiveButton("Delete", new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface dialog, int whichButton) {
                       flag =true;
                        dialog.dismiss();
                    }

                })



                .setNegativeButton("cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        flag = false;
                        dialog.dismiss();

                    }
                })
                .create();
        return myQuittingDialogBox;

    }

    @Override


    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

      /*  objRefresh = (ImageView) findViewById(R.id.imageView1);
        objRefresh.setOnClickListener(new View.OnClickListener() {



            @Override
            public void onClick(View v) {

                SharedPreferences myPrefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);

                Map<String, ?> allEntries = myPrefs.getAll();
                boolean flag =false;
                for (Map.Entry<String, ?> entry : allEntries.entrySet()) {


                }

            }
        });*/
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        setContentView(R.layout.activity_main_screen);
        final android.app.ActionBar actionBar = getActionBar();
        getSupportActionBar().setCustomView(R.layout.main_screen_action_bar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        getSupportActionBar().setDisplayShowCustomEnabled(true);
        suggest = new ArrayList<String>();
        autoComplete= (AutoCompleteTextView)findViewById(R.id.autoCompleteTextView1);
        getQuote = (Button) findViewById(R.id.getQuote);
        clear = (Button) findViewById(R.id.clear);
        errorMessage = (TextView) findViewById(R.id.errorText);
        autoComplete.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long rowId) {
                String selection = (String)parent.getItemAtPosition(position);
                selection  = selection.split("\n")[0];
                autoComplete.setText(selection);


            }
        });

        autoComplete.addTextChangedListener(new TextWatcher(){

            public void afterTextChanged(Editable editable) {
                // TODO Auto-generated method stub

            }



            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                // TODO Auto-generated method stub

            }

            public void onTextChanged(CharSequence s, int start, int before, int count) {
                String newText = s.toString();
                new getJsonAutoComplete().execute(newText);
            }

        });

        getQuote.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String stockValue = autoComplete.getText().toString();


                if(validate(stockValue)) {
                    //    String quoteValue = autoComplete.toString();
                    new getJsonQuote().execute(stockValue);


                }

            }
        });
        clear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                autoComplete.setText("");

                errorMessage.setText("");

            }
        });


        final ArrayList<SearchResult_Current> searchResults = GetSearchResult_Current();

        final ListView lv = (ListView) findViewById(R.id.currentListView_Fav);
        tempList  =lv;

        lv.setAdapter(new MyCustomBaseFavViewAdapter(this, searchResults));
        final Adapter objAdapter  =new MyCustomBaseFavViewAdapter(this, searchResults);



        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> a, View v, int position, long id) {
                Object o = lv.getItemAtPosition(position);
                SearchResult_Current fullObject = (SearchResult_Current) o;
                String symbol = (fullObject.getCompanyName());
                new getJsonQuote().execute(symbol);

            }
        });
        favAdapter  = new MyCustomBaseFavViewAdapter(this,searchResults);
        lv.setAdapter(favAdapter);


        SwipeDismissListViewTouchListener touchListener =
                new SwipeDismissListViewTouchListener(
                        lv,
                        new SwipeDismissListViewTouchListener.DismissCallbacks() {

                            @Override

                            public boolean canDismiss(int position) {
                             /*   AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);

                                builder.setTitle("Confirm");
                                builder.setMessage("Are you sure?");

                                builder.setPositiveButton("YES", new DialogInterface.OnClickListener() {

                                    public void onClick(DialogInterface dialog, int which) {
                                        // Do nothing but close the dialog
                                            flag = true;
                                        dialog.dismiss();
                                    }

                                });

                                builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {

                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        // Do nothing
                                        dialog.dismiss();
                                    }
                                });

                                AlertDialog alert = builder.create();
                                alert.show();*/
                              /*  if(flag == true){
                                    return  true;
                                }
                                else {
                                    return false;
                                }*/
                                return true;

                                }

                            @Override
                            public void onDismiss(ListView listView, int[] reverseSortedPositions) {
                                 //  favAdapter.remove(favAdapter.getItemViewType(reverseSortedPositions[0]));
                                Toast.makeText(context,
                                        "Item has been removed from favorite list",
                                        Toast.LENGTH_LONG).show();

                                Object temp =favAdapter.getItem(reverseSortedPositions[0]);

                                SharedPreferences myPrefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);
                                SharedPreferences.Editor editor = myPrefs.edit();
                                editor.remove(((SearchResult_Current) temp).getCompanyName());
                                editor.apply();
                                searchResults.remove(reverseSortedPositions[0]);

                                favAdapter.notifyDataSetChanged();
                            }
                        });
        lv.setOnTouchListener(touchListener);
        // Setting this scroll listener is required to ensure that during ListView scrolling,
        // we don't look for swipes.
        lv.setOnScrollListener(touchListener.makeScrollListener());

    }

    public boolean validate(String stockValue){
        boolean flag = true;
        if(stockValue.matches("")){

            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
            alertDialogBuilder.setMessage("Please enter the company");
            alertDialogBuilder.setNegativeButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    //  finish();
                }
            });
            AlertDialog alertDialog = alertDialogBuilder.create();
            alertDialog.show();
            flag = false;
        }


        return flag;

    }
    class getJsonAutoComplete extends AsyncTask<String,String,String>{

        @Override
        protected String doInBackground(String... key) {
            String newText = key[0];
            newText = newText.trim();

            try{
                HttpClient hClient = new DefaultHttpClient();
                HttpGet hGet = new HttpGet("http://v1-csci517-hw8.appspot.com/index.php?keyword="+newText);
                ResponseHandler<String> rHandler = new BasicResponseHandler();
                data = hClient.execute(hGet,rHandler);
                suggest = new ArrayList<String>();
                JSONArray jArray = new JSONArray(data);
                CodeList objCodeList = new CodeList();
                for(int i=0;i<jArray.length();i++){
                    JSONObject jsonobject = jArray.getJSONObject(i);

                    suggest.add(i, Html.fromHtml("<b>"+jsonobject.getString("Symbol")+"</b>")+"\n"+jsonobject.getString("Name")+" ("+jsonobject.getString("Exchange")+")") ;
                }

            }catch(Exception e){
                Log.w("Error", e.getMessage());




            }
            runOnUiThread(new Runnable(){
                public void run(){
                    aAdapter = new ArrayAdapter<String>(getApplicationContext(),R.layout.item,suggest);
                    autoComplete.setAdapter(aAdapter);

                    aAdapter.notifyDataSetChanged();
                }

            });

            return null;
        }

    }
    class getJsonQuote extends AsyncTask<String,String,String>{

        Intent myIntent = new Intent(MainActivity.this, stockActivity.class);

        @Override
        protected String doInBackground(String... key) {
            String quoteValue = key[0];
            quoteValue = quoteValue.trim();

            try{
                HttpClient hClient = new DefaultHttpClient();
                HttpGet hGet = new HttpGet("http://v1-csci517-hw8.appspot.com/index.php?inputValue="+quoteValue);
                ResponseHandler<String> rHandler = new BasicResponseHandler();
                data = hClient.execute(hGet,rHandler);
                if(data.contains("Message") ||data.contains("Failure") ){
                    data  ="";

                }

            }catch(Exception e){
                Log.w("Error", e.getMessage());
            }


            return null;
        }
        protected void onPostExecute(String result)   {
            super.onPostExecute(data);

            if (data!= null && !data.isEmpty()) {


                myIntent.putExtra("data", data);
                MainActivity.this.startActivity(myIntent);

            } else {
                Log.e("ServiceHandler", "Couldn't get any data from the url");
                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(MainActivity.this);
                alertDialogBuilder.setMessage("Invalid Entry,Please Enter a valid Entry");
                alertDialogBuilder.setNegativeButton("Ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        //  finish();
                    }
                });
                AlertDialog alertDialog = alertDialogBuilder.create();
                alertDialog.show();


            }


        }

    }
    private ArrayList<SearchResult_Current> GetSearchResult_Current() {
        ArrayList<SearchResult_Current> results = new ArrayList<SearchResult_Current>();

        SearchResult_Current sr = new SearchResult_Current();

        SharedPreferences myPrefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        Map<String, ?> allEntries = myPrefs.getAll();
        for (Map.Entry<String, ?> entry : allEntries.entrySet()) {

            String data = myPrefs.getString(entry.getKey(), "");
            try {
                String Symbol = new JSONObject(data).getString("Symbol");
                String LastPrice = new JSONObject(data).getString("LastPrice");

                String changePercent = new JSONObject(data).getString("ChangePercent");
                String Name = new JSONObject(data).getString("Name");
                String MarketCap = new JSONObject(data).getString("MarketCap");
                sr.setCompanyName(Symbol);
                sr.setLastPrice(LastPrice);
                Double tempChangePercent = Double.parseDouble(changePercent);

                if(tempChangePercent > 0){
                    sr.setChangePercent("+" +format.format(Current.round(tempChangePercent, 2)) + "%");

                }
                else {
                    sr.setChangePercent("-" +format.format(Current.round(tempChangePercent, 2)) + "%");

                }
                  sr.setName(Name);

                String tempMarketCap;
                Double billion = (Double.parseDouble(MarketCap)) / 1000000000;
                Double million = (Double.parseDouble(MarketCap)) / 1000000;
                if (billion < 0.05) {
                    tempMarketCap = format.format(Current.round(million, 2)) + " Million";
                    sr.setLastPrice(tempMarketCap);
                } else {
                    tempMarketCap = format.format(Current.round(billion, 2)) + " Billion";
                    sr.setMarketCap("Market Cap:" + tempMarketCap);
                }
                results.add(sr);
                sr = new SearchResult_Current();


            } catch (JSONException e) {
                e.printStackTrace();
            }
        }








        return results;
    }


}







