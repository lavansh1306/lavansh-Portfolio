import type { Plugin } from 'vite';

export function blockInjectedContent(): Plugin {
  return {
    name: 'block-injected-content',
    transformIndexHtml(html) {
      // Remove any injected content
      return html.replace(/<script[^>]*lovable[^>]*>.*?<\/script>/g, '')
                .replace(/<link[^>]*lovable[^>]*>/g, '')
                .replace(/<!-- Lovable Tagger -->.*?<!-- End Lovable Tagger -->/gs, '');
    },
  };
}
