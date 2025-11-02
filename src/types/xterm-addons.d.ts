// Type declarations for xterm addons used by the project.
// These are minimal 'any' declarations to avoid TypeScript errors
// before the actual packages are installed. They can be replaced
// with proper types if desired.

declare module 'xterm-addon-fit' {
  export class FitAddon {
    fit(): void;
    // match ITerminalAddon shape
    activate?(terminal?: any): void;
    dispose?(): void;
  }
  export default FitAddon;
}

declare module 'xterm-addon-web-links' {
  export class WebLinksAddon {
    constructor();
    activate?(terminal?: any): void;
    dispose?(): void;
  }
  export default WebLinksAddon;
}

declare module 'xterm-addon-search' {
  export class SearchAddon {
    constructor();
    activate?(terminal?: any): void;
    dispose?(): void;
  }
  export default SearchAddon;
}

declare module 'xterm-addon-webgl' {
  // different versions export different names — accept any
  const _default: any;
  export const WebglAddon: any;
  export const WebGLAddon: any;
  export default _default;
}
