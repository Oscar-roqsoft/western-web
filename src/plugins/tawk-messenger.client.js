// plugins/tawk-messenger.client.js
import TawkMessengerVue from '@tawk.to/tawk-messenger-vue-3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TawkMessengerVue, {
    propertyId: 'YOUR_PROPERTY_ID', // Replace with your Property ID
    widgetId: 'YOUR_WIDGET_ID',     // Replace with your Widget ID
  });
});