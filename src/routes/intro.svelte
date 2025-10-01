<script>
  export let onContinue = () => {};
</script>

<div class="intro">
  <div class="intro-content">
    <h1>welcome to eighty eight</h1>
    <h2>an interactive auditory tool that visually represents the piano's eighty eight keys</h2>
    
    <p>
    long story short:<br> 
    when i hear music, i still see colour. <br><br>
    
    short story long:<br>
    before i could speak in full sentences, my mum was already teaching me piano. she stuck little coloured stickers on every key of her old upright yamaha — the one she grew up with in the countrysides of hanoi — and colour-coded every note on every page of music. 
    she turned sound into something i could see, long before i understood what i was hearing. so i guess the piano became my first love. 
    like most first loves, life got in the way — and in this case, i <i>let</i> life get in the way.
    i played obsessively for years, then walked away 'for good', only to find my way back again. and again.<br><br>
    
    okay i see how this is starting to sound like one of those 'it's complicated' shitty situationships, but i promise it's love. just messy, stubborn, and real. <br><br>

    it's probably hard to understand, but i hope <i>eighty eight</i> at least makes it a little easier to visualise. </p>
    
    <button class="start-button" on:click={onContinue}>see the world through my eyes by allowing mic</button>
  </div>
</div>

<style>
  @font-face {
    font-family: 'Made Mirage';
    src: url('/fonts/made-mirage-regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Made Mirage Thin';
    src: url('/fonts/made-mirage-thin.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  .intro {
  background-color: #450303;
  color: white;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  /* Allow scrolling inside */
  overflow-y: auto;

  text-align: left;
  padding: 5rem 20%;
  box-sizing: border-box;
  font-family: 'Made Mirage Thin', sans-serif;
}


  .intro-content {
    max-width: 800px;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 0.5rem;
    font-family: 'Made Mirage', sans-serif;
  }

  h2 {
    font-size: 24px;
    font-weight: normal;
    color: #e4cfcf;
    margin-bottom: 2rem;
    font-family: 'Made Mirage Thin', sans-serif;
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 2.5rem;
    font-family: 'Made Mirage Thin', sans-serif;
    color: #f5e5e5;
  }

  .start-button {
    background-color: white;
    color: #450303;
    font-family: 'Made Mirage', sans-serif;
    font-size: 1.1rem;
    padding: 0.7rem 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .start-button:hover {
    background-color: #ff9690;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    .intro {
      padding: 2rem 5%;
      text-align: left;
    }

    h1 {
      font-size: 36px;
    }

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }

    .start-button {
      font-size: 1rem;
      padding: 0.8rem 1.5rem;
    }
  }
</style>
