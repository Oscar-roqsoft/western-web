export default defineNuxtRouteMiddleware((to, from) => {
   
    const pinia = useStore();
  
    // User already logged in
    if (
      pinia.state.isAuthenticated &&
      pinia.state.user
    ) {
      return navigateTo("/dashboard");
    }
});
  