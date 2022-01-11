import { Buffer } from 'buffer';

if (window.global === undefined) {
  window.global = window;
}

if (window.Buffer === undefined) {
  window.Buffer = Buffer;
}
