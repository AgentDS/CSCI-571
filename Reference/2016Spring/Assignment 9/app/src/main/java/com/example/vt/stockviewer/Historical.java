package com.example.vt.stockviewer;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link //Historical.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link Historical#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Historical extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String NAME = "NAME";
    private static final String SYMBOL = "SYMBOL";
    WebView StockImg;
    // TODO: Rename and change types of parameters
    private String mName;
    private String mSymbol;

    //private OnFragmentInteractionListener mListener;

    public Historical() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Historical.
     */
    // TODO: Rename and change types and number of parameters
    public static Historical newInstance(String param1, String param2) {
        Historical fragment = new Historical();
        Bundle args = new Bundle();
        args.putString(NAME, param1);
        args.putString(SYMBOL, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

            mName = stockActivity.Name;
            mSymbol = stockActivity.companyName;
        }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.historical,
                container, false);
        try {
            StockImg = (WebView) view.findViewById(R.id.webview);
            //  StockImg.getSettings().setPluginsEnabled(true);
            StockImg.getSettings().setBuiltInZoomControls(false);
            StockImg.getSettings().setSupportZoom(false);
            StockImg.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
            StockImg.getSettings().setAllowFileAccess(true);
            StockImg.getSettings().setDomStorageEnabled(true);
            StockImg.loadUrl("file:///android_asset/highchart.html?s=" + mSymbol);
            //StockImg.addJavascriptInterface(new JavaScriptInterface(this.getContext()), "Android");
            //http://www-scf.usc.edu/~adsule/HW8/Markit.php
            StockImg.getSettings().setJavaScriptEnabled(true);
            StockImg.setWebViewClient(new WebViewClient() {
                public void onPageFinished(WebView view, String url) {
                    StockImg.loadUrl("javascript:init('" + mSymbol + "')");
                }
            });
        }catch(Exception e){System.out.println("Error loading html"+e.getMessage());}
        Bundle bundle = getArguments();
        return view;

        //return inflater.inflate(R.layout.fragment_historical_stock, container, false);
    }
/*
    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    /*
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        public void onHistoricalFragmentInteraction(String string);
        void onFragmentInteraction(Uri uri);
    }
    
    */


    public class JavaScriptInterface {
        Context mContext;

        /** Instantiate the interface and set the context */
        JavaScriptInterface(Context c) {
            mContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
        }
    }
}
