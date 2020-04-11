export class Metric {
  name: string;
  description: string;
  baseUnit: string;
  measurements: Measurements[];
  availableTags: AvailableTags[];
}

class Measurements {
  statistic: string;
  value: number;
}

class AvailableTags {
  tag: string;
  values: string[];
}
