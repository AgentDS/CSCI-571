package com.example.stockapp;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

public class TradeDialog extends DialogFragment {
    private static final String TAG = "TradeDialog";
    private EditText input_Et;
    private TextView title_Tv;
    private TextView calculate_Tv;
    private TextView balance_Tv;
    private Button buy_btn;
    private Button sell_btn;
    public TradeItem mTradeData;
    private double value;
    public static String ARGUMENTS_B_2_A_KEY = "AAA";
    public static int Trade_Dialog_SELL_CODE = 1000;
    public static int Trade_Dialog_BUY_CODE = 2000;

    public interface OnInputSelected {
        void sendInput(String input);
    }

    public OnInputSelected mOnInputSelected;
    public static final String RESPONSE = "response";

    static TradeDialog newInstance(TradeItem mTradeData) {
        TradeDialog fragment = new TradeDialog();
        Bundle args = new Bundle();
        args.putSerializable("trade_data", mTradeData);
        fragment.setArguments(args);

        return fragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mTradeData = (TradeItem) getArguments().getSerializable("trade_data");
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
//        return super.onCreateView(inflater, container, savedInstanceState);
        View view = inflater.inflate(R.layout.detail_trade_dialog, container, false);
        bindView(view);
        input_Et = view.findViewById(R.id.detail_trade_Et);
        buy_btn = view.findViewById(R.id.detail_trade_buy_btn);
        sell_btn = view.findViewById(R.id.detail_trade_sell_btn);

        buy_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Buy clicked", Toast.LENGTH_SHORT).show();
            }
        });

        sell_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Sell clicked", Toast.LENGTH_SHORT).show();
            }
        });
        return view;
    }

    private void bindView(View view) {
        title_Tv = view.findViewById(R.id.detail_trade_dialog_title);
//        title_Tv.setText("Trade " + mTradeData.getCompanyName() + " shares");

        balance_Tv = view.findViewById(R.id.detail_trade_balance);
//        balance_Tv.setText("$ " + mTradeData.getBalance() + " available to buy" + mTradeData.getTickerName());

        calculate_Tv = view.findViewById(R.id.detail_trade_calculate);
        Double numShare = 0.0;
        Double totalValue = 0.0;
//        calculate_Tv.setText(0 + " x $" + String.format("%.2f", mTradeData.getCurrentPrice()) + "/share= $" + String.format("%.2f", totalValue));
    }
}
