<template>
	<div class="dot-wave">
		<div class="dot-wave__dot"></div>
		<div class="dot-wave__dot"></div>
		<div class="dot-wave__dot"></div>
		<div class="dot-wave__dot"></div>
	</div>
</template>

<style scoped>
.dot-wave {
	--dot-size: 50px;
	--dot-speed: 0.6s;
	--dot-color: #0d0909;
	@apply flex items-center justify-between absolute top-1/2 left-1/2;
	transform: translate(-50%, -50%);
	flex-flow: row nowrap;
	width: var(--dot-size);
	height: calc(var(--dot-size) * 0.17);
	padding-top: calc(var(--dot-size) * 0.34);
}

.dot-wave__dot {
	flex-shrink: 0;
	width: calc(var(--dot-size) * 0.17);
	height: calc(var(--dot-size) * 0.17);
	border-radius: 50%;
	background-color: var(--dot-color);
	will-change: transform;
}

.dot-wave__dot:nth-child(1) {
	animation: jump var(--dot-speed) ease-in-out calc(var(--dot-speed) * -0.45) infinite;
}

.dot-wave__dot:nth-child(2) {
	animation: jump var(--dot-speed) ease-in-out calc(var(--dot-speed) * -0.3) infinite;
}

.dot-wave__dot:nth-child(3) {
	animation: jump var(--dot-speed) ease-in-out calc(var(--dot-speed) * -0.15) infinite;
}

.dot-wave__dot:nth-child(4) {
	animation: jump var(--dot-speed) ease-in-out infinite;
}

@keyframes jump {
	0%,
	100% {
		transform: translateY(0px);
	}

	50% {
		transform: translateY(-200%);
	}
}
</style>
