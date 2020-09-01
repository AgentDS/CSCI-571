package com.example.vt.stockviewer;

/**
 * Created by vt on 5/1/16.
 */
import org.ocpsoft.prettytime.PrettyTime;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.inputmethodservice.Keyboard;
import android.media.Image;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.ListFragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.koushikdutta.urlimageviewhelper.UrlImageViewHelper;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import uk.co.senab.photoview.PhotoViewAttacher;


public class Current extends Fragment {
    String data = "";
    SimpleDateFormat lv_parser;
    Date lv_localDate = null;
    ImageView footerImage;
    ImageView zoomImageClient;
    DecimalFormat format = new DecimalFormat("0.00");
    Button load_img;
    ImageView img;
    Bitmap bitmap;
    ProgressDialog pDialog;
    PhotoViewAttacher mAttacher;
    SimpleDateFormat lv_formatter;

    public static int[] imageSet = {R.drawable.up, R.drawable.down};


    @Override

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.current, container,
                false);


        ArrayList<SearchResult_Current> searchResults = GetSearchResult_Current();

        final ListView lv = (ListView) rootView.findViewById(R.id.currentListView);
        ViewGroup header = (ViewGroup) inflater.inflate(R.layout.header, lv,
                false);
        ViewGroup footer = (ViewGroup) inflater.inflate(R.layout.footer, lv,
                false);
        lv.addHeaderView(header, null, false);
        lv.addFooterView(footer, null, false);
        lv.setAdapter(new MyCustomBaseCurrentViewAdapter(getContext(), searchResults, imageSet));

        footerImage = (ImageView) rootView.findViewById(R.id.footerImage);

        img = (ImageView) rootView.findViewById(R.id.Up_down);

        new LoadImage().execute("http://chart.finance.yahoo.com/t?s=" + stockActivity.companyName + "&lang=en-US");


        footerImage.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {
                Dialog settingsDialog = new Dialog(getActivity());
                settingsDialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);

                settingsDialog.setContentView(LayoutInflater.from(getActivity()).inflate(R.layout.custom_fullimage_dialog
                        , null));


                zoomImageClient = (ImageView) settingsDialog.findViewById(R.id.zoomImage);
                new LoadImage1().execute("http://chart.finance.yahoo.com/t?s=AAPL&lang=en-US&width=2000&height=1200");

                settingsDialog.show();
            }
        });

        return rootView;
    }

    private ArrayList<SearchResult_Current> GetSearchResult_Current() {
        ArrayList<SearchResult_Current> results = new ArrayList<SearchResult_Current>();

        SearchResult_Current sr = new SearchResult_Current();

        sr.setCompanyName("Name");
        sr.setLastPrice(stockActivity.Name);

        results.add(sr);

        sr = new SearchResult_Current();

        sr.setCompanyName("SYMBOL");
        sr.setLastPrice(stockActivity.companyName);
        results.add(sr);

        sr = new SearchResult_Current();
        sr.setCompanyName("LAST PRICE");
        sr.setLastPrice(format.format(round(Double.parseDouble(stockActivity.LastPrice),2)));
        results.add(sr);

        sr = new SearchResult_Current();
        sr.setCompanyName("CHANGE");
        Double change = Double.parseDouble(stockActivity.Change);
        if (change > 0) {
            sr.setFlag(getResources().getDrawable(R.drawable.up));
        } else {
            sr.setFlag(getResources().getDrawable(R.drawable.down));
        }

        sr.setLastPrice(round(change, 2) + ("(" + round(Double.parseDouble(stockActivity.ChangePercent), 2) + "%)"));
        results.add(sr);


        sr = new SearchResult_Current();

        sr.setCompanyName("TIMESTAMP");

        sr.setLastPrice(DateConvert(stockActivity.Timestamp));


        results.add(sr);


        sr = new SearchResult_Current();
        sr.setCompanyName("MARKET CAP");
        String tempMarketCap;
        Double billion = (Double.parseDouble(stockActivity.MarketCap)) / 1000000000;
        Double million = (Double.parseDouble(stockActivity.MarketCap)) / 1000000;
        if (billion < 0.05) {
            tempMarketCap = format.format(round(million, 2)) + " Million";
            sr.setLastPrice(tempMarketCap);
        } else {
            tempMarketCap = format.format(round(billion, 2)) + " Billion";
            sr.setLastPrice(tempMarketCap);
        }

        results.add(sr);
        sr = new SearchResult_Current();
        sr.setCompanyName("Volume");
      //  million = (Double.parseDouble(stockActivity.MarketCap)) / 1000000;

        sr.setLastPrice(stockActivity.Volume);
        results.add(sr);
        sr = new SearchResult_Current();
        sr.setCompanyName("CHANGEYTD");
        if (Double.parseDouble(stockActivity.ChangePercentYTD) > 0) {
            sr.setLastPrice(stockActivity.ChangeYTD + "(+" + format.format(round(Double.parseDouble(stockActivity.ChangePercentYTD), 2)) + "%)");
            sr.setFlag(getResources().getDrawable(R.drawable.up));
        } else {
            sr.setLastPrice(stockActivity.ChangeYTD + "(" + format.format(round(Double.parseDouble(stockActivity.ChangePercentYTD), 2)) + "%)");
            sr.setFlag(getResources().getDrawable(R.drawable.down));

        }
        results.add(sr);

        sr = new SearchResult_Current();
        sr.setCompanyName("HIGH");
        sr.setLastPrice("$" + format.format(round(Double.parseDouble(stockActivity.High), 2)));
        results.add(sr);
        sr = new SearchResult_Current();
        sr.setCompanyName("LOW");
        sr.setLastPrice("$" + format.format(round(Double.parseDouble(stockActivity.Low), 2)));
        results.add(sr);
        sr = new SearchResult_Current();
        sr.setCompanyName("Open");
        sr.setLastPrice("$" + format.format(round(Double.parseDouble(stockActivity.Open), 2)));
        results.add(sr);


        return results;
    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }

    private class LoadImage extends AsyncTask<String, String, Bitmap> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
           /* pDialog = new ProgressDialog(getActivity());
            pDialog.setMessage("");
            pDialog.show();*/

        }

        protected Bitmap doInBackground(String... args) {
            try {
                bitmap = BitmapFactory.decodeStream((InputStream) new URL(args[0]).getContent());

            } catch (Exception e) {
                e.printStackTrace();
            }
            return bitmap;
        }

        protected void onPostExecute(Bitmap image) {

            if (image != null) {
                footerImage.setImageBitmap(image);
                // pDialog.dismiss();

            } else {

               /* pDialog.dismiss();
                Toast.makeText(getActivity(), "Image Does Not exist or Network Error", Toast.LENGTH_SHORT).show();
*/
            }
        }
    }

    private class LoadImage1 extends AsyncTask<String, String, Bitmap> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            /*pDialog = new ProgressDialog(getActivity());
            pDialog.setMessage("");
            pDialog.show();*/

        }

        protected Bitmap doInBackground(String... args) {
            try {
                bitmap = BitmapFactory.decodeStream((InputStream) new URL(args[0]).getContent());

            } catch (Exception e) {
                e.printStackTrace();
            }
            return bitmap;
        }

        protected void onPostExecute(Bitmap image) {

            if (image != null) {
                zoomImageClient.setImageBitmap(image);
                new PhotoViewAttacher(zoomImageClient);
                //   pDialog.dismiss();

            } else {

              /*  pDialog.dismiss();
                Toast.makeText(getActivity(), "Image Does Not exist or Network Error", Toast.LENGTH_SHORT).show();
*/
            }
        }
    }

    public String DateConvert(String value) {
        String val = value;
        val = val.replace("UTC", "GMT");
        SimpleDateFormat simpledateformat = new SimpleDateFormat("E MMM dd HH:mm:ss Z yyyy");
        Date stringDate = new Date(0);
        simpledateformat.setTimeZone(TimeZone.getTimeZone("UTC"));
        try {
            stringDate = simpledateformat.parse(val.trim());
        } catch (Exception e) {
            val = "Wed May 05 12:00:00 GMT-07:00 2016";
        }
        String format = "dd MMMM yyyy, HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.US);
//   System.out.print("Format"+sdf.format(stringDate));
        val = sdf.format(stringDate);
        System.out.println("Format " + val);

        return val;

    }


}



