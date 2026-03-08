<template>
    <div class="bg-[#f4f4f7] py-4">
      <div class="container mx-auto px-6 lg:px-16">
        <div class="md:max-w-[440px]">
          <span class="text-[#F17216] border-l-2 text-sm border-[#F17216] px-1.5">Testimonial</span>
          <h2 class="text-[34px] md:text-[44px] font-bold mb-2.5 tracking-wide">
            What Our Clients Say
          </h2>
        </div>
      </div>
  
      <div class="bg-[url('/test/bg.png')]  bg-cover bg-center pb-20 pt-6">
        <div class="container mx-auto px-6 lg:px-16 md:hidden">
          <n-carousel
            autoplay
            show-arrow
            :slides-per-view="1"
            draggable
            loop
            :space-between="20"
            style="max-width: 100%;"
          >
            <n-carousel-item v-for="(item, index) in testimonial" :key="index"
            style="height: 400px; background: #e5e7eb; padding: 16px; border-radius: 10px;">
              <div >
                <svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M15 0H1C.45 0 0 .45 0 1v9.96c0 .55.45 1 1 1h2v3.34c0 .45.54.67.85.35l3.69-3.69H15c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1m-4.52 2.28L8.52 6h1.51c.24 0 .25.16.01.39l-4.13 3.89c-.36.32-.44.08-.34-.21L7 6H5.69c-.16 0-.23-.16-.17-.32l1.46-3.4c.07-.15.25-.28.41-.28h2.93c.15 0 .22.13.16.28"/>
                </svg>
                <p class="text-[12px] text-justify mt-4">{{ item.body }}</p>
                <div class="flex items-center mt-6 gap-x-4">
                  <n-avatar round size="medium" src="/profile.webp" />
                  <span>
                    <span class="font-semibold">{{ item.name }}</span><br />{{ item.location }}.
                  </span>
                </div>
              </div>
            </n-carousel-item>
          </n-carousel>
        </div>
        <div class="container mx-auto px-6 lg:px-16 hidden md:block">
          <n-carousel
            autoplay
            show-arrow
            :slides-per-view="3"
            draggable
            loop
            :space-between="20"
            style="max-width: 100%;"
          >
            <n-carousel-item v-for="(item, index) in testimonial" :key="index"
            style="height: 400px; background: #e5e7eb; padding: 16px; border-radius: 10px;">
              <div>
                <svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M15 0H1C.45 0 0 .45 0 1v9.96c0 .55.45 1 1 1h2v3.34c0 .45.54.67.85.35l3.69-3.69H15c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1m-4.52 2.28L8.52 6h1.51c.24 0 .25.16.01.39l-4.13 3.89c-.36.32-.44.08-.34-.21L7 6H5.69c-.16 0-.23-.16-.17-.32l1.46-3.4c.07-.15.25-.28.41-.28h2.93c.15 0 .22.13.16.28"/>
                </svg>
                <p class="text-[12px] text-justify mt-4">{{ item.body }}</p>
                <div class="flex items-center mt-6 gap-x-4">
                  <n-avatar round size="medium" src="/profile.webp" />
                  <span>
                    <span class="font-semibold">{{ item.name }}</span><br />{{ item.location }}.
                  </span>
                </div>
              </div>
            </n-carousel-item>
          </n-carousel>
        </div>
      </div>


    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { NAvatar, NCarousel, NCarouselItem } from 'naive-ui';
  
  const testimonial = [
    {
       name:'Emmanuel Adegoke',
       location:' England',
       body:'In 2021, I wanted to migrate to the UK via study route and did not know how to go about it. A friend recommended Infinite Pathways to me. I booked a consultation with them and told them what I wanted. They handled everything for me; from choosing the right course and university, to visa application, booking flight and getting accommodation. They also supported me throughout my academic journey in the UK and offered guidance on how to navigate the job market here. As a result, I graduated with excellent results in my MSc and got a great job in the health sector. I highly recommend Infinite Pathways any time, any day.' 
    },
    {
        name:'Peace Chukwuma',
        location:'England',
        body:'Infinite Pathways made my study abroad dream a reality, so they are the absolute best! I reached out to them in May 2022 and by September I got my UK student visa. Booking my travel tickets and accommodation was very easy because of their assistance. During summer break, I told them I wanted to do internship in my field. They suggested companies for me, assisted in the application process and prepared me for three stages of interview with the companies. With their expert guidance, I secured an internship position with a blue-chip company. I am now a graduate, working for the UK government.'
    },
    {
        name:'Emeka Okafor',
        location:'Scotland',
        body:'I contacted Infinite Pathways during my visa application November last year. I did not use their services for school applications, but I had some set back and problems with paperwork for my visa application. I explained my predicament to them, and they took up the visa processing, advised on the right documents to provide and made sure everything was perfect. I received my student visa January 2025 and currently studying in Scotland. Infinite Pathways can be trusted.'
    },
    {
        name:' Blessing Adeleye',
        location:'USA',
        body:'This organisation and their employees are professional and detailed to the letter. I migrated to the US in 2021 for my PhD through Infinite Pathways. I had no idea I could use just my BSc to secure a fully funded PhD scholarship in the US until I consulted them. On first contact, they broke all the processes down for me and supported me in putting my documents together. They recommended I write the TOEFL exam which gave me an edge in the application process. With their guidance, I got a full scholarship, and I am currently in my 4th year.'
    },

    {
        name:'Chisom',
        location:'England,UK',
        body:"I had the pleasure of working with Infinite Pathways twice for my parents' visit visa applications, and both times were a complete success. Their expertise in handling the documentation and application process was outstanding, ensuring everything was accurate and well-prepared. Their guidance and attention to detail made the process smooth and stress-free. I couldn’t be happier with the results, and I highly recommend their services to anyone in need of professional and reliable visa assistance."
    },
    {
        name:'Jane',
        location:'England,UK',
        body:"Relocating for my master's program with my family of three felt like a daunting task, but with Infinite Pathways the entire process became effortless. From selecting the right school and handling applications to securing visas, booking flights, and even preparing us for entry into the new country, their support was exceptional. Their guidance didn’t stop there - they helped us settle in smoothly and navigate my studies with ease. I’m incredibly grateful for their dedication and highly recommend their services to anyone looking for a stress-free relocation experience."
    },
    {
        name:'Andrew',
        location:'England,UK',
        body:"Finding the right master's program can be overwhelming, but Infinite Pathways made the entire journey seamless for me. From identifying the most suitable and affordable school to guiding me through applications, payments, and the visa process, their support was invaluable. Even after securing my admission, they continued to assist me with settling into the new country and my studies. Their expertise and dedication made my transition smooth and stress-free. I highly recommend their services to anyone looking for professional and reliable support in their academic journey."
    },
    {
        name:'Moyo',
        location:'Manchester',
        body:"I spent 5 months without a job last year until I had my first conversation with one of their employees. Before this time, I always got the “unfortunately” email and could not make it to assessment or interview stage. They pointed out the errors in my CV and revamped it for me. They also helped me to draft compelling cover letters, highlighted my skills in the most appropriate way and conducted a mock interview with me. Within 2 months I got offers from different companies. I highly recommend Infinite Pathways!"
    },
]

  
//   const carouselSlides = ref(3)
  // Responsive slides-per-view
 
  </script>
  
  <style scoped>
  .testimonial-card {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    min-height: 200px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .testimonial-card .n-carousel {
  width: 100%;
  height: 400px;
  object-fit: cover;
    }

    @media (min-width: 996px) {

        .testimonial-card .n-carousel{
            height: 340px !important;
        }
    }
  </style>
  

<!-- <script setup>
// import { Testimonial } from '#components';
import { NAvatar,NSpace,NImage,NCarousel} from 'naive-ui'

const testimonial = [
    {
       name:'Emmanuel Adegoke',
       location:' England',
       body:'In 2021, I wanted to migrate to the UK via study route and did not know how to go about it. A friend recommended Infinite Pathways to me. I booked a consultation with them and told them what I wanted. They handled everything for me; from choosing the right course and university, to visa application, booking flight and getting accommodation. They also supported me throughout my academic journey in the UK and offered guidance on how to navigate the job market here. As a result, I graduated with excellent results in my MSc and got a great job in the health sector. I highly recommend Infinite Pathways any time, any day.' 
    },
    {
        name:'Peace Chukwuma',
        location:'England',
        body:'Infinite Pathways made my study abroad dream a reality, so they are the absolute best! I reached out to them in May 2022 and by September I got my UK student visa. Booking my travel tickets and accommodation was very easy because of their assistance. During summer break, I told them I wanted to do internship in my field. They suggested companies for me, assisted in the application process and prepared me for three stages of interview with the companies. With their expert guidance, I secured an internship position with a blue-chip company. I am now a graduate, working for the UK government.'
    },
    {
        name:'Emeka Okafor',
        location:'Scotland',
        body:'I contacted Infinite Pathways during my visa application November last year. I did not use their services for school applications, but I had some set back and problems with paperwork for my visa application. I explained my predicament to them, and they took up the visa processing, advised on the right documents to provide and made sure everything was perfect. I received my student visa January 2025 and currently studying in Scotland. Infinite Pathways can be trusted.'
    },
    {
        name:' Blessing Adeleye',
        location:'USA',
        body:'This organisation and their employees are professional and detailed to the letter. I migrated to the US in 2021 for my PhD through Infinite Pathways. I had no idea I could use just my BSc to secure a fully funded PhD scholarship in the US until I consulted them. On first contact, they broke all the processes down for me and supported me in putting my documents together. They recommended I write the TOEFL exam which gave me an edge in the application process. With their guidance, I got a full scholarship, and I am currently in my 4th year.'
    },

    {
        name:'Chisom',
        location:'England,UK',
        body:"I had the pleasure of working with Infinite Pathways twice for my parents' visit visa applications, and both times were a complete success. Their expertise in handling the documentation and application process was outstanding, ensuring everything was accurate and well-prepared. Their guidance and attention to detail made the process smooth and stress-free. I couldn’t be happier with the results, and I highly recommend their services to anyone in need of professional and reliable visa assistance."
    },
    {
        name:'Jane',
        location:'England,UK',
        body:"Relocating for my master's program with my family of three felt like a daunting task, but with Infinite Pathways the entire process became effortless. From selecting the right school and handling applications to securing visas, booking flights, and even preparing us for entry into the new country, their support was exceptional. Their guidance didn’t stop there - they helped us settle in smoothly and navigate my studies with ease. I’m incredibly grateful for their dedication and highly recommend their services to anyone looking for a stress-free relocation experience."
    },
    {
        name:'Andrew',
        location:'England,UK',
        body:"Finding the right master's program can be overwhelming, but Infinite Pathways made the entire journey seamless for me. From identifying the most suitable and affordable school to guiding me through applications, payments, and the visa process, their support was invaluable. Even after securing my admission, they continued to assist me with settling into the new country and my studies. Their expertise and dedication made my transition smooth and stress-free. I highly recommend their services to anyone looking for professional and reliable support in their academic journey."
    },
]

</script>

<style scoped>
.n-carousel {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

@media (min-width: 996px) {

    .n-carousel{
        height: 340px !important;
    }
}

:deep(.creative-enter-from),
:deep(.creative-leave-to) {
  opacity: 0;
  transform: scale(0.8);
}

:deep(.creative-enter-active),
:deep(.creative-leave-active) {
  transition: all 0.3s ease;
}
</style> -->


<!-- In 2021, I wanted to migrate to the UK via study route and did not know how to go about it. A friend recommended Infinite Pathways to me. I booked a consultation with them and told them what I wanted. They handled everything for me; from choosing the right course and university, to visa application, booking flight and getting accommodation. They also supported me throughout my academic journey in the UK and offered guidance on how to navigate the job market here. As a result, I graduated with excellent results in my MSc and got a great job in the health sector. I highly recommend Infinite Pathways any time, any day.
______ Emmanuel Adegoke
______ Location: England
 
 
Infinite Pathways made my study abroad dream a reality, so they are the absolute best! I reached out to them in May 2022 and by September I got my UK student visa. Booking my travel tickets and accommodation was very easy because of their assistance. During summer break, I told them I wanted to do internship in my field. They suggested companies for me, assisted in the application process and prepared me for three stages of interview with the companies. With their expert guidance, I secured an internship position with a blue-chip company. I am now a graduate, working for the UK government.
______ Peace Chukwuma
______ Location: England
 
 
I contacted Infinite Pathways during my visa application November last year. I did not use their services for school applications, but I had some set back and problems with paperwork for my visa application. I explained my predicament to them, and they took up the visa processing, advised on the right documents to provide and made sure everything was perfect. I received my student visa January 2025 and currently studying in Scotland. Infinite Pathways can be trusted.
______ Emeka Okafor
______ Location: Scotland
 
 
This organisation and their employees are professional and detailed to the letter. I migrated to the US in 2021 for my PhD through Infinite Pathways. I had no idea I could use just my BSc to secure a fully funded PhD scholarship in the US until I consulted them. On first contact, they broke all the processes down for me and supported me in putting my documents together. They recommended I write the TOEFL exam which gave me an edge in the application process. With their guidance, I got a full scholarship, and I am currently in my 4th year.
______ Blessing Adeleye
______ Location: USA
 
 
I had the pleasure of working with Infinite Pathways twice for my parents' visit visa applications, and both times were a complete success. Their expertise in handling the documentation and application process was outstanding, ensuring everything was accurate and well-prepared. Their guidance and attention to detail made the process smooth and stress-free. I couldn’t be happier with the results, and I highly recommend their services to anyone in need of professional and reliable visa assistance.
_____ Chisom
_____ England, UK
Relocating for my master's program with my family of three felt like a daunting task, but with Infinite Pathways the entire process became effortless. From selecting the right school and handling applications to securing visas, booking flights, and even preparing us for entry into the new country, their support was exceptional. Their guidance didn’t stop there - they helped us settle in smoothly and navigate my studies with ease. I’m incredibly grateful for their dedication and highly recommend their services to anyone looking for a stress-free relocation experience.
_____ Jane
_____ England, UK
 
 
Finding the right master's program can be overwhelming, but Infinite Pathways made the entire journey seamless for me. From identifying the most suitable and affordable school to guiding me through applications, payments, and the visa process, their support was invaluable. Even after securing my admission, they continued to assist me with settling into the new country and my studies. Their expertise and dedication made my transition smooth and stress-free. I highly recommend their services to anyone looking for professional and reliable support in their academic journey.
_____ Andrew
_____ England, UK
  -->
