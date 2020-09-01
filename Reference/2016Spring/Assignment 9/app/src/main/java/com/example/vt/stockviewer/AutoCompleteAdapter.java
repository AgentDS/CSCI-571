package com.example.vt.stockviewer;

/**
 * Created by vt on 5/5/16.
 */


        import android.content.Context;
        import android.view.LayoutInflater;
        import android.view.View;
        import android.view.ViewGroup;
        import android.widget.ArrayAdapter;
        import android.widget.Filter;
        import android.widget.TextView;

        import java.util.ArrayList;


public class AutoCompleteAdapter extends ArrayAdapter<CodeList> {

    final String TAG = "AutoCompleteAdapter.java";


    Context mContext;
    int layoutResourceId;
    CodeList data[] = null;

    public AutoCompleteAdapter(Context mContext, int layoutResourceId, CodeList[] data) {

        super(mContext, layoutResourceId, data);

        this.layoutResourceId = layoutResourceId;
        this.mContext = mContext;
        this.data = data;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        try{

            if(convertView==null){
                // inflate the layout
                LayoutInflater inflater = ((MainActivity) mContext).getLayoutInflater();
                convertView = inflater.inflate(layoutResourceId, parent, false);
            }

            // object item based on the position
            CodeList objectItem = data[position];

            // get the TextView and then set the text (item name) and tag (item ID) values
            TextView textViewItem = (TextView) convertView.findViewById(R.id.textViewItem1);
            textViewItem.setText(objectItem.getSymbol());
            TextView textViewItem1 = (TextView) convertView.findViewById(R.id.textViewItem2);
            textViewItem1.setText(objectItem.getDetail());

        } catch (NullPointerException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return convertView;

    }

    public Filter getFilter() {

        return new Filter() {
            @Override
            protected void publishResults(CharSequence constraint,
                                          FilterResults results) {

                if (results.count > 0) {
                    notifyDataSetChanged();
                } else {
                    notifyDataSetInvalidated();
                }
            }

            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                ArrayList<String> result = new ArrayList<String>();

                for(int i=0;i<data.length;i++) {
                    result.add(data[i].getDetail2());
                    System.out.println("filtering"+data[i].getDetail2());
                }FilterResults r = new FilterResults();
                r.values = result;
                r.count = result.size();
                return r;
            }
        };
    }
}