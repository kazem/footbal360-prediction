/* ************ Competition ************ */
export interface Competition {
    results: Result[];
}

export interface Result {
    id:                        string;
    container_id:              string;
    priority:                  number;
    title:                     string;
    status:                    string;
    banner:                    string;
    logo:                      string;
    thumbnail:                 string;
    leaderboard_is_valid:      boolean;
    has_multiple_competitions: boolean;
    participant_counts:        number;
    current_week:              CurrentWeek;
    stat:                      null;
    is_live:                   boolean;
    leaderboard_updated_at:    number | null;
}

export interface CurrentWeek {
    id:                     string;
    stage:                  number;
    title:                  string;
    starts_at:              number;
    ends_at:                number;
    has_leaderboard:        boolean;
    leaderboard_is_valid:   boolean;
    competition:            string;
    participant_counts:     number;
    is_live:                boolean;
    leaderboard_updated_at: number | null;
    is_active:              boolean;
}
/* ************ Competition ************ */

/* ************ Match ************ */
export interface Match {
    id:                       string;
    week:                     string;
    competition:              string;
    score_calculation_status: ScoreCalculationStatus;
    week_title:               WeekTitle;
    is_finished:              boolean;
    is_closed:                boolean;
    match:                    MatchClass;
}

export interface MatchClass {
    id:                       string;
    home_team:                Team;
    away_team:                Team;
    home_score:               null;
    away_score:               null;
    holds_at:                 number;
    home_ordinary_time_score: number;
    away_ordinary_time_score: number;
    is_postponed:             boolean;
    is_finished:              boolean;
    status:                   Status;
    minute:                   null;
    slug:                     string;
    home_penalty_score:       null;
    away_penalty_score:       null;
    round_type:               RoundType;
    spectators:               null;
    to_be_decided:            boolean;
    live_detail:              null;
    broadcast_channel:        null;
    competition_trend_stage:  CompetitionTrendStage;
    competition_trend:        CompetitionTrend;
    has_standing_table:       boolean;
    has_knockout_stage:       boolean;
    has_predictable_match:    boolean;
}

export interface Team {
    id:            string;
    slug:          string;
    title:         string;
    english_name:  string;
    logo:          string;
    thumbnail:     string;
    is_active:     boolean;
    full_title:    string;
    is_national:   boolean;
    country:       Country;
    to_be_decided: boolean;
}

export interface Country {
    name:         Name;
    english_name: EnglishName;
    flag_1x1:     string;
    flag_4x3:     string;
}

export enum EnglishName {
    England = "England",
    France = "France",
    Italy = "Italy",
    Spain = "Spain",
}

export enum Name {
    اسپانیا = "اسپانیا",
    انگلیس = "انگلیس",
    ایتالیا = "ایتالیا",
    فرانسه = "فرانسه",
}

export interface CompetitionTrend {
    id:                   string;
    title:                string;
    english_name:         string;
    competition:          string;
    slug:                 null;
    logo:                 string;
    thumbnail:            string;
    seo_slug:             string;
    has_live_match:       boolean;
    standing_last_update: number;
}

export interface CompetitionTrendStage {
    id:             string;
    name:           string;
    english_name:   string;
    stage_type:     StageType;
    start_time:     number;
    end_time:       number;
    order:          null;
    is_default:     boolean;
    has_live_match: boolean;
}

export enum StageType {
    Group = "GROUP",
}

export interface RoundType {
    name:         string;
    value:        number;
    is_knockout:  boolean;
    display_name: string;
}

export interface Status {
    status_id:   number;
    title:       Title;
    status_type: StatusType;
}

export enum StatusType {
    Notstarted = "notstarted",
}

export enum Title {
    آغازنشده = "آغاز نشده",
}

export enum ScoreCalculationStatus {
    U = "U",
}

export enum WeekTitle {
    دور۱ = "دور ۱",
}

/* ************ Match ************ */

/* ************ CommonPrediction ************ */
export interface CommonPrediction {
    match_id:            string;
    total_predictions:   number;
    correct_predictions: null;
    home_win:            number;
    away_win:            number;
    draw_count:          number;
    common_predictions:  CommonPredictionElement[];
}

export interface CommonPredictionElement {
    home_score:        number;
    away_score:        number;
    predictions_count: number;
    is_final_result:   boolean;
}
/* ************ CommonPrediction ************ */

export interface SubmitPrediction {
    predictable_match: string;
    home_score: number;
    away_score: number;
}


