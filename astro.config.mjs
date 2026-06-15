import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeVintage from 'starlight-theme-vintage';

export default defineConfig({
  site: 'https://jajera.github.io',
  base: '/kiro-wsl-aws-setup-guide',
  integrations: [
    starlight({
      title: 'Kiro WSL AWS Setup Guide',
      favicon: '/favicon.svg',
      routeMiddleware: './src/routeData.ts',
      description:
        'Step-by-step guide for setting up a WSL2 + Docker Desktop + Kiro IDE + AWS SSO development environment on Windows.',
      plugins: [starlightThemeVintage()],
      customCss: ['./src/styles/splash-overrides.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/jajera/kiro-wsl-aws-setup-guide',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/jajera/kiro-wsl-aws-setup-guide/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      sidebar: [
        { label: 'Introduction', link: '/' },
        {
          label: 'Windows Host Prerequisites',
          collapsed: false,
          items: [
            { slug: 'windows-host-prerequisites/bios-virtualization' },
            { slug: 'windows-host-prerequisites/enable-wsl2' },
            { slug: 'windows-host-prerequisites/restart-and-configure' },
          ],
        },
        {
          label: 'Docker Desktop',
          collapsed: false,
          items: [
            { slug: 'docker-desktop/download' },
            { slug: 'docker-desktop/install' },
            { slug: 'docker-desktop/first-launch' },
            { slug: 'docker-desktop/verify' },
          ],
        },
        {
          label: 'WSL2 Linux Distribution',
          collapsed: false,
          items: [
            { slug: 'wsl2-linux-distribution/install-ubuntu' },
            { slug: 'wsl2-linux-distribution/user-creation' },
            { slug: 'wsl2-linux-distribution/packages' },
          ],
        },
        {
          label: 'Docker WSL2 Integration',
          collapsed: false,
          items: [
            { slug: 'docker-wsl2-integration/enable-integration' },
            { slug: 'docker-wsl2-integration/verify' },
          ],
        },
        {
          label: 'Kiro IDE Installation',
          collapsed: false,
          items: [
            { slug: 'kiro-ide-installation/download-and-install' },
            { slug: 'kiro-ide-installation/first-launch' },
          ],
        },
        {
          label: 'Kiro IDE Extensions',
          collapsed: false,
          items: [
            { slug: 'kiro-ide-extensions/install-extensions' },
            { slug: 'kiro-ide-extensions/configure-argv' },
          ],
        },
        {
          label: 'Connect Kiro to WSL',
          collapsed: false,
          items: [
            { slug: 'connect-kiro-to-wsl/wsl-targets' },
            { slug: 'connect-kiro-to-wsl/trust-workspace' },
            { slug: 'connect-kiro-to-wsl/re-sign-in' },
          ],
        },
        {
          label: 'GitHub Setup',
          collapsed: false,
          items: [
            { slug: 'github-setup/git-config' },
            { slug: 'github-setup/ssh-key' },
            { slug: 'github-setup/add-key-to-github' },
          ],
        },
        {
          label: 'AWS Setup',
          collapsed: false,
          items: [
            { slug: 'aws-setup/install-cli' },
            { slug: 'aws-setup/configure-sso' },
            { slug: 'aws-setup/login-and-verify' },
          ],
        },
        {
          label: 'Kiro Workspace Configuration',
          collapsed: false,
          items: [
            { slug: 'kiro-workspace-configuration/steering-files' },
            { slug: 'kiro-workspace-configuration/mcp-servers' },
            { slug: 'kiro-workspace-configuration/workspace-settings' },
          ],
        },
        {
          label: 'Final Verification',
          collapsed: false,
          items: [
            { slug: 'final-verification/checklist' },
            { slug: 'final-verification/troubleshooting' },
          ],
        },
        {
          label: 'Next Steps',
          collapsed: false,
          items: [{ slug: 'next-steps/what-to-do-next' }, { slug: 'next-steps/quick-reference' }],
        },
      ],
    }),
  ],
});
