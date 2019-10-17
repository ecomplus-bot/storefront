const isCheckout = window.location.pathname.startsWith('/app/')
const isMobile = window.screen.width < 768

const loadWidget = (pkg, runImport) => {
  const widget = window._widgets[pkg]
  if (widget) {
    const { active, options, desktopOnly, enableCheckout, disablePages } = widget
    if (
      active &&
      (!desktopOnly || !isMobile) &&
      (isCheckout ? enableCheckout : !disablePages)
    ) {
      runImport().then(exp => {
        if (typeof exp.default === 'function') {
          exp.default(options)
        }
        console.log(`Widget loaded: ${pkg}`)
      })
    }
  }
}

if (!isCheckout) {
  loadWidget('@ecomplus/widget-user', () => import('@ecomplus/widget-user'))
  loadWidget('@ecomplus/widget-product-card', () => import('@ecomplus/widget-product-card'))
  loadWidget('@ecomplus/widget-search', () => import('@ecomplus/widget-search'))
  loadWidget('@ecomplus/widget-minicart', () => import('@ecomplus/widget-minicart'))

  const { resource } = document.body.dataset
  if (resource && resource.startsWith('product')) {
    loadWidget('@ecomplus/widget-product', () => import('@ecomplus/widget-product'))
  } else if (document.getElementById('search')) {
    loadWidget('@ecomplus/widget-search-engine', () => import('@ecomplus/widget-search-engine'))
  }
}