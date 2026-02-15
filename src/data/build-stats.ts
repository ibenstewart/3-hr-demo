export const buildStats = {
  headline: [
    { label: 'Lines of Code', value: 8341, suffix: '' },
    { label: 'Components', value: 20, suffix: '' },
    { label: 'Products', value: 7, suffix: '' },
    { label: 'Build Time', value: 3, suffix: 'hrs' },
  ],

  timeline: [
    { time: '10:52', label: '5 demos built in one shot', type: 'feat' as const },
    { time: '10:55', label: 'Backpack design compliance', type: 'fix' as const },
    { time: '15:22', label: 'Business Travel Agent (9-state machine)', type: 'feat' as const },
    { time: '15:50', label: 'Polish pass — images, timers, copy', type: 'fix' as const },
    { time: '16:09', label: 'Stakeholder presentation polish', type: 'feat' as const },
    { time: '16:32', label: 'Marketing Planner shipped', type: 'feat' as const },
  ],

  codeBreakdown: [
    { category: 'Mock Data', lines: 3278, color: 'bg-eco' },
    { category: 'Pages', lines: 2701, color: 'bg-sky-blue' },
    { category: 'Biz Components', lines: 1737, color: 'bg-coral' },
    { category: 'Shared Components', lines: 366, color: 'bg-berry' },
    { category: 'Infrastructure', lines: 259, color: 'bg-haiti' },
  ],

  techStack: [
    { name: 'React 19', role: 'UI framework' },
    { name: 'TypeScript', role: 'Type safety' },
    { name: 'Vite 7', role: 'Build tool' },
    { name: 'Tailwind CSS 4', role: 'Styling' },
    { name: 'Recharts', role: 'Data viz' },
    { name: 'Lucide React', role: 'Icons' },
    { name: 'React Router 7', role: 'Routing' },
    { name: 'Claude Code', role: 'AI pair programmer' },
  ],

  demoCapabilities: [
    {
      demo: 'AI Trip Planner',
      route: '/trip-planner',
      color: 'bg-sky-blue',
      capabilities: ['Conversational UI', 'Day-by-day state management', 'Inline editing with AI simulation'],
    },
    {
      demo: 'In-Trip Companion',
      route: '/companion',
      color: 'bg-coral',
      capabilities: ['Real-time chat interface', 'Contextual AI responses', 'Timeline with status badges'],
    },
    {
      demo: 'Smart Ancillaries',
      route: '/ancillaries',
      color: 'bg-eco',
      capabilities: ['Dynamic pricing engine', 'Bundle discount logic', 'Progress tracking'],
    },
    {
      demo: 'Price Intelligence',
      route: '/prices',
      color: 'bg-berry',
      capabilities: ['Recharts data visualisation', 'Countdown timers', 'Modal overlays'],
    },
    {
      demo: 'Tours & Experiences',
      route: '/experiences',
      color: 'bg-haiti',
      capabilities: ['Category filtering + sorting', 'Nested dynamic routing', 'Price comparison tables'],
    },
    {
      demo: 'Business Travel',
      route: '/business-travel',
      color: 'bg-sky-blue',
      capabilities: ['9-state machine', 'Multi-leg booking flow', 'Slack approval simulation'],
    },
    {
      demo: 'Marketing Planner',
      route: '/marketing',
      color: 'bg-coral',
      capabilities: ['AI generation animation', 'Tabbed section navigation', 'Expandable tactic cards'],
    },
  ],
}
