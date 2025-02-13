enum OPERATOR {
  EQUAL,
  NOT_EQUAL,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  IN_RANGE,
  NOT_IN_RANGE,
  CONTAIN,
  NOT_CONTAIN,
  IN,
  NOT_IN,
  STARTS_WITH,
  ENDS_WITH,
  ANY,
  ALL,
  AFTER,
  BEFORE,
  ON_OR_AFTER,
  ON_OR_BEFORE,
  NONE,
  TOP,
}

export interface InsightsParameters {
  action_attribution_windows?: Array<
    | "1d_view"
    | "7d_view"
    | "28d_view"
    | "1d_click"
    | "7d_click"
    | "28d_click"
    | "1d_ev"
    | "dda"
    | "default"
    | "7d_view_first_conversion"
    | "28d_view_first_conversion"
    | "7d_view_all_conversions"
    | "28d_view_all_conversions"
    | "skan_view"
    | "skan_click"
  >;
  action_breakdowns?: Array<
    | "action_device"
    | "conversion_destination"
    | "matched_persona_id"
    | "matched_persona_name"
    | "signal_source_bucket"
    | "standard_event_content_type"
    | "action_canvas_component_name"
    | "action_carousel_card_id"
    | "action_carousel_card_name"
    | "action_destination"
    | "action_reaction"
    | "action_target_id"
    | "action_type"
    | "action_video_sound"
    | "action_video_type"
  >;
  action_report_time?: "impression" | "conversion" | "mixed";
  breakdowns?: Array<
    | "ad_format_asset"
    | "age"
    | "app_id"
    | "device_platform"
    | "standard_event_content_type"
    | "marketing_messages_btn_name"
    | "impression_view_time_advertiser_hour_v2"
  >;
  date_preset?:
    | "today"
    | "yesterday"
    | "this_month"
    | "last_month"
    | "this_quarter"
    | "maximum"
    | "data_maximum"
    | "last_3d"
    | "last_7d"
    | "last_14d"
    | "last_28d"
    | "last_30d"
    | "last_90d"
    | "last_week_mon_sun"
    | "last_week_sun_sat"
    | "last_quarter"
    | "last_year"
    | "this_week_mon_today"
    | "this_week_sun_today"
    | "this_year";
  default_summary?: boolean;
  export_columns?: string[];
  export_format?: "xls" | "csv";
  export_name?: string;
  fields?: string[];
  filtering?: {
    field: string;
    operator: OPERATOR;
    value: string;
  };
  level?: "ad" | "adset" | "campaign" | "account";
  product_id_limit?: number;
  sort?: string[];
  summary?: string[];
  summary_action_breakdowns?: Array<
    | "action_device"
    | "conversion_destination"
    | "matched_persona_id"
    | "matched_persona_name"
    | "signal_source_bucket"
    | "standard_event_content_type"
    | "action_canvas_component_name"
    | "action_carousel_card_id"
    | "action_carousel_card_name"
    | "action_destination"
    | "action_reaction"
    | "action_target_id"
    | "action_type"
    | "action_video_sound"
    | "action_video_type"
  >;
  time_increment?: "monthly" | "all_days" | number;
  time_range?: { since: string; until: string };
  time_ranges?: Array<{ since: string; until: string }>;
  use_account_attribution_setting?: boolean;
  use_unified_attribution_setting?: boolean;
}
