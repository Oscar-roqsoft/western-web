<template>

    <Transition name="modal">
    
    <div class="fixed inset-0 bg-black/40 flex items-center md:items-center justify-center z-50 p-4">
    
    <div class="bg-white w-full md:w-[420px] rounded-2xl md:rounded-2xl p-6">
    
    <slot/>
    
    </div>
    
    </div>
    
    </Transition>
    
    </template>
    
    
    <style scoped>
    
    .modal-enter-active,
    .modal-leave-active{
    transition: all .25s ease;
    }
    
    .modal-enter-from{
    opacity:0;
    transform:translateY(40px);
    }
    
    .modal-leave-to{
    opacity:0;
    transform:translateY(40px);
    }
    
    </style>