import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const gitConfig = {
  user: 'kysclient',
  repo: 'k-ui',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-1">
          <Image
            src="/krds_logo.png"
            alt="K-UI"
            width={24}
            height={24}
            className="dark:invert"
          />
          <span className="font-semibold">K-UI</span>
        </span>
      ),
    },
    links: [
      { text: 'Docs', url: '/docs' },
      { text: 'Templates', url: '/templates' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
