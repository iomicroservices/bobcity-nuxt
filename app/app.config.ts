export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'slate'
    },
    button: {
      defaultVariants: {
        size: 'lg'
      }
    },
    // Desktop nav has many items; use xl so the header doesn't force page width
    header: {
      slots: {
        left: 'xl:flex-1 flex items-center gap-1.5',
        center: 'hidden xl:flex min-w-0',
        right: 'flex items-center justify-end xl:flex-1 gap-1.5',
        toggle: 'xl:hidden',
        content: 'xl:hidden',
        overlay: 'xl:hidden'
      }
    },
    footerColumns: {
      slots: {
        root: 'xl:grid xl:grid-cols-3 xl:gap-8 min-w-0',
        left: 'mb-10 xl:mb-0 min-w-0',
        center: 'flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-2 min-w-0'
      }
    },
    pageCard: {
      slots: {
        root: 'transition-all duration-200',
        title: 'font-display'
      }
    },
    pageHero: {
      slots: {
        title: 'font-display',
        headline: 'text-primary'
      },
      variants: {
        orientation: {
          horizontal: {
            // Keep Nuxt UI horizontal classes + allow columns to shrink below media intrinsic size
            container: 'lg:grid-cols-2 lg:items-center [&>*]:min-w-0'
          }
        }
      }
    },
    pageSection: {
      slots: {
        title: 'font-display',
        headline: 'text-primary'
      }
    },
    pageCTA: {
      slots: {
        title: 'font-display'
      }
    },
    pageHeader: {
      slots: {
        title: 'font-display'
      }
    }
  }
})
