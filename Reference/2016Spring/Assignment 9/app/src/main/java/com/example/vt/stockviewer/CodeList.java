package com.example.vt.stockviewer;

/**
 * Created by vt on 5/5/16.
 */

public class CodeList {
    String Name;
    String Symbol;
    String Exchange;

    CodeList(){}

    CodeList(String name, String sym,String exch){
        this.Name=name;
        this.Symbol=sym;
        this.Exchange=exch;
    }

    public String toString(){return this.Symbol;}
    public String getTitle(){
        return this.Name;
    }
    public String getDetail(){
        return this.Name+" ("+this.Exchange+")";
    }
    public String getDetail2(){
        return this.Symbol+" " +this.Name+" "+this.Exchange+" ";
    }
    public String getSymbol(){
        return this.Symbol;
    }
    public String getExchange(){
        return this.Exchange;
    }

}
