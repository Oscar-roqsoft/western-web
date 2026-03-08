<template>

    <button style="border-radius: 1000px;"
	:style="{background: hovered ? '#FAFFFD': `${color} !important`,color:hovered ? 'black' :`${textColor} !important`,width:`${width} !important`,height:`${height} !important`, border: `0.5px solid ${borderColor}`,  }">
       {{ name }}
    </button>

</template>


<script setup>

const { name,color,textColor,width,height,hovered,borderColor } = defineProps({
    name:String,
    color:String,
	textColor:String,
	height:String,
	width:String,
	hovered:Boolean,
	borderColor:String
})

// const hovered = ref(false);

const buttonStyles = computed(() => ({
  width: props.width || 'auto',
  backgroundColor: hovered.value ? 'white' : props.color,
  color: hovered.value ? 'black' : props.textColor,
  border: `1px solid ${props.color}`,
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));
</script>



<style scoped>
/* relevant portion */
button {
     border-radius: 1000px;
	--border-radius: 1000px;
	--border-width: 2px;
	appearance: none;
	position: relative;
	border: 0;
	background-color: #009969;
	font-family: "Montserrat", sans-serif;
	font-size: 14px;
	font-weight: 400;
	color: #fff;
    display: flex;
    width: 150px;
    padding: 10.5px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 40px;
}

button:hover::after{
	--m-i: linear-gradient(#000, #000);
	--m-o: content-box, padding-box;
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	padding: var(--border-width);
	border-radius: var(--border-radius);
	border:1px solid #009969 ;
	/* background-image: conic-gradient(
		#488cfb,
		#29dbbc,
		#ddf505,
		#ff9f0e,
		#e440bb,
		#655adc,
		#488cfb
	); */

	mask-image: var(--m-i), var(--m-i);
	mask-origin: var(--m-o);
	mask-clip: var(--m-o);
	mask-composite: exclude;
	-webkit-mask-composite: destination-out;

	filter: hue-rotate(0);
	animation: hue linear 1000ms infinite;
	animation-play-state: paused;
}

button:hover::after {
	animation-play-state: running;
}

@keyframes hue {
	to {
		filter: hue-rotate(1turn);
	}
}

/* to have things in good shape */
*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}



</style>