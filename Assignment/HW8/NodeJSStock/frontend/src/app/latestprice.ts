export interface Latestprice {
  ticker: string;
  timestamp: string;
  open : number;
  high: number;
  mid: number | null;
  low: number;
  last:number;
  volume: number;
  prevClose: number;
  tngoLast: number;
  askSize: number | null;
  askPrice: number | null;
  lastSize: number | null;
  bidSize: number | null;
  bidPrice: number | null;
  lastSaleTimestamp: string;
  quoteTimestamp: string;
}
