// src/global.d.ts
import 'react';

declare module 'react' {
  interface HTMLAttributes {
    tooltip?: string;
    options?: string;
  }
}