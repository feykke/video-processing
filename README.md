# Utilizando OpenCV para processamento de video

# Introdução

Neste post, realizei um estudo de como renderizar um video em CommonJS no navegador utilizando MediaStream API e o próprio openCV, uma biblioteca que trabalha com processamento de imagem. 

O projeto em si foi bem simples, ele utiliza da webcam do computador para renderizar no navegador atravez de streaming, e a partir dai, a biblioteca processa essa gravação e faz um tratamento na imagem utilizando de escala de cinza.

---

# Explicando o código

## Index.html

### Header

```html
<head>
	<tittle>OpenCV with JS</tittle>
	<script src="libs/opencv453.js"></script>
</head>
```

No header utilizamos da tag <script> para indicar o diretório onde a build do openCV foi colocada (lembrando que estou utilizando a versão 4.5.3 do openCV). Que basicamente contém todas as funcionalidades que a biblioteca disponibiliza.

### Body

```html
<body>
	<video id="video-input" width="480px" height="320px" autoplay></video>
	<canvas id="canvas-output" width="480px" height="320px"></canvas>

	<script src="./script.js"></script>
</body>
```

Já no body foram criados 2 elementos, o <video> que é o campo onde será renderizado o vídeo "cru" da minha webcam e o <canvas> será renderizado o video pós processado pela biblioteca.

## Libs Folder

### Opencv453.js

Na pasta libs, como mencionei a cima, este módulo possui o build da versão 4.5.3 da biblioteca localizado no arquivo *opencv453.js*, ou seja, possui todas as constantes, funções, variáveis, módulos entre diversas coisas do openCV. Esta build pode ser copiada no site clicando [aqui](https://docs.opencv.org/4.5.3/opencv.js).

## Script.js

Neste arquivo foram feitas todas as funções tanto de redenrizanção da minha webcam em tela quanto do processamento do video.

```jsx
const video = document.getElementById("video-input");
```

Primeiramente pegamos o elemento da entrada de video atravéz do método getElementById.

```jsx
async function startVideo() {
	const stream = await navigator.mediaDevices.getUserMedia({video: true});

	video.srcObject = stream;
};

window.addEventListener("DOMContentLoaded", startVideo);
```

Depois, criamos a função responsavel por gerir tanto a captura da webcam quanto o pós processamento dela. Essa promise irá utilizar de recursos do navegador para conseguir acessar nossa camera.

```jsx
async function startVideo() {
	const stream = await navigator.mediaDevices.getUserMedia({video: true});
	
	let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
	let cap = new cv.VideoCapture(video);

	video.srcObject = stream;
};

window.addEventListener("DOMContentLoaded", startVideo);
```

Aqui são criadas 2 variáveis, src e cap. A variavel src cria uma nova matriz com altura, largura e uma coloração que é padronizado pelo openCV. Já a variavel cap é responsavel pela captura de video. 

```jsx
	function processVideo() {
		const FPS = 30;
	
		let begin = Date.now();
		let delay = 1000 / FPS - (Date.now() - begin);
		setTimeout(processVideo, delay);
	}

	setTimeout(processVideo, 0);
};
```

A função processVideo(), será responsavel por manipular a imagem com o openCV. A primeiro momento foi setado 

```jsx
	function processVideo() {
		const FPS = 30;
	
		let begin = Date.now();

		cap.read(src);
		cv.imshow("canvas-output", src);

		let delay = 1000 / FPS - (Date.now() - begin);
		setTimeout(processVideo, delay);
	}

	setTimeout(processVideo, 0);
};
```

```jsx
	function processVideo() {
		const FPS = 30;
	
		let begin = Date.now();

		cap.read(src);
		let gray = new cv.Mat();
		cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
		cv.imshow("canvas-output", gray);

		let delay = 1000 / FPS - (Date.now() - begin);
		setTimeout(processVideo, delay);
	}

	setTimeout(processVideo, 0);
};
```

## Código completo

```jsx
async function startVideo() {
	const stream = await navigator.mediaDevices.getUserMedia({video: true});
	
	let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
	let cap = new cv.VideoCapture(video);

	video.srcObject = stream;

	function processVideo() {
		const FPS = 30;
	
		let begin = Date.now();

		cap.read(src);
		let gray = new cv.Mat();
		cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
		cv.imshow("canvas-output", gray);

		let delay = 1000 / FPS - (Date.now() - begin);
		setTimeout(processVideo, delay);
	}

	setTimeout(processVideo, 0);
};

window.addEventListener("DOMContentLoaded", startVideo);
```