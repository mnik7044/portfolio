import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nikhil Mishra — Backend Engineer',
    short_name: 'Nikhil Mishra',
    start_url: '/',
    display: 'browser',
    background_color: '#12110f',
    theme_color: '#12110f',
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
