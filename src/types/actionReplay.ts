export interface ARCode {
  id: string;
  title: string;
  description: string;
  code: string;
  warning: string | null;
  category: string;
}

export interface ActionReplayDoc {
  gameTitle: string;
  gameId: string;
  authorRecommendation: string;
  description: string;
  codes: ARCode[];
}
