package com.example.vt.stockviewer;

/**
 * Created by vt on 5/1/16.
 */

        import android.content.Intent;
        import android.graphics.Paint;
        import android.inputmethodservice.Keyboard;
        import android.net.Uri;
        import android.os.AsyncTask;
        import android.os.Bundle;
        import android.support.v4.app.Fragment;
        import android.support.v4.app.ListFragment;
        import android.text.Html;
        import android.text.SpannableString;
        import android.text.method.LinkMovementMethod;
        import android.text.style.UnderlineSpan;
        import android.util.Log;
        import android.view.LayoutInflater;
        import android.view.View;
        import android.view.ViewGroup;
        import android.widget.AdapterView;
        import android.widget.ArrayAdapter;
        import android.widget.ListView;
        import android.widget.TextView;
        import android.widget.Toast;

        import com.google.gson.Gson;
        import com.google.gson.GsonBuilder;
        import com.google.gson.JsonObject;
        import com.google.gson.JsonParser;

        import junit.framework.TestCase;

        import org.apache.http.ParseException;
        import org.apache.http.client.HttpClient;
        import org.apache.http.client.ResponseHandler;
        import org.apache.http.client.methods.HttpGet;
        import org.apache.http.impl.client.BasicResponseHandler;
        import org.apache.http.impl.client.DefaultHttpClient;
        import org.apache.http.protocol.HTTP;
        import org.apache.http.util.EntityUtils;
        import org.json.JSONArray;
        import org.json.JSONException;
        import org.json.JSONObject;

        import java.text.SimpleDateFormat;
        import java.util.ArrayList;
        import java.util.Calendar;
        import java.util.Date;


public class News extends Fragment {
    String data = "";
    ArrayList<SearchResults> results;
    TextView txtUrlObject;
    TextView  objTitle;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {


        View rootView = inflater.inflate(R.layout.news, container,
                false);
         new getNewsFeed().execute(stockActivity.companyName);
        ArrayList<SearchResults> searchResults = GetSearchResults();

        final ListView lv = (ListView) rootView.findViewById(R.id.srListView);
        ViewGroup header_News = (ViewGroup) inflater.inflate(R.layout.header_news, lv,
                false);
        lv.addHeaderView(header_News, null, false);
        lv.setAdapter(new MyCustomBaseAdapter(getContext(), searchResults));
        View rootView1 = inflater.inflate(R.layout.custom_row_view, container,
                false);
       /* objTitle =(TextView) rootView1.findViewById(R.id.Titleitle);
        objTitle.setPaintFlags(txtUrlObject.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);
*/

        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> a, View v, int position, long id) {
                Object o = lv.getItemAtPosition(position);
                SearchResults fullObject = (SearchResults) o;
                 Toast.makeText(getActivity(), "You have chosen: " + " " + fullObject.getUrl(), Toast.LENGTH_LONG).show();
                Uri uri = Uri.parse(fullObject.getUrl());
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
            }
        });

        return rootView;
    }

    private ArrayList<SearchResults> GetSearchResults() {
        results  = new ArrayList<SearchResults>();










        return results;
    }


    class getNewsFeed extends AsyncTask<String, String, String> {

        protected String doInBackground(String... key) {
            String inputValue = key[0];
            inputValue = inputValue.trim();
            inputValue = inputValue.replaceAll("[-+^\"]*", "");

            try {
                HttpClient hClient = new DefaultHttpClient();
                HttpGet hGet = new HttpGet("http://v1-csci517-hw8.appspot.com/index.php?feedInput=" + inputValue);
                ResponseHandler<String> rHandler = new BasicResponseHandler();
                data = hClient.execute(hGet, rHandler);
                SearchResults sr1 = new SearchResults();
                JSONObject wrapperObject  = new JSONObject(data);
                JSONObject dataObject = wrapperObject.getJSONObject("d");
                JSONArray  dataArray   = (dataObject.getJSONArray("results"));
                for (int i = 0; i < dataArray.length(); i++) {
                    sr1 = new SearchResults();
                    String Url  =dataArray.getJSONObject(i).getString("Url");
                    String Title   =dataArray.getJSONObject(i).getString("Title");
                    String description =  dataArray.getJSONObject(i).getString("Description");
                    String Publisher   = dataArray.getJSONObject(i).getString("Source");
                    String Date     = dataArray.getJSONObject(i).getString("Date");


                    String udata=Title;
                    SpannableString content = new SpannableString(udata);
                    content.setSpan(new UnderlineSpan(), 0, udata.length(), 0);


                     sr1.setUrl(Url);
                      sr1.setTitle(Html.fromHtml(Title).toString());
                    sr1.setDescription(Html.fromHtml(description).toString());
                    sr1.setPublisher(Html.fromHtml(Publisher).toString());
                    sr1.setDate(Html.fromHtml(Date).toString());
                    results.add(sr1);

                }


            } catch (Exception e) {
                Log.w("Error", e.getMessage());
            }


            return null;
        }


    }
    private String convertDate(String date) {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            Date d = format.parse(date);
            SimpleDateFormat serverFormat = new SimpleDateFormat("dd MMM yyyy hh:mm:ss");
            return serverFormat.format(d);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }


}

