import type { MetadataRoute } from 'next';

const baseUrl = 'https://k-ui-theta.vercel.app';

const components = [
  'button', 'input', 'badge', 'card', 'label', 'separator', 'skeleton',
  'avatar', 'alert', 'accordion', 'textarea', 'checkbox', 'switch',
  'radio-group', 'tabs', 'tooltip', 'dialog', 'select', 'table',
  'pagination', 'sheet', 'calendar', 'breadcrumb', 'carousel',
  'context-menu', 'progress', 'popover', 'toast', 'dropdown-menu', 'slider',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const componentPages = components.map((name) => ({
    url: `${baseUrl}/docs/components/${name}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...componentPages,
  ];
}
