// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { h } from 'vue'



export const asyncRequest = async (url, options, json = true) => {
    const pinia = useStore();
   return fetch(url, options)
   .then(response => {
     const statusCode = response.status;
     if(statusCode == 401){
       pinia.state.isAuthenticated = false
      navigateTo("/");
       return;
     }
     return json ? response.json() : response.text();
   })
   .then((data) => {
     return data;
   })
   .catch((error) => {
     return error;
   });
};

export const timeAgo = (dateString) => {
  const now = new Date()
  const past = new Date(dateString)

  const diffInSeconds = Math.floor((now - past) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) return "Yesterday"

  return `${diffInDays}d ago`
}


export const isEmptyObjects = (obj) => {
  return obj && Object.keys(obj).length === 0;;
};


export const addCommasToInteger =(number)=>{
  // Convert number to string and split into integer and decimal parts
  const [integerPart, decimalPart] = number.toString().split('.');
  
  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Return with decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}




// composables/useSync.js
export const setupAutoSync = () => {
  const syncOnOnline = async () => {
    if (navigator.onLine) {
      await syncWithServer();
    }
  };

  window.addEventListener('online', syncOnOnline);
  syncOnOnline(); // Run on setup if online

  return () => {
    window.removeEventListener('online', syncOnOnline);
  };
};

// In a component or plugin
// setupAutoSync();


export function filterByKey(products, key) {
  // if (!products || typeof products !== "object") {
  //   console.error("filterByKey expects an object but received:", products);
  //   return [];
  // }

  // Convert object values to an array and filter out null/undefined items
  const productsArray = Object.values(products).filter(item => item && typeof item === "object");

  const seenKeys = new Set();
  return productsArray.filter(product => {
    if (!product[key]) return true; // Keep items without the key
    if (seenKeys.has(product[key])) return false;
    seenKeys.add(product[key]);
    return true;
  });
}


export function addMinutesToNow(minutes) {
  const now = new Date();
  const result = new Date(now.getTime() + minutes * 60000);
  return result;
}


export function filterLowQuantityItems(items, threshold = 11) {
  return items.filter(item => item.quantity < threshold);
}



export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // 11th to 20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}


export function formatNumberWithCommas(number) {
  // Split number into integer and decimal parts
  const parts = number.toString().split('.');
  // Add commas to integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Join parts back together
  return parts.join('.');
}

export function formatNumberToShortForm(number) {
  if (typeof number !== 'number') return 'Invalid input';
  
  const absNumber = Math.abs(number);
  
  if (absNumber >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + 'M';
  } else if (absNumber >= 1_000) {
    return (number / 1_000).toFixed(1) + 'K';
  }
  return number.toString();
}

// Combined function to handle both comma formatting and short form
export function formatNumber(number, useShortForm = true) {
  if (typeof number !== 'number') return 'Invalid input';
  
  if (useShortForm) {
    return formatNumberToShortForm(number);
  }
  return formatNumberWithCommas(number);
}

