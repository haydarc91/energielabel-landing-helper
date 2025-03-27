
// This file ensures TypeScript recognizes the globally available Leaflet 'L' namespace
import * as L from 'leaflet';

declare global {
  interface Window {
    L: typeof L;
  }
}
