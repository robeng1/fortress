export interface PlotableRespBody {
  key: string;
  value: number;
}

export interface WebAnalyticResponseBody {
  total_page_views: number;
  top_channels: PlotableRespBody[];
  top_pages: PlotableRespBody[];
  top_cities: PlotableRespBody[];
  top_live_pages: PlotableRespBody[];
  top_devices: PlotableRespBody[];
  bounce_rate: number;
  visitors_dataset: PlotableRespBody[];
  unique_visitors: number;
  number_of_visitors: number;
  visit_duration: number;
  live_visitors: number;
  gross_revenue: number;
  net_revenue: number;
  order_volume: number;
  average_order_value: number;
  average_volume_per_order: number;
}
