export interface Data {
  timestamp: number;
  production: number;
  consumption: number;
  frequency: number;
  system_balance: number;
  ac_balance: number;
  production_renewable: number;
  solar_energy_production: number | null;
}
