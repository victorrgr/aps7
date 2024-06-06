export class AqiResponse {
  public aqi: number;
  public idx: number;
  public attributions: AqiAttribution[];
  public city: AqiCity;
  public dominentpol: string;
  public iaqi: AqiIAQI;
  public time: AqiTime;
  public forecast: AqiForecast;
}

export class AqiAttribution {
  public url: string;
  public name: string;
  public logo: string;
}

export class AqiCity {
  public geo: number[];
  public name: string;
  public url: string;
  public location: string;
}

export class AqiIAQI {
  public dew: AqiValue;
  public h: AqiValue;
  public no2: AqiValue;
  public o3: AqiValue;
  public p: AqiValue;
  public pm10: AqiValue;
  public t: AqiValue;
  public w: AqiValue;
}

export class AqiValue {
  public v: number;
}

export class AqiTime {
  public s: string;
  public tz: string;
  public v: number;
  public iso: string;
}

export class AqiForecast {
  public daily: AqiDaily;
}

export class AqiDaily {
  public o3: AqiForecastValue[];
  public pm10: AqiForecastValue[];
  public pm25: AqiForecastValue[];
  public uvi: AqiForecastValue[];
}

export class AqiForecastValue {
  public avg: number;
  public day: string;
  public max: number;
  public min: number;
}
