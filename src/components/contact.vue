<template>

    <div class="min-h-[700px] mt-[200px] md:mt-[120px] flex justify-center px-4 md:px-0">
                
        <div class="">
                <h2 class="text-[#333] text-[24px] md:text-[48px] font-[700] text-center">Reach out</h2>
                <p class="text-[#333] md:text-[18px] font-[400] text-center mt-[0px]">We are always available to respond to your messages</p>
                <div class="max-w-[560px] mt-[48px]">
                <div class="flex flex-col justify-center w-full input">
                    
                    <n-space vertical >
                        <label>Name</label>
                        <n-input class="mb-[16px]" v-model:value="name" type="text" placeholder="Name" />
                        
                        <label>Email</label>
                        <n-input class="mb-[24px]" v-model:value="senderEmail" type="text" placeholder="Email" />

                        <label>Message</label>
                        <n-input
                        v-model:value="message"
                        type="textarea"
                        placeholder="Message"
                        class="mb-[24px]"
                        />

                        <Button @click="showModal = true" name="Send message"/>


                          <n-modal 
                            v-model:show="showModal"
                            :mask-closable="false"
                            preset="dialog"
                            title="Reach out"
                            content="Are you sure you want to send this message?.We’re here to assist you! Please double-check your message to ensure it contains all the necessary details before sending. Our team will get back to you as soon as possible."
                            positive-text="Confirm"
                            negative-text="Cancel"
                            @positive-click="onPositiveClick(d)"
                            @negative-click="onNegativeClick"
                          />
                    </n-space>
                </div>
                </div>
        </div>
    </div>

</template>


<script setup>
import { NSpace,NInput,NModal,NModalProvider} from 'naive-ui'

  const value = ref(null)
  const message = ref('')
  const name = ref(null)
  const senderEmail = ref(null)
  const loading = ref(true)



  // const message = useMessage();
  const showModal = ref(false);
  const onPositiveClick =() =>{
    // message.success("Submit");
    loading.value = true
    // showModal.value = false;

    

  }

  const  onNegativeClick=() =>{
    // message.success("Cancel");
    showModal.value = false;
  }

  const  sendEmail =()=> {
  const emailData = {
    recipient: 'support@example.com', // email address to send the message to
    subject: 'Customer Inquiry',
    message: message.value,
  };

  fetch('https://your-backend-url.com/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Message sent successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error sending message!');
    });
}

   
     


</script>

<style scoped>


:deep(.n-input) {
    min-height: 48px;
    border-radius: 8px;
    margin-top: 0px;

}

:deep(.n-input--textarea) {
    min-height: 148px !important;
    border-radius: 8px;
    margin-top: 0px;

}

.input :deep(.n-input__border){
    border-radius: 8px !important;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-15%);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-slide {
  animation: slide 10s ease-in-out infinite;
}

</style>