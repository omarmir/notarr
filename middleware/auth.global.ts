export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path !== '/login') {
    const isLoggedId = localStorage.getItem('isLoggedIn')
    if (isLoggedId !== 'true') {
      return navigateTo('/login')
    }
  }
})
