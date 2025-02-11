export default defineNuxtRouteMiddleware((to, _from) => {
  console.log(to.path)
  if (to.path !== '/login') {
    const isLoggedId = localStorage.getItem('isLoggedIn')
    if (isLoggedId !== 'true') {
      return navigateTo('/login')
    }
  }
})
