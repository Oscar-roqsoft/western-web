export default defineNuxtRouteMiddleware((to, from) => {
    // const token = useCookie('auth_token').value;
    // if (!token && to.path !== '/login') {
    //   return navigateTo('/login');
    // }
    // if (!token && to.path !== '/register') {
    //   return navigateTo('/login');
    // }
    const pinia = useStore();
  
    // User already logged in
    if (
      pinia.state.isAuthenticated &&
      pinia.state.user
    ) {
      return navigateTo("/dashboard");
    }
});
  