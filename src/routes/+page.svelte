<script>
  import { onMount, tick } from "svelte";
  import { PitchDetector } from "pitchy";
  import Intro from './intro.svelte';
  
  let showIntro = true;
  let isReady = false;
  let canvas, ctx;
  let audioContext, source, analyserNode;
  let buffer = new Float32Array(2048);
  let circles = [];
  let lastNote = null;

  // hard coding colour maps
  const noteColors = {
    "C": { r: 255, g: 0, b: 0 },
    "D": { r: 0, g: 0, b: 255 },
    "E": { r: 255, g: 165, b: 0 },
    "F": { r: 0, g: 128, b: 0 },
    "G": { r: 255, g: 255, b: 0 },
    "A": { r: 128, g: 0, b: 128 },
    "B": { r: 255, g: 192, b: 203 },
  };

  const noteNamesFlat = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];

  function frequencyToMidi(freq) {
    return Math.round(12 * Math.log2(freq / 440) + 69);
  }

  function midiToNoteName(midi) {
    return noteNamesFlat[midi % 12];
  }

  function lighten(color, factor = 0.5) {
    return {
      r: Math.round(color.r + (255 - color.r) * factor),
      g: Math.round(color.g + (255 - color.g) * factor),
      b: Math.round(color.b + (255 - color.b) * factor)
    };
  }

  function addCircle(color, volume) {
    circles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 50 + volume * 800,
      color,
      created: performance.now()
    });
  }

  // CANVAS
  function initCanvas() {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    requestAnimationFrame(draw);
    requestAnimationFrame(updateCircles);
  }

  // HANDLING MIC
  function startMic() {
    if (!isReady) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.resume().then(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        source = audioContext.createMediaStreamSource(stream);

        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = buffer.length * 2;
        source.connect(analyserNode);

        isReady = true;
        requestAnimationFrame(updateAudio);
      });
    }
  }

  // AUDIO
  function updateAudio() {
    if (!analyserNode) return;
    analyserNode.getFloatTimeDomainData(buffer);

    const pitchDetector = PitchDetector.forFloat32Array(buffer.length);
    const [frequency, clarity] = pitchDetector.findPitch(buffer, audioContext.sampleRate);

    if (frequency && clarity > 0.8) {
      const midi = frequencyToMidi(frequency);
      const note = midiToNoteName(midi);

      if (note !== lastNote) {
        let color = noteColors[note[0]] || { r: 255, g: 255, b: 255 };
        if (note.length > 1) color = lighten(color, 0.5);

        const volume = Math.max(...buffer.map(v => Math.abs(v)));
        addCircle(color, volume); // mapping based on initial volume

        lastNote = note;
      }
    } else {
      lastNote = null;
    }

    requestAnimationFrame(updateAudio);
  }

  // CIRCLES
  function updateCircles() {
    const now = performance.now();
    circles = circles.filter(c => now - c.created < 4000); // fading out
    requestAnimationFrame(updateCircles);
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now();
    for (let c of circles) {
      const age = now - c.created;
      const t = Math.min(age / 4000, 1);

      let alpha = age < 500 ? age / 500 : 1 - t;

      const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
      gradient.addColorStop(0, `rgba(${c.color.r},${c.color.g},${c.color.b},${alpha})`);
      gradient.addColorStop(1, `rgba(${c.color.r},${c.color.g},${c.color.b},0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  // INTRO
  async function handleContinue() {
    showIntro = false;
    await tick();      // wait for DOM update
    initCanvas();       // initialize canvas and drawing loops
    startMic();         // prompt microphone
  }

  function handleGo() {
    // send finish/time payload
    const payload = {
      event: "finish",
      timestamp: Date.now()
    };
    console.log("GO pressed:", payload);

    // navigate to byebye.html
    // window.location.href = '/media/byebye.html';

    // add to bottom of svelte elem if needed
    //{:else}
    //<canvas bind:this={canvas}></canvas>
    //<button class="go-button" on:click={() => handleGo()}>
    //time to go
    //</button>
  }

</script>

<style>
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
  }

  .screen {
    width: 100vw;
    height: 100vh;
    cursor: pointer;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #ccc;
  }
  .go-button {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background-color: #450303;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    font-size: 0.9rem;
    z-index: 30;
    transition: transform 0.2s ease, background-color 0.2s ease;
    font-family: 'Made Mirage', sans-serif;
  }

  .go-button:hover {
    background-color: #ff9690;
    transform: scale(1.1);
  }
</style>

{#if showIntro}
  <Intro onContinue={handleContinue} />
{/if}
